---
title: xAgent IM Profile v1
description: Legacy instant-messaging capabilities, inbound messages, delivery semantics, and compatibility boundaries for xAgent IM Profile v1.
updated: 2026-07-29
---

# xAgent IM Profile v1

This document defines the legacy instant-messaging capabilities, inbound-message semantics, and observable delivery requirements of `xagent.im.v1`. It preserves the semantics of the legacy Profile; it does not mean that an old Connector Protocol version can still connect. The current catalog accepts only Protocol `3.0`, and current IM Connectors should implement [`xagent.im.v2`](xagent_im_v2.md).
For Connector Server connection behavior, HTTP endpoints, the WebSocket envelope, authentication, channels, Tool invocation, and common error semantics, see the
[xAgent Connector Common Protocol](../xagent_connector_protocol.md).

## 1. Normative Language

- **Must** identifies externally observable behavior required for `xagent.im.v1` compatibility.
- **Should** identifies a recommended implementation; implementers can adjust it for the target system and deployment environment.
- **Can** identifies an optional capability that does not affect basic compatibility.

This document constrains observable results between xAgent and Connector Server. It does not require the Connector to use files, a database, a message queue, or a particular concurrency model internally.

## 2. Purpose

`xagent.im.v1` represents a legacy Connector Channel connected to an instant-messaging target. It projects target-system messages and sending capabilities to xAgent through `message.push`.

It defines:

- Standard representations for the IM provider, conversation, and sender.
- Stable identity, ordering, redelivery, and expiration semantics for inbound IM messages.
- Declaration constraints for IM send, reply, and file Tools.
- Isolation of private target-system references.

It does not define:

- Connector Server connection establishment and authentication.
- The common packet envelope.
- Streaming assistant deltas, which belong to [`xagent.im.v2`](xagent_im_v2.md).
- File byte transfer, which belongs to the Transfer Plane in the common protocol.
- xAgent's internal Session, Agent, event queue, or persistence structures.

## 3. Profile Declaration

The Connector Card must declare static support in `supports.profiles`. The Connection Descriptor must declare the Profiles actually enabled for the current channel in `connection.profiles`.

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

A legacy Connector declares `xagent.im.v1`; a current Connector declares `xagent.im.v2`. A built-in Connector does not declare both and does not retain a `message.push` fallback branch in the current implementation. xAgent can advertise support for both v1 and v2 so it can connect legacy and current Connectors separately.

## 4. IM Tools

IM Tools continue to use `tool.invoke` and `tool.invoke.ack` from the common protocol.

Implementations must follow these rules:

- A Tool must route the current target account or conversation through the envelope's top-level `connector_channel_id`.
- Target-system facts such as `chat_id`, contact IDs, bot tokens, and context tokens must not become sending targets that the model can fill in freely.
- Real capabilities such as send, reply, and send-file must be declared separately in the Connector Card.
- When a Tool refers to an original message, the Connector should generate an opaque reference, such as `reply_ref`, that is valid only for the associated channel and Tool.
- System API keys, target-system tokens, and private target-system authentication material must not appear in Tool arguments or results.

The Connector defines Tool IDs, argument structures, and target-system-specific capabilities. The Profile does not require every IM Connector to expose the same Tool set.

## 5. Inbound Messages

A legacy IM Connector pushes structured events using `message.push` from the common protocol. A current Connector should use `chat.message` from `xagent.im.v2` and should not fall back to `message.push` based on negotiation within the same implementation.

A `message.push` payload should use these fields:

| Field | Requirement | Description |
| --- | --- | --- |
| `provider` | Must | Target IM provider, such as `wechat`, `feishu`, or `telegram`. |
| `profile` | Must | Fixed to `xagent.im.v1`. |
| `event_kind` | Must | Use `im.message.received` for a regular inbound message. |
| `message_id` | Must | A stable, unique message ID within the current Connector Channel. |
| `sender_id` | Must | Sender ID in the target system. |
| `sender_name` / `display_name` | Should | User-facing sender name; use a redacted identifier if unavailable. |
| `chat_id` | Can | Target-system conversation ID, used only to describe the source; it must not become a model-controlled routing argument. |
| `chat_type` | Should | Target-system conversation type, such as `p2p` or `group`. |
| `message_type` | Must | Message type, such as text, image, or file. |
| `raw_text` | Must | Original user text; use an empty string when there is no text. |
| `text` / `content` | Must | Complete message description for the user and model. |
| `activation_message` | Should | Agent execution guidance; it does not replace user-visible content. |
| `reply` | Should | Reply Tool and opaque reply reference. |
| `skill` | Should | Connector Skill name and related Tool IDs. |
| `files` | Must when files exist | List of file references. |

Target-system-specific fields can be appended, but must not replace these standard fields or expose authentication material.

## 6. Source and Reply Routing

The Connector must let xAgent and the Agent understand the source system, sender, and conversation type without requiring the Agent to infer target-system routing.

Implementations must follow these rules:

- A reply to the source is located through `connector_channel_id` and the Connector's internal binding.
- References such as `reply_ref` and `context_token` must be opaque and valid only for the channel and Tool that declare them.
- The Agent must not guess a send target from `chat_id`, `sender_id`, a contact name, or message content.
- Tool IDs, Skill names, and argument names included in text must match the Connector Card's current declarations.

Recommended user-visible structure:

```text
User message from {source name}:
Sender: {sender name or redacted ID}
Conversation type: {conversation type}
Message type: {message type}
User text: {original text; use "none" when absent}
```

A legacy IM Connector can show typing or an equivalent activity indicator in the target system after successful message delivery, then clear it after a reply is sent or a timeout occurs. A current IM v2 Connector should consume `chat.activity` and degrade it to typing or a no-op according to target-platform capabilities.

## 7. Message Retention and Expiration

The retention policy should prevent silent message loss during brief disconnections between Connector and xAgent while also preventing unlimited caching, unlimited retries, and a burst of stale conversations after recovery.

### 7.1 Required External Behavior

- The Connector must implement finite retention and expiration for inbound messages that have not reached a terminal delivery state.
- Temporary failures such as a closed channel, disconnected transport, write failure, or ack timeout must not be treated as successful delivery.
- When using acknowledged transport, a message must remain eligible for redelivery until `accepted` or `duplicate` is received.
- A stable `message_id` must not change during redelivery.
- Retries, Connector restarts, and channel reopening must not extend the original expiration time automatically.
- An expired message must not be delivered again, and associated state such as temporary reply targets should be cleaned up.
- The Connector must limit resources consumed by pending messages and define explicit behavior when capacity is exhausted. It must not consume unlimited memory or disk.
- Expiration and capacity eviction must not be presented as successful delivery.

These requirements constrain results only. A Connector can satisfy them with local persistence, an external message queue, or a reliable cursor provided by the target system.

### 7.2 Recommended Implementation

- Retain interactive IM messages for approximately one hour.
- Calculate `expires_at` from the time the Connector first assumes responsibility for a message. A reliable target-system event time can also be used to reject messages that are already clearly stale.
- Preserve message order within each channel. If the head message has a temporary failure, pause that channel while allowing other channels to continue.
- Check expiration at Connector startup, enqueue, read, flush, and in periodic maintenance instead of relying only on a background timer.
- Persist the required consumer cursor or deduplication state so a Connector restart neither advances a message twice nor skips it permanently.
- Record the effective TTL, capacity, number of expirations, number of capacity evictions, attempt count, and most recent error.
- Keep the cleanup interval at or below half of the effective TTL.
- A per-channel cache limit of 1,000 messages can be used as a starting point, then adjusted for message size and deployment resources.

TTL, capacity, cleanup interval, and storage medium are not fixed protocol constants. Implementers can retain alerts, tickets, or other non-real-time events for longer, but should publish the effective policy in deployment or configuration documentation.

### 7.3 Terminal Delivery States

With `xagent.im.v2`:

- `accepted`: xAgent accepted the message for the first time; remove it from the pending set.
- `duplicate`: xAgent previously accepted the same `message_id`; remove it from the pending set.
- `rejected`: distinguish temporary and unrecoverable failures according to error semantics.
- Treat `channel_busy`, a closed channel, disconnection, and timeout as temporary failures.
- Invalid payloads, permanent permission denial, and other unrecoverable failures can enter a failed terminal state, but must retain an observable reason and must not be retried indefinitely.

`message.push` currently has no separate business ack. Chat messages that are sensitive to loss should also enable `xagent.im.v2`. An implementation using only `message.push` should document its successful-write and replay boundaries.

## 8. Capacity and Overflow

Capacity limits protect resources; they are not the same as TTL expiration.

Recommended order:

1. Remove completed and expired messages first.
2. If the target system supports reliable replay, stop advancing its consumer cursor.
3. If backpressure is impossible, terminate the oldest or lowest-priority messages according to a published implementation policy.
4. Record `capacity_exceeded` or an equivalent reason and expose it through logs or metrics.

Messages must not be dropped silently without any record.

## 9. File Messages

Each file item in an IM payload must contain at least `file_ref`. The current automatic xAgent file reader also requires `download_url` or `url`.

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

Message-retention TTL and file TTL are independent policies:

- Do not deliver a message after it expires.
- Clean up file references independently according to the Transfer Plane file policy.
- The file TTL should cover the time in which the message can be delivered and read normally.
- If a target-system CDN URL may expire earlier, the Connector should download or retain the file promptly.

## 10. Security Boundaries

- A Connector must not require third-party implementations to understand xAgent's user table, Session state, Agent state, or internal event model.
- xAgent internal IDs must not appear in an IM payload.
- A Connector depends only on public `connector_channel_id`, `message_id`, packets, acks, Card, Descriptor, and Tool protocols.
- Target-system tokens, bot tokens, system API keys, and one-time authentication material must not appear in message content, file fields, or logs.

## 11. Conformance Checklist

- Do the Card and Descriptor both declare `xagent.im.v1` correctly?
- Is each inbound `message_id` stable within its channel?
- Does the message remain eligible for redelivery during a temporary disconnection?
- Are TTL, capacity, and cleanup finite?
- Do retries and restarts preserve the original expiration time?
- Do accepted, duplicate, and rejected results enter the correct terminal states?
- Are target-system routing and authentication material kept away from the Agent?
- Is the effective TTL and capacity policy documented for the implementation?
