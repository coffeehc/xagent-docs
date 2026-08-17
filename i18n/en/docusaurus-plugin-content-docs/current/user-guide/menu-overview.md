---
title: Feature and Menu Overview
description: Understand the current xAgent console structure, simple and advanced modes, and the main user and administrator menus.
status: stable
updated: 2026-08-17
---

# Feature and Menu Overview

For page-by-page paths, visibility, actions, and current English UI examples, use the [xAgent User Manual](/docs/manual/overview).

## Who This Is For

This page is for users and administrators who are opening xAgent for the first time and want to understand the available features, where to find them, and why some menus may be hidden.

## Current Interface Structure

The current console continues to evolve the information architecture introduced in `v0.0.5.beta`: consistent branding, typography, density, page hierarchy, responsive layouts, and shared interaction patterns for lists, dialogs, and drawers. Agent Sessions bring the message timeline, attachments, Tool status, and Workspace access together for consistent desktop and narrow-screen use.

Preferences, theme settings, and email management are no longer separate sidebar entries. Account information, interface theme, and display density are consolidated under **Account management**. Multiple interface color palettes have been removed.

> Pre-redesign screenshots have been removed because their page structure and button positions can mislead users of the current release. Use the deployed interface and the [xAgent User Manual](/docs/manual/overview) as the current references.

## Simple and Advanced Modes

An administrator can enable advanced features for each user. Simple mode keeps the entries needed for daily tasks. Advanced mode adds orchestration and capability-management pages.

| Mode | Visible entries |
| --- | --- |
| Simple | Dashboard, Agent sessions, Workspace files, Approvals, My connections, Secrets, Account management |
| Advanced | Everything in simple mode, plus Session list, Triggers, Agents, Skills, My tools, My MCP, and Personal approval policy |

Administrator-only groups depend on the administrator role, not the user's advanced-mode setting.

## Common Paths

| What you want to do | Menu | Notes |
| --- | --- | --- |
| Submit tasks, upload materials, and follow execution | [Agent sessions](/docs/user-guide/agent-session) | Main daily workspace |
| Review uploaded files and generated outputs | [Workspace files](/docs/user-guide/workspace) | Preview, download, or reference workspace files |
| Find and manage historical sessions | Session list | Advanced mode; searches main and sub-sessions |
| Review actions that require confirmation | Approvals | Shows approval details, risk, and related sessions |
| Start tasks on a schedule or external event | [Triggers](/docs/user-guide/trigger) | Advanced mode |
| Manage personal Agents, Skills, Tools, or MCP | Agents, Skills, My tools, My MCP | Advanced mode |
| Bind WeChat, Telegram, Feishu, or other channels | [My connections](/docs/user-guide/connector) | Available in simple mode |
| Store API keys and external tokens | Secrets | Available in simple mode |

## Workspace

| Menu | Purpose |
| --- | --- |
| Dashboard | Review Token usage, session status, pending approvals, and recent sessions |
| [Agent sessions](/docs/user-guide/agent-session) | Submit tasks, upload attachments, follow execution, and ask follow-up questions |
| [Workspace files](/docs/user-guide/workspace) | Browse business spaces, session outputs, uploads, and personal Skill files |
| Session list | Search and manage main and sub-sessions in advanced mode |

Start with **Agent sessions**. Use **Workspace files** when a task works with files and **Session list** when you need to find history.

## Operations

| Menu | Visibility | Purpose |
| --- | --- | --- |
| Approvals | All users | Review sensitive actions related to the current user |
| [Triggers](/docs/user-guide/trigger) | Advanced | Create, enable, disable, or manually run long-term triggers |
| [Agents](/docs/user-guide/agent-management) | Advanced | Manage personal and public Agent entries |
| [Skills](/docs/user-guide/skill) | Advanced | Use public Skills and maintain personal Skills |
| [My tools](/docs/user-guide/tool) | Advanced | Review available tools, sources, and status |
| My MCP | Advanced | Connect personal MCP services and discover tools |
| [My connections](/docs/user-guide/connector) | All users | Bind external accounts and review authentication, channel, and tool status |
| Secrets | All users | Store workspace secrets for the current user |

Users do not need to understand the underlying protocols. Approvals control risk, Triggers start work automatically, Skills and Tools extend execution, and connections and secrets provide access to external systems.

## Personal Settings

| Menu | Visibility | Purpose |
| --- | --- | --- |
| Account management | All users | Manage profile, interaction preferences, interface theme, and display density |
| [Personal approval policy](/docs/user-guide/approval-policy) | Advanced | Maintain approval overrides for the current account |

## Users

These entries are visible only to administrators:

| Menu | Purpose |
| --- | --- |
| User accounts | Manage local accounts, roles, groups, and each user's advanced-feature setting |
| User groups | Manage local groups used for authorization and isolation |

The Enterprise accounts entry remains hidden and is not a user-facing feature in the current release.

## Analytics

These entries are visible only to administrators:

| Menu | Purpose |
| --- | --- |
| Token usage | Review model Token usage by user |
| System monitoring | Review service and resource status |

## Agent Governance

These administrator-only entries manage system capabilities:

| Menu | Purpose |
| --- | --- |
| [Agent definitions](/docs/user-guide/agent-management) | Manage system-level Agent definitions |
| [Approval policy](/docs/user-guide/approval-policy) | Manage system-level approval rules |
| [Skill admin](/docs/user-guide/skill) | Manage public Skills and submission reviews |
| [Tool admin](/docs/user-guide/tool) | Manage tools, sources, status, and input/output contracts |
| [Connectors](/docs/user-guide/connector) | Manage the Connector catalog, Cards, health, and tool declarations |
| MCP config | Manage global MCP services |
| Execution environment | Inspect Runtime Assets and server execution components |

## System Config

These entries are visible only to administrators:

| Menu | Purpose |
| --- | --- |
| [Model config](/docs/user-guide/model-config) | Manage models and provider connections |
| System config | Manage system-level configuration fields |
| Software license | Review the version, user limit, and license state |
| Agent role config | Configure fixed roles for primary execution, sub-agents, indexing, summaries, and compression |

## Related Docs

- [Agent sessions](/docs/user-guide/agent-session)
- [Workspace files](/docs/user-guide/workspace)
- [Connectors](/docs/user-guide/connector)
- [Skill management](/docs/user-guide/skill)
- [Tool management](/docs/user-guide/tool)
- [Approval policy](/docs/user-guide/approval-policy)

## Next Steps

- [Complete your first task in Agent Sessions](/docs/getting-started/first-task)
- [Upload and manage Workspace Files](/docs/user-guide/workspace)
- [Create or update a personal Skill](/docs/getting-started/create-skill)
