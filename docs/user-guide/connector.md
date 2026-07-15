---
title: xAgent 连接器管理：微信、Telegram 与外部系统
description: 了解 xAgent 连接器与 MCP 的区别，以及如何接入微信、Telegram、个人连接和其他外部系统。
image: /img/share/zh/xagent-connectors.png
status: experimental
updated: 2026-07-15
---

# xAgent 连接器管理：微信、Telegram 与外部系统

> 状态：实验性能力，页面和字段可能变化。

## 适用对象

本文适合普通用户和管理员。

普通用户主要关注“我的连接”：绑定自己的外部账号，确认认证状态和可用工具。

管理员主要关注“Connector 管理”：接入连接器服务，检查 Connector Card、health、登录流程和工具声明。

## 这是什么

连接器用于把微信、Telegram、邮件、企业系统、第三方服务或其他外部入口接入 xAgent。它可以主动接收外部消息，并把消息、账号状态、可执行动作或事件投递到 xAgent。

普通用户可以把连接器理解为“把我的外部账号接进来”。管理员可以把连接器理解为“把一个外部系统入口接入 xAgent，并让它变成可治理、可授权、可调用的能力”。

和 MCP 相比，连接器更偏“外部系统主动把消息送进来”；MCP 更偏“xAgent 在任务中按需调用外部工具”。

## 当前发布的连接器

当前 `v0.0.3` Connector Release 包含下面两种连接器：

| 连接器 | 使用方式 | 用户需要完成的操作 |
| --- | --- | --- |
| 微信 Connector | 在微信中接收和发送消息 | 在“我的连接”中按页面提示扫码、授权或绑定 |
| Telegram Connector | 通过 Telegram Bot 接收和发送消息 | 在“我的连接”中提交自己的 `bot_token` 和目标 `chat_id` |

Telegram 绑定私聊前，用户需要先向 Bot 发送 `/start` 或任意消息。连接器将 Bot Token 保存在自己的本地状态目录中，不会把 Token 写入 Tool 参数、Skill 或会话消息。

连接器的下载与服务端部署步骤见 [Connector 安装](/docs/deployment/connector-install)。

## 页面入口

连接器相关入口分为两类：

| 页面 | 面向对象 | 作用 |
| --- | --- | --- |
| 我的连接 | 普通用户 | 管理当前用户自己的外部账号、认证状态、通道状态和可用工具 |
| Connector 管理 | 管理员 | 管理系统级 Connector catalog，添加连接器、读取 Connector Card、探测 health 和查看工具声明 |

文档菜单中统一放在“连接器”页面说明。实际产品界面里，普通用户通常进入“我的连接”，管理员再进入“Connector 管理”。

## 我的连接

“我的连接”用于管理当前用户自己的外部账号和连接通道。你只需要确认连接是否可用、账号是否授权、任务里要处理什么对象，不需要理解连接器协议。

![xAgent 我的连接页面，显示微信 Connector 的认证状态、连接状态和可用工具](/img/manual/xagent-connector-my-connections.png)

### 普通用户连接账号

1. 打开“我的连接”。
2. 找到要连接的外部系统。
3. 点击创建连接或进入连接详情。
4. 按页面提示完成扫码、授权或绑定。
5. 确认认证状态和通道状态正常。
6. 回到 Agent 会话，说明要处理的外部任务。

示例：

```text
请查看最近一条客户微信消息，先整理回复草稿，不要直接发送。
```

### 在任务中描述外部对象

普通用户用自然语言描述即可：

- “最近一条客户消息”
- “今天收到的新邮件”
- “某个客户的订单”
- “这个群里的待办”
- “我绑定的默认邮箱”

如果页面要求选择账号、渠道或连接，按页面提示选择。

## Connector 管理

Connector 管理用于维护系统级连接器目录。管理员在这里接入连接器服务、读取 Connector Card、检查 health、确认登录流程、工具声明和协议状态。

![xAgent 添加 Connector 对话框，填写连接器地址和 API Key](/img/manual/xagent-connector-add-dialog.png)

添加 Connector 时，系统会读取 Connector Card、探测 health，并保存为系统级 Connector catalog。通常需要填写：

| 字段 | 说明 |
| --- | --- |
| Connector 地址 | xAgent 服务端可以访问到的连接器服务地址 |
| API Key | 可选；填写后会作为 Bearer Token 访问 Connector Server |

连接器地址应填写 xAgent 服务端能访问到的地址。如果连接器部署在另一台服务器上，建议通过 HTTPS 反向代理暴露给 xAgent。

### 检查连接器详情

连接器接入后，管理员可以进入详情页查看连接器身份、Connector Card ID、状态、版本、目标系统、profiles、认证流程、工具和登录流程。

![xAgent WeChat Connector 详情页面，显示状态、协议、认证流程和工具信息](/img/manual/xagent-connector-detail.png)

管理员重点确认：

- health 是否正常。
- Connector Card 是否能读取。
- 连接器名称、版本、协议是否符合预期。
- 登录流程是否存在，例如扫码登录、OAuth 或账号授权。
- 工具列表是否真实可用。
- 是否提供 Connector Skill。
- 连接器是否声明了可能触达的数据类型。

不要把未来可能支持、但当前还不可用的能力放进连接器工具声明里。工具一旦被声明，就可能被 Agent 在任务中调用。

## 开放协议与扩展

xAgent Connector 协议会在 [coffeehc/xagent-connectors](https://github.com/coffeehc/xagent-connectors) 中开放。具备开发能力的团队可以按协议自行扩展连接器。

常见扩展方向包括：

- 接入飞书、钉钉等更多 IM 工具。
- 接入企业内部系统，完成查询、审批、写入或业务操作。
- 接入第三方模型或生成服务，例如视频生成、图片生成和音视频处理。
- 连接其他智能体系统，让 xAgent 可以把任务投递给外部智能体，或接收外部智能体事件。
- 把已有内部服务包装成 xAgent 可以治理和调用的外部入口。

开发自己的连接器时，可以先阅读 [xAgent Connectors](https://github.com/coffeehc/xagent-connectors) 中的协议文档。实现完成后，只要连接器服务能提供 Connector Card、health、WebSocket 数据通道和必要工具，就可以通过 Connector 管理接入。

## 安全注意

- 不要把真实密码、token、验证码写进会话。
- API Key 只用于 xAgent 后端与 Connector 服务之间，不要写入会话、提示词或任务材料。
- Connector 服务通常保存外部系统登录态，应使用独立运行用户和独立数据目录。
- 不建议把 Connector 管理端口直接暴露到公网。
- 发送消息、修改外部数据或访问敏感信息时，应配合审批策略使用。
- 外部系统的数据权限仍由外部系统和连接器控制，xAgent 不替代外部系统的账号权限体系。

## 常见问题

### 我的连接和 Connector 管理有什么区别？

我的连接是普通用户绑定自己外部账号的地方。Connector 管理是管理员维护系统级连接器服务的地方。

### Connector 和 MCP 有什么区别？

Connector 可以主动接收外部消息并推送给 xAgent，例如微信收到消息后主动投递到会话。MCP 通常是 xAgent 在任务执行过程中按需调用的外部工具服务。

### 外部连接和工具有什么关系？

外部连接提供账号和通道，工具执行具体动作。例如连接微信后，工具才能在授权范围内发送消息或发送媒体。

### 我需要把外部系统密码告诉 xAgent 吗？

不需要。按页面授权流程操作，不要把密码、token 或验证码写进任务消息。

### 连接器提供的工具会自动对所有用户可用吗？

不一定。工具是否可用取决于连接器接入状态、用户是否完成授权、连接器返回的连接状态，以及 xAgent 本地治理和审批策略。

## 相关概念

- [快捷指令协议：命令、定向发送与对象引用](/docs/guides/shortcut-instruction-protocol)
- [多 Agent 如何通过会话事件协作](/docs/guides/multi-agent-session-event-collaboration)
- [xAgent Connectors](https://github.com/coffeehc/xagent-connectors)
- [Tool 管理](/docs/user-guide/tool)
- [审批策略](/docs/user-guide/approval-policy)

## 下一步操作

- [安装微信或 Telegram Connector](/docs/deployment/connector-install)
- [在 Agent 会话中使用连接器能力](/docs/user-guide/agent-session)
