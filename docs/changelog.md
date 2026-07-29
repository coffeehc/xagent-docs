---
title: 更新日志
description: 查看 xAgent 各二进制版本面向用户的重要变化、下载内容和升级注意事项。
image: /img/share/zh/xagent-overview.png
status: stable
updated: 2026-07-27
schemaType: CollectionPage
---

# 更新日志

本文记录 xAgent 免费二进制版本中与安装、使用和安全治理相关的重要变化。当前仍是测试版，功能、界面和协议可能继续调整。

## `v0.0.5.beta` - 2026-07-27

[查看安装方式](/docs/getting-started/install)

本版本重点升级控制台体验、Connector 实时交互、任务进程隔离和自动安装流程，并把服务端、Runtime Assets 与三个 IM Connector 纳入统一版本目录。

### 控制台与会话体验

- 统一控制台的品牌、字体密度、页面层级、状态表达和响应式布局。
- 资源列表统一使用可搜索、可分页的数据表格，详情和编辑流程改为抽屉或对话框，减少页面跳转。
- 左侧菜单按工作区、操作、个人设置、分析、Agent 治理和系统配置重新组织。
- 管理员可以为用户开启高级模式；普通模式保留会话、文件、审批、连接和账号等高频入口，高级模式再显示触发器、Agent、Skill、Tool、MCP 和会话诊断能力。
- Agent 会话重新整理时间线、附件、工具调用、运行状态、会话文件和高级设置，并增强窄屏与移动端布局。

### Connector 与浏览器连接

- Connector 源码、公共协议和架构文档统一收口到 xAgent 仓库的 `connectors/` 与 `docs/architecture/connector/`。
- 公共协议升级到 `3.0`；微信、Telegram 与飞书使用 `xagent.im.v2` 传输双向最终消息、流式增量、消息确认、活动状态和文件引用。
- 图片、音频、视频和普通文件通过独立文件传输链路收发，不再把文件正文或 Base64 放入消息 WebSocket。
- Connector health 连续失败一至两次显示为“不稳定”，第三次起显示为“断开”；恢复成功后可以重新回到在线状态。
- 微信 Connector 增加按接收人维护的凭据续期和到期提醒，凭据过期后停止无效发送。
- 浏览器扩展通过内置 Browser Connector 建立受控连接，用于浏览器消息、页面上下文和工具调用。
- 当前独立 Connector 版本为微信 `0.0.8`、Telegram `0.0.9`、飞书 `0.0.8`。

### ProcessSandbox 与运行环境

- 新增统一 `ProcessSandbox`，所有不受信任命令都通过同一执行边界启动和回收，不继承未声明的宿主环境。
- Linux 使用 `bubblewrap + cgroup v2 + seccomp`；macOS 使用 `sandbox-exec` 和每次执行独立的私有文件视图。
- 每次执行只挂载明确允许的只读文件、可写目录、输入、输出、Runtime Assets 和临时目录，并限制超时、进程数、内存、CPU 与输出大小。
- Workspace execution lease 负责串行化重叠写入范围、扫描真实文件差量并提交工作区事实；失败的提交可以在后续恢复。
- Python、Node.js 和其他 Runtime Assets 独立安装，进入沙箱时只读挂载，不再回退到用户任务可直接使用的宿主运行环境。

### 自动安装、升级与回滚

- Linux 和 macOS 使用同一个稳定安装入口：

  ```bash
  curl -fsSL https://downloads.xagent.xiagaogao.com/scripts/install.sh | bash
  ```

- 安装器自动检测操作系统与 CPU 架构，读取 `versions.json`，校验平台安装包和内部模块的 SHA256，并在退出时清理临时文件。
- 已安装版本低于版本目录时自动升级；本地版本更高时不会自动降级。
- 服务端和 Connector 二进制按版本保留，通过稳定符号链接原子切换；Linux 服务启动失败时恢复到上一个可用版本。
- Linux 自动执行 `xagent setup`、生成或更新 systemd 服务并启动；macOS 使用用户级安装目录。
- 交互安装会先询问是否安装 Connector，再逐个询问微信、Telegram 与飞书；无人值守场景可以使用 `--connectors` 或 `--no-connectors`。

### 升级说明

升级前仍建议备份 xAgent 运行目录、配置、数据库和 Connector 状态。重新运行安装命令即可检查并安装 `v0.0.5.beta`；安装器会保留当前配置和状态，并记录当前与上一个二进制版本。具体步骤见[开始安装](/docs/getting-started/install)。

## `v0.0.4.beta` - 2026-07-15

[使用安装器安装指定版本](/docs/getting-started/install)

本版本重点统一了会话定向、对象引用和审批回复的表达方式，并让用户可以从 Web 或可用 IM 连接器中处理同一张审批单。

### 快捷指令与统一标识

- `/command` 用于执行系统明确支持的确定性会话命令。
- `@{session:id}` 可以把消息或命令定向发送到明确会话。
- `#{type:id}` 只表示对象引用，不改变消息路由，也不会隐式执行读取、删除或审批等操作。
- `@{approval:id} 同意/不同意` 用于向明确审批提交意见，英文环境可以使用 `approve/reject`。
- Web、IM Connector 和 Agent 会话采用同一套目标与引用语义。

详细使用方式请阅读[快捷指令协议](/docs/guides/shortcut-instruction-protocol)。

### Web 与 IM 审批

- 所有新挂起确认都会创建带编号的审批记录。
- 会话进入审批等待状态后，xAgent 会尝试向该用户全部可用的 IM 消息通道发送审批通知。
- 通知包含目标会话、审批内容、风险信息和可直接回复的标准指令。
- 用户可以从 Web、微信或 Telegram 提交意见，系统会把审批编号路由回正确会话。
- 第一个有效意见生效，后续同号意见不会重复改变审批状态。

### 连接器管理与 Connector `v0.0.4`

- 用户连接按照 Connector Card 声明的连接模式管理，减少重复或无效连接。
- Connector 管理页面补充软件版本和认证方式信息。
- “我的连接”补充连接删除、失效状态和异常连接处理。

- Connector Release `v0.0.4` 新增飞书 Connector，并同时提供微信、Telegram 与飞书三种连接器。
- 同一 Release 提供 12 个 Linux/Darwin、AMD64/ARM64 平台二进制包，以及 `SHA256SUMS` 校验文件。
- 飞书 Connector 当前支持国内飞书的单聊消息和群聊 @ 机器人消息，暂不支持 Lark。具体接入与授权方式见[连接器使用手册](/docs/user-guide/connector)。
- 该版本的 Connector 当时以统一 `v0.0.4` Release 发布；当前版本已经改为三个 Connector 独立版本和独立下载目录。

### 稳定性修复

- 修复审批恢复、会话运行状态和定时调度并发时可能重复推进的问题。
- 修复无效审批编号返回内部错误、纯定向消息误触发空 Agent 执行等问题。
- 修复 IM 审批通知、回复路由和多入口重复审批不一致的问题。
- 会话等待审批时，定时触发不会持续追加重复任务提示。

### 下载内容

Release 仅包含：

- `SHA256SUMS`
- Linux AMD64 二进制包
- Linux ARM64 二进制包
- macOS AMD64 二进制包
- macOS ARM64 二进制包

每个压缩包只包含 xAgent 可执行文件、README 和版本元数据，不包含源代码。

### 当时的升级方式

`v0.0.4.beta` 当时需要停机、备份并手工替换二进制。当前 `v0.0.5.beta` 已提供自动安装、升级和失败回滚流程，具体步骤请参考[开始安装](/docs/getting-started/install)。

## `v0.0.3.beta`

该版本完善了 Connector 接入、Telegram Connector、使用手册和基础安全治理能力，是 `v0.0.4.beta` 之前的公开测试版本。

新部署和升级应直接使用当前安装脚本与 `v0.0.5.beta` 版本目录。
