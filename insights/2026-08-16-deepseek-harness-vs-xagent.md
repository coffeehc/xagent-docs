---
slug: deepseek-harness-vs-xagent
title: "DeepSeek Harness 与 xAgent：两种 Agent Harness 架构路线怎么选"
date: 2026-08-16
description: 对比 DeepSeek Harness 与 xAgent 的插件组合、会话事实、任务理解、Tool 管线、审批恢复、压缩、Subagent 与 Sandbox，理解两种 Agent Harness 架构路线的适用场景。
authors: [xagent]
tags: [ai-agent, architecture, deepseek, runtime, xagent]
image: /img/share/zh/xagent-overview.png
---

DeepSeek Harness 把 Agent 运行时看成一棵可以自由组合的插件树。xAgent 从另一个问题出发：一个任务跑了几个小时，调用过工具、等过审批，甚至经历了服务重启，这些状态到底由谁负责？

这就是两套架构真正分开的地方。

它们都在模型 API 之外处理会话、上下文、工具和执行，也都称得上完整的 Agent Harness。只是 DeepSeek 更关心运行时怎样被替换和重组，xAgent 更关心长期任务怎样持续下去。拿功能清单逐项打勾，反而容易错过这个差别。

{/* truncate */}

## 先固定比较版本

本文对照的是 2026 年 8 月 16 日的 xAgent `82f3a1f6`，以及 2026 年 8 月 13 日提交的 [DeepSeek Harness `47f94385`](https://github.com/deepseek-ai/deepseek-harness/tree/47f943859bef60e4160492346772ded9b24f765a)。

DeepSeek 在该提交的 [README](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md) 中仍将项目标为 developer preview，并提醒使用者接口可能发生破坏兼容性的变化。下面谈的都是这两个版本已经公开的代码和文档，不预测未来接口，也不做缺少统一工作负载的性能排名。

xAgent 代码里没有一个名叫 `harness` 的包，但 Brain、SessionEngine、AgentService、ToolService、ProcessSandbox 和多会话协作共同承担了 Harness 职责。它不是 DeepSeek Harness 的 fork，也不是套在 DeepSeek 之上的产品外壳。

## 第一个问题不是工具，而是状态归谁

如果只看表面，两边都有 Agent Loop、Tool、Session、压缩、Subagent 和 Sandbox。往下一层看，核心对象完全不同。

| | DeepSeek Harness | xAgent |
| --- | --- | --- |
| 运行时围绕什么组织 | Cordis plugin tree | Brain、SessionEngine、AgentService 等固定责任 owner |
| Session 的主要事实 | append-only `SessionEvent` log | Chat、SessionMeta、恢复快照、SessionEvent、Memory 分层持有 |
| 新能力怎样接入 | Profile、Bundle、hook、waterfall、guard、provider | owner 暴露业务动作，Session 按任务装配 Skill 和 Tool |
| 恢复首先保证什么 | 日志重新成为合法、可回放的 transcript | 任务、审批、压缩和指导信息能够继续使用 |

DeepSeek 选择的是 composition-first：先把运行时拆成可组合部件。xAgent 选择的是 fact ownership-first：先确定每类事实由谁创建、修改和恢复。

这两个词听起来很抽象。放进一次真实任务里，区别会清楚很多。

## 假设任务在审批时重启了

设想一个客服周报任务。Agent 已经读取工单、生成 CSV，准备调用外部工具发送报告。因为这个动作需要审批，任务停下来等用户确认。等待期间，上下文做过一次压缩，随后服务重启。

DeepSeek 的强项是回答“模型此前到底看到了什么”。它的[架构文档](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/architecture.md)用一句话概括原则：`Model-visible means logged`。用户输入、流式输出、Tool call/result、request header，以及当时生效的 prompt、tools 和 model config 都能从事件日志重建。调试、fork 或回放一次请求时，这条证据链很直接。

如果进程在 turn 中途退出，DeepSeek 会保留已经落盘的事件，再为未闭合的 Tool、Step 和 Turn 补上 synthetic `unknown` / `interrupted` closer，使 transcript 恢复合法。它的[持久化说明](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session/session-persistence/README.md#known-limitations-and-deferred-work)也写得很坦白：当前不会从中断位置续跑 partial turn。

xAgent 更关心“这个任务接下来还能不能继续”。审批由可持久化的 RuntimeAuditUnit 表达，guidance、pending compaction、checkpoint 和 active-turn compaction 也会进入恢复材料。服务回来后，系统恢复的是这些业务状态，而不是只修复一段模型 transcript。

代价同样明确：xAgent 能说明当前状态由谁负责，却不天然保存过去每一次模型调用看到的完整 prompt、Tool schema、model config 和各 owner 的版本。DeepSeek 在精确回放上更强，xAgent 在长任务恢复上走得更远。

## DeepSeek 更像一个可组合的运行时内核

DeepSeek 的几乎所有能力都挂在 Cordis 插件树上。effect 可以撤销，局部 scope 可以遮蔽全局能力，Profile 通过 patch 改变最终组合。模型适配、Prompt、Session、Tool、Sandbox 和 Subagent 都有清晰的替换接口。

这种设计的价值不只是“插件多”。它让开发者能在不改 Agent Loop 主体的情况下，替换一整段运行时行为。比如它的[工具管线](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/tool-execution-pipeline.md)允许在执行前后插入 guard、wrapper 和 finalize；Tool 可以声明 `parallel` 或 `exclusive`，并行结束后再按模型原始顺序提交结果。

Subagent 和 Sandbox 也是同一种思路。前者可以接进程内实现、fork、ACP、Codex、Claude Code 等 backend，后者把文件系统、子进程和执行环境做成 provider。对于正在搭建 Agent runtime 实验平台、需要频繁替换底层组件的团队，这种结构很有吸引力。

## xAgent 更像一个长期任务系统

xAgent 没有把所有东西都变成插件。Brain 负责调度和任务状态转换，SessionEngine 协调会话事实，AgentService 运行模型与 Tool 循环，ToolService 处理调用治理。边界没有 DeepSeek 那么自由，但业务状态更容易找到明确负责人。

这种取向在模型调用之前就能看到。子会话收到消息后，会先持久化原始输入，再用一次无状态语义调用判断任务关系，并生成 Skill、Tool、Memory 三组召回词。Brain 根据五值枚举更新任务状态；只有首次建立任务或同一会话内切换阶段时，Orchestrator 才并行召回并增加能力。

```text
持久化原始输入
  -> task_relation + 三组 recall terms
  -> Brain 更新任务状态
  -> [initialize / reconcile] Orchestrator 召回能力
  -> AddSelectedCapabilities
  -> AgentService 进入模型 / Tool loop
```

这里没有 score threshold，也没有第二次任务要点提取。Orchestrator 不改写 goal，不替换模型，也不偷偷卸载已有能力。MainSession 把任务交给子会话时，只发送原始 request 和资源引用；真正执行任务的子会话自己理解任务、准备能力。

![xAgent 对任务关系、Skill、Tool 与 Memory 进行语义理解和能力编排](/img/insights/agent-harness/task-environment-orchestration-zh.webp)

进入 Tool loop 后，xAgent 当前按顺序执行 Tool Calls。ToolService 的职责不是提供任意插件扩展，而是把 path、enabled、readiness、schema、approval、secret、execution lease 和结果归一化放进同一条治理链。对文件、进程和外部系统都有副作用的 Tool 来说，顺序执行是保守但合理的默认值。

## 我会怎么选

如果团队每天讨论的是“能不能换掉这段模型适配”“如何给 Tool 管线再套一层 guard”“怎样完整重放某次模型请求”，我会先研究 DeepSeek Harness。它更像一套 Agent runtime 内核，强项是组合与回放。

如果问题变成“用户离开页面后任务还跑不跑”“审批等了一晚能不能继续”“服务重启后 Goal、文件和压缩状态还在不在”，xAgent 的路线更贴近需求。它把 Agent 当成长时间存在的业务 Session，而不是只把一次模型循环做完整。

现实系统往往同时需要两边的能力。此时最重要的不是把两个架构拼在一起，而是先决定主要事实放在哪里。证据可以有很多份，事实 owner 最好只有一个。

## xAgent 值得从 DeepSeek 借什么

我不会把 xAgent 改成 everything-is-plugin。Brain、SessionEngine、AgentService 和 ToolService 已经形成责任骨架，全部插件化只会重新模糊事实归属。

更值得借鉴的是请求证据。xAgent 可以记录每次调用实际使用的 prompt、Tool schema、model config 和 owner fact version，让问题能够复盘；这些记录应当是事实的投影，而不是另一套可以反向修改 Session 的数据源。

Tool 并发也值得保留为一个有条件的优化方向。只有当真实任务证明串行调用成为瓶颈时，再区分可以安全并发的只读 Tool 与必须独占的副作用 Tool，并按模型原始顺序提交结果。为了看起来更先进而提前引入并发，没有必要。

至于 SessionEngine 当前承受的依赖压力，解决办法仍然是让各 owner 暴露更完整的业务动作、减少 passthrough，而不是再造一个插件核心。

## 最后一句话

如果一定要把差别压缩成一句话：DeepSeek Harness 更擅长让运行时变得可替换，xAgent 更擅长让任务变得可持续。

前者追问“能力怎样组合”，后者追问“事实由谁负责”。看清自己正在解决哪一个问题，比比较谁的功能列表更长重要得多。

任务理解和能力召回的代码路径见[《xAgent Agent Harness（上）：会话如何理解任务变化并调整执行环境》](/insights/xagent-agent-harness-task-alignment)；执行、审批、压缩和恢复的细节见[《xAgent Agent Harness（下）：一次任务如何持续执行、暂停与恢复》](/insights/xagent-agent-harness-execution-loop)。
