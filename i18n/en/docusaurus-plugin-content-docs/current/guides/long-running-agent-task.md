---
title: "How AI Agents Run Long Tasks"
description: "Learn how xAgent runs multi-step work on the server and preserves continuity through structured context compression, approvals, session events, and recovery snapshots."
status: beta
updated: 2026-10-01
---

# How AI Agents Run Long Tasks

A long-running task is not simply a longer model response. The Agent may need to read materials, call tools, generate files, wait for approval, accept more input, and preserve task state across several execution stages.

## Why xAgent Runs on a Server {/* #why-xagent-runs-on-a-server */}

xAgent executes tasks in the server process and does not depend on a browser tab remaining open. A submitted task can continue after the user closes the page or turns off a personal computer. The user can later reopen the web UI or use an authenticated IM connector to inspect progress, add information, or handle approvals.

This does not guarantee unattended completion. Missing materials, model or tool failures, unavailable external systems, approvals, and service restarts can still pause or fail a task.

## How a Long Task Continues {/* #how-a-long-task-continues */}

A long task normally stays in one Agent session:

1. The user submits a goal, material scope, and deliverable requirements.
2. The session assembles prompts, history, Skills, Tools, secret references, workspace files, and memory into the current context.
3. The Agent calls the model and runs tools as needed.
4. Tool results return to the same execution loop, where the Agent decides whether to call another tool, produce an artifact, wait for the user, or finish the round.
5. External messages, triggers, and other sessions can deliver new work to the target session through session events.

The main Agent can also create sub-sessions for delegated work. Each sub-session has its own context and working directory, and returns its result through session collaboration.

## How Context Compression Preserves Continuity {/* #how-context-compression-preserves-continuity */}

For each model request, xAgent estimates the full input, including system prompts, history, and tool definitions, and accounts separately for reserved output. The normal soft threshold is 90% of the context window. The actual threshold is the smaller of that value and the window minus reserved output and a safety buffer. The buffer is 2% of the window, capped at 1000 tokens. Input above the threshold starts reclamation and compression attempts; cumulative token usage is not the trigger. The fixed 80% threshold in earlier documentation no longer describes the current policy.

Compression is not a generic chat summary. It produces a continuation checkpoint for the current session and preserves:

- The current goal and deliverable.
- Completed progress and next steps.
- Active constraints, decisions, and working facts.
- Open items.
- Key files and event references needed to continue.

Context compression is different from long-term memory. Compression keeps the current session executable; memory supports information reuse across a user's sessions.

Compression reduces context usage but cannot guarantee that every historical detail is preserved. Complex work should still use models with 100k or larger context windows and save critical requirements, data, and intermediate results as files.

## Work Records and Scheduled Business Runs {/* #work-records-and-scheduled-business-runs */}

Current main commit `43d2698`, checked on 2026-10-01, provides two separate continuity facts:

| Object | What it stores | What it cannot replace |
| --- | --- | --- |
| Session work record | `note` / `continuity` topics, immutable revisions, appended entries, source references, and summary coverage position | Original history, file artifacts, or acceptance of the outcome |
| Scheduled business run | `running` / `waiting` / `completed`, the original run reference, and exact wait correlation | Chat state, plan state, or arbitrary message arrival |

Work-record revisions use an expected revision to prevent stale content overwriting newer content. Summary coverage and subsequent increments are separate; continuation must read uncovered entries rather than relying only on an older summary. Archiving retains history and does not validate a conclusion.

An unfinished business run blocks the next run for the same Trigger. Waiting and completion are explicit transitions. User feedback or an A2A task from the same Session must be correlated precisely. An ordinary chat reply, unrelated A2A receipt, or obsolete wait generation cannot automatically release the current wait.

A completed original run that was bound to A2A actions can retain an immutable closure fact for late-result checks. This historical fact has no executable wait identity and must not reopen the old run or overwrite a new one. Its closure reason is not evidence that the remote action had no effect.

## What Happens While Waiting for Approval {/* #what-happens-while-waiting-for-approval */}

When a tool call matches an approval rule, the session enters `waiting_approval`. xAgent preserves the original tool call and resumes it after approval. A rejected operation does not execute.

## Can Work Continue After a Service Restart? {/* #can-work-continue-after-a-service-restart */}

xAgent saves runtime snapshots for recovery. The current recovery phase scans Sessions asynchronously after plugins finish starting. The earlier description of a roughly 30-second delay is not a fixed current recovery deadline:

- Sessions with a valid running snapshot can resume.
- Pending context compression is recovered or corrected first.
- Waiting states such as `waiting_approval` remain waiting and do not bypass user confirmation.
- An abnormal running state without a valid snapshot is not blindly resumed.

The precise statement is that xAgent supports recovery from valid snapshots. It does not guarantee that every interruption resumes losslessly at the exact instruction. Idempotency and duplicate-execution protection for external actions still depend on the tool and external service.

## The Boundary of Switching Models While Work Is Running {/* #the-boundary-of-switching-models-while-work-is-running */}

Users can update the session model without creating a new session or discarding history and files. However, an execution loop that is already running keeps the model selected for that loop. This avoids changing model behavior halfway through one model-and-tool cycle.

The new model is read by a later execution round. The current implementation therefore supports changing the model for subsequent work without rebuilding the session, not replacing the model inside an active request or tool loop.

## Improving Long-task Completion {/* #improving-long-task-completion */}

- State the goal, material scope, deliverable, and acceptance criteria in the first message.
- Ask for a plan before execution when the work is complex.
- Save critical data and intermediate results as files instead of leaving them only in history.
- Use a model with stable tool-calling support.
- Configure approvals for external sending, deletion, and sensitive data actions.
- Verify account permissions, connection state, and retry behavior before relying on external systems.

## Related Concepts {/* #related-concepts */}

- [Tasks](/docs/user-guide/task)
- [Workspace Files](/docs/user-guide/workspace)
- [Model Notes](/docs/deployment/model-requirements)
- [AgentPlugins](/docs/user-guide/connector)

## Next Steps {/* #next-steps */}

- [Create and Follow an Agent Session](/docs/user-guide/agent-session)
- [Organize Work as a Long-running Task](/docs/user-guide/long-task)
- [Configure Approval Policies](/docs/user-guide/approval-policy)
