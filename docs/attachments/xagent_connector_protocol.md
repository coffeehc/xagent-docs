---
title: xAgent Connector Common Protocol
description: xAgent Connector Protocol 3.0 的连接、认证、通道、消息、文件传输、工具调用和错误协议。
updated: 2026-07-29
---

# xAgent Connector Common Protocol

本文档定义 xAgent Connector 通用协议。第三方开发者实现 Connector Server 时，应以本文档作为 wire contract。

架构责任、事实归属和生命周期见 [xAgent Connector Architecture](xagent_connection_architecture.md)。

当前协议版本：`3.0`。

## 1. 协议族

| 名称 | 值 |
| --- | --- |
| Connector Card schema | `xagent.connector/v1` |
| Connection Descriptor schema | `xagent.connection/v2` |
| Packet schema | `xagent.connector.packet/v1` |
| Data plane subprotocol | `xagent.connector.packet.v1` |
| Legacy IM profile | `xagent.im.v1` |
| Current IM profile | `xagent.im.v2` |
| Device profile | `xagent.device.v1` |
| Protocol version | `3.0` |

术语：

- `connector.version`：Connector Card 中的 Connector 自身版本。工具、认证流程、Skill 或能力声明变化时升级。
- Protocol version：xAgent Connector 协议版本。Envelope、packet 类型、必填字段或核心状态语义变化时升级。
- Base URL：管理员在 xAgent 中配置的 Connector Server 根地址。它归 xAgent catalog 管，不写入 Connector Card。
- System API key：xAgent backend 与 Connector Server 之间的系统级认证密钥。它不进入前端、Agent、Skill、Card、Descriptor、tool 参数或 message payload。

机器可读结构约束：

- [Connector Card `xagent.connector/v1`](schemas/xagent.connector.v1.schema.md)
- [Packet envelope `xagent.connector.packet/v1`](schemas/xagent.connector.packet.v1.schema.md)
- [Connection Descriptor `xagent.connection/v2`](schemas/xagent.connection.v2.schema.md)

JSON Schema 负责对象结构、字段类型和枚举；Profile 归属、Card/Descriptor 交叉校验、Channel 所有权和 packet 顺序仍以本文规则及共享协议校验代码为准。

## 2. 最小实现清单

一个可接入 xAgent 的 Connector Server 至少需要实现：

1. `GET /connector-card.json`：公开返回 Connector Card。
2. `GET /skill.md`：公开返回 Connector Skill；没有 Skill 时返回 `204` 或 `404`。
3. `GET /health`：系统级健康检查。
4. `GET /ws`：WebSocket data plane。
5. Data plane packet：
   - `connector.hello` / `connector.hello.ack`
   - `channel.open` / `channel.open.ack`
   - `auth.start` / `auth.start.ack`，如果需要用户认证
   - `auth.status` / `auth.status.ack`，如果认证需要轮询
   - `auth.cancel` / `auth.cancel.ack`，如果认证可取消
   - `auth.logout` / `auth.logout.ack`，如果支持登出
   - `connection.descriptor.get` / `connection.descriptor.get.ack`
   - `tool.invoke` / `tool.invoke.ack`
   - `message.push` 或已声明 Profile 定义的消息 packet，如果 Connector 有入站消息
   - `ping` / `pong`
6. 如果涉及文件、图片、视频或音频，按实际传输方向实现 endpoint：
   - Connector -> xAgent 文件下载需要 `GET /files/refs/{file_ref}`。
   - xAgent -> Connector 文件上传需要 `POST /files/uploads`。
   - 双向文件 Connector 同时实现两者；仅提供设备截图等入站文件的 Connector 可以只实现下载。

Connector 只需要实现自身声明的 Profile，但声明后必须满足对应独立规范中的“必须”条款。

## 3. Base URL 和认证

xAgent 以管理员配置的 Connector Base URL 为根路径访问固定 endpoint。

Base URL 规则：

- 只允许 `http` 或 `https`。
- 必须包含 host。
- 不允许包含 userinfo、query 或 fragment。
- 可以包含 path 前缀；xAgent 会在该前缀下拼接固定 endpoint。

系统认证规则：

- `/connector-card.json` 和 `/skill.md` 必须可公开读取，不应要求系统 API key。
- `/health` 可以要求系统 API key；xAgent 配置了 API key 时会发送 `Authorization: Bearer <api_key>`。
- `/ws` 可以要求系统 API key；xAgent 配置了 API key 时会发送 `Authorization: Bearer <api_key>`。
- `/files/uploads` 应要求系统 API key；它只允许 xAgent backend 调用。
- `/files/refs/{file_ref}` 如果作为 `message.push.files[].download_url` 或 `chat.message.files[].download_url` 返回，当前 xAgent 下载链不会附加额外 header；Connector 应使用不可猜测、短 TTL 的 URL，或把授权材料放在一次性 URL 中。

安全规则：

- 系统 API key 只用于 xAgent backend 到 Connector Server。
- 目标系统 token、cookie、refresh token、bot token、context token 不得进入任何 xAgent 可见对象。
- `connector_channel_id`、`request_id`、`file_ref` 都不是鉴权凭证。
- Connector 必须在服务端校验 `connector_id`、`connector_channel_id`、目标系统登录态和工具权限。

## 4. Control Plane HTTP

### 4.1 `GET /connector-card.json`

读取 Connector Card。

认证：无。

成功响应必须是 JSON object。

最小响应：

```json
{
  "schema": "xagent.connector/v1",
  "protocol_version": "3.0",
  "build": {
    "version": "0.0.7",
    "git_tag": "v0.0.7",
    "git_rev": "abc1234",
    "build_time": "2607241200"
  },
  "connector_card_id": "im.wechat",
  "connector": {
    "name": "WeChat Connector",
    "version": "0.0.1",
    "vendor": "Example",
    "description": "Bridge WeChat messages into xAgent."
  },
  "supports": {
    "user_channel_mode": "single",
    "target_types": ["im"],
    "targets": [
      {
        "target_type": "im",
        "provider": "wechat",
        "label": "微信"
      }
    ],
    "profiles": ["xagent.im.v2"]
  },
  "tools": [
    {
      "tool_id": "wechat_message_send",
      "profile": "xagent.im.v2",
      "title": "发送微信消息",
      "description": "向当前 channel 绑定的微信联系人发送文本消息。",
      "related_skill_ids": ["connector-im-wechat"],
      "input_schema": {
        "type": "object",
        "required": ["connector_channel_id", "text"],
        "properties": {
          "connector_channel_id": {
            "type": "string",
            "description": "目标用户级 Connector channel ID。必须使用 connector_channels_list 或入站 source_connector_channel_id 得到的 opaque ID 原样传递。"
          },
          "text": {
            "type": "string",
            "description": "要发送的文本。"
          }
        }
      },
      "output_schema": {
        "type": "object"
      }
    }
  ],
  "auth_flows": [
    {
      "id": "wechat_qr_login",
      "target_type": "im",
      "type": "qr_login",
      "title": "微信扫码登录"
    },
    {
      "id": "telegram_bot_binding",
      "target_type": "im",
      "type": "form",
      "title": "Telegram Bot 绑定",
      "fields": [
        {
          "name": "bot_token",
          "label": "Bot Token",
          "input_type": "password",
          "required": true,
          "placeholder": "123456:ABC-DEF...",
          "help_text": "由 BotFather 创建 bot 后获得。"
        },
        {
          "name": "chat_id",
          "label": "Chat ID",
          "input_type": "text",
          "required": true,
          "placeholder": "例如 123456789",
          "help_text": "先和 bot 建立对话，再填写目标 chat_id。"
        }
      ]
    }
  ],
  "ui": {
    "login_flow": {
      "flow_id": "wechat_qr_login",
      "steps": [
        {
          "type": "qr_code",
          "request_type": "auth.start",
          "response_type": "auth.start.ack"
        },
        {
          "type": "polling",
          "request_type": "auth.status",
          "response_type": "auth.status.ack"
        }
      ]
    }
  },
  "security": {
    "trust_level": "third_party",
    "api_key_required": true,
    "data_classes": ["message", "image"]
  }
}
```

硬校验：

- `schema` 必须是 `xagent.connector/v1`。
- `protocol_version` 表示 Connector 当前实现的公共协议版本；当前接入必须显式声明 `3.0`。
- Card 不声明最低兼容版本；Connector 准入下限由 xAgent 本地协议实现独立控制。
- `connector_card_id` 必填，并应由 Connector 开发者固定，不随部署变化。
- `connector.name` 必填，并应由 Connector 开发者固定。
- `connector.version` 必填。
- `supports.target_types` 必须非空；当前支持 `im`、`email`、`calendar`、`ticket`、`device`。
- `supports.profiles` 必须非空。
- 每个标准 Profile 都声明允许的 `target_types`；Card 声明 Profile 时，必须与 `supports.target_types` 至少有一个交集。`xagent.im.v2` 只允许 `im`，不能被 Browser 或其它 target type 借用。
- `tools[].profile` 必须已在 `supports.profiles` 中声明；IM 工具在当前 Connector 中统一归属 `xagent.im.v2`。
- `supports.user_channel_mode` 可取 `single` 或 `multiple`；字段缺失时 xAgent 按 `single` 兼容处理。
- `tools[].tool_id` 必须非空且不能重复。
- `tools[].tool_id` 会直接作为模型函数名暴露，长度不能超过 256，只能包含 ASCII 字母、数字、下划线、连字符和点号。
- `tools[].related_skill_ids` 可声明使用或选择该工具时建议加载的 Connector Skill；它是工作流提示，不代表工具调用前必须额外认证。
- `tools[].input_schema` 必须是 object schema。
- `tools[].input_schema.properties.connector_channel_id` 必须存在，类型必须是 `string`。
- `tools[].input_schema.required` 必须包含 `connector_channel_id`。

建议：

- `supports.targets[]` 应声明 `target_type`、`provider`、`label`，否则 xAgent 只能回退到 Connector 名称作为来源。
- `supports.user_channel_mode` 只供 xAgent 在 `channel.open` 前限制单个用户可创建的 channel 数量；Connector Server 不据此拒绝或合并信令。
- `auth_flows[].target_type` 应与 `supports.target_types` 对齐。
- `auth_flows[].type` 当前建议使用 `qr_login` 或 `form`。
- `auth_flows[].fields` 仅用于 `type = form`，至少包含一个字段。
- `security.trust_level` 可取 `unknown`、`builtin`、`verified`、`third_party`、`local`。
- `security.api_key_required` 表示系统链路是否需要 API key。
- `security.data_classes` 声明可能触达的数据类别。

禁止：

- 不要在 Card 中放 `server_base_url`。
- 不要在 Card 中放系统 API key、目标系统 token、一次性二维码、OAuth state 或真实敏感身份。
- 不要在工具 schema 中声明 `connector_card_id` 模型参数；xAgent 通过 `user_id + connector_channel_id` 反查并校验 Connector Card。
- 不要把未来可能支持、但当前调用会失败的工具放进 `tools[]`。
- 不要把复杂工作流完整塞进单个工具 schema；schema 表达参数硬契约，步骤、格式、附件上传和多工具编排应写入 `related_skill_ids` 指向的 Skill。

`auth_flows[]` 字段说明：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `id` | 是 | 认证 flow 稳定 ID |
| `target_type` | 是 | 目标类型，例如 `im` |
| `type` | 是 | 认证类型；当前建议 `qr_login`、`form` |
| `title` | 是 | 面向用户展示的认证标题 |
| `description` | 否 | 认证说明 |
| `fields` | `type=form` 时是 | 动态表单字段定义 |

`auth_flows[].fields[]` 字段说明：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `name` | 是 | 提交字段名，必须在同一 flow 内唯一 |
| `label` | 是 | 前端展示名称 |
| `input_type` | 是 | 输入控件类型；当前建议 `text`、`password` |
| `required` | 否 | 是否必填，默认 `false` |
| `placeholder` | 否 | 输入框占位提示 |
| `help_text` | 否 | 字段帮助说明 |
| `secret` | 否 | 是否为敏感字段；`password` 建议同时设置 `secret=true` |
| `default_value` | 否 | 默认值；禁止用于敏感字段 |

### 4.2 `GET /skill.md`

读取 Connector 主 Skill。

认证：无。

响应：

- `200`：返回 Markdown 文本。
- `204` 或 `404`：表示 Connector 不提供主 Skill。

Skill 只表达 Agent 如何处理事件和使用工具，不得包含密钥、系统 API key、目标系统 token 或一次性认证材料。

Skill 命名规范：

- `SKILL.md` header 的 `name` 是协议可见的 Connector Skill 名称，必须由 Connector 开发者静态声明。
- 当前官方约定使用 `connector-<connector-card-id>`，并把点号和下划线归一化为连字符，例如 `im.wechat` 对应 `connector-im-wechat`。
- Connector 需要声明额外 Skill 时，应在主 Skill 名称后追加稳定用途后缀，例如 `connector-im-wechat-file`。
- 完整名称必须使用小写 hyphen-case，只允许 ASCII 小写字母、数字和连字符，以兼容通用 Skill 名称校验。
- xAgent 使用 `connector_card_id` 派生 Connector Skill 的存储身份，但不会生成、替换或改写 `SKILL.md` header 中的名称。
- `im-connector-reply`、`android-device-control` 这类不符合统一格式或不能区分具体 Connector 的名称不得使用。
- `SKILL.md` header `name`、Connector Card 的 `tools[].related_skill_ids`、Connector 返回的 Skill ID，以及消息 payload 中引用的 `skill_id` 必须完全一致。
- Skill 名称是稳定协议标识。修改名称时必须同步修改目录、Card、运行时代码和消息模板，并升级 `connector.version`，使 xAgent 重新拉取 Card 和 Skill。

示例：

| Connector Card ID | Tool ID 示例 | 主 Skill 名称 |
| --- | --- | --- |
| `im.feishu` | `feishu_message_send` | `connector-im-feishu` |
| `im.telegram` | `telegram_message_send` | `connector-im-telegram` |
| `im.wechat` | `wechat_message_send` | `connector-im-wechat` |
| `device.adb` | `android_device_status` | `connector-device-adb` |

### 4.3 `GET /health`

探测 Connector 系统级健康状态。

认证：可要求 `Authorization: Bearer <api_key>`。

成功响应：

```json
{
  "status": "ok",
  "connector_card_id": "im.wechat",
  "connector_card_version": "0.0.1",
  "protocol_version": "3.0",
  "build": {
    "version": "0.0.7",
    "git_tag": "v0.0.7",
    "git_rev": "abc1234",
    "build_time": "2607241200"
  }
}
```

规则：

- `2xx` 表示 Connector endpoint 可用。
- `401` 或 `403` 表示系统 API key 未通过鉴权。
- 除 `401`、`403` 外，非 `2xx` 或请求失败计为一次 health 失败；连续失败一至两次为 `degraded`（不稳定），第三次起为 `offline`（断开）。
- 如果返回 `connector_card_id`，必须与接入时的 `connector_card_id` 一致。
- `protocol_version` 必须与当前 Connector Card 声明一致；版本不兼容时该 Connector 不得保持在线状态。
- `build` 直接使用 Connector 编译时注入的 `configuration.Version`、`GitTag`、`GitRev` 和 `BuildTime`，并与 Connector Card 的 `build` 一致。
- xAgent 定时只请求 `/health`；当 `connector_card_version`、`protocol_version` 或 `build` 与已缓存 Card 不一致时，重新拉取 Card 和 Skill。

## 5. Transfer Plane HTTP

Transfer Plane 只允许 xAgent backend 调用。前端和 LLM 不直接访问。

### 5.1 `POST /files/uploads`

上传待发送文件，返回 Connector 内部 `file_ref`。

认证：应要求 `Authorization: Bearer <api_key>`。

请求：

```http
POST /files/uploads
Authorization: Bearer <api_key>
X-XAgent-Connector-Channel-ID: <connector_channel_id>
Content-Type: multipart/form-data
```

表单字段：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `file` | 是 | 待上传文件正文 |
| `recipient_ref` | 否 | 目标系统收件人引用 |
| `reply_token` | 否 | 回复目标引用；缺少 `recipient_ref` 时可作为 fallback |

成功响应：

```json
{
  "file_ref": "file_abc123",
  "file_type": "image",
  "filename": "image.jpg",
  "byte_size": 155000,
  "expires_at": 1790000000000
}
```

规则：

- `file_ref` 是 Connector 内部不透明 key。
- `file_ref` 必须绑定 `connector_channel_id`。
- `file_ref` 过期策略由 Connector 管理。
- 上传只表示文件已进入 Connector/目标系统文件链路，不等于消息已发送。
- 使用 `xagent.im.v2` 回复当前消息时，xAgent 会把返回的 `file_ref` 放入最终 `chat.message.files`；显式工具工作流仍可调用 Connector Card 中声明的文件发送工具。

### 5.2 `GET /files/refs/{file_ref}`

下载 Connector 暂存文件流。

认证：由 Connector 决定；但如果该 URL 出现在 `message.push.payload.files[].download_url` 或 `chat.message.payload.files[].download_url`，当前 xAgent 资源解析链只携带 URL，不携带额外 header。

响应：

- `2xx`：返回文件字节流。
- `404`：`file_ref` 不存在或已过期。
- `403`：`file_ref` 与当前 channel 或授权不匹配。

规则：

- 该 endpoint 不返回 JSON，而是返回原始字节流。
- 必须设置合理的 `Content-Type`。
- 建议设置 `Content-Disposition` 文件名。
- 不得透出目标系统 CDN token、bot token、context token 或 API key。
- 对于可能过期或一次性的目标系统 CDN，Connector 应在收到入站文件时立即下载并缓存到 Connector 本地。

## 6. Data Plane WebSocket

Endpoint：

```http
GET /ws
Sec-WebSocket-Protocol: xagent.connector.packet.v1
Authorization: Bearer <api_key>
```

规则：

- 只传 WebSocket TextMessage。
- 每条消息是一个 JSON packet。
- 首包必须是 `connector.hello`。
- `connector.hello.ack` 之前不能发送用户级 packet。
- WebSocket 不传文件正文、base64 或目标系统 CDN 字节流。
- 断线后 xAgent 会自动重连，并重新打开持久化的用户 channel。

## 7. Packet Envelope

所有 data plane packet 使用同一个 envelope。

```json
{
  "schema": "xagent.connector.packet/v1",
  "packet_id": "pkt_...",
  "request_id": "req_...",
  "reply_to": "pkt_...",
  "connector_channel_id": "cch_...",
  "type": "tool.invoke",
  "time": 1790000000000,
  "payload": {},
  "error": {
    "code": "tool_invoke_failed",
    "message": "message text required"
  }
}
```

字段语义：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `schema` | 是 | 固定 `xagent.connector.packet/v1` |
| `packet_id` | 是 | 当前 packet 唯一 ID |
| `request_id` | 请求和 ack 必填 | xAgent 生成请求 ID；Connector 回包必须原样带回 |
| `reply_to` | ack 建议填 | 当前 packet 回复的 `packet_id` |
| `connector_channel_id` | 用户级 packet 必填 | Connector 分配的用户级 channel ID |
| `type` | 是 | packet 类型 |
| `time` | 建议填 | Unix 毫秒时间戳 |
| `payload` | 按类型决定 | packet 业务负载 |
| `error` | 错误时填 | 稳定错误码和可读说明 |

路由规则：

- xAgent 通过 `request_id` 路由同步请求回包。
- Connector 主动推送按 `connector_channel_id` 路由到用户 channel。
- `request_id` 不是鉴权凭证。
- `connector_channel_id` 不是鉴权凭证。
- Ack packet 应带回请求的 `request_id`，建议用 `reply_to` 指向请求 `packet_id`。

错误语义：

- 协议、身份、路由、hello 顺序错误使用 `type = "error"`。
- 业务操作失败使用对应 ack packet 的 `error` 字段，例如 `tool.invoke.ack.error`。
- `error.code` 应为稳定机器可读字符串。
- `error.message` 面向日志和开发者，不应包含密钥或目标系统 token。

## 8. Packet 类型

### 8.1 `connector.hello`

方向：xAgent -> Connector。

payload：

```json
{
  "connector_card_id": "im.wechat",
  "connector_id": "conn_im_wechat_xxx",
  "protocol_version": "3.0",
  "supported_profiles": ["xagent.im.v1", "xagent.im.v2"]
}
```

规则：

- `connector_card_id` 必填，必须匹配当前 Connector Card。
- `connector_id` 首次连接可为空。
- `protocol_version` 是 xAgent 当前实现版本。当前 Connector 必须拒绝缺少版本或低于自身支持版本的 hello，不在 Connector 内维护旧 wire 兼容分支。
- `supported_profiles` 是当前 xAgent 实际支持的 Profile 集合；Connector 必须用它与 Card 静态能力取交集，并只在 Connection Descriptor 中返回当前连接实际启用的 Profile。
- 当前 Connector 要求 xAgent 显式发送 `supported_profiles`；旧 xAgent 的兼容由 xAgent 与旧 Connector 组合承担，不由当前 Connector 回退实现。
- Connector 可以参考请求中的历史 `connector_id` 恢复运行态；服务端状态已重建时允许重新签发。
- Connector 不应因为 xAgent 首次未传 `connector_id` 而拒绝连接。

### 8.2 `connector.hello.ack`

方向：Connector -> xAgent。

payload：

```json
{
  "connector_card_id": "im.wechat",
  "connector_id": "conn_im_wechat_xxx",
  "protocol_version": "3.0"
}
```

规则：

- `connector_card_id` 必须与请求一致。
- `connector_id` 必填。
- `protocol_version` 是 Connector 当前实现版本，必须与 Connector Card 声明一致；缺省值会被解析为 `1.0` 并因低于当前准入版本而拒绝。
- xAgent 以 `connector_card_id` 识别唯一 ConnectorClient；同 Card 返回新的 `connector_id` 时更新当前运行实例 ID。

xAgent Connector 管理约束：同一个 `connector_card_id` 只能登记一个 Connector Server 连接。该约束属于 xAgent catalog，不要求 Connector Server 感知其他部署地址。

Connector Server 运行租约约束：

- 当前 `connector_id` 的全部已认证 data plane 断开后，Connector Server 保留一小时重连保护期。
- 保护期内以同一 `connector_id` 重连会取消过期；连续离线满一小时后必须注销该 `connector_id`。
- `connector_id` 注销必须级联注销 Connector Server 内持有的全部 Channel 和未完成认证会话；该治理动作不同于普通 `channel.close`。
- 每个 Channel 注销必须独立清理目标系统绑定；共享 `getUpdates`、平台长连接或等价消费实例只在最后一个 Channel 引用移除后停止。
- Connector Server 启动恢复了持久 Channel 但一小时内没有 xAgent 完成 hello 时，按相同规则清理这些无运行实例归属的 Channel。

### 8.3 `channel.open`

方向：xAgent -> Connector。

Envelope 的 `connector_channel_id`：

- 首次打开时为空。
- 恢复已有 channel 时填已持久化的 `connector_channel_id`。

payload 当前可为空。

规则：

- Connector 可复用已知 channel。
- Connector 如果无法识别旧 channel，可以重新分配新的 `connector_channel_id`。
- `channel.open` 只打开运行时路由，不代表目标系统已经完成认证。
- xAgent 首次创建连接时不会因 `channel.open.ack` 单独持久化用户 Channel；认证成功并获得 `connection_descriptor` 后才创建本地 Channel 聚合。
- 已有连接重新认证时，客户端只提交 xAgent 内部的 UserConnector 主键；`connector_id` 和 `connector_channel_id` 均由 xAgent 按 `connector_card_id` 与当前数据库记录解析。

### 8.4 `channel.open.ack`

方向：Connector -> xAgent。

必须返回：

- envelope `connector_channel_id`。
- `payload.connector_channel_id`。
- `payload.connection_descriptor`。

示例：

```json
{
  "schema": "xagent.connector.packet/v1",
  "packet_id": "pkt_2",
  "request_id": "req_1",
  "reply_to": "pkt_1",
  "connector_channel_id": "cch_123",
  "type": "channel.open.ack",
  "time": 1790000000000,
  "payload": {
    "connector_channel_id": "cch_123",
    "connection_descriptor": {
      "schema": "xagent.connection/v2",
      "connection": {
        "connector_card_id": "im.wechat",
        "connector_id": "conn_im_wechat_xxx",
        "connector_channel_id": "cch_123",
        "target_type": "im",
        "profiles": ["xagent.im.v2"],
        "status": "created"
      },
      "target": {
        "provider": "wechat",
        "label": "微信",
        "display_name": "未绑定微信"
      }
    }
  }
}
```

### 8.5 `channel.close`

方向：xAgent -> Connector。

语义：关闭运行时 channel 路由。

规则：

- 不删除 Connector 内目标系统登录态。
- 不要求 xAgent 删除本地持久绑定。
- Connector 应停止向该 WebSocket route 推送该 channel 的 `message.push`。

### 8.6 `channel.close.ack`

方向：Connector -> xAgent。

payload：

```json
{
  "status": "ok"
}
```

### 8.7 `auth.start`

方向：xAgent -> Connector。

payload：

```json
{
  "flow_id": "wechat_qr_login",
  "input": {
    "bot_token": "123456:ABC-DEF",
    "chat_id": "123456789"
  }
}
```

规则：

- 必须在已打开 channel 上调用。
- `flow_id` 来自 Connector Card `auth_flows[].id`。
- `input` 用于 `type = form` 的认证流；`qr_login` 等无输入流可以省略。
- 如果该 channel 已有可复用登录态，Connector 可以直接返回 `authenticated` 和 `connection_descriptor`。

### 8.8 `auth.start.ack`

方向：Connector -> xAgent。

payload 字段：

| 字段 | 说明 |
| --- | --- |
| `connector_channel_id` | 当前认证所属 channel |
| `flow_id` | auth flow id |
| `auth_session_id` | Connector 认证会话 ID |
| `status` | `pending`、`scanned`、`authenticated`、`expired`、`qr_refresh_required`、`failed` |
| `qr_code_text` | 二维码原始内容 |
| `qr_code_image` | 二维码图片 URL 或 data URL |
| `expires_at` | Unix 毫秒时间戳 |
| `poll_interval_millis` | 前端建议轮询间隔 |
| `message` | 可读状态说明 |
| `connection_descriptor` | 已认证时可直接返回 |

示例：

```json
{
  "connector_channel_id": "cch_123",
  "flow_id": "wechat_qr_login",
  "auth_session_id": "auth_123",
  "status": "pending",
  "qr_code_text": "https://example/qr",
  "expires_at": 1790000000000,
  "poll_interval_millis": 2000,
  "message": "请扫码登录"
}
```

### 8.9 `auth.status`

方向：xAgent -> Connector。

payload：

```json
{
  "flow_id": "wechat_qr_login",
  "auth_session_id": "auth_123",
  "refresh": false
}
```

规则：

- `refresh = true` 表示请求 Connector 刷新认证材料，例如二维码。
- 未找到认证会话时，Connector 应返回 `auth.status.ack.error` 或 `type = "error"`，错误码建议 `auth_session_not_found`。

### 8.10 `auth.status.ack`

方向：Connector -> xAgent。

字段与 `auth.start.ack` 基本一致，`status` 取值：

- `pending`
- `scanned`
- `authenticated`
- `unauthenticated`
- `expired`
- `qr_refresh_required`
- `failed`

认证成功时应返回 `connection_descriptor`。xAgent 用它创建或回正用户连接投影和工具可用性；首次认证成功前的临时 Channel 不进入持久化层。

### 8.11 `auth.cancel`

方向：xAgent -> Connector。

语义：取消未完成的认证会话。

payload：

```json
{
  "auth_session_id": "auth_123"
}
```

规则：

- 必须在已打开 channel 上调用。
- 只取消认证流程，不删除已存在的目标系统登录态。
- 如果认证已经完成，Connector 可以返回 `ignored` 并附带当前 `connection_descriptor`。
- xAgent 取消首次创建中的认证时会同时关闭本地临时 Channel；该动作不会产生 UserConnector 记录。

### 8.12 `auth.cancel.ack`

方向：Connector -> xAgent。

payload：

```json
{
  "connector_channel_id": "cch_123",
  "auth_session_id": "auth_123",
  "status": "canceled",
  "auth_status": "unauthenticated",
  "message": "认证已取消"
}
```

`status` 取值：

- `canceled`
- `ignored`
- `not_found`

### 8.13 `auth.logout`

方向：xAgent -> Connector。

语义：退出当前 channel 绑定的目标系统真实登录态。

规则：

- 必须在已打开 channel 上调用。
- Connector 应清理目标系统登录态或授权材料。
- xAgent 在成功后保留本地 Channel 与专属 Session，更新为未认证并删除运行时路由。
- 删除本地 Channel 聚合是独立的显式删除动作，不属于 `auth.logout`。
- 它不是 `channel.close`。

### 8.14 `auth.logout.ack`

方向：Connector -> xAgent。

payload：

```json
{
  "status": "ok",
  "connection_descriptor": {}
}
```

`connection_descriptor` 应反映登出后的状态，例如 `created`、`expired` 或 `revoked`。

### 8.15 `connection.descriptor.get`

方向：xAgent -> Connector。

语义：请求当前 channel 的 Connection Descriptor。

payload 当前可为空。

### 8.16 `connection.descriptor.get.ack`

方向：Connector -> xAgent。

payload：

```json
{
  "connection_descriptor": {}
}
```

### 8.17 `connection.descriptor.push`

方向：Connector -> xAgent。

语义：Connector 主动推送当前 channel 的 descriptor 变化。

payload：

```json
{
  "connection_descriptor": {}
}
```

规则：

- 用于认证成功、权限变化、目标系统离线、token 过期等状态回正。
- xAgent 会校验 descriptor 身份，不匹配时忽略。
- Connector 不需要等待 xAgent 轮询后才推送重要状态变化。

### 8.18 `tool.invoke`

方向：xAgent -> Connector。

官方 Connector 返回的工具 input schema 会包含必填 `connector_channel_id`，因此模型 arguments 通常包含该字段：

```json
{
  "connector_channel_id": "cch_123",
  "text": "你好"
}
```

xAgent 当前按 Session 绑定和 Connector 可用状态选择实际 Channel，把该 Channel ID 写入 packet envelope。模型 arguments 原样进入 payload，因此 Connector data plane 当前收到的 wire packet 为：

payload：

```json
{
  "tool_id": "wechat_message_send",
  "arguments": {
    "connector_channel_id": "cch_123",
    "text": "你好"
  },
  "context": {
    "session_id": "session_123",
    "tool_call_id": "call_123"
  }
}
```

规则：

- `tool_id` 必须来自 Connector Card。
- xAgent 只会在当前 descriptor 中 tool 可用时投递。
- Connector 必须再次按目标系统权限校验。
- xAgent 当前不使用模型参数中的 `connector_channel_id` 选择或覆盖 Channel；实际路由只认 envelope 顶层字段。
- 模型参数中的 `connector_channel_id` 当前随其它 arguments 一起透传。Connector 业务工具不应消费或解释该冗余字段。
- `context` 是 xAgent 运行时上下文，Connector 只能作为关联信息使用，不能当鉴权材料。
- Connector 必须拒绝 envelope 中缺少、无归属、Connector 不匹配或不可用的 Channel。

### 8.19 `tool.invoke.ack`

方向：Connector -> xAgent。

成功 payload：

```json
{
  "tool_id": "wechat_message_send",
  "result": {
    "status": "sent",
    "message_id": "msg_123"
  }
}
```

失败 packet 使用 envelope 顶层 `error`：

```json
{
  "type": "tool.invoke.ack",
  "error": {
    "code": "tool_invoke_failed",
    "message": "message text required"
  }
}
```

规则：

- 不得返回目标系统 token、bot token、context token、API key 或目标系统 CDN 签名原文。
- 有副作用工具必须具备幂等或重复调用识别能力。
- 文件发送类工具在 xAgent 模型边界只暴露统一 `file_ref`。xAgent adapter 打开文件并在 wire 边界生成 Connector 内部上传引用后，Connector handler 只消费该内部引用，不消费文件正文、base64 或目标系统 URL。

### 8.20 `tool.progress.push`

方向：Connector -> xAgent。

语义：长耗时工具的进度事件。

payload 建议：

```json
{
  "tool_id": "long_running_tool",
  "status": "running",
  "message": "处理中",
  "progress": 0.5
}
```

当前 xAgent 主要等待 `tool.invoke.ack` 作为终态；progress 只能作为运行时事件，不替代 ack。

### 8.21 `message.push`

方向：Connector -> xAgent。

语义：旧 `xagent.im.v1` Connector 主动推送目标系统入站消息。当前 IM Connector 使用 `xagent.im.v2` 的 `chat.message`，不发送该 packet。

payload 示例：

```json
{
  "provider": "wechat",
  "profile": "xagent.im.v1",
  "event_kind": "im.message.received",
  "message_id": "7479013024887233416",
  "sender_id": "wx_user_1",
  "display_name": "张三",
  "text": "来自微信的用户消息：\n发送方：张三\n消息类型：文本\n用户文本：睡觉了",
  "raw_text": "睡觉了",
  "reply": {
    "required": true,
    "tool_id": "wechat_message_send"
  }
}
```

规则：

- envelope `connector_channel_id` 必填。
- `message_id` 建议稳定，用于 refs 和去重。
- `text`、`content` 或 `message` 是用户可见正文。
- `activation_message` 是内部执行目标，不等同于用户可见正文。
- 可以用 `target_session_ref`、`session_ref` 或 `target_session_id` 指定目标会话；不得同时出现多个目标 session ref。
- xAgent 默认把未指定目标的消息投递到当前 UserConnector 的专属 Connector Session。
- payload 的 Profile 语义、IM 字段、回复路由、文件引用和消息保留策略见 [xAgent IM Profile v1](profiles/xagent_im_v1.md)。

### 8.22 `ping` / `pong`

方向：双向。

规则：

- 收到 `ping` 后应回复 `pong`。
- `pong` 应带回同一个 `request_id`。

### 8.23 `error`

方向：双向。

用于协议、身份、路由和顺序错误。

示例：

```json
{
  "schema": "xagent.connector.packet/v1",
  "packet_id": "pkt_error",
  "request_id": "req_123",
  "connector_channel_id": "cch_123",
  "type": "error",
  "time": 1790000000000,
  "error": {
    "code": "channel_not_open",
    "message": "channel.open must complete before auth.start"
  }
}
```

常用错误码建议：

| 错误码 | 场景 |
| --- | --- |
| `invalid_packet` | JSON 或 envelope 非法 |
| `hello_required` | hello 完成前收到用户级 packet |
| `connector_card_id_mismatch` | hello 中 card ID 不匹配 |
| `connector_id_mismatch` | hello 中 connector ID 不匹配 |
| `channel_not_open` | 用户级 packet 没有已打开 channel |
| `connector_channel_id_required` | 用户级 packet envelope 缺少 `connector_channel_id` |
| `connector_channel_not_owned` | `connector_channel_id` 不属于当前 xAgent 用户 |
| `connector_channel_connector_mismatch` | `connector_channel_id` 不属于当前 Connector Card 或工具来源 |
| `connector_channel_unavailable` | channel 存在但当前不可用或该工具不可用 |
| `connection_not_found` | channel 不存在或未绑定 |
| `connection_not_authenticated` | channel 尚未完成目标系统认证 |
| `auth_session_not_found` | 认证会话不存在 |
| `tool_invoke_failed` | 工具执行失败 |
| `unsupported_packet` | packet type 不支持 |


## 9. Connection Descriptor

Connection Descriptor 是用户级运行态投影。

最小结构：

```json
{
  "schema": "xagent.connection/v2",
  "connection": {
    "connector_card_id": "im.wechat",
    "connector_id": "conn_im_wechat_xxx",
    "connector_channel_id": "cch_conn_im_wechat_xxx",
    "target_type": "im",
    "profiles": ["xagent.im.v2"],
    "status": "connected"
  },
  "target": {
    "provider": "wechat",
    "label": "微信",
    "display_name": "微信 0069***.bot",
    "account_hint": "0069***.bot"
  },
  "tools": [
    {
      "tool_id": "wechat_message_send",
      "status": "available",
      "target_permission_state": "granted"
    }
  ]
}
```

硬校验：

- `schema` 必须是 `xagent.connection/v2`。
- `connection.connector_card_id` 必须等于当前 Connector Card ID。
- `connection.connector_id` 必填。
- `connection.connector_channel_id` 必须等于当前 channel。
- `connection.target_type` 当前支持 `im`、`email`、`calendar`、`ticket`、`device`。
- `connection.profiles` 必须非空、不能重复，并且每项都必须已在 Connector Card `supports.profiles` 声明。
- `target.provider` 必填。
- `connection.status` 必须是支持状态。
- `tools[].tool_id` 必填。

`connection.status` 取值：

| 值 | 语义 |
| --- | --- |
| `created` | channel 已创建但尚未认证 |
| `authenticating` | 正在认证或绑定 |
| `connected` | 已绑定且当前在线可用 |
| `degraded` | 已绑定但部分能力降级 |
| `offline` | 绑定仍存在但目标或 Connector 当前离线 |
| `expired` | 认证材料已经过期 |
| `revoked` | 用户或目标系统撤销授权 |
| `error` | 无法自动分类的错误态 |

`tools[].status` 取值：

- `available`
- `unavailable`
- `denied_by_target`
- `requires_reauth`
- `not_supported`

`tools[].target_permission_state` 取值：

- `unknown`
- `granted`
- `denied`
- `requires_reauth`

规则：

- Card 中没有的工具不能出现在 Descriptor 中。
- Card 的 `supports.profiles` 表示静态能力；Descriptor 的 `connection.profiles` 表示当前 channel 实际启用的能力。
- Descriptor 中不可用的工具不能投影给 Agent。
- `target` 只能包含展示级账号信息和脱敏提示。
- `offline` 和 `error` 不等于登出；xAgent 会把它们视为已认证但当前不可激活。

## 10. Connector Card 工具声明

工具声明示例：

```json
{
  "tool_id": "wechat_message_send",
  "profile": "xagent.im.v2",
  "title": "发送微信 IM 消息",
  "description": "向当前 channel 绑定的微信用户发送文本消息；接收人由 connector 登录态决定。",
  "input_schema": {
    "type": "object",
    "required": ["connector_channel_id", "text"],
    "properties": {
      "connector_channel_id": {
        "type": "string",
        "description": "目标用户级 Connector channel ID。必须使用 connector_channels_list 或入站 source_connector_channel_id 得到的 opaque ID 原样传递。"
      },
      "text": {
        "type": "string",
        "description": "要发送给微信用户的文本内容。"
      }
    }
  },
  "output_schema": {
    "type": "object",
    "properties": {
      "status": {
        "type": "string"
      },
      "message_id": {
        "type": "string"
      }
    }
  }
}
```

规则：

- 工具必须真实可调用。
- 不允许把未来可能支持、但当前调用会 404 的能力放进 Card。
- 不允许伪造联系人搜索、文件搜索等目标系统不存在的工具。
- `tool_id` 会作为模型函数名暴露，必须只包含 ASCII 字母、数字、下划线、连字符和点号，长度不能超过 256。
- `input_schema` 必须通过协议层 helper（例如 Go 协议包中的 `WithConnectorChannelIDInputSchema(...)`）或等价逻辑注入标准 `connector_channel_id` 参数，避免每个 Connector 手写重复 schema。
- `connector_channel_id` 是保留模型参数，必须是 `string`，必须出现在 `required` 中。
- `connector_channel_id` 是 opaque ID，必须原样传递；不能用 Connector name、provider、ConnectorCardID、账号名称或目标系统账号 ID 替代。
- 当前 xAgent 会把模型提供的 `connector_channel_id` 保留在 `payload.arguments`，但 Connector 业务 handler 不消费该字段；实际路由只使用 envelope 顶层 `connector_channel_id`。
- 系统 API key、目标系统 token、transfer token 不进入 `input_schema`。
- Connector Card 可以按 wire 协议声明内部上传引用参数；xAgent 注册模型工具时必须把它投影为统一 `file_ref`，并在调用 Connector 前完成文件打开、上传和参数转换。LLM、Skill 和用户不可见该内部上传引用，也不直接传递文件字节、base64 或目标系统 URL。

### 10.1 当前工具 Channel 解析

当前 xAgent 对 Connector Card 工具采用以下解析流程：

1. 如果工具运行在 Connector 专属 Session，先按 `SessionID` 查找固定 UserConnector 绑定；绑定的 Connector Card 不匹配时拒绝调用。
2. xAgent 查询当前用户的 Connector Channel，并按 Connector Card、认证状态、连接状态、Descriptor 工具状态和目标权限过滤。
3. 存在专属 Session 绑定时只允许该 Channel；不存在绑定时采用查询结果中第一个可用 Channel。
4. xAgent 把选中 Channel 的 `connector_channel_id` 写入 `tool.invoke` envelope，并把模型 arguments 原样放入 payload。
5. Connector Server 只按 envelope 顶层 `connector_channel_id` 路由和校验目标系统登录态。

因此，Card 工具 schema 中模型可见的 `connector_channel_id` 当前不是 xAgent 的 Channel 选择依据，也不能覆盖 Session 绑定。需要按用户指定的精确 Channel 主动发送文本时，Agent 使用 xAgent 内置的 `connector_channels_list` 查询，再调用 `connector_message_send`；该工具会校验明确的 `connector_channel_id`。

Connector Card 不定义 `connector_card_id` 模型参数。Connector Server 从 envelope 的 `connector_channel_id` 及当前 data plane 身份校验归属。

## 11. Profile 规范

Connector 实现只需要理解公开协议，不需要理解 xAgent 内部 Session、Agent、事件队列或持久化结构。Connector data plane 不是 xAgent UI/Session WebSocket 的代理；`session.sync_request`、`session.sync_message`、`session.sync_end` 以及其它内部历史、回放和 UI 投影 Envelope 禁止进入 Connector wire。协议实现必须为全部标准 Profile 维护结构化能力目录，至少声明 Profile ID、允许的 Card `target_types`、packet type、方向和路由边界；需要接收 xAgent 内部实时投影的 Profile 还必须声明允许的出站 `PayloadType`。虚拟 Connector Channel 在协商完成后加载目录交集并只查询该结果，不得维护 Profile 特例或硬编码白名单。未列入协议目录和当前协商结果的内部信令一律不发送。IM v2 虚拟消息通道重连只恢复实时路由和未完成投递，不触发 Session 历史同步。

| Profile | 独立规范 | 负责内容 |
| --- | --- | --- |
| `xagent.im.v1` | [xAgent IM Profile v1](profiles/xagent_im_v1.md) | 保留的 `message.push`、IM 工具和回复路由语义；不放宽 Protocol `3.0` 准入要求 |
| `xagent.im.v2` | [xAgent IM Profile v2](profiles/xagent_im_v2.md) | 当前 IM Connector 的双向文本/文件、assistant delta、消息 ack、活动状态和 IM 工具 |
| `xagent.device.v1` | [xAgent Device Profile v1](profiles/xagent_device_v1.md) | 设备绑定、设备工具和安全边界 |

Profile 规范中的“必须”属于兼容契约；“建议”和具体数值只提供实现参考。内部存储、队列、线程和清理方式由 Connector 自己负责。

## 12. 版本兼容

兼容规则：

- Connector Card 只通过 `protocol_version` 声明 Connector 自身当前协议版本，不声明 xAgent 的最低兼容版本。
- xAgent 本地定义最低兼容版本，并在拉取 Card 时判断 Connector 版本是否位于 `[最低兼容版本, xAgent 当前版本]`；超出范围直接拒绝接入。
- hello 不交换版本列表，也不协商一个额外协议版本：xAgent 在 `connector.hello` 声明自身当前版本和支持的 Profile，Connector 在 ack 声明自身当前版本，并通过 Connection Descriptor 返回逐 Channel 实际启用的 Profile。
- xAgent 的底层版本解析器仍可识别缺少 `protocol_version` 的旧 Card 或 hello，但 catalog 准入和当前 Connector 都拒绝低于 `3.0` 的版本，不维护旧 wire 兼容分支。
- xAgent 接受 `xagent.connection/v1` wire descriptor，并立即将单值 `profile` 归一化为当前 `Profiles []string` 模型。
- 当前 Connector 收到低于 `3.0` 的 xAgent hello 时拒绝连接，不输出旧 wire descriptor；xAgent catalog 同样拒绝接入低于 `3.0` 的 Connector。
- 新增可选字段通常只需要升级 `connector.version`。
- 新增工具、auth flow、profile 或 Skill 内容，也升级 `connector.version`。
- 删除工具、修改 `tool_id`、修改既有字段语义、把可选参数改必填，属于破坏性变更。
- 修改 packet envelope、ID 校验规则、必选 packet 或核心状态语义，必须升级 Protocol version。
- xAgent 发现 `connector.version` 变化后，会重新拉取 Card 和 Skill，并刷新工具投影。

## 13. 当前实现边界

当前 xAgent 实现已经覆盖：

- `GET /connector-card.json`
- `GET /skill.md`
- `GET /health`
- `GET /ws`
- `POST /files/uploads` 和 `GET /files/refs/{file_ref}` 的 Connector 侧协议；具体 Connector 按实际文件方向选择实现
- `connector.hello`
- `channel.open`
- `channel.close`
- `auth.start`
- `auth.cancel`
- `auth.status`
- `auth.logout`
- `connection.descriptor.get`
- `connection.descriptor.push`
- `tool.invoke`
- `message.push`
- `xagent.im.v2` 的双向文本/文件 `chat.message`、文本 `chat.message.delta`、`chat.message.ack` 和 `chat.activity`
- `ping` / `pong`
- 入站文件 `download_url -> ResourceRef -> session file`
- assistant 文件块 `session file -> POST /files/uploads -> chat.message.files`

当前仍需注意：

- 用户 HTTP API 暂未暴露单独的 `channel.close` 入口；这不影响 Connector 实现 `channel.close` packet。
- Connector 文件 ResourceRef 当前自动解析链只支持 `download_url`。
- 文件下载 URL 如果是相对 URI，xAgent 会使用 catalog 中的 `server_base_url` 拼成绝对 URL。

## 14. 第三方实现建议

实现 Connector Server 时建议按以下顺序开发：

1. 固定 `connector_card_id`、Connector name、target type、provider、profile。
2. 实现公开 `/connector-card.json` 和 `/skill.md`。
3. 实现 `/health`，并在配置了 API key 时校验 `Authorization: Bearer <api_key>`。
4. 实现 `/ws` 和 `connector.hello`，持久化或稳定生成 `connector_id`。
5. 实现 `channel.open`，分配并持久化 `connector_channel_id`。
6. 实现 `connection.descriptor.get`，即使未认证也返回 `created` descriptor。
7. 实现目标系统认证流程：`auth.start`、`auth.status`、`auth.cancel`、`auth.logout`。
8. 实现 `tool.invoke`，并确保每个工具都在 Card 和 Descriptor 中一致声明。
9. 按所声明的 Profile 实现入站消息、重投和过期语义；当前 IM Connector 见 [xAgent IM Profile v2](profiles/xagent_im_v2.md)，v1 只用于旧 `message.push` 兼容。
10. 如果支持 Connector -> xAgent 文件，先本地缓存并实现 `/files/refs/{file_ref}`；如果支持 xAgent -> Connector 文件，再实现 `/files/uploads`。双向文件 Connector 同时实现两者。
11. 做断线恢复测试：xAgent 重连后重新 `channel.open`，尚未进入终态且未过期的消息仍可投递。
12. 做安全检查：日志、Card、Skill、Descriptor、tool result 和 message payload 中不能出现密钥或目标系统 token。
