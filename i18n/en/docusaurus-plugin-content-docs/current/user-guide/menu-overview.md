---
title: "Feature and Menu Overview"
description: "Find xAgent features across sessions, user settings, and the separate admin console, with earlier menu names and advanced-mode differences for migration."
status: stable
updated: 2026-10-01
---

# Feature and Menu Overview

For page-by-page paths, visibility, actions, and current English UI examples, use the [xAgent User Manual](/docs/manual/overview).

## Who This Is For {/* #who-this-is-for */}

This page is for users and administrators who are opening xAgent for the first time and want to understand the available features, where to find them, and why some menus may be hidden.

## Where to Enter {/* #where-to-enter */}

Current source (2026-10-01) separates the **session surface, user settings, and admin console**. The account menu at the bottom of the session sidebar provides Settings; administrators also see Enter Admin Console. A missing system-model or user-management item in personal settings is not a reason to create another account or expand access.

| What You Need | Current Entry | Earlier Name |
| --- | --- | --- |
| Your own Token, model, and tool usage | User settings → Workspace → Usage statistics | Dashboard |
| Your external accounts | User settings → Operations → My Plugins | Plugin Connections |
| Inspect and maintain long-term memory | User settings → Personal Settings → My Memories | Not listed in the earlier sidebar |
| Organization-wide user usage | Admin console → Analytics → Runtime statistics | Token Usage |
| Platform errors | Admin console → Analytics → Error Records | Not listed in the earlier sidebar |
| Shared plugin services | Admin console → Agent governance → Plugin management | AgentPlugin Connectors |
| Runtime packages | Admin console → Agent Governance → Execution Environment | Name retained; contents have evolved |

The directory below retains earlier names for migration. Exact labels, entries, and access depend on the deployed version. Enabling a personal “advanced mode” does not grant administrator privileges.

## Current Interface Structure {/* #current-interface-structure */}

The current console continues to evolve the information architecture introduced in `v0.0.5.beta`: consistent branding, typography, density, page hierarchy, responsive layouts, and shared interaction patterns for lists, dialogs, and drawers. Agent Sessions bring the message timeline, attachments, Tool status, and Workspace access together for consistent desktop and narrow-screen use.

Preferences, theme settings, and email management are no longer separate sidebar entries. Account information, interface theme, and display density are consolidated under **Account management**. Multiple interface color palettes have been removed.

> Pre-redesign screenshots have been removed because their page structure and button positions can mislead users of the current release. Use the deployed interface and the [xAgent User Manual](/docs/manual/overview) as the current references.

## Simple and Advanced Modes {/* #simple-and-advanced-modes */}

The following simple/advanced grouping describes earlier versions and is retained to explain historical screenshots. The user menus and layout checked on 2026-10-01 no longer filter by this switch. Do not treat “enable advanced features” as a universal fix for a missing current menu.

| Mode | Visible entries |
| --- | --- |
| Simple | Dashboard, Agent sessions, Workspace files, File Shares, Approvals, Plugin Connections, Secrets, Account management |
| Advanced | Everything in simple mode, plus Session list, Triggers, Agents, Skills, My tools, My MCP, and Personal approval policy |

Administrator-only groups still require the administrator role and now appear in a separate console.

## Common Paths {/* #common-paths */}

| What you want to do | Menu | Notes |
| --- | --- | --- |
| Submit tasks, upload materials, and follow execution | [Agent sessions](/docs/user-guide/agent-session) | Main daily workspace |
| Review uploaded files and generated outputs | [Workspace files](/docs/user-guide/workspace) | Preview, download, or reference workspace files |
| Create expiring links and inspect visits | [File Shares](/docs/user-guide/file-sharing) | Requires an administrator-enabled policy |
| Find and manage historical sessions | Session list | Current user entry; searches main and sub-sessions; previously advanced mode |
| Review actions that require confirmation | Approvals | Shows approval details, risk, and related sessions |
| Start tasks on a schedule or external event | [Triggers](/docs/user-guide/trigger) | Current user entry; previously advanced |
| Manage personal Agents, Skills, Tools, or MCP | Agents, Skills, My tools, My MCP | Current user entry; previously advanced |
| Bind WeChat, Telegram, Feishu, or other channels | [Plugin Connections](/docs/user-guide/connector) | Current user entry; previously also in simple mode |
| Call remote Agents and track tasks | [A2A](/docs/user-guide/a2a) | User-level remote connections |
| Store API keys and external tokens | Secrets | Current user entry; previously also in simple mode |

## Workspace {/* #workspace */}

| Menu | Purpose |
| --- | --- |
| Dashboard | Review Token usage, session status, pending approvals, and recent sessions |
| [Agent sessions](/docs/user-guide/agent-session) | Submit tasks, upload attachments, follow execution, and ask follow-up questions |
| [Workspace files](/docs/user-guide/workspace) | Browse business spaces, session outputs, uploads, and personal Skill files |
| [File Shares](/docs/user-guide/file-sharing) | Inspect expiring links and visit records, and revoke links |
| Session list | Search and manage main and sub-sessions; earlier versions required advanced mode |

Start with **Agent sessions**. Use **Workspace files** when a task works with files and **Session list** when you need to find history.

## Operations {/* #operations */}

| Menu | Visibility | Purpose |
| --- | --- | --- |
| Approvals | All users | Review sensitive actions related to the current user |
| [Triggers](/docs/user-guide/trigger) | Current user (previously advanced mode) | Create, enable, disable, or manually run long-term triggers |
| [Agents](/docs/user-guide/agent-management) | Current user (previously advanced mode) | Manage personal and public Agent entries |
| [Skills](/docs/user-guide/skill) | Current user (previously advanced mode) | Use public Skills and maintain personal Skills |
| [My tools](/docs/user-guide/tool) | Current user (previously advanced mode) | Review available tools, sources, and status |
| My MCP | Current user (previously advanced mode) | Connect personal MCP services and discover tools |
| [Plugin Connections](/docs/user-guide/connector) | All users | Bind external accounts and review authentication, channel, and tool status |
| [A2A](/docs/user-guide/a2a) | Users | Manage remote Agents, tasks, and inbox |
| Secrets | All users | Store workspace secrets for the current user |

Users do not need to understand the underlying protocols. Approvals control risk, Triggers start work automatically, Skills and Tools extend execution, and connections and secrets provide access to external systems.

## Personal Settings {/* #personal-settings */}

| Menu | Visibility | Purpose |
| --- | --- | --- |
| Account management | All users | Manage profile, interaction preferences, interface theme, and display density |
| [Personal approval policy](/docs/user-guide/approval-policy) | Current user (previously advanced mode) | Maintain approval overrides for the current account |

My Memories is also a current Personal Settings entry; see [Long-Term Memory](/docs/user-guide/memory). Storage Management includes Cloud Storage, Backup and Restore, Public Directories, and File-Link Policy. These administrator entries do not grant users arbitrary host-directory access.

## Users {/* #users */}

These entries are visible only to administrators:

| Menu | Purpose |
| --- | --- |
| User accounts | Manage local accounts, roles, and groups; the advanced-feature switch belongs to earlier UI |
| User groups | Manage local groups used for authorization and isolation |

The Enterprise accounts entry remains hidden and is not a user-facing feature in the current release.

## Analytics {/* #analytics */}

Users can inspect their own data through Usage in the workspace. The following organization-wide entries require an administrator:

| Menu | Purpose |
| --- | --- |
| Token usage | Review model Token usage by user |
| System monitoring | Review service and resource status |
| Error records | Current admin entry for platform errors |

## Agent Governance {/* #agent-governance */}

These administrator-only entries manage system capabilities:

| Menu | Purpose |
| --- | --- |
| [Agent definitions](/docs/user-guide/agent-management) | Manage system-level Agent definitions |
| [Approval policy](/docs/user-guide/approval-policy) | Manage system-level approval rules |
| [Skill admin](/docs/user-guide/skill) | Manage public Skills and submission reviews |
| [Tool admin](/docs/user-guide/tool) | Manage tools, sources, status, and input/output contracts |
| [AgentPlugin Connectors](/docs/user-guide/connector) | Manage plugin Cards, health, and tool declarations |
| MCP config | Manage global MCP services |
| Execution environment | Inspect Runtime Assets and server execution components |

The administrator policy for public links is under **Storage Management &gt; File Sharing**, and is disabled by default.

## System Config {/* #system-config */}

These entries are visible only to administrators:

| Menu | Purpose |
| --- | --- |
| [Model config](/docs/user-guide/model-config) | Manage models and provider connections |
| System config | Manage system-level configuration fields |
| Software license | Review the version, user limit, and license state |
| Agent role config | Current roles are main, orchestrator, task\_semantics, image\_generation, ocr, summary, memory\_extraction, and context\_compression; earlier descriptions included sub-agent and indexing roles |

## Related Docs {/* #related-docs */}

- [Agent sessions](/docs/user-guide/agent-session)
- [Workspace files](/docs/user-guide/workspace)
- [Connectors](/docs/user-guide/connector)
- [Skill management](/docs/user-guide/skill)
- [Tool management](/docs/user-guide/tool)
- [Approval policy](/docs/user-guide/approval-policy)

## Next Steps {/* #next-steps */}

- [Complete your first task in Agent Sessions](/docs/getting-started/first-task)
- [Upload and manage Workspace Files](/docs/user-guide/workspace)
- [Create or update a personal Skill](/docs/getting-started/create-skill)
