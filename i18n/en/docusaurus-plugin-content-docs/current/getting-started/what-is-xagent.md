---
title: "What Is xAgent: An Agentic Platform for Ongoing Work"
description: "Learn how xAgent combines an Agentic Loop, context engineering, long-term memory, multi-agent collaboration, and human approval to produce verifiable results."
image: "/img/share/en/xagent-overview.png"
status: stable
updated: 2026-10-23
---

# What Is xAgent?

## The short version {/* #the-short-version */}

xAgent is an **agentic platform for ongoing work**. You provide a goal, materials, and constraints. An Agent plans, calls tools, checks results, and adjusts its next steps to turn multi-step tasks into deliverables you can inspect.

It brings long-running tasks, context engineering, long-term memory, multi-agent collaboration, and tool integrations together in one server-side platform. Work can progress in stages, wait for information or approval, and resume from existing state. Results can include analysis, documents, code, and authorized actions in external systems.

Individuals can use it for ongoing work, while teams can centrally prepare models, Skills, tools, and access policies. The multi-user portal is the interface and self-hosting is the deployment option; progressing tasks is the product's core purpose.

As of 2026-10-23, the latest public binary release is `v0.1.1`, published on 2026-10-23 for deployment trials, scenario validation, and feedback. Check the installed version for its actual features and limits.

## Agent Harness: the runtime around the model

An Agentic platform is the product; the **Agent Harness** is the runtime support around the model. The model interprets goals and decides the next step. Surrounding mechanisms provide tools, organize context, retain progress, resume tasks, coordinate child agents, and apply configured human review and execution records. A harness is more than a prompt and is not the model itself.

In xAgent, this describes the combination of Tool Calling, Context Engineering, Agent Memory, Resumable Execution, Multi-agent Collaboration, Human-in-the-loop, and Observability. It maps existing mechanisms to their roles, not a certification standard or a promise that every task succeeds.

For conceptual background, see Anthropic’s [Effective harnesses for long-running agents](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents), which discusses engineering practices for progress across context windows. Validate xAgent’s own implementation and outcomes against its documentation and real tasks; this reference does not imply the same architecture or an endorsement.

## Why use xAgent? {/* #why-use-xagent */}

1. **Keep multi-step work moving:** Research, analysis, writing, and revision can progress toward the same goal without treating each step as a separate question.
2. **Load methods and tools when needed:** The Agent loads relevant Skills and tool definitions on demand, leaving more context for current materials, constraints, and execution results.
3. **Reuse confirmed context and methods:** Long-term memory retains stable information across sessions; Skills capture reusable methods. They are managed separately rather than treating every conversation as lasting knowledge.
4. **Split complex work into focused tasks:** A parent Agent can delegate well-defined subtasks to independent child Agents, then inspect their replies, files, and execution records.
5. **Keep review and decisions accessible:** Human approval, task status, and execution records help you check what is happening, what needs confirmation, and whether the deliverable meets the goal.

## What can it do? {/* #what-can-it-do */}

Typical tasks include:

- Read contracts, meeting notes, PDFs, spreadsheets, and code to extract key points, risks, and action items.
- Combine information retrieval and tool calls for research, data analysis, weekly reports, proposals, articles, and project lists.
- Write or modify programs, troubleshoot issues, and run tests to verify the result.
- Save results as Word, PowerPoint, Excel, PDF, Markdown, CSV, HTML reports, or other workspace files.
- Use a configured and authorized browser, email, WeChat, Telegram, Feishu, or enterprise system for the next step.
- Revise deliverables over time and continue after waiting for materials, user confirmation, or external results.

Results depend on the model, loaded Skills, available tools, and external account permissions. See [Supported Agent Capabilities](/docs/manual/capabilities) for built-in Skills and supported document formats.

## How it works {/* #how-it-works */}

Suppose you ask: "Turn these three sales spreadsheets into a weekly report, flag anomalies, and show me a draft first. Do not send it yet."

1. **Understand the goal and constraints:** Read the files and establish the scope, deliverable, and instruction not to send it.
2. **Plan and select capabilities:** Load the relevant data-analysis Skill and tools instead of loading every capability up front.
3. **Act and observe:** Call tools to process the data, read their results, and adjust the next step when something is missing or incorrect.
4. **Check and deliver:** Verify the anomalies, generate the report, and save a draft to the workspace for your review.
5. **Continue from feedback:** You can request revisions, add materials, or explicitly authorize sending it.

This cycle of **model decision → tool execution → result feedback → next decision** is an **Agentic Loop**. It lets execution adapt to observed results; it does not mean every task will succeed automatically.

“Do not send” defines the task scope. A deployment should also restrict sending through least-privilege external accounts and approval policies, and inspect execution records. Natural-language instructions do not replace system-level access controls.

## What supports ongoing work? {/* #what-makes-it-different */}

| Capability | How it helps | Current boundary |
| --- | --- | --- |
| **Context Engineering** | Loads Skills and tools on demand and compacts context to retain goals, constraints, progress, and key results for long tasks | Compaction is neither infinite context nor guaranteed lossless retention; save important materials as files |
| **Long-term Memory** | Reuses stable preferences, accepted decisions, and background across one user's sessions, with source evidence for review | Experimental; it does not save every conversation or replace live checks or fresh authorization |
| **Resumable Tasks** | Uses session state, recovery snapshots, and work artifacts to continue after waiting or interruption | Recovery does not guarantee exactly-once execution of external actions; verify uncertain outcomes first |
| **Multi-agent Collaboration** | Splits research, analysis, or writing into independent subtasks with separate contexts and exchanged results | Check actual replies and artifacts; successful dispatch is not task completion or cross-user access authorization |
| **Tool Calling / MCP / A2A** | Connects tools, external systems, and remote Agents, with Skills providing reusable methods | MCP connects tools; current A2A support is client-side; availability depends on configuration, version, and authorization |
| **Human-in-the-loop / Observability** | Waits for human confirmation when needed and exposes status, messages, tool results, and files for review | Approval coverage depends on tools and policies, not an unbypassable global guarantee; execution records are not a full evaluation platform |

After completing a task, xAgent can also help organize, test, and refine a stable method into a Skill. A dedicated Agent can add a fixed role, prompt, and capability entry point when needed.

## How Multiple Agents Work Together {/* #how-multiple-agents-work-together */}

The parent Agent takes your goal, while child Agents independently execute well-defined subtasks. Sessions collaborate through messages and file references instead of merging every role's history into one context. Check their replies, deliverables, and execution records to establish completion.

In `v0.1.0`, [virtual teams](/docs/user-guide/virtual-teams) bring together a dedicated manager, member Session trees, reusable role templates, manager delegation, and owner guidance. Team materials use a shared business directory. This organizes multi-agent collaboration; it does not grant access to other users' data.

Session collaboration, WorkGroup orchestration, and remote A2A address different needs: Sessions execute tasks, WorkGroup stores role and communication configuration, and the A2A client connects to external Agents and tracks remote tasks. Publishing configuration, submitting a message, and completing a task are distinct states. See [multi-Agent collaboration](/docs/guides/multi-agent-session-event-collaboration) and [remote A2A](/docs/user-guide/a2a).

## How to understand its positioning {/* #how-it-compares */}

xAgent focuses on assembling the capabilities AI Agents need for ongoing work, rather than simply adding another chat window:

- **Conversation is the interface:** Users describe goals, provide information, and review results in sessions.
- **The Agentic Loop drives execution:** The model uses tool results to choose the next step rather than producing only a single answer.
- **Skills and tools compose capabilities:** Skills describe how to work, tools perform concrete actions, and protocols such as MCP connect external capabilities.
- **The platform supports continuity:** It manages sessions, files, long-running tasks, collaboration, approvals, and model configuration for individuals and multiple users.

Other AI products may also offer tool use, memory, or multi-agent capabilities. Evaluate completion quality, integrations, access controls, deployment requirements, and cost against real tasks instead of comparing only “chat” and “agent” labels.

## What it does not replace {/* #what-it-does-not-replace */}

xAgent does not replace an organization's identity system, business permissions, backups, or audits. Access to an external system is determined by the external account and its AgentPlugin or MCP authorization. Self-hosting does not mean data never leaves the deployment: configured model services and external tools receive the task data they need.

xAgent runs on the server, so each computer does not need a separate client. Debian Linux is recommended for stable, long-running deployments. macOS is xAgent's primary development environment and is also well supported. Windows currently lacks enough sandbox support to run managed scripts with the same safety and control, so it is not recommended as a deployment environment for now.

## Go deeper when you need to {/* #go-deeper-when-you-need-to */}

- [Agent Sessions: Tasks, Files, and Approvals](/docs/user-guide/agent-session)
- [Long-running Tasks: Continuity and Recovery](/docs/user-guide/long-task)
- [Long-term Memory: Preferences and Decisions Across Sessions](/docs/user-guide/memory)
- [Context Engineering: Discovering and Loading Tools and Skills on Demand](/docs/guides/ai-agent-dynamic-tool-discovery)
- [How Multiple Agents Collaborate Through Session Events](/docs/guides/multi-agent-session-event-collaboration)
- [Human Approval and Safety Controls](/docs/guides/agent-approval-security)
- [Deploying an AI Agent on Your Own Server](/docs/guides/self-hosted-ai-agent)

## Who is it for? {/* #who-is-it-for */}

If your work involves many materials, tool calls, files, repeated revisions, or multiple stages, you can use xAgent to test whether it fits your workflow. Examples include research, report generation, meeting organization, contract review, data analysis, customer support, and project collaboration.

To try it, continue with:

- [Start Installing xAgent](/docs/getting-started/install)
- [Complete Your First Task](/docs/getting-started/first-task)
- [xAgent User Manual](/docs/manual/overview)
- [Supported Agent Capabilities](/docs/manual/capabilities)
- [Common Questions](/docs/faq/common)

## Familiar AI terms {/* #a-plain-language-glossary */}

| Term | Meaning in xAgent |
| --- | --- |
| Agent | An entity that understands goals, plans, calls tools, and progresses work based on execution results |
| Skill | A reusable task method with guidance on when to use it, steps, constraints, and quality checks |
| Tool | A concrete operation an Agent can invoke, such as reading a file, querying data, or sending a message |
| MCP (Model Context Protocol) | A protocol for connecting external tools and capabilities, not an individual tool |
| Context Engineering | Organizing relevant instructions, materials, history, and capability definitions for the current execution step |
| Memory | Stable background reused across sessions, managed separately from session history and context compaction |
| Workspace | The space for task materials, intermediate files, and final results |
| AgentPlugin | xAgent's plugin mechanism for systems such as WeChat, Telegram, Feishu, DingTalk, Database, or SSH; the browser uses a built-in Runtime |

Administrators can configure shared capabilities. Users with the relevant access can also configure personal Skills, MCP connections, or plugins. Most users only need to describe the goal, constraints, and expected deliverable. See the [glossary](/docs/reference/glossary) for full definitions.
