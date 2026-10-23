---
title: "How to Complete Your First AI Agent Task with xAgent"
description: "Learn how to describe a task, provide source material, confirm tool actions, and review generated results through a clear, verifiable xAgent example."
status: stable
updated: 2026-10-23
---

# Complete Your First Task with xAgent

## Before You Start {/* #before-you-start */}

- Already have an xAgent account and service address? Sign in to the session surface; you do not need to install a server or create an Agent yourself.
- No service yet? Ask an administrator to complete [installation and setup](/docs/getting-started/install) and model validation.
- Prepare a small file without passwords, keys, or real sensitive information. The meeting case below is an exercise, not a claim of an executed business result.

## First Success: A Source Brief with an Agent Team {/* #first-success-agent-team-brief */}

Turn supplied facts into a checkable English brief: a researcher extracts the facts, an editor uses that report, and a manager checks the result. No web search, external connection, file upload, or extra Skill is needed. One person can lead this team.

### Prerequisites and Cost {/* #team-prerequisites-and-cost */}

Use an existing instance you are authorized to access. The [public demo](https://xagent.51apis.com) is an entry point to check, without guaranteed access, model availability or capacity; do not submit private material. Otherwise ask an administrator to follow the [installation guide](/docs/getting-started/install). No desktop client or browser extension is required for this exercise.

The public Server release at this review date is `v0.1.1`; check your actual installed version. Configure a chat model that supports Tool calling using [model configuration](/docs/user-guide/model-config#test-the-connection). A successful connection test does not verify Tool calling; the actual assignments below provide a separate check.

The Free edition currently allows one WorkGroup per deployment and 30 active, unarchived Sessions of all kinds. This exercise needs a manager and two member Sessions. Reuse an empty test team you own if capacity is occupied; do not archive other work to make space. See [edition limits](/docs/faq/common#what-is-the-difference-between-the-commercial-and-free-editions).

Provider charges can include initialization, context sent on later calls and retries. The free binary does not include free model usage. Choose a model and spending limit you have approved, observe usage, and stop at your limit. A natural-language instruction is not a billing cap.

### Create the Team and Submit the Goal {/* #create-the-team-and-submit-the-goal */}

1. Choose **New team** (`新团队` in the Chinese UI), and name it `First success`.
2. Set responsibilities to: `Coordinate one English source-to-brief exercise using only facts supplied in the goal. Wait for the goal. No publishing, external systems, recurring work, or unrelated sessions. Deliver once, then remain idle.`
3. Open the manager session. Creation may automatically start a requirements review. If it keeps running without a concrete goal, use **Stop current execution** (`终止当前执行`), wait for the stop to finish, then submit the task. A ready team with one manager is configuration, not task completion.
4. Confirm the selected model, then paste the complete task:

```text
Complete one bounded English source-to-brief exercise.
Use ONLY these supplied facts:
F1: Creating a team initializes a dedicated manager.
F2: Concrete goals are supplied after creation; members are recruited as needed.
F3: The owner can guide the manager and inspect member sessions.

Recruit exactly two members: Researcher and Editor. Give each at most one assignment.
Researcher: return a three-row table of Fact ID and supported fact, without adding claims.
After receiving that report, Editor: write an English brief of at most 90 words
using [F1], [F2], [F3], followed by one sentence stating that this exercise does
not measure speed, cost, or unattended reliability.
Manager: verify both member replies against F1-F3, return the final brief and a
three-item acceptance checklist, then remain idle.

Use only team coordination and status tools. Do not use files, shell, web,
other sessions, external services, publishing, schedules, persistent plans,
extra goals or archival. If blocked, report the blocker instead of retrying
blindly. Do not claim completion until both member replies and the final
text are inspectable.
```

These instructions do not replace Tool permissions or approval policies.

### Inspect and Accept the Result {/* #inspect-and-accept-the-result */}

- Open Researcher in the team tree. Verify the received assignment and actual three-row report against F1–F3. A send receipt alone is insufficient.
- Open Editor. Verify that editing followed the research report, the brief contains all three fact references, and no extra capability claims were introduced.
- Return to the manager. Compare the final brief with both replies; independently check the 90-word body limit, separate limitation sentence, and three acceptance checks. Confirm execution stops without another goal.

All three checks must pass. Installation, team creation, “ready,” or a manager's promise does not count as first success. This staged exercise does not measure parallel speedup or unattended reliability.

### Recover in the Same Team {/* #recover-in-the-same-team */}

| Symptom | Next action |
| --- | --- |
| Model missing or connection fails | Check Provider type, model ID, Base URL, credentials and server reachability. Since `v0.1.1`, saving tests the connection, but a failed configuration can still be saved. |
| Team/member creation fails | Check WorkGroup and Session capacity and account permissions; reuse an existing empty test team where appropriate. |
| Manager idle while a member runs | Inspect the member's received assignment and report; do not recreate the team or resend the task blindly. |
| Member error or invalid wait/reference | Keep the original assignment. Ask the manager to inspect existing reports and explain the blocker. An invalid reference does not prove the work never ran. |
| Unexpected file, external action or extra goal | Stop the affected execution, inspect Tool records and actual effects, then give a narrow correction in the same manager session. Stopping does not undo completed effects. |
| Incomplete result or wrong language | Request the missing result or English final delivery using the existing reports; record this as human intervention. |

The [published field test](/blog/xagent-agent-teams-field-test) contains real screenshots, human corrections and failed references from a separate Chinese-language task. Do not combine its results with your run. For file delivery next, use the meeting exercise below and inspect the actual files.

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
