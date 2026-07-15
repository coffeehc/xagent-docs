---
title: Common Questions
description: Answers to common questions about xAgent installation, models, security, Skills, Connectors, beta status, and free versus commercial editions.
status: stable
updated: 2026-07-15
---

# Common Questions

## Who This Is For

This page is for all xAgent documentation readers.

## Basic Usage

### Which pages should I read first?

Start with [What is xAgent](/docs/getting-started/what-is-xagent) and [Feature and Menu Overview](/docs/user-guide/menu-overview). Then read [First Task](/docs/getting-started/first-task) or [Agent Session](/docs/user-guide/agent-session).

### Do ordinary users need to understand AI technology?

No. Ordinary users only need to describe goals, provide materials, confirm necessary actions, and review results. Models, protocols, implementation, and extension details are handled by administrators or maintainers.

### Is xAgent a chatbot?

No. Chat is only one interaction form. xAgent is built for task completion: reading materials, generating files, calling tools, waiting for confirmation, connecting external systems, and archiving results.

### Does xAgent need to be installed on every computer?

No. xAgent runs on the server. Users access it through the web UI or IM connectors. Tasks continue on the server and do not depend on a user's personal computer staying online.

### Is the current release stable?

The current version is `v0.0.4.beta`. It is a beta release for deployment trials, scenario validation, and community feedback. Some features are incomplete or may change.

### Where should I report issues?

Use the documentation issue tracker:

[https://github.com/coffeehc/xagent-docs/issues](https://github.com/coffeehc/xagent-docs/issues)

## Deployment

### Does xAgent provide an official SaaS?

No. There is currently no SaaS release plan. xAgent prefers users to deploy it in their own server and data environment, instead of storing task files, business data, and external system connections on an official platform.

### What database does xAgent use?

The current version uses embedded SQLite by default to reduce deployment difficulty. xAgent can be upgraded to PostgreSQL or other databases later when scale, concurrency, audit, or operations requirements increase.

### Is HTTPS built in?

No. xAgent does not provide built-in HTTPS. For public access, use Nginx, Caddy, or another reverse proxy with TLS, firewall, and access control.

### Does xAgent support Windows?

Windows has not been tested and is not recommended for deployment trials. Current target environments are macOS and Linux.

## Models and Data

### What model should I use?

Choose a model with stable tool calling, long context, streaming output, and reliable reasoning. At least 64k context is recommended; 100k+ is better for long tasks and complex files.

### Can data be fully private?

If local models or self-hosted model services are used, task data can remain in your own environment. Actual privacy also depends on external connections, deployment method, access control, backup, and administrator configuration.

### Are keys sent to model providers?

Normally, no. xAgent tools reference keys through placeholders. Actual key values are replaced only during internal tool calls. Users should not write keys, tokens, or passwords in plain text inside task messages.

## Skills, Tools, and Connectors

### What is a Skill?

A Skill is a reusable work method. It describes when to use it, what input is needed, what steps should be followed, what output should be produced, and what should not be done.

### What is a Tool?

A Tool performs a concrete action, such as reading a file, generating a report, fetching a web page, calling MCP, sending a message, or using a connector.

### What is a Connector?

A Connector brings external entry points such as WeChat, email, enterprise systems, or third-party services into xAgent. It can receive external messages, manage authorization state, provide tools, and deliver events into sessions.

### What is the difference between Connector and MCP?

Connectors can actively push messages or events into xAgent. MCP usually provides callable external tools that xAgent invokes during a task.

### Are public Skills visible to everyone?

Yes. Public Skills are visible to all users. xAgent currently does not provide complex access control for public Skills. Skills with private requirements or sensitive business details should stay in the personal Skill library.

## Edition and Commercial Questions

### What is the difference between the free version and commercial version?

The commercial version and free version are intended to keep the same feature set. The current difference is mainly user count limits. For small teams or home deployment, the free binary beta should have a low entry barrier.

### Is xAgent open source?

The current release is a free binary release, not a source-code open-source release. xAgent keeps an open attitude toward future open source, but that decision depends on product maturity, community participation, security boundaries, and commercial sustainability.

### Is xAgent suitable for large enterprises?

xAgent can be used as a foundation for enterprise AI work portals, but large companies usually need custom integration for identity, internal systems, authorization, audit, data boundaries, model gateways, and dedicated connectors.

## Related Docs

- [What is xAgent](/docs/getting-started/what-is-xagent)
- [Server Installation](/docs/deployment/server-install)
- [Model Notes](/docs/deployment/model-requirements)
- [Connectors](/docs/user-guide/connector)
