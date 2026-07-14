---
title: How AI Agents Run Long Tasks
description: Learn how xAgent runs multi-step work on the server and preserves continuity through structured context compression, approvals, session events, and recovery snapshots.
status: beta
updated: 2026-07-14
---

# How AI Agents Run Long Tasks

A long-running task is not simply a longer model response. The Agent may need to read materials, call tools, generate files, wait for approval, accept more input, and preserve task state across several execution stages.

## Why xAgent Runs on a Server

xAgent executes tasks in the server process and does not depend on a browser tab remaining open. A submitted task can continue after the user closes the page or turns off a personal computer. The user can later reopen the web UI or use an authenticated IM connector to inspect progress, add information, or handle approvals.

This does not guarantee unattended completion. Missing materials, model or tool failures, unavailable external systems, approvals, and service restarts can still pause or fail a task.

## How a Long Task Continues

A long task normally stays in one Agent session:

1. The user submits a goal, material scope, and deliverable requirements.
2. The session assembles prompts, history, Skills, Tools, secret references, workspace files, and memory into the current context.
3. The Agent calls the model and runs tools as needed.
4. Tool results return to the same execution loop, where the Agent decides whether to call another tool, produce an artifact, wait for the user, or finish the round.
5. External messages, triggers, and other sessions can deliver new work to the target session through session events.

The main Agent can also create sub-sessions for delegated work. Each sub-session has its own context and working directory, and returns its result through session collaboration.

## How Context Compression Preserves Continuity

For each model request, xAgent estimates the full request size, including system prompts, history, tool definitions, and reserved completion space. When the estimate exceeds 80% of the model's maximum context window, xAgent triggers context compression.

Compression is not a generic chat summary. It produces a continuation checkpoint for the current session and preserves:

- The current goal and deliverable.
- Completed progress and next steps.
- Active constraints, decisions, and working facts.
- Open items.
- Key files and event references needed to continue.

Context compression is different from long-term memory. Compression keeps the current session executable; memory supports information reuse across a user's sessions.

Compression reduces context usage but cannot guarantee that every historical detail is preserved. Complex work should still use models with 100k or larger context windows and save critical requirements, data, and intermediate results as files.

## What Happens While Waiting for Approval

When a tool call matches an approval rule, the session enters `waiting_approval`. xAgent preserves the original tool call and resumes it after approval. A rejected operation does not execute.

## Can Work Continue After a Service Restart?

xAgent persists recovery snapshots. After startup, Brain waits about 30 seconds and scans sessions:

- Sessions with a valid running snapshot can resume.
- Pending context compression is recovered or corrected first.
- Waiting states such as `waiting_approval` remain waiting and do not bypass user confirmation.
- An abnormal running state without a valid snapshot is not blindly resumed.

The precise statement is that xAgent supports recovery from valid snapshots. It does not guarantee that every interruption resumes losslessly at the exact instruction. Idempotency and duplicate-execution protection for external actions still depend on the tool and external service.

## The Boundary of Switching Models While Work Is Running

Users can update the session model without creating a new session or discarding history and files. However, an execution loop that is already running keeps the model selected for that loop. This avoids changing model behavior halfway through one model-and-tool cycle.

The new model is read by a later execution round. The current implementation therefore supports changing the model for subsequent work without rebuilding the session, not replacing the model inside an active request or tool loop.

## Improving Long-task Completion

- State the goal, material scope, deliverable, and acceptance criteria in the first message.
- Ask for a plan before execution when the work is complex.
- Save critical data and intermediate results as files instead of leaving them only in history.
- Use a model with stable tool-calling support.
- Configure approvals for external sending, deletion, and sensitive data actions.
- Verify account permissions, connection state, and retry behavior before relying on external systems.

## Related Concepts

- [Tasks](/docs/user-guide/task)
- [Workspace Files](/docs/user-guide/workspace)
- [Model Notes](/docs/deployment/model-requirements)
- [Connectors](/docs/user-guide/connector)

## Next Steps

- [Create and Follow an Agent Session](/docs/user-guide/agent-session)
- [Organize Work as a Long-running Task](/docs/user-guide/long-task)
- [Configure Approval Policies](/docs/user-guide/approval-policy)
