---
title: "Virtual Teams: Managers, Members, and Archiving"
description: "Choose when to use an Agent Team, create a bounded task, inspect member handoffs and results, and recover from common blockers without confusing setup with completion."
status: stable
updated: 2026-10-24
---

# Virtual Teams: Managers, Members, and Archiving

Version scope: the team capabilities below were introduced in Server `v0.1.0`, following the [official release notes](https://github.com/coffeehc/xagent-releases/releases/tag/v0.1.0). The October 23 field test and the first-task exercise are separate evidence sources, linked below. Check your installed release; updating this guide does not establish that every team operation has been retested on `v0.1.1`. Earlier screenshots elsewhere in this manual may show older interfaces.

## When to use an Agent Team {/* #when-to-use-a-team */}

Use a team when one goal benefits from distinct responsibilities and inspectable handoffs, such as extracting supplied facts, editing a brief, and checking the result. A single person can own the team. A team is not a requirement for a short rewrite or a simple answer that one Session can handle.

Start with a bounded task whose inputs and acceptance criteria are clear. Independent member contexts help separate roles, but handoffs also require coordination. Do not assume more members mean lower cost or faster completion. The [Agent Teams field test](/blog/xagent-agent-teams-field-test) observed sequential research and editing, not parallel speedup.

## Try a first team task {/* #first-team-task */}

Already have an authorized instance? Follow the [source-to-brief exercise](/docs/getting-started/first-task#first-success-agent-team-brief). It supplies three facts, the exact goal, cost and capacity checks, and acceptance criteria. No file upload, web search, or external account is needed. Without an instance, have an administrator follow [installation and setup](/docs/getting-started/install).

This is a separate practice task, not a replay or a guarantee of the published field test. Model availability, capacity, permissions, and execution outcomes depend on the instance you use.

## Start a team {/* #start-team */}

1. Create a virtual team and initialize its dedicated manager.
2. Give the manager a goal, materials, boundaries, and acceptance criteria. Use role templates where appropriate and inspect the member Session tree.
3. Follow member chats and task results; use the owner guidance entry when clarification or a decision is needed. Managers can delegate to other managers, but delegation does not establish completion.
4. Review deliverables in the shared business directory and verify file references and previews before accepting the result.

Shared team materials do not grant access to unrelated users or external systems. Existing account permissions and approval rules still apply. WorkGroup configuration, Session execution, and remote A2A are distinct layers.

## Check the handoff and result {/* #check-the-result */}

Check three layers before accepting a result:

1. **Configuration:** the manager and expected members are visible. “Ready” establishes a team state, not task completion.
2. **Execution:** inspect each member Session to confirm the assignment arrived and the reply corresponds to that assignment. For dependent work, confirm the editor used the researcher's actual report.
3. **Result:** compare the manager's final answer with the inputs and member replies. For file tasks, open the actual files and verify their contents; a filename or attachment reference alone is insufficient. For the first brief exercise, inspect the text replies instead.

Record any stop, correction, failure, or extra action. The [field test's execution record](/blog/xagent-agent-teams-field-test) includes a wait-reference failure, an out-of-scope file, an invalid attachment, and human correction. Its final text output does not establish unattended reliability or successful file delivery.

## If the task stalls or drifts {/* #team-recovery */}

| Observation | Check or next step |
| --- | --- |
| Only a manager is visible, or the team says “Ready” | Submit a bounded goal and inspect actual member assignments; do not accept setup as execution. |
| Initialization continues without a concrete goal | Stop the current execution, wait for it to stop, then submit the bounded task. |
| A member cannot be recruited or a model cannot run | Check team/Session capacity, account permissions, and the configured model's Tool calling behavior. Connection testing alone is insufficient. |
| A wait or attachment reference fails | Inspect member replies and the current state before continuing. Do not repeat an action just because its receipt is unclear. Do not accept an unopenable file as delivery. |
| The manager proposes an extra goal, file operation, or archive action | Send explicit owner guidance or stop execution, then verify the guidance actually entered the Session and the resulting state matches your scope. |

Natural-language task constraints do not replace tool permissions or [approval policies](/docs/user-guide/approval-policy). Use non-sensitive inputs until your own checks pass. Recovery within the original team is described in the [first-task guide](/docs/getting-started/first-task#recover-in-the-same-team).

## Archive, restore, and continue {/* #archive-restore */}

Disbanding a team archives it as a whole and retains member relationships. Read archived material in read-only mode. Restoring the team and continuing execution use explicit entry points; do not assume restore resumes work automatically. Check the original goal and outstanding actions before continuing.

Long-unused Sessions can also be archived automatically. Use the ordinary, team, plugin, and archived navigation scopes to locate a Session that disappeared from the active list. This release note does not specify a universal inactivity threshold, so check the installed deployment rather than assuming one.

## Verify after upgrading {/* #verify-upgrade */}

With non-sensitive test data, check team creation, manager initialization, a member task, a shared output, archive/read-only review, restore, and explicit continuation. Verify behavior in your deployment; the release's build and integrity checks are not a complete business acceptance test.

See [Session operations](/docs/user-guide/agent-session), [collaboration semantics](/docs/guides/multi-agent-session-event-collaboration), and [approval policies](/docs/user-guide/approval-policy).
