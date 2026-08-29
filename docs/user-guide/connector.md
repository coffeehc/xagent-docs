---
title: xAgent 连接器管理：IM、数据库、SSH 与浏览器
description: 了解 xAgent 的 Connector 管理、IM 双向消息、文件传输、Database/SSH 资源连接、健康状态与扩展协议。
status: experimental
updated: 2026-08-29
---

# xAgent 连接器管理：IM、数据库、SSH 与浏览器

> 状态：实验性能力，页面、协议和认证流程仍可能调整。

## 适用对象

- 普通用户通过“我的连接”绑定外部账号或管理员已配置的 Database/SSH 资源，检查认证、通道和可用工具。
- 管理员通过“Connector 管理”接入 Connector 服务，检查 Connector Card、health、协议和工具声明。

## 这是什么

Connector 是 xAgent 与外部系统之间的协议桥。它可以把微信、Telegram、飞书等渠道的消息主动送入 xAgent，也可以把回复、执行状态和文件发送回原渠道。Database 和 SSH Connector 则通过受管通道向 Agent 提供数据库查询、远程命令与交互式 shell 能力。

与 MCP 相比，Connector 更强调外部事件、用户连接和双向通道；MCP 更偏向任务执行时按需调用外部工具。详细区别见[什么是连接器](/docs/getting-started/what-is-connector#它和-mcp-有什么区别)。

## 当前连接器版本

服务端版本与 Connector 版本独立发布。当前服务端版本为 `v0.0.13.beta`，公开版本目录中的 Connector 版本是：

| Connector | 版本 | 主要用途 |
| --- | --- | --- |
| WeChat Connector | `0.0.12` | 微信消息、媒体发送与接收，以及连接上下文续期 |
| Telegram Connector | `0.0.13` | Telegram Bot 私聊和群聊消息 |
| Feishu Connector | `0.0.12` | 国内飞书单聊和群聊 @ 机器人消息 |
| Database Connector | `0.0.6` | 管理员配置的 MySQL 和 PostgreSQL 资源 |
| SSH Connector | `0.0.8` | 管理员配置的 SSH 命令与交互式 shell 目标 |

二进制统一从 `https://downloads.xagent.xiagaogao.com/connector/` 下的 `weixin/`、`telegram/`、`feishu/`、`database/` 和 `ssh/` 目录下载。安装步骤见[开始安装](/docs/getting-started/install)。

xAgent 还提供 Browser Connector，让受控浏览器扩展把页面交互能力接入当前用户。它由 xAgent 内部管理，不使用上述五个独立 Connector 安装包。

## 页面入口

| 页面 | 面向对象 | 作用 |
| --- | --- | --- |
| 我的连接 | 普通用户 | 管理当前用户的账号认证、通道状态和可用工具 |
| Connector 管理 | 管理员 | 管理系统级 Connector catalog、Card、health、协议和工具声明 |

“我的连接”在简洁模式下仍然可见；“Connector 管理”只对管理员显示。

## 连接外部系统

1. 打开“我的连接”。
2. 选择要连接的外部系统。
3. 创建连接或打开已有连接详情。
4. 按页面提示完成扫码、授权、凭据或资源绑定。
5. 确认认证状态和通道状态正常。
6. 回到 Agent会话，用自然语言说明要处理的消息或对象。

示例：

```text
请查看最近一条客户微信消息，先整理回复草稿，不要直接发送。
```

### 微信

按页面提示扫码并完成连接。微信连接使用收件人范围的 `context_token` 维持可回复上下文；xAgent 会在到期前提醒并尝试续期。上下文已经失效时，发送动作会被阻止，需要先重新建立有效连接。

### Telegram

提交自己的 `bot_token` 和目标 `chat_id`。绑定私聊前，先向 Bot 发送 `/start` 或任意消息。Connector 把 Bot Token 保存在自己的状态目录，不会把它写入 Tool 参数、Skill 或会话消息。

### 飞书

当前支持国内飞书，暂不支持 Lark。按页面扫码确认创建预设名称的 `xAgent助手` 应用，不需要手工填写 App ID 或 App Secret。若要让 xAgent 处理飞书图片，需要在[飞书开放平台](https://open.feishu.cn/app)为对应应用开通 `im:resource` 权限。

### Database

管理员先在 Database Connector Server 中添加 MySQL 或 PostgreSQL 资源。用户再在“我的连接”中选择资源，填写自己的数据库用户名和密码。安装、字段和排查步骤见 [Database Connector 配置](/docs/user-guide/database-connector)。

### SSH

管理员先把私钥放进 SSH Connector 配置目录旁的 `keys/`，再配置目标、远端账号和访问身份。用户只看到资源名称，不会看到主机地址和私钥。完整步骤见 [SSH Connector 配置](/docs/user-guide/ssh-connector)。

## 公共协议与能力

当前公共 Connector 协议版本为 `4.3`。xAgent 仍兼容 `4.2`、`4.1`、`4.0` 和显式声明 `3.0` 的旧 single Connector，并在数据平面握手时确定实际版本。

- IM 通道使用 `xagent.im.v2`，支持外部消息进入 xAgent、回复增量、确认、执行活动与最终回复。
- 双向文件传输由独立的 `xagent.file.v1` 拥有，文件字节不在 WebSocket 消息中直接传输 base64 内容。
- `multiple` Connector 在同一真实 Channel 上按 `resource_key` 路由多个业务资源，模型不接触内部 `connector_channel_id`。
- Connector Card 声明的工具按真实运行时健康状态注册。用户认证和目标系统权限仍由 Connector Server 在每次执行时校验。
- Connector Skill 可通过 `/skill.json` 发布完整目录清单，xAgent 按 revision 下载并原子替换；脚本文件不会被下载或执行。

这意味着 Connector 不只负责“收到一条文本”，还可以向 Agent 提供由外部系统真实认证和权限约束的工具与资源。

## 健康状态

xAgent 会连续探测 Connector health，并按连续失败次数更新状态：

| 连续探测结果 | 状态含义 |
| --- | --- |
| 成功 | 在线；此前失败计数被清除 |
| 失败 1 到 2 次 | 不稳定，连接可能暂时抖动 |
| 失败 3 次及以上 | 离线，当前不应继续依赖该通道 |

后续探测成功时会恢复在线。排查消息未到达或工具无法执行时，应同时检查 Connector health、用户认证、资源配置、外部系统权限和 Connector 日志。

## Connector 管理

管理员添加 Connector 时，xAgent 会读取 Connector Card、探测 health，并保存到系统级 catalog。

| 字段 | 说明 |
| --- | --- |
| Connector 地址 | xAgent 服务端可以访问的 Connector 服务地址 |
| API Key | 可选；设置后作为 Bearer Token 访问 Connector Server |

接入后重点确认：

- health 正常，连续探测能够恢复状态。
- Card 中的名称、版本、协议和目标系统符合预期。
- 登录流程真实可用，例如扫码、Bot 参数绑定、数据库凭据或 SSH principal/access token 认证。
- 工具声明只包含当前可以执行的动作。
- Connector Skill 和可能触达的数据类型声明完整。

不要把未来可能支持、但当前不可用的能力写进工具声明。工具一旦被公开，就可能被 Agent 在任务中选择。

## 开放协议与扩展

自定义 Connector 需要提供 Connector Card、health、认证流程、WebSocket 数据通道和必要工具；支持文件时还需实现 `xagent.file.v1` 固定传输端点。协议适合扩展新的 IM 渠道、企业内部系统、生成服务或其他智能体入口。当前协议仍处于测试阶段，开发前应先确认目标 xAgent 版本支持的协议和能力边界。

## 安全注意

- 不要把密码、token、验证码写进会话。
- Connector API Key 只用于 xAgent 后端与 Connector Server 之间的认证。
- Connector 应使用独立运行用户和独立状态目录，管理端口不应直接暴露到公网。
- Database 凭据、SSH 私钥、access token 和主机指纹应只保存在受控的 Connector Server 配置与状态目录中。
- 发送消息、修改外部数据或读取敏感信息时，应结合审批策略。
- 外部数据权限仍由外部系统账号和 Connector 控制，xAgent 不替代其权限体系。

## 相关文档

- [开始安装](/docs/getting-started/install)
- [什么是连接器](/docs/getting-started/what-is-connector#它和-mcp-有什么区别)
- [Database Connector 配置](/docs/user-guide/database-connector)
- [SSH Connector 配置](/docs/user-guide/ssh-connector)
- [快捷指令协议](/docs/guides/shortcut-instruction-protocol)
- [Tool 管理](/docs/user-guide/tool)
- [审批策略](/docs/user-guide/approval-policy)

## 下一步操作

- [安装微信、Telegram、飞书、Database 或 SSH Connector](/docs/getting-started/install)
- [在 Agent 会话中使用连接器能力](/docs/user-guide/agent-session)
