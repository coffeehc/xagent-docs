---
title: Common Questions
description: Answers to common questions about xAgent installation, models, security, Skills, Connectors, architecture, maintenance, beta status, and editions.
status: stable
updated: 2026-07-28
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

The current version is `v0.0.5.beta`. It is a beta release for deployment trials, scenario validation, and community feedback. The interface, Connectors, and some experimental capabilities may still change.

### Where should I report issues?

Use the [Share an Idea](/docs/cooperation/idea) page to choose public feedback or email.

## Deployment

### Does xAgent provide an official SaaS?

No. There is currently no SaaS release plan. xAgent prefers users to deploy it in their own server and data environment, instead of storing task files, business data, and external system connections on an official platform.

### What database does xAgent use?

The current version uses embedded SQLite by default to reduce deployment difficulty. xAgent can be upgraded to PostgreSQL or other databases later when scale, concurrency, audit, or operations requirements increase.

### Is HTTPS built in?

No. xAgent does not provide built-in HTTPS. For public access, use Nginx, Caddy, or another reverse proxy with TLS, firewall, and access control.

### Does xAgent support Windows?

Windows is not recommended for deployment for now because its current sandbox support is not sufficient to provide safe and controllable execution of xAgent-managed scripts. Current target environments are macOS and Linux.

### How should I install or upgrade xAgent?

Use the official installer:

```bash
curl -fsSL https://downloads.xagent.xiagaogao.com/scripts/install.sh | bash
```

It detects the platform, verifies release packages, and supports pinned versions, unattended installation, and Connector selection. On Linux, failed activation attempts to restore the previous version. See [Start Installation](/docs/getting-started/install) for the complete flow.

## Models and Data

### What model should I use?

Choose a model with stable tool calling, long context, streaming output, and reliable reasoning. At least 64k context is recommended; 100k+ is better for long tasks and complex files.

### Can data be fully private?

If local models or self-hosted model services are used, task data can remain in your own environment. Actual privacy also depends on external connections, deployment method, access control, backup, and administrator configuration.

### Are keys sent to model providers?

Normally, no. xAgent tools reference keys through placeholders. Actual key values are replaced only during internal tool calls. Users should not write keys, tokens, or passwords in plain text inside task messages.

### Is ProcessSandbox the same as workspace isolation?

No. Workspace isolation determines which files a user and Session can see or modify. ProcessSandbox controls which files an external command mounts, which environment it receives, and its process-tree and resource limits.

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

## Questions Consolidated from Other Pages

The questions below were previously scattered across Getting Started, User Guide, Deployment, Architecture, Developer Guide, and Reference pages. They are collected here as the single FAQ source.

### Must I use Qwen3.6-27B?

No. It is only one model used in the current development environment.

### Can small models be used?

Yes. `Gemma4-12B` has been tested and can execute long tasks, but smaller models need more careful validation for complex reasoning, multi-tool planning, long context, and Skill creation.

### Is 64k context enough?

It can be a minimum starting point, but it is not enough for all tasks. xAgent's initial context may be near 20k, and task materials, tool results, session history, and user additions will continue to consume context.

### Why is tool calling required?

xAgent is built for task completion, not just chat. It needs tools to read files, write outputs, call MCP, use connectors, process triggers, and generate deliverables.

### Is a task always split into many steps?

No. Simple tasks are usually completed directly. xAgent only needs staged execution when the task has many files, many steps, external actions, or human confirmations.

### Is one user message the same as one task?

No. A user message may start a new task, add material, revise requirements, or confirm an action in an existing task.

### When should I start a new session?

Start a new session when the goal becomes a different piece of work, or when you do not want the previous context to affect the next task. If you are still refining the same result, stay in the same session.

### Where are task files stored?

Task files and outputs are centrally stored in the server workspace and isolated by user. Users can only see their own workspace and authorized files.

### Will keys be sent to model providers?

Normally, no. xAgent tool configuration uses key placeholders, and actual keys are only replaced during internal tool calls. Model providers do not need to see actual key values. Users should not write keys, tokens, or passwords in plain text inside task messages.

### Does xAgent have memory?

Yes. xAgent has basic memory capability. Memory is shared within a user's scope and is used to store preferences, long-term background, and repeatedly used information. Users can also extend their own memory system through MCP. Later, xAgent may open memory interfaces so third-party memory systems can connect directly.

### Does xAgent have a built-in knowledge base?

Not currently. Knowledge capabilities can be extended through Skill + MCP: Skills describe how to use knowledge and organize answers, while MCP connects external knowledge bases, retrieval services, or existing team data systems.

### Where do session events come from?

Session events can come from external APIs, triggers, connectors, or other sessions. xAgent delivers events to the corresponding agent session through its internal event queue.

### What is a connector?

A Connector brings WeChat, Telegram, Feishu, browsers, enterprise systems, or third-party services into xAgent. It can carry bidirectional messages and file references, provide external tools, manage authorization state, and deliver external events to Agent Sessions. Users complete authorization and use the connection; administrators prepare Connectors and safety policies.

### Can sessions communicate with each other?

Yes, but only between sessions under the same user. xAgent uses session events for session-to-session communication. The current version has two event types: notification and assistance. Notifications are only displayed in the UI and do not enter model context. Assistance enters model context and activates an assistance task. Cross-user session communication is not supported because it introduces safety risks.

### Is xAgent a single dedicated agent?

No. xAgent can host multiple dedicated agent entry points. Administrators can prepare different agents, Skills, tools, external connections, and safety policies for different work scenarios. Ordinary users enter the corresponding entry point and use it directly.

### Can xAgent help me build a new dedicated agent?

Yes. Usually you first define the task scenario, then prepare a dedicated agent entry point, Skills, tools, external connections, and approval policies. If you only need to capture a fixed work method, you can first let xAgent help generate a Skill draft, then test, optimize, and publish it.

### Does every session need to preload all Skills and Tools?

No. xAgent sessions have core capabilities for discovering and loading Skills and Tools by default. During task execution, if the current capability is not enough, xAgent will try to find and load suitable Skills or Tools. This saves context and lets the agent extend itself based on task needs.

### Will xAgent automatically self-evolve?

Not by default. xAgent can continuously optimize a specific Skill through prompts or self-evolution Skills, but this requires clear goals, test cases, acceptance criteria, and release flow. Self-evolution is valuable but risky, so xAgent treats it with restraint.

### Does binary release limit configuration freedom?

No. Although xAgent is released as a binary, models, prompts, Skills, tools, external connections, and approval policies can be maintained in the system. Many settings do not require a service restart or a new session. A running execution round keeps its current configuration, while later work uses the saved changes.

### Do ordinary users need to configure tools and Skills themselves?

Usually not. Administrators can prepare common scenarios, dedicated agents, tools, Skills, and external connections first. Ordinary users then use them directly in sessions.

### What does the free binary version mean?

The free binary version is currently the `v0.0.5.beta` beta release and is an entry point for understanding and evaluating xAgent. Users can deploy the standard version first and experience core capabilities such as task submission, file workspace, tools, Skills, and external connections.

If enterprise internal system access, unified identity, complex permissions, audit and compliance, dedicated connectors, or deep business process changes are required, custom integration should usually be done based on actual needs.

### Will xAgent provide an official SaaS?

There is currently no SaaS release plan. xAgent does not want users to store their task files, business data, and external system connections on an official platform. In self-deployment, data security, backup, permissions, and confidentiality are the deployment owner's responsibility.

### Is xAgent suitable for large enterprise platforms?

xAgent can serve as a foundation for an enterprise AI work portal and business AI entry point, covering unified task entry, file workspace, tool calling, Skill capture, and external system connections.

For large companies or complex organizations, xAgent usually needs custom integration with existing enterprise systems, such as unified identity, permission systems, internal business system connections, audit requirements, data boundaries, safety policies, model gateways, and dedicated external connections. This is not a simple install-and-cover-all-enterprise-processes scenario. It is better understood as using xAgent as a base and gradually connecting and extending it according to existing enterprise infrastructure.

### Can xAgent replace all business systems?

No. xAgent organizes task entry points and capability calls. Permissions, login state, business data, and audit rules for external systems should still be managed by the corresponding system or external connection.

### Will this documentation include technical implementation details?

The main line is the user manual. Ordinary users should first read Getting Started and User Manual pages. Technical materials are only supplementary for maintenance and customization.

### What is the difference between an Agent and a Skill?

An Agent is a work entry point; a Skill is a method for completing a type of task. One Agent can associate multiple Skills.

### Do ordinary users need to create Agents?

Usually not. Once administrators prepare public entry points, ordinary users can use them directly. Users who are familiar with a recurring workflow can also create or adjust an Agent in their personal scope.

### Why can I only see public Agents?

Your account may not yet have personal Agents, or your permissions may only allow viewing public entries. Use what the page shows as the source of truth.

### Will approvals block every dangerous action?

Approvals reduce risk, but they do not replace account permissions, external system permissions, or administrator management. Sensitive connections should still follow least-privilege configuration.

### Why does the same action sometimes require approval and sometimes not?

It may match a different resource scope, session type, or personal rule. The effective result is calculated from the current tool arguments together with the personal and system policies.

### Does approval block the whole task before it starts?

No. A task starts normally. Only a specific tool operation that matches a policy pauses for approval.

### Can I approve from WeChat or Telegram?

Yes. Starting with `v0.0.4.beta`, when a session waits for approval, xAgent attempts to notify every currently available IM messaging channel owned by the user. The Connector must be online, the user must be authenticated, and the connection must provide an available message-send Tool. Reply with the notification's `@{approval:id}` and explicit approve or reject form.

### Can ordinary users edit system approval policies?

Usually not. Ordinary users may only configure personal approval policies, while administrators maintain system-wide policies.

### What is the difference between My connections and Connectors?

My connections binds the current user's external accounts. The administrator Connectors page maintains system-level Connector services.

### Are Connector tools automatically available to every user?

No. Availability depends on Connector health, user authentication, connection state, tool governance, and approval policies.

### Why can I receive a message but not reply?

Check Connector health, user authentication, and platform permissions. WeChat also requires a valid recipient context; sends are blocked after its `context_token` expires.

### Will xAgent split a long-running task automatically?

Not always. Ask it to list a plan and wait for confirmation before continuing when you need more control over the process.

### Where can I see long-running task status?

Start with the original [Agent Session](/docs/user-guide/agent-session). Generated files are usually available in [Workspace Files](/docs/user-guide/workspace).

### Can I change direction midway through?

Yes. State which results to keep and which to discard. For example: “Keep the topic categories, but change the report structure to an executive briefing.”

### Does switching models immediately affect a running execution loop?

No. A running model-and-tool loop keeps its selected model. The new configuration is read by a later execution round. You do not need to create a new session, and existing history and files remain available.

### Why are there no command examples?

Ordinary users submit long-running tasks through the web interface. Underlying APIs and internal organization are not the main focus of this user manual.

### Why do I see fewer menus than another user?

First check whether an administrator enabled advanced features for your account. Simple mode hides Session list, Triggers, Agents, Skills, Tools, MCP, and Personal approval policy. Administrator menus also require the administrator role.

### Where should I start?

Start with **Agent sessions** and state the goal, materials, constraints, and expected deliverable. Use **Workspace files** for files and **My connections** to bind messaging channels.

### Where are theme and display density settings?

Open **Account management** and use the interface settings to select light, dark, or system theme and adjust display density. They are no longer separate sidebar entries.

### Do ordinary users need to configure models themselves?

Usually not. Once an administrator configures them, ordinary users can use them directly in a session.

When unified model management and task routing mature, ordinary users will notice model selection even less and will only need to state their task goal.

### Does a successful connection test mean every task will work?

No. It only confirms that the model service is available. Successful task completion also depends on capability switches, Tools, Skills, external connections, and approval policies.

### Why switch models in a session?

Different models suit different tasks. Some are better at fast summaries, some at complex reasoning, and some at Tool collaboration. Switching models does not mean restarting the entire session.

### Can screenshots include a Base URL and API Key?

They should not. Screenshots in public documentation or public channels should obscure internal addresses, keys, and accounts.

### Should every repeated task become a Skill?

Not immediately. First run it in Agent Session. If the workflow repeats and the result format becomes stable, then turn it into a Skill.

### Can I update a published Skill?

Yes. Updates should be drafted and tested first. For public Skills, follow the review process again when necessary.

### Can other users see my personal Skills?

No. Personal Skills are scoped to the current user.

### Can public Skills contain private business instructions?

They should not. Public Skills are visible to all users and should be general, safe, and reusable.

### Must a task be completed in one go?

No. Complex tasks can move forward in stages. You can ask xAgent to show a plan first and execute after confirmation.

### Is a task the same as a Tool call?

No. Tools are only a means to complete a task. Ordinary users do not need to specify Tool names; state the action you want completed.

### When should I split a task?

Split it when there is a lot of material, complex steps, a need to wait for an external result, or multiple confirmations.

### Can xAgent save results automatically?

Yes. State the format explicitly, such as “save as a Markdown / CSV / HTML report.”

### Does a Trigger wait until the task finishes?

No. A Trigger starts the task. The execution progress and results remain in the session.

### Why did a Trigger not run?

Possible reasons include: it is disabled, the scheduled time has not arrived, an external connection is unavailable, the task was blocked by an approval policy, or the configuration did not save successfully.

### Can a scheduled task send messages directly?

Whether it can send depends on Tools, connections, and approval policies. By default, generate a draft first and send only after confirmation.

### When should I delete a Trigger?

Delete it only when it is no longer needed and will not be reused. Disable it first when you only need to pause the task.

### Is the workspace the same as any local directory on my computer?

No. A workspace has explicit visibility and permission boundaries. Users can only see files in their authorized scope.

### Are uploaded files processed automatically?

Not necessarily. Uploading only provides the material. You still need to say “read this file” or “analyze this spreadsheet” in a task.

### Why can I not find a generated file?

The task may have only returned the result in the session without saving a file. Ask it to “save the result as a Markdown file,” for example.

### Can I send a workspace file to an external system?

Yes, but it usually needs a Tool, a connection, and approval. Check that the content is appropriate before sending it.


## Related Docs

- [What is xAgent](/docs/getting-started/what-is-xagent)
- [Start Installation](/docs/getting-started/install)
- [Model Notes](/docs/deployment/model-requirements)
- [Connectors](/docs/user-guide/connector)
