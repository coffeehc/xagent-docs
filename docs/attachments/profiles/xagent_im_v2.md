# xAgent IM Profile v2

本文档定义 `xagent.im.v2` 的双向完整文本/文件消息、assistant 文本增量、接收确认、活动状态和 IM 工具归属。
公共连接、envelope、channel 和错误语义见
[xAgent Connector Common Protocol](../xagent_connector_protocol.md)。

## 1. 定位

`xagent.im.v2` 是 `target_types: ["im"]` 对应的当前 Profile，不是跨 target type 复用的通用聊天 Profile，也不是新的通信平面。

它只负责：

- 双向完整文本和文件消息。
- xAgent 到 Connector 的 assistant 文本增量。
- 完整消息接收确认。
- xAgent 到 Connector 的脱敏思考中、工具调用中和空闲状态。
- Card 中 IM 发送、回复和文件工具的 Profile 归属；实际调用仍使用主协议 `tool.invoke`。

它不负责 interrupt、approval、pending、Agent 工具调用详情、文件字节或 Browser Runtime 信令。文件元数据和 `file_ref` 可以进入 `chat.message`，实际字节必须通过 Transfer Plane 传输。其它 target type 必须使用自己的版本化 Profile；例如 Browser 消息由 `xagent.browser-runtime.v1/v2` 所有，不能声明 `xagent.im.v2`。

IM v2 message channel 是实时消息中转协议，不是 Session 同步协议。xAgent 内部的 `session.sync_request`、`session.sync_message`、`session.sync_end`、历史快照、历史回放和 UI 投影禁止进入该 Profile，也不能通过其它 Connector Profile 变相承载。xAgent 内的虚拟 Connector Channel 只负责把新的用户消息送入统一 Brain 处理链，并把当前执行产生的 assistant 增量、最终消息和可选活动状态送回 Connector。

新建或重连 IM v2 message channel 只恢复实时消息路由和未完成投递，不主动发送已经完成的历史消息。xAgent -> Connector 的最终 `chat.message` 必须由当前实时执行中新落库 assistant 消息的完成事件触发，不能从 Session 历史查询、历史遍历或同步投影中生成。这里的“最终”是单条 assistant 消息的完成事实，不是整个 Agent/tool loop 的结束标志；一次工具链执行产生的多条已稳定 assistant 消息必须分别使用各自的 `message_id` 发送。

xAgent 的虚拟 Connector Channel 必须从协议层结构化 Profile 目录加载协商结果，并静默过滤其它内部信令，不能在通道实现中硬编码信令白名单。IM v2 的单份目录数据同时声明 `chat.message`、`chat.message.delta`、`chat.message.ack`、`chat.activity` 及对应出站投影；xAgent 新增内部 `PayloadType`、Session 状态或业务事件时，不得自动扩大 Connector 可见协议面。

## 2. Profile 声明

Connector Card 在 `supports.profiles` 声明静态支持，Connection Descriptor 在 `connection.profiles` 声明当前 channel 实际启用。

```json
{
  "supports": {
    "target_types": ["im"],
    "profiles": ["xagent.im.v2"]
  },
  "connection": {
    "target_type": "im",
    "profiles": ["xagent.im.v2"]
  }
}
```

Descriptor 只能声明 Card 已声明的 Profile。

## 3. 身份与路由

- WirePacket 顶层 `connector_channel_id` 是唯一 Channel 路由标识。
- payload 禁止携带 `session_id`、`user_connector_id`、`user_id`、`connector_id` 或 `role`。
- 消息作者由 packet 方向决定。
- `message_id` 是当前 Channel 内的业务消息幂等标识。
- `packet_id` 只标识一次传输，`reply_to` 只关联确认回包，都不能替代 `message_id`。

## 4. Packet

基础 packet 只有四种：

| type | 方向 | 语义 |
| --- | --- | --- |
| `chat.message` | 双向 | 完整、可持久化的最终文本/文件消息 |
| `chat.message.delta` | xAgent -> Connector | assistant 消息的实时文本增量 |
| `chat.message.ack` | 双向 | 完整消息已接受、重复或拒绝的确认 |
| `chat.activity` | xAgent -> Connector | 当前处理状态的完整、脱敏快照 |

扩展 Profile 不能修改这些 packet 的字段、方向、幂等或完成语义。

## 5. `chat.message`

```json
{
  "schema": "xagent.connector.packet/v1",
  "packet_id": "pkt_message_1",
  "connector_channel_id": "cch_123",
  "type": "chat.message",
  "time": 1790000000000,
  "payload": {
    "message_id": "msg_1",
    "text": "请总结当前页面",
    "files": [
      {
        "type": "image",
        "file_ref": "file_abc123",
        "filename": "page.png",
        "mime_type": "image/png",
        "byte_size": 155000,
        "expires_at": 1790000300000,
        "download_url": "/files/refs/file_abc123"
      }
    ],
    "created_at": 1790000000000
  }
}
```

必须遵守：

- Connector -> xAgent 表示用户输入；xAgent -> Connector 表示 assistant 最终输出。
- `message_id` 由发送方生成，在同一 `connector_channel_id` 内稳定且不能复用给其他消息。
- `text` 和 `files` 至少一个非空；文件消息允许没有文本。
- `files[].type` 只能是 `image`、`video`、`audio` 或 `file`。
- 每个文件项必须提供当前消息内唯一的 `file_ref`；`filename`、`mime_type`、`byte_size` 和 `expires_at` 是可选元数据。
- Connector -> xAgent 的文件项必须提供 `download_url`。该地址可以是绝对 HTTP(S) URL，也可以是相对 Connector URI；xAgent 负责下载并登记为当前 Session 文件。
- xAgent -> Connector 发送文件前，必须先通过 `POST /files/uploads` 把对应 Session 文件上传到当前 Connector Channel，再把返回的 `file_ref` 放入最终 `chat.message`；此方向不要求 `download_url`。
- 文件字节、base64、本地路径、目标系统 token 和 CDN 鉴权材料禁止进入 `chat.message`。
- 接收方只使用 `message_id` 对业务消息重传做幂等处理。
- xAgent -> Connector 的最终 `chat.message` 是 assistant 消息的唯一完成事实。
- Connector 必须以最终 `chat.message.text` 作为完整正文，不能把 delta 拼接结果和 final 分别发送两次。
- final 的文本和全部文件共同组成一条业务消息；接收方只有在全部目标系统副作用完成后才能返回 `accepted`。
- Connector 必须能够在从未收到 delta 时直接处理 final。

## 6. `chat.message.delta`

方向：xAgent -> Connector。

```json
{
  "schema": "xagent.connector.packet/v1",
  "packet_id": "pkt_delta_1",
  "connector_channel_id": "cch_123",
  "type": "chat.message.delta",
  "time": 1790000000001,
  "payload": {
    "message_id": "assistant_1",
    "sequence": 1,
    "text": "当前页面"
  }
}
```

必须遵守：

- `sequence` 在同一 `message_id` 下从 1 开始严格递增。
- 相同 `message_id + sequence` 的重传必须幂等，不能重复追加文本。
- 是否出现 delta 由发送方本次输出形态决定，Connector 不能假设每条消息都有 delta。
- delta 不是完成事实，不能替代最终 `chat.message`。
- delta 始终只承载文本；文件只在最终 `chat.message` 中出现。
- Connector 不允许向 xAgent 发送 assistant delta。

建议实现：

- 目标系统支持流式更新时，可以首段创建消息，后续 delta 更新同一条目标消息。
- 目标系统不支持流式更新时，建议在 Connector 内缓存 delta，等待 final 后一次性发送。
- delta 缓存应有有限生命周期和容量上限，避免缺失 final 时永久占用资源。
- delta 缓存 TTL、容量和清理周期由实现决定，并应在实现文档中说明。

## 7. `chat.message.ack`

`reply_to` 必须指向被确认的 `chat.message` packet。ack 只表示接收方是否接受消息，不表示 Agent 执行、目标系统回复或其他后续业务已经完成。

```json
{
  "schema": "xagent.connector.packet/v1",
  "packet_id": "pkt_ack_1",
  "reply_to": "pkt_message_1",
  "connector_channel_id": "cch_123",
  "type": "chat.message.ack",
  "time": 1790000000002,
  "payload": {
    "message_id": "msg_1",
    "status": "rejected",
    "code": "target_delivery_failed",
    "message": "target platform rejected the message",
    "retryable": false
  }
}
```

`status`：

- `accepted`：首次接受。
- `duplicate`：已经接受同一 `message_id`，本次不重复处理。
- `rejected`：明确拒绝；payload 必须提供稳定 `code` 和布尔值 `retryable`，可以提供简短 `message`。

必须遵守：

- ack 的 `connector_channel_id` 和 `message_id` 必须与原消息一致。
- `reply_to` 必须匹配原始 packet 的 `packet_id`。
- 发送方不能把 timeout 或断线自行解释为 `accepted`。
- 接收方已经接受同一消息时必须返回 `duplicate`，不能再次执行副作用。
- `retryable=true` 表示相同 `message_id` 和内容可以在退避后重投；`retryable=false` 表示相同请求不会成功，发送方必须终止自动重投并保留可观察失败原因。
- payload、权限、认证状态或目标平台明确拒绝等确定性错误必须使用 `retryable=false`；网络中断、限流、暂时繁忙等错误可以使用 `retryable=true`。

## 8. `chat.activity`

方向：xAgent -> Connector。每个 packet 都是当前 channel 的完整状态快照，直接替换上一状态；它不持久化、不要求 ack，也不参与消息幂等。

```json
{
  "schema": "xagent.connector.packet/v1",
  "packet_id": "pkt_activity_1",
  "connector_channel_id": "cch_123",
  "type": "chat.activity",
  "time": 1790000000003,
  "payload": {
    "status": "tool",
    "tool_name": "web_search"
  }
}
```

- `status` 只能是 `thinking`、`tool` 或 `idle`。
- `tool_name` 仅在 `status=tool` 时必填，最多 256 字节；其它状态禁止携带。
- payload 禁止携带 reasoning、工具参数、工具结果、错误详情、路径、URL、密钥或内部身份。
- 目标系统不支持自定义状态时，Connector 必须把 `thinking` 和 `tool` 降级为 typing 或等价状态；连 typing 都不支持时可以为空操作。
- `idle`、最终消息或开始展示正文增量时应清除临时状态。
- 临时状态必须有本地超时；状态发送失败不能导致聊天消息被拒绝、重试或重复发送。

## 9. 缓存和幂等状态

Profile 只规定外部结果：

- 发送方必须将尚未收到终态 ack 的完整消息保留为待投递状态；收到 `accepted` 或 `duplicate` 后才能从待投递集合移除。
- timeout、断线和 `retryable=true` 的 `rejected` 不能被解释为投递成功；重投必须复用原 `message_id`。
- `retryable=false` 的 `rejected` 是失败终态，发送方必须移除待投递消息，不能重复执行相同目标系统请求。
- 未完成 delta 和已完成 `message_id` 的幂等状态都必须有界。
- final 到达后必须清理同一消息的临时 delta 状态。
- 接收方成功执行目标系统发送后必须保留有界的 completed `message_id` 幂等状态，并按完整的文本和文件列表检测同 ID 内容冲突；它不是待投递消息，不能因为返回 ack 就立即删除。
- channel 被永久删除时可以清理该 channel 的全部临时状态。
- Connector 重启后是否恢复 delta 由实现决定；无论是否恢复，都不能发送两次 final。

发送方待投递状态和接收方 completed 幂等状态是两个独立事实，不能共用“发送后立即删除”的生命周期。实现可以使用内存、数据库或目标系统可编辑消息句柄。具体缓存数量和时间属于建议性实现参数。

## 10. 错误

- 未声明 Profile 或不在当前协商白名单内：虚拟通道静默丢弃，不产生错误回包。
- channel 未打开：`channel_not_open`。
- payload 非法：`invalid_packet` 或更具体的稳定 code。
- sequence 不连续或冲突：返回明确拒绝，不能静默拼接。
- 目标系统发送失败：`chat.message.ack` 使用 `rejected`，并返回稳定 code。

## 11. 一致性检查

- Card 和 Descriptor 是否都声明该 Profile？
- 是否同时支持 delta + final 和直接 final？
- 是否只按 `message_id` 做业务幂等？
- ack 是否严格匹配 `reply_to`、channel 和 message？
- 不支持流式展示时是否避免发送临时文本？
- delta 和完成幂等状态是否有界？
- 是否没有引入 Session、role、user ID 等内部字段？
- 入站文件是否提供可下载地址，出站文件是否先上传再引用？
- 是否只在 final 中携带文件，并把文本和全部文件作为同一个 ack 单元？
- 是否完全不接收 Session 同步、历史快照、历史回放或 UI 投影？
- 重连是否只恢复实时路由和未完成投递，而不重发已完成历史消息？
- `chat.activity` 是否随 IM v2 一起加载，并在目标平台不支持时安全降级？
