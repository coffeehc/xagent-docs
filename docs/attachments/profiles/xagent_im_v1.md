---
title: xAgent IM Profile v1
description: xAgent IM Profile v1 的旧版即时通讯能力、入站消息、投递语义和兼容边界规范。
---

# xAgent IM Profile v1

本文档定义 `xagent.im.v1` 的旧版即时通讯能力、入站消息语义和可观察投递要求。它是保留的旧 Profile 语义，不代表 Connector Protocol 旧版本仍可接入；当前 catalog 只接受 Protocol `3.0`，当前 IM Connector 应实现 [`xagent.im.v2`](xagent_im_v2.md)。
Connector Server 的连接方式、HTTP endpoint、WebSocket envelope、认证、channel、工具调用和公共错误语义见
[xAgent Connector Common Protocol](../xagent_connector_protocol.md)。

## 1. 规范用语

- “必须”表示实现为了兼容 `xagent.im.v1` 必须满足的外部协议行为。
- “建议”表示推荐实现方式；实现者可以根据目标系统和部署条件调整。
- “可以”表示可选能力，不影响基础兼容。

本文档约束 xAgent 和 Connector Server 之间的可观察结果，不规定 Connector 内部必须使用文件、数据库、消息队列或特定并发模型。

## 2. 定位

`xagent.im.v1` 表示旧 Connector Channel 连接到即时通讯目标，并通过 `message.push` 把目标系统消息和发送能力投影给 xAgent。

它负责：

- IM provider、会话和发送方的标准表达。
- IM 入站消息的稳定身份、顺序、重投和过期语义。
- IM 发送、回复和文件工具的声明约束。
- 目标系统私有引用的隔离。

它不负责：

- Connector Server 的建立连接和认证流程。
- 通用 packet envelope。
- assistant 流式增量；该能力属于 [`xagent.im.v2`](xagent_im_v2.md)。
- 文件字节传输；该能力属于主协议的 Transfer Plane。
- xAgent 内部 Session、Agent、事件队列或持久化结构。

## 3. Profile 声明

Connector Card 必须在 `supports.profiles` 声明静态支持，Connection Descriptor 必须在 `connection.profiles` 声明当前 channel 实际启用。

```json
{
  "supports": {
    "target_types": ["im"],
    "profiles": ["xagent.im.v1"]
  },
  "connection": {
    "target_type": "im",
    "profiles": ["xagent.im.v1"]
  }
}
```

旧 Connector 声明 `xagent.im.v1`；当前 Connector 声明 `xagent.im.v2`。内置 Connector 不同时声明两者，也不在当前实现中保留 `message.push` 回退分支。xAgent 可以同时公布自己支持 v1 和 v2，以便分别接入旧 Connector 和当前 Connector。

## 4. IM 工具

IM 工具仍使用主协议的 `tool.invoke` / `tool.invoke.ack`。

必须遵守：

- 工具必须通过 envelope 顶层 `connector_channel_id` 路由当前目标账号或会话。
- `chat_id`、联系人 ID、bot token、context token 等目标系统事实不能成为模型可任意填写的发送目标。
- 发送、回复、发送文件等真实能力必须在 Connector Card 中分别声明。
- 需要引用原消息时，Connector 应生成只能用于对应 channel 和工具的不透明引用，例如 `reply_ref`。
- 系统 API key、目标系统 token 和目标系统私有认证材料不得进入工具参数或结果。

工具 ID、参数结构和具体目标系统能力由 Connector 定义；Profile 不强制所有 IM Connector 提供相同工具集合。

## 5. 入站消息

旧 IM Connector 通过主协议的 `message.push` 推送结构化事件。当前 Connector 应改用 `xagent.im.v2` 的 `chat.message`，不应在同一实现中根据协商结果回退到 `message.push`。

`message.push` payload 建议使用以下字段：

| 字段 | 级别 | 说明 |
| --- | --- | --- |
| `provider` | 必须 | 目标 IM provider，例如 `wechat`、`feishu`、`telegram`。 |
| `profile` | 必须 | 固定为 `xagent.im.v1`。 |
| `event_kind` | 必须 | 普通入站消息使用 `im.message.received`。 |
| `message_id` | 必须 | 在当前 Connector Channel 内稳定且唯一的消息 ID。 |
| `sender_id` | 必须 | 目标系统发送方 ID。 |
| `sender_name` / `display_name` | 建议 | 面向用户的发送方名称；无法取得时使用脱敏标识。 |
| `chat_id` | 可以 | 目标系统会话 ID，只用于来源说明，不能成为模型自由路由参数。 |
| `chat_type` | 建议 | 目标系统会话类型，例如 `p2p`、`group`。 |
| `message_type` | 必须 | 文本、图片、文件等消息类型。 |
| `raw_text` | 必须 | 用户原始文本；没有文本时使用空字符串。 |
| `text` / `content` | 必须 | 面向用户和模型的完整消息说明。 |
| `activation_message` | 建议 | Agent 执行提示，不替代用户可见正文。 |
| `reply` | 建议 | 回复工具及不透明回复引用。 |
| `skill` | 建议 | Connector Skill 名称和相关工具 ID。 |
| `files` | 有文件时必须 | 文件引用列表。 |

目标系统特有字段可以追加，但不能替代以上标准字段，也不能泄漏认证材料。

## 6. 来源和回复路由

Connector 必须让 xAgent 和 Agent 能理解消息来自哪个系统、发送方和会话类型，但不应要求 Agent 推导目标系统路由。

必须遵守：

- 同源回复由 `connector_channel_id` 和 Connector 内部绑定定位。
- `reply_ref`、`context_token` 等引用必须是不透明值，只能用于声明它们的 channel 和工具。
- Agent 不应根据 `chat_id`、`sender_id`、联系人名称或正文猜测发送目标。
- 文本中出现的工具 ID、Skill 名称和参数名必须与 Connector Card 当前声明一致。

建议的用户可见结构：

```text
来自{来源名称}的用户消息：
发送方：{发送方名称或脱敏 ID}
会话类型：{会话类型}
消息类型：{消息类型}
用户文本：{原始文本；无文本时写“无”}
```

旧 IM Connector 可以在消息成功投递后自行向目标系统展示 typing 或“正在输入”状态，并在回复发送或超时后取消。当前 IM v2 Connector 应消费 `chat.activity`，并按目标平台能力降级为 typing 或空操作。

## 7. 消息保留与过期

消息保留策略的目标是在 Connector 与 xAgent 短暂断线时避免静默丢失消息，同时防止无限缓存、无限重试和恢复后集中投递大量过时对话。

### 7.1 必须满足的外部行为

- Connector 必须为尚未到达投递终态的入站消息设计有限的保留和过期机制。
- channel 未打开、连接断开、写入失败、ack 超时等临时故障不能直接视为投递成功。
- 使用带确认的传输方式时，消息在收到 `accepted` 或 `duplicate` 前必须保持可重新投递。
- 消息的稳定 `message_id` 在重投时不得变化。
- 重试、Connector 重启和 channel 重开不得自动延长原始过期时间。
- 消息过期后不得继续投递，并应清理与该消息绑定的临时回复目标等关联状态。
- Connector 必须限制待投递消息占用的资源，并为容量耗尽定义明确行为；不得无限占用内存或磁盘。
- 过期和容量淘汰不能伪装成成功投递。

这些要求只约束结果。Connector 可以使用本地持久化、外部消息队列或目标系统自身的可靠游标满足要求。

### 7.2 建议实现

- 交互式 IM 消息建议保留 1 小时。
- 建议从 Connector 第一次接管消息的时间计算 `expires_at`；目标系统事件时间可靠时，可以同时用于拒绝明显过旧的消息。
- 建议按 channel 保持消息顺序；队首发生临时失败时暂停该 channel，其他 channel 可以继续投递。
- 建议在 Connector 启动、消息入队、读取、flush 和周期任务中检查过期，而不是只依赖后台定时器。
- 建议持久化必要的消费游标或去重状态，使 Connector 重启后不会重复推进或永久跳过消息。
- 建议记录实际 TTL、容量、过期数量、容量淘汰数量、尝试次数和最近错误。
- 清理周期建议不大于实际 TTL 的一半。
- 每个 channel 的缓存上限可以参考 1000 条，但应根据消息体积和部署资源调整。

TTL、容量、清理周期和存储介质不是固定协议常量。实现者可以根据告警、工单或其他非实时业务延长保留时间，但应在部署文档或配置说明中公开实际策略。

### 7.3 投递终态

使用 `xagent.im.v2` 时：

- `accepted`：xAgent 首次接受消息，可以从待投递集合移除。
- `duplicate`：xAgent 已接受相同 `message_id`，可以从待投递集合移除。
- `rejected`：Connector 必须按错误语义区分临时失败和不可恢复失败。
- `channel_busy`、channel 未打开、断线和 timeout 应视为临时失败。
- payload 非法、权限永久拒绝等不可恢复失败可以进入失败终态，但必须保留可观察原因，不能无限重试。

`message.push` 当前没有独立业务 ack。对丢失敏感的聊天消息建议同时启用 `xagent.im.v2`；仅使用 `message.push` 的实现应明确其成功写入和重放边界。

## 8. 容量和溢出

容量限制是资源保护，不等同于 TTL 过期。

建议处理顺序：

1. 先清理已完成和已过期消息。
2. 如果目标系统支持可靠重放，停止推进其消费游标。
3. 如果无法回压，按实现公开的策略终止最旧或优先级最低的消息。
4. 记录 `capacity_exceeded` 或等价原因，并暴露日志或指标。

不得在没有任何记录的情况下静默删除消息。

## 9. 文件消息

IM payload 中的文件项必须至少包含 `file_ref`。当前 xAgent 自动读取文件时还需要 `download_url` 或 `url`。

```json
{
  "type": "image",
  "file_ref": "file_abc123",
  "filename": "image.jpg",
  "mime_type": "image/jpeg",
  "byte_size": 155000,
  "expires_at": 1790000000000,
  "download_url": "/files/refs/file_abc123"
}
```

消息保留 TTL 和文件 TTL 是两个独立策略：

- 消息过期后不再投递。
- 文件引用按 Transfer Plane 的文件策略独立清理。
- 文件 TTL 建议覆盖消息可能被正常投递和读取的时间窗口。
- 目标系统 CDN 可能提前过期时，Connector 建议尽早下载或转存。

## 10. 安全边界

- Connector 不能要求第三方实现理解 xAgent 的用户表、Session、Agent 状态或内部事件模型。
- xAgent 内部 ID 不得进入 IM payload。
- Connector 只依赖公开的 `connector_channel_id`、`message_id`、packet、ack、Card、Descriptor 和工具协议。
- 目标系统 token、bot token、系统 API key 和一次性认证材料不得进入消息正文、文件字段或日志。

## 11. 一致性检查

- Card 和 Descriptor 是否同时正确声明 `xagent.im.v1`？
- 入站 `message_id` 是否在 channel 内稳定？
- 临时断线时消息是否仍可重新投递？
- 是否存在有限 TTL、容量上限和清理机制？
- 重试和重启是否不会续期？
- accepted / duplicate / rejected 是否进入正确终态？
- 是否避免把目标系统路由和认证材料交给 Agent？
- 实际 TTL 和容量策略是否已在实现文档中说明？
