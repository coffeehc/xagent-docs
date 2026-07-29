---
title: xAgent Connector Common Protocol
description: Connection, authentication, channel, message, file transfer, Tool invocation, and error protocol for xAgent Connector Protocol 3.0.
updated: 2026-07-29
---

# xAgent Connector Common Protocol

This document defines the xAgent Connector common protocol. Third-party Connector Server implementations should treat it as the wire contract.

For architecture responsibilities, fact ownership, and lifecycle, see [xAgent Connector Architecture](xagent_connection_architecture.md).

Current protocol version: `3.0`.

## 1. Protocol Family

| Name | Value |
| --- | --- |
| Connector Card schema | `xagent.connector/v1` |
| Connection Descriptor schema | `xagent.connection/v2` |
| Packet schema | `xagent.connector.packet/v1` |
| Data plane subprotocol | `xagent.connector.packet.v1` |
| Legacy IM Profile | `xagent.im.v1` |
| Current IM Profile | `xagent.im.v2` |
| Device Profile | `xagent.device.v1` |
| Protocol version | `3.0` |

Terms:

- `connector.version`: version of the Connector implementation in the Connector Card. Increment it when Tools, authentication flows, Skills, or capability declarations change.
- Protocol version: version of the xAgent Connector protocol. Increment it when the envelope, packet types, required fields, or core state semantics change.
- Base URL: root Connector Server URL configured by an administrator in xAgent. The xAgent catalog owns it; it does not appear in the Connector Card.
- System API key: system-level authentication key between xAgent backend and Connector Server. It must not enter the frontend, Agent, Skill, Card, Descriptor, Tool arguments, or message payload.

Machine-readable structure:

- [Connector Card `xagent.connector/v1`](schemas/xagent.connector.v1.schema.md)
- [Packet envelope `xagent.connector.packet/v1`](schemas/xagent.connector.packet.v1.schema.md)
- [Connection Descriptor `xagent.connection/v2`](schemas/xagent.connection.v2.schema.md)

JSON Schema constrains object structure, field types, and enumerations. This document and shared protocol-validation code remain authoritative for Profile ownership, cross-validation between Card and Descriptor, Channel ownership, and packet ordering.

## 2. Minimum Implementation

A Connector Server that integrates with xAgent must implement at least:

1. `GET /connector-card.json`: return the public Connector Card.
2. `GET /skill.md`: return the public Connector Skill; return `204` or `404` when there is no Skill.
3. `GET /health`: system-level health check.
4. `GET /ws`: WebSocket data plane.
5. Data-plane packets:
   - `connector.hello` / `connector.hello.ack`
   - `channel.open` / `channel.open.ack`
   - `auth.start` / `auth.start.ack` when user authentication is required
   - `auth.status` / `auth.status.ack` when authentication requires polling
   - `auth.cancel` / `auth.cancel.ack` when authentication can be canceled
   - `auth.logout` / `auth.logout.ack` when sign-out is supported
   - `connection.descriptor.get` / `connection.descriptor.get.ack`
   - `tool.invoke` / `tool.invoke.ack`
   - `message.push` or message packets defined by a declared Profile when the Connector has inbound messages
   - `ping` / `pong`
6. For files, images, videos, or audio, implement endpoints required by the actual transfer direction:
   - Connector -> xAgent download requires `GET /files/refs/{file_ref}`.
   - xAgent -> Connector upload requires `POST /files/uploads`.
   - A bidirectional file Connector implements both. A Connector that provides only inbound files, such as device screenshots, can implement download only.

A Connector needs to implement only the Profiles it declares, but must satisfy every **Must** requirement in each declared Profile specification.

## 3. Base URL and Authentication

xAgent resolves fixed endpoints from the Connector Base URL configured by an administrator.

Base URL rules:

- Scheme must be `http` or `https`.
- A host is required.
- Userinfo, query, and fragment are forbidden.
- A path prefix is allowed; xAgent appends fixed endpoints under that prefix.

System authentication rules:

- `/connector-card.json` and `/skill.md` must be publicly readable and should not require a system API key.
- `/health` can require the system API key. When configured, xAgent sends `Authorization: Bearer <api_key>`.
- `/ws` can require the system API key. When configured, xAgent sends `Authorization: Bearer <api_key>`.
- `/files/uploads` should require the system API key and permit only xAgent backend.
- If `/files/refs/{file_ref}` is returned as `message.push.files[].download_url` or `chat.message.files[].download_url`, the current xAgent download chain does not add an authentication header. Connector should use an unguessable short-TTL URL or include authorization in a one-time URL.

Security rules:

- The system API key is used only between xAgent backend and Connector Server.
- Target-system tokens, cookies, refresh tokens, bot tokens, and context tokens must not enter any object visible to xAgent.
- `connector_channel_id`, `request_id`, and `file_ref` are not authentication credentials.
- Connector must validate `connector_id`, `connector_channel_id`, target-system authentication state, and Tool permissions on the server.

## 4. Control Plane HTTP

### 4.1 `GET /connector-card.json`

Reads the Connector Card.

Authentication: none.

A successful response must be a JSON object.

Minimum response:

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
        "label": "WeChat"
      }
    ],
    "profiles": ["xagent.im.v2"]
  },
  "tools": [
    {
      "tool_id": "wechat_message_send",
      "profile": "xagent.im.v2",
      "title": "Send a WeChat Message",
      "description": "Send text to the WeChat contact bound to the current channel.",
      "related_skill_ids": ["connector-im-wechat"],
      "input_schema": {
        "type": "object",
        "required": ["connector_channel_id", "text"],
        "properties": {
          "connector_channel_id": {
            "type": "string",
            "description": "Target user-level Connector channel ID. Pass the opaque ID returned by connector_channels_list or inbound source_connector_channel_id unchanged."
          },
          "text": {
            "type": "string",
            "description": "Text to send."
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
      "title": "Sign in to WeChat with a QR Code"
    },
    {
      "id": "telegram_bot_binding",
      "target_type": "im",
      "type": "form",
      "title": "Bind a Telegram Bot",
      "fields": [
        {
          "name": "bot_token",
          "label": "Bot Token",
          "input_type": "password",
          "required": true,
          "placeholder": "123456:ABC-DEF...",
          "help_text": "Create a bot with BotFather and enter its token."
        },
        {
          "name": "chat_id",
          "label": "Chat ID",
          "input_type": "text",
          "required": true,
          "placeholder": "For example, 123456789",
          "help_text": "Start a conversation with the bot, then enter the target chat_id."
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

Hard validation:

- `schema` must be `xagent.connector/v1`.
- `protocol_version` identifies the public protocol version implemented by Connector. Current integrations must explicitly declare `3.0`.
- The Card does not declare a minimum compatible version; xAgent's local protocol implementation independently controls the admission floor.
- `connector_card_id` is required and should be fixed by the Connector developer rather than changed per deployment.
- `connector.name` is required and should be fixed by the Connector developer.
- `connector.version` is required.
- `supports.target_types` must be non-empty. Current values are `im`, `email`, `calendar`, `ticket`, and `device`.
- `supports.profiles` must be non-empty.
- Every standard Profile declares allowed `target_types`. A declared Profile must intersect with `supports.target_types`. `xagent.im.v2` allows only `im` and cannot be reused by Browser or another target type.
- `tools[].profile` must appear in `supports.profiles`. IM Tools in current Connectors belong to `xagent.im.v2`.
- `supports.user_channel_mode` can be `single` or `multiple`. xAgent treats an omitted field as `single` for compatibility.
- `tools[].tool_id` must be non-empty and unique.
- `tools[].tool_id` is exposed directly as a model function name. It has a maximum length of 256 and can contain only ASCII letters, digits, underscores, hyphens, and periods.
- `tools[].related_skill_ids` can identify Connector Skills recommended when using or selecting the Tool. It is workflow guidance, not an additional authentication requirement.
- `tools[].input_schema` must be an object schema.
- `tools[].input_schema.properties.connector_channel_id` must exist and have type `string`.
- `tools[].input_schema.required` must contain `connector_channel_id`.

Recommendations:

- `supports.targets[]` should declare `target_type`, `provider`, and `label`; otherwise xAgent can only use the Connector name as the source.
- `supports.user_channel_mode` is used only by xAgent to limit how many channels one user can create before `channel.open`. Connector Server does not reject or merge signals based on it.
- `auth_flows[].target_type` should align with `supports.target_types`.
- Recommended current values for `auth_flows[].type` are `qr_login` and `form`.
- `auth_flows[].fields` applies only when `type = form` and must contain at least one field.
- `security.trust_level` can be `unknown`, `builtin`, `verified`, `third_party`, or `local`.
- `security.api_key_required` indicates whether the system connection requires an API key.
- `security.data_classes` declares categories of data the Connector may access.

Forbidden:

- Do not put `server_base_url` in the Card.
- Do not put a system API key, target-system token, one-time QR code, OAuth state, or real sensitive identity in the Card.
- Do not declare a model argument named `connector_card_id` in a Tool schema. xAgent resolves and validates the Connector Card through `user_id + connector_channel_id`.
- Do not put a future Tool in `tools[]` when invoking it currently fails.
- Do not put an entire complex workflow in one Tool schema. The schema defines hard argument contracts; write steps, formatting, attachment upload, and multi-Tool orchestration in a Skill referenced by `related_skill_ids`.

`auth_flows[]` fields:

| Field | Required | Description |
| --- | --- | --- |
| `id` | Yes | Stable authentication flow ID |
| `target_type` | Yes | Target type, such as `im` |
| `type` | Yes | Authentication type; current recommendations are `qr_login` and `form` |
| `title` | Yes | User-facing authentication title |
| `description` | No | Authentication guidance |
| `fields` | When `type=form` | Dynamic form field definitions |

`auth_flows[].fields[]` fields:

| Field | Required | Description |
| --- | --- | --- |
| `name` | Yes | Submitted field name, unique within the flow |
| `label` | Yes | Frontend display label |
| `input_type` | Yes | Input control; current recommendations are `text` and `password` |
| `required` | No | Whether the field is required; default `false` |
| `placeholder` | No | Input placeholder |
| `help_text` | No | Field guidance |
| `secret` | No | Whether the field is sensitive; `password` fields should also set `secret=true` |
| `default_value` | No | Default value; forbidden for a sensitive field |

### 4.2 `GET /skill.md`

Reads the primary Connector Skill.

Authentication: none.

Responses:

- `200`: Markdown text.
- `204` or `404`: Connector does not provide a primary Skill.

A Skill describes only how an Agent handles events and uses Tools. It must not contain a secret, system API key, target-system token, or one-time authentication material.

Skill naming:

- The `name` in the `SKILL.md` header is the protocol-visible Connector Skill name and must be declared statically by the Connector developer.
- The current official convention is `connector-<connector-card-id>`, normalizing periods and underscores to hyphens. For example, `im.wechat` maps to `connector-im-wechat`.
- An additional Skill appends a stable purpose suffix to the primary Skill name, such as `connector-im-wechat-file`.
- A complete name must use lowercase hyphen-case with ASCII lowercase letters, digits, and hyphens only, preserving compatibility with general Skill-name validation.
- xAgent derives the storage identity of a Connector Skill from `connector_card_id`, but does not generate, replace, or rewrite the name in the `SKILL.md` header.
- Names such as `im-connector-reply` and `android-device-control` are forbidden because they do not follow the uniform format or do not identify the specific Connector.
- The `SKILL.md` header `name`, Connector Card `tools[].related_skill_ids`, Skill ID returned by Connector, and `skill_id` referenced in a message payload must match exactly.
- A Skill name is a stable protocol identifier. A rename must update the directory, Card, runtime code, and message templates together, and increment `connector.version` so xAgent refetches the Card and Skill.

Examples:

| Connector Card ID | Example Tool ID | Primary Skill Name |
| --- | --- | --- |
| `im.feishu` | `feishu_message_send` | `connector-im-feishu` |
| `im.telegram` | `telegram_message_send` | `connector-im-telegram` |
| `im.wechat` | `wechat_message_send` | `connector-im-wechat` |
| `device.adb` | `android_device_status` | `connector-device-adb` |

### 4.3 `GET /health`

Probes system-level Connector health.

Authentication: can require `Authorization: Bearer <api_key>`.

Successful response:

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

Rules:

- `2xx` means the Connector endpoint is available.
- `401` or `403` means system API key authentication failed.
- Except for `401` and `403`, a non-`2xx` response or request failure counts as one health failure. One or two consecutive failures produce `degraded`; the third and later produce `offline`.
- If `connector_card_id` is returned, it must match the integrated `connector_card_id`.
- `protocol_version` must match the current Connector Card. An incompatible Connector cannot remain online.
- `build` uses `configuration.Version`, `GitTag`, `GitRev`, and `BuildTime` injected at Connector build time and must match `build` in the Connector Card.
- xAgent periodically requests only `/health`. When `connector_card_version`, `protocol_version`, or `build` differs from the cached Card, xAgent refetches the Card and Skill.

## 5. Transfer Plane HTTP

Only xAgent backend accesses the Transfer Plane. The frontend and LLM do not access it directly.

### 5.1 `POST /files/uploads`

Uploads an outbound file and returns an internal Connector `file_ref`.

Authentication: should require `Authorization: Bearer <api_key>`.

Request:

```http
POST /files/uploads
Authorization: Bearer <api_key>
X-XAgent-Connector-Channel-ID: <connector_channel_id>
Content-Type: multipart/form-data
```

Form fields:

| Field | Required | Description |
| --- | --- | --- |
| `file` | Yes | File content to upload |
| `recipient_ref` | No | Target-system recipient reference |
| `reply_token` | No | Reply-target reference; can be a fallback when `recipient_ref` is absent |

Successful response:

```json
{
  "file_ref": "file_abc123",
  "file_type": "image",
  "filename": "image.jpg",
  "byte_size": 155000,
  "expires_at": 1790000000000
}
```

Rules:

- `file_ref` is an internal opaque Connector key.
- `file_ref` must be bound to `connector_channel_id`.
- Connector owns the expiration policy for `file_ref`.
- Upload means only that the file entered the Connector and target-system file chain; it does not mean a message was sent.
- When replying to the current message with `xagent.im.v2`, xAgent puts the returned `file_ref` in final `chat.message.files`. An explicit Tool workflow can still invoke a file-send Tool declared in the Connector Card.

### 5.2 `GET /files/refs/{file_ref}`

Downloads a file stream temporarily retained by Connector.

Authentication: Connector-defined. However, when this URL appears in `message.push.payload.files[].download_url` or `chat.message.payload.files[].download_url`, the current xAgent resource-resolution chain sends only the URL without an additional header.

Responses:

- `2xx`: file byte stream.
- `404`: `file_ref` does not exist or expired.
- `403`: `file_ref` does not match the current channel or authorization.

Rules:

- The endpoint returns raw bytes, not JSON.
- Set an appropriate `Content-Type`.
- A `Content-Disposition` filename is recommended.
- Do not expose a target-system CDN token, bot token, context token, or API key.
- For an expiring or one-time target-system CDN, Connector should download and cache an inbound file immediately.

## 6. Data Plane WebSocket

Endpoint:

```http
GET /ws
Sec-WebSocket-Protocol: xagent.connector.packet.v1
Authorization: Bearer <api_key>
```

Rules:

- Use WebSocket TextMessage only.
- Each message is one JSON packet.
- The first packet must be `connector.hello`.
- No user-level packet can be sent before `connector.hello.ack`.
- WebSocket does not carry file content, base64, or target-system CDN byte streams.
- After disconnection, xAgent reconnects automatically and reopens persistent user channels.

## 7. Packet Envelope

Every data-plane packet uses the same envelope:

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

Fields:

| Field | Required | Description |
| --- | --- | --- |
| `schema` | Yes | Fixed to `xagent.connector.packet/v1` |
| `packet_id` | Yes | Unique ID of the current packet |
| `request_id` | For requests and acks | Request ID generated by xAgent; Connector must return it unchanged |
| `reply_to` | Recommended for acks | `packet_id` to which this packet responds |
| `connector_channel_id` | For user-level packets | User-level channel ID assigned by Connector |
| `type` | Yes | Packet type |
| `time` | Recommended | Unix timestamp in milliseconds |
| `payload` | Type-specific | Business payload |
| `error` | On error | Stable error code and readable description |

Routing rules:

- xAgent routes synchronous responses through `request_id`.
- Connector-initiated pushes route to a user channel through `connector_channel_id`.
- Neither `request_id` nor `connector_channel_id` is an authentication credential.
- An ack should return the request's `request_id` and use `reply_to` to point to the request `packet_id`.

Error semantics:

- Protocol, identity, routing, and hello-order errors use `type = "error"`.
- A business-operation failure uses the corresponding ack packet's `error` field, such as `tool.invoke.ack.error`.
- `error.code` should be a stable machine-readable string.
- `error.message` is for logs and developers and must not contain a secret or target-system token.

## 8. Packet Types

### 8.1 `connector.hello`

Direction: xAgent -> Connector.

Payload:

```json
{
  "connector_card_id": "im.wechat",
  "connector_id": "conn_im_wechat_xxx",
  "protocol_version": "3.0",
  "supported_profiles": ["xagent.im.v1", "xagent.im.v2"]
}
```

Rules:

- `connector_card_id` is required and must match the current Connector Card.
- `connector_id` can be empty on the first connection.
- `protocol_version` is xAgent's current implementation version. A current Connector must reject a hello that omits a version or is below the supported version; it must not maintain a legacy wire fallback branch.
- `supported_profiles` is the set of Profiles actually supported by the current xAgent. Connector intersects it with static Card capabilities and returns only Profiles enabled for the current connection in the Connection Descriptor.
- A current Connector requires xAgent to send `supported_profiles` explicitly. Compatibility between an older xAgent and older Connector does not require a current Connector fallback.
- Connector can use the previous `connector_id` from the request to restore runtime state. It can issue a new one if server state was rebuilt.
- Connector must not reject the first connection solely because xAgent omitted `connector_id`.

### 8.2 `connector.hello.ack`

Direction: Connector -> xAgent.

Payload:

```json
{
  "connector_card_id": "im.wechat",
  "connector_id": "conn_im_wechat_xxx",
  "protocol_version": "3.0"
}
```

Rules:

- `connector_card_id` must match the request.
- `connector_id` is required.
- `protocol_version` is the Connector's current implementation version and must match the Connector Card. An omitted value parses as `1.0` and is rejected because it is below the current admission version.
- xAgent identifies the unique ConnectorClient by `connector_card_id` and updates its runtime-instance ID when the same Card returns a new `connector_id`.

xAgent Connector management permits only one Connector Server connection for each `connector_card_id`. This is an xAgent catalog constraint and does not require Connector Server to know about other deployment URLs.

Connector Server runtime lease:

- After all authenticated data planes for the current `connector_id` disconnect, Connector Server retains a one-hour reconnection grace period.
- Reconnecting with the same `connector_id` during the grace period cancels expiration. One continuous offline hour must unregister the `connector_id`.
- Unregistering `connector_id` cascades to every Channel and unfinished authentication session held by Connector Server. This governance action differs from regular `channel.close`.
- Each Channel unregistration independently cleans up its target-system binding. A shared `getUpdates`, platform connection, or equivalent consumer stops only after the final Channel reference is removed.
- When Connector Server restores persistent Channels at startup but no xAgent completes hello within one hour, it cleans up those Channels with no runtime-instance owner under the same rule.

### 8.3 `channel.open`

Direction: xAgent -> Connector.

Envelope `connector_channel_id`:

- Empty for the first open.
- The persisted `connector_channel_id` when restoring an existing channel.

The payload can currently be empty.

Rules:

- Connector can reuse a known channel.
- If Connector cannot recognize the old channel, it can assign a new `connector_channel_id`.
- `channel.open` opens only a runtime route; it does not mean target-system authentication completed.
- On first creation, xAgent does not persist a user Channel from `channel.open.ack` alone. It creates the local Channel aggregate only after authentication succeeds and a `connection_descriptor` is returned.
- When reauthenticating an existing connection, the client submits only xAgent's internal UserConnector primary key. xAgent resolves `connector_id` and `connector_channel_id` from `connector_card_id` and the current database record.

### 8.4 `channel.open.ack`

Direction: Connector -> xAgent.

Required:

- Envelope `connector_channel_id`.
- `payload.connector_channel_id`.
- `payload.connection_descriptor`.

Example:

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
        "label": "WeChat",
        "display_name": "WeChat not bound"
      }
    }
  }
}
```

### 8.5 `channel.close`

Direction: xAgent -> Connector.

Meaning: close the runtime channel route.

Rules:

- It does not delete target-system authentication state in Connector.
- It does not require xAgent to delete the local persistent binding.
- Connector should stop pushing `message.push` for this channel to the WebSocket route.

### 8.6 `channel.close.ack`

Direction: Connector -> xAgent.

Payload:

```json
{
  "status": "ok"
}
```

### 8.7 `auth.start`

Direction: xAgent -> Connector.

Payload:

```json
{
  "flow_id": "wechat_qr_login",
  "input": {
    "bot_token": "123456:ABC-DEF",
    "chat_id": "123456789"
  }
}
```

Rules:

- It must be called on an open channel.
- `flow_id` comes from Connector Card `auth_flows[].id`.
- `input` supplies authentication fields for a `type = form` flow. It can be omitted for an input-free flow such as `qr_login`.
- If reusable authentication state already exists for the channel, Connector can immediately return `authenticated` with a `connection_descriptor`.

### 8.8 `auth.start.ack`

Direction: Connector -> xAgent.

Payload fields:

| Field | Description |
| --- | --- |
| `connector_channel_id` | Channel for the current authentication |
| `flow_id` | Authentication flow ID |
| `auth_session_id` | Connector authentication session ID |
| `status` | `pending`, `scanned`, `authenticated`, `expired`, `qr_refresh_required`, or `failed` |
| `qr_code_text` | Raw QR code content |
| `qr_code_image` | QR code image URL or data URL |
| `expires_at` | Unix timestamp in milliseconds |
| `poll_interval_millis` | Suggested frontend polling interval |
| `message` | Readable state description |
| `connection_descriptor` | Can be returned immediately when authenticated |

Example:

```json
{
  "connector_channel_id": "cch_123",
  "flow_id": "wechat_qr_login",
  "auth_session_id": "auth_123",
  "status": "pending",
  "qr_code_text": "https://example/qr",
  "expires_at": 1790000000000,
  "poll_interval_millis": 2000,
  "message": "Scan the QR code to sign in"
}
```

### 8.9 `auth.status`

Direction: xAgent -> Connector.

Payload:

```json
{
  "flow_id": "wechat_qr_login",
  "auth_session_id": "auth_123",
  "refresh": false
}
```

Rules:

- `refresh = true` asks Connector to refresh authentication material such as a QR code.
- If the authentication session is not found, Connector should return `auth.status.ack.error` or `type = "error"`, preferably with code `auth_session_not_found`.

### 8.10 `auth.status.ack`

Direction: Connector -> xAgent.

Fields are generally the same as `auth.start.ack`. `status` values:

- `pending`
- `scanned`
- `authenticated`
- `unauthenticated`
- `expired`
- `qr_refresh_required`
- `failed`

On successful authentication, return `connection_descriptor`. xAgent uses it to create or correct the user connection projection and Tool availability. A temporary Channel before first successful authentication is not persisted.

### 8.11 `auth.cancel`

Direction: xAgent -> Connector.

Meaning: cancel an unfinished authentication session.

Payload:

```json
{
  "auth_session_id": "auth_123"
}
```

Rules:

- It must be called on an open channel.
- It cancels only the authentication flow and does not delete existing target-system authentication state.
- If authentication already completed, Connector can return `ignored` with the current `connection_descriptor`.
- When xAgent cancels authentication during first-time creation, it also closes the local temporary Channel. No UserConnector record is created.

### 8.12 `auth.cancel.ack`

Direction: Connector -> xAgent.

Payload:

```json
{
  "connector_channel_id": "cch_123",
  "auth_session_id": "auth_123",
  "status": "canceled",
  "auth_status": "unauthenticated",
  "message": "Authentication canceled"
}
```

`status` values:

- `canceled`
- `ignored`
- `not_found`

### 8.13 `auth.logout`

Direction: xAgent -> Connector.

Meaning: sign out of the actual target-system authentication state bound to the current channel.

Rules:

- It must be called on an open channel.
- Connector should clear target-system authentication state or authorization material.
- After success, xAgent retains the local Channel and dedicated Session, marks them unauthenticated, and removes the runtime route.
- Deleting the local Channel aggregate is a separate explicit delete action and is not part of `auth.logout`.
- It is not `channel.close`.

### 8.14 `auth.logout.ack`

Direction: Connector -> xAgent.

Payload:

```json
{
  "status": "ok",
  "connection_descriptor": {}
}
```

`connection_descriptor` should represent state after sign-out, such as `created`, `expired`, or `revoked`.

### 8.15 `connection.descriptor.get`

Direction: xAgent -> Connector.

Meaning: request the Connection Descriptor for the current channel.

The payload can currently be empty.

### 8.16 `connection.descriptor.get.ack`

Direction: Connector -> xAgent.

Payload:

```json
{
  "connection_descriptor": {}
}
```

### 8.17 `connection.descriptor.push`

Direction: Connector -> xAgent.

Meaning: Connector proactively pushes a Descriptor change for the current channel.

Payload:

```json
{
  "connection_descriptor": {}
}
```

Rules:

- Use it to correct state after successful authentication, a permission change, target-system disconnection, token expiration, and similar events.
- xAgent validates Descriptor identity and ignores a mismatch.
- Connector does not need to wait for xAgent polling before pushing an important state change.

### 8.18 `tool.invoke`

Direction: xAgent -> Connector.

The Tool input schema returned by an official Connector includes required `connector_channel_id`, so model arguments generally include it:

```json
{
  "connector_channel_id": "cch_123",
  "text": "Hello"
}
```

xAgent currently selects the actual Channel from the Session binding and Connector availability, then writes that Channel ID to the packet envelope. Model arguments enter the payload unchanged, so the Connector data plane receives:

```json
{
  "tool_id": "wechat_message_send",
  "arguments": {
    "connector_channel_id": "cch_123",
    "text": "Hello"
  },
  "context": {
    "session_id": "session_123",
    "tool_call_id": "call_123"
  }
}
```

Rules:

- `tool_id` must come from the Connector Card.
- xAgent delivers the request only when the Tool is available in the current Descriptor.
- Connector must validate target-system permissions again.
- xAgent does not select or override a Channel from the model's `connector_channel_id`; actual routing uses only the top-level envelope field.
- The model argument `connector_channel_id` is currently forwarded with other arguments. A Connector business Tool should not consume or interpret this redundant field.
- `context` is xAgent runtime correlation information. Connector must not treat it as authorization material.
- Connector must reject a Channel that is missing, unowned, associated with a different Connector, or unavailable.

### 8.19 `tool.invoke.ack`

Direction: Connector -> xAgent.

Successful payload:

```json
{
  "tool_id": "wechat_message_send",
  "result": {
    "status": "sent",
    "message_id": "msg_123"
  }
}
```

A failure packet uses top-level envelope `error`:

```json
{
  "type": "tool.invoke.ack",
  "error": {
    "code": "tool_invoke_failed",
    "message": "message text required"
  }
}
```

Rules:

- Do not return a target-system token, bot token, context token, API key, or raw target-system CDN signature.
- A side-effecting Tool must support idempotency or repeated-call detection.
- A file-send Tool exposes only unified `file_ref` at the xAgent model boundary. After the xAgent adapter opens the file and generates an internal Connector upload reference at the wire boundary, the Connector handler consumes only that internal reference, not file content, base64, or a target-system URL.

### 8.20 `tool.progress.push`

Direction: Connector -> xAgent.

Meaning: progress event for a long-running Tool.

Recommended payload:

```json
{
  "tool_id": "long_running_tool",
  "status": "running",
  "message": "Processing",
  "progress": 0.5
}
```

The current xAgent primarily waits for `tool.invoke.ack` as the terminal state. Progress is only a runtime event and cannot replace the ack.

### 8.21 `message.push`

Direction: Connector -> xAgent.

Meaning: a legacy `xagent.im.v1` Connector proactively pushes an inbound target-system message. A current IM Connector uses `chat.message` from `xagent.im.v2` and does not send this packet.

Example payload:

```json
{
  "provider": "wechat",
  "profile": "xagent.im.v1",
  "event_kind": "im.message.received",
  "message_id": "7479013024887233416",
  "sender_id": "wx_user_1",
  "display_name": "Alex",
  "text": "User message from WeChat:\nSender: Alex\nMessage type: text\nUser text: Going to sleep",
  "raw_text": "Going to sleep",
  "reply": {
    "required": true,
    "tool_id": "wechat_message_send"
  }
}
```

Rules:

- Envelope `connector_channel_id` is required.
- `message_id` should be stable for references and deduplication.
- `text`, `content`, or `message` is user-visible content.
- `activation_message` is an internal execution goal, not user-visible content.
- `target_session_ref`, `session_ref`, or `target_session_id` can identify a target Session, but no more than one target Session reference can appear.
- By default, xAgent delivers a message without a target to the dedicated Connector Session of the current UserConnector.
- For Profile semantics, IM fields, reply routing, file references, and retention policy, see [xAgent IM Profile v1](profiles/xagent_im_v1.md).

### 8.22 `ping` / `pong`

Direction: bidirectional.

Rules:

- Reply to `ping` with `pong`.
- `pong` should return the same `request_id`.

### 8.23 `error`

Direction: bidirectional.

Used for protocol, identity, routing, and ordering errors.

Example:

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

Recommended common error codes:

| Error Code | Scenario |
| --- | --- |
| `invalid_packet` | Invalid JSON or envelope |
| `hello_required` | User-level packet received before hello completes |
| `connector_card_id_mismatch` | Card ID mismatch in hello |
| `connector_id_mismatch` | Connector ID mismatch in hello |
| `channel_not_open` | User-level packet has no open channel |
| `connector_channel_id_required` | User-level packet envelope omits `connector_channel_id` |
| `connector_channel_not_owned` | `connector_channel_id` does not belong to the current xAgent user |
| `connector_channel_connector_mismatch` | `connector_channel_id` does not belong to the current Connector Card or Tool source |
| `connector_channel_unavailable` | Channel exists but is unavailable, or the Tool is unavailable |
| `connection_not_found` | Channel does not exist or is not bound |
| `connection_not_authenticated` | Target-system authentication is incomplete |
| `auth_session_not_found` | Authentication session does not exist |
| `tool_invoke_failed` | Tool invocation failed |
| `unsupported_packet` | Packet type is unsupported |

## 9. Connection Descriptor

The Connection Descriptor is a user-level runtime projection.

Minimum structure:

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
    "label": "WeChat",
    "display_name": "WeChat 0069***.bot",
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

Hard validation:

- `schema` must be `xagent.connection/v2`.
- `connection.connector_card_id` must equal the current Connector Card ID.
- `connection.connector_id` is required.
- `connection.connector_channel_id` must equal the current channel.
- Current `connection.target_type` values are `im`, `email`, `calendar`, `ticket`, and `device`.
- `connection.profiles` must be non-empty and unique, and every entry must be declared in Connector Card `supports.profiles`.
- `target.provider` is required.
- `connection.status` must be supported.
- `tools[].tool_id` is required.

`connection.status` values:

| Value | Meaning |
| --- | --- |
| `created` | Channel created but not authenticated |
| `authenticating` | Authentication or binding in progress |
| `connected` | Bound, online, and available |
| `degraded` | Bound with some capabilities degraded |
| `offline` | Binding remains, but target or Connector is offline |
| `expired` | Authentication material expired |
| `revoked` | User or target system revoked authorization |
| `error` | Error state that cannot be classified automatically |

`tools[].status` values:

- `available`
- `unavailable`
- `denied_by_target`
- `requires_reauth`
- `not_supported`

`tools[].target_permission_state` values:

- `unknown`
- `granted`
- `denied`
- `requires_reauth`

Rules:

- A Tool absent from the Card cannot appear in the Descriptor.
- Card `supports.profiles` represents static capabilities; Descriptor `connection.profiles` represents capabilities actually enabled for the current channel.
- An unavailable Tool in the Descriptor cannot be projected to the Agent.
- `target` can contain only display-level account information and redacted hints.
- `offline` and `error` do not mean signed out. xAgent treats them as authenticated but currently inactive.

## 10. Connector Card Tool Declarations

Example:

```json
{
  "tool_id": "wechat_message_send",
  "profile": "xagent.im.v2",
  "title": "Send a WeChat IM Message",
  "description": "Send text to the WeChat user bound to the current channel; Connector authentication state determines the recipient.",
  "input_schema": {
    "type": "object",
    "required": ["connector_channel_id", "text"],
    "properties": {
      "connector_channel_id": {
        "type": "string",
        "description": "Target user-level Connector channel ID. Pass the opaque ID returned by connector_channels_list or inbound source_connector_channel_id unchanged."
      },
      "text": {
        "type": "string",
        "description": "Text to send to the WeChat user."
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

Rules:

- A Tool must be callable in the current implementation.
- A future capability that currently returns 404 must not appear in the Card.
- A Connector must not fabricate target-system capabilities such as contact search or file search.
- `tool_id` is exposed as a model function name. It can contain only ASCII letters, digits, underscores, hyphens, and periods, with a maximum length of 256.
- `input_schema` must inject the standard `connector_channel_id` through a protocol helper, such as `WithConnectorChannelIDInputSchema(...)` in the Go protocol package, or equivalent logic. Each Connector should not hand-write a duplicate schema.
- `connector_channel_id` is a reserved model argument. It must have type `string` and appear in `required`.
- `connector_channel_id` is opaque and must be passed unchanged. A Connector name, provider, ConnectorCardID, account name, or target-system account ID cannot replace it.
- xAgent currently keeps the model-provided `connector_channel_id` in `payload.arguments`, but a Connector business handler does not consume it. Actual routing uses only top-level envelope `connector_channel_id`.
- System API keys, target-system tokens, and transfer tokens do not appear in `input_schema`.
- A Connector Card can declare an internal upload-reference argument for the wire protocol. When registering the model Tool, xAgent must project it as unified `file_ref` and complete file opening, upload, and argument conversion before invoking Connector. The LLM, Skill, and user cannot see the internal upload reference or directly pass file bytes, base64, or a target-system URL.

### 10.1 Current Tool Channel Resolution

xAgent currently resolves a Connector Card Tool as follows:

1. If the Tool runs in a dedicated Connector Session, first locate the fixed UserConnector binding by `SessionID`. Reject the call if the bound Connector Card does not match.
2. Query Connector Channels for the current user and filter by Connector Card, authentication state, connection state, Descriptor Tool state, and target permission.
3. If a dedicated Session binding exists, allow only that Channel. Without a binding, select the first available Channel in the query result.
4. Write the selected Channel's `connector_channel_id` to the `tool.invoke` envelope and put model arguments in the payload unchanged.
5. Connector Server routes and validates target-system authentication state only by the envelope's top-level `connector_channel_id`.

Therefore, model-visible `connector_channel_id` in the Card Tool schema is not currently an xAgent Channel-selection input and cannot override a Session binding. To proactively send text through an exact user-selected Channel, the Agent uses built-in `connector_channels_list`, then invokes `connector_message_send`, which validates the explicit `connector_channel_id`.

The Connector Card does not define a model argument named `connector_card_id`. Connector Server validates ownership from envelope `connector_channel_id` and the current data-plane identity.

## 11. Profile Specifications

A Connector implementation needs to understand only the public protocol, not xAgent's internal Session, Agent, event queue, or persistence structures. The Connector data plane is not a proxy for the xAgent UI and Session WebSocket. Internal Envelopes such as `session.sync_request`, `session.sync_message`, `session.sync_end`, history, replay, and UI projection are forbidden from Connector wire. The protocol implementation must maintain a structured capability catalog for every standard Profile, declaring at least the Profile ID, allowed Card `target_types`, packet type, direction, and routing boundary. A Profile that receives internal real-time xAgent projections must also declare allowed outbound `PayloadType` values. After negotiation, a virtual Connector Channel loads the catalog intersection and queries only that result; it must not maintain Profile special cases or a hard-coded allowlist. Internal signals absent from the protocol catalog and current negotiated result are never sent. Reconnecting an IM v2 virtual message channel restores only real-time routing and unfinished delivery and does not initiate Session history synchronization.

| Profile | Specification | Responsibility |
| --- | --- | --- |
| `xagent.im.v1` | [xAgent IM Profile v1](profiles/xagent_im_v1.md) | Preserved `message.push`, IM Tool, and reply-routing semantics; does not relax Protocol `3.0` admission |
| `xagent.im.v2` | [xAgent IM Profile v2](profiles/xagent_im_v2.md) | Bidirectional text and files, assistant deltas, message acks, activity state, and IM Tools for current IM Connectors |
| `xagent.device.v1` | [xAgent Device Profile v1](profiles/xagent_device_v1.md) | Device binding, device Tools, and safety boundaries |

A **Must** statement in a Profile is a compatibility contract. A **Should** statement and a numeric recommendation are implementation guidance. Connector owns its internal storage, queues, threads, and cleanup.

## 12. Version Compatibility

Compatibility rules:

- The Connector Card declares only the Connector's current protocol version in `protocol_version`; it does not declare xAgent's minimum compatible version.
- xAgent defines its minimum compatible version locally and admits a Connector only when its version is within `[minimum compatible version, current xAgent version]`.
- Hello does not exchange version lists or negotiate another version. xAgent declares its current version and supported Profiles in `connector.hello`; Connector declares its current version in the ack and returns Profiles actually enabled for each Channel in the Connection Descriptor.
- xAgent's low-level version parser can recognize a legacy Card or hello that omits `protocol_version`, but catalog admission and current Connectors reject versions below `3.0` and do not maintain a legacy wire fallback branch.
- xAgent accepts a wire Descriptor with `xagent.connection/v1` and immediately normalizes its singular `profile` into the current `Profiles []string` model.
- A current Connector rejects an xAgent hello below `3.0` and does not emit a legacy wire Descriptor. The xAgent catalog likewise rejects Connectors below `3.0`.
- Adding an optional field generally requires only a `connector.version` increment.
- Adding a Tool, auth flow, Profile, or Skill content also increments `connector.version`.
- Removing a Tool, changing `tool_id`, changing existing field semantics, or making an optional argument required is a breaking change.
- Changing the packet envelope, ID validation, required packets, or core state semantics requires a Protocol version increment.
- When xAgent detects a `connector.version` change, it refetches the Card and Skill and refreshes Tool projection.

## 13. Current Implementation Boundary

The current xAgent implementation covers:

- `GET /connector-card.json`
- `GET /skill.md`
- `GET /health`
- `GET /ws`
- Connector-side protocols for `POST /files/uploads` and `GET /files/refs/{file_ref}`; a Connector implements endpoints required by its actual file direction
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
- Bidirectional text and file `chat.message`, text `chat.message.delta`, `chat.message.ack`, and `chat.activity` for `xagent.im.v2`
- `ping` / `pong`
- Inbound files: `download_url -> ResourceRef -> Session file`
- Assistant file blocks: `Session file -> POST /files/uploads -> chat.message.files`

Current limitations:

- The user HTTP API does not yet expose a separate `channel.close` endpoint. This does not prevent Connector from implementing the `channel.close` packet.
- The automatic resolution chain for a Connector file ResourceRef currently supports only `download_url`.
- When a file download URL is relative, xAgent resolves it to an absolute URL through catalog `server_base_url`.

## 14. Third-party Implementation Sequence

Recommended order for implementing a Connector Server:

1. Fix `connector_card_id`, Connector name, target type, provider, and Profile.
2. Implement public `/connector-card.json` and `/skill.md`.
3. Implement `/health` and validate `Authorization: Bearer <api_key>` when an API key is configured.
4. Implement `/ws` and `connector.hello`, persisting or stably generating `connector_id`.
5. Implement `channel.open`, assigning and persisting `connector_channel_id`.
6. Implement `connection.descriptor.get`, returning a `created` Descriptor even before authentication.
7. Implement target-system authentication: `auth.start`, `auth.status`, `auth.cancel`, and `auth.logout`.
8. Implement `tool.invoke` and declare every Tool consistently in both Card and Descriptor.
9. Implement inbound-message, redelivery, and expiration semantics for each declared Profile. Current IM Connectors use [xAgent IM Profile v2](profiles/xagent_im_v2.md); v1 exists only for legacy `message.push` compatibility.
10. For Connector -> xAgent files, cache locally and implement `/files/refs/{file_ref}`. For xAgent -> Connector files, implement `/files/uploads`. A bidirectional file Connector implements both.
11. Test disconnection recovery: after xAgent reconnects and repeats `channel.open`, a message that has not reached a terminal state and has not expired remains deliverable.
12. Run a security check: logs, Card, Skill, Descriptor, Tool results, and message payloads must not contain a secret or target-system token.
