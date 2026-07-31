---
title: Runtime 与 ProcessSandbox
description: 了解 xAgent 如何通过 Execution Lease、ProcessSandbox 和 Runtime Assets 隔离本地命令、文件投影与执行依赖。
status: beta
updated: 2026-07-30
---

# Runtime 与 ProcessSandbox

## 适用对象

本文适合需要理解 xAgent 本地命令执行、文件投影、运行依赖和责任边界的开发者与部署管理员。

## 当前实现

`v0.0.6.beta` 已经提供本地 Runtime 执行链，不再只是规划概念。一次命令执行由三个 owner 协作完成：

| Owner | 责任 |
| --- | --- |
| WorkspaceFileService | 根据用户和 Session 授权生成 Execution Lease、最小文件视图与提交前快照，并收口文件变化 |
| UserRuntime local provider | 把已解析的命令、工作目录、环境和 Runtime Assets 组装为执行计划 |
| ProcessSandbox | 校验执行计划，通过平台后端启动并回收不受信任进程 |

Runtime 不拥有 Workspace 权限，也不能把宿主绝对路径直接传给命令。ProcessSandbox 不重新解释业务授权，只消费上游 owner 已经校验完成的挂载计划。

## 文件视图

ProcessSandbox 的稳定逻辑根包括：

- `/workspace`：WorkspaceFileService 授权的只读与可写投影。
- `/input`：系统任务的精确输入。
- `/output`：系统任务的精确输出。
- `/runtime`：只读 Runtime Assets。
- `/tmp`：单次执行独占 scratch。

挂载项必须是普通文件或目录，目标路径不能重复。系统 owner 节点可以作为排除项覆盖父目录权限，避免较大目录投影意外暴露内部索引和状态文件。

## Execution Lease

本地 Runtime 必须先向 WorkspaceFileService 申请 Execution Lease。Lease 负责：

1. 从 Session 的可读、可写根生成最小投影。
2. 对同一用户下相互重叠的可写根加协调锁。
3. 记录执行前文件事实并创建独占 scratch。
4. 进程结束后扫描文件变化并以一个批次提交。
5. 提交异常时持久化修复输入，允许幂等恢复。

ProcessSandbox 返回以后，local provider 必须先完成 Lease Commit，再释放临时资源与写锁。仅启动进程成功不能视为完整执行成功。

## 环境与资源

目标进程不继承完整宿主环境。ProcessSandbox 构造固定的 `HOME`、`PATH`、临时目录变量和按文件视图决定的 `XAGENT_WORKSPACE`、`XAGENT_INPUT`、`XAGENT_OUTPUT`；调用方只能追加非保留环境变量。

默认限制包括：

- 60 秒执行超时。
- 128 个进程。
- 512 MiB 内存。
- 1 个 CPU 配额周期。
- stdout 和 stderr 各保留 1 MiB。

调用方可以在执行计划中收紧或调整限制。命令退出、超时或取消后，返回结果前必须清理完整进程树和平台资源。

## 平台后端

### Linux

Linux 使用 `bubblewrap` 建立文件挂载与命名空间边界，cgroup v2 管理进程树资源，seccomp 收紧系统调用。平台检查会执行一次真实的最小沙箱命令，验证启动和清理链路。

### macOS

macOS 为每次执行创建私有文件视图，并使用 `sandbox-exec` profile 约束文件访问。稳定逻辑路径会映射到私有视图中的宿主路径，同时对系统 owner 文件添加明确拒绝规则。

缺少必需隔离能力时返回 ProcessSandbox 不可用错误，不允许回退到不受控宿主执行。

## Runtime Assets

Runtime Assets 由 RuntimeAssetService 独立下载、校验、安装和切换，包含 xAgent 托管的 Python、Node 与辅助二进制。准备就绪的版本以只读目录挂载到 `/runtime`。

Tool readiness 以 Runtime Assets 的安装事实和沙箱内探测结果为准，不使用宿主机上偶然存在的解释器作为后备路径。安装流程见[开始安装](/docs/getting-started/install)。

## 并发语义

ProcessSandbox Service 支持并发调用，每次调用使用独立文件视图、进程树和平台资源。真正需要串行的是同一用户下相互重叠的 Workspace 可写根，这一约束由 Execution Lease owner 负责；互不重叠的根可以并发执行。

## 相关文档

- [多用户工作区与任务进程隔离](/docs/guides/multi-user-workspace-isolation)
- [开始安装](/docs/getting-started/install)
- [Tool](/docs/user-guide/tool)
