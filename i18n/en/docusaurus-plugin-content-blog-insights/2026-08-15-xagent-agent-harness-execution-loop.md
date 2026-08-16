---
slug: xagent-agent-harness-execution-loop
title: "Inside the xAgent Agent Harness, Part 2: How Tasks Run, Pause, and Resume"
date: 2026-08-15
description: "Compare the DeepSeek Harness Agent Loop with xAgent's AI agent context management: one Session runner, request assembly, Tools, approvals, compression, and recovery."
authors: [xagent]
tags: [ai-agent, architecture, runtime, approvals, long-running]
image: /img/share/en/xagent-overview.png
---

After outer task control prepares the goals and capability environment, xAgent enters what is usually called the Agent Loop. Brain controls Session-level scheduling, SessionEngine coordinates Session facts and runtime state, AgentService runs the fixed model and Tool loop, and ToolService governs each call.

This path lets one task continue after Tool Calls, wait before a high-impact action, compress a growing context, exit when the user interrupts it, and resume after a service restart when valid persisted facts exist.

This AI agent context-management and execution loop was further improved in [`0.0.10.beta`](/docs/changelog#v0010beta---2026-08-16). This article focuses on how each request is assembled, suspended, compressed, and recovered.

{/* truncate */}

## Comparison Baseline and Scope

For an architecture-level decision and use-case comparison, start with [DeepSeek Harness vs. xAgent: Choosing an Agent Harness Architecture](/insights/deepseek-harness-vs-xagent). This article continues with runtime execution, pausing, and recovery.

This article continues to use xAgent `82f3a1f6` on August 16, 2026, and [DeepSeek Harness `47f94385`](https://github.com/deepseek-ai/deepseek-harness/tree/47f943859bef60e4160492346772ded9b24f765a) on August 13, 2026, as its factual baseline. DeepSeek Harness was still a developer preview at that commit. The comparison covers published code and documentation, not inferred future stability.

Both systems implement a Harness layer, but their fact models differ:

- DeepSeek is composition-first and event-log-first.
- xAgent is fact ownership-first and owner-state-first.

These are not two names for the same implementation. DeepSeek composes capabilities through a Cordis plugin tree and uses one event log for reconstruction and replay. xAgent divides state across a fixed owner spine and persists long-task facts for recovery across requests.

## Side-by-Side: Similar Loops, Different Fact Boundaries

| Dimension | DeepSeek Harness `47f94385` | xAgent `82f3a1f6` |
| --- | --- | --- |
| Serialization | `ReactLoopAgent` inbox and phase control one Agent's activity | Brain serializes a Session through SessionEngine's single runner |
| Execution unit | Durable `Turn -> Step -> Model + Tools` | Brain organizes a task turn; AgentService runs the inner model / Tool loop |
| Session facts | One append-only `SessionEvent` log is the main fact carrier | Chat, SessionMeta, recovery snapshots, SessionEvent, and Memory are divided by owner |
| Context assembly | Plugins assemble each step and log request header, prompt, tools, and model config | SessionEngine assembles each request dynamically from current owner facts |
| Tool pipeline | Plugin seams for `pre-execute -> guards -> execute -> post-execute -> finalize` | A fixed linear ToolService governance chain centralizes validation and execution facts |
| Tool concurrency | `parallel` / `exclusive` modes with model-order result commit | Tool Calls currently execute serially in model order |
| Approval | An active-turn Promise waits while `asked` / `decided` enter the log | `RuntimeAuditUnit` and recovery snapshots can wait across requests and restarts |
| Compaction | A provider replaces the model-visible surface while retaining the raw log | Structured continuity summary, checkpoint, and pending promotion |
| Crash recovery | Synthetic closers balance open calls, steps, and turns; partial turns do not resume | Valid snapshots restore guidance, approval, compaction, and other runtime facts |
| Subagent | Spawn, fork, and replaceable providers, including ACP, Codex, and Claude Code | Main / Sub Sessions, SessionEvent, and Workgroup; the receiver understands its own task |
| Sandbox | Replaceable FS, Subprocess, and Sandbox provider seams | ProcessSandbox, workspace execution lease, and file-change reconciliation |

Both designs recognize that one model response is not a complete Harness and one successful Tool result does not complete the user's objective. Their main disagreement is what counts as a recoverable fact and where extensions attach.

## Why DeepSeek Has Stronger Exact Replay

The DeepSeek [architecture documentation](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/architecture.md) states a direct invariant: `Model-visible means logged`. User messages, stream chunks, assistant messages, Tool calls and results, request headers, and the effective prompt, tools, and model config can be reconstructed from the Session log.

Fork, resume, transcripts, telemetry, and UI replay can therefore derive from one event stream. Compaction does not delete the original facts. It replaces a range on the model-visible surface with a summary while retaining the raw log and replacement evidence.

xAgent does not depend on one exact event stream to reconstruct every request. It assembles current context from several fact owners. This gives DDD responsibilities a clearer shape and allows an owner to correct its own state, but the evidence for exactly which prompt, Tool schema, and owner fact versions entered a historical request is less direct than in DeepSeek.

That is an architecture judgment. It does not mean xAgent lacks persistence, or that a single-log model automatically fits every business fact.

## Current xAgent: One Runner per Session

User messages, Connector events, Session collaboration input, and approval decisions can arrive close together. Brain first acquires SessionEngine's single runner, then consumes input, events, guidance, and pending state in order. If a runner already exists, a new entry records a wake request. When the old runner releases and executable work remains, Brain acquires it again and continues draining.

| Owner | Current responsibility | Explicitly does not own |
| --- | --- | --- |
| Brain | Input scheduling, single runner, deterministic task transitions, recovery, and interruption boundaries | Model-request assembly or Tool business facts |
| SessionEngine | Business actions over queues, History, goals, pending state, compression, and recovery material | Direct business-model calls |
| AgentService | Fixed LLM / Tool loop, retries, loop guards, and result progression | Cross-request waiting facts |
| ToolService | Tool path, enabled/readiness, schema, approval, secrets, execution lease, and result normalization | Task relationships or Session goals |

This serialization targets the same class of problem as DeepSeek's inbox and phase, but the implementations are not equivalent.

## Every Model Call Is Reassembled from Owner Facts

AgentService does not keep a private, mutable copy of Session History. Before each model call, SessionEngine assembles the request from current facts, including:

- Session-wide and current-phase goals;
- raw History, checkpoints, and the current compression boundary;
- loaded Skills, Tool schemas, and call policy;
- Memory, resource references, attachments, and workspace context;
- current model configuration, Prompt, and runtime policy.

After a Tool result becomes stable, the next model call is assembled again. Newly committed Tool results, capability changes, pending consumption, and context maintenance enter the next round without creating a second drifting state inside AgentService.

This differs from DeepSeek's strategy of deriving model History from the log and recording a complete request header. DeepSeek prioritizes exact request replay; xAgent prioritizes assembling the next request from each owner's latest facts.

## A Fixed ToolService Governance Chain Is Not Missing Capability

A model call can produce final text or multiple Tool Calls. xAgent currently executes those calls one by one in model order. Each call passes through centralized governance, and only stable assistant/Tool pairs are committed:

```text
Model emits a Tool Call
  -> Resolve the Tool available to this Session
  -> enabled / readiness / schema checks
  -> approval and secret handling
  -> workspace execution lease / runtime execution
  -> result normalization and secret redaction
  -> commit assistant tool_call + tool_result as a pair
  -> reassemble the next model request
```

DeepSeek's [Tool pipeline](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/tool-execution-pipeline.md) provides waterfalls, monotonic guards, wrappers, post hooks, and finalization. `parallel` calls may overlap in a bounded pool while results still commit in the model's original order. Its Tool extension model is more flexible.

xAgent has a more fixed extension shape but more centralized governance facts. A non-plugin pipeline does not imply missing path, approval, secret, workspace, or result-normalization controls. Serial-safe execution is also a reasonable default. A concurrency-safe classifier and model-order result commit become worthwhile only when real performance evidence shows Tool concurrency is a bottleneck.

In the customer-support reporting run, the timeline records model output, file writes, task completion, and the next task start as consecutive rounds of one long task:

![The xAgent timeline shows planning, task transitions, file writes, and inspection progressing inside one execution loop](/img/insights/agent-harness/agent-tool-loop-en.webp)

The final HTML remains independently inspectable. Users validate the KPI values, charts, and conclusions rather than treating one successful file-write call as proof of completion:

![The xAgent file preview shows the English customer-support report and its five independently calculated KPIs](/img/insights/agent-harness/html-report-preview-en.webp)

## Approval: Live Promise Versus Durable Pending State

DeepSeek's approval seam asks inside an active turn, waits for an answerer to return a closed outcome, and appends `approval/asked` and `approval/decided` as an audit pair. A missing or invalid answerer fails closed.

When xAgent requires approval, AgentService hands the blocked Tool Call, preallocated result identity, and `PendingRequest` to SessionEngine as a `RuntimeAuditUnit`. The Session waits and the current execution stack exits. After Brain validates and binds the user's decision, AgentService consumes that durable pending state under a later runner and either continues the original call or commits a rejection result.

An xAgent approval is therefore neither a new task message nor only a Promise in an active stack. It is designed for long waits across requests and restarts. DeepSeek's asked/decided pair provides a more direct single-stream audit trail.

## The Two Compaction Models Are Not Equivalent

DeepSeek implements compaction as an optional capability seam. A provider generates a summary, and a replacement operation changes what later model requests see on the Session surface. The raw events, shadowed range, summary result, and model-call evidence remain in the append-only log. This design prioritizes audit, replay, and reconstruction of the model-visible surface.

xAgent Context Compression prioritizes semantic continuity and crash-safe commit. SessionEngine freezes real History and selects a legal message boundary. SummaryService produces an intermediate structured result, and SessionEngine validates and commits the checkpoint. The continuity summary preserves execution facts such as Goal, Artifact, Decision, ActiveUserRequest, constraints, open questions, and next actions.

A Tool Call and Tool Result cannot be split by a compression boundary. Session-wide and current-phase goals still come from SessionMeta; a model-generated summary cannot overwrite their owner.

## Active-Turn Compaction and Restart Recovery

One user request can produce many model and Tool rounds and exhaust context inside the same active turn. xAgent can compact sealed earlier material while retaining a continuity anchor for the current request. A checkpoint and pending compaction form a verifiable commit state before `ContextStartMessageId` advances; restart recovery then promotes a valid pending state or discards one whose preconditions never committed.

DeepSeek persistence preserves flushed events from a crashed turn and appends synthetic `unknown` / `interrupted` closers for unanswered Tools, an open step, and the turn, restoring a valid transcript. Its [persistence documentation](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session/session-persistence/README.md#known-limitations-and-deferred-work) explicitly states that the current crash story closes an interrupted turn instead of resuming a partial turn.

xAgent focuses on a different recovery unit. After dependencies become ready, Brain reads valid recovery snapshots and uses the same runner and AgentService path to restore guidance, pending approval, active-turn compaction, and related runtime facts. It does not promise lossless replay of every external Tool. Idempotency, duplicate-request protection, and result lookup remain with the Tool and external system.

The precise comparison is: DeepSeek is stronger at log balancing, exact replay evidence, and interrupted transcripts; xAgent is stronger at resuming durable long-task business state across requests and restarts.

## Subagents and Sandboxes: Adjacent Capabilities, Different Priorities

DeepSeek exposes Subagents through replaceable providers for in-process spawn, fork, ACP, Codex, Claude Code, and other backends. xAgent uses Main / Sub Sessions, SessionEvent, and Workgroup collaboration. A receiving sub-Session gets the original request and resource references, then understands the task and prepares its own capabilities. The parent does not preselect its Skills or Tools.

Sandbox design shows the same difference. DeepSeek uses FS, Subprocess, and Sandbox seams to replace the execution world. xAgent uses:

```text
Agent Harness
  -> ToolService governance
  -> Workspace Execution Lease
  -> ProcessSandbox
  -> file-change reconciliation
```

Not every Tool passes through ProcessSandbox. Remote MCP and Connector Tools have their own execution boundaries, while every Tool Call still passes through Harness history, governance, waiting, and result progression. DeepSeek is stronger in provider replaceability; xAgent is stronger in workspace fact governance. See [Runtime and ProcessSandbox](/docs/architecture/runtime).

## Architecture Conclusions and Optional Improvements

Four conclusions follow from the current implementations:

1. xAgent has a complete Harness layer even without a package named `harness`.
2. DeepSeek has stronger exact-request replay and Tool extensibility; xAgent has stronger durable approval, active-turn compaction, and owner-state recovery.
3. Their Session facts, compaction, and crash recovery cannot be called equivalent merely because adjacent concepts share names.
4. xAgent should not copy everything-is-a-plugin for formal symmetry.

Optional future improvements include:

- formally define outer task control, Session runtime, inner Agent loop, Tool governance, and execution isolation as the xAgent Harness boundary;
- project read-only evidence for prompts, Tool schemas, model config, and owner fact versions to improve request reconstruction;
- add Tool concurrency classification and model-order result commit only when real performance demand exists;
- preserve the task relation enum, receiver self-understanding, durable approval, active-turn compaction, and owner-state correction;
- reduce SessionEngine dependency pressure through clearer owner business actions and fewer pass-through or cross-owner operations, not by turning the entire core into plugins.

These are architecture recommendations, not features claimed as already implemented.

## The User Ultimately Sees Delivery Evidence

Internal owner boundaries project into runtime states users can understand: preparing context, running, waiting for approval, compressing, interrupted, failed, or idle. At completion, the final response, Session file tree, and explicit validation results form one delivery record:

![xAgent displays the final English report conclusions, generated files, and itemized validation results](/img/insights/agent-harness/task-artifacts-validation-en.webp)

Together, the two articles describe the xAgent Agent Harness as two coordinated layers. Outer control classifies task relationships and adds capabilities; the inner loop executes, waits, compresses, and recovers. Models provide constrained semantic judgment and action proposals, while deterministic owners control facts, permissions, and state transitions.
