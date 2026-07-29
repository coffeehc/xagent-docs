---
title: Operations Pages
description: Guide and interface screenshots for xAgent Approvals, Triggers, Agents, Skills, Tools, MCP, connections, and Secrets pages.
status: beta
updated: 2026-07-29
---

# Operations Pages

Operations covers user-side task control and capability configuration. Approvals, connections, and Secrets are visible to all users. The remaining pages require an administrator to enable advanced mode for the account.

## Approvals

**Menu path:** Operations > Approvals

**Visible to:** All users

![xAgent Approvals page showing pending and historical approvals](/img/manual/v005/en/approvals.webp)

The Approvals page centralizes sensitive actions requested during tasks:

- View pending, approved, and rejected requests.
- Check the originating Session, Tool, risk level, parameter summary, and reason.
- After approval or rejection, the result returns to the original Session so execution can continue.
- Every connected IM channel also receives approval notifications, allowing approval directly from a phone.

## Trigger Management

**Menu path:** Operations > Trigger Management

**Visible to:** Users with advanced mode enabled

![xAgent Trigger Management page showing status, type, policy, next run time, and actions](/img/manual/v005/en/triggers.webp)

Triggers start tasks automatically based on time or events:

- Search Triggers and filter by type.
- View enabled status, scheduling policy, next run time, and stable key.
- Create, run manually, enable or disable, edit, and delete Triggers.

See [Trigger Management](/docs/user-guide/trigger) for the complete workflow.

## Agent Management

**Menu path:** Operations > Agent Management

**Visible to:** Users with advanced mode enabled

![xAgent user-side Agent Management page showing available Agents and their sources](/img/home/v005/xagent-agent-management-en.webp)

The user-side Agent page is used to select and maintain task entry points available to the current user:

- View built-in, public, and personal Agents.
- Search names, prompts, Skills, Tools, or Secret dependencies.
- Create a personal Agent or inspect a public Agent definition.

See [Agent Management](/docs/user-guide/agent-management) for the complete concepts.

## Skill Management

**Menu path:** Operations > Skill Management

**Visible to:** Users with advanced mode enabled

![xAgent user-side Skill Management page showing Skill sources, status, and actions](/img/home/v005/xagent-skill-tool-en.webp)

Skill Management is used to reuse task methods and maintain personal Skills:

- View summaries and status for built-in, public, and personal Skills.
- Search Skills, inspect resource files, and load them on demand in a Session.
- Create, validate, edit, and publish personal Skills.

See [Skill Management](/docs/user-guide/skill) for the complete workflow.

## My Tools

**Menu path:** Operations > My Tools

**Visible to:** Users with advanced mode enabled

![xAgent My Tools page showing Tool sources, risks, readiness, and actions](/img/manual/v005/en/tools.webp)

My Tools brings together the native, MCP, and Connector Tools available to the current account:

- Search or filter by name, source, risk, and readiness.
- View Tool descriptions, parameters, approval requirements, and reasons for unavailability.
- Whether a Tool can be invoked also depends on system status, account scope, and approval policies.

See [Tool Management](/docs/user-guide/tool) for details.

## My MCP

**Menu path:** Operations > My MCP

**Visible to:** Users with advanced mode enabled

![xAgent My MCP page showing MCP services available to the current user and their connection status](/img/manual/v005/en/mcp.webp)

My MCP is used to view and manage MCP services connected for the current account:

- View service status, protocol, Tool count, and source.
- Create or edit user-scoped MCP connections.
- If a service is unhealthy, first check its address, authentication, and the administrator-side global configuration.

## My Connections

**Menu path:** Operations > My Connections

**Visible to:** All users

![xAgent My Connections page showing Connector channels, authentication status, and dedicated Sessions](/img/manual/v005/en/connections.webp)

My Connections binds personal external accounts to installed Connectors:

- View channel connection status, authentication status, bound targets, and dedicated Sessions.
- Create a connection and complete QR code, bot, or application authorization.
- Enter the dedicated Session, or reauthenticate and reopen the channel when a connection expires.

See [Connectors](/docs/user-guide/connector) for the complete workflow.

## Secret Management

**Menu path:** Operations > Secret Management

**Visible to:** All users

![xAgent Secret Management page showing Secret names, masked value previews, purposes, and update times](/img/manual/v005/en/secrets.webp)

Secret Management stores sensitive values required by tasks and external services:

- Create a stable Secret Key and describe its purpose.
- The page shows only a masked preview and never displays the complete Secret again.
- Skills, Tools, and configuration reference Secrets through placeholders. Do not put real values in prompts or Workspace files.
