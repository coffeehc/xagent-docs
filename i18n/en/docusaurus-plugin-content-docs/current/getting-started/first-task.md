---
title: How to Complete Your First AI Agent Task with xAgent
description: Learn how to describe a task, provide source material, confirm tool actions, and review generated results through a clear, verifiable xAgent example.
status: stable
updated: 2026-07-14
---

# Complete Your First Task with xAgent

## Who This Is For

This page is for users who are ready to run their first real task in xAgent.

## What It Is

A task is the goal you want xAgent to complete. The first task does not need to be complex. It only needs a clear goal, clear input material, and an output format that you can judge.

xAgent is not only a chat box. A task may involve files, tools, confirmations, generated outputs, and follow-up changes in the same session.

## A Good First Task

Use this structure when you need a clear task description:

```text
Goal:
Input materials:
Required constraints:
Output format:
Result location:
```

You do not need to fill every field mechanically. The more complex the task is, the more useful it is to define the material scope, constraints, and deliverable format.

Start with something small and easy to verify:

```text
Please turn this requirement into a to-do list. Group items by Must / Should / Optional, and end with a Markdown table.
```

If the task uses files, upload the file first, then say which file should be processed:

```text
Please read the meeting notes I just uploaded. Extract decisions, action items, owners, due dates, and save the result as Markdown.
```

After submitting the task, watch for three things:

1. Whether xAgent asks for more information.
2. Whether a tool call or approval request needs your confirmation.
3. Whether the result is returned in the message, saved as a workspace file, or both.

If the result is close but not good enough, continue in the same session:

```text
Keep the original wording for key decisions, add a risk column, and save the final result as CSV.
```

## What to Include

A good first task usually includes:

| Item | Example |
| --- | --- |
| Goal | Summarize this document |
| Material | Use the file I just uploaded |
| Constraints | Keep evidence from the original text |
| Output | Save as Markdown and show me a short summary |

The clearer the input and output are, the easier it is for xAgent to complete the task without repeated clarification.

## Common Questions

### Is a task always split into many steps?

No. Simple tasks are usually completed directly. xAgent only needs staged execution when the task has many files, many steps, external actions, or human confirmations.

### Is one user message the same as one task?

No. A user message may start a new task, add material, revise requirements, or confirm an action in an existing task.

### When should I start a new session?

Start a new session when the goal becomes a different piece of work, or when you do not want the previous context to affect the next task. If you are still refining the same result, stay in the same session.

## Related Docs

- [Agent Session](/docs/user-guide/agent-session)
- [Tasks](/docs/user-guide/task)
- [Workspace Files](/docs/user-guide/workspace)
