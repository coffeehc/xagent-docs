---
title: Agent Governance Pages
description: Page-by-page guidance and English UI examples for global Agents, approvals, Skills, Tools, Connectors, MCP, and execution environments.
status: beta
updated: 2026-07-27
---

# Agent Governance Pages

Agent Governance is available only to administrators. These pages own global capabilities, execution boundaries, and public resources.

## Agent Definitions

**Menu:** Agent Governance > Agent Definitions

**Visibility:** Administrators

![xAgent administrator Agent Definitions showing source, description, and actions](/img/manual/v005/en/admin-agent-definitions.webp)

Review definition sources and dependencies, create or edit system-wide Agents, and control which public Agents users can select. Personal Agents remain user-owned.

## Approval Policy

**Menu:** Agent Governance > Approval Policy

**Visibility:** Administrators

![xAgent administrator Approval Policy showing risk rules and policy configuration](/img/home/v005/xagent-security-policy-en.webp)

Set the system-wide allow, confirm, or deny baseline for risk levels and specific actions. Mandatory administrator rules take precedence over personal policy.

## Skill Admin

**Menu:** Agent Governance > Skill Admin

**Visibility:** Administrators

![xAgent Skill Admin showing global Skills, sources, and state](/img/manual/v005/en/admin-skills.webp)

Search, inspect, validate, and maintain built-in and public Skills; manage publication and review state; and verify declared tools, resources, and safety boundaries.

## Tool Admin

**Menu:** Agent Governance > Tool Admin

**Visibility:** Administrators

![xAgent Tool Admin showing source, risk, state, and governance actions](/img/home/v005/xagent-skill-tool-en.webp)

Search all discoverable tools by name, source, risk, and state. Inspect schemas, permissions, approval requirements, and unavailable reasons before exposing tools to users.

## Connectors

**Menu:** Agent Governance > Connectors

**Visibility:** Administrators

![xAgent Connectors showing software version, protocol, online state, and actions](/img/home/v005/xagent-connectors-en.webp)

Review software and protocol versions, online state, and updates; add or edit Connector instances; refresh health; and remove unused instances. See the [Connector user guide](/en/docs/user-guide/connector).

## MCP Config

**Menu:** Agent Governance > MCP Config

**Visibility:** Administrators

![xAgent MCP Config showing service, protocol, tool count, and address](/img/manual/v005/en/admin-mcp.webp)

Create system-wide MCP services, select transports, review health and discovered tool counts, and confirm that changes propagate to My MCP and the tool catalog.

## Execution Environment

**Menu:** Agent Governance > Execution Environment

**Visibility:** Administrators

![xAgent Execution Environment showing sandbox backends, managed runtimes, and host adapters](/img/manual/v005/en/admin-file-processing.webp)

- Review sandbox backend, managed runtime, and host-adapter readiness.
- Inspect Python, Node.js, and CLI isolation sources and requirements.
- Use **Refresh detection** to recheck ProcessSandbox and Runtime Assets.
- Required execution capabilities stay unavailable when isolation is not ready; they do not fall back to unisolated execution.
