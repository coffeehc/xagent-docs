---
title: 更新日志
description: 查看 xAgent 各二进制版本面向用户的重要变化、下载内容和升级注意事项。
image: /img/share/zh/xagent-overview.png
status: stable
updated: 2026-07-15
---

# 更新日志

本文记录 xAgent 免费二进制版本中与安装、使用和安全治理相关的重要变化。当前仍是测试版，功能、界面和协议可能继续调整。

## `v0.0.4.beta` - 2026-07-15

[前往 GitHub Release 下载](https://github.com/coffeehc/xagent-releases/releases/tag/v0.0.4.beta)

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

### 连接器管理

- 用户连接按照 Connector Card 声明的连接模式管理，减少重复或无效连接。
- Connector 管理页面补充软件版本和认证方式信息。
- “我的连接”补充连接删除、失效状态和异常连接处理。

WeChat 与 Telegram Connector 当前独立发布版本均为 `v0.0.3`，请从 [xAgent Connectors Releases](https://github.com/coffeehc/xagent-connectors/releases) 下载。

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

### 升级说明

xAgent 当前不支持在线升级。升级前应先停止服务并备份运行数据、配置和连接器状态，然后替换服务端二进制文件并重新启动。具体步骤请参考[服务端安装与部署](/docs/deployment/server-install)。

## `v0.0.3.beta`

该版本完善了 Connector 接入、Telegram Connector、使用手册和基础安全治理能力，是 `v0.0.4.beta` 之前的公开测试版本。

历史二进制包仍可在 [xAgent Releases](https://github.com/coffeehc/xagent-releases/releases) 查看。新部署建议直接使用当前版本。
