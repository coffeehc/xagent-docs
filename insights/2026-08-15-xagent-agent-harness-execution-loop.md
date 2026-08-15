---
slug: xagent-agent-harness-execution-loop
title: "xAgent Agent Harness（下）：一次任务如何持续执行、暂停与恢复"
date: 2026-08-15
description: 对照 DeepSeek Harness Agent Loop，了解 xAgent 如何用唯一 Session runner、动态上下文、Tool loop、审批、压缩和恢复持续执行任务。
authors: [xagent]
tags: [ai-agent, architecture, runtime, approvals, long-running]
image: /img/share/zh/xagent-overview.png
---

任务目标与能力环境完成对齐后，xAgent 才进入通常所说的 Agent Loop。但这个循环并不是一个模型进程独自运行到底：Brain 控制会话级调度，SessionEngine 持有运行状态并装配每次请求，AgentService 只负责固定的模型与 Tool 执行流。

这种分工让同一个任务可以在 Tool 调用后继续、在高风险操作前等待审批、在上下文变长时压缩、在用户中断时退出，也可以在具备有效恢复材料时从服务重启中恢复。

{/* truncate */}

## DeepSeek Harness Agent Loop 与 xAgent 内层循环

在 [DeepSeek Harness 官方架构](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md)中，一个 Turn 可以包含零个或多个 Step，每个 Step 包含一次模型请求及其 Tool 执行；循环会装配 Prompt 和 Tool schema、调用模型、运行 Tool pipeline，并把结果追加到 Session 事件日志。这使 `DeepSeek Harness Agent Loop` 和 `DeepSeek Harness Tool Loop` 指向同一个核心问题：一次模型返回 Tool Call 后，运行时如何保存事实并可靠地开始下一步。

xAgent 的内层循环与它遵循相近原则，但执行单元和事实 Owner 不同：

| 对照维度 | DeepSeek Harness | xAgent |
| --- | --- | --- |
| 执行单元 | Turn 由一个或多个模型与 Tool Step 构成 | Brain 驱动 Session task turn，AgentService 执行固定 LLM / Tool loop |
| 持久历史 | 追加式 Session 事件日志提供后续上下文 | SessionEngine 提交 History、pending、checkpoint 和恢复材料 |
| Tool 后续 | Tool pipeline 运行并追加结果事件 | Tool 结果提交后重新装配下一次模型请求 |
| 扩展边界 | 插件可替换模型、Tool、Session 和 Agent Loop 组件 | Brain、SessionEngine、AgentService 与 Tool 事实责任方分工 |

共同点比具体 API 更重要：一次模型响应不是 Harness，一次 Tool 成功也不是任务完成。Harness 必须拥有循环、上下文和继续执行的确定性边界。DeepSeek Harness 目前以[开源开发者预览](https://github.com/deepseek-ai/deepseek-harness)提供这些插件契约；下文只描述 xAgent 当前实现中的执行、等待、压缩与恢复逻辑。

## 外层任务循环与内层执行循环

上一篇[《xAgent Agent Harness（上）：会话如何理解任务变化并调整执行环境》](/insights/xagent-agent-harness-task-alignment)介绍了外层任务控制循环。它决定当前消息属于哪个任务阶段，以及是否需要调整 Skill 和 Tool。

内层执行循环从已经对齐的任务状态开始：

```text
Brain 调度当前 Session
  -> SessionEngine 装配本次模型请求
  -> AgentService 调用模型
  -> 模型返回文本或 Tool Call
  -> 执行、治理或挂起 Tool Call
  -> SessionEngine 提交 assistant / tool 历史
  -> 重新装配下一次模型请求
  -> 最终回复、等待、中断或失败
```

两层循环不能合并。任务控制需要稳定的目标、责任路由和能力环境；模型与 Tool loop 只消费已经准备好的执行上下文。否则每一次 Tool 结果都可能被误当成新的任务输入，每一次用户补充又可能绕开任务状态判断。

## 同一 Session 只有一个 runner

用户消息、Connector 事件、会话协作输入和审批结果可能在相近时间到达。xAgent 不会让它们并发修改同一个 Session 的运行状态。Brain 通过 SessionEngine 取得唯一 runner，串行推进当前输入、pending、事件和补充信息。

| Owner | 在执行链中的责任 | 不负责什么 |
| --- | --- | --- |
| Brain | 输入调度、唯一 runner、继续 drain、恢复和中断边界 | 不构造模型请求，不写 Tool 业务事实 |
| SessionEngine | 队列、任务目标、运行状态、历史、上下文装配、pending 和恢复材料 | 不直接调用业务模型 |
| AgentService | 固定的 LLM / Tool loop、模型重试、loop guard 和 Tool 结果推进 | 不拥有跨请求等待事实 |

runner 释放期间如果又有输入到达，SessionEngine 会记录唤醒请求。Brain 在仍有可执行工作时重新取得 runner，避免旧 runner 退出窗口丢掉一次续跑机会。普通并发输入因此表现为排队，而不是“会话忙碌，请稍后重试”。

## 每次模型调用都重新装配上下文

AgentService 不长期保存一份可自行修改的 History 或 SessionMeta。每次准备调用模型时，它要求 SessionEngine 根据当前事实装配请求，主要包括：

- 当前任务目标与执行目标；
- 可继续使用的会话历史或压缩状态；
- 当前加载的 Skill、Tool schema 和调用边界；
- Memory、资源引用、附件和工作区上下文；
- 当前模型配置、Prompt 与运行策略。

Tool 结果稳定写入后，下一次模型调用再次经过 SessionEngine 装配。这样，刚完成的 Tool 结果、刚应用的能力变化和已经提交的运行状态都会进入下一次请求，而 AgentService 不会持有第二份逐渐漂移的会话事实。

用户在任务运行中保存新的模型或 Skill 配置时，变化只影响后续尚未装配的模型调用，不会改写已经发出的请求或已经开始的 Tool Call。具体边界见[任务执行中的动态切换](/docs/guides/ai-agent-runtime-hot-switching)。

## 模型与 Tool 如何形成固定循环

一次模型调用可能产生最终文本，也可能产生一个或多个 Tool Call。对于 Tool Call，Harness 会执行以下步骤：

1. 保留模型生成的 assistant 消息和 Tool Call 身份。
2. 根据 Tool schema、当前用户、Session、资源与治理策略校验调用。
3. 需要审批时挂起；允许执行时交给 Tool 的事实责任方和 runtime。
4. 把稳定 Tool 结果写入同一会话历史。
5. 重新装配上下文并再次调用模型。

Tool 返回成功只代表一个动作执行完成，不代表用户目标已经完成。模型仍需检查文件、数据、外部状态或其他验收事实，决定继续调用能力、修复结果，还是给出最终答复。

Harness 也会记录重复失败和无进展调用，阻止模型无限重复同一个 Tool 模式。这个 loop guard 是执行保护，不替代 Prompt、Skill 中的任务方法，也不能把尚未完成的目标伪装成成功。

在客服运营周报任务中，时间线连续记录了模型输出、文件写入、子任务完成和下一子任务开始。它们属于同一个任务的多轮执行，而不是多个互不相关的对话：

![xAgent 会话时间线展示模型调用、文件写入和计划任务在同一执行循环中连续推进](/img/insights/agent-harness/agent-tool-loop-zh.webp)

最终生成的 HTML 也可以作为独立产物直接预览。用户检查的是指标、图表和结论是否正确，而不是某一次文件写入调用是否返回成功：

![xAgent 文件预览展示 Agent 生成的客服运营周报 HTML、核心指标和渠道对比图表](/img/insights/agent-harness/html-report-preview-zh.webp)

## 审批是挂起的 Tool Call，不是新任务

当 Tool Call 命中审批策略时，xAgent 会保留原始调用和等待事实，Session 进入 `waiting_approval`。AgentService 退出当前执行栈，跨请求等待状态由 SessionEngine 持有。

用户同意后，Brain 重新取得 runner，AgentService 消费已经确认的 pending，并从原始 Tool Call 继续；拒绝或取消时，该动作不会执行，拒绝结果回到同一任务上下文。审批意见不会进入任务相关度 Agent，也不会被理解成新的任务目标。

这种设计把“模型想做什么”和“系统是否允许执行”分开。模型负责提出动作，Tool governance 把调用归约为可检查事实，审批策略决定放行、拒绝或等待。详细范围见[AI Agent 审批与安全控制](/docs/guides/agent-approval-security)。

## 运行中的补充信息与中断

任务运行时到达的新用户消息或会话事件会进入 SessionEngine 管理的队列，由唯一 runner 在明确边界消费。它们不会直接修改正在执行的模型请求，也不会和当前 Tool Call 并发写同一份运行状态。

如果用户明确中断，SessionEngine 会取消当前 Agent context，Brain 在执行栈返回后统一回正运行状态。中断不会被伪装成模型成功回复；队列里后续存在的新任务时，可以在旧执行栈退出后进入新的处理轮次。

这使“补充要求”“停止当前执行”和“审批一个具体动作”保持为三种不同信号。它们可以影响同一 Session，但不会共用一段含糊的聊天文本来控制运行状态。

## 上下文压缩保存的是继续执行状态

长任务会积累用户消息、模型输出、Tool Call、Tool 结果和能力定义。接近模型上下文预算时，xAgent 通过 Context Compression 释放空间，但不会把它当作普通聊天摘要。

SessionEngine 负责冻结真实 History 快照、选择合法消息边界并维护 checkpoint；SummaryService 只生成语义压缩中间结果；SessionEngine 再校验并提交最终的可继续执行状态。压缩重点保留：

- 当前目标、交付物和进度；
- 仍然有效的约束、决定与工作事实；
- 开放问题和下一步；
- 继续执行需要的稳定产物引用。

Tool Call 与 Tool Result 不能被压缩边界切断。当前会话的全局目标和阶段目标仍来自 SessionMeta，模型生成的压缩结果不能反向成为任务目标 owner。阶段变化可以触发压缩评估，但仍复用同一套 checkpoint、pending 和 finalize 链，不建立第二套“语义压缩”状态机。

## active-turn 压缩让单轮长执行继续

有些任务在用户只发送一次消息后，就会经历很多轮模型和 Tool 调用，甚至在同一个 turn 内达到上下文预算。xAgent 可以对已经封口的早期执行材料做 active-turn 压缩，同时保留当前用户请求的连续性锚点。

这不等于伪造一条新的用户消息，也不把压缩摘要当成原始历史。SessionEngine 仍然使用真实消息边界和 checkpoint，明确区分后端维护的连续性字段与模型生成的语义状态。压缩完成后，下一次模型请求从新的上下文起点继续执行。

对使用者来说，重要结果是长任务不需要因为一次模型上下文即将装满就自动结束；但压缩仍可能损失低价值细节，因此关键材料、决定和中间产物应保存为稳定文件。

## 服务重启后怎样恢复

xAgent 不承诺任何中断都能精确恢复。恢复依赖已经持久化的有效运行快照、pending、checkpoint 和会话状态。服务依赖准备完成后，Brain 扫描可以续跑的 Session，再通过同一条 runner 和 AgentService 主链恢复，而不是启动另一套“恢复版 Agent Loop”。

等待审批的 Session 继续等待，不会因为服务重启绕过确认。未完成的上下文压缩会根据 pending 状态完成提交或回正；缺少有效恢复材料的异常运行态也不会被盲目当作可续跑任务。

因此，准确的说法是“基于有效持久化状态恢复执行”，而不是“任何 Tool 都能无损重放”。外部系统是否支持幂等、重复请求保护和结果查询，仍由对应 Tool 和外部服务决定。

## Agent Harness 不等于 ProcessSandbox

Agent Harness 决定什么时候调用模型、什么时候执行 Tool、怎样等待和怎样继续。ProcessSandbox 解决的是本地命令真正启动时的进程、文件视图、资源和平台隔离。两者位于同一任务链的不同层。

```text
Agent Harness
  -> Tool governance 与 Tool runtime
  -> Workspace Execution Lease
  -> ProcessSandbox
  -> 受约束的本地进程与文件变化提交
```

不是所有 Tool 都经过 ProcessSandbox，例如远程 MCP 或 Connector Tool 有自己的执行边界；所有 Tool Call 仍然需要经过 Harness 的历史、治理、等待和结果推进。沙箱的文件投影与资源限制见[Runtime 与 ProcessSandbox](/docs/architecture/runtime)。

## 用户看到的是同一任务的不同运行状态

这套内部边界最终会投影成用户能理解的状态：正在准备上下文、正在运行、等待审批、正在压缩、已中断、失败或空闲。状态变化来自 owner 已经提交的运行事实，而不是根据聊天文本猜测。

用户可以关闭浏览器后再回来，也可以通过 Connector 接收通知和处理审批。只要服务端仍在运行且任务没有进入等待或失败边界，Brain 会继续推进同一个 Session。如何组织材料、验收和阶段交付，可继续阅读[AI Agent 如何执行长任务](/docs/guides/long-running-agent-task)。

任务结束时，文件树、最终答复和验收结果会共同构成交付证据。下面这次运行同时保留了原始 CSV、HTML 报告、核心指标、主要发现和逐项验收结果：

![xAgent 完成客服运营周报后展示 CSV 与 HTML 产物、核心结论和逐项验收结果](/img/insights/agent-harness/task-artifacts-validation-zh.webp)

把两篇文章放在一起看，xAgent Agent Harness 可以概括为：外层循环负责理解任务和准备环境，内层循环负责执行、等待、压缩与恢复；模型提供语义判断和行动建议，确定性 owner 负责事实、权限和状态转移。
