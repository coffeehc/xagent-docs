---
title: What is xAgent
status: stable
updated: 2026-07-07
---

# What is xAgent

## Who This Is For

This page is for first-time users, administrators, and evaluators who want to understand xAgent.

## What It Is

xAgent is a multi-user AI work portal for teams and companies. It brings common work entry points, files, tools, Skills, external connections, and safety policies into one web system, so a team can quickly build dedicated work assistants that users can use directly.

The current version is `v0.0.1.beta` and is still a beta release. It is suitable for deployment trials, feature validation, scenario evaluation, and community feedback. It should not be treated as a fully stable enterprise release.

Important note: many beta features are still incomplete. If you find a problem while using xAgent or reading the documentation, please open an issue on GitHub: [https://github.com/coffeehc/xagent-docs/issues](https://github.com/coffeehc/xagent-docs/issues).

In daily use, users describe goals, upload materials, confirm risky actions, and review results through the web interface. Administrators prepare common scenarios, models, tools, Skills, external connections, and safety policies in advance, reducing the configuration burden for ordinary users.

xAgent is built for task completion. It is not a command-line project, and it is not just a chat interface. It can certainly be used as a chat tool or companion, but its core personality is closer to a serious work assistant: it understands goals, processes materials, calls capabilities, saves outputs, and asks for confirmation when needed. If you only want a relaxed chat companion, xAgent may not be the most charming choice.

Ordinary users should start from functional entry points such as Agent Session, Tasks, Files, Tools, Skills, and external connections.

## Server-side Deployment

xAgent is deployed on a server, not installed on every user's personal computer. Users access it through the web UI, and can also use extended connectors to connect WeChat, email, enterprise systems, or other entry points for task submission.

Deployment only requires running one binary file. On Linux, registering it as a `systemd` service is recommended for startup, background execution, and log management. The current target environments are mainly macOS and Linux. Windows has not been tested and is not recommended.

This approach brings several direct benefits:

- You do not need to install an agent on every computer. Tasks run on the server, so the user's computer does not need to stay powered on during execution.
- Users can work through the web UI, or remotely submit tasks through IM tools such as WeChat.
- Task files are centrally stored on the server and physically isolated by user. Users can only see their own workspace and files within their authorized scope.
- If a team uses local models or self-hosted model services, task data can remain in the team's own environment, improving data privacy.

## Safety Governance

xAgent is designed for multi-user task execution, so safety governance is not only about protecting a key. It also covers files, keys, tool actions, external connections, and session boundaries.

The current version focuses on several boundaries:

- Workspace isolation: task files are centrally stored on the server and isolated by user. Users can only see their own workspace and authorized files, and cannot directly browse another user's task files.
- Key isolation: xAgent manages keys independently. Users and administrators can save keys required by external systems, model services, or tools. Tools reference keys through placeholders in configuration and calls.
- Keys are not sent to models: only when xAgent internally calls a tool will the system replace a placeholder with the actual key value. The model only needs to see the task goal, tool description, and required parameters. Users should not write keys in plain text inside task messages or prompts.
- Approval for sensitive actions: actions such as sending messages, deleting or overwriting files, calling external systems, or accessing sensitive data can require human confirmation through approval policies, or be rejected by administrators.
- External connection boundaries: connectors and MCP can connect WeChat, email, enterprise systems, or third-party services, but account permissions, login state, and data permissions should still be controlled by the corresponding external system. xAgent should not replace an external system's permission model.
- Session communication boundaries: sessions under the same user can collaborate through session events, but cross-user session communication is not supported in the current version. This avoids carrying one user's context, files, or task state into another user's scope.
- Private deployment: xAgent currently has no SaaS release plan. It is recommended to deploy xAgent in the user's own server and data environment. When paired with local models or self-hosted model services, it can further reduce the chance that business data leaves the team environment.

These capabilities do not replace internal account management, backup, audit, compliance, or least-privilege configuration. xAgent's goal is to narrow common risk entry points during agent task execution, so users and administrators can see, control, and approve them.

## User Model

xAgent currently uses a flat user model. Users inside the system do not have manager-subordinate relationships, and xAgent does not implement enterprise processes such as who reports to whom or who approves whose work.

This is intentional. xAgent is positioned as an AI assistant base, not an OA, ERP, CRM, or enterprise permission center. Putting complex organization permissions inside the agent base is not appropriate. More importantly, data permissions should not be delegated to a large model. A model can help understand tasks, organize materials, and call capabilities, but it should not decide whether a user is allowed to access a piece of business data.

xAgent manages its own boundaries, such as user workspace isolation, session scope, key references, tool availability, and approval for sensitive actions. Permissions for external business systems should be controlled by those systems:

- When xAgent calls an external system through MCP, access scope is decided by the system, account, and authorization behind that MCP.
- When xAgent connects WeChat, email, enterprise systems, or third-party services through connectors, login state, account permissions, and data scope are decided by the connector and target system.
- If an enterprise already has unified identity, roles, departments, data permissions, and audit systems, they should be connected through custom integration or connectors instead of being reimplemented inside xAgent.

In short: xAgent manages its own task-execution boundary. Business data belongs to whichever system owns it, and that system should handle authorization and audit.

## What Makes It Different

Many agent products are a chat entry point or a dedicated assistant designed around one fixed scenario. xAgent is closer to an agent base portal. It does not only provide one fixed assistant; it lets a team organize multiple dedicated work entry points in the same system. Ordinary users can directly use prepared entries, and after they become familiar with the system, they can fine-tune their own Skills, tools, connections, and agent configuration within their own scope.

| Area | Typical Chat Assistant | Single Dedicated Agent | xAgent |
| --- | --- | --- | --- |
| Main goal | Answer questions, chat, or generate content | Solve one fixed scenario | Organize multiple usable, manageable, and extensible work assistants around tasks |
| Usage | Users talk directly | Users enter a fixed scenario | Administrators prepare capabilities, users use task entry points directly |
| Extension | Depends on built-in product capabilities | Usually customized around one business scenario | Extends through Skills, tools, MCP, connectors, and approval policies |
| Output | Mostly text responses | Depends on the dedicated scenario | Responses, files, reports, external actions, long-running tasks, and workspace outputs |
| Safety governance | Often weak or hidden | Handled per scenario | Users, sessions, workspaces, tools, and sensitive actions all have boundaries |

Therefore, xAgent is not about asking users to configure every conversation from scratch. It lets teams prepare common capabilities first, then turn recurring work into dedicated agents that can be reused directly.

## How to Implement Other Agent Functions

If you want to implement a new agent capability in xAgent, you usually do not need to develop a whole new system. You can follow this path:

1. Define what the agent needs to accomplish, such as contract review, customer reply, data analysis, investment research, or internal knowledge Q&A.
2. Create or select a dedicated agent entry point, so users know where to start.
3. Turn stable processing methods into Skills, so similar tasks do not need to be explained from scratch each time.
4. If the task needs concrete actions, enable the corresponding tools, such as file reading and writing, table processing, web access, or message sending.
5. If the task needs external systems, configure connectors or MCP.
6. If deletion, sending, external requests, or sensitive data are involved, configure approval policies.
7. If enterprise internal systems, unified identity, or dedicated processes need to be connected, add custom development and integration.

xAgent can also help produce Skills. Users can provide a manual process, historical tasks, or existing instructions to xAgent and let it organize them into a Skill draft, then test, optimize, and publish it. For stable high-frequency work, xAgent can work with dedicated Skills to continuously generate test cases, check execution quality, revise instructions, and publish new versions, making the Skill gradually more useful.

## Skills and Tools

As of July 7, 2026, the current version includes about 49 built-in Skills, covering common work scenarios such as report generation, research, document understanding, writing and editing, contracts and compliance, financial analysis, customer support, sales operations, project management, recruiting and training, personal productivity, and Skill creation. Built-in Skills may continue to increase during later audits and iterations.

As of July 7, 2026, the current version includes about 79 built-in Tool IDs, covering capabilities such as session collaboration, task planning, file reading and writing, Excel, PDF, SQLite, web fetching, HTTP requests, email, triggers, and dynamic Skill/Tool discovery and loading. Some of them are system-internal or on-demand tools. The number ordinary users actually see depends on account permissions, external connections, MCP configuration, and administrator policies. Built-in Tools may also continue to increase during later audits and iterations.

## Connectors

Connectors are used to bring WeChat, email, enterprise systems, third-party services, or other external entry points into xAgent. A connector is not just an interface configuration. It delivers messages, account state, executable actions, and event entry points from external systems into xAgent in a manageable way.

Common connector uses include:

- Receiving external messages, such as WeChat messages, emails, or enterprise system notifications.
- Converting external messages into session events and sending them to the corresponding agent session.
- Providing external-system tools, such as reading messages, querying data, sending replies, or updating status.
- Managing external authorization, so users connect external services through their own accounts.
- Working with approval policies to control sensitive actions, such as sending messages, modifying external data, or calling internal systems.

Connectors and MCP can both extend xAgent's external capabilities, but they focus on different things:

| Area | Connector | MCP |
| --- | --- | --- |
| Main role | Connect external systems, accounts, messages, and event entry points | Provide callable external tools or service capabilities |
| Can actively push | Yes. A connector can actively send messages or events to xAgent | Usually called by xAgent on demand during a task |
| Typical scenario | After WeChat receives a message, the connector receives it and actively pushes it to xAgent | When xAgent needs to query data, call a tool, or access external capabilities |
| User perception | More like "connecting an external entry point" | More like "adding a set of available tools to xAgent" |

In simple terms, MCP is more like "xAgent calls capabilities when needed", while a connector can "push a task into xAgent when an external system has a message".

Ordinary users usually only need to complete authorization in "My Connections", then describe what to process in Agent Session. Administrators prepare connectors, available capabilities, and safety policies.

## Dynamic Capabilities

Every xAgent session has dynamic discovery and loading capabilities. When a session starts, the system loads a small set of core tools by default, such as `skill_find`, `skill_load`, `tool_find`, and `tool_load`. These tools do not put all Skills and Tools into the context at once. Instead, they let the agent find and load capabilities on demand during task execution.

When the task reaches a step where the current context lacks a suitable Skill or Tool, the corresponding prompt guides the agent to search for available capabilities first, load what is needed, and then continue. For example, when a user asks xAgent to analyze a table, generate a report, or connect an external system, xAgent can discover and load the needed capability if it has not been loaded into the current session yet.

This design has two goals:

- Save context: a session does not need to carry all Skills and Tools from the beginning. It only loads what the current task actually needs.
- Automatically extend capability: when the agent encounters a new requirement, it can actively supplement the required Skill or Tool to complete the task better.

Ordinary users do not need to remember these tool names. They only need to describe the task goal, and xAgent will try to discover and load suitable capabilities during execution.

## Session Event Bus and Session Communication

xAgent includes a session event queue. External APIs, triggers, connectors, and other sessions can initiate session events, and those events are delivered through the queue to the corresponding agent session.

xAgent supports communication between sessions under the same user. Sessions do not directly share their full context. Instead, they pass information through session events. The current version provides two event types: notification and assistance.

| Event | Purpose | Enters model context |
| --- | --- | --- |
| Notification | Show another session's new status, result, or information in the UI | No |
| Assistance | Ask another session to participate in a task and activate an assistance task | Yes |

Notification events are only displayed in the UI, so users can see state changes between sessions. Assistance events enter the model context and trigger the corresponding assistance task. They are suitable for complex work where different sessions need to cooperate.

Session events are not only for collaboration between sessions. They can also act as a unified entry point for external tasks entering xAgent. For example, a trigger can send a task event at a scheduled time, a connector can convert an external message into a session event, and an external API can deliver a business-system task to a specified session.

Currently, all sessions under a single user can communicate with each other, but cross-user session communication is not supported. Cross-user communication introduces risks such as permission leakage, data exposure, and context contamination, so xAgent keeps this capability constrained.

## Self-evolution Capability

xAgent has self-evolution capability, but it is not enabled by default. A team can use explicit prompts, or a dedicated self-evolution Skill, to let xAgent continuously optimize, test, and publish a certain type of Skill.

This must be used with restraint. Given the current execution logic of large models, self-evolution is a double-edged sword. If the goal, evaluation criteria, and test cases are correct, it may keep improving in the right direction. If the initial direction is wrong, or the evaluation criteria are unclear, it may go further and further down the wrong path.

Therefore, xAgent recommends using self-evolution for Skill improvement with clear boundaries, testability, and rollback, rather than letting the system modify all of its behavior without constraints. Users and administrators who need fine-grained capability tuning should define goals, examples, acceptance criteria, and release flow before involving self-evolution.

## Openness and Hot Switching

xAgent is currently released as a binary, but it keeps an open attitude toward users. Within their permissions, users can adjust prompts, Skills, tools, external connections, and approval policies. Administrators can maintain models and system-level configuration without redeploying the service every time configuration changes.

Most settings support hot switching. During task execution, you can also switch prompts, Skills, or models according to the actual situation. For example, the first half of a task can use a model better suited for organizing materials, and the second half can switch to a model better suited for writing reports. If the current Skill is not suitable, you can adjust or replace the Skill and continue the task.

This freedom is not meant to shift configuration burden to ordinary users. The goal is for most users to directly use prepared capabilities, while experienced users can fine-tune personal capabilities and administrators can turn stable results into team-ready configuration.

## Task Tuning

"Tuning" here does not mean training a model. It means adjusting the current task's goal, context, and available capabilities during execution, so the task can reach the best possible result.

Ordinary users can directly use agents, Skills, Tools, connectors, and model configuration prepared by administrators. They do not need to understand low-level details. After users become familiar with the system, they can make more precise adjustments around the current task:

- Add or narrow task goals, background materials, and acceptance criteria.
- Switch or load more suitable Skill, Tool, or connector capabilities for the current task.
- Adjust the current session prompt or agent entry point, making execution better match the task.
- Switch models during the task to use different models' strengths in reading, reasoning, writing, and tool calling.
- Add required keys, MCP, connector authorization, or personal approval rules so the task can continue.
- Turn effective adjustments into personal Skills, personal agents, or team shared configuration, reducing repeated debugging next time.

Therefore, xAgent usage is not about freezing all configuration once. Ordinary users can use existing capabilities without thinking about configuration, while advanced users can gradually tune during task execution and push the current task toward a better completion state.

## Release Positioning

The current version is the `v0.0.1.beta` beta release and is distributed as a free binary. The goal is to let users deploy it, enter the product, experience the core flow, and judge whether xAgent fits their agent work scenarios.

The free binary beta is suitable for understanding standard capabilities, validating common task flows, and evaluating team adoption. It is not the same as a stable enterprise release, free enterprise customization, free hosted service, free internal system integration, or long-term support commitment. When enterprise-grade identity, internal system connection, permission audit, dedicated external connections, and safety policies are involved, custom development and integration are usually needed based on the actual environment.

xAgent currently has no SaaS release plan. xAgent prefers users to deploy the system in their own server and data environment, rather than storing task files, business data, and external system connections on an official platform. After self-deployment, data storage, access control, backup, audit, and confidentiality responsibilities belong to the deployment owner. The official project does not take responsibility for hosting or protecting user business data.

## Database

The current version uses an embedded SQLite database by default. xAgent is intended for team and company self-deployment. Requiring PostgreSQL or other larger databases by default would significantly increase deployment, maintenance, and troubleshooting difficulty.

Therefore, the current version prioritizes SQLite to lower the entry barrier, so users can deploy and try the product faster. xAgent has the ability to upgrade to PostgreSQL or other databases later, when scale, concurrency, audit, or operations requirements make that necessary.

## How to Use

The recommended usage pattern is: administrators prepare capabilities, users use them directly, and stable workflows are then turned into reusable assets.

- Administrators prepare users, models, common work entries, Skills, tools, external connections, and safety policies.
- Ordinary users enter Agent Session, describe the work to complete, and can also directly use Skills, Tools, connectors, triggers, and agent configuration. Most of the time, no configuration is needed. After becoming familiar with the system, users can save stable flows as Skills or tune personal entries to reduce repeated explanation and manual setup.

This pattern is suitable for multiple people sharing the same base capabilities. Ordinary users do not need to understand model parameters, tool lists, or low-level protocols. They only need to describe task goals and delivery requirements.

## When to Use

Consider using xAgent when a task has any of these characteristics:

- It requires multi-turn communication and continuous context.
- It needs to read, generate, or organize files.
- It needs to call tools, APIs, or external systems.
- It needs to save intermediate and final outputs into a workspace.
- It needs to keep preferences, decisions, or project background over time.
- It needs to move through complex work in stages.
- You want administrators to configure base capabilities once and let multiple users reuse them directly.
- You want model capability, safety policies, file isolation, and external system connections managed from one entry point.

## Capability Highlights

- Dedicated work assistants: prepare different entry points by scenario, and users describe tasks directly after entering.
- File workspace: upload materials, save intermediate results, preview reports, and download deliverables.
- Tools and Skills: tools perform concrete actions, while Skills capture reusable task methods.
- Skill production: xAgent can help organize, test, optimize, and publish Skills, letting teams turn stable workflows into reusable capabilities.
- Dynamic capabilities: sessions can discover and load Skills and Tools on demand, reducing context usage and automatically filling capability gaps during tasks.
- Connectors: connect WeChat, email, enterprise systems, or third-party services, so external messages, account state, and executable actions can enter sessions.
- Server-side execution: tasks run on the server, so user computers do not need to stay online, and remote entry points can also submit tasks.
- Centralized storage: task files and outputs are centrally stored in the server workspace and isolated by user.
- Multi-user safety: users, sessions, workspaces, and tool actions have clear boundaries, and sensitive actions can be controlled through policies and approval.
- Key isolation: tools use key placeholders, and actual keys are only replaced during internal tool calls, not directly handed to models.
- Basic memory: xAgent has basic memory capability. Memory is shared within a user's scope and can retain preferences, background, and long-term task information.
- Knowledge capability extension: the current version has no built-in knowledge base, but external knowledge, retrieval services, or existing team knowledge systems can be connected through Skill + MCP.
- Session event bus: external APIs, triggers, connectors, and sessions can initiate session events, which are delivered through the queue to target agent sessions.
- Long-running task support: suitable for tasks that need continuous progress, staged execution, confirmations, or output archiving.
- Model selection: sessions can adjust model configuration based on task needs without restarting the whole work because of a model change.
- Task tuning: prompts, Skills, Tools, models, and context can be adjusted during a task to make the current task reach a better completion state.
- Private models: with local models or self-hosted model services, data can remain in the team's own environment.
- Restrained self-evolution: specific capabilities can be continuously improved through prompts or self-evolution Skills, but this should stay within clear boundaries and test workflows.

## Notes for Administrators and Maintainers

Ordinary users do not need to understand the technical implementation. Administrators and maintainers only need to know these points first:

- xAgent is developed in Go and runs on the server.
- Users access xAgent through the web UI or IM connectors, and do not need to install a separate agent on every personal computer.
- The current version uses embedded SQLite by default to reduce deployment difficulty. It can later be upgraded to PostgreSQL or other databases as needed.
- External capabilities can be connected through MCP or connectors.
- xAgent provides workspace isolation above the underlying file system. Users can only see files within their authorized scope.
- Task files and outputs are centrally stored on the server, and can be paired with local models or self-hosted model services to improve data privacy.
- xAgent has basic memory capability, shared within the user's scope. Users can also extend their own memory system through MCP.
- The current version has no built-in knowledge base. Knowledge capabilities can be connected through Skill + MCP to external knowledge bases, retrieval systems, or existing team data systems.
- Session events are delivered to target agent sessions through an internal queue. The current version supports notifications and assistance. For safety reasons, cross-user session communication is not supported.
- Keys are independently managed by xAgent. Tools reference keys through placeholders, and actual values are only replaced during internal tool calls.
- Skills can be managed, edited, and loaded inside the system to capture stable task methods.
- Sessions have Skill and Tool discovery and loading capabilities by default, allowing task execution capability to expand on demand while saving context.
- Prompts, Skills, models, and other settings can be hot-switched, making it easier to adjust strategy during task execution.
- Skills can be produced, tested, optimized, and published with xAgent's assistance, but self-evolution flows should have clear goals, acceptance criteria, and rollback.

## Roadmap

xAgent will continue evolving around task completion capabilities. Priorities will be adjusted based on community feedback. Current directions include:

- Project-based agent Team features: future versions will develop project-oriented agent team collaboration. The current version can also achieve similar effects through workarounds, such as letting one session monitor or assist another session.
- Small brain capability: a small model will be integrated later, focusing on summarization, routing, intent pre-understanding, OCR, vectorization, and related processing. The main goals are to reduce context usage, continuously monitor session execution stability, and improve task completion.
- Memory enhancement: the existing basic memory capability will continue to be strengthened. The exact form will be decided based on community feedback.
- Knowledge base development: more direct knowledge base capabilities will be developed later. Before that, external knowledge bases or retrieval systems can be connected through Skill + MCP.
- Ecosystem development: more connectors, MCP integrations, and scenario capabilities will be added, such as video generation frameworks and Feishu, so xAgent can connect more real work entry points and production tools.
- Other directions: continue adjusting based on real usage scenarios and community feedback.

## Basic Usage

Start with this path:

1. If the service is not deployed yet, read [Server Installation](/docs/deployment/server-install) first and prepare the xAgent service and basic dependencies.
2. Read [Feature and Menu Overview](/docs/user-guide/menu-overview) to understand the main capabilities and console entry points.
3. Use the left menu to find the page you need.
4. If you are an ordinary user, go directly to Agent Session and describe the work to complete.
5. If you are an administrator, prepare common tools, Skills, external connections, and safety policies first.
6. If you have a fixed recurring process, read [Create / Update Skill](/docs/getting-started/create-skill), save that process, and keep improving it.

## FAQ

### Is xAgent a chatbot?

No. Chat is only one entry point. xAgent cares more about completing tasks: reading materials, generating files, waiting for confirmation, connecting external systems, and archiving results. It can chat, but the product goal is not companionship. The goal is work completion.

### Does xAgent need to be installed on every computer?

No. xAgent is deployed on the server, and users access it through the web UI or extended connectors. During task execution, the user's computer does not need to stay powered on. Users can also remotely submit tasks through IM entry points such as WeChat.

### Where are task files stored?

Task files and outputs are centrally stored in the server workspace and isolated by user. Users can only see their own workspace and authorized files.

### Can data be fully private?

If local models or self-hosted model services are used, task data can remain in the team's own environment. Whether full privacy is achieved also depends on the model, external connections, deployment method, and administrator configuration.

### Will keys be sent to model providers?

Normally, no. xAgent tool configuration uses key placeholders, and actual keys are only replaced during internal tool calls. Model providers do not need to see actual key values. Users should not write keys, tokens, or passwords in plain text inside task messages.

### Does xAgent have memory?

Yes. xAgent has basic memory capability. Memory is shared within a user's scope and is used to store preferences, long-term background, and repeatedly used information. Users can also extend their own memory system through MCP. Later, xAgent may open memory interfaces so third-party memory systems can connect directly.

### Does xAgent have a built-in knowledge base?

Not currently. Knowledge capabilities can be extended through Skill + MCP: Skills describe how to use knowledge and organize answers, while MCP connects external knowledge bases, retrieval services, or existing team data systems.

### Where do session events come from?

Session events can come from external APIs, triggers, connectors, or other sessions. xAgent delivers events to the corresponding agent session through its internal event queue.

### What is a connector?

A connector brings WeChat, email, enterprise systems, or third-party services into xAgent. It can receive external messages, provide external tools, manage authorization state, and deliver external events to agent sessions. Ordinary users mainly complete authorization and use the connection. Administrators prepare connectors and safety policies.

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

No. Although xAgent is released as a binary, models, prompts, Skills, tools, external connections, and approval policies can be maintained in the system. Many settings support hot switching, and prompts, Skills, or models can also be adjusted during task execution.

### Do ordinary users need to configure tools and Skills themselves?

Usually not. Administrators can prepare common scenarios, dedicated agents, tools, Skills, and external connections first. Ordinary users then use them directly in sessions.

### What does the free binary version mean?

The free binary version is currently the `v0.0.1.beta` beta release and is an entry point for understanding and evaluating xAgent. Users can deploy the standard version first and experience core capabilities such as task submission, file workspace, tools, Skills, and external connections.

If enterprise internal system access, unified identity, complex permissions, audit and compliance, dedicated connectors, or deep business process changes are required, custom integration should usually be done based on actual needs.

### Will xAgent provide an official SaaS?

There is currently no SaaS release plan. xAgent does not want users to store their task files, business data, and external system connections on an official platform. In self-deployment, data security, backup, permissions, and confidentiality are the deployment owner's responsibility.

### What database does xAgent use?

The current version uses embedded SQLite by default to reduce deployment and maintenance difficulty. xAgent can be upgraded to PostgreSQL or other databases later when team scale, concurrency, audit, or operations requirements increase.

### Is xAgent suitable for large enterprise platforms?

xAgent can serve as a foundation for an enterprise AI work portal and business AI entry point, covering unified task entry, file workspace, tool calling, Skill capture, and external system connections.

For large companies or complex organizations, xAgent usually needs custom integration with existing enterprise systems, such as unified identity, permission systems, internal business system connections, audit requirements, data boundaries, safety policies, model gateways, and dedicated external connections. This is not a simple install-and-cover-all-enterprise-processes scenario. It is better understood as using xAgent as a base and gradually connecting and extending it according to existing enterprise infrastructure.

### Can xAgent replace all business systems?

No. xAgent organizes task entry points and capability calls. Permissions, login state, business data, and audit rules for external systems should still be managed by the corresponding system or external connection.

### Will this documentation include technical implementation details?

The main line is the user manual. Ordinary users should first read Getting Started and User Manual pages. Technical materials are only supplementary for maintenance and customization.

## Related Docs

- [Feature and Menu Overview](/docs/user-guide/menu-overview)
- [Server Installation](/docs/deployment/server-install)
- [Connector Installation](/docs/deployment/connector-install)
- [First Task](/docs/getting-started/first-task)
- [Create / Update Skill](/docs/getting-started/create-skill)
