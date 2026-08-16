---
slug: xagent-agent-harness-execution-loop
title: "xAgent Agent Harness（下）：一次任务如何持续执行、暂停与恢复"
date: 2026-08-15
description: 对照 DeepSeek Harness Agent Loop，了解 xAgent 如何通过唯一 Session runner、AI Agent 上下文管理、Tool loop、审批、压缩与恢复持续执行任务。
authors: [xagent]
tags: [ai-agent, architecture, runtime, approvals, long-running]
image: /img/share/zh/xagent-overview.png
---

外层任务控制完成目标与能力准备后，xAgent 才进入通常所说的 Agent Loop。Brain 控制 Session 级调度，SessionEngine 协调会话事实和运行状态，AgentService 执行固定的模型与 Tool 循环，ToolService 负责调用治理。

这条链路让同一任务可以在 Tool 调用后继续、在高风险动作前等待审批、在上下文变长时压缩、在用户中断时退出，并在具备有效持久化事实时从服务重启中恢复。

这条 AI Agent 上下文管理与执行循环已在 [`0.0.10.beta`](/docs/changelog#v0010beta---2026-08-16) 继续完善；本文聚焦每轮请求如何装配、等待、压缩和恢复。

{/* truncate */}

## 对照基线与判断范围

如果你需要先从整体架构和适用场景做选择，可先阅读[《DeepSeek Harness 与 xAgent：两种 Agent Harness 架构路线怎么选》](/insights/deepseek-harness-vs-xagent)。本文继续深入运行时执行、暂停与恢复。

本文继续使用 2026 年 8 月 16 日的 xAgent `82f3a1f6`，以及 2026 年 8 月 13 日的 [DeepSeek Harness `47f94385`](https://github.com/deepseek-ai/deepseek-harness/tree/47f943859bef60e4160492346772ded9b24f765a) 作为事实基线。DeepSeek Harness 在该提交仍是 developer preview；这里对比的是已经公开的代码与文档，不推断未来稳定接口。

两者都实现了 Harness 层，但采用不同的事实模型：

- DeepSeek 是 composition-first、event-log-first；
- xAgent 是 fact ownership-first、owner-state-first。

这不是同一实现的两种命名。DeepSeek 通过 Cordis 插件树组合能力，并以统一事件日志支持重建与回放；xAgent 通过固定 owner 骨架分层持有状态，以持久化的长任务事实支持跨请求恢复。

## 逐项对齐：执行循环相似，事实边界不同

| 维度 | DeepSeek Harness `47f94385` | xAgent `82f3a1f6` |
| --- | --- | --- |
| 串行化 | `ReactLoopAgent` 的 inbox 与 phase 控制单 Agent 活动 | Brain 通过 SessionEngine 唯一 runner 串行推进 Session |
| 执行单位 | 持久化 `Turn -> Step -> Model + Tools` | Brain 组织 task turn，AgentService 运行内部模型 / Tool loop |
| Session 事实 | 单一 append-only `SessionEvent` log 是主要事实载体 | Chat、SessionMeta、恢复快照、SessionEvent、Memory 按 owner 分层 |
| 上下文装配 | 每个 step 由插件组装，并记录 request header、prompt、tools 与 model config | SessionEngine 从当前 owner facts 动态装配每次请求 |
| Tool 管线 | `pre-execute -> guards -> execute -> post-execute -> finalize` 等插件扩展点 | ToolService 固定线性治理链集中校验和执行事实 |
| Tool 并发 | 支持 `parallel` / `exclusive`，结果按模型原始顺序提交 | 当前按模型返回顺序串行执行 Tool Calls |
| 审批 | active-turn 请求由 Promise 等待，`asked` / `decided` 进入日志 | `RuntimeAuditUnit` 与恢复快照可跨请求、跨重启等待 |
| 压缩 | provider 替换模型可见 surface，原始日志仍保留 | 结构化 continuity summary、checkpoint、pending promotion |
| 崩溃恢复 | 为未闭合调用、step、turn 写 synthetic closer；不续跑 partial turn | 从有效 snapshot 恢复 guidance、approval、compaction 等运行事实 |
| Subagent | spawn、fork 与可替换 provider，可连接进程内、ACP、Codex、Claude Code 等 | Main / Sub Session、SessionEvent 与 Workgroup；接收方自行理解任务 |
| Sandbox | FS、Subprocess、Sandbox provider seam 强调可替换执行世界 | ProcessSandbox、workspace execution lease 与文件变更 reconciliation |

共同点是：一次模型响应不是完整 Harness，一次 Tool 成功也不等于用户目标完成。差别主要在“什么是可恢复事实”以及“扩展应该挂在哪里”。

## DeepSeek 的精确回放为什么更强

DeepSeek 的[架构文档](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/architecture.md)给出一个很明确的约束：`Model-visible means logged`。user message、流式 chunk、assistant message、tool call/result、request header，以及当时的 prompt、tools 和 model config 都能从 Session log 重建。

因此，fork、resume、transcript、telemetry 和 UI replay 可以围绕同一事件流工作。Compaction 也不是删除原始事实，而是在模型可见 surface 上用 summary 替换一段范围，同时保留原始日志和替换证据。

xAgent 不依赖一条精确事件流重建所有请求。它从多个事实 owner 装配当前上下文，这让 DDD 责任更清楚，也便于纠正某个 owner 的状态；代价是“过去某次模型请求究竟看到了哪份 prompt、tool schema 和 owner fact version”的证据不如 DeepSeek 直接。

这是架构判断，不表示 xAgent 缺少持久化，也不表示 DeepSeek 的单日志模型自动适合所有业务事实。

## 当前 xAgent：同一 Session 只有一个 runner

用户消息、Connector 事件、会话协作输入和审批结果可能在相近时间到达。Brain 先通过 SessionEngine 抢占唯一 runner，再顺序消费 input、event、guidance 与 pending。已有 runner 时，新入口只登记唤醒；旧 runner 释放后仍有可执行工作，Brain 再次抢占并继续 drain。

| Owner | 当前责任 | 明确不负责 |
| --- | --- | --- |
| Brain | 输入调度、唯一 runner、确定性任务转换、恢复和中断边界 | 不构造模型请求，不拥有 Tool 业务事实 |
| SessionEngine | 会话队列、History、goals、pending、compression 和恢复材料的业务动作 | 不直接调用业务模型 |
| AgentService | 固定 LLM / Tool loop、重试、loop guard 和结果推进 | 不拥有跨请求等待事实 |
| ToolService | Tool path、enabled/readiness、schema、approval、secret、execution lease 与结果归一化 | 不决定任务关系和 Session goal |

这里的串行化与 DeepSeek inbox / phase 的目标相近，但实现不等价。

## 每次模型调用都从 owner facts 重新装配

AgentService 不长期持有一份可自行修改的 Session History。每次调用模型前，SessionEngine 根据当前事实装配请求，主要包括：

- Session goal 与当前阶段 goal；
- raw History、checkpoint 和当前压缩边界；
- 已加载 Skill、Tool schema 与调用策略；
- Memory、资源引用、附件和 workspace 上下文；
- 当前模型配置、Prompt 与运行策略。

Tool 结果稳定写入后，下一次模型调用重新装配。刚提交的 Tool 结果、能力变化、pending 消费和上下文维护因此进入下一轮，而 AgentService 不建立第二份漂移状态。

这与 DeepSeek “从 log 派生模型 history 并记录完整 request header”的方向不同：DeepSeek 优先保证 exact request replay，xAgent 优先保证当前请求由各 owner 的最新事实产生。

## ToolService 是固定治理链，不是能力缺失

模型可能返回最终文本，也可能返回多个 Tool Call。xAgent 当前按模型顺序逐个执行调用；每个调用经过统一治理后，稳定的 assistant/tool 配对历史才会提交：

```text
模型生成 Tool Call
  -> 解析并匹配当前可用 Tool
  -> enabled / readiness / schema 校验
  -> approval 与 secret 处理
  -> workspace execution lease / runtime 执行
  -> result normalization 与敏感信息清理
  -> assistant tool_call + tool_result 成对落盘
  -> 重新装配下一次模型请求
```

DeepSeek 的[工具管线](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/docs/tool-execution-pipeline.md)有 waterfall、monotonic guard、wrapper、post hook 和 finalize，并可让 `parallel` 调用在受限池中重叠执行，再按模型原始顺序提交结果。它的工具扩展性更强。

xAgent 的扩展形式更固定，但治理事实更集中。不能因为它不是插件式 pipeline，就写成 path、approval、secret、workspace 或结果规范化能力缺失。当前 serial-safe 也是合理默认；只有真实性能数据证明 Tool 并发是瓶颈时，才值得增加 concurrency-safe 分类和 model-order result commit。

客服运营周报任务的时间线连续记录模型输出、文件写入、子任务完成和下一任务开始。它们属于一个长任务的多轮执行：

![xAgent 会话时间线展示模型调用、文件写入和计划任务在同一执行循环中连续推进](/img/insights/agent-harness/agent-tool-loop-zh.webp)

最终 HTML 作为稳定产物直接预览。用户验收的是指标、图表与结论，而不是某一次文件写入是否返回成功：

![xAgent 文件预览展示 Agent 生成的客服运营周报 HTML、核心指标和渠道对比图表](/img/insights/agent-harness/html-report-preview-zh.webp)

## 审批：live Promise 与 durable pending 的差别

DeepSeek 的 approval seam 在 active turn 内发起一次请求，等待 answerer 返回 closed outcome，并把 `approval/asked` 与 `approval/decided` 作为 audit pair 写入 Session log。缺少 answerer 或结果不合法时 fail closed。

xAgent 命中审批时，AgentService 把阻塞的 Tool Call、预分配结果身份与 `PendingRequest` 交给 SessionEngine 的 `RuntimeAuditUnit`。Session 进入等待，当前执行栈退出；用户决定经 Brain 校验并绑定后，AgentService 在下一次 runner 中消费这个 durable pending，再继续原始调用或写入拒绝结果。

因此，xAgent 的审批不是一条新任务消息，也不是仅存于活动调用栈的 Promise。它更适合跨请求、跨重启的长任务等待。DeepSeek 的 asked/decided 日志则提供更直接的单流审计。

## 两边的压缩不是同一个模型

DeepSeek 把 compaction 设计成可选 capability seam。provider 生成 summary，Session surface 用替换操作改变后续模型看到的内容；原始事件、shadowed range、summary 结果和模型调用证据仍保留在 append-only log 中。这一设计偏向审计、回放与模型表面重建。

xAgent 的 Context Compression 偏向语义连续性和崩溃安全提交。SessionEngine 冻结真实 History，选择合法消息边界，SummaryService 生成结构化中间结果，SessionEngine 再校验并提交 checkpoint。continuity summary 关注 Goal、Artifact、Decision、ActiveUserRequest、约束、开放问题和下一步等继续执行事实。

Tool Call 与 Tool Result 不能被压缩边界切断。Session goal 与阶段 goal 仍由 SessionMeta 持有，模型生成的 summary 不能反向覆盖它们。

## active-turn compaction 与重启恢复

单次用户请求可能产生很多轮模型与 Tool 调用，并在同一个 active turn 内耗尽上下文。xAgent 可以压缩已经封口的早期材料，保留当前请求的 continuity anchor；checkpoint 与 pending compaction 先形成可验证提交态，再推进 `ContextStartMessageId`，重启后由 promotion 逻辑完成或丢弃未成立的 pending。

DeepSeek 的 persistence 在冷加载时保留已经落盘的事件，为未闭合的 Tool、step 和 turn 追加 synthetic `unknown` / `interrupted` closer，使日志重新成为合法 transcript。其[持久化说明](https://github.com/deepseek-ai/deepseek-harness/blob/47f943859bef60e4160492346772ded9b24f765a/packages/session/session-persistence/README.md#known-limitations-and-deferred-work)也明确：当前 crash story 是关闭中断 turn，而不是继续 partial turn。

xAgent 的恢复重点不同。Brain 在依赖就绪后读取有效 recovery snapshot，通过同一个 runner 与 AgentService 主链恢复 guidance、pending approval、active-turn compaction 等状态。它不承诺任何外部 Tool 都可无损重放；幂等、重复请求保护和结果查询仍属于 Tool 与外部系统。

所以，更准确的比较是：DeepSeek 更强于日志平衡、精确回放证据和 interrupted transcript；xAgent 更强于长任务业务状态的跨请求、跨重启续跑。

## Subagent 与 Sandbox：相邻能力，不同责任重点

DeepSeek 把 Subagent 做成可替换 provider seam，支持进程内 spawn、fork、ACP，以及 Codex、Claude Code 等外部实现。xAgent 使用 Main / Sub Session、SessionEvent 与 Workgroup 协作；接收子会话拿到原始 request 和资源引用后，自己理解任务并准备能力，父会话不替它预选 Skill 或 Tool。

Sandbox 也体现同样差异。DeepSeek 通过 FS、Subprocess 与 Sandbox seam 替换执行世界，强调 provider 组合；xAgent 的路径是：

```text
Agent Harness
  -> ToolService governance
  -> Workspace Execution Lease
  -> ProcessSandbox
  -> 文件变化 reconciliation
```

不是所有 Tool 都经过 ProcessSandbox，例如远程 MCP 和 Connector Tool 有各自的执行边界；所有 Tool Call 仍经过 Harness 的历史、治理、等待与结果推进。DeepSeek 强在 provider 可替换性，xAgent 强在 workspace 事实治理。详见[Runtime 与 ProcessSandbox](/docs/architecture/runtime)。

## 架构结论与可选改进

当前实现可以得出四个结论：

1. xAgent 已经具备完整 Harness 层，即使没有一个名为 `harness` 的包。
2. DeepSeek 的精确请求回放与工具扩展性更强；xAgent 的 durable approval、active-turn compaction 和 owner-state recovery 更强。
3. 两边的 Session facts、compaction 和 crash recovery 不能用相同术语直接判定实现等价。
4. xAgent 不应为了形式统一而照搬 everything-is-plugin。

可选的未来改进包括：

- 正式把 outer task control、Session runtime、inner Agent loop、Tool governance 和 execution isolation 定义为 xAgent Harness 边界；
- 为 prompt、tool schema、model config 和各 owner fact version 增加只读 evidence projection，提升请求可重建性；
- 只有出现真实性能需求时，再引入 Tool 并发分类与按模型顺序提交结果；
- 继续保留 task relation enum、receiver self-understanding、durable approval、active-turn compaction 和 owner-state correction；
- 收敛 SessionEngine 的 dependency pressure，让事实 owner 暴露更明确的业务动作，减少 passthrough 与跨 owner 操作，而不是把核心全部插件化。

这些是架构建议，不是已经实现的功能。

## 用户最终看到的是交付证据

内部 owner 边界最终投影为用户可理解的运行状态：准备上下文、运行、等待审批、压缩、中断、失败或空闲。任务完成时，最终答复、Session 文件树和显式验收结果共同构成交付证据：

![xAgent 完成客服运营周报后展示 CSV 与 HTML 产物、核心结论和逐项验收结果](/img/insights/agent-harness/task-artifacts-validation-zh.webp)

把两篇文章放在一起看，xAgent Agent Harness 可以概括为：外层控制理解任务关系并增量准备能力，内层循环执行、等待、压缩与恢复；模型提供受约束的语义判断和行动建议，确定性 owner 负责事实、权限和状态转移。
