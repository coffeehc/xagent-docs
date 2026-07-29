---
title: xAgent IM Profile v2
description: Bidirectional messages, file transfer, text deltas, delivery acknowledgments, and activity state for xAgent IM Profile v2.
---

# xAgent IM Profile v2

This document defines bidirectional complete text and file messages, assistant text deltas, delivery acknowledgments, activity state, and IM Tool ownership for `xagent.im.v2`.
For common connection, envelope, channel, and error semantics, see the
[xAgent Connector Common Protocol](../xagent_connector_protocol.md).

## 1. Purpose

`xagent.im.v2` is the current Profile for `target_types: ["im"]`. It is neither a general chat Profile shared across target types nor a new communication plane.

It defines only:

- Bidirectional complete text and file messages.
- Assistant text deltas from xAgent to Connector.
- Acknowledgments for complete messages.
- Redacted thinking, Tool activity, and idle state from xAgent to Connector.
- Profile ownership of IM send, reply, and file Tools in the Card; invocation still uses `tool.invoke` from the common protocol.

It does not define interrupts, approvals, pending state, Agent Tool-call details, file bytes, or Browser Runtime signaling. File metadata and `file_ref` can appear in `chat.message`, but bytes must travel through the Transfer Plane. Every other target type must use its own versioned Profile. For example, Browser messages belong to `xagent.browser-runtime.v1/v2` and must not declare `xagent.im.v2`.

An IM v2 message channel is a real-time message relay protocol, not a Session synchronization protocol. Internal xAgent signals including `session.sync_request`, `session.sync_message`, `session.sync_end`, history snapshots, history replay, and UI projections are forbidden from this Profile and must not be tunneled through another Connector Profile. A virtual Connector Channel in xAgent only delivers new user messages to the unified Brain processing chain and sends assistant deltas, final messages, and optional activity state from the current execution back to the Connector.

Creating or reconnecting an IM v2 message channel restores only real-time routing and unfinished delivery; it does not proactively send completed historical messages. A final `chat.message` from xAgent to Connector must be triggered by the completion event of a newly persisted assistant message in the current real-time execution. It must not be generated from a Session history query, history traversal, or synchronization projection. Here, "final" means completion of one assistant message, not completion of the full Agent and Tool loop. If one Tool chain produces multiple stable assistant messages, each must be sent separately with its own `message_id`.

The virtual Connector Channel in xAgent must load its negotiated result from the protocol layer's structured Profile catalog and silently filter all other internal signals. It must not hard-code a signaling allowlist in the channel implementation. One IM v2 catalog entry declares `chat.message`, `chat.message.delta`, `chat.message.ack`, `chat.activity`, and their outbound projections. Adding an internal xAgent `PayloadType`, Session state, or business event must not automatically expand the protocol surface visible to a Connector.

## 2. Profile Declaration

The Connector Card declares static support in `supports.profiles`. The Connection Descriptor declares Profiles actually enabled for the current channel in `connection.profiles`.

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

A Descriptor can declare only Profiles that the Card declares.

## 3. Identity and Routing

- The top-level `connector_channel_id` in WirePacket is the only Channel routing identifier.
- A payload must not contain `session_id`, `user_connector_id`, `user_id`, `connector_id`, or `role`.
- Packet direction determines the message author.
- `message_id` is the idempotency identifier for a business message within the current Channel.
- `packet_id` identifies one transmission and `reply_to` associates an acknowledgment. Neither can replace `message_id`.

## 4. Packets

There are four base packet types:

| Type | Direction | Meaning |
| --- | --- | --- |
| `chat.message` | Bidirectional | Complete, persistable final text or file message |
| `chat.message.delta` | xAgent -> Connector | Real-time text delta for an assistant message |
| `chat.message.ack` | Bidirectional | Acknowledgment that a complete message was accepted, duplicated, or rejected |
| `chat.activity` | xAgent -> Connector | Complete, redacted snapshot of the current processing state |

An extension Profile must not change the fields, direction, idempotency, or completion semantics of these packets.

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
    "text": "Summarize the current page",
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

Implementations must follow these rules:

- Connector -> xAgent represents user input; xAgent -> Connector represents final assistant output.
- The sender generates `message_id`. It must be stable within the same `connector_channel_id` and must not be reused for another message.
- At least one of `text` and `files` must be non-empty. A file message can omit text.
- `files[].type` must be `image`, `video`, `audio`, or `file`.
- Each file item must provide a `file_ref` unique within the current message. `filename`, `mime_type`, `byte_size`, and `expires_at` are optional metadata.
- A Connector -> xAgent file item must provide `download_url`. It can be an absolute HTTP(S) URL or a relative Connector URI. xAgent downloads the file and registers it as a file in the current Session.
- Before xAgent sends a file to a Connector, it must upload the corresponding Session file to the current Connector Channel through `POST /files/uploads`, then place the returned `file_ref` in the final `chat.message`. This direction does not require `download_url`.
- File bytes, base64, local paths, target-system tokens, and CDN authentication material are forbidden from `chat.message`.
- The receiver uses only `message_id` to process retransmission of a business message idempotently.
- The final xAgent -> Connector `chat.message` is the only completion fact for an assistant message.
- The Connector must treat `chat.message.text` in the final packet as the complete content. It must not send both assembled delta content and final content as separate messages.
- The final text and all files together form one business message. The receiver can return `accepted` only after all target-system side effects complete.
- The Connector must be able to process a final message without ever receiving a delta.

## 6. `chat.message.delta`

Direction: xAgent -> Connector.

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
    "text": "The current page"
  }
}
```

Implementations must follow these rules:

- `sequence` starts at 1 and increases strictly within one `message_id`.
- Retransmission of the same `message_id + sequence` must be idempotent and must not append text twice.
- The sender's output shape determines whether deltas occur. A Connector must not assume every message has deltas.
- A delta is not a completion fact and cannot replace the final `chat.message`.
- A delta carries text only. Files appear only in the final `chat.message`.
- A Connector must not send assistant deltas to xAgent.

Recommended implementation:

- If the target system supports streaming updates, create the target message with the first delta and update the same message with later deltas.
- If the target system does not support streaming updates, cache deltas in the Connector and send once after the final message arrives.
- A delta cache should have a finite lifetime and capacity so a missing final packet cannot consume resources indefinitely.
- The implementation defines and documents delta-cache TTL, capacity, and cleanup interval.

## 7. `chat.message.ack`

`reply_to` must point to the acknowledged `chat.message` packet. An ack indicates only whether the receiver accepted the message. It does not indicate that Agent execution, a target-system reply, or any subsequent business process has completed.

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

`status` values:

- `accepted`: accepted for the first time.
- `duplicate`: the same `message_id` was already accepted and is not processed again.
- `rejected`: explicitly rejected. The payload must provide a stable `code` and Boolean `retryable`; it can include a short `message`.

Implementations must follow these rules:

- The ack's `connector_channel_id` and `message_id` must match the original message.
- `reply_to` must match the original packet's `packet_id`.
- The sender must not interpret a timeout or disconnection as `accepted`.
- A receiver that already accepted the same message must return `duplicate` without executing side effects again.
- `retryable=true` means the same `message_id` and content can be redelivered after backoff. `retryable=false` means the same request will not succeed; the sender must stop automatic redelivery and preserve an observable failure reason.
- Deterministic errors such as an invalid payload, permission denial, invalid authentication state, or explicit target-platform rejection must use `retryable=false`. Errors such as a network interruption, rate limit, or temporary busy state can use `retryable=true`.

## 8. `chat.activity`

Direction: xAgent -> Connector. Each packet is a complete snapshot of the current channel state and replaces the previous state directly. It is not persisted, requires no ack, and does not participate in message idempotency.

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

- `status` must be `thinking`, `tool`, or `idle`.
- `tool_name` is required only when `status=tool`, with a maximum of 256 bytes. It is forbidden for other states.
- The payload must not include reasoning, Tool arguments, Tool results, error details, paths, URLs, secrets, or internal identities.
- If the target system does not support custom status, the Connector must degrade `thinking` and `tool` to typing or an equivalent state. If it does not support typing, the operation can be a no-op.
- Clear temporary activity on `idle`, a final message, or the start of visible text deltas.
- Temporary activity must have a local timeout. Failure to send activity must not reject, retry, or duplicate a chat message.

## 9. Cache and Idempotency State

The Profile constrains only external results:

- A sender must retain a complete message as pending until it receives a terminal ack. It can remove the message from the pending set only after `accepted` or `duplicate`.
- A timeout, disconnection, or `rejected` with `retryable=true` must not be interpreted as successful delivery. Redelivery must reuse the original `message_id`.
- A `rejected` result with `retryable=false` is a failed terminal state. The sender must remove the pending message and must not repeat the same target-system request.
- Both unfinished delta state and idempotency state for completed `message_id` values must be bounded.
- When the final packet arrives, clear temporary delta state for the same message.
- After successfully sending to the target system, the receiver must retain bounded completed-`message_id` idempotency state and detect content conflicts using the complete text and file list. This is not a pending message and must not be deleted immediately after returning an ack.
- When a channel is permanently deleted, all temporary state for that channel can be removed.
- The implementation decides whether to restore deltas after a Connector restart. In either case, it must not send the final message twice.

Sender pending-delivery state and receiver completed-idempotency state are independent facts. They must not share a "delete immediately after sending" lifecycle. An implementation can use memory, a database, or an editable target-system message handle. Exact cache sizes and durations are implementation guidance.

## 10. Errors

- Profile not declared or not in the current negotiated allowlist: the virtual channel silently drops the signal without an error response.
- Channel not open: `channel_not_open`.
- Invalid payload: `invalid_packet` or a more specific stable code.
- Non-contiguous or conflicting sequence: explicitly reject it; do not concatenate silently.
- Target-system delivery failure: use `rejected` in `chat.message.ack` with a stable code.

## 11. Conformance Checklist

- Do both the Card and Descriptor declare this Profile?
- Does the implementation support both delta plus final and direct final delivery?
- Is business idempotency based only on `message_id`?
- Does each ack strictly match `reply_to`, channel, and message?
- When streaming display is unsupported, does the Connector avoid sending temporary text?
- Are delta and completed-idempotency state bounded?
- Are internal fields such as Session, role, and user ID absent?
- Do inbound files provide a downloadable URL, and are outbound files uploaded before they are referenced?
- Are files included only in the final packet, with the text and all files treated as one ack unit?
- Is Session synchronization, history snapshot, history replay, and UI projection completely excluded?
- Does reconnection restore only real-time routing and unfinished delivery without resending completed historical messages?
- Is `chat.activity` loaded with IM v2 and degraded safely when unsupported by the target platform?
