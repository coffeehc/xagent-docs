---
title: "xAgent Long-running Tasks: Continuous Execution and Staged Delivery"
description: "Learn how to use xAgent for multi-step, long-running, and staged deliverable tasks, and follow them through sessions, files, confirmations, and events."
status: experimental
updated: 2026-10-03
---

# xAgent Long-running Tasks: Continuous Execution and Staged Delivery

> Status: Experimental. The page and its fields may change.

## Who This Is For {/* #who-this-is-for */}

This page is for users who need xAgent to handle multi-step, long-running, or staged deliverable work.

## What It Is {/* #what-it-is */}

A long-running task cannot be completed reliably in one short reply. It may require reading a large amount of material, working in stages, waiting for confirmation, calling external systems, generating multiple files, or following up over a longer period.

Ordinary users do not need to understand how the work is split internally. Clearly state the goal, materials, stages, and acceptance criteria.

xAgent runs tasks on the server and does not depend on a browser or personal computer remaining online. A submitted task can continue after the page closes, but completion still depends on the model, tools, external systems, available materials, and approval state.

Current versions calculate the compression trigger from full input and reserved output: the normal soft threshold is 90% of the model context window, tightened further when output reservation is large. The fixed 80% figure in earlier documentation no longer describes the current policy. The result preserves the current goal, progress, constraints, decisions, working facts, and artifact references for continuation. It is not long-term memory and cannot guarantee preservation of every historical detail.

## When to Use It {/* #when-to-use-it */}

These tasks are suitable for a long-running workflow:

- Researching multiple sources and producing a report.
- Analyzing a large set of files or data.
- Continuing to follow up with customers, email, or external events.
- Generating recurring outputs every day or week.
- Planning first, confirming, and then executing.
- Producing multiple intermediate results and a final deliverable.

Simple questions, short text rewrites, and a summary of one file usually do not need a long-running workflow.

For a complex long-running task, the main Agent may delegate part of the work to sub-agents. Ordinary users do not need to manage sub-agents manually. Use the original session to review staged results, add materials, and confirm important actions.

## How to Submit One {/* #how-to-submit-one */}

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

## Recommended Workflow {/* #recommended-workflow */}

### Ask xAgent for a Plan First {/* #ask-xagent-for-a-plan-first */}

For complex work, start with:

```text
Please list the processing plan first. Do not execute it yet.
```

Let xAgent continue after you confirm the plan.

### Review Each Stage {/* #review-each-stage */}

Do not wait until the end to inspect a long-running task. At each stage, check:

- Whether materials were read correctly.
- Whether the categorization makes sense.
- Whether the evidence is sufficient.
- Whether the output format meets requirements.
- Whether more materials are needed.

Correct a stage as soon as it goes off track to avoid rework later.

### Save Important Outputs {/* #save-important-outputs */}

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

## Handling Work While It Runs {/* #handling-work-while-it-runs */}

| Status | What to do |
| --- | --- |
| Waiting for more materials | Upload or describe them in the original session |
| Waiting for approval | Check the action, then approve or reject it |
| External connection failed | Check the connection status or provide the material manually |
| Intermediate result is wrong | Correct the requirement immediately |
| Task is too large | Reduce the scope or split it into stages |

Do not create several identical long-running tasks. Continue in the original session whenever possible.

After a service restart, xAgent attempts to resume sessions with valid running snapshots. A session waiting for approval remains waiting and does not bypass confirmation. Recovery does not guarantee lossless continuation of every external action; idempotency and duplicate-execution protection remain the responsibility of the corresponding tool and external service.

## Continuity Checklist {/* #continuity-checklist */}

After a stage transition, compression, restart, or child reply, check:

- The current goal and unmet acceptance requirements.
- The latest work-record summary, uncovered increments, and evidence references.
- Whether final files actually exist, open successfully, and contain the right result.
- Whether external actions are submitted, have an unknown effect, or have a verifiable completion receipt.
- Which Session owns the next step and whether user material or approval is missing.

Work records retain topics, revisions, and appended entries in the current Session; context summaries support continuation; long-term Memory reuses stable background. None means automatically remembering every historical detail.

For scheduled tasks, distinguish ending one business run from keeping the recurring Trigger enabled. In `v0.0.22.beta`, an unfinished or waiting run blocks the next run for the same Trigger. Waiting for feedback is not failure, and finishing a chat response does not automatically complete the business run. For A2A waits, check the original remote action so a late receipt is not mistaken for authorization in a new run.

See the [v0.0.22.beta release notes](https://github.com/coffeehc/xagent-releases/releases/tag/v0.0.22.beta) for work records, scheduled-run waits, and recovery, and [Triggers](/docs/user-guide/trigger#business-rounds) for operational boundaries.

## Recovery Checks After Restart or an External Result {/* #recovery-checks */}

Return to the original Session before recreating a task or repeating an external action:

1. Check the server version, original task message, last stage result, work records, and files. If the Session is archived, decide whether execution should resume; see [archive and restore](/docs/user-guide/agent-session#archive-and-restore).
2. Distinguish running, waiting for material, waiting for approval, and failure. Waiting does not mean a task was lost. Resolve the original wait; neither a timeout nor a restart replaces approval.
3. If an external outcome is unclear, query the original request or remote task first. Preserve the original action identity, planned time, and receipts so a late result is not treated as new work.
4. Retry only a step confirmed to be missing. Before writing or sending again, check whether the target system already applied the action, then continue within the original authorization.
5. Accept the result using real artifacts or target-system receipts before confirming the run complete. If it remains unresolved, give an administrator the version, Session identifier, occurrence time, and redacted error, never credentials.

When receiving external state, the first message and Session state change are persisted in one transaction. After restart, the service scans stored states to recover the work. This is not an exactly-once guarantee for external business actions. Business deduplication, idempotency keys, and completion acknowledgments (ACKs) require cooperation from the Tool and integrated system. A2A original-task queries, unknown-effect states, and late-result handling do not replace acceptance checks in the target system.

## Common Scenarios {/* #common-scenarios */}

### Weekly Report {/* #weekly-report */}

```text
Please organize this week's project materials. List missing information first, then generate a weekly report draft and save it as Markdown.
```

### Research Report {/* #research-report */}

```text
Please organize materials around this topic. Show a source list and analysis framework first, then create the full report after I confirm.
```

### Customer Follow-up {/* #customer-follow-up */}

```text
Please summarize customer messages from the past week. List items needing replies, at-risk customers, and suggested actions. Do not send messages automatically.
```

## Continue Reading {/* #continue-reading */}

- [Agent Session](/docs/user-guide/agent-session)
- [Agent Management](/docs/user-guide/agent-management)
- [Tasks](/docs/user-guide/task)
- [Workspace Files](/docs/user-guide/workspace)
- [Triggers](/docs/user-guide/trigger)
- [How AI Agents Run Long Tasks](/docs/guides/long-running-agent-task)

## Next Steps {/* #next-steps */}

- [Create a long-running task in Agent Session](/docs/user-guide/agent-session)
- [Describe the task goal and staged delivery](/docs/user-guide/task)
- [Review staged Workspace outputs](/docs/user-guide/workspace)
- [Use a Trigger to start a task automatically](/docs/user-guide/trigger)
