---
title: AgentPlugins for IM, Databases, SSH, and Browsers
description: Learn about AgentPlugin Connectors, Plugin Connections, bidirectional messaging, Database and SSH resources, and protocols.
status: experimental
updated: 2026-09-17
---

# AgentPlugins for IM, Databases, SSH, and Browsers

> Status: experimental. Pages, protocols, and authentication flows may still change.

## Who This Is For

- Users bind external accounts or administrator-defined Database and SSH resources under **Operations > Plugin Connections** and review authentication, channel, and tool status.
- Administrators add plugin services under **Agent Governance > AgentPlugin Connectors** and inspect Cards, health, protocols, and tool declarations.

## What a Connector Is

An AgentPlugin connects xAgent to an external system. WeChat, Telegram, Feishu, and DingTalk plugins can deliver messages to xAgent and send replies, execution activity, and files back. Database and SSH plugins expose database queries and remote-host capabilities through governed Channels. Older documentation uses Connector, the name before `0.0.16.beta`.

Compared with MCP, a Connector focuses on external events, user connections, and bidirectional channels. MCP is generally an external tool service called on demand during task execution. See [What Is a Connector?](/docs/getting-started/what-is-connector#how-is-it-different-from-mcp).

## Current AgentPlugin Versions

The Server and AgentPlugins are released independently. The current Server is `v0.0.20.beta`; the [public plugin catalog](https://downloads.xagent.xiagaogao.com/agentplugins/versions.json) lists:

| AgentPlugin | Version | Main use |
| --- | --- | --- |
| WeChat | `0.0.13` | WeChat messages, media, and connection-context renewal |
| Telegram | `0.0.14` | Telegram Bot direct and group messages |
| Feishu | `0.0.13` | Feishu direct messages and group @mentions in mainland China |
| Database | `0.0.7` | Administrator-defined MySQL and PostgreSQL resources |
| SSH | `0.0.10` | Administrator-defined SSH command and interactive-shell targets |
| DingTalk | `0.0.2` | DingTalk messaging |

Plugin artifacts are distributed under `https://downloads.xagent.xiagaogao.com/agentplugins/`. Use `--agent-plugins` in the installer; see [Start Installation](/docs/getting-started/install).

xAgent also includes a built-in Browser Runtime that lets the managed browser extension expose page interaction to the current user; it does not use a standalone AgentPlugin package.

## Page Entries

| Page | Audience | Purpose |
| --- | --- | --- |
| Plugin Connections | Users | Manage account authentication, channel state, and available tools |
| AgentPlugin Connectors | Administrators | Manage system plugin Cards, health, protocols, and tool declarations |

**Plugin Connections** belongs to user Operations; **AgentPlugin Connectors** requires the administrator role.

## Connect an External System

1. Open **Plugin Connections**.
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

Administrators add MySQL or PostgreSQL resources in the Database AgentPlugin. Users then select a resource under **Plugin Connections** and enter their own database username and password. See [Database AgentPlugin Setup](/docs/user-guide/database-connector) for installation, field definitions, and troubleshooting.

### SSH

Administrators first place private keys in the `keys/` directory beside the SSH AgentPlugin configuration, then configure targets, remote accounts, and access identities. Users see resource names, not host addresses or private keys. See [SSH AgentPlugin Setup](/docs/user-guide/ssh-connector) for the full procedure.

## Public Protocol and Capabilities

The current public AgentPlugin protocol is `4.4`, with Card / Descriptor schemas `xagent.agent-plugin/card/v1` and `xagent.agent-plugin/descriptor/v2`. Data-plane negotiation can fall back to `4.3` or `4.0` according to the plugin Card. The older attachments describe historical Connector protocols.

- IM channels use `xagent.im.v2` for incoming external messages, reply deltas, acknowledgements, execution activity, and final replies.
- Bidirectional file transfer belongs to the independent `xagent.file.v1` Profile. File bytes are not carried as base64 content inside WebSocket messages.
- A `multiple` AgentPlugin routes business resources by `resource_key` over one real Channel without exposing internal Channel IDs to the model.
- Tools declared by an AgentPlugin Card are registered according to runtime health. The plugin server checks user authentication and target-system authorization on every execution.
- A plugin Skill may publish a directory manifest through `/skill.json`. xAgent downloads it by revision and replaces the local copy atomically; script files are neither downloaded nor executed.

An AgentPlugin can expose tools and resources governed by real authentication and permissions in an external system, rather than only relaying incoming text.

## Health State

xAgent probes AgentPlugin health continuously and derives state from consecutive failures:

| Probe result | Meaning |
| --- | --- |
| Success | Online; any previous failure count is cleared |
| 1-2 consecutive failures | Degraded; the connection may be temporarily unstable |
| 3 or more consecutive failures | Offline; the channel should not be relied on |

A later successful probe restores the online state. When a message does not arrive or a tool cannot execute, inspect plugin health, user authentication, resource configuration, external-system permissions, and plugin logs together.

## Administrator AgentPlugin Connector Management

When an administrator adds an AgentPlugin, xAgent reads its Card, probes health, and saves it to the system catalog.

| Field | Description |
| --- | --- |
| AgentPlugin address | Address reachable by the xAgent server |
| API Key | Optional Bearer Token for the plugin server |

After adding it, verify that:

- Health is normal and later successful probes recover state.
- The Card name, version, protocol, and target system are correct.
- Authentication flows such as QR scanning, Bot parameters, database credentials, or SSH principal/access-token verification work.
- Tool declarations contain only actions that are currently executable.
- Plugin Skill and data-contact declarations are complete.

Do not declare planned but unavailable tools. Once a tool is exposed, an Agent may select it during a task.

## Open Protocol and Extensions

A custom AgentPlugin provides a Card, health endpoint, authentication flow, data channel, and required tools. File-capable plugins also implement the fixed `xagent.file.v1` transfer endpoints. The protocol can support additional IM channels, internal systems, generation services, or other agent systems. It remains in beta, so check the version and capabilities supported by the target xAgent release before development.

## Security Notes

- Do not place passwords, tokens, or verification codes in a session.
- An AgentPlugin API Key is only for authentication between the xAgent backend and plugin server.
- Run each plugin with a dedicated operating-system user and state directory, and do not expose its management port directly to the public internet.
- Store database credentials, SSH private keys, access tokens, and host fingerprints only in controlled plugin server configuration and state directories.
- Use approval policies for message sends, external writes, and sensitive reads.
- External account permissions remain controlled by the external system and AgentPlugin.

## Related Docs

- [Start Installation](/docs/getting-started/install)
- [What Is an AgentPlugin?](/docs/getting-started/what-is-connector#how-is-it-different-from-mcp)
- [Database AgentPlugin Setup](/docs/user-guide/database-connector)
- [SSH AgentPlugin Setup](/docs/user-guide/ssh-connector)
- [Shortcut Instruction Protocol](/docs/guides/shortcut-instruction-protocol)
- [Tool Management](/docs/user-guide/tool)
- [Approval Policy](/docs/user-guide/approval-policy)

## Next Steps

- [Install a WeChat, Telegram, Feishu, DingTalk, Database, or SSH AgentPlugin](/docs/getting-started/install)
- [Use AgentPlugin capabilities in Agent Sessions](/docs/user-guide/agent-session)
