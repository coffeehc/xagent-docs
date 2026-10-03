---
title: "xAgent Documentation Guide and User Manual"
description: "Find a path through product basics, first use, everyday work, advanced workflows, deployment, and troubleshooting, with a full role and console-page index."
status: beta
updated: 2026-10-03
schemaType: CollectionPage
---

import DocsJourney from '@site/src/components/DocsJourney';

# xAgent User Manual

Start with the work you want to do; you do not need to read every concept first. If you already have an account, try a first task. Deployment owners should start with installation and model validation. The full role index, page directory, and shared operation guidance remain below.

<DocsJourney />

<div className="alert alert--info margin-bottom--lg" role="note">

**Match the documentation to your version**

The public binary release is now `v0.0.22.beta` (2026-10-02). This revision also checks the source as of 2026-10-01; behavior newer than the public release is labeled separately. A documentation date does not establish that your deployment includes it. Run `xagent version` or check Software License, then consult the [Changelog](/docs/changelog). Actual pages, roles, installed tools, and external authorizations depend on your deployment.

</div>

## How to Use This Manual {/* #how-to-use-this-manual */}

| Your Role | Start Here | Description |
| --- | --- | --- |
| Ordinary user | [Workspace](/docs/manual/workspace) | Start with Dashboard, Agent Session, and Workspace Files |
| User configuring advanced capabilities | [Operations](/docs/manual/operations) | Manage Triggers, Agents, Skills, Tools, MCP, connections, and Environment Variables |
| Administrator | [User Management](/docs/manual/user-management), [Analytics](/docs/manual/analytics), [Agent Governance](/docs/manual/agent-governance), and [System Configuration](/docs/manual/system-configuration) | Manage global resources, execution environments, and system configuration |

![2026-10-01 reviewed product interface](/img/home/current/xagent-launch-session.webp)

From a session to inspectable files: the launch-kit demonstration, completed with human review and follow-up instructions. Chinese UI with demonstration content.

<details>
<summary>Earlier interface reference (retained)</summary>

![Earlier console dashboard function reference](/img/home/v005/xagent-dashboard-en.webp)
</details>

> **About the screenshots**
>
> The earlier screenshots come from a real console and preserve function and information-structure guidance; do not use them to locate current buttons. Environment-specific data such as email addresses, Session identifiers, task titles, connection targets, internal addresses, runtime directories, and authorization details has been redacted. Layouts vary by version and role. Current source separates the user app from the admin console; the earlier advanced-mode grouping is not a universal switch for current menus.
>
> The Chinese manual uses Chinese interface screenshots, while the English manual uses separate English interface screenshots. These earlier images are not shared between languages. New execution evidence identifies its interface language; administrator pages without current access retain labeled earlier images.

## Page Directory {/* #page-directory */}

### Agent Capabilities {/* #agent-capabilities */}

- [The v0.0.20 inventory of 54 Skills, tasks, and file-processing scope](/docs/manual/capabilities)

### Workspace {/* #workspace */}

- [Dashboard, Agent Sessions, Workspace Files, File Shares, and Session List](/docs/manual/workspace)

### Operations {/* #operations */}

- [Approvals, Triggers, Agents, Skills, Tools, MCP, connections, A2A, and Environment Variables](/docs/manual/operations)

### Personal Settings {/* #personal-settings */}

- [Account Management and Personal Approval Policy](/docs/manual/personal-settings)

### Administrator Pages {/* #administrator-pages */}

- [User Accounts and User Groups](/docs/manual/user-management)
- [Token Analytics and System Monitoring](/docs/manual/analytics)
- [Agent Governance](/docs/manual/agent-governance)
- [System Configuration](/docs/manual/system-configuration)

## Shared Page Structure {/* #shared-page-structure */}

1. User settings are grouped into Workspace, Operations, and Personal Settings. Current source puts administration in a separate console; earlier versions placed admin groups in the same sidebar.
2. The top bar shows breadcrumbs, interface language, Help, and the current account.
3. Search, filters, refresh, and create actions usually appear below the page title.
4. Tables or cards show current resources. The action column on the right opens details, editing, enable or disable actions, or deletion.
5. When the left menu is collapsed, only icons remain. Hover to see names, or click the menu button in the top bar to expand it.

To confirm what xAgent can do and which files it can process, read [Supported Agent Capabilities](/docs/manual/capabilities). For task-writing guidance, long-running tasks, or shortcut instructions, continue with the corresponding pages under Everyday Work and Advanced Workflows in the sidebar.
