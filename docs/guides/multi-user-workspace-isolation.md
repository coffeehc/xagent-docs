---
title: xAgent 如何隔离多用户工作区与任务进程
description: 了解 xAgent 如何通过虚拟工作区、Execution Lease、ProcessSandbox 和 Runtime Assets 隔离文件与进程执行。
image: /img/share/zh/xagent-security.png
status: beta
updated: 2026-07-27
---

# xAgent 如何隔离多用户工作区与任务进程

多用户共享一套 AI Agent 服务时，只给每个用户创建不同目录并不足够。平台还需要分别控制：谁能看到哪些文件、一次任务能修改哪些目录、外部进程能挂载什么，以及执行可以消耗多少资源。

`v0.0.6.beta` 使用四层边界共同处理这些问题：

1. 用户与会话授权确定文件归属。
2. 虚拟工作区决定当前界面和 Tool 能看到什么。
3. Execution Lease 为一次进程执行准备最小文件视图，并协调写入提交。
4. ProcessSandbox 在操作系统层执行命令，限制文件、环境、进程树和资源。

## 四层边界分别负责什么

| 层次 | 负责的问题 | 不负责的问题 |
| --- | --- | --- |
| 用户与会话授权 | 文件属于谁，当前 Session 能读写哪些根目录 | 不直接启动进程 |
| 虚拟工作区 | 页面与文件 Tool 展示哪些业务路径 | 不等于操作系统沙箱 |
| Execution Lease | 为命令固定最小文件快照、协调重叠写根、提交文件变化 | 不替代平台进程隔离 |
| ProcessSandbox | 挂载文件视图、清理环境、限制进程树与资源 | 不决定业务文件归属 |

外部系统权限是另一条边界。Connector 或 MCP 能访问哪些 CRM、邮箱或消息数据，仍由外部账号授权决定。

## 用户与虚拟工作区隔离

每次文件操作都携带当前用户身份，并在该用户的 Workspace 内解析。工作区页面和文件 Tool 返回的是经过授权的业务视图，而不是服务器物理目录树。

当前主要业务入口包括：

| 业务目录 | 用途 |
| --- | --- |
| 业务空间 | 长期保存正式业务资料、可复用文档和确认后的结果 |
| 项目文件 | 集中维护某个项目的材料、过程文档和结果 |
| 上传文件 | 保存从工作区页面上传的本地材料 |
| Agent 会话 | 按 Session 展示正式任务产物 |
| 个人 Skills | 保存当前用户的私有 Skill 文件 |

系统索引、内部状态、Session 元数据和系统私有目录由代码保护。即使请求显示隐藏文件或追加授权，也不能把这些路径变成普通任务文件。

文件 Tool 只接受 Workspace 相对路径，不接受服务器绝对路径、网址或向上跳转路径。一个 Session 只能写入明确授权的根目录；删除、外发等敏感动作仍可以由审批策略继续控制。

## Execution Lease 如何保护写入

需要运行外部进程时，WorkspaceFileService 会先创建 Execution Lease：

- 根据当前用户和 Session 权限生成最小只读、可写和不可变文件投影。
- 为本次执行创建独占临时目录和执行前快照。
- 对同一用户下相互重叠的可写根串行执行，避免两个进程同时覆盖同一批文件；互不重叠的根和不同用户仍可并发。
- 进程结束后安全扫描可写根，把文件新增、修改和删除作为一个事实批次提交。
- 提交失败时持久化修复信息，后续可以幂等恢复文件事实。

因此，命令写入宿主文件并不等于已经完成 Workspace 提交。Execution Lease 负责把进程产生的变化重新收口到 xAgent 的文件事实和索引中。

## ProcessSandbox 如何隔离进程

ProcessSandbox 是不受信任进程的统一执行边界。每次调用使用独立文件视图、进程树、临时目录和平台资源，并且不会继承未声明的宿主环境变量。

它只接受显式声明的挂载：

| 沙箱路径 | 用途 |
| --- | --- |
| `/workspace` | Session 获得授权的只读或可写 Workspace 投影 |
| `/input` | 系统处理任务的精确输入 |
| `/output` | 系统处理任务的精确输出 |
| `/runtime` | 只读 Runtime Assets 与执行依赖 |
| `/tmp` | 本次命令独占的临时目录 |

工作目录只能位于 `/workspace`、`/input`、`/output` 或 `/tmp`。未声明的宿主目录和环境变量不会因为进程知道路径就自动可见。

ProcessSandbox 还限制执行时间、进程数、内存、CPU，以及 stdout 和 stderr 的保留大小；超时或取消时会清理整个进程树和平台资源。

### Linux

Linux 使用 `bubblewrap` 构造挂载与命名空间边界，使用 cgroup v2 限制进程树资源，并通过 seccomp 收紧系统调用。缺少必要隔离组件时，ProcessSandbox 会返回不可用错误，不会退回不受控的宿主命令执行。

### macOS

macOS 使用 `sandbox-exec` 配置文件和每次执行独立的私有文件视图。允许路径被映射到稳定的沙箱逻辑路径，系统 owner 文件通过拒绝规则保持不可访问。

## Runtime Assets

Runtime Assets 是由 xAgent 管理的 Python、Node 和辅助二进制等执行依赖。它们独立安装和校验，不写入用户 Workspace；执行时只读挂载到 `/runtime`。

如果命令声明的 Runtime Assets 未安装或未通过就绪检查，对应 Tool 会显示不可用。系统不会绕过门禁直接使用宿主机上偶然存在的解释器或二进制。

管理员可以在“Agent 治理 > 执行环境”查看 ProcessSandbox 与 Runtime Assets 的就绪状态。

## 上传文件和 Session 附件

从工作区页面上传的文件属于当前用户。遇到同名文件时，系统生成不同的显示路径，避免覆盖原文件。

Agent会话附件同时绑定用户和 Session。预览、下载或交给任务处理前，系统会校验附件归属。Session 内的可见路径是任务访问入口，稳定文件记录仍由 xAgent 维护。

## 一个简单例子

假设 Alice 和 Bob 共用同一台 xAgent 服务器：

1. 两人分别上传名为 `report.xlsx` 的不同文件。
2. 文件进入各自用户和 Session 范围，彼此不可浏览。
3. Alice 的任务只获得自己的授权文件投影，ProcessSandbox 看不到 Bob 的目录。
4. 如果 Alice 同时启动两个会修改同一产物目录的命令，第二个 Execution Lease 会等待第一个完成提交。
5. 两个任务都可以生成 `summary.md`，结果仍分别进入各自 Workspace 文件事实。

## 这些隔离不替代什么

- **外部系统权限**：Connector 和 MCP 的数据范围仍由外部账号决定。
- **模型数据边界**：发送到外部模型 API 的数据仍受模型供应商协议约束。
- **部署安全**：HTTPS、防火墙、磁盘加密、备份和服务器账号权限仍由部署方负责。
- **业务审批**：文件和进程隔离不能判断一次删除或外发是否符合业务规则。

## 部署检查

1. 为每位使用者创建独立账号，不要多人共用同一 xAgent 用户。
2. 在“执行环境”确认 ProcessSandbox 和 Runtime Assets 就绪。
3. 使用两个测试用户验证同名上传、Session 产物、预览和下载不会串用。
4. 对删除、外发和外部写入配置适当的审批策略。
5. 定期备份运行数据并验证恢复流程。

## 相关文档

- [工作区文件](/docs/user-guide/workspace)
- [Agent会话](/docs/user-guide/agent-session)
- [Runtime 架构](/docs/architecture/runtime)
- [审批与安全控制](/docs/guides/agent-approval-security)

## 下一步操作

- [安装并检查 Runtime Assets](/docs/getting-started/install)
- [配置审批策略](/docs/user-guide/approval-policy)
- [私有化部署 xAgent](/docs/guides/self-hosted-ai-agent)
