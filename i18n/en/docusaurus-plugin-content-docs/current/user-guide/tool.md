---
title: "xAgent Tool Management: Personal, Public, MCP, and Connector Tools"
description: Understand personal and public xAgent Tools, MCP and Connector sources, availability, on-demand discovery, and task execution.
status: stable
updated: 2026-07-15
---

# xAgent Tool Management: Personal, Public, MCP, and Connector Tools

## What It Is

Tools perform concrete actions for xAgent. A Tool may read files, write outputs, fetch web pages, process PDF or Excel files, call MCP services, send messages through connectors, or handle triggers.

Users do not need to remember tool names. In normal use, describe the task goal in Agent Session and xAgent will choose tools when needed.

## My Tools and Tool Management

Tool-related UI has two common views:

| Page | Audience | Purpose |
| --- | --- | --- |
| My Tools | Ordinary users | View tools visible to the current user, including system tools, personal MCP tools, connector tools, and personal switches |
| Tool Management | Administrators | Review system-level tool governance information, source, schema, availability, and risk boundaries |

## Tool Sources

Tools may come from:

- Built-in system capabilities.
- Personal MCP services.
- Global MCP services configured by administrators.
- Connectors, such as WeChat or email connectors.
- Internal runtime capabilities loaded on demand.

The tools visible to a user depend on account permissions, MCP configuration, connector authorization, personal switches, and administrator policies.

## Public and Personal Capability Boundaries

Tools are not managed exactly like Skills. A Skill is a reusable method; a Tool is an executable capability.

Important boundaries:

- Public or system tools can be visible to many users, but actual execution may still depend on user authorization, keys, connector state, and approval policies.
- Personal MCP tools belong to the current user's MCP configuration.
- Connector tools may require the current user to complete authentication in **My Connections**.
- Sensitive actions should be controlled by approval policies.

## What Administrators Should Check

For a tool to be safely available, administrators should check:

- Whether the tool source is trusted.
- Whether input schema is clear.
- Whether ToolResult output is understandable and does not leak secrets.
- Whether risky actions require confirmation or approval.
- Whether unavailable tools are shown as unavailable instead of silently failing.
- Whether connector and MCP tools match actual external permissions.

## Tool Use in Agent Session

In Agent Session, tool calls may appear in the timeline. They show that xAgent is performing concrete work, such as reading a file or calling an external system.

Users should pay attention when a tool call:

- Sends messages externally.
- Deletes or overwrites files.
- Calls an internal or third-party system.
- Uses keys, connector authorization, or sensitive data.

If an approval request appears, check the action, target, and impact before allowing it.

## Current Built-in Tools

As of July 7, 2026, the current version includes about 79 built-in Tool IDs covering session collaboration, task planning, file read/write, Excel, PDF, SQLite, web fetching, HTTP requests, email, triggers, and dynamic Skill/Tool discovery and loading.

Some tools are internal or loaded on demand. The number ordinary users see may be smaller and depends on configuration and permissions.

## Related Concepts

- [How AI Agents Discover and Load Tools on Demand](/docs/guides/ai-agent-dynamic-tool-discovery)
- [Skill Management](/docs/user-guide/skill)
- [Connectors](/docs/user-guide/connector)
- [Approval Policies](/docs/user-guide/approval-policy)

## Next Steps

- [Use Tools in an Agent Session](/docs/user-guide/agent-session)
- [Manage Workspace Files](/docs/user-guide/workspace)
- [Find MCP configuration in the menu overview](/docs/user-guide/menu-overview)
