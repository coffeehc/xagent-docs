---
title: "MCP vs. Connectors: What Is the Difference?"
description: "Understand the boundary between MCP and Connectors in xAgent: MCP provides external tools on demand, while Connectors bring in accounts, messages, channels, and proactive events."
status: beta
updated: 2026-07-14
---

# MCP vs. Connectors: What Is the Difference?

Both MCP and Connectors extend xAgent, but they solve different problems. A simple rule is:

- Use MCP when a task needs to call an external capability on demand.
- Use a Connector when an external system needs to proactively deliver accounts, messages, or events into xAgent.

## The Core Difference

| Area | MCP | Connector |
| --- | --- | --- |
| Main role in xAgent | Provides external tools and services that tasks can call when needed | Brings in external accounts, messages, channels, events, and connector-provided tools |
| Typical direction | xAgent calls an external capability while executing a task | An external system can proactively deliver a message or event into xAgent |
| Account and login state | Usually not the primary concern | Often handles QR login, OAuth, authorization, or other login flows |
| Typical scenarios | Query business data, access knowledge services, call office or developer tools | WeChat, email, IM, enterprise system message entry points, third-party service connections |
| Common ordinary-user entry | Use configured capabilities in a task | Bind a personal external account in My Connections |
| Common administrator entry | Configure MCP services and available tools | Add services in Connector Management, then check Connector Card and health |

This is the current division of responsibilities in xAgent, not an absolute statement about every external protocol. Choose based on whether the task needs accounts, message entry points, or proactive events.

## Current Runtime Path

After an MCP service is configured, xAgent connects to it and registers its capabilities as callable tools. Sessions discover, load, and invoke those tools on demand. The primary MCP path is a session actively calling a capability; it does not own xAgent user-account binding or proactive message entry.

A Connector is an independent external bridge service that owns target-system protocol handling, login state, and channel state. It can actively push an external message to xAgent. xAgent then converts the message into a session event, uses an explicit session reference when one is provided, and otherwise routes it to the current user's main session. Session events remain within one user's scope and do not support cross-user session communication.

## When to Use MCP

Use MCP when an external system is mainly a capability that should be called when needed. Examples include:

- Querying an internal data service.
- Calling an existing knowledge, office, or developer API.
- Reading, writing, or processing business data during a task.
- Letting an Agent discover and load a specific tool only when required, instead of loading every capability at session start.

Ordinary users do not usually need to configure MCP themselves. Once administrators or advanced users add, test, and enable a capability, users can simply describe their task.

## When to Use a Connector

Use a Connector when an external system should become an active xAgent entry point, or when it needs to preserve a user's own account and channel state. Examples include:

- A WeChat connector proactively delivers a new message to xAgent.
- A user binds an external account through QR login, OAuth, or authorization.
- An email, IM, or enterprise-system event should trigger follow-up work.
- The system needs to send messages, media, or actions back to an external service within an authorized scope.

Connectors can expose tools, but they also bring external events into xAgent. Users normally complete account binding in **My Connections**. Administrators maintain system-level connector services in **Connector Management**. See [Connectors](/docs/user-guide/connector) for the operating flow.

## Choose by Scenario

| Your need | Better fit | Why |
| --- | --- | --- |
| A task needs to query a fixed external service | MCP | The session only needs to call the capability. It may not need accounts or message entry. |
| A WeChat message should automatically enter a task | Connector | The external system needs to receive a message and deliver an event proactively. |
| Users need to bind their own email, IM, or other account | Connector | User-level authentication and connection state must be maintained. |
| You already have an enterprise API and only want Agents to call it | MCP | It is closer to an on-demand tool service. |
| An enterprise system has user identity, message events, and executable actions | Evaluate a Connector first | Handle account, channel, and event entry before deciding which tools and actions to expose. |

## Examples

### Example: Reading Business Data

Suppose an Agent needs to query an internal data API while preparing a report. The API does not receive messages and does not require users to scan a QR code. Expose it as an MCP capability so the Agent can query it during a task.

### Example: Starting a Task from WeChat

Suppose a user sends a WeChat message and xAgent should receive it, create or progress a task, and reply later. This requires a Connector. The Connector receives messages, maintains authorization and channel state, and delivers events into xAgent.

### Example: Connecting an Internal Enterprise System

If an Agent only needs stable APIs for query or actions, start with MCP. If the integration also needs account binding, push messages, login flows, or proactive events, a Connector is a better design.

## Security Boundaries

- Whether you use MCP or a Connector, the external system remains responsible for its own account permissions. xAgent does not replace those permission systems.
- Do not put real passwords, tokens, or verification codes into sessions, prompts, or task materials.
- Configure [Approval Policies](/docs/user-guide/approval-policy) for sending messages, changing data, approvals, and sensitive information access.
- When a Connector stores external login state, run it with a dedicated user and data directory, and do not expose its management port directly to the public internet.

## Related Concepts

- [How AI Agents Discover and Load Tools on Demand](/docs/guides/ai-agent-dynamic-tool-discovery)
- [Connectors](/docs/user-guide/connector)
- [Tool Management](/docs/user-guide/tool)
- [Skill Management](/docs/user-guide/skill)
- [Approval Policies](/docs/user-guide/approval-policy)
- [AI Agent Approval and Safety](/docs/guides/agent-approval-security)

## Next Steps

- [Install a Connector](/docs/deployment/connector-install)
- [Configure and Use Connectors](/docs/user-guide/connector)
- [Review Tools and Approval Scope](/docs/user-guide/tool)
- [xAgent Connectors](https://github.com/coffeehc/xagent-connectors)
