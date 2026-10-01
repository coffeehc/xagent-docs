---
title: "Operations Pages"
description: "Guide to xAgent Approvals, Triggers, Agents, Skills, Tools, MCP, Plugin Connections, A2A, and Secrets."
status: beta
updated: 2026-10-01
---

# Operations Pages

> Version scope: current-field and behavior corrections below were checked against source `43d2698` on 2026-10-01. Older public binaries may differ; verify your installed version before following a changed UI or operation.

Operations covers task control and capability configuration for the signed-in user under `/app`. The current menu no longer hides these pages behind simple or advanced mode. Resource access and executable actions still depend on account permissions, service readiness, and approval policy. Global administration is in the separate `/admin` console.

> Screenshot note: The retained `v005` images illustrate fields and operations. Some older menu names and layouts have changed; the menu paths below describe the current version.

## Approvals {/* #approvals */}

**Menu path:** Operations &gt; Approvals (`/app/approvals`)

**Visible to:** All users

![A high-risk Tool approval card in an xAgent Session showing the risk level, resource scope, and approval action](/img/manual/v005/en/agent-session.webp)

The Approvals page centralizes sensitive actions requested during tasks:

- View pending, approved, and rejected requests.
- Check the originating Session, Tool, risk level, parameter summary, and reason.
- After approval or rejection, the result returns to the original Session so execution can continue.
- When a Session waits for approval, the system attempts to notify all available IM messaging channels for the current user, including for Web-originated tasks. Reply with `@{approval:approval-id} approve` or `@{approval:approval-id} reject` as shown in the notice. The first accepted valid decision takes effect.

## Trigger Management {/* #trigger-management */}

**Menu path:** Operations &gt; Triggers (`/app/triggers`)

**Visible to:** The signed-in user

![xAgent Trigger Management page showing status, type, policy, next run time, and actions](/img/manual/v005/en/triggers.webp)

Triggers start tasks automatically based on time or events:

- Search Triggers and filter by type.
- View enabled status, scheduling policy, next run time, and stable key.
- Create, run manually, enable or disable, edit, and delete Triggers.
- Inspect the target Session, activation context, successful submission count, and latest error in details. A successful trigger means its message was submitted, not that the task finished.

See [Trigger Management](/docs/user-guide/trigger) for the complete workflow.

## Agent Management {/* #agent-management */}

**Menu path:** Operations &gt; Agents (`/app/agent-definitions`)

**Visible to:** The signed-in user

![xAgent user-side Agent Management page showing available Agents and their sources](/img/home/v005/xagent-agent-management-en.webp)

The user-side Agent page is used to select and maintain task entry points available to the current user:

- View built-in, public, and personal Agents.
- Search names, prompts, Skills, Tools, or Secret dependencies.
- Create a personal Agent or inspect a public Agent definition.

See [Agent Management](/docs/user-guide/agent-management) for the complete concepts.

## Skill Management {/* #skill-management */}

**Menu path:** Operations &gt; Skills (`/app/skills`)

**Visible to:** The signed-in user

Skill Management is used to reuse task methods and maintain personal Skills:

- View summaries and status for built-in, public, and personal Skills.
- Search Skills, inspect resource files, and load them on demand in a Session.
- Create, validate, edit, and publish personal Skills.

See [Skill Management](/docs/user-guide/skill) for the complete workflow.

## My Tools {/* #my-tools */}

**Menu path:** Operations &gt; My tools (`/app/tools`)

**Visible to:** The signed-in user

![xAgent My Tools page showing Tool sources, risks, readiness, and actions](/img/manual/v005/en/tools.webp)

My Tools brings together the native, MCP, and AgentPlugin Tools available to the current account:

- Search or filter by name, source, risk, and readiness.
- View Tool descriptions, parameters, approval requirements, and reasons for unavailability.
- Whether a Tool can be invoked also depends on system status, account scope, and approval policies.

See [Tool Management](/docs/user-guide/tool) for details.

## My MCP {/* #my-mcp */}

**Menu path:** Operations &gt; My MCP (`/app/mcp`)

**Visible to:** The signed-in user

![xAgent My MCP page showing MCP services available to the current user and their connection status](/img/manual/v005/en/mcp.webp)

My MCP is used to view and manage MCP services connected for the current account:

- View service status, protocol, Tool count, and source.
- Create or edit user-scoped MCP connections.
- If a service is unhealthy, first check its address, authentication, and the administrator-side global configuration.

## Plugin Connections {/* #plugin-connections */}

**Menu path:** Operations &gt; My plugins (`/app/plugin-connections`)

**Visible to:** All users

![xAgent My Connections page showing Connector channels, authentication status, and dedicated Sessions](/img/manual/v005/en/connections.webp)

Plugin Connections binds personal external accounts to installed AgentPlugins:

- View channel connection status, authentication status, bound targets, and dedicated Sessions.
- Create a connection and complete QR code, bot, or application authorization.
- Enter the dedicated Session, or reauthenticate and reopen the channel when a connection expires.

See [AgentPlugins](/docs/user-guide/connector) for the complete workflow.

## A2A {/* #a2a */}

**Menu path:** Operations &gt; A2A (`/app/a2a`)

**Visible to:** Users

Users discover and manage remote Agents, send and track tasks, and inspect remote outcomes in an inbox. A2A is managed separately from locally installed AgentPlugins. See [A2A Client](/docs/user-guide/a2a).

## Secret Management {/* #secret-management */}

**Menu path:** Operations &gt; Secrets (`/app/secrets`)

**Visible to:** All users

![xAgent Secret Management page showing Secret names, masked value previews, purposes, and update times](/img/manual/v005/en/secrets.webp)

Secret Management stores sensitive values required by tasks and external services:

- Create a stable Secret Key and describe its purpose.
- The page shows only a masked preview and never displays the complete Secret again.
- Skills, Tools, and configuration reference Secrets through placeholders. Do not put real values in prompts or Workspace files.
