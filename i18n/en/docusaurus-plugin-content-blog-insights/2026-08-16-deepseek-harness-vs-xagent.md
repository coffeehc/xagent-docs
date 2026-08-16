---
slug: deepseek-harness-vs-xagent
title: "DeepSeek Harness vs. xAgent: Choosing an Agent Harness Architecture"
date: 2026-08-16
description: "Compare DeepSeek Harness with xAgent across plugin composition, Session facts, task understanding, Tool pipelines, recovery, compaction, Subagents, and sandboxes."
authors: [xagent]
tags: [ai-agent, architecture, deepseek, runtime, xagent]
image: /img/share/en/xagent-overview.png
---

DeepSeek Harness treats the Agent runtime as a composable plugin tree. xAgent starts with a different question: when a task has been running for hours, called Tools, waited for approval, and survived a service restart, who owns each piece of state?

That question sends the two architectures in different directions.

Both sit above the model API and handle Sessions, context, Tools, and execution. Both qualify as full Agent Harnesses. DeepSeek concentrates on making the runtime replaceable and recomposable. xAgent concentrates on keeping long-running work coherent. A feature checklist tends to hide that distinction rather than explain it.

{/* truncate */}

## The Revisions Compared Here

The xAgent baseline is `82f3a1f6`, dated August 16, 2026. The DeepSeek baseline is [`47f94385`](https://github.com/deepseek-ai/deepseek-harness/tree/47f943859bef60e4160492346772ded9b24f765a), committed August 13, 2026.

At that revision, the DeepSeek [README](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md) still describes the project as a developer preview and warns about compatibility-breaking changes. I am comparing published code and documentation, not predicting future stability. There is no performance ranking here either; tokens, latency, and task success are meaningless without a shared workload, model, Tool set, sandbox, and recovery scenario.

xAgent has no package literally called `harness`. Brain, SessionEngine, AgentService, ToolService, ProcessSandbox, and multi-Session collaboration collectively fill that role. xAgent is neither a DeepSeek fork nor a product shell built on top of it.

## Start with Ownership, Not Tools

From a distance, both systems have an Agent Loop, Tools, Sessions, compaction, Subagents, and sandboxes. The difference appears one layer below.

| | DeepSeek Harness | xAgent |
| --- | --- | --- |
| Runtime organizing principle | Cordis plugin tree | Stable owners such as Brain, SessionEngine, and AgentService |
| Primary Session record | Append-only `SessionEvent` log | Chat, SessionMeta, recovery snapshots, SessionEvent, and Memory divided by owner |
| How capabilities enter | Profiles, bundles, hooks, waterfalls, guards, and providers | Owner business actions plus per-Session Skill and Tool assembly |
| What recovery protects first | A valid, replayable transcript | Usable task, approval, compaction, and guidance state |

DeepSeek is composition-first: split the runtime into parts that can be recombined. xAgent is fact ownership-first: decide who creates, changes, and restores each kind of state.

Those labels sound abstract, so consider a task that fails at an inconvenient moment.

## A Task Restarts While Waiting for Approval

Imagine a customer-support report. The Agent has read the tickets, generated a CSV, and is about to call an external Tool to send the report. The call needs approval, so execution pauses. Context has already been compacted once. Then the service restarts.

DeepSeek is particularly good at answering, “What exactly did the model see before the crash?” Its [architecture documentation](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/architecture.md) captures the rule in one line: `Model-visible means logged`. User input, streamed output, Tool calls and results, request headers, and the effective prompt, tools, and model config can be reconstructed from the event log. That is a clean evidence chain for debugging, forking, and replay.

When a process exits mid-turn, DeepSeek keeps the flushed events and appends synthetic `unknown` / `interrupted` closers for open Tools, Steps, and Turns. The transcript becomes valid again. Its [persistence documentation](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session/session-persistence/README.md#known-limitations-and-deferred-work) is explicit about the boundary: the current implementation does not resume a partial turn.

xAgent asks a different recovery question: “Can the task continue?” Approval is represented by a durable RuntimeAuditUnit. Guidance, pending compaction, checkpoints, and active-turn compaction can all enter recovery material. After a restart, xAgent restores business state that lets the Session move forward, not only a valid model transcript.

The tradeoff is equally concrete. xAgent can tell you who owns the current state, but it does not naturally retain one exact record of the prompt, Tool schema, model config, and owner versions seen by every past model call. DeepSeek has the stronger replay story. xAgent has the stronger long-task continuation story.

## DeepSeek Feels Like a Runtime Kernel

Almost every DeepSeek capability hangs from the Cordis plugin tree. Effects can be reversed, a local scope can shadow a global capability, and Profile patches alter the final composition. Model adapters, prompts, Sessions, Tools, sandboxes, and Subagents all expose replacement points.

The value is not merely “more plugins.” A developer can replace a whole slice of runtime behavior without rewriting the Agent Loop. The [Tool pipeline](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/tool-execution-pipeline.md), for example, accepts guards, wrappers, and finalizers around execution. Tools may be `parallel` or `exclusive`, and concurrent results still commit in the model's original order.

Subagents and sandboxes follow the same pattern. Subagent providers can connect in-process implementations, forks, ACP, Codex, Claude Code, and other backends. Filesystem, subprocess, and sandbox providers can replace the Agent's execution world. This is compelling for teams building an Agent runtime laboratory or changing infrastructure components frequently.

## xAgent Feels Like a Long-Running Work System

xAgent does not turn every responsibility into a plugin. Brain schedules work and updates task state. SessionEngine coordinates Session facts. AgentService runs the model and Tool loop. ToolService governs calls. The boundaries are less fluid than DeepSeek's, but a business state usually has an identifiable owner.

You can see that priority before the first business-model call. A sub-Session persists the original input, makes one stateless semantic call to classify the task relationship, and produces three groups of recall terms for Skills, Tools, and Memory. Brain applies a five-value enum. Orchestrator recalls and adds capabilities only when the task is first established or changes phase within the Session.

```text
Persist original input
  -> task_relation + three recall-term groups
  -> Brain updates task state
  -> [initialize / reconcile] Orchestrator recalls capabilities
  -> AddSelectedCapabilities
  -> AgentService enters the model / Tool loop
```

There is no score threshold or second task-extraction call. Orchestrator does not rewrite the Goal, swap the model, or silently unload existing capabilities. When MainSession hands work to a sub-Session, it sends the original request and resource references. The Session doing the work understands the task and prepares its own capabilities.

![xAgent understands task relationships and orchestrates Skill, Tool, and Memory capabilities](/img/insights/agent-harness/task-environment-orchestration-en.webp)

Once inside the Tool loop, xAgent currently executes Tool Calls in order. ToolService is designed less as an open-ended extension surface and more as a governance chain for paths, enabled state, readiness, schemas, approval, secrets, execution leases, and result normalization. Serial execution is a conservative but sensible default when Tools can modify files, start processes, or touch external systems.

## How I Would Choose

If my team keeps asking, “Can we swap this model adapter?”, “Where can we add another Tool guard?”, or “Can we replay the exact model request?”, I would study DeepSeek Harness first. It behaves like an Agent runtime kernel, and composition is its strongest idea.

If the questions are, “Does the task keep running after the user closes the page?”, “Can an approval wait overnight?”, or “Will the Goal, files, and compaction state survive a restart?”, xAgent is closer to the problem. It treats the Agent as a durable business Session rather than a complete model loop.

Most serious systems eventually want pieces of both. The important decision is where primary facts live. Evidence may have many projections; a fact should still have one owner.

## What xAgent Should Borrow

I would not turn xAgent into an everything-is-a-plugin system. Brain, SessionEngine, AgentService, and ToolService already form a useful responsibility spine. Making all of them plugins would blur the ownership xAgent has worked to establish.

Request evidence is the more valuable lesson. xAgent could record the effective prompt, Tool schema, model config, and owner fact versions for each call. Those records would make incidents reproducible while remaining projections of owner facts, not a second data source that can mutate the Session.

Tool concurrency is also worth keeping as a conditional optimization. If real workloads show that serial calls are a bottleneck, xAgent can distinguish read-only Tools that may overlap from side-effecting Tools that require exclusivity, then commit results in model order. Adding concurrency merely to look more advanced would buy complexity before it buys performance.

SessionEngine's current dependency pressure has a more ordinary remedy: give each owner better business operations and remove passthroughs. A new plugin core would move the problem rather than solve it.

## The Shortest Honest Summary

DeepSeek Harness is better at making the runtime replaceable. xAgent is better at keeping the task alive.

One asks how capabilities should compose. The other asks who owns the facts. Knowing which problem you are solving matters more than comparing the length of two feature lists.

For the implementation details, read the [task-alignment deep dive](/insights/xagent-agent-harness-task-alignment) and the [execution-loop deep dive](/insights/xagent-agent-harness-execution-loop).
