---
title: xAgent Connectors for WeChat, Telegram, Feishu, and Browsers
description: Learn about v0.0.5.beta Connector management, bidirectional IM messages, file transfer, health state, and extension protocols.
status: experimental
updated: 2026-07-27
---

# xAgent Connectors for WeChat, Telegram, Feishu, and Browsers

> Status: experimental. Pages, protocols, and authentication flows may still change.

## Who This Is For

- Users bind external accounts under **My connections** and review authentication, channel, and tool status.
- Administrators add Connector services under **Connectors** and inspect Connector Cards, health, protocols, and tool declarations.

## What a Connector Is

A Connector is the protocol bridge between xAgent and an external system. It can deliver messages from WeChat, Telegram, or Feishu into xAgent and send xAgent replies, execution activity, and files back to the originating channel.

Compared with MCP, a Connector focuses on external events, user connections, and bidirectional channels. MCP is generally an external tool service called on demand during task execution. See [What Is a Connector?](/docs/getting-started/what-is-connector#how-is-it-different-from-mcp).

## Connector Versions for v0.0.5.beta

The server and Connectors are released independently. The current Connector versions documented with `v0.0.5.beta` are:

| Connector | Version | Main use |
| --- | --- | --- |
| WeChat Connector | `0.0.8` | WeChat messages, media, and connection-context renewal |
| Telegram Connector | `0.0.9` | Telegram Bot direct and group messages |
| Feishu Connector | `0.0.8` | Feishu direct messages and group @mentions in mainland China |

Binaries are downloaded from the `weixin/`, `telegram/`, and `feishu/` directories under `https://downloads.xagent.xiagaogao.com/connector/`. See [Start Installation](/docs/getting-started/install).

xAgent also includes a Browser Connector that lets the managed browser extension expose page interaction to the current user. It is managed by xAgent and does not use the three standalone IM Connector packages above.

## Page Entries

| Page | Audience | Purpose |
| --- | --- | --- |
| My connections | Users | Manage account authentication, channel state, and available tools |
| Connectors | Administrators | Manage the system Connector catalog, Cards, health, protocols, and tool declarations |

**My connections** remains available in simple mode. The administrator Connector catalog requires the administrator role.

## Connect an External Account

1. Open **My connections**.
2. Select the external system.
3. Create a connection or open an existing one.
4. Complete the QR-code, authorization, or parameter flow shown on the page.
5. Confirm that authentication and channel state are healthy.
6. Return to Agent Sessions and describe the message or object to process.

Example:

```text
Review the most recent customer message in WeChat and prepare a reply draft. Do not send it yet.
```

### WeChat

Scan the QR code and complete the connection flow. WeChat uses a recipient-scoped `context_token` to maintain a valid reply context. xAgent reminds the user and attempts renewal before expiry. Sending is blocked after the context expires until a valid context is established again.

### Telegram

Provide your `bot_token` and target `chat_id`. Before binding a direct chat, send `/start` or any message to the Bot. The Connector stores the Bot Token in its own state directory and does not place it in Tool arguments, Skills, or session messages.

### Feishu

The current Connector supports Feishu in mainland China, not Lark. Scan the QR code to confirm creation of the predefined `xAgent Assistant` app; users do not enter an App ID or App Secret manually. To process Feishu images, grant the app the `im:resource` permission in the [Feishu Open Platform](https://open.feishu.cn/app).

## Bidirectional Messages and Files

The current public Connector protocol is `3.0`, and IM channels use the `xagent.im.v2` data protocol. It supports:

- External messages entering xAgent and final replies returning to the source channel.
- Reply deltas, acknowledgements, and execution activity.
- File references carried with messages.
- File bytes uploaded or downloaded through a separate transfer plane instead of base64 content inside WebSocket messages.

A Connector therefore maintains the complete relationship between message acknowledgements, execution activity, file references, and final replies, not just incoming text.

## Health State

xAgent probes Connector health continuously and derives state from consecutive failures:

| Probe result | Meaning |
| --- | --- |
| Success | Online; any previous failure count is cleared |
| 1-2 consecutive failures | Degraded; the connection may be temporarily unstable |
| 3 or more consecutive failures | Offline; the channel should not be relied on |

A later successful probe restores the online state. When a message does not arrive, inspect Connector health, user authentication, platform permissions, and send logs together.

## Administrator Connector Management

When an administrator adds a Connector, xAgent reads its Connector Card, probes health, and saves it to the system catalog.

| Field | Description |
| --- | --- |
| Connector address | Address reachable by the xAgent server |
| API Key | Optional Bearer Token for the Connector Server |

After adding it, verify that:

- Health is normal and later successful probes recover state.
- The Card name, version, protocol, and target system are correct.
- Authentication flows such as QR scanning, Bot parameters, or account authorization work.
- Tool declarations contain only actions that are currently executable.
- Connector Skill and data-contact declarations are complete.

Do not declare planned but unavailable tools. Once a tool is exposed, an Agent may select it during a task.

## Open Protocol and Extensions

A custom Connector provides a Connector Card, health endpoint, authentication flow, WebSocket data channel, and required tools. The protocol can support additional IM channels, internal systems, generation services, or other agent systems. The protocol is still in beta, so confirm the protocol version and capability boundaries supported by the target xAgent release before development.

## Security Notes

- Do not place passwords, tokens, or verification codes in a session.
- A Connector API Key is only for authentication between the xAgent backend and Connector Server.
- Run each Connector with a dedicated operating-system user and state directory, and do not expose its management port directly to the public internet.
- Use approval policies for message sends, external writes, and sensitive reads.
- External account permissions remain controlled by the external system and Connector.

## Related Docs

- [Start Installation](/docs/getting-started/install)
- [What Is a Connector?](/docs/getting-started/what-is-connector#how-is-it-different-from-mcp)
- [Shortcut Instruction Protocol](/docs/guides/shortcut-instruction-protocol)
- [Tool Management](/docs/user-guide/tool)
- [Approval Policy](/docs/user-guide/approval-policy)

## Next Steps

- [Install a WeChat, Telegram, or Feishu Connector](/docs/getting-started/install)
- [Use Connector capabilities in Agent Sessions](/docs/user-guide/agent-session)
