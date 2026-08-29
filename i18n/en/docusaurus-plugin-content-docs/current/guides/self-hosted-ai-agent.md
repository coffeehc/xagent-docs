---
title: "Self-Hosted AI Agent Platform: Deploy xAgent on Your Own Server"
description: A practical guide to deploying a self-hosted AI agent platform, covering server preparation, model access, HTTPS, workspace isolation, connectors, backups, and long-running tasks.
image: /img/share/en/xagent-security.png
status: beta
updated: 2026-08-29
---

# Self-Hosted AI Agent Platform: Deploy xAgent on Your Own Server

To host an AI agent with xAgent, run it as a long-lived server application in your own server, private network, or cloud account; then configure a usable model, HTTPS, access controls, and approval policies, and validate the setup with a small non-sensitive task. Self-hosting gives the deployment owner control over the runtime location and access boundaries, while model APIs, MCP services, connectors, and external systems still follow their own authorization and data boundaries.

## Who This Is For

This guide is for teams and companies that want to host an AI Agent on their own server, private network, or cloud account. It covers a complete self-hosted AI agent setup rather than only starting a binary.

xAgent is not a chat application installed on every personal computer. It runs on a server, while users access it through the web UI or IM connectors. Administrators prepare models, Skills, tools, external connections, and security policies first. Users then submit tasks, provide materials, and review results.

## What a Self-Hosted AI Agent Platform Means

With a self-hosted AI Agent platform, the deployment owner decides where xAgent runs, where runtime data is stored, how users access it, and which external services it connects to. xAgent currently has no official SaaS release plan, so task files and workspace data do not need to be hosted on an official platform.

This does not mean all data automatically remains inside your environment. Model APIs, MCP services, connectors, and external business systems still process data according to their own integrations. Whether to use a local model, which external systems to allow, and who can access the service are deployment-owner decisions.

If you are comparing self-hosting with a cloud service, separate runtime location from data flow: xAgent can run on your own server, private network, or cloud account, but a model Provider, MCP server, Connector, or external business system handles material only according to its actual configuration and authorization. Self-hosting is not synonymous with every byte staying local.

## AI Agent Hosting Architecture

| Capability | Practical meaning |
| --- | --- |
| No dependency on a personal computer | Tasks run on the server, so a submitted task can continue after a user shuts down their computer. |
| One access point | Users can enter through the web UI or start and follow tasks from external entry points such as WeChat through IM connectors. |
| Centralized task files | Materials, intermediate files, and results remain in server-side workspaces for continued work and later review. |
| User workspace isolation | Each user accesses only their own workspace files, preventing task materials from different users being mixed together. |
| Task process isolation | ProcessSandbox mounts only authorized files and read-only Runtime Assets, then limits the process tree and resources. |
| Support for your own model service | A local model or self-managed model gateway can keep task data in your own environment as much as possible. |
| Centralized governance | Administrators configure models, Skills, tools, connectors, and approval policies once, then make them ready for users. |

## Self-Hosted AI Agent Setup Checklist

A practical AI agent hosting setup must cover the runtime environment, model access, user entry points, security boundaries, and ongoing operations. Before the first deployment, clarify the following:

1. Prepare an always-on Linux or macOS server. Windows is not recommended for deployment for now because its current sandbox support is not sufficient to provide safe and controllable execution of xAgent-managed scripts.
2. Decide on a model source. You can connect a model API or run a local model service, but the model must support tool calling reliably.
3. Plan the access path. Internal users can access the server directly; public or domain access should use Nginx, Caddy, or another reverse proxy for HTTPS.
4. Define the first users and task scenarios. Start with low-risk work such as document organization, material analysis, or report generation.
5. List external capabilities that are actually required. Add MCP services or connectors only when needed.

The current version uses embedded SQLite by default, so the first deployment does not require PostgreSQL, MySQL, or Redis.

## Recommended Rollout Order

### 1. Install and Start the Server

Run the [official installer](/docs/getting-started/install). It detects the system and architecture, verifies release packages, and installs the current `v0.0.13.beta` release. On Linux it configures and starts a systemd service; on macOS it installs under the current user.

### 2. Configure and Validate a Model

Add at least one usable model in Model Configuration. Test normal chat, streaming, and tool calling first. At least 64k context is recommended; 100k or more is better for long tasks and complex scenarios. See [Model Notes](/docs/deployment/model-requirements) for details.

### 3. Complete Basic Security Setup

Do not expose the xAgent port directly to the public internet. Use a reverse proxy for HTTPS, network controls, and firewall rules. Configure [Approval Policies](/docs/user-guide/approval-policy) for sending messages, changing external data, and other sensitive actions when needed.

xAgent isolates user workspaces. Keys are also managed independently: tool configuration uses placeholders, and real values are substituted only when a tool call is made inside the system. Do not put passwords, tokens, or verification codes into session messages or task materials.

Confirm that ProcessSandbox and Runtime Assets are ready on the administrator **Execution environment** page. If the sandbox is unavailable, do not bypass the gate by running Tools directly on the host.

### 4. Validate with a Small Real Task

Create an [Agent Session](/docs/user-guide/agent-session), upload a small non-sensitive file, and complete a task with a clear, reviewable result. Confirm that model access, workspace read/write, file handling, and approvals work before opening the system to more users.

### 5. Add External Capabilities Only as Needed

Use MCP when sessions need to call an external service on demand. Use [Connectors](/docs/user-guide/connector) when accounts, messages, or events from WeChat, email, or enterprise systems need to enter xAgent proactively. See [What Is a Connector?](/docs/getting-started/what-is-connector#how-is-it-different-from-mcp) for the difference.

## Common Use Cases

- A team sends documents, spreadsheets, or source materials to an Agent and keeps results in server-side workspaces.
- Users submit long tasks through the web UI and let the server continue after they leave their computers.
- Users send a task from an authorized IM connector, while xAgent processes it and returns results from the server.
- Administrators publish verified Skills and tools as shared capabilities so ordinary users do not need to configure them repeatedly.

## Important Boundaries

- Self-hosted xAgent is not an offline desktop application. The server needs to stay online to receive and execute ongoing tasks.
- A local model can improve data privacy, but MCP services, connectors, and external APIs still follow the data boundaries of the services you choose and authorize.
- xAgent is currently beta. Before production use, validate models, external connections, approvals, and backups with real but non-sensitive tasks.
- The installer supports pinned-version upgrades while preserving configuration and runtime data. If Linux activation fails, it attempts to restore the previous version. Back up first and verify the service, models, files, and Connectors after every upgrade.

## Related Concepts

- [What is xAgent](/docs/getting-started/what-is-xagent)
- [How xAgent Isolates Multi-user Workspaces and Task Processes](/docs/guides/multi-user-workspace-isolation)
- [Model Notes](/docs/deployment/model-requirements)
- [Connectors](/docs/user-guide/connector)
- [What Is a Connector?](/docs/getting-started/what-is-connector#how-is-it-different-from-mcp)

## Next Steps

- [Start xAgent Installation](/docs/getting-started/install)
- [Complete Your First Task](/docs/getting-started/first-task)
- [Configure Approval Policies](/docs/user-guide/approval-policy)
