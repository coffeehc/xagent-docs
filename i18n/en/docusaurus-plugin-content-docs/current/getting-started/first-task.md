---
title: How to Complete Your First AI Agent Task with xAgent
description: Learn how to describe a task, provide source material, confirm tool actions, and review generated results through a clear, verifiable xAgent example.
status: stable
updated: 2026-07-14
---

# Complete Your First Task with xAgent

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

## Complete Example: Organize Meeting Notes

### Input

Upload a meeting record named `meeting-notes.md`. It contains discussion notes, decisions, owners, and timing requirements.

### Task

```text
Read meeting-notes.md and extract decisions, action items, owners, due dates, and risks.
Create a readable Markdown summary and also save the action items as CSV.
Mark unclear information as "Needs confirmation" instead of filling it in yourself.
```

### What to Check During Execution

1. xAgent reads the correct source file.
2. Confirmed owners and dates remain faithful to the source.
3. Missing information is labeled instead of guessed.
4. Both Markdown and CSV outputs are generated.

### Output

The workspace can contain:

```text
meeting-summary.md
meeting-actions.csv
```

`meeting-summary.md` may include:

```markdown
## Decisions

- Release the new version to test users first, then expand based on feedback.

## Action Items

| Action | Owner | Due date | Risk |
| --- | --- | --- | --- |
| Organize the test issue list | Alex | July 18 | Some issues do not have reproduction steps |
| Confirm the release scope | Needs confirmation | Needs confirmation | An owner must provide more information |
```

The acceptance criteria are clear: the correct source was used, key information is traceable, missing details were not invented, and both output files were saved.

## What to Include

A good first task usually includes:

| Item | Example |
| --- | --- |
| Goal | Summarize this document |
| Material | Use the file I just uploaded |
| Constraints | Keep evidence from the original text |
| Output | Save as Markdown and show me a short summary |

The clearer the input and output are, the easier it is for xAgent to complete the task without repeated clarification.

## Related Docs

- [Agent Session](/docs/user-guide/agent-session)
- [Tasks](/docs/user-guide/task)
- [Workspace Files](/docs/user-guide/workspace)
