---
title: "How to Complete Your First AI Agent Task with xAgent"
description: "Learn how to describe a task, provide source material, confirm tool actions, and review generated results through a clear, verifiable xAgent example."
status: stable
updated: 2026-10-01
---

# Complete Your First Task with xAgent

## Before You Start {/* #before-you-start */}

- Already have an xAgent account and service address? Sign in to the session surface; you do not need to install a server or create an Agent yourself.
- No service yet? Ask an administrator to complete [installation and setup](/docs/getting-started/install) and model validation.
- Prepare a small file without passwords, keys, or real sensitive information. The meeting case below is an exercise, not a claim of an executed business result.

## From Submission to Acceptance {/* #from-submission-to-acceptance */}

1. Open the session surface and choose an existing session or create a task session.
2. Paste your goal. For a file task, upload the material first and identify its filename or insert the reference supplied by the interface.
3. Watch messages and tool status after submission. Supply missing input when asked. For an approval, check the target, parameters, and impact before deciding.
4. Open the actual file preview, check its contents, and then download or revise it. A filename or a written “done” message does not establish that a file was saved.
5. Decide whether to share only after checking the result. This exercise needs no external account connection or relaxed approval rules.

## Basic Usage {/* #basic-usage */}

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

If the result does not meet expectations, continue in the same page with requirements such as "keep the original wording," "add a risk column," or "save the result as CSV."

## Complete Example: Organize Meeting Notes {/* #complete-example-organize-meeting-notes */}

### Input {/* #input */}

Upload a meeting record named `meeting-notes.md`. It contains discussion notes, decisions, owners, and timing requirements.

You can save this fictional input as that file:

```text
Example meeting: preparing a new-version test
Decision: release to test users first, then expand based on feedback.
Alex will compile the test issue list by July 18.
Release scope still needs confirmation; its owner and deadline are unknown.
Risk: some issues do not yet have reproduction steps.
```

### Task {/* #task */}

```text
Read meeting-notes.md and extract decisions, action items, owners, due dates, and risks.
Create a readable Markdown summary and also save the action items as CSV.
Mark unclear information as "Needs confirmation" instead of filling it in yourself.
```

### What to Check During Execution {/* #what-to-check-during-execution */}

1. xAgent reads the correct source file.
2. Confirmed owners and dates remain faithful to the source.
3. Missing information is labeled instead of guessed.
4. Both Markdown and CSV outputs are generated.

### Output {/* #output */}

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

## If You Get Stuck {/* #if-you-get-stuck */}

| Symptom | Check First | Continue Here |
| --- | --- | --- |
| Cannot send, or no model is available | Setup completion and the selected model | [Model Configuration](/docs/user-guide/model-config) |
| File cannot be found | Successful upload and access from this session | [Workspace Files](/docs/user-guide/workspace) |
| Still waiting for confirmation | Pending approval or missing user input | [Approval and Safety](/docs/guides/agent-approval-security) |
| Text answer exists but no file | Explicit save request and successful file write | [Tasks and Delivery](/docs/user-guide/task) |

## Related Docs {/* #related-docs */}

- [Tasks](/docs/user-guide/task)
- [Long-running Tasks](/docs/user-guide/long-task)
- [Workspace Files](/docs/user-guide/workspace)
