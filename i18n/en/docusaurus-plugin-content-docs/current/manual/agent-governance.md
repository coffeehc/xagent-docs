---
title: Agent Governance Pages
description: Guide and screenshots for xAgent administrator pages covering Agents, approvals, Skills, Tools, Connectors, MCP, and execution environments.
status: beta
updated: 2026-07-29
---

# Agent Governance Pages

Agent Governance pages are visible only to administrators and manage global capabilities, execution boundaries, and public resources.

## Agent Management

**Menu path:** Agent Governance > Agent Management

**Visible to:** Administrators

![xAgent administrator Agent Management page showing definition sources, descriptions, and actions](/img/manual/v005/en/admin-agent-definitions.webp)

Administrators maintain built-in, public, and system-scoped Agent definitions here:

- View definition sources, role descriptions, and capability dependencies.
- Create, edit, capture, or inspect Agent definitions.
- Public Agents are available for users to select, while personal Agents remain managed by their respective users.

## Approval Policy

**Menu path:** Agent Governance > Approval Policy

**Visible to:** Administrators

![xAgent administrator Approval Policy page showing risk rules and policy settings](/img/home/v005/xagent-security-policy-en.webp)

Approval Policy defines the system-wide baseline for action control:

- Configure allow, confirmation, or deny policies by risk level.
- Set global rules for specific Tools and actions.
- Mandatory administrator rules take precedence over personal user policies.

## Skill Management

**Menu path:** Agent Governance > Skill Management

**Visible to:** Administrators

![xAgent administrator Skill Management page showing global Skills, sources, and status](/img/home/v005/xagent-skill-tool-en.webp)

Administrator Skill Management governs built-in and public Skills:

- Search, inspect, validate, and maintain Skill resources.
- Manage public publishing, review status, and updates.
- Check whether a Skill declares the Tools, resources, and safety boundaries it requires.

## Tool Management

**Menu path:** Agent Governance > Tool Management

**Visible to:** Administrators

![xAgent Tool Management page showing Tool sources, risks, status, and governance actions](/img/manual/v005/en/admin-tools.webp)

Tool Management brings together every Tool the system can discover:

- Filter by Tool name, source, risk, and status.
- View parameter contracts, permissions, approval requirements, and reasons for unavailability.
- Control whether a Tool enters the user-visible discovery and execution scope.

## Connector Management

**Menu path:** Agent Governance > Connector Management

**Visible to:** Administrators

![xAgent Connector Management page showing software versions, protocol versions, online status, and actions](/img/home/v005/xagent-connectors-en.webp)

Connector Management maintains Connector instances installed in the system:

- View software versions, protocol versions, online status, and update notices.
- Add a Connector and edit its address and authentication configuration.
- Refresh runtime status, inspect details, or remove instances that are no longer used.

See [Connector User Guide](/docs/user-guide/connector) for installation instructions.

## MCP Configuration

**Menu path:** Agent Governance > MCP Configuration

**Visible to:** Administrators

![xAgent MCP Configuration page showing services, protocols, Tool counts, and addresses](/img/manual/v005/en/admin-mcp.webp)

MCP Configuration maintains system-scoped MCP services:

- Create a service and choose its transport protocol.
- View health status, discovered Tool count, and service address.
- After editing or deleting a configuration, check whether My MCP and the user-side Tool list have synchronized.

## Execution Environment

**Menu path:** Agent Governance > Execution Environment

**Visible to:** Administrators

![xAgent Execution Environment page showing sandbox backends, managed runtimes, and host adapter status](/img/manual/v005/en/admin-file-processing.webp)

The Execution Environment page shows the runtime conditions that task processes actually depend on:

- The summary shows counts for sandbox backends, managed runtimes, and host adapters.
- The list shows the source and readiness of Python, Node.js, CLI isolation, and other capabilities.
- **Refresh Probe** checks ProcessSandbox and Runtime Assets again.
- When a required execution environment is not ready, dependent capabilities remain unavailable and do not fall back to unisolated execution.
