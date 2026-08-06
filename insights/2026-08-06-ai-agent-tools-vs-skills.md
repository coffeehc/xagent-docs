---
slug: ai-agent-tools-vs-skills
title: Skill、Tool 和 MCP 到底是什么关系？我们在 xAgent 里跑了一遍
description: 在 xAgent 中加载 deep-research Skill，调用 MCP 官方文档服务器提供的 Tool，沿真实运行记录说明 Skill、Tool 与 MCP 的区别。
authors: [xagent]
tags: [ai-agent, skills, tools, mcp]
image: /img/share/zh/xagent-shared-skills.png
---

最近聊 AI Agent，Skill、Tool 和 MCP 几乎总会一起出现。问题也出在这里：把三个词并排摆出来，很容易让人以为它们是三种同类能力，选了一个就不需要另外两个。

实际不是这样。**Tool 是 Agent 能调用的具体动作；Skill 保存完成一类任务的方法；MCP 负责让外部服务按统一协议把 Tool、Resource 和 Prompt 提供给 Agent 应用。** MCP Server 提供的 Tool，进入 Agent 的运行环境后仍然是 Tool。

我们没有停在概念解释上，而是在 xAgent 里配置了 MCP 官方文档服务器，创建一个独立会话，让它加载研究 Skill、检索官方资料、生成报告，再重新读取报告做验收。下面的结论都能在这次运行记录里找到对应证据。

![xAgent 完成 Skill、Tool 与 MCP 真实调用验证](/img/insights/ai-agent-tools-vs-skills/verification-complete.webp)

{/* truncate */}

## 这次任务怎么跑

任务本身不复杂：核验 Skill、Tool 与 MCP 的区别，结果写入 `skill-tool-mcp-verification-zh.md`。为了避免 Agent 用普通网页搜索绕过测试，我们在提示词里加了两个限制：

1. 只允许使用已经配置的 MCP Official Docs Server 检索公开资料；
2. 如果找不到来源明确的 MCP Tool，就停止任务，不能拿同名原生 Tool 顶替。

同时要求它先创建持久化计划，加载 `deep-research` Skill，最后重新读取产物并核对章节、来源和结论。这几项要求分别验证计划、Skill、MCP Tool 和文件 Tool，刚好能把容易混淆的部分拆开。

### 计划和 Skill 是两件事

会话先调用 `plan_create` 建立五步计划，然后用 `skills_find` 找到 `deep-research`，再通过 `skills_load` 加载。Tool 返回的 `accepted_skill_ids` 中确实有 `deep-research`，所以这不是回复里的一句“我会使用深度研究能力”，而是一次可以核对的加载动作。

![xAgent 创建计划并加载 deep-research Skill](/img/insights/ai-agent-tools-vs-skills/plan-and-skill-load.webp)

这里已经出现了两类不同的东西：

- `deep-research` 规定怎样组织研究、记录证据和验收报告；
- `plan_create`、`skills_find`、`skills_load` 负责改变当前会话的实际状态。

前者是 Skill，后者是 Tool。Skill 可以告诉 Agent 应该加载什么、先做什么、什么时候停止，但它不会因为提到了某个 Tool，就自动获得那个 Tool 的调用权限。

### 找到 MCP Tool 之后，还要真正调用

下一步是发现 MCP Server 提供的能力。会话找到了两个 Tool：

- `search_model_context_protocol`：搜索 MCP 官方文档；
- `query_docs_filesystem_model_context_protocol`：读取匹配的官方文档内容。

它们被加入当前会话的 Tool 集合后，`search_model_context_protocol` 实际调用了 4 次，分别检索 MCP 架构、Tool、Resource 以及 Agent Skill；`query_docs_filesystem_model_context_protocol` 调用了 2 次，用于读取命中的官方资料。

![xAgent 实际调用 MCP Tool 搜索和读取官方文档](/img/insights/ai-agent-tools-vs-skills/mcp-tool-calls.webp)

这段运行记录很关键。`tools_find` 和 `tools_select` 是 xAgent 用来发现、装载能力的系统 Tool；真正来自 MCP Official Docs Server 的，是后面两个带有 `model_context_protocol` 标识的 Tool。不能因为一个 Tool 参与了 MCP Tool 的发现，就把它也算成 MCP Tool。

### 文件生成不等于任务结束

检索完成后，会话生成了 12,433 字节的 Markdown 报告。接下来它没有直接宣布完成，而是重新读取文件，检查是否包含直接结论、对比表、调用记录、来源链接和常见问题，最后再把计划中的验证步骤设为完成。

最终运行结果可以压缩成一张表：

| 运行对象 | 这次实际发生了什么 |
| --- | --- |
| Skill | `deep-research` 通过 `skills_load` 加载成功 |
| MCP Server | 连接 MCP Official Docs Server |
| MCP Tool | `search_model_context_protocol` 调用 4 次 |
| MCP Tool | `query_docs_filesystem_model_context_protocol` 调用 2 次 |
| 系统 Tool | 创建计划、发现和加载能力、创建和读取文件、更新任务状态 |
| 产物 | `skill-tool-mcp-verification-zh.md` 创建后重新读取并通过检查 |

## 从运行记录看三者的边界

现在再回到定义，就容易理解多了。

### Tool 是一个可以执行的动作

Tool 一般有名称、用途、输入参数和结构化返回值。读取文件、查询数据库、执行计算、发送消息，都可以做成 Tool。

在 xAgent 里，Tool 可能来自不同地方：

| 来源 | 例子 | 谁负责运行 |
| --- | --- | --- |
| xAgent Runtime | 文件、计划、任务和能力发现 | xAgent |
| MCP Server | 搜索、数据库或业务 API | 对应 MCP Server |
| Connector | 飞书、微信、邮件或企业系统动作 | Connector 与外部平台 |

对模型来说，它们都是可调用的动作；对管理员来说，来源决定了认证、网络、权限、故障处理和数据边界由谁负责。

### Skill 保存的是方法

Skill 适合保存一套会重复使用的工作方法，例如研究步骤、判断规则、输出格式、停止条件和参考材料。它可以指导 Agent 组合多个 Tool，但不代替 Tool 执行外部动作。

[MCP 官方的 Agent Skills 指南](https://modelcontextprotocol.io/docs/develop/build-with-agent-skills)把 Skill 描述为可移植的指令集合，用来为 Agent 提供特定任务所需的领域知识。xAgent 的 `deep-research` 也是这个角色：它约束研究过程，而搜索和读取仍由具体 Tool 完成。

如果只是临时读一个文件，没有稳定流程，没必要专门做 Skill。反过来，如果合同审查、竞品研究、周报或发布检查每次都要遵守同一套规则，Skill 就很合适。

### MCP 解决的是接入

按照 [MCP 官方架构说明](https://modelcontextprotocol.io/docs/learn/architecture)，AI 应用作为 Host，为每个 MCP Server 维护对应的 Client。Server 可以暴露三类核心能力：

- Tool：可以调用的函数；
- Resource：提供上下文的数据；
- Prompt：可复用的交互模板。

Client 可以通过 `tools/list` 发现 Tool，再用 `tools/call` 发起调用。也就是说，MCP 规定外部能力怎样被发现和调用，但真正执行动作的仍然是 Server 提供的 Tool。更完整的协议定义可以查看 [Tools 规范](https://modelcontextprotocol.io/docs/concepts/tools)和 [Resources 规范](https://modelcontextprotocol.io/docs/concepts/resources)。

把这次运行画成一条线，大致是这样：

```text
用户目标
  -> deep-research Skill：规定研究步骤和验收要求
  -> xAgent Tool：维护计划、加载能力和保存产物
  -> MCP Client：连接 MCP Official Docs Server
  -> MCP Tool：搜索并读取官方资料
  -> xAgent Tool：重新读取报告并完成验收
```

## 三个常见误区

### MCP Tool 是不是和普通 Tool 完全不同？

不是。MCP Tool 仍然是 Tool，只是由 MCP Server 提供。它和 xAgent 原生 Tool 的主要差别在来源、通信链路和运行责任，而不是调用形式上谁更高级。

### 加载 Skill 后，会自动获得它需要的 Tool 吗？

不会。Skill 能说明应该使用哪些能力，但当前会话仍然要能发现并加载对应 Tool，用户也必须具备所需权限。涉及删除、发送或其他外部副作用时，审批策略仍然有效。

### Tool 返回成功，任务就算完成了吗？

不一定。Tool 成功只能证明某个动作执行完了。报告是否完整、文件是否真的存在、外部数据是否可信、消息是否发到正确对象，都需要单独验收。这也是本次任务在生成文件后又重新读取一次的原因。

## 放到实际业务里怎么组合

假设要分析销售表、补充公开市场数据并生成报告：分析 Skill 可以规定指标和报告结构；表格与文件 Tool 负责读取和生成文件；市场数据 MCP Server 提供查询 Tool；报告确认后，再由 Connector 使用用户身份发送摘要。

这些能力可以独立替换。更换市场数据服务时，不一定要重写分析方法；调整报告标准时，也不必改 MCP Server。边界清楚之后，权限、测试和故障定位都会简单很多。

在 xAgent 中继续配置和验证这些能力，可以参考：

- [创建、测试和发布 Skill](/docs/user-guide/skill)
- [查看 Tool 的来源、权限与调用结果](/docs/user-guide/tool)
- [按需发现和加载 Tool 与 Skill](/docs/guides/ai-agent-dynamic-tool-discovery)
- [配置 Tool 审批边界](/docs/guides/agent-approval-security)
