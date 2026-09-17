---
title: A2A Client and Remote Agents
description: Discover remote Agent Cards, configure user-level connections, send or cancel tasks, and inspect the inbox.
status: beta
updated: 2026-09-17
---

# A2A Client and Remote Agents

Since `v0.0.16.beta`, xAgent includes a user-level A2A Client. Open **Operations > A2A** to manage remote Agents and tasks. A2A is separate from locally installed AgentPlugins and does not add the remote Agent to your Workspace.

## Add a Remote Agent

1. Add a remote Agent in the A2A page, enter its Agent Card address, discover the Card, and check its name and capabilities.
2. Configure the remote service's API Key, Bearer, or existing OAuth bearer token as required and save the connection. Do not put credentials in Session messages or documentation.
3. A callable remote Agent needs a working connection, valid authentication, and available Enterprise license capacity.

The client supports A2A v1 JSON-RPC and HTTP+JSON. Available actions depend on the remote Card and service implementation.

## Tasks and Results

Select a remote Agent and send a task in the A2A page. You can inspect or refresh task status, reply when the remote Agent requests more input, or attempt to cancel a nonterminal task. Monitoring prefers streaming and falls back to polling when necessary; it resumes after a service restart.

Remote Messages, Artifacts, states, and errors enter an immutable inbox. Actionable or terminal results with an originating Session are also returned to that Session; inspect the task details for remote outcomes and failures. Administrators can review A2A usage and connection capacity separately from AgentPlugin Channel entitlements.

Related: [Agent Sessions](/docs/user-guide/agent-session) · [AgentPlugins](/docs/user-guide/connector) · [Changelog](/docs/changelog)
