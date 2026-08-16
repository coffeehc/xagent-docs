---
slug: xagent-agent-harness-task-alignment
title: "Inside the xAgent Agent Harness, Part 1: How Sessions Understand Task Changes"
date: 2026-08-15
description: "Compare DeepSeek Harness task orchestration with xAgent's AI agent tool selection: align task phases, Skills, Tools, and long-term memory as goals change."
authors: [xagent]
tags: [ai-agent, architecture, sessions, skills, tools]
image: /img/share/en/xagent-overview.png
---

Many Agent systems describe a harness as one loop: send a user message to a model, execute the Tool Call returned by the model, and send the result back. That loop matters, but it does not answer an earlier question. Does the user's next message continue the current task, change the phase within the same Session, or fall outside the responsibility of this specialist Session?

xAgent handles that question before the business Agent loop. The original input first becomes a Session fact. One constrained semantic call then returns a task relationship together with Skill, Tool, and Memory recall terms. Brain applies a deterministic state transition, and Orchestrator adds capabilities only when the task is first established or its phase changes.

This task-understanding, AI agent tool selection, and environment-preparation path shipped in [`0.0.10.beta`](/docs/changelog#v0010beta---2026-08-16). This article explains its responsibility boundaries and execution order inside the Harness.

{/* truncate */}

## Comparison Baseline: Two Harnesses, One Layer, Different Priorities

For an architecture-level decision and use-case comparison, start with [DeepSeek Harness vs. xAgent: Choosing an Agent Harness Architecture](/insights/deepseek-harness-vs-xagent). This article continues with the current outer task-control implementation.

The factual baseline for this article is xAgent `82f3a1f6` on August 16, 2026, and [DeepSeek Harness `47f94385`](https://github.com/deepseek-ai/deepseek-harness/tree/47f943859bef60e4160492346772ded9b24f765a) on August 13, 2026. At that commit, the DeepSeek Harness [README](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md) still labels the project a developer preview and warns about compatibility-breaking changes. This article therefore does not treat interface stability or complete production readiness as a promise.

Both systems sit outside the model API and coordinate Sessions, context, Tools, execution, recovery, and multi-Agent work. xAgent has no package literally named `harness`, but that does not mean it lacks a Harness layer. Their core abstractions differ:

| Dimension | DeepSeek Harness | xAgent |
| --- | --- | --- |
| Optimization direction | Composition-first: Cordis composes runtime capabilities as a plugin tree | Fact ownership-first: a fixed responsibility spine assembles each Session dynamically |
| Core abstraction | Plugin tree, reversible effects, scopes, and capability seams | Service owners such as Brain, SessionEngine, and AgentService around a Session aggregate |
| Session facts | An append-only `SessionEvent` log drives model context and replay | Chat DB, `session_meta.json`, recovery snapshots, SessionEvent, and Memory are divided by owner |
| Extension model | Profiles, bundles, patches, hooks, waterfalls, guards, and providers | Explicit business actions, a fixed governance chain, and Session-selected Skills and Tools |

The DeepSeek [architecture documentation](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/architecture.md) emphasizes that almost everything is a plugin and that there is no privileged core that extensions must patch. xAgent retains an explicit responsibility spine:

```text
DeepSeek: Profile / Bundle -> Cordis Plugin Tree -> Agent Loop
          -> append-only SessionLog -> Tool Pipeline -> LLM / Sandbox / Subagent

xAgent:   Channel / Connector / Trigger -> Brain -> SessionEngine
          -> AgentService -> LLMProvider / ToolService
```

These implementations address the same system layer, but they are not equivalent. xAgent is not a DeepSeek Harness fork, frontend, or thin wrapper.

## Why a Tool Loop Is Not Enough

Suppose a sub-Session is working on “research ComfyUI and deliver a Markdown guide.” The next message might be:

- `Continue`: continue the current phase.
- `Convert the Markdown we just created to Word`: remain within the Session's responsibility, but change the delivery phase or capability needs.
- `Also check tomorrow's weather`: fall outside the responsibility of this specialist Session.

Keyword extraction from only the newest sentence yields almost nothing for `Continue`. Rebuilding the environment for every message causes capability churn. Letting a model rewrite the goal directly would also turn semantic judgment into a second fact owner.

xAgent therefore separates the outer task-control problem into two decisions: classify the message against the current task boundary, then recall and add capabilities only when required.

## Current Code Fact: How One Input Reaches the Business Agent

At `82f3a1f6`, the actual sub-Session path is:

```text
Sub-Session receives the original message and stable resource references
  -> SessionEngine.AppendToHistory persists the original input
  -> One stateless semantic call
  -> task_relation + three recall-term groups
  -> Brain applies a deterministic task-state transition
  -> [initialize / reconcile only] Orchestrator recalls and selects capabilities
  -> SessionEngine.AddSelectedCapabilities
  -> AgentService enters the model / Tool loop
```

The original message is appended to Chat facts and synchronized into the Session context cache before semantic preprocessing begins. A supporting-model, retrieval, or orchestration failure therefore cannot make the user's input disappear.

This preprocess applies only to sub-Sessions. MainSession retains its coordination and routing role and bypasses task-relevance preprocessing. Approval decisions, system notifications, and attachment-only inputs with no explicit task text also bypass it.

## One Semantic Call Returns Exactly Four Fields

The task-relevance Agent is a stateless, non-streaming JSON call. Its input contains only:

- the current message text;
- stable resource references such as `ref_id`, `protocol`, `filename`, and `media_type`;
- `current_task_goal`;
- `session_goal`.

It does not read full History, receive candidate Skills, Tools, or Memory, generate a Plan, or select Orchestrator candidates. Its output must contain exactly four fields:

```json
{
  "task_relation": "continue_current",
  "skill_recall_terms": [],
  "tool_recall_terms": [],
  "memory_recall_terms": []
}
```

All three recall-term fields must be non-null arrays with at most 16 items each. Terms are concise, deduplicated English phrases with a role that describes intended use. Skill and Tool terms can represent method, action, evidence, quality, domain, or artifact. Memory terms can represent entity, topic, context, preference, constraint, or decision.

There is no second model call that “extracts task essentials.” The task-understanding notice and later capability-discovery notice correspond to one semantic preprocess and the separate Orchestrator stage.

## Task Relationship Is an Enum, Not Two Scores

`task_relation` accepts only five values:

| Enum | Meaning | Deterministic Brain behavior |
| --- | --- | --- |
| `establish_task` | The message establishes a task | When the current-phase goal is empty, use the persisted original message as the goal |
| `continue_current` | Continue, clarify, or correct the current task | Keep goals and capabilities, then continue |
| `change_within_session` | Stay inside the Session scope but change phase or capability needs | Use the original message as the new phase goal and enter reconcile mode |
| `outside_session_scope` | The message does not belong to this sub-Session's global responsibility | Preserve goals and capabilities; let the current Agent handle it with context |
| `uncertain` | Current facts are insufficient for a stable classification | Preserve state instead of changing task facts automatically |

Brain uses no score threshold, and the model does not generate a rewritten goal. When no current-phase goal exists, the original user message becomes the task goal. On `change_within_session`, that original message becomes the new phase goal. Every other relationship preserves the existing goal.

The Session still distinguishes a Session-wide goal from a current-phase goal. The first represents durable responsibility; the second represents current work. Summaries, Plans, and Tasks may refer to these facts, but they do not become their owner.

## Only Two Modes Invoke Orchestrator

Only initial task setup in `initialize` mode or a `change_within_session` transition into `reconcile` mode enters capability preparation. Continuing, out-of-scope, and uncertain inputs do not reselect capabilities.

Orchestrator recalls three independent context groups in parallel:

- Skill candidates;
- ToolSet and enabled standalone Tool candidates;
- long-term Memory for the current user.

Recall scores are used only for candidate truncation, ordering, and debug logs. They do not enter the final orchestration Prompt and do not drive Brain's task transition. Candidates are sorted by stable references before the model sees them, so concurrent completion order cannot randomize the input.

The following customer-support reporting run shows semantic understanding, capability discovery, and orchestration. It is not a chain of three model roles or two task-semantic extraction calls:

![xAgent displays task understanding, capability discovery, and orchestration for a customer-support reporting task](/img/insights/agent-harness/task-environment-orchestration-en.webp)

## Orchestration Adds Capabilities Without Creating a Second Fact Center

Orchestrator consumes the aligned task, three recall-term groups, current capabilities, and recalled candidates. It returns ToolSets, Tools, and Skills to add. SessionEngine merges them atomically through `AddSelectedCapabilities`:

- keep capabilities already loaded;
- retain default discovery capabilities;
- add only, never remove implicitly;
- do not create a Session;
- do not rewrite task goals;
- do not select or modify the model, AgentDefinition, or a special role.

Capability removal requires an explicit unload path. Model configuration and Agent identity remain with their own owners instead of changing as a side effect of capability orchestration.

The resulting environment stays inspectable in Session settings:

![xAgent runtime settings show the planning, discovery, Session, and file tools loaded after orchestration](/img/insights/agent-harness/selected-tool-environment-en.webp)

## The Receiving Sub-Session Understands Its Own Task

MainSession can decide which sub-Session should own work, but the sender transfers only the original request and stable resource references. It does not preselect Skills, Tools, or an execution Prompt for the receiver. The receiving Session treats the collaboration request as its own real input and runs task understanding and capability preparation itself.

The rule is simple: the Session that executes the task is the Session that understands it. This prevents a parent Session's candidate space, stale capabilities, or inference from becoming child facts. See [Multi-Agent Session Event Collaboration](/docs/guides/multi-agent-session-event-collaboration) for the transport path.

## Outer Enhancements Fail Without Blocking Execution

If semantic preprocessing fails, xAgent preserves the persisted input, current goals, capabilities, and compression boundary, then continues into the business Agent. Orchestrator or Memory recall failure also does not clear the environment first. Existing capabilities and default discovery Tools remain available, allowing the Agent to discover more capabilities during execution.

This does not hide failures. It gives the outer enhancement a precise failure boundary: it may miss one capability preselection, but it cannot take away original input, existing task facts, or the main execution path.

Users typically see a sequence like:

```text
Understanding task semantics
  -> Discovering Skills, Tools, and Memory
  -> Orchestrating task capabilities
  -> Applying the task environment
```

The final three stages do not run for a simple continuation. See [How AI Agents Discover and Load Tools and Skills on Demand](/docs/guides/ai-agent-dynamic-tool-discovery) for runtime capability discovery.

## Architecture Judgment: xAgent Should Not Copy Everything-Is-a-Plugin

DeepSeek Harness provides strong composition for replacing model adapters, Tool pipelines, persistence, sandboxes, and Subagent providers. xAgent's strength comes from stable owners: Brain controls scheduling and task transitions, SessionEngine coordinates Session facts, AgentService owns the inner loop, and ToolService owns governance.

The useful lesson is a clear capability seam and reconstructable evidence, not converting every xAgent core responsibility into a plugin. Doing so would blur the fact owners the architecture already established.

As a future improvement, xAgent can formally document its Harness boundary and project request evidence for prompts, Tool schemas, model config, and owner fact versions. Those projections should support audit and reconstruction, never become a second source of truth. These are architecture recommendations, not features claimed as implemented here.

## Next: How Aligned Work Keeps Running

Outer task control answers “How does this message relate to the current task, and does the Session need additional capabilities?” The business Agent then enters its fixed model and Tool loop.

The next article, [Inside the xAgent Agent Harness, Part 2: How Tasks Run, Pause, and Resume](/insights/xagent-agent-harness-execution-loop), compares DeepSeek's Agent Loop, SessionLog, Tool pipeline, and crash repair with xAgent's single runner, approval state, context compression, and recovery model.
