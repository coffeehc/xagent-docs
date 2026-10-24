---
slug: ai-agent-editorial-handoff-acceptance-test
title: "如何协调多个 AI Agent：一次英文写作任务的交接与验收实测"
date: 2026-10-24
description: "xAgent 真实 Writer–Reviewer 实测：独立会话完成70词短文交接，纠正逐句计数，却放过了无依据的事实扩展。查看证据、验收标准与复现步骤。"
authors: [xagent]
tags: [ai-agent, multi-agent, case-study]
image: /img/manual/editorial-qa-20261024/final-report.jpg
---

**协调多个 AI Agent，需要给每个角色有边界的任务，核对真实交接，再用不依赖 Agent 自报结论的标准验收。** 这次英文编辑任务中，xAgent 向独立的 Writer 和 Reviewer 会话派工，最后交付了报告。Reviewer 纠正了逐句词数，却接受了输入事实没有支持的表述。

本篇区分这两个结果：协作流程完成了，严格的事实约束验收没有通过。

![xAgent 最终英文报告：经理已 Idle，侧栏保留 Writer 与 Reviewer，计划5/5完成，同时显示系统自己的PASS结论。](/img/manual/editorial-qa-20261024/final-report.jpg)

*最终界面展示了真实结束状态。PASS 是 xAgent 的结论，不代表独立事实验收通过。界面大部分为英文，默认经理名称仍为中文。截图为未经修改的浏览器原图。*

{/* truncate */}

## 证据摘要

| 检查项 | 实际观察 |
| --- | --- |
| 任务 | 仅根据三条给定事实，写一篇60–80词的虚构产品短文 |
| 环境 | 登录后的个人设置页显示 Enterprise · v0.1.1；模型选择器显示 Qwen3.8-27B。这是界面观察，未核验二进制哈希或后端实际构建。 |
| 角色 | 经理、独立 Writer 会话、独立 Reviewer 会话，有可见派工与回报消息 |
| 交付正文 | 按空白分隔计数为70词，不含标题 |
| 计数 | Reviewer 将逐句数量纠正为21 / 23 / 8 / 18，xAgent之外的确定性复算确认一致 |
| 事实验收 | xAgent 返回PASS；按严格的“仅使用给定事实”标准，存在无依据的扩展 |
| 结束状态 | 经理Idle，计划5/5 Done，最终英文报告及可见7.5 KB附件 |
| 时间 | 输入与最终报告消息的页面时间戳相差26分40秒，不作为速度benchmark |

这是新的一次英文事实约束检验，与[上一篇 Agent Teams 实测](/blog/xagent-agent-teams-field-test)分开记录，不复用前一轮的结果或人工介入。本次关注的问题是：编辑交接完成以后，产物是否也满足明确的内容约束。

## 实验设置：小任务，明确的交付约束

2026年10月24日，我们在测试账号中创建了 **Editorial QA Demo** 团队。输入描述的是虚构产品，没有真实客户数据需要核验或发布：

- Harbor Notes 是一款桌面笔记应用。
- v0.3 新增离线关键词搜索。
- beta 于2026年11月12日开放。

没有提供价格、安全保证、性能benchmark、移动端支持或集成信息。要求一位 Writer 写60–80词，一位 Reviewer 检查所有事实声称及词数；经理汇总结果后停止，不再交付第二稿，也不进行下一轮审查。

实际提交的完整任务如下，保留英文原文：

```text
Please respond and name any newly recruited specialists in English. Run exactly one bounded editorial demo using only the synthetic facts below. Assign one Writer to draft 60–80 words, then one independent Reviewer to check every factual claim and the word count. Do not revise or iterate: report the draft, reviewer findings, actual role/session evidence, and final PASS or FAIL; then stop. If real delegation is unavailable, say so instead of pretending. Do not browse, send external messages, execute code, install anything, change configuration, or use real data. Synthetic facts: The fictional product is Harbor Notes, a desktop note-taking app. Version 0.3 adds offline keyword search. The beta opens on November 12, 2026. No price, security guarantees, performance benchmark, mobile support, or integrations have been specified. Reviewer must flag any invented claims. End with a short list of what was NOT tested.
```

本文的确定性词数复算是在看到结果后，于xAgent之外完成的核验，不是给被测团队安排了代码执行步骤。

## 实际发生了什么

### 停止初始化，然后提交新任务

创建团队后自动开始了一轮初始化。约一分钟后，操作者选择 **Stop current run**。界面确认停止，并在约6秒内进入 **Idle**；随后在同一经理会话提交具体英文任务。

这验证了界面层面的停止控制，以及停止后可以提交新任务。本次没有制造进程崩溃或服务重启，因此不能据此声称验证了崩溃恢复、检查点续跑，或所有可能的子工具都已取消。

提交具体任务以后，操作者没有再发送任务提示、事实纠正或救援指令，后续仅只读查看会话并截图。界面大部分为英文，任务也是英文，但默认经理名与自动生成的初始化消息仍保留中文。

### Writer 收到了真实派工

团队中存在独立的经理、Writer 与 Reviewer 会话。Writer 会话里的 **Team assignment** 消息标明来源经理，并重复了虚构事实与约束。

![Writer 会话中的真实Team assignment消息，包含原始虚构事实以及60–80词要求。](/img/manual/editorial-qa-20261024/writer-task.jpg)

*可见派工证明任务进入了另一会话。会话独立不代表模型错误在统计上相互独立。*

Writer 交付的正文如下：

> Harbor Notes is a desktop note-taking app built for people who think, plan, and capture ideas entirely on their own desktop. Version 0.3 adds offline keyword search, so your entire library can be searched from anywhere, even when you have no connection at all. The public beta opens on November 12, 2026. If your notes live off the grid, you will find them faster here, without ever leaving your desk.

以上保留原文，标题不计入要求的词数。Writer 自述在发送前曾内部修正过一版较短草稿。我们观察到的是一次正式交付和一次 Reviewer 报告，不能由此证明没有内部修改。

### Reviewer 纠正了一类问题，也漏掉了另一类

Writer 自报总数为70词，逐句为 **24 / 21 / 9 / 16**。经理初步复算为 **21 / 22 / 8 / 19**。两者相加都等于70，但均不符合实际四句话的数量。

![经理会话收到Writer报告，显示交付正文及错误的自报逐句词数。](/img/manual/editorial-qa-20261024/writer-draft.jpg)

*只看总数会掩盖计数错误：Writer 的逐句分布不对，虽然相加仍为70。*

Reviewer 给出 **21 / 23 / 8 / 18**，经理后来采用了该修正。将精确正文按空白分隔进行独立复算，确认总数70及四句分布一致。在这个规则下，“note-taking”等带连字符的词仍计为一个空白分隔单元。

不过，Reviewer 同时返回了 **PASS**，认为没有编造事实。它将“public beta”“entire library”和“faster”视为已有事实的转述或营销修辞。

![Reviewer 报告声称零编造并给出PASS，随后列出未测试项目。](/img/manual/editorial-qa-20261024/reviewer-verdict.jpg)

*这是 Reviewer 的真实结论。下文的事实验收判断与它不同；截图没有为了配合本文结论而改写。*

## 为什么事实约束验收没有通过

任务只允许使用给定的虚构事实。“看起来合理”比“输入事实支持”宽松：

| 草稿表述 | 输入实际提供了什么 | 验收判断 |
| --- | --- | --- |
| “The public beta” | beta 的开放日期 | 没有说明向公众开放。 |
| “your entire library can be searched” | v0.3 增加离线关键词搜索 | 没有说明搜索覆盖整个笔记库。 |
| “you will find them faster” | 新增搜索功能，未提供性能benchmark | 没有证明查找体验更快。称为修辞也不能满足严格的输入事实约束。 |

这些例子已经足以使严格事实标准不通过，即使词数标准通过了。它们并不是说 Harbor Notes 实际具有相反的能力：产品本身是虚构的，问题在于短文扩展出了简报之外、没有支持的声称。

审查报告还有一处小问题：将一个包含12个空白分隔单元的引用前缀标为“前10个”。这不影响已核对正确的正文总数，但也说明审查结果本身仍需要检查。

**审查也是模型输出，需要独立的验收标准。** 本轮既展示了有用的计数纠错，也暴露了过于宽松的事实审查。一个样本无法把原因单独归结于模型、提示词、角色设计或运行体系，更不能据此估算某个模型的整体准确率。

## 完成状态、时间与未测试项

成员报告进入经理会话后，可以观察到经理重新开始活动。顺序是先 Writer、再 Reviewer、最后经理收尾；没有测试并行加速。

页面显示的关键时间如下：

| 事件 | 页面时间 |
| --- | --- |
| 提交具体任务 | 05:40:35 |
| Writer 收到派工 | 05:44:03 |
| Writer 报告到达 | 05:48:23 |
| Reviewer 收到派工 | 05:53:32 |
| Reviewer 报告到达 | 05:57:16 |
| 最终聊天报告 | 06:07:15 |

首尾消息时间戳相差 **26分40秒**。这些时间可能代表消息创建时刻，而非精确的生成完成时刻。页面时钟与观察者时钟不同，本文不推断其时区，也不进行换算。最终截图上的 **7m 33s** 是界面显示的某一轮运行历时，不是整个任务的耗时。

最终观察时，经理为 **Idle**，计划显示 **5/5 completed / Done**，英文报告和 **7.5 KB附件**可见。这些确认了流程结束状态，不能证明草稿事实正确，也不能代替附件内容和下载行为的独立验收。

本次没有测量生产可靠性、重复运行成功率、成本、ROI、并发扩展、后端重启恢复、权限执行或安全保证，没有注入故障，也没有对外交付。使用测试账号与虚构材料，不能据此证明真实用户数据保护。具体任务执行期间没有追加人工指令，但准备阶段的停止操作仍是记录的一部分，不能泛化为无人值守可靠性。

## 复现检查方法，而不是复现PASS标签

如果要在自己获授权的实例尝试类似任务：

1. 先按[首次任务教程](/docs/getting-started/first-task#first-success-agent-team-brief)核对模型可用性、容量和费用。该教程使用另一项有边界的练习。
2. 为虚构材料建立独立测试团队，提交前写清 Writer 交付物及 Reviewer 验收标准。具体操作见[虚拟团队手册](/docs/user-guide/virtual-teams)。
3. 打开两个成员会话，核对真实派工与回复，不能用经理“准备派工”的承诺代替交接证据。
4. 验收前保存唯一交付正文。在 Agent 流程之外，用明确的确定性规则计数，再将每项事实声称对应到具体输入。
5. 分别记录交付、词数和事实支持的结果。即使最终消息写PASS，也要保留人工介入及无依据声称；到约定范围即停止，不要反复修改直到结果看起来成功。

这个样本留下了三个具体发现：独立会话完成了交接，Reviewer 纠正了计数分布，事实门槛仍需要外部核验。可用的验收过程应当同时保留这三个结论。
