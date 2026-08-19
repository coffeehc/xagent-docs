---
title: xAgent Connectors for IM, Databases, SSH, and Browsers
description: Learn about xAgent Connector management, bidirectional IM messages, file transfer, Database and SSH resources, health state, and extension protocols.
status: experimental
updated: 2026-08-19
---

# xAgent Connectors for IM, Databases, SSH, and Browsers

> Status: experimental. Pages, protocols, and authentication flows may still change.

## Who This Is For

- Users bind external accounts or administrator-defined Database and SSH resources under **My connections** and review authentication, channel, and tool status.
- Administrators add Connector services under **Connectors** and inspect Connector Cards, health, protocols, and tool declarations.

## What a Connector Is

A Connector is the protocol bridge between xAgent and an external system. It can deliver messages from WeChat, Telegram, or Feishu into xAgent and send replies, execution activity, and files back to the originating channel. Database and SSH Connectors expose database queries, remote commands, and interactive shells to Agents through governed channels.

Compared with MCP, a Connector focuses on external events, user connections, and bidirectional channels. MCP is generally an external tool service called on demand during task execution. See [What Is a Connector?](/docs/getting-started/what-is-connector#how-is-it-different-from-mcp).

## Current Connector Versions

The server and Connectors are released independently. The current server version is `v0.0.11.beta`, and the public release catalog lists these Connector versions:

| Connector | Version | Main use |
| --- | --- | --- |
| WeChat Connector | `0.0.10` | WeChat messages, media, and connection-context renewal |
| Telegram Connector | `0.0.11` | Telegram Bot direct and group messages |
| Feishu Connector | `0.0.10` | Feishu direct messages and group @mentions in mainland China |
| Database Connector | `0.0.3` | Administrator-defined MySQL and PostgreSQL resources |
| SSH Connector | `0.0.4` | Administrator-defined SSH command and interactive-shell targets |

Binaries are downloaded from the `weixin/`, `telegram/`, `feishu/`, `database/`, and `ssh/` directories under `https://downloads.xagent.xiagaogao.com/connector/`. See [Start Installation](/docs/getting-started/install).

xAgent also includes a Browser Connector that lets the managed browser extension expose page interaction to the current user. It is managed by xAgent and does not use the five standalone Connector packages above.

## Page Entries

| Page | Audience | Purpose |
| --- | --- | --- |
| My connections | Users | Manage account authentication, channel state, and available tools |
| Connectors | Administrators | Manage the system Connector catalog, Cards, health, protocols, and tool declarations |

**My connections** remains available in simple mode. The administrator Connector catalog requires the administrator role.

## Connect an External System

1. Open **My connections**.
2. Select the external system.
3. Create a connection or open an existing one.
4. Complete the QR-code, authorization, credential, or resource-binding flow shown on the page.
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

### Database

Administrators first define MySQL or PostgreSQL resources in the Database Connector Server. Under **My connections**, users see only display names and provide the username and password for the selected database. Database addresses, credentials, and native authorization remain inside the Connector Server. Whether a SQL statement can run still depends on the permissions of that database account.

### SSH

Administrators first configure targets, private keys, principals, and access tokens in the SSH Connector Server. Users see only the label associated with each `resource_key`, and models never see host addresses. The first successful connection records the host fingerprint, and later host-key changes are rejected. After installation, create a `keys` directory beside the Connector configuration and place the private keys there.

## Public Protocol and Capabilities

The current public Connector protocol is `4.3`. xAgent remains compatible with `4.2`, `4.1`, `4.0`, and older single Connectors that explicitly declare `3.0`, and determines the actual version during the data-plane handshake.

- IM channels use `xagent.im.v2` for incoming external messages, reply deltas, acknowledgements, execution activity, and final replies.
- Bidirectional file transfer belongs to the independent `xagent.file.v1` Profile. File bytes are not carried as base64 content inside WebSocket messages.
- A `multiple` Connector routes several business resources by `resource_key` over one real Channel without exposing the internal `connector_channel_id` to the model.
- Tools declared by a Connector Card are registered according to actual runtime health. User authentication and target-system authorization are still checked by the Connector Server on every execution.
- A Connector Skill may publish a complete directory manifest through `/skill.json`. xAgent downloads it by revision and replaces the local copy atomically; script files are neither downloaded nor executed.

A Connector can therefore expose tools and resources governed by real authentication and permissions in an external system, rather than only relaying incoming text.

## Health State

xAgent probes Connector health continuously and derives state from consecutive failures:

| Probe result | Meaning |
| --- | --- |
| Success | Online; any previous failure count is cleared |
| 1-2 consecutive failures | Degraded; the connection may be temporarily unstable |
| 3 or more consecutive failures | Offline; the channel should not be relied on |

A later successful probe restores the online state. When a message does not arrive or a tool cannot execute, inspect Connector health, user authentication, resource configuration, external-system permissions, and Connector logs together.

## Administrator Connector Management

When an administrator adds a Connector, xAgent reads its Connector Card, probes health, and saves it to the system catalog.

| Field | Description |
| --- | --- |
| Connector address | Address reachable by the xAgent server |
| API Key | Optional Bearer Token for the Connector Server |

After adding it, verify that:

- Health is normal and later successful probes recover state.
- The Card name, version, protocol, and target system are correct.
- Authentication flows such as QR scanning, Bot parameters, database credentials, or SSH principal/access-token verification work.
- Tool declarations contain only actions that are currently executable.
- Connector Skill and data-contact declarations are complete.

Do not declare planned but unavailable tools. Once a tool is exposed, an Agent may select it during a task.

## Open Protocol and Extensions

A custom Connector provides a Connector Card, health endpoint, authentication flow, WebSocket data channel, and required tools. File-capable Connectors also implement the fixed `xagent.file.v1` transfer endpoints. The protocol can support additional IM channels, internal systems, generation services, or other agent systems. The protocol is still in beta, so confirm the protocol version and capability boundaries supported by the target xAgent release before development.

## Security Notes

- Do not place passwords, tokens, or verification codes in a session.
- A Connector API Key is only for authentication between the xAgent backend and Connector Server.
- Run each Connector with a dedicated operating-system user and state directory, and do not expose its management port directly to the public internet.
- Store database credentials, SSH private keys, access tokens, and host fingerprints only in controlled Connector Server configuration and state directories.
- Use approval policies for message sends, external writes, and sensitive reads.
- External account permissions remain controlled by the external system and Connector.

## Related Docs

- [Start Installation](/docs/getting-started/install)
- [What Is a Connector?](/docs/getting-started/what-is-connector#how-is-it-different-from-mcp)
- [Shortcut Instruction Protocol](/docs/guides/shortcut-instruction-protocol)
- [Tool Management](/docs/user-guide/tool)
- [Approval Policy](/docs/user-guide/approval-policy)

## Next Steps

- [Install a WeChat, Telegram, Feishu, Database, or SSH Connector](/docs/getting-started/install)
- [Use Connector capabilities in Agent Sessions](/docs/user-guide/agent-session)
