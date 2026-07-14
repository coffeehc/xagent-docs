---
title: How to Self-host an AI Agent
description: Learn how to deploy xAgent in your own server and data environment, then provide a persistent task-oriented AI Agent through the web UI or IM connectors.
status: beta
updated: 2026-07-14
---

# How to Self-host an AI Agent

## Who This Is For

This guide is for teams and companies that want to run an AI Agent in their own servers, private network, or cloud account.

xAgent is not a chat application installed on every personal computer. It runs on a server, while users access it through the web UI or IM connectors. Administrators prepare models, Skills, tools, external connections, and security policies first. Users then submit tasks, provide materials, and review results.

## What Self-hosting Means for xAgent

Self-hosting means that you decide where xAgent runs, where runtime data is stored, how users access it, and which external services it connects to. xAgent currently has no official SaaS release plan, so task files and workspace data do not need to be hosted on an official platform.

This does not mean all data automatically remains inside your environment. Model APIs, MCP services, connectors, and external business systems still process data according to their own integrations. Whether to use a local model, which external systems to allow, and who can access the service are deployment-owner decisions.

## Why Run It on a Server

| Capability | Practical meaning |
| --- | --- |
| No dependency on a personal computer | Tasks run on the server, so a submitted task can continue after a user shuts down their computer. |
| One access point | Users can enter through the web UI or start and follow tasks from external entry points such as WeChat through IM connectors. |
| Centralized task files | Materials, intermediate files, and results remain in server-side workspaces for continued work and later review. |
| User workspace isolation | Each user accesses only their own workspace files, preventing task materials from different users being mixed together. |
| Support for your own model service | A local model or self-managed model gateway can keep task data in your own environment as much as possible. |
| Centralized governance | Administrators configure models, Skills, tools, connectors, and approval policies once, then make them ready for users. |

## Prepare Before Deployment

Before the first deployment, clarify the following:

1. Prepare an always-on Linux or macOS server. Windows is currently untested and not recommended for deployment trials.
2. Decide on a model source. You can connect a model API or run a local model service, but the model must support tool calling reliably.
3. Plan the access path. Internal users can access the server directly; public or domain access should use Nginx, Caddy, or another reverse proxy for HTTPS.
4. Define the first users and task scenarios. Start with low-risk work such as document organization, material analysis, or report generation.
5. List external capabilities that are actually required. Add MCP services or connectors only when needed.

The current version uses embedded SQLite by default, so the first deployment does not require PostgreSQL, MySQL, or Redis.

## Recommended Rollout Order

### 1. Install and Start the Server

Download the correct binary for your system and architecture by following [Server Installation](/docs/deployment/server-install). For long-running Linux deployments, register it as a systemd service.

### 2. Configure and Validate a Model

Add at least one usable model in Model Configuration. Test normal chat, streaming, and tool calling first. At least 64k context is recommended; 100k or more is better for long tasks and complex scenarios. See [Model Notes](/docs/deployment/model-requirements) for details.

### 3. Complete Basic Security Setup

Do not expose the xAgent port directly to the public internet. Use a reverse proxy for HTTPS, network controls, and firewall rules. Configure [Approval Policies](/docs/user-guide/approval-policy) for sending messages, changing external data, and other sensitive actions when needed.

xAgent isolates user workspaces. Keys are also managed independently: tool configuration uses placeholders, and real values are substituted only when a tool call is made inside the system. Do not put passwords, tokens, or verification codes into session messages or task materials.

### 4. Validate with a Small Real Task

Create an [Agent Session](/docs/user-guide/agent-session), upload a small non-sensitive file, and complete a task with a clear, reviewable result. Confirm that model access, workspace read/write, file handling, and approvals work before opening the system to more users.

### 5. Add External Capabilities Only as Needed

Use MCP when sessions need to call an external service on demand. Use [Connectors](/docs/user-guide/connector) when accounts, messages, or events from WeChat, email, or enterprise systems need to enter xAgent proactively. See [MCP vs. Connectors](/docs/guides/mcp-vs-connector) for the difference.

## Common Use Cases

- A team sends documents, spreadsheets, or source materials to an Agent and keeps results in server-side workspaces.
- Users submit long tasks through the web UI and let the server continue after they leave their computers.
- Users send a task from an authorized IM connector, while xAgent processes it and returns results from the server.
- Administrators publish verified Skills and tools as shared capabilities so ordinary users do not need to configure them repeatedly.

## Important Boundaries

- Self-hosted xAgent is not an offline desktop application. The server needs to stay online to receive and execute ongoing tasks.
- A local model can improve data privacy, but MCP services, connectors, and external APIs still follow the data boundaries of the services you choose and authorize.
- xAgent is currently beta. Before production use, validate models, external connections, approvals, and backups with real but non-sensitive tasks.
- The current version does not support online upgrades. Upgrades require maintenance, backup, binary replacement, and checks. See [Server Installation](/docs/deployment/server-install).

## Related Concepts

- [What is xAgent](/docs/getting-started/what-is-xagent)
- [How xAgent Isolates Workspaces with a Virtual File System](/docs/guides/multi-user-workspace-isolation)
- [Model Notes](/docs/deployment/model-requirements)
- [Connectors](/docs/user-guide/connector)
- [MCP vs. Connectors](/docs/guides/mcp-vs-connector)

## Next Steps

- [Install the xAgent Server](/docs/deployment/server-install)
- [Complete Your First Task](/docs/getting-started/first-task)
- [Configure Approval Policies](/docs/user-guide/approval-policy)
