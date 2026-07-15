---
title: "xAgent Agent Sessions: Tasks, Files, and Approvals"
description: Learn how to submit tasks, upload files, follow execution, handle approvals, use sub-agents, and refine work in xAgent Agent Sessions.
status: stable
updated: 2026-07-15
---

# xAgent Agent Sessions: Tasks, Files, and Approvals

## Who This Is For

This page is for users who submit tasks, watch progress, provide materials, and collect results in xAgent every day.

## What It Is

Agent Session is the main work page in xAgent. You can think of it as the place where you work with a work assistant: enter requirements, upload materials, watch execution, confirm risky actions, and keep refining the result.

It is not a normal chat window. It also handles task submission, context continuation, tool execution, file processing, approvals, sub-session collaboration, and task tuning.

![xAgent Agent Session page showing the session list, task execution, and message input](/img/manual/xagent-agent-session.png)

## When to Use It

Start from Agent Session when you want xAgent to:

- Read documents, web pages, spreadsheets, or other materials.
- Generate summaries, reports, checklists, replies, plans, or data outputs.
- Continue through multiple rounds of discussion.
- Upload files, inspect generated files, or reuse session outputs.
- View tool execution and final results.
- Confirm actions before they continue.
- Split work into sub-sessions or return to the main session for summary.
- Tune prompts, Skills, Tools, models, or keys during the task.

## Page Layout

| Area | Purpose |
| --- | --- |
| Left session list | Switch between main sessions and sub-sessions |
| Top toolbar | View token usage, context, tool-call count, tool display switch, advanced settings, and session files |
| Timeline | Read user messages, xAgent replies, reasoning traces, tool calls, approvals, and status updates |
| Bottom input area | Send more instructions, upload attachments, or stop execution |
| Session files panel | Preview or download files related to the current session |
| Advanced settings | Tune the current session's prompt, model policy, keys, resident Skills, and resident Tools |

Most users only need the session list, timeline, and input area. Advanced users can use advanced settings when a task needs higher quality or special capability routing.

## Main Session and Sub-session

| Type | Meaning | Best for |
| --- | --- | --- |
| Main session | The coordinator | Discussing the overall goal, splitting work, creating sub-sessions, and summarizing progress |
| Sub-session | A focused executor | Handling a specific task such as scheduled collection, research, email checking, or a dedicated report |

Both main sessions and sub-sessions can receive messages. The main session is better for coordination; sub-sessions are better for independent objectives.

When you enter a sub-session, the top bar may show a **Back to main session** button.

## Basic Usage

1. Open **Agent Session** from the left menu.
2. Select an existing session, or start a new task.
3. Describe what should be completed.
4. If files are needed, upload them first and then say which file to process.
5. Watch the timeline for questions, tool calls, approvals, and outputs.

A good first message includes goal, material, constraints, and output:

```text
Please read the meeting.md file I just uploaded. Extract decisions, action items, owners, and risks. Save the result as Markdown and show me a short summary in the session.
```

## Reading the Timeline

| Item | Meaning | What you should do |
| --- | --- | --- |
| User message | Your task, supplement, or attachment | Check whether the goal and material are clear |
| xAgent reply | Explanation, result, or stage conclusion | Read it and continue asking or confirming |
| Reasoning trace | Task planning or execution approach | Use it as process reference |
| Tool call | File reading, web access, report generation, external call, etc. | Wait or inspect details when needed |
| Tool observation | Result returned by a tool | Ordinary users usually only need the final organized result |
| Approval required | A risky action needs human confirmation | Check the action, target, and effect before allowing it |
| Confirmation required | More fields, choices, or decisions are needed | Provide the required information |
| Status update | Running, retrying, compressing context, reconnecting, etc. | Know whether to wait or continue |
| Failure message | A step failed | Add material, authorize access, adjust the request, or retry |

The top toolbar has a **Show Tool Calls** switch. Turn it off for cleaner reading, or on when you need to inspect what happened.

## Input and Attachments

Use the bottom input area to:

- Enter a task goal.
- Upload files or images.
- Paste screenshots, text, or files.
- Add instructions while a task is running.
- Stop execution when necessary.

When using files, refer to names or workspace paths visible in the UI:

```text
Please process the file I just uploaded.
Please save the result as summary.md.
Please generate an HTML report and give me a preview link.
```

Do not use arbitrary local computer paths or server internal paths as if xAgent can access them.

## Tool Calls and Approvals

xAgent may call tools to read/write files, fetch web pages, process spreadsheets, send messages, call connectors, or create sub-sessions.

You do not need to remember tool names. Describe the action you want. If the action is risky, xAgent can stop for approval or confirmation.

Pay attention to approvals for:

- Sending email, WeChat, or other external messages.
- Deleting files or changing important data.
- Accessing external systems or internal APIs.
- Creating sub-sessions or long-term triggers.
- Using keys, connectors, or high-risk tools.

If you are unsure, reject the approval and explain what should change in the session.

## Advanced Settings and Task Tuning

Advanced settings are optional. They are useful when experienced users want to improve the current task.

| Setting | Use |
| --- | --- |
| Agent Prompt | Adjust the current session's role, boundaries, and output style |
| Model / Provider Policy | Choose a better model or request strategy for the current task |
| Keys | Select which secret keys this session may reference |
| Resident Skills | Keep certain Skills in the context for long tasks |
| Resident Tools | Keep certain Tools available for long-running tasks |

Only key names are selected here. Actual secret values are not sent to the model or message history.

Task tuning does not mean training a model. It means adjusting the current task's goal, context, model, Skills, Tools, or keys so the current result becomes better.

## Context and Long Sessions

The top bar shows context and token information. Ordinary users do not need to understand every number, but should know:

- Longer sessions require more context management.
- xAgent may compress context.
- Some operations may be temporarily frozen during compression.
- After compression, execution can continue.

If a session has become very long, ask xAgent to summarize the current state before continuing.

## Common Examples

```text
Please read the three uploaded files, extract common conclusions, disagreements, and open questions, and output a Markdown table.
```

```text
Please generate a weekly report from the sales data in the workspace. Include key metrics, anomalies, possible reasons, and next-week suggestions. Save it as an HTML report.
```

```text
Please check the latest customer message and draft a reply. Do not send it directly.
```

```text
Please list the plan first. Wait for my confirmation before reading files and generating outputs.
```

## Related Concepts

- [Shortcut Protocol: Commands, Targets, and References](/docs/guides/shortcut-instruction-protocol)
- [How AI Agents Switch Models, Skills, and Prompts During a Task](/docs/guides/ai-agent-runtime-hot-switching)
- [How Multiple AI Agents Collaborate Through Session Events](/docs/guides/multi-agent-session-event-collaboration)

## Next Steps

- [Complete your first task](/docs/getting-started/first-task)
- [Shortcut Instructions](/docs/user-guide/shortcut-instructions)
- [Tasks](/docs/user-guide/task)
- [Workspace Files](/docs/user-guide/workspace)
- [Tool Management](/docs/user-guide/tool)
- [Approval Policies](/docs/user-guide/approval-policy)
