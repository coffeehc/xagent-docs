---
slug: xagent-agent-harness-task-alignment
title: "xAgent Agent Harness（上）：会话如何理解任务变化并调整执行环境"
date: 2026-08-15
description: 对照 DeepSeek Harness 任务编排，了解 xAgent 如何判断任务阶段、选择 Skill、Tool 与长期记忆，并按目标变化调整执行环境。
authors: [xagent]
tags: [ai-agent, architecture, sessions, skills, tools]
image: /img/share/zh/xagent-overview.png
---

很多 Agent 系统把 Harness 描述成一个循环：把用户消息交给模型，执行模型返回的 Tool Call，再把结果送回模型。这个循环很重要，但它还没有回答一个更早的问题：用户继续发来的消息，是在延续当前任务、改变同一会话内的阶段，还是已经超出当前专业会话的职责？

xAgent 在业务 Agent loop 之前处理这个问题。原始输入先成为会话事实；一次受约束的语义调用再输出任务关系，以及 Skill、Tool、Memory 三类召回词；Brain 根据枚举执行确定性状态转换；只有首次建立任务或阶段变化时，Orchestrator 才增量补充能力。

这套任务理解、AI Agent 能力选择与环境准备链路已随 [`0.0.10.beta`](/docs/changelog#v0010beta---2026-08-16) 发布；本文继续说明它在 Harness 中的责任边界和执行顺序。

{/* truncate */}

## 对照基线：两个 Harness，同一层、不同优化方向

如果你需要先从整体架构和适用场景做选择，可先阅读[《DeepSeek Harness 与 xAgent：两种 Agent Harness 架构路线怎么选》](/insights/deepseek-harness-vs-xagent)。本文继续深入外层任务控制的当前实现。

本文以 2026 年 8 月 16 日的 xAgent `82f3a1f6`，以及 2026 年 8 月 13 日的 [DeepSeek Harness `47f94385`](https://github.com/deepseek-ai/deepseek-harness/tree/47f943859bef60e4160492346772ded9b24f765a) 为事实基线。后者在该提交的 [README](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/README.md) 中仍明确标为 developer preview，并提示会有破坏兼容性的变化，因此本文不把它的接口稳定性或生产完整性写成既定承诺。

两者都位于模型 API 之外，负责会话、上下文、工具、执行、恢复和多 Agent 协作。xAgent 没有名为 `harness` 的独立包，但这不等于没有 Harness 层。真正的区别是核心抽象：

| 维度 | DeepSeek Harness | xAgent |
| --- | --- | --- |
| 优化方向 | composition-first：运行时能力由 Cordis 插件树组合 | fact ownership-first：固定责任骨架围绕 Session 动态装配 |
| 核心抽象 | plugin tree、effect、scope 与 capability seam | Brain、SessionEngine、AgentService 等 service owner 与 Session aggregate |
| 会话事实 | append-only `SessionEvent` log 是模型上下文与回放的核心来源 | Chat DB、`session_meta.json`、恢复快照、SessionEvent 与 Memory 按 owner 分层持有 |
| 扩展方式 | Profile、Bundle、patch、hook、waterfall、guard 与 provider | 明确的业务动作、固定治理链和按 Session 选择的 Skill、Tool |

DeepSeek 的[架构文档](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/architecture.md)强调“几乎所有部分都是插件”，没有必须修改的特权核心。xAgent 则保留明确的责任骨架：

```text
DeepSeek: Profile / Bundle -> Cordis Plugin Tree -> Agent Loop
          -> append-only SessionLog -> Tool Pipeline -> LLM / Sandbox / Subagent

xAgent:   Channel / Connector / Trigger -> Brain -> SessionEngine
          -> AgentService -> LLMProvider / ToolService
```

这两套实现解决的是同一层问题，但并不等价。xAgent 也不是 DeepSeek Harness 的 fork、前端或简单封装。

## 为什么普通 Tool Loop 不够

假设一个子会话正在“研究 ComfyUI 并交付 Markdown 指南”，用户接下来可能发送：

- `继续`：延续当前阶段；
- `把刚才的 Markdown 转成 Word`：仍在会话职责内，但交付阶段或能力需求发生变化；
- `顺便帮我查明天的天气`：超出这个专业会话的职责。

如果系统只从最新一句提取关键词，`继续` 几乎没有可用语义；如果每条消息都重建环境，普通补充也会造成能力抖动；如果直接让模型重写目标，语义判断又会变成新的事实 owner。

xAgent 因此把外层任务控制拆成两件事：先判断消息与当前任务边界的关系，再在确有需要时召回和增加能力。

## 当前代码事实：一条输入怎样进入业务 Agent

截至 `82f3a1f6`，子会话的真实链路是：

```text
子会话收到原始消息和稳定资源引用
  -> SessionEngine.AppendToHistory 持久化原始输入
  -> 一次无状态语义调用
  -> task_relation + 三类 recall terms
  -> Brain 执行确定性任务状态转换
  -> [仅 initialize / reconcile] Orchestrator 并行召回与能力选择
  -> SessionEngine.AddSelectedCapabilities
  -> AgentService 进入模型 / Tool loop
```

原始消息先通过 `AppendToHistory` 写入 Chat 事实并同步到 Session 上下文缓存，语义预处理随后才开始。这样，即使辅助模型、召回或编排失败，用户输入也不会消失。

这条预处理只作用于 sub session。MainSession 保持协调与路由职责，不运行这套 task relevance preprocess；审批决定、系统通知和只有附件而没有明确任务文本的输入也会绕过它。

## 一次语义调用只输出四个字段

任务相关度 Agent 是无状态的非流式 JSON 调用。输入只包含：

- 当前消息正文；
- 稳定资源引用，例如 `ref_id`、`protocol`、`filename`、`media_type`；
- `current_task_goal`；
- `session_goal`。

它不读取完整 History，不接收候选 Skill、Tool 或 Memory，不生成 Plan，也不承担 Orchestrator 的候选选择。输出必须严格包含四个字段：

```json
{
  "task_relation": "continue_current",
  "skill_recall_terms": [],
  "tool_recall_terms": [],
  "memory_recall_terms": []
}
```

三组召回词都必须是非 `null` 数组，每组最多 16 项，使用简洁、去重的英文 term，并以 role 表达用途。Skill 与 Tool term 可以表示 method、action、evidence、quality、domain 或 artifact；Memory term 可以表示 entity、topic、context、preference、constraint 或 decision。

这里没有第二次“任务要点提取”模型调用。界面上看到的任务语义理解和后续能力发现，分别对应一次语义预处理与 Orchestrator 阶段。

## 任务关系是枚举，不是两个分数

`task_relation` 只能是下面五个值：

| 枚举 | 语义 | Brain 的确定性行为 |
| --- | --- | --- |
| `establish_task` | 当前消息用于建立任务 | 当前阶段目标为空时，直接用已经持久化的原始消息建立目标 |
| `continue_current` | 延续、澄清或修正当前任务 | 保持目标和能力，继续执行 |
| `change_within_session` | 仍在会话职责内，但阶段或能力需求变化 | 原始消息成为新的阶段目标，进入 reconcile |
| `outside_session_scope` | 不属于当前子会话的全局职责 | 不覆盖已有目标和能力，交给当前 Agent 结合上下文处理 |
| `uncertain` | 现有事实不足以稳定判断 | 保持现状，不自动改变任务事实 |

Brain 不使用 score threshold，也不让模型生成一段“改写后的目标”。当当前阶段目标为空时，原始用户消息就是任务目标；当关系为 `change_within_session` 时，原始消息成为新的阶段目标；其他关系都保留已有 goal。

Session 仍区分全局目标与当前阶段目标。全局目标表达长期职责，阶段目标表达正在推进的工作。摘要、Plan 和 Task 可以引用它们，但不能反向成为 goal owner。

## 只有两种状态会触发 Orchestrator

只有任务首次初始化的 `initialize`，或 `change_within_session` 产生的 `reconcile`，会进入能力环境准备。继续当前任务、职责外输入和不确定输入不会重新选择能力。

Orchestrator 并行召回三类上下文：

- Skill 候选；
- ToolSet 与已启用单 Tool 候选；
- 当前用户的长期 Memory。

召回 score 只用于候选截断、排序和调试日志，不进入最终编排 Prompt，也不驱动 Brain 的任务关系转换。候选在进入模型前按稳定引用排序，避免同一输入因并发完成顺序不同而产生随机排列。

下面这次客服运营周报运行展示了语义理解、能力发现和编排阶段。它不是“三种模型角色”的串联，也不是两次任务语义提取：

![xAgent 在接收客服运营周报任务后显示任务语义理解、能力查找和任务编排状态](/img/insights/agent-harness/task-environment-orchestration-zh.webp)

## 编排只增加能力，不建立第二个事实中心

Orchestrator 消费已经对齐的任务、三类 recall terms、当前能力和召回候选，输出需要新增的 ToolSet、Tool 与 Skill。SessionEngine 通过 `AddSelectedCapabilities` 原子合并这些选择：

- 保留已经加载的能力；
- 补齐默认 discovery 能力；
- 只增加，不隐式删除；
- 不创建 Session；
- 不改写 task goal；
- 不选择或修改模型、AgentDefinition 和特殊角色。

删除能力必须走显式卸载流程。模型配置与 Agent 身份也继续由各自 owner 解析，不能因为能力编排而被顺手替换。

编排完成后，用户仍可检查当前会话实际加载的 Skill 和 Tool：

![xAgent 会话高级配置显示任务编排后实际选中的数据可视化、周报 Skill 与计划和文件工具](/img/insights/agent-harness/selected-capability-environment-zh.webp)

## 接收任务的子会话自己理解任务

MainSession 可以判断由哪个子会话承担工作，但发送方只传递原始 request 和稳定资源引用，不替接收方预选 Skill、Tool 或执行 Prompt。接收方把协作请求当作自己的真实输入，自己运行任务理解和能力准备。

这条边界可以概括为“谁执行，谁理解”。它避免父会话把自己的候选空间、过期能力或推断结果变成子会话事实，也让创建、移交与实际执行保持解耦。多会话协作方式见[多 Agent 会话事件协作](/docs/guides/multi-agent-session-event-collaboration)。

## 外层增强失败时继续执行

语义预处理失败时，xAgent 保留已经持久化的输入、现有 goal、能力和压缩边界，然后继续进入业务 Agent。Orchestrator 或 Memory 召回失败时也不会先清空环境；已有能力与默认 discovery 工具仍然可用，Agent 可以在执行中按需发现能力。

这不是忽略错误，而是明确外层增强的失败边界：它可以少提供一次预选能力，但不能夺走原始输入、既有任务事实或主执行链。

用户通常会看到类似状态：

```text
正在理解任务语义
  -> 正在发现 Skill、Tool 与 Memory
  -> 正在编排任务能力
  -> 正在应用任务环境
```

继续当前任务时，后面三个阶段不会发生。能力如何进入会话，可继续阅读[AI Agent 如何按需发现和加载工具与 Skill](/docs/guides/ai-agent-dynamic-tool-discovery)。

## 架构判断：xAgent 不应照搬 everything-is-plugin

DeepSeek Harness 的插件树为替换模型适配、工具管线、持久化、Sandbox 和 Subagent provider 提供了很强的组合能力。xAgent 的优势则来自稳定 owner：Brain 负责调度与任务状态转换，SessionEngine 协调会话事实，AgentService 负责内层循环，ToolService 负责治理。

因此，值得借鉴的是清晰的 capability seam 和可观察证据，而不是把 xAgent 的每个核心责任都改成插件。后者会让已经建立的事实 owner 重新变得模糊。

作为未来改进，xAgent 可以在文档中正式定义 Harness 边界，并补充 prompt、tool schema、model config 与各 owner fact version 的请求证据投影；但这些证据只能用于审计和重建，不能成为第二套事实 owner。这些是架构建议，不是本文声称已经实现的能力。

## 下一篇：对齐之后怎样持续执行

外层任务控制解决的是“这条消息与当前任务是什么关系，以及是否需要补充能力”。接下来，业务 Agent 才进入模型和 Tool 的固定执行循环。

下一篇[《xAgent Agent Harness（下）：一次任务如何持续执行、暂停与恢复》](/insights/xagent-agent-harness-execution-loop)将对照 DeepSeek 的 Agent Loop、SessionLog、Tool pipeline 和 crash repair，说明 xAgent 的唯一 runner、审批、上下文压缩与恢复为什么属于另一种事实模型。
