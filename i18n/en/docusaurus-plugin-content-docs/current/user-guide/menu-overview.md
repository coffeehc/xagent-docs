---
title: Feature and Menu Overview
description: Explore the xAgent console through full-page screenshots, common user workflows, administrator entries, and current menu descriptions.
status: stable
updated: 2026-07-15
---

# Feature and Menu Overview

## Who This Is For

This page is for users who open the xAgent console for the first time and want to know what each menu does.

## What It Is

xAgent's usage path is simple: administrators prepare common entry points and reusable capabilities; users enter the web console, submit tasks, provide materials, confirm important actions, and review results.

Screenshots below come from a local example environment. Menus may differ by account permissions.

## Screenshots

![xAgent Agent Session page showing the session list, task execution, and message input](/img/manual/xagent-agent-session.png)

![xAgent Trigger Management page showing scheduled task status and actions](/img/manual/xagent-triggers.png)

![xAgent Agent Management page showing public agents and the create action](/img/manual/xagent-agent-management.png)

![xAgent Skill Management page showing personal and public Skill lists](/img/manual/xagent-skill-management.png)

![xAgent My Tools page showing Tool sources and enabled states](/img/manual/xagent-my-tools.png)

![xAgent Approval Policy page showing safety rules and risk decisions](/img/manual/xagent-approval-policy.png)

![xAgent Model Configuration page showing models, connection settings, and capabilities](/img/manual/xagent-model-config.png)

## Common Entry Points

| What you want to do | Menu | Notes |
| --- | --- | --- |
| Submit tasks, upload materials, view execution | [Agent Session](/docs/user-guide/agent-session) | Main work page. This page has the richest logic and should be read separately |
| View uploaded files and generated outputs | Workspace Files | Preview Markdown, HTML, tables, reports, and download outputs |
| Find historical sessions | Session List | Search sessions, enter main or sub-sessions, view status |
| Review sensitive actions | Approval | Check actions that require human confirmation |
| Run tasks on a schedule or from external events | Trigger Management | Create timed checks, scheduled reports, or event-driven tasks |
| Select or adjust work assistant entries | Agent Management | View personal and public agents, create personal entries |
| Reuse stable work methods | Skill Management | Use public Skills, create personal Skills, and submit stable Skills for public review |
| View executable capabilities | My Tools | View available tools, personal MCP tools, connector tools, and tool status |
| Connect personal MCP services | My MCP | Add MCP services and discover tools |
| Bind external accounts or channels | Connectors | Connect WeChat, email, or other connector-backed services |
| Save personal secrets | Key Management | Save API keys, email passwords, and external tokens as secret references |

## Workbench

These menus are used most often by ordinary users:

| Menu | Purpose |
| --- | --- |
| Dashboard | View token usage, session status, pending approvals, and recent sessions |
| Agent Session | Submit requirements, upload files, confirm tool actions, and continue asking follow-up questions |
| Workspace Files | Browse business space, session files, and personal Skill files |
| Session List | Manage main sessions and sub-sessions |

Start with **Agent Session**. If a task uses files, open **Workspace Files**. If you need history, open **Session List**.

## Runtime Governance

These menus manage risks, automation, reusable capabilities, and external connections:

| Menu | Purpose |
| --- | --- |
| Approval | Review sensitive actions related to the current user |
| Trigger Management | Create, enable, disable, or manually run long-term triggers |
| Agent Management | Manage available agent definitions |
| Skill Management | View public/personal Skills, edit drafts, publish to personal library, and submit for public review |
| My Tools | View system tools, personal MCP tools, connector tools, source, and availability |
| My MCP | Manage the current user's MCP services |
| Connectors | Manage user-side connections and administrator-side connector catalog |
| Key Management | Save workspace secrets used by tools |

Ordinary users do not need to understand the underlying protocols. Approvals control risk, triggers start tasks automatically, Skills and Tools extend capability, and connectors/keys connect external systems.

## Personal Settings

These settings only affect the current user:

| Menu | Purpose |
| --- | --- |
| Account Management | View or update current account information |
| Preferences | Set reply language, detail level, and workflow preference |
| Personal Approval Policy | Maintain personal approval override rules |
| Theme Settings | Change light/dark mode, colors, and display density |
| Email Management | Add email accounts, test sending, and choose the default email |

## Administrator Menus

Administrators may also see:

| Menu | Purpose |
| --- | --- |
| User Accounts | Manage local users, roles, groups, and account-level runtime environment |
| User Groups | Manage local user groups for authorization and isolation |
| External Systems | View external capability governance facts |
| Approval Policy | Manage system-level approval rules |
| Tool Management | Manage all tool governance information returned by the system |
| MCP Configuration | Manage global MCP services |
| System Components | Check server-side runtime components |
| Model Configuration | Manage model and provider connection information |
| System Configuration | Manage system-level configuration fields |
| Software License | View version, user limit, and license state |
| Agent Role Configuration | Manage fixed role configuration for execution, sub-agent completion, indexing, summary, and compression |

The enterprise account integration entry is not completed in the current version.

## Common Questions

### Why do I see fewer menus than the screenshots?

Menus are filtered by account permissions. Ordinary users usually do not see user management, agent governance, or system configuration.

### Where should I start?

Start with **Agent Session**. Use **Workspace Files** for files, **Trigger Management** for automation, and **Skill Management**, **My Tools**, **Connectors**, or **Key Management** for personal capabilities.

## Related Docs

- [Agent Session](/docs/user-guide/agent-session)
- [Skill Management](/docs/user-guide/skill)
- [Tool Management](/docs/user-guide/tool)
- [Connectors](/docs/user-guide/connector)
- [Model Configuration](/docs/user-guide/model-config)

## Next Steps

- [Complete your first task in Agent Session](/docs/getting-started/first-task)
- [Upload and manage Workspace Files](/docs/user-guide/workspace)
- [Create or update a personal Skill](/docs/getting-started/create-skill)
