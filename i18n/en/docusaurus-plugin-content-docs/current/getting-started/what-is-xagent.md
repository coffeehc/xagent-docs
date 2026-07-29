---
title: What Is xAgent? Product Positioning and Core Capabilities
description: A plain-language explanation of what xAgent is, what it can do, and how it differs from a typical chat assistant.
image: /img/share/en/xagent-overview.png
status: stable
updated: 2026-07-29
---

# What Is xAgent?

## The short version

xAgent is best understood as an **AI portal and AI foundation**. It gives employees one place to use AI while giving the company one place to manage models, capabilities, permissions, and usage. It also connects the systems a team already uses and works within the permissions of each user's existing accounts.

You can ask it to break down a goal, make a plan, carry out the steps, review data, and connect information and actions across different systems. This lets systems that were previously separate work together around the same task.

xAgent does not require a team to replace its existing systems, and it does not invent new permissions. It understands the task, coordinates execution, and summarizes results; each connected system still controls what its own accounts are allowed to access.

The current version is `v0.0.5.beta`, a beta release for deployment trials, scenario validation, and feedback.

## Why use xAgent?

1. **No separate deployment for every employee:** Employees open a browser or send a text or voice message through WeChat. The server runs the task centrally.
2. **One shared integration, existing permissions preserved:** After an administrator connects an internal system, each employee only needs to scan a code or sign in with their account to confirm their identity. xAgent then provides access according to that employee's existing permissions in the internal system; it does not add new permissions.
3. **Keep important work products on the server:** Task materials and results are managed centrally, reducing the amount of sensitive data, passwords, and intermediate files stored on employee computers. This lowers exposure when a device is infected, lost, or stolen.
4. **Balance safety and convenience:** xAgent does not give AI unlimited autonomy. Sending messages, deleting files, or changing data can require user approval. The extra confirmation adds a step, but makes the control boundary clear.
5. **Hide unnecessary complexity:** Administrators prepare models, Tools, Connectors, and policies. Most users only need to type or describe their goal to get started.

## What can it do?

Typical tasks include:

- Read contracts, meeting notes, PDFs, spreadsheets, and code to extract key points, risks, and action items.
- Research topics, analyze data, prepare weekly reports, draft proposals, write articles, reply to customers, and organize project work.
- Write simple programs from requirements, read and modify code, troubleshoot issues, and run tests to verify the result.
- Save results as Markdown, Excel, CSV, HTML reports, or other workspace files.
- Use a browser, email, WeChat, Telegram, Feishu, or an enterprise system for the next step.
- Break complex work into stages, continue running, and wait for more material or approval before proceeding.

See [Supported Agent Capabilities](/docs/manual/capabilities) for the built-in Skills and supported document formats.

## How it works

Suppose you ask: "Turn these three sales spreadsheets into a weekly report, flag anomalies, and show me a draft first. Do not send it yet."

1. xAgent reads the files and understands the goal and constraints.
2. It selects the relevant Skills and Tools when needed instead of loading everything up front.
3. It analyzes the data, creates the report, and saves it to the workspace.
4. Because you said not to send it, it stops at the draft and does not send a message on its own.
5. After you approve the content, it can send the report, or save this workflow for reuse.

## What makes it different

- **Task-first:** The goal is a checkable result, not an endless conversation.
- **Works with real materials:** It can read, create, save, and revise files instead of only producing chat text.
- **Uses external capabilities:** It can call the right tool when a task needs a web page, spreadsheet operation, or external system.
- **Keeps work context:** You can refine a task in the same session and turn a stable workflow into a shared capability.
- **Keeps people in control:** Sending, deleting, overwriting, or changing external data can pause for approval.
- **Self-hostable:** The service, workspace, and model gateway can run in your own environment.
- **Turns experience into reusable capability:** After a task is complete, an employee can tell the AI, "Summarize this workflow as a Skill," and xAgent can help organize, test, and improve it. If it also needs a fixed role, prompt, and capability entry point, it can become a dedicated Agent for the team.

## How it compares

| | Typical chat assistant | Single-purpose bot | xAgent |
| --- | --- | --- | --- |
| Main use | Answer questions and generate text | Solve one fixed scenario | Combine several work capabilities around a task |
| Materials | Usually stays in the conversation | Depends on the product | Files, spreadsheets, web pages, and session materials can all be task inputs |
| Working style | You ask, it answers | Runs a preset flow | Continues in stages and adds the capabilities the task needs |
| Extensibility | Limited to built-in features | Often requires new development | Composes Skills, Tools, MCP, and Connectors |
| Results | Mostly text | A fixed scenario output | Answers, files, reports, and approved external actions |
| Team use | Mostly individual | Maintained by developers | Centrally configured and reused by a team |

In short: a chat assistant is mainly a question-and-answer window, a single-purpose bot is a fixed machine, and xAgent is a team workbench that can keep gaining useful capabilities.

## What it does not replace

xAgent understands tasks, organizes capabilities, and controls execution boundaries. It does not replace an organization's identity system, business permissions, backups, or audits. What an external system can access is still determined by the external account and the authorization configured for its Connector or MCP.

xAgent runs on the server, so each computer does not need a separate client. Debian Linux is recommended for stable, long-running deployments. macOS is xAgent's primary development environment and is also well supported. Windows currently lacks enough sandbox support to run managed scripts with the same safety and control, so it is not recommended as a deployment environment for now.

## Go deeper when you need to

This page keeps only the core ideas. The following pages carry the detailed usage and implementation guidance:

- [Agent Sessions: Tasks, Files, and Approvals](/docs/user-guide/agent-session)
- [Supported Agent Capabilities and Documents](/docs/manual/capabilities)
- [Create and Update Skills](/docs/getting-started/create-skill)
- [How Agents Discover and Load Tools and Skills on Demand](/docs/guides/ai-agent-dynamic-tool-discovery)
- [How Multiple Agents Collaborate Through Session Events](/docs/guides/multi-agent-session-event-collaboration)
- [Deploying an AI Agent on Your Own Server](/docs/guides/self-hosted-ai-agent)

## Who is it for?

xAgent is a good fit when work involves many materials, repeated discussion, tool calls, files, or multiple stages. Examples include research, report generation, meeting organization, contract review, data analysis, customer support, and project collaboration.

To try it, continue with:

- [Start Installing xAgent](/docs/getting-started/install)
- [Complete Your First Task](/docs/getting-started/first-task)
- [xAgent User Manual](/docs/manual/overview)
- [Supported Agent Capabilities](/docs/manual/capabilities)
- [Common Questions](/docs/faq/common)

## A plain-language glossary

| Term | Think of it as | What it does |
| --- | --- | --- |
| Agent | A work entry point | For example, a general assistant, contract reviewer, or weekly-report assistant |
| Skill | A method for doing a job | Describes when to use it, which steps to follow, and what a good result looks like |
| Tool / MCP | A concrete action or external capability interface | Reads files, writes spreadsheets, fetches pages, sends email, or connects to an external system |
| Connector | An entry point to the outside world | Connects WeChat, Telegram, Feishu, a browser, or an enterprise system |
| Workspace | A work cabinet | Stores uploaded materials, intermediate files, and final results |

Administrators prepare these capabilities centrally. Most users only need to describe the goal and the expected deliverable.
