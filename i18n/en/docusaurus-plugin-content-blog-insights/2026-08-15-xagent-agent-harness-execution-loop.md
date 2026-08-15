---
slug: xagent-agent-harness-execution-loop
title: "Inside the xAgent Agent Harness, Part 2: How Tasks Run, Pause, and Resume"
date: 2026-08-15
description: "Compare the DeepSeek Harness Agent Loop with xAgent's inner execution loop: one Session runner, dynamic context, Tools, approvals, compression, and recovery."
authors: [xagent]
tags: [ai-agent, architecture, runtime, approvals, long-running]
image: /img/share/en/xagent-overview.png
---

After task goals and the capability environment are aligned, xAgent enters what is usually called the Agent Loop. This loop is not a model process running alone until it finishes. Brain controls Session-level scheduling, SessionEngine owns runtime state and assembles every request, and AgentService owns only the fixed model and Tool execution flow.

This division allows one task to continue after a Tool Call, wait before a high-impact action, compress a growing context, exit when the user interrupts it, and resume after a service restart when valid recovery material exists.

{/* truncate */}

## The DeepSeek Harness Agent Loop and xAgent's Inner Loop

In the [official DeepSeek Harness architecture](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md), a Turn contains zero or more Steps, and each Step covers a model request and its Tool execution. The loop assembles the Prompt and Tool schemas, calls the model, runs the Tool pipeline, and appends the resulting events to the Session log. This is why searches for `DeepSeek Harness agent loop` and `DeepSeek Harness tool loop` point to the same runtime question: after a model returns a Tool Call, how are durable facts preserved so the next Step can start reliably?

xAgent's inner loop follows a similar principle while using different execution units and fact owners:

| Dimension | DeepSeek Harness | xAgent |
| --- | --- | --- |
| Execution unit | A Turn contains one or more model-and-Tool Steps | Brain drives a Session task turn while AgentService runs the fixed LLM / Tool loop |
| Durable history | An append-only Session event log supplies later context | SessionEngine commits History, pending state, checkpoints, and recovery material |
| After a Tool | The Tool pipeline runs and appends result events | A committed Tool result triggers assembly of the next model request |
| Extension boundary | Plugins can replace model, Tool, Session, and Agent Loop components | Brain, SessionEngine, AgentService, and Tool fact owners divide responsibilities |

The shared principle matters more than a specific API: one model response is not a Harness, and one successful Tool Call is not task completion. The Harness must own deterministic boundaries for the loop, context, and continuation. DeepSeek Harness currently exposes these plugin contracts as an [open-source developer preview](https://github.com/deepseek-ai/deepseek-harness); the rest of this article describes execution, waiting, compression, and recovery in xAgent's current implementation.

## The Outer Task Loop and Inner Execution Loop

The previous article, [Inside the xAgent Agent Harness, Part 1: How Sessions Understand Task Changes](/insights/xagent-agent-harness-task-alignment), introduced the outer task-control loop. It determines which task phase owns the current message and whether Skills and Tools need to change.

The inner execution loop starts from that aligned task state:

```text
Brain schedules the current Session
  -> SessionEngine assembles the model request
  -> AgentService calls the model
  -> The model returns text or a Tool Call
  -> Execute, govern, or suspend the Tool Call
  -> SessionEngine commits assistant / tool history
  -> Reassemble the next model request
  -> Final response, waiting, interruption, or failure
```

The two loops cannot be collapsed into one. Task control needs stable goals, responsibility routing, and a capability environment. The model and Tool loop consumes the execution context already prepared for it. Otherwise, each Tool result could be mistaken for a new task input, while each user refinement could bypass task-state evaluation.

## One Session Has One Runner

User messages, Connector events, Session collaboration inputs, and approval decisions can arrive close together. xAgent does not allow them to modify one Session's runtime state concurrently. Brain acquires the single runner through SessionEngine, then advances the current input, pending state, events, and guidance serially.

| Owner | Responsibility in the execution path | What it does not own |
| --- | --- | --- |
| Brain | Input scheduling, the single runner, continued draining, recovery, and interruption boundaries | It does not build model requests or write Tool business facts |
| SessionEngine | Queues, task goals, runtime status, history, context assembly, pending state, and recovery material | It does not call the business model directly |
| AgentService | The fixed LLM / Tool loop, model retries, loop guard, and Tool-result progression | It does not own waiting facts across requests |

If another input arrives while the runner is being released, SessionEngine records a wake request. Brain reacquires the runner when executable work remains, preventing a continuation opportunity from being lost during the old runner's exit window. Ordinary concurrent input is therefore queued instead of failing with “Session busy, try again.”

## Context Is Reassembled for Every Model Call

AgentService does not keep a private History or SessionMeta that it modifies over time. Before each model call, it asks SessionEngine to assemble a request from current facts, including:

- the current task and execution goals;
- usable Session history or compressed continuation state;
- currently loaded Skills, Tool schemas, and calling boundaries;
- Memory, resource references, attachments, and Workspace context;
- the current model configuration, Prompt, and runtime policy.

After a Tool result is committed, the next model call goes through SessionEngine assembly again. The latest Tool result, newly applied capability changes, and committed runtime state all enter the next request, while AgentService never develops a second, drifting copy of Session facts.

When a user saves a new model or Skill configuration during execution, the change affects later model calls that have not yet been assembled. It does not rewrite a request already sent or a Tool Call already in progress. See [Runtime Model and Skill Switching](/docs/guides/ai-agent-runtime-hot-switching) for the exact boundary.

## How the Model and Tools Form a Fixed Loop

A model call can produce final text or one or more Tool Calls. For a Tool Call, the Harness advances these steps:

1. Preserve the assistant message and Tool Call identity produced by the model.
2. Validate the call against the Tool schema, current user, Session, resources, and governance policy.
3. Suspend the call when approval is required; otherwise dispatch it to the Tool fact owner and runtime.
4. Append the stable Tool result to the same Session history.
5. Reassemble context and call the model again.

A successful Tool result means that one action completed; it does not mean that the user's goal is complete. The model still needs to inspect files, data, external state, or other acceptance evidence and decide whether to call another capability, repair the output, or produce a final response.

The Harness also tracks repeated failures and no-progress calls to prevent the model from repeating one Tool pattern indefinitely. This loop guard is an execution safeguard. It does not replace the task method in a Prompt or Skill, and it cannot present an unfinished objective as success.

In the customer-support reporting run, the timeline records plan creation, task transitions, file writes, file inspection, and progress updates as consecutive rounds of one task rather than unrelated conversations:

![The xAgent timeline shows planning, task transitions, file writes, and inspection progressing inside one execution loop](/img/insights/agent-harness/agent-tool-loop-en.webp)

The generated HTML remains independently inspectable as a task artifact. Users can validate the KPI values and presentation itself instead of treating one successful file-write call as proof that the deliverable is complete:

![The xAgent file preview shows the English customer-support report and its five independently calculated KPIs](/img/insights/agent-harness/html-report-preview-en.webp)

## Approval Is a Suspended Tool Call, Not a New Task

When a Tool Call matches an approval policy, xAgent preserves the original call and waiting facts, and the Session enters `waiting_approval`. AgentService leaves the current execution stack, while SessionEngine owns the waiting state across requests.

After approval, Brain reacquires the runner and AgentService consumes the confirmed pending state, then continues from the original Tool Call. On rejection or cancellation, the action is not executed and the rejection returns to the same task context. The approval decision does not enter the task-relevance Agent and is not interpreted as a new task goal.

This separates “what the model proposes” from “what the system permits.” The model proposes an action, Tool governance reduces the call to inspectable facts, and the approval policy allows, rejects, or suspends it. See [AI Agent Approval and Safety Controls](/docs/guides/agent-approval-security) for the current scope.

## Guidance and Interruption During Execution

New user input or a Session event that arrives during a task enters a queue managed by SessionEngine and is consumed by the single runner at an explicit boundary. It does not mutate a model request already in progress or write runtime state concurrently with the current Tool Call.

When the user explicitly interrupts execution, SessionEngine cancels the current Agent context, and Brain normalizes runtime state after the execution stack returns. An interruption is not presented as a successful model response. If later work remains in the queue, it can enter a new processing turn after the old execution stack exits.

This keeps “refine the task,” “stop current execution,” and “approve one specific action” as three distinct signals. They can affect the same Session without sharing an ambiguous chat message as a runtime-control mechanism.

## Context Compression Preserves Executable State

A long task accumulates user messages, model output, Tool Calls, Tool results, and capability definitions. As it approaches the model's context budget, xAgent uses Context Compression to release space, but it does not treat this as an ordinary conversation summary.

SessionEngine freezes the real History snapshot, selects a legal message boundary, and maintains the checkpoint. SummaryService generates only an intermediate semantic compression result. SessionEngine then validates and commits the final executable continuation state. Compression preserves what later execution needs most:

- the current goal, deliverable, and progress;
- constraints, decisions, and working facts that still apply;
- open questions and next actions;
- stable artifact references needed to continue.

A Tool Call and its Tool Result cannot be split by a compression boundary. The Session-wide and current-phase goals still come from SessionMeta; model-generated compression cannot become their owner. A phase change may trigger compression evaluation, but it reuses the same checkpoint, pending, and finalize path instead of creating a second “semantic compression” state machine.

## Active-Turn Compression Keeps One Long Turn Running

Some tasks receive one user message and then require many model and Tool rounds, reaching the context budget inside the same turn. xAgent can compress sealed earlier execution material during that active turn while preserving a continuity anchor for the current user request.

This does not fabricate a new user message or treat a compressed summary as original history. SessionEngine still uses real message boundaries and checkpoints, clearly separating backend-owned continuity fields from model-generated semantic state. After compression, the next model request continues from the new context starting point.

For users, the important result is that a long task does not need to end automatically merely because one model context is becoming full. Compression can still omit low-value detail, so important source material, decisions, and intermediate artifacts should be preserved as stable files.

## How Execution Recovers After a Service Restart

xAgent does not promise exact recovery from every interruption. Recovery depends on valid persisted runtime snapshots, pending state, checkpoints, and Session status. After service dependencies are ready, Brain scans resumable Sessions and uses the same runner and AgentService path to continue; it does not start a separate “recovery Agent Loop.”

A Session waiting for approval continues waiting instead of bypassing confirmation after restart. An unfinished context compression is committed or normalized from its pending state. An abnormal running status without valid recovery material is not blindly treated as a resumable task.

The accurate claim is therefore “execution recovery based on valid persisted state,” not “every Tool can be replayed without loss.” Idempotency, duplicate-request protection, and result lookup in an external system remain responsibilities of the corresponding Tool and external service.

## Agent Harness Is Not ProcessSandbox

The Agent Harness decides when to call the model, when to execute a Tool, how to wait, and how to continue. ProcessSandbox handles process, file-view, resource, and platform isolation when a local command actually starts. They occupy different layers of the same task path.

```text
Agent Harness
  -> Tool governance and Tool runtime
  -> Workspace Execution Lease
  -> ProcessSandbox
  -> Constrained local process and file-change commit
```

Not every Tool passes through ProcessSandbox. Remote MCP and Connector Tools, for example, have their own execution boundaries. Every Tool Call still passes through the Harness for history, governance, waiting, and result progression. See [Runtime and ProcessSandbox](/docs/architecture/runtime) for sandbox file projections and resource limits.

## Users See Different Runtime States of One Task

These internal boundaries ultimately project into states users can understand: preparing context, running, waiting for approval, compressing, interrupted, failed, or idle. State changes come from committed runtime facts owned by the responsible service, not from guesses based on chat text.

Users can close the browser and return later, or receive notifications and handle approvals through a Connector. As long as the server is running and the task has not entered a waiting or failure boundary, Brain continues advancing the same Session. See [How AI Agents Run Long Tasks](/docs/guides/long-running-agent-task) for organizing source material, acceptance checks, and staged delivery.

At completion, the final response, Session file tree, and explicit validation results form one delivery record. This run preserved the CSV, exposed the HTML report, summarized data-backed findings, and reported each acceptance check:

![xAgent displays the final English report conclusions, generated files, and itemized validation results](/img/insights/agent-harness/task-artifacts-validation-en.webp)

Taken together, the two articles describe the xAgent Agent Harness as two loops: the outer loop understands tasks and prepares the environment; the inner loop executes, waits, compresses, and recovers. Models provide semantic judgments and action proposals, while deterministic owners control facts, permissions, and state transitions.
