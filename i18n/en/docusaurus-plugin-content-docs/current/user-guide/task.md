---
title: "xAgent Tasks: Goals, Materials, and Acceptance Criteria"
description: Learn how to describe task goals, input materials, constraints, and acceptance criteria to xAgent, then refine the work as it runs.
status: stable
updated: 2026-07-15
---

# xAgent Tasks: Goals, Materials, and Acceptance Criteria

## Who This Is For

This page is for ordinary users who want xAgent to complete work more reliably.

## What It Is

A task is a piece of work you want xAgent to complete. It can be one simple request or a complex job that needs files, Tools, confirmation, and multiple rounds of communication.

You do not need to learn models, Tools, or internal concepts before using xAgent. Clearly state what to do, where the materials are, and what the result should look like.

## When to Use It

Submit a task whenever you want xAgent to complete something with a clear outcome, for example:

- Read and summarize a file.
- Organize meeting notes.
- Generate a report, table, or checklist.
- Check materials for problems.
- Draft a reply based on an external message.
- Run a recurring piece of work on a schedule.

## Check Before Submitting

Confirm these four things before you submit:

| Check | Meaning |
| --- | --- |
| Goal | What you expect xAgent to deliver at the end |
| Materials | Whether files, links, background, and data have been provided |
| Scope | What should and should not be processed |
| Result | Whether to reply directly, save a file, produce a table, or generate a report |

When a task involves sending, deleting, or accessing an external system, add: “Ask me for confirmation first. Do not execute it directly.”

## Basic Format

Use this structure:

```text
Based on [materials], complete [goal].
Requirements:
1. The processing scope is [scope].
2. The output format is [format].
3. Ask me for confirmation before sending, deleting, or calling an external system.
```

Example:

```text
Please read the customer interview records I just uploaded and organize the main problems and opportunities customers mentioned.
Requirements:
1. Output a table with “problem / evidence / impact / suggested action”.
2. Keep key evidence from the original text.
3. Save the final result as a Markdown file.
```

## Common Task Templates

### Organize Meeting Notes

```text
Please read the meeting notes I uploaded. Organize conclusions, action items, owners, due dates, and risks in a Markdown table.
```

### Analyze a Spreadsheet

```text
Please analyze sales.csv in the workspace. Find the 10 metrics that changed the most this week, explain possible causes, and generate a short report.
```

### Draft a Reply

```text
Please draft a reply based on the latest customer message. Show me a draft first and do not send it directly.
```

### Generate a Report

```text
Please create an HTML report from the materials I uploaded, including a summary, key findings, evidence, and recommended next steps.
```

### Plan Before Execution

```text
Please list the processing plan first, including which materials you need to read and what outputs you will generate. Wait for my confirmation before continuing.
```

## Reading Task Progress

After submitting a task, focus on these states:

| What the page shows | Meaning | What to do |
| --- | --- | --- |
| Direct reply | A result or staged result is ready | Check whether it meets the requirement |
| Request for more information | The goal or material is unclear | Add details in the same session |
| Tool call | xAgent is reading, generating, querying, or sending | Wait for completion or confirm when prompted |
| Waiting for approval | An action is risky and needs human confirmation | Check the impact before deciding |
| Execution failed | A step did not complete | Adjust the task based on the error message |

Do not submit the exact same task repeatedly. Add instructions in the original session instead, so xAgent does not generate duplicate results.

## Accept the Result

When the result is ready, check:

- Whether the original goal was completed.
- Whether the specified materials were used.
- Whether scope constraints were followed.
- Whether the requested format was produced.
- Whether the result was saved to the workspace.
- Whether there are external actions that still need confirmation.
- Whether evidence, sources, or key fields are missing.

When the result is not satisfactory, give a concrete revision request. For example: “add an evidence column,” “remove speculative content,” “sort by priority,” or “save it as CSV.”

## Common Mistakes

| Wording | Problem | Better wording |
| --- | --- | --- |
| Handle this | The goal is unclear | Summarize this document's conclusions and action items |
| See if there are problems | The acceptance criteria are unclear | Identify payment, delivery, and breach risks in this contract |
| Send it to the customer | The risky action is unclear | Draft a customer reply first and send it only after I confirm |
| Use the previous approach | A new session may lack the context | Briefly restate the rules to retain |
| Analyze everything | The scope is too broad | Analyze the most recent 30 days and output the top 10 anomalies |

## Common Questions

### Must a task be completed in one go?

No. Complex tasks can move forward in stages. You can ask xAgent to show a plan first and execute after confirmation.

### Is a task the same as a Tool call?

No. Tools are only a means to complete a task. Ordinary users do not need to specify Tool names; state the action you want completed.

### When should I split a task?

Split it when there is a lot of material, complex steps, a need to wait for an external result, or multiple confirmations.

### Can xAgent save results automatically?

Yes. State the format explicitly, such as “save as a Markdown / CSV / HTML report.”

## Continue Reading

- [Agent Session](/docs/user-guide/agent-session)
- [Workspace Files](/docs/user-guide/workspace)
- [Long-running Tasks](/docs/user-guide/long-task)
- [Triggers](/docs/user-guide/trigger)

## Next Steps

- [Submit a task in Agent Session](/docs/user-guide/agent-session)
- [Prepare Workspace materials](/docs/user-guide/workspace)
- [Create a scheduled or event-driven Trigger](/docs/user-guide/trigger)
