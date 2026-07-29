---
title: Operations Pages
description: Page-by-page guidance and UI examples for xAgent Approvals, Triggers, Agents, Skills, Tools, MCP, Connections, and Secrets.
status: beta
updated: 2026-07-27
---

# Operations Pages

Operations contains user-side task controls and capability configuration. Approvals, My Connections, and Secrets are available to all users; the other pages require advanced mode.

## Approvals

**Menu:** Operations > Approvals

**Visibility:** All users

![xAgent Approvals page](/img/manual/v005/en/approvals.webp)

Review pending and historical requests, inspect the source session, tool, risk, parameter summary, and reason, then approve or reject the action. The decision is returned to the originating session. Every connected IM channel also receives the approval notification, so you can approve or reject it directly from your phone.

## Triggers

**Menu:** Operations > Triggers

**Visibility:** Advanced-mode users

![xAgent Triggers showing state, type, schedule, next run, and actions](/img/manual/v005/en/triggers.webp)

Search and filter triggers, review schedule and next-run state, then create, run now, enable, disable, edit, or delete a trigger. See [Triggers](/docs/user-guide/trigger).

## Agents

**Menu:** Operations > Agents

**Visibility:** Advanced-mode users

![xAgent user-side Agents page](/img/home/v005/xagent-agent-management-en.webp)

Browse built-in, public, and personal Agents; search definitions and dependencies; create personal Agents or inspect public definitions. See [Agent Management](/docs/user-guide/agent-management).

## Skills

**Menu:** Operations > Skills

**Visibility:** Advanced-mode users

![xAgent user-side Skills page](/img/manual/v005/en/skills.webp)

Browse built-in, public, and personal Skills; inspect resource files; and create, validate, edit, or publish personal Skills. See [Skill Management](/docs/user-guide/skill).

## My Tools

**Menu:** Operations > My Tools

**Visibility:** Advanced-mode users

![xAgent My Tools showing source, risk, readiness, and actions](/img/manual/v005/en/tools.webp)

Filter native, MCP, and Connector tools by source, risk, and readiness. Open details for schemas, approval requirements, or unavailable reasons. See [Tool Management](/docs/user-guide/tool).

## My MCP

**Menu:** Operations > My MCP

**Visibility:** Advanced-mode users

![xAgent My MCP showing user-visible services and connection state](/img/manual/v005/en/mcp.webp)

Review service state, protocol, tool count, and source; add or edit a user-scoped service; and check address, authentication, or global configuration when a service is unavailable.

## My Connections

**Menu:** Operations > My Connections

**Visibility:** All users

![xAgent My Connections showing Connector channels, authentication, and dedicated sessions](/img/manual/v005/en/connections.webp)

Create a connection, complete QR, bot, or app authorization, check channel and authentication state, and open the dedicated session. See [Connectors](/docs/user-guide/connector).

## Secrets

**Menu:** Operations > Secrets

**Visibility:** All users

![xAgent Secrets showing stable keys, masked previews, purpose, and update time](/img/manual/v005/en/secrets.webp)

Create stable Secret Keys for tools and external systems. Full values are never displayed again; Skills, Tools, and configuration should reference placeholders instead of embedding secrets in prompts or files.
