---
title: "Common Questions"
description: "Answers to common questions about xAgent installation, usage, models, data safety, Skills, AgentPlugins, maintenance, and beta status."
status: stable
updated: 2026-10-03
schemaType: WebPage
toc_max_heading_level: 2
---

# Common Questions

<span id="who-this-is-for"></span>

<span id="what-it-is"></span>

<span id="when-to-use-it"></span>

<span id="basic-usage"></span>

This page is for every reader of the xAgent documentation. This page provides centralized answers to common questions about using xAgent and reading the manual. Check this page first when you do not know where to start, whether a capability is stable, or which page to read.

## Find Help by Symptom {/* #find-help-by-symptom */}

| Problem | Start Here |
| --- | --- |
| First login and unsure where to begin | [First Task](/docs/getting-started/first-task) |
| Model test passes but tool tasks fail | [Model Validation](/docs/deployment/model-requirements) |
| Missing file or text-only result | [Workspace Files](/docs/user-guide/workspace) |
| Waiting for approval or unclear scope | [Approval and Safety](/docs/guides/agent-approval-security) |
| A sub-session has not returned work | [Collaboration Messages and Receipts](/docs/guides/multi-agent-session-event-collaboration) |
| A scheduled task did not start as expected | [Trigger Status and Timezone](/docs/user-guide/trigger) |
| Memory is wrong or should not be kept | [Long-Term Memory Management](/docs/user-guide/memory) |

## Questions Consolidated from Other Pages {/* #questions-consolidated-from-other-pages */}

These questions come from getting-started, usage, deployment, architecture, development, and reference pages. They are grouped by task below, with the questions and technical details preserved.

## Getting Started and Product Scope {/* #getting-started-and-product-scope */}

### Which pages should I read first? {/* #which-pages-should-i-read-first */}

Start with [What Is xAgent](/docs/getting-started/what-is-xagent) and [Feature Overview and Menu Entries](/docs/user-guide/menu-overview). Then continue with [Your First Task](/docs/getting-started/first-task) or [Tasks](/docs/user-guide/task), depending on your needs.

### Why are some pages marked experimental or planned? {/* #why-are-some-pages-marked-experimental-or-planned */}

Those capabilities may still change. The manual explains their available boundaries without presenting unstable interfaces as commitments.

### Do ordinary users need to understand AI technology? {/* #do-ordinary-users-need-to-understand-ai-technology */}

No. Ordinary users only need to describe goals, provide materials, confirm necessary actions, and review results. Administrators or maintainers handle models, protocols, implementation details, and extensions.

### Why do some pages use English names? {/* #why-do-some-pages-use-english-names */}

Some menu items use English names, such as Agent Session, Skill Management, and MCP Configuration. The manual explains them by purpose and does not require ordinary users to understand the underlying technical meaning.

### Does the documentation site include login, comments, or a plugin marketplace? {/* #does-the-documentation-site-include-login-comments-or-a-plugin-marketplace */}

No. The documentation site is a static manual.

### Is the current release stable? {/* #is-the-current-release-stable */}

As of 2026-10-03, the latest public binary is `v0.0.22.beta` (2026-10-02), still intended for evaluation, scenario validation, and feedback. Newer source behavior is dated where discussed; a public release, source snapshot, and deployed instance are not the same state.

### Must I create an Agent before starting? {/* #must-i-create-an-agent-before-starting */}

No. Most first Tasks can be completed directly in the default Session.

### Is xAgent a chatbot? {/* #is-xagent-a-chatbot */}

No. Chat is only one entry point. xAgent focuses on completing work: reading materials, generating files, waiting for confirmation, connecting external systems, and archiving results. It can chat, but the product goal is work completion rather than casual conversation.

### Does xAgent need to be installed on every computer? {/* #does-xagent-need-to-be-installed-on-every-computer */}

No. xAgent is deployed on a server and users access it through the web or installed AgentPlugins. A user's computer does not need to remain on while a Task runs, and users can submit Tasks remotely through IM entry points such as WeChat.

### Is xAgent a single dedicated Agent? {/* #is-xagent-a-single-dedicated-agent */}

No. xAgent can host multiple dedicated Agent entry points. Administrators can prepare different Agents, Skills, Tools, external connections, and safety policies for different work scenarios. Ordinary users enter the relevant entry point and use it directly.

### Will xAgent automatically self-evolve? {/* #will-xagent-automatically-self-evolve */}

Not by default. xAgent can continuously optimize a specific Skill through prompts or a self-evolution Skill, but this requires a clear goal, test cases, acceptance criteria, and a publication flow. Self-evolution is valuable but risky, so xAgent approaches it cautiously.

### What does the free binary release mean? {/* #what-does-the-free-binary-release-mean */}

The free binary release is currently the `v0.0.22.beta` beta, published on 2026-10-02, and serves as an entry point for understanding and evaluating xAgent. Users can deploy the standard version first and experience core capabilities such as Task submission, the file Workspace, Tools, Skills, and external connections.

A free binary release is not the same as an open-source release. xAgent will evaluate whether to open the source or expand ecosystem collaboration based on product maturity, community feedback, security boundaries, and commercial sustainability.

Enterprise internal-system integration, unified identity, complex permissions, audit and compliance, dedicated AgentPlugins, or deep business-process changes usually require custom integration based on actual needs.

### What is the difference between the commercial and free editions? {/* #what-is-the-difference-between-the-commercial-and-free-editions */}

Without an Enterprise license certificate, xAgent uses the Free edition directly, with no Free certificate application, renewal, or expiry. Current Free runtime limits apply across the deployment: 2 non-disabled users, 30 non-deleted and unarchived Sessions of all kinds, 1 WorkGroup, 5 AgentPlugin VChannel bindings, 5 scheduled tasks, and 1 remote A2A connection.

Archived Sessions do not consume capacity; restoring them checks capacity again. Disabled timers still count, while external-event triggers do not consume timer capacity. Licensing controls quantities rather than a feature whitelist; account and external-system permissions still apply. See [Software License](/docs/manual/system-configuration#software-license) for counting rules.

The Enterprise edition uses an external license certificate to provide higher capacity while retaining signature, device-binding, and expiry validation. It is intended for organizations that need more capacity, support, or custom integration.

### Will xAgent provide an official SaaS? {/* #will-xagent-provide-an-official-saas */}

There is currently no SaaS release plan. xAgent does not want users to store their Task files, business data, and external-system connections on an official platform. With self-hosted deployment, the deployment owner is responsible for data security, backups, permissions, and confidentiality.

### Is xAgent suitable as a large-enterprise platform? {/* #is-xagent-suitable-as-a-large-enterprise-platform */}

xAgent can serve as a foundation for an enterprise intelligent-work portal and business AI entry point, covering unified Task entry, the file Workspace, Tool calling, Skill capture, and external-system connections.

Large companies and complex organizations usually need custom integration with existing enterprise systems, such as unified identity, permission systems, internal business-system connections, audit requirements, data boundaries, safety policies, model gateways, and dedicated external connections. This is not a simple install-and-cover-every-process scenario. It is better understood as using xAgent as a foundation and gradually connecting and extending it around existing enterprise infrastructure.

### Can xAgent replace every business system? {/* #can-xagent-replace-every-business-system */}

No. xAgent organizes Task entry points and capability calls. Permissions, login state, business data, and audit rules for external systems should remain managed by the corresponding system or external connection.

### Why are some terms kept in English? {/* #why-are-some-terms-kept-in-english */}

Session, Task, Tool, Skill, AgentPlugin, Workspace, and Memory are fixed concepts that appear in the product and code. Keeping the English terms reduces ambiguity across the UI, logs, and code.

### Do ordinary users need to create Agents? {/* #do-ordinary-users-need-to-create-agents */}

Usually not. Once administrators prepare public entry points, ordinary users can use them directly. Users who are familiar with a recurring workflow can also create or adjust an Agent in their personal scope.

### Why do I see fewer menu items than another user? {/* #why-do-i-see-fewer-menu-items-than-another-user */}

First check the deployed version, account role, and whether you are in sessions, user settings, or the admin console. Earlier simple mode hid the session list, triggers, Agents, Skills, Tools, MCP, and personal policy; user menus checked on 2026-10-01 no longer filter by that switch. Administrator functions still require the administrator role.

### Which menu should I open first? {/* #which-menu-should-i-open-first */}

Start with Agent Session and describe the goal, materials, constraints, and delivery requirements. Open Workspace Files when you need to inspect files, or Plugin Connections when you need to bind a messaging channel.

### Where are theme and display density settings? {/* #where-are-theme-and-display-density-settings */}

Open Account Management and use the interface settings to choose light, dark, or system theme and adjust display density. These settings are no longer separate sidebar entries.

## Installation, Models, and Deployment {/* #installation-models-and-deployment */}

### How should I install or upgrade xAgent? {/* #how-should-i-install-or-upgrade-xagent */}

Use the official installer:

```bash
curl -fsSL https://downloads.xagent.xiagaogao.com/scripts/install.sh | bash
```

The script detects the operating system and architecture, verifies release packages, and supports pinned versions, unattended installation, and AgentPlugin selection. On Linux, it attempts to restore the previous version if activation fails. See [Start Installation](/docs/getting-started/install) for the complete flow.

### What must be installed for Office-to-PDF or Excel recalculation? {/* #what-must-be-installed-for-office-to-pdf-or-excel-recalculation */}

An administrator must install LibreOffice on the server; its operating-system dependencies are not bundled in the xAgent release. On Debian/Ubuntu, run `sudo apt-get update && sudo apt-get install -y libreoffice`, then verify with `soffice --headless --version`. See [Installation](/docs/getting-started/install#step-7-prepare-runtime-assets).

### Must I use Qwen3.6-27B? {/* #must-i-use-qwen36-27b */}

No. Qwen3.6-27B is one model in earlier development test notes, not a recommended configuration or the only current choice. Select using context length, tool calling, reasoning quality, and acceptance tests for your own tasks.

### Can small models be used? {/* #can-small-models-be-used */}

You can evaluate them. Earlier notes include samples of `Gemma4-12B` running long tasks, which do not guarantee every deployment or task result. Check complex reasoning, multi-tool planning, long-context retention, and Skill creation before wider use.

### Is a 64k context window enough? {/* #is-a-64k-context-window-enough */}

64k remains a starting recommendation, with 100k+ preferred for complex tasks, rather than a universal threshold. Earlier initial-context observations approached 20k; actual use varies with version, capabilities, and inputs. Historical prefix-cache samples exceeded 90%, but only describe that environment and do not replace context capacity. `v0.0.21.beta` uses a 90% request-budget compression line; see [Model Requirements](/docs/deployment/model-requirements).

### Why is Tool calling required? {/* #why-is-tool-calling-required */}

xAgent is not a chat-only system. It needs to read files, write to the Workspace, call MCP, use AgentPlugins, process Triggers, and generate artifacts. Many tasks cannot be completed reliably without stable Tool calling.

### Does context compression affect results? {/* #does-context-compression-affect-results */}

It can. Context compression lets long tasks continue, but compressed content is a summary rather than the complete source. Long-context models are therefore better suited to complex tasks and reduce information loss caused by early compression.

### Can data be fully private? {/* #can-data-be-fully-private */}

Using a local model or self-hosted model service can keep Task data in the team's own environment. Complete privacy also depends on the model, external connections, deployment method, and administrator configuration.

### Can I adjust configuration myself? {/* #can-i-adjust-configuration-myself */}

Yes. Models, prompts, Skills, Tools, external connections, and approval policies can be maintained in the system. Many settings do not require a service restart or a new Session. A running execution round keeps its current configuration, while later rounds use the new settings.

### What database does xAgent use? {/* #what-database-does-xagent-use */}

The current version uses embedded SQLite by default to reduce deployment and maintenance difficulty. xAgent can be upgraded to PostgreSQL or another database when team size, concurrency, audit, or operational requirements increase.

### What should I do if I misconfigure Advanced Settings? {/* #what-should-i-do-if-i-misconfigure-advanced-settings */}

Describe the problem in the Session, or reopen Advanced Settings and restore the previous prompt, model, Skills, Tools, and Secret selection. Administrators still maintain system-level configuration.

### Does switching models immediately affect a running execution round? {/* #does-switching-models-immediately-affect-a-running-execution-round */}

No. It does not rewrite the model and Tool loop already running in the current round. That round keeps the selected model, and the new configuration applies to later rounds. Switching models does not require a new Session; existing history and files are preserved.

### Do ordinary users need to configure models themselves? {/* #do-ordinary-users-need-to-configure-models-themselves */}

Usually not. Once an administrator configures them, ordinary users can use them directly in a Session.

As unified model management and Task routing improve, ordinary users will need to think less about individual model selection and can focus on describing the Task goal.

### Does a successful connection test mean every Task will work? {/* #does-a-successful-connection-test-mean-every-task-will-work */}

Not necessarily. A successful connection test only confirms that the model service is reachable. Task completion also depends on capability switches, Tools, Skills, external connections, and approval policies.

### Why switch models in a Session? {/* #why-switch-models-in-a-session */}

Different models suit different Tasks. Some are better at rapid summarization, others at complex reasoning or Tool collaboration. Switching models does not mean restarting the entire Session.

## Tasks, Sessions, and Collaboration {/* #tasks-sessions-and-collaboration */}

### Does a SubAgent use a separate Session? {/* #does-a-subagent-use-a-separate-session */}

The current implementation uses a separate sub-Session to hold a SubAgent's goal, state, Tools, and results. The main Session creates and consolidates it when the Task requires delegation.

### Can a SubAgent bypass the main Agent directly? {/* #can-a-subagent-bypass-the-main-agent-directly */}

It should not be described that way. Long-task decomposition remains subject to platform governance.

### Is SubAgent stable? {/* #is-subagent-stable */}

It is currently treated as an experimental capability.

### Is a Session the same as a Task? {/* #is-a-session-the-same-as-a-task */}

No. A Session is an ongoing work context, while a Task is a goal to complete. Multiple Tasks can be advanced in one Session.

### What is the relationship between an Agent and a Session? {/* #what-is-the-relationship-between-an-agent-and-a-session */}

An Agent performs the work, while a Session carries the context. An Agent can work in a Session, but files, history, Tool state, and user additions in the current Session still belong to the Session context.

### When are multiple Agents useful? {/* #when-are-multiple-agents-useful */}

Use multiple Agents or expert Sessions when different Tasks require different roles, Tool combinations, permission boundaries, or output conventions.

### Is a Task always split into many steps? {/* #is-a-task-always-split-into-many-steps */}

No. Simple Tasks are usually completed directly. Work is more likely to proceed in stages when it has many materials, complex steps, or intermediate confirmations.

### Is a Task the same as one user message? {/* #is-a-task-the-same-as-one-user-message */}

No. A user message may create a new Task, add materials, revise requirements, or confirm one step.

### What should a good Task include? {/* #what-should-a-good-task-include */}

At minimum, include the goal, materials, constraints, and delivery format. The more Tool or file processing a Task requires, the more clearly its input source and result format should be described.

### Where do Session events come from? {/* #where-do-session-events-come-from */}

Session events may come from external APIs, Triggers, AgentPlugins, or other Sessions. xAgent delivers events to the corresponding Agent Session through its built-in event queue.

### Can Sessions communicate with each other? {/* #can-sessions-communicate-with-each-other */}

Yes, within the same user boundary. Earlier descriptions grouped events as notification or assistance; current behavior depends on both message type and `context_scope`. The word “notification” alone does not determine context inclusion or execution. Acceptance from `session_send` is not proof of task completion. Specify the return target, artifact references, and reply requirement, then inspect actual results. See [Multi-session Collaboration](/docs/guides/multi-agent-session-event-collaboration).

### Why do I see Tool calls? {/* #why-do-i-see-tool-calls */}

They show that xAgent is performing a concrete action, such as reading a file, accessing a web page, generating a file, or calling an external system. Ordinary users should focus on the final result and whether confirmation is required.

### Why did the Task stop progressing? {/* #why-did-the-task-stop-progressing */}

Common causes include missing materials, pending approval, waiting for additional information, an unavailable Tool, an unconnected external system, or an unclear Task description. Read the notice in the Session and provide the missing information.

### Can I change requirements midway? {/* #can-i-change-requirements-midway */}

Yes. State the new requirement directly, for example: "Keep the previous result, but change the output format to a table."

### When should I create a new Session? {/* #when-should-i-create-a-new-session */}

Create a new Session when the goal has become a different piece of work or you do not want the current context to continue. A format adjustment, additional material, model switch, or Skill switch within the same goal does not require a new Session.

### Must users manage SubAgents manually? {/* #must-users-manage-subagents-manually */}

You do not necessarily need to manage each one manually. The main session can create sub-sessions and send work, but a send does not guarantee completion, return, or synthesis. Define the deliverable, inspect progress, provide follow-up when needed, and have the coordinator check the returned files.

### Are long-running Tasks split automatically? {/* #are-long-running-tasks-split-automatically */}

Not necessarily. You can explicitly request: "List the plan first and continue after I confirm it." This makes the process easier to control.

### Where can I see long-running Task status? {/* #where-can-i-see-long-running-task-status */}

Check the original Agent Session first. Generated files are usually available in Workspace Files.

### Can I change direction midway? {/* #can-i-change-direction-midway */}

Yes, but state which results to keep and which to discard. For example: "Keep the topic categories, but change the report to an executive briefing format."

### Why are command examples omitted? {/* #why-are-command-examples-omitted */}

Ordinary users primarily submit long-running Tasks through the web. Low-level interfaces and internal organization are not the main line of the user manual.

### Is a Session only a chat history? {/* #is-a-session-only-a-chat-history */}

No. Chat history is only an entry point. A Session also includes Task context, capability selection, file artifacts, and execution state.

### Can a Session be reused by a subtask execution unit? {/* #can-a-session-be-reused-by-a-subtask-execution-unit */}

A long-running or decomposed Task may create an independent execution unit. Ordinary users only need to follow its state and returned results in the main Session.

### Must a Task be completed in one pass? {/* #must-a-task-be-completed-in-one-pass */}

No. Complex Tasks can proceed in stages. Ask xAgent to list a plan first and execute only after confirmation.

### Is a Task the same as a Tool call? {/* #is-a-task-the-same-as-a-tool-call */}

No. A Tool is only a means of completing a Task. Ordinary users do not need to specify a Tool name; they only need to describe the desired action.

### When should a Task be split? {/* #when-should-a-task-be-split */}

Split it when it has many materials, complex steps, external results to wait for, or multiple confirmation points.

## Files, Workspaces, and Delivery {/* #files-workspaces-and-delivery */}

### Can files be shared through public links? {/* #can-files-be-shared-through-public-links */}

Yes, after an administrator enables **Storage Management &gt; File Sharing**; sharing is disabled by default. Links must expire, previews are watermarked, and original downloads need separate permission. See [File Sharing](/docs/user-guide/file-sharing).

### Is ProcessSandbox the same as Workspace isolation? {/* #is-processsandbox-the-same-as-workspace-isolation */}

No. Workspace isolation determines which files a user and Session can see, read, and write. ProcessSandbox controls which files an external command actually mounts, which environment it inherits, and its process-tree and resource limits.

### Where are Task files stored? {/* #where-are-task-files-stored */}

Task files and artifacts are stored centrally in the server Workspace and isolated by user. Users can see only their own Workspace and files within their authorized scope.

### Can xAgent save a result automatically? {/* #can-xagent-save-a-result-automatically */}

Yes. Specify a format such as "save as a Markdown / CSV / HTML report" in the Task.

### Can a Tool directly access files on my computer? {/* #can-a-tool-directly-access-files-on-my-computer */}

No. A Tool can normally access only files in the Workspace and authorized scope.

### Is the Workspace the same as any local directory on my computer? {/* #is-the-workspace-the-same-as-any-local-directory-on-my-computer */}

No. The Workspace has explicit visibility and permission boundaries. Users can see only files within their authorized scope.

### Are uploaded files processed automatically? {/* #are-uploaded-files-processed-automatically */}

Not necessarily. Uploading only provides the material. You still need to ask xAgent to read the file or analyze the spreadsheet in the Task.

### Why can I not find a generated file? {/* #why-can-i-not-find-a-generated-file */}

The Task may have replied with the result in the Session without saving a file. Continue by asking xAgent to save the result as a Markdown file.

### Can a Workspace file be sent to an external system? {/* #can-a-workspace-file-be-sent-to-an-external-system */}

Yes, but this usually requires a Tool, connection, and approval. Check whether the content is appropriate for external distribution before sending it.

## Skills, Tools, and Extensions {/* #skills-tools-and-extensions */}

### Must an AgentPlugin provide a Skill? {/* #must-an-agentplugin-provide-a-skill */}

It may provide one, but that is not its only responsibility.

### Can a Tool execute outside a Session? {/* #can-a-tool-execute-outside-a-session */}

It should not be designed that way. Tool calls should occur within an explicit context and governance boundary.

### Should a Tool store business facts? {/* #should-a-tool-store-business-facts */}

Usually not. Business facts should belong to an explicit owner.

### Where should I inspect a Tool error? {/* #where-should-i-inspect-a-tool-error */}

Start with the Tool result and error message in the current Session. Deployment maintainers can also use service logs for diagnosis. There is no stable public error-code table yet.

### Is an AgentPlugin the same as a Skill? {/* #is-an-agentplugin-the-same-as-a-skill */}

No. An AgentPlugin may provide a Skill, but the plugin itself owns an external-system integration boundary.

### Is a Skill the same as a plugin? {/* #is-a-skill-the-same-as-a-plugin */}

No. A Skill primarily describes task methods and Tool usage guidance.

### Can a Skill execute code directly? {/* #can-a-skill-execute-code-directly */}

It should not be described that way. Execution capability should belong to a Tool or RuntimeConnection.

### Can a Skill come from an AgentPlugin? {/* #can-a-skill-come-from-an-agentplugin */}

Yes. A plugin can publish a directory manifest via `/skill.json`. xAgent downloads it by revision and replaces the local copy atomically; script files are not downloaded or executed.

### What is the difference between a Skill and a Tool? {/* #what-is-the-difference-between-a-skill-and-a-tool */}

A Tool is a concrete action that can be invoked. A Skill describes how to complete a type of task and may guide an Agent to combine multiple Tools.

### Does xAgent have a built-in knowledge base? {/* #does-xagent-have-a-built-in-knowledge-base */}

Not currently. Knowledge capabilities can be extended through Skill + MCP: a Skill describes how to use knowledge and organize answers, while MCP connects an external knowledge base, retrieval service, or existing team data system.

### Can xAgent help me build a new dedicated Agent? {/* #can-xagent-help-me-build-a-new-dedicated-agent */}

Yes. Usually you first define the Task scenario, then prepare a dedicated Agent entry point, Skills, Tools, external connections, and approval policies. If you only need to capture a fixed work method, ask xAgent to generate a Skill draft first, then test, optimize, and publish it.

### Does every Session need to preload all Skills and Tools? {/* #does-every-session-need-to-preload-all-skills-and-tools */}

No. xAgent Sessions include core capabilities for discovering and loading Skills and Tools. During Task execution, xAgent can search for and load a suitable Skill or Tool if the current capabilities are insufficient. This saves context and lets the Agent extend its capabilities according to the Task.

### Do ordinary users need to configure Tools and Skills themselves? {/* #do-ordinary-users-need-to-configure-tools-and-skills-themselves */}

Usually not. Administrators can prepare common scenarios, dedicated Agents, Tools, Skills, and external connections first. Ordinary users then use them directly in Sessions.

### What is the difference between an Agent and a Skill? {/* #what-is-the-difference-between-an-agent-and-a-skill */}

An Agent is a work entry point, while a Skill is a method for completing a type of Task. One Agent can be associated with multiple Skills.

### Why can I see only public Agents? {/* #why-can-i-see-only-public-agents */}

The current account may not have a personal Agent, or its permissions may allow only public entry points. Use what the page displays as the source of truth.

### Is a Skill the same as a Tool? {/* #is-a-skill-the-same-as-a-tool */}

No. A Tool performs an action, while a Skill captures a method. A Skill can guide xAgent in using Tools but does not replace Tool permissions.

### Are more Skills always better? {/* #are-more-skills-always-better */}

No. Too many Skills make selection difficult. Prioritize frequent, stable workflows with clear value.

### Must ordinary users select a Skill? {/* #must-ordinary-users-select-a-skill */}

No. Administrators can associate Skills with an Agent so ordinary users only need to submit the Task.

### Does a Skill change take effect immediately? {/* #does-a-skill-change-take-effect-immediately */}

A draft change affects only the current draft test. After publication to the personal library, later Tasks can use the new personal Skill. A public-library Skill follows administrator review and maintenance. Whether a running Task adopts new content depends on the current page and Session behavior.

### What is the difference between a Tool and a Skill? {/* #what-is-the-difference-between-a-tool-and-a-skill */}

A Tool performs an action, while a Skill records a method. For example, "read an Excel file" is a Tool action, while "how to analyze sales data" is closer to a Skill.

### What should I do when a Tool call fails? {/* #what-should-i-do-when-a-tool-call-fails */}

Read the failure reason first. Common responses include adding the file, completing authorization, enabling the connection, narrowing the Task, or asking an administrator to enable the Tool.

### Why are some Tools not visible to me? {/* #why-are-some-tools-not-visible-to-me */}

Tool visibility depends on account permissions, administrator configuration, connection state, personal MCP configuration, AgentPlugin authorization state, and personal switches.

## Plugins, Remote Agents, and Triggers {/* #plugins-remote-agents-and-triggers */}

### How do I call a remote Agent? {/* #how-do-i-call-a-remote-agent */}

Add and discover its Agent Card under **Operations &gt; A2A**, configure the remote credentials, then inspect tasks and inbox results. See [A2A Client](/docs/user-guide/a2a).

### Does xAgent store the target system token for an AgentPlugin? {/* #does-xagent-store-the-target-system-token-for-an-agentplugin */}

It should not be described that way. A target-system token belongs to the AgentPlugin or target-system boundary.

### Is the AgentPlugin protocol fully stable? {/* #is-the-agentplugin-protocol-fully-stable */}

It is currently marked experimental and may change.

### Does xAgent store target-system login state? {/* #does-xagent-store-target-system-login-state */}

It should not be designed that way. Target-system login state belongs to the AgentPlugin or target system.

### Can an Agent see internal AgentPlugin Channel IDs? {/* #can-an-agent-see-internal-agentplugin-channel-ids */}

An Agent should not see internal system-level or channel-level IDs.

### Is RuntimeConnection the same as AgentPlugin? {/* #is-runtimeconnection-the-same-as-agentplugin */}

No. AgentPlugin connects an external system, while RuntimeConnection focuses on an execution environment.

### Is RuntimeConnection always exposed to an Agent? {/* #is-runtimeconnection-always-exposed-to-an-agent */}

Not necessarily. An Agent usually sees a Tool rather than the underlying execution environment.

### What is an AgentPlugin? {/* #what-is-an-agentplugin */}

AgentPlugins connect WeChat, Telegram, Feishu, DingTalk, Database, SSH, and other supported systems to xAgent; browser interaction uses a built-in Runtime. Plugins can carry messages, file references, and external Tools in both directions. Users manage their Channels in Plugin Connections; administrators manage the plugin servers and safety policies in AgentPlugin Connectors.

### How are Connectors and AgentPlugins related? {/* #how-are-connectors-and-agentplugins-related */}

The former Connector domain was renamed AgentPlugin in `v0.0.16.beta`. Older attachments and changelogs use the historical name; current menus and installation paths use AgentPlugin. This is not an arbitrary in-process code plugin.

### Does an Agent directly manage external-system login state? {/* #does-an-agent-directly-manage-external-system-login-state */}

No. External-system login state belongs to the external connection or target system.

### What is the difference between Plugin Connections and AgentPlugin Connectors? {/* #what-is-the-difference-between-plugin-connections-and-agentplugin-connectors */}

Users bind their own external accounts under **Operations &gt; Plugin Connections**. Administrators manage system-level plugin services under **Agent Governance &gt; AgentPlugin Connectors**.

### Are AgentPlugin Tools automatically available to every user? {/* #are-agentplugin-tools-automatically-available-to-every-user */}

No. Availability depends on whether the AgentPlugin is online, whether the user is authenticated, connection state, Tool governance, and approval policies.

### Why can I receive a message but not reply? {/* #why-can-i-receive-a-message-but-not-reply */}

First check AgentPlugin health, user authentication, and platform permissions. WeChat also requires valid recipient context. Sending is blocked after the `context_token` expires until the context is re-established.

### Does a Trigger wait until a Task finishes? {/* #does-a-trigger-wait-until-a-task-finishes */}

No. A Trigger starts the Task. Follow execution and results in the Session.

### Why did a Trigger not run? {/* #why-did-a-trigger-not-run */}

Check enabled state, schedule and timezone, target session, latest trigger record, and error. Fixed schedules in current source use `Asia/Shanghai` (UTC+8); busy targets are retried later. An increased trigger count means task-message acceptance, not successful completion. Check external connections, saved configuration, and subsequent approvals separately; see [Triggers](/docs/user-guide/trigger).

### Can a scheduled Task send a message directly? {/* #can-a-scheduled-task-send-a-message-directly */}

Whether it can send depends on the Tool, connection, and approval policy. The recommended default is to generate a draft first and send it after confirmation.

### When should I delete a Trigger? {/* #when-should-i-delete-a-trigger */}

Delete it only after confirming it is no longer needed and will not be reused. Prefer disabling it when the Task is only paused.

## Approvals, Access, and Sensitive Data {/* #approvals-access-and-sensitive-data */}

### Are Secrets sent to model providers? {/* #are-secrets-sent-to-model-providers */}

Normally, no. xAgent Tool configuration uses Secret placeholders, and actual values are substituted only during internal Tool calls. Model providers do not need to see actual Secret values. Users should not put Secrets, tokens, or passwords in plain text in Task messages.

### Can a real Secret be used in an example? {/* #can-a-real-secret-be-used-in-an-example */}

No. Examples must use placeholder values.

### Does an Agent always execute every Tool automatically? {/* #does-an-agent-always-execute-every-tool-automatically */}

No. Tool calls must follow the current Session, capability selection, permissions, and approval rules.

### Will approvals block every dangerous action? {/* #will-approvals-block-every-dangerous-action */}

Approvals reduce risk but do not replace account permissions, external-system permissions, or administrator governance. Sensitive connections should still follow least-privilege configuration.

### Why does the same action sometimes require approval and sometimes not? {/* #why-does-the-same-action-sometimes-require-approval-and-sometimes-not */}

It may match different resource scopes, Session types, or personal policies. The effective decision is calculated from the current Tool parameters together with personal and system policies.

### Does approval block the entire Task before it starts? {/* #does-approval-block-the-entire-task-before-it-starts */}

No. A Task can begin execution. Only a specific Tool action that matches a policy pauses for approval.

### Can I handle approvals from WeChat or Telegram? {/* #can-i-handle-approvals-from-wechat-or-telegram */}

Yes. Source checked on 2026-10-01 attempts delivery to the user’s available IM channels, not only the originating channel. Arrival still depends on connection, authentication, and channel send status. Reply with the provided `@{approval:id}` and an explicit approve or reject decision; the first valid decision wins. Bare `#id` is not the current standard.

### Can ordinary users change system approval policies? {/* #can-ordinary-users-change-system-approval-policies */}

Usually not. Ordinary users may be able to configure personal approval policies, while administrators maintain system-level policies.

### Can screenshots include a Base URL and API Key? {/* #can-screenshots-include-a-base-url-and-api-key */}

That is not recommended. Screenshots in public documentation or public channels should redact internal addresses, Secrets, and account information.

## Memory and Context {/* #memory-and-context */}

### Is long-term Memory the same as Session history or context compression? {/* #is-long-term-memory-the-same-as-session-history-or-context-compression */}

No. Long-term Memory carries explicitly retained preferences, decisions, and boundaries across Sessions. Session history records the current interaction, while context compression allows a long Session to continue.

### Does xAgent automatically write chat content to long-term Memory? {/* #does-xagent-automatically-write-chat-content-to-long-term-memory */}

Earlier versions offered explicit capture only. The implementation checked on 2026-10-01 has three paths: explicit requests, direct management in My Memories, and background extraction after compaction or idle history sealing. Background capture accepts sourced preferences, accepted decisions, facts, and events, not new standing rules or prohibitions; it does not save every message. Check whether your deployed version includes these paths. See [Long-Term Memory](/docs/user-guide/memory).

### Can older Memory override the current request? {/* #can-older-memory-override-the-current-request */}

No. Current user input, Tool results, permissions, and system rules take priority. Stale, conflicting, or low-confidence Memory also cannot be treated directly as a confirmed fact.

### Is Memory the same as chat history? {/* #is-memory-the-same-as-chat-history */}

No. Chat history belongs to the current Session, while Memory supports long-term context and reuse across Tasks.

### Does xAgent have Memory? {/* #does-xagent-have-memory */}

Yes. xAgent has basic Memory capability. Memory is shared within a user's scope and stores preferences, long-term background, and repeatedly used information. Users can also extend their own Memory system through MCP. xAgent may later expose Memory interfaces so third-party Memory systems can connect directly.

### Can Memory be called history? {/* #can-memory-be-called-history */}

No. Memory and Session history are different concepts.

### Does an Agent directly store long-term Memory? {/* #does-an-agent-directly-store-long-term-memory */}

No. Memory is an independent capability. An Agent only uses content projected into its context.

### Does Memory automatically save every message? {/* #does-memory-automatically-save-every-message */}

No. Long-term Memory should be valuable, traceable, and suitable for future reuse.

### Does Memory replace Session history? {/* #does-memory-replace-session-history */}

No. Session history supports the current Session context, while Memory supports long-term reuse.

### Are Memory rules fully stable? {/* #are-memory-rules-fully-stable */}

Not yet. Treat Memory as supporting context rather than the only source of truth.

### Does a Session store every long-term fact? {/* #does-a-session-store-every-long-term-fact */}

It should not. Preferences, decisions, or background that need cross-Session reuse should enter Memory or another explicit location.

## Protocols, Architecture, and Documentation {/* #protocols-architecture-and-documentation */}

### Can every capability be treated as an Agent responsibility? {/* #can-every-capability-be-treated-as-an-agent-responsibility */}

No. An Agent is the execution owner, but different facts have their own owners.

### Does architecture documentation always match the current implementation? {/* #does-architecture-documentation-always-match-the-current-implementation */}

Not necessarily. Content marked experimental may describe a target architecture or boundaries that are still being consolidated.

### What should be done when adding an architecture term? {/* #what-should-be-done-when-adding-an-architecture-term */}

Update the [Glossary](/docs/reference/glossary) at the same time.

### Can fields from another project's manifest be used as a reference? {/* #can-fields-from-another-projects-manifest-be-used-as-a-reference */}

They can be used as a reference, but they must not be added to official xAgent documentation unless xAgent implements them.

### Is a Manifest used only for Skills? {/* #is-a-manifest-used-only-for-skills */}

The documentation should not impose that restriction in advance. Ownership depends on the implementation.

### Does adding a field require updating the Glossary? {/* #does-adding-a-field-require-updating-the-glossary */}

If the field introduces a new term, update the Glossary as well.

### Can an integration protocol be documented before implementation? {/* #can-an-integration-protocol-be-documented-before-implementation */}

AgentPlugin protocol `4.4` is published. Before implementing it, check the target Server release, Card/Descriptor schemas, and capability boundaries. Legacy Connector attachments do not define the current protocol.

### Are unit tests required for Markdown? {/* #are-unit-tests-required-for-markdown */}

Not currently. A successful build and link checks are the minimum requirements.

### How should the search plugin be verified? {/* #how-should-the-search-plugin-be-verified */}

First confirm that `npm run build` passes, then verify the search box in a local server or preview.

### How is documentation accuracy verified? {/* #how-is-documentation-accuracy-verified */}

For behavior, commands, configuration, or APIs, check the xAgent main repository code or existing stable documentation.

### Will this documentation include technical implementation details? {/* #will-this-documentation-include-technical-implementation-details */}

The main line is the user manual. Ordinary users should start with Getting Started and User Manual. Technical material is supplementary for maintenance and customization.

### Why are only a few commands documented here? {/* #why-are-only-a-few-commands-documented-here */}

The user manual records only verified, commonly used entry points. Testing, evaluation, and migration commands belong in more specific maintenance documentation.

### Is a CLI the same as an API? {/* #is-a-cli-the-same-as-an-api */}

No. A CLI is a command-line entry point, while an API is a programmatic interface.

### Why are not all config.yml fields listed? {/* #why-are-not-all-configyml-fields-listed */}

The user manual lists only frequently used fields. Use the current code and configuration management page as the source of truth for the complete field set.

### Can common error messages be documented in advance? {/* #can-common-error-messages-be-documented-in-advance */}

Troubleshooting directions can be documented, but error codes must not be invented.

### Do error codes need a stable format? {/* #do-error-codes-need-a-stable-format */}

Yes. Once stable, they should be maintained centrally on this page.

## Related Docs {/* #related-docs */}

- [Feature Overview and Menu Entries](/docs/user-guide/menu-overview)
- [Start Installation](/docs/getting-started/install)
- [Multi-user Workspace and Task Process Isolation](/docs/guides/multi-user-workspace-isolation)
