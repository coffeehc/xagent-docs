---
title: "如何使用 xAgent 完成第一个 AI Agent 任务"
description: "通过一个目标明确、结果可验收的示例，学习如何向 xAgent 描述任务、上传材料、确认工具调用并查看生成结果。"
status: stable
updated: 2026-10-24
---

# 使用 xAgent 完成第一个任务

## 先选一个交付目标 {/* #choose-an-outcome */}

- **不用文件验证团队协作：** [把三条给定事实整理成短文](#first-success-agent-team-brief)，核对研究、编辑与经理验收。
- **把会议决定和待办保存成文件：** 使用下方[虚构会议记录练习](#完整案例整理会议记录)，检查 Markdown 与 CSV 产物。示例输出用于说明验收方式，不是已执行的业务结果。

[Agent Teams 实测](/blog/xagent-agent-teams-field-test)记录了另一轮实际执行，包括失败和人工纠偏。可用它了解要检查什么，不应将其当作本练习的结果保证。

## 开始前 {/* #开始前 */}

- 已有 xAgent 账号和可用服务地址：直接登录会话界面，不需要自己安装服务器或创建智能体。
- 还没有服务：请由管理员完成[安装与初始化](/docs/getting-started/install)及模型验证。
- 准备一份不含密码、密钥或真实敏感资料的小文件。下面的会议案例是练习示例，不代表已经执行的业务结果。

## 首次成功：用智能体团队整理材料 {/* #first-success-agent-team-brief */}

把给定事实整理为可以核查的英文短文：研究成员提取事实，编辑成员使用研究回报，经理检查结果。无需联网搜索、外部连接、上传文件或额外 Skill，一个人也可以带领团队。

### 前置条件与费用 {/* #team-prerequisites-and-cost */}

使用已有且获得授权的实例。[公开演示入口](https://xagent.51apis.com)可供检查，但不保证始终开放、具有可用模型或剩余容量；不要提交私人材料。否则请管理员按[安装指南](/docs/getting-started/install)准备服务。本练习无需桌面客户端或浏览器扩展。

本次复核的公开 Server 版本为 `v0.1.1`，请核对实际安装版本。按[模型配置](/docs/user-guide/model-config)准备支持 Tool calling 的聊天模型。连接测试成功不等于工具调用通过，下面的实际派工需要单独验收。

Free 版当前整个部署允许 1 个 WorkGroup 和 30 个活跃、未归档会话；本练习需要经理及两名成员会话。容量已占用时，可复用自己拥有的空测试团队，不要为腾容量归档其他工作。参见[版本容量限制](/docs/faq/common)。

模型服务可能对初始化、后续上下文和重试收费，免费二进制不包含免费模型用量。使用你已批准的模型和费用上限，观察用量并在达到上限时停止；自然语言要求不能作为账单硬上限。

### 创建团队并提交目标 {/* #create-the-team-and-submit-the-goal */}

1. 选择“新团队”，命名为 `First success`。
2. 团队职责填写：`Coordinate one English source-to-brief exercise using only facts supplied in the goal. Wait for the goal. No publishing, external systems, recurring work, or unrelated sessions. Deliver once, then remain idle.`
3. 打开经理会话。创建后可能自动启动需求梳理；若没有具体目标却持续执行，使用“终止当前执行”，等待停止完成后再提交任务。只有经理的“已就绪”团队仍属于配置状态。
4. 确认所选模型，粘贴以下完整任务。保留英文便于复现英文交付：

```text
Complete one bounded English source-to-brief exercise.
Use ONLY these supplied facts:
F1: Creating a team initializes a dedicated manager.
F2: Concrete goals are supplied after creation; members are recruited as needed.
F3: The owner can guide the manager and inspect member sessions.

Recruit exactly two members: Researcher and Editor. Give each at most one assignment.
Researcher: return a three-row table of Fact ID and supported fact, without adding claims.
After receiving that report, Editor: write an English brief of at most 90 words
using [F1], [F2], [F3], followed by one sentence stating that this exercise does
not measure speed, cost, or unattended reliability.
Manager: verify both member replies against F1-F3, return the final brief and a
three-item acceptance checklist, then remain idle.

Use only team coordination and status tools. Do not use files, shell, web,
other sessions, external services, publishing, schedules, persistent plans,
extra goals or archival. If blocked, report the blocker instead of retrying
blindly. Do not claim completion until both member replies and the final
text are inspectable.
```

这些任务要求不能替代工具权限和审批策略。

### 检查并验收结果 {/* #inspect-and-accept-the-result */}

- 打开团队树中的 Researcher，核对实际收到的派工和三行回报是否与 F1–F3 一致；发送回执不足以证明完成。
- 打开 Editor，检查编辑发生在研究回报之后，短文包含三个事实标记，未增加产品能力声称。
- 回到经理，比较最终短文与两份成员回报；自行检查正文不超过 90 个英文词、单独的限制说明和三项验收清单，确认交付后停止且未启动新目标。

三项全部通过才算首次成功。安装、团队创建、“已就绪”或经理的承诺都不算。本练习不测量并行加速或无人值守可靠性。

### 在原团队中恢复 {/* #recover-in-the-same-team */}

| 现象 | 下一步 |
| --- | --- |
| 模型缺失或连接失败 | 检查 Provider 类型、模型 ID、Base URL、凭据和服务端网络。`v0.1.1` 保存时会测试连接，但测试失败的配置仍可保存。 |
| 无法创建团队或成员 | 检查 WorkGroup、会话容量及账号权限；适用时复用已有空测试团队。 |
| 经理空闲而成员仍在执行 | 查看成员实际收到的派工和回报，不要盲目重建团队或重发任务。 |
| 成员报错或等待、引用无效 | 保留原派工，请经理检查已有回报并说明阻塞；引用无效不能证明原任务没有执行。 |
| 意外文件、外部动作或额外目标 | 停止受影响的执行，核对工具记录和实际影响，再在原经理会话给出窄范围修正；停止不会撤销已完成的影响。 |
| 结果不完整或语言不对 | 利用已有回报要求补齐结果或英文交付，并记录此次人工介入。 |

[已发布实测](/blog/xagent-agent-teams-field-test)保留了另一项中文任务的真实截图、人工纠正和引用失败，不能与自己的结果合并统计。之后如需练习文件交付，可继续下方会议案例，核对实际文件。

## 从提交到验收 {/* #从提交到验收 */}

1. 打开会话界面，选择一个已有会话或新建一个任务会话。
2. 粘贴目标；涉及文件时先上传材料，并在消息中明确文件名或使用界面插入的文件引用。
3. 提交后查看消息和工具执行状态。遇到补充问题先补材料；遇到审批先检查目标、参数和影响，再决定是否同意。
4. 完成后打开实际文件预览，核对内容，再下载或继续修改。只出现文件名或“已完成”的文字不等于文件已经保存。
5. 验收通过后再决定是否外发。练习任务不需要连接外部账号，也不需要为了省事放宽审批规则。

## 基本用法 {/* #基本用法 */}

描述任务时，可以先使用下面的结构化模板：

```text
目标：
输入材料：
必须遵守的约束：
输出格式：
结果保存位置：
```

不需要机械填写每一项。任务越复杂，越应该明确材料范围、限制条件和结果形式。

一个适合新手的任务可以这样写：

```text
请把这段需求整理成待办清单，按“必须 / 应该 / 可选”分组，最后给出一个 Markdown 表格。
```

如果任务涉及文件，先上传文件或把文件放到工作区，再说明要处理哪个文件：

```text
请阅读我刚上传的会议记录，整理决策、待办、负责人和截止时间，并保存为 Markdown。
```

提交后关注三件事：

1. xAgent 是否请求补充材料。
2. 是否出现需要确认的工具调用或权限请求。
3. 最终结果是直接回复，还是保存到了工作区产物中。

如果结果不符合预期，继续在同一个页面中补充要求，例如“保留原始表述”“增加风险列”“把结果保存成 CSV”。

## 练习：提取会议决定与待办 {/* #完整案例整理会议记录 */}

### 输入 {/* #输入 */}

上传一份名为 `meeting-notes.md` 的会议记录，其中包含讨论内容、决定、负责人和时间要求。也可以先将下面的虚构内容保存成同名文件：

```text
示例会议：新版本测试准备
决定：先向测试用户开放，再根据反馈扩大范围。
张三负责在 7 月 18 日前整理测试问题清单。
发布范围需要进一步确认，负责人和截止日期尚未确定。
风险：部分问题还没有复现步骤。
```

### 任务 {/* #任务 */}

```text
请读取 meeting-notes.md，提取会议决定、待办事项、负责人、截止时间和风险项。
生成一份便于阅读的 Markdown 总结，并把待办事项同时保存为 CSV。
信息不明确时请标记为“待确认”，不要自行补充。
```

### 执行时需要确认 {/* #执行时需要确认 */}

1. xAgent 是否读取了正确的文件。
2. 是否保留了原文中能够确认的负责人和日期。
3. 信息缺失时是否明确标记，而不是自行猜测。
4. 最终是否同时生成 Markdown 和 CSV 文件。

### 输出 {/* #输出 */}

工作区中可以得到：

```text
meeting-summary.md
meeting-actions.csv
```

`meeting-summary.md` 的内容可以类似：

```markdown
## 会议决定

- 新版本先向测试用户开放，再根据反馈扩大范围。

## 待办事项

| 待办 | 负责人 | 截止时间 | 风险 |
| --- | --- | --- | --- |
| 整理测试问题清单 | 张三 | 7 月 18 日 | 部分问题缺少复现步骤 |
| 确认发布范围 | 待确认 | 待确认 | 需要负责人补充 |
```

这个案例的验收标准很明确：来源文件正确、关键信息可追溯、缺失内容没有被编造，并且两个结果文件都已保存。

## 卡住时先看什么 {/* #卡住时先看什么 */}

| 现象 | 先检查 | 下一步 |
| --- | --- | --- |
| 无法发送或没有可用模型 | 管理员是否完成初始化，当前模型是否可用 | [模型配置](/docs/user-guide/model-config) |
| 提示找不到文件 | 文件是否上传成功、是否在当前会话可访问范围内 | [工作区文件](/docs/user-guide/workspace) |
| 一直等待确认 | 是否存在待处理审批，或任务正在等你补充信息 | [审批与安全边界](/docs/guides/agent-approval-security) |
| 回复有结果但没有文件 | 是否明确要求保存，实际写入是否成功 | [任务与交付](/docs/user-guide/task) |

## 相关文档 {/* #相关文档 */}

- [任务](/docs/user-guide/task)
- [长任务](/docs/user-guide/long-task)
- [工作区](/docs/user-guide/workspace)
