---
title: Connectors
description: Learn how xAgent Connectors differ from MCP, how administrators add Connector services, and how users create authenticated personal connections.
status: experimental
updated: 2026-07-11
---

# Connectors

> Status: experimental. Page structure and fields may change.

## Who This Is For

This page is for both ordinary users and administrators.

Ordinary users mainly use **My Connections** to bind their own external accounts and check authentication, channel state, and available tools.

Administrators mainly use **Connector Management** to add Connector services, read Connector Card, check health, and review declared tools.

## What It Is

A Connector brings WeChat, email, enterprise systems, third-party services, or other external entry points into xAgent. It can actively receive external messages and deliver messages, account state, executable actions, or events into xAgent.

For ordinary users, a Connector means "connect my external account." For administrators, it means "connect an external system entry point and turn it into a governed, authorized, callable capability."

Compared with MCP, a Connector focuses more on external systems actively pushing messages into xAgent. MCP focuses more on xAgent calling external tools on demand during a task.

## Entry Points

| Page | Audience | Purpose |
| --- | --- | --- |
| My Connections | Ordinary users | Manage the current user's external accounts, authentication state, channel state, and available tools |
| Connector Management | Administrators | Manage system-level Connector catalog, add connectors, read Connector Card, check health, and review tool declarations |

The documentation uses one **Connectors** page for both concepts. In the product UI, ordinary users usually enter **My Connections**, while administrators also use **Connector Management**.

## My Connections

**My Connections** manages external accounts and channels for the current user. Users only need to know whether the connection works, whether the account is authorized, and what object the task should process.

![My Connections](/img/manual/xagent-connector-my-connections.png)

Typical flow:

1. Open **My Connections**.
2. Find the external system to connect.
3. Create a connection or open connection details.
4. Complete QR login, authorization, or binding.
5. Confirm authentication state and channel state.
6. Return to Agent Session and describe the external task.

Example:

```text
Please check the latest customer WeChat message and draft a reply. Do not send it directly.
```

Use natural language to describe external objects:

- "the latest customer message"
- "emails received today"
- "this customer's order"
- "the to-do items in this group"
- "my default connected mailbox"

If the page asks you to choose an account, channel, or connection, follow the UI.

## Connector Management

Connector Management maintains the system-level connector catalog. Administrators add connector services, read Connector Card, check health, confirm login flows, review tool declarations, and inspect protocol state.

![Add Connector](/img/manual/xagent-connector-add-dialog.png)

When adding a Connector, xAgent reads the Connector Card, checks health, and saves it as a system-level catalog entry.

| Field | Meaning |
| --- | --- |
| Connector Address | Address reachable by the xAgent server |
| API Key | Optional; used as Bearer Token when xAgent calls the Connector Server |

If the Connector runs on another server, use HTTPS reverse proxy and fill the address that xAgent can reach.

## Connector Details

After a Connector is added, administrators can inspect identity, Connector Card ID, status, version, target system, profiles, auth flow, tools, and login flow.

![Connector Details](/img/manual/xagent-connector-detail.png)

Administrators should check:

- Whether health is normal.
- Whether Connector Card can be read.
- Whether name, version, and protocol match expectation.
- Whether login flow exists, such as QR login, OAuth, or account authorization.
- Whether declared tools are actually available.
- Whether connector-provided Skills are declared.
- Which data types the connector may touch.

Do not declare future or unavailable capabilities as tools. Once a tool is declared, an Agent may try to call it during a task.

## Open Protocol and Extension

xAgent Connector protocol is opened in [coffeehc/xagent-connectors](https://github.com/coffeehc/xagent-connectors). Teams with development capability can extend connectors by protocol.

Possible directions:

- Connect Feishu, DingTalk, Telegram, and other IM tools.
- Connect internal enterprise systems for query, approval, writing, or business operations.
- Connect third-party generation services such as video, image, audio, or media processing.
- Connect other agent systems, so xAgent can send tasks to external agents or receive events from them.
- Wrap existing internal services into governed and callable xAgent entry points.

Developers can start from the protocol documents in [xAgent Connectors](https://github.com/coffeehc/xagent-connectors). A connector can be added through Connector Management when it provides Connector Card, health, WebSocket data channel, and required tools.

## Security Notes

- Do not write real passwords, tokens, or verification codes into a session.
- API Key is used between the xAgent backend and Connector service. Do not put it in task messages, prompts, or user materials.
- A Connector may store external login state. Use a dedicated runtime user and data directory.
- Do not expose Connector management ports directly to the public internet.
- Use approval policies for sending messages, modifying external data, or accessing sensitive information.
- External-system data permissions are still controlled by the external system and Connector. xAgent does not replace those permission systems.

## Common Questions

### What is the difference between My Connections and Connector Management?

My Connections is where ordinary users bind their own external accounts. Connector Management is where administrators maintain system-level connector services.

### What is the difference between Connector and MCP?

A Connector can actively receive external messages and push them into xAgent. For example, after WeChat receives a message, the connector can deliver it to a session. MCP is usually called by xAgent on demand during task execution.

### What is the relationship between connections and tools?

A connection provides account and channel state. Tools perform concrete actions. After a WeChat connection is authorized, tools can send messages or media within the authorized scope.

### Do I need to give xAgent my external-system password?

No. Follow the UI authorization flow. Do not write passwords, tokens, or verification codes into task messages.

### Are connector tools available to all users automatically?

Not necessarily. Availability depends on connector state, user authorization, connection state, local governance, and approval policies.

## Related Docs

- [Agent Session](/docs/user-guide/agent-session)
- [Connector Installation](/docs/deployment/connector-install)
- [xAgent Connectors](https://github.com/coffeehc/xagent-connectors)
- [Tool Management](/docs/user-guide/tool)
- [Approval Policies](/docs/user-guide/approval-policy)
