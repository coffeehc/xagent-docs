---
title: xAgent Long-running Tasks
description: Learn how to use xAgent for multi-step, long-running, and staged deliverable tasks, and follow them through sessions, files, confirmations, and events.
status: experimental
updated: 2026-07-11
---

# xAgent Long-running Tasks

> Status: Experimental. The page and its fields may change.

## Who This Is For

This page is for users who need xAgent to handle multi-step, long-running, or staged deliverable work.

## What It Is

A long-running task cannot be completed reliably in one short reply. It may require reading a large amount of material, working in stages, waiting for confirmation, calling external systems, generating multiple files, or following up over a longer period.

Ordinary users do not need to understand how the work is split internally. Clearly state the goal, materials, stages, and acceptance criteria.

## When to Use It

These tasks are suitable for a long-running workflow:

- Researching multiple sources and producing a report.
- Analyzing a large set of files or data.
- Continuing to follow up with customers, email, or external events.
- Generating recurring outputs every day or week.
- Planning first, confirming, and then executing.
- Producing multiple intermediate results and a final deliverable.

Simple questions, short text rewrites, and a summary of one file usually do not need a long-running workflow.

For a complex long-running task, the main Agent may delegate part of the work to sub-agents. Ordinary users do not need to manage sub-agents manually. Use the original session to review staged results, add materials, and confirm important actions.

## How to Submit One

The first message of a long-running task should include:

| Content | Example |
| --- | --- |
| Final goal | Create a customer feedback analysis report |
| Material scope | Use the five interview records I uploaded |
| Stages | Show a plan first, then analyze after confirmation |
| Intermediate result | Show topic categories and evidence first |
| Final deliverable | Generate an HTML report |
| Confirmation point | Require confirmation before external sending or deletion |

Example:

```text
Please analyze the five interview records I uploaded to identify user needs.
Show a processing plan first. After I confirm it, extract themes, evidence, and opportunities.
Finally, generate an HTML report and keep the original evidence in an appendix.
```

## Recommended Workflow

### Ask xAgent for a Plan First

For complex work, start with:

```text
Please list the processing plan first. Do not execute it yet.
```

Let xAgent continue after you confirm the plan.

### Review Each Stage

Do not wait until the end to inspect a long-running task. At each stage, check:

- Whether materials were read correctly.
- Whether the categorization makes sense.
- Whether the evidence is sufficient.
- Whether the output format meets requirements.
- Whether more materials are needed.

Correct a stage as soon as it goes off track to avoid rework later.

### Save Important Outputs

Long-running tasks can produce several results. Explicitly ask xAgent to save:

- The staged plan.
- Data-cleaning results.
- Intermediate analysis tables.
- The final report.
- An evidence list.

Example:

```text
Please save the intermediate analysis table as CSV and the final report as HTML.
```

## Handling Work While It Runs

| Status | What to do |
| --- | --- |
| Waiting for more materials | Upload or describe them in the original session |
| Waiting for approval | Check the action, then approve or reject it |
| External connection failed | Check the connection status or provide the material manually |
| Intermediate result is wrong | Correct the requirement immediately |
| Task is too large | Reduce the scope or split it into stages |

Do not create several identical long-running tasks. Continue in the original session whenever possible.

## Common Scenarios

### Weekly Report

```text
Please organize this week's project materials. List missing information first, then generate a weekly report draft and save it as Markdown.
```

### Research Report

```text
Please organize materials around this topic. Show a source list and analysis framework first, then create the full report after I confirm.
```

### Customer Follow-up

```text
Please summarize customer messages from the past week. List items needing replies, at-risk customers, and suggested actions. Do not send messages automatically.
```

## Common Questions

### Will xAgent split a long-running task automatically?

Not always. Ask it to list a plan and wait for confirmation before continuing when you need more control over the process.

### Where can I see long-running task status?

Start with the original [Agent Session](/docs/user-guide/agent-session). Generated files are usually available in [Workspace Files](/docs/user-guide/workspace).

### Can I change direction midway through?

Yes. State which results to keep and which to discard. For example: “Keep the topic categories, but change the report structure to an executive briefing.”

### Why are there no command examples?

Ordinary users submit long-running tasks through the web interface. Underlying APIs and internal organization are not the main focus of this user manual.

## Continue Reading

- [Agent Session](/docs/user-guide/agent-session)
- [Agent Management](/docs/user-guide/agent-management)
- [Tasks](/docs/user-guide/task)
- [Workspace Files](/docs/user-guide/workspace)
- [Triggers](/docs/user-guide/trigger)
