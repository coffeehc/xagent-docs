# xAgent SEO 候选关键词池

- 最近更新：2026-08-15
- 维护范围：Google 全球英文搜索与中文搜索机会
- 执行协议：[xAgent 文档站 SEO / GEO 执行协议](./seo-geo-protocol.md)
- 当前依据：[2026-07-15 关键词研究快照](./2026-07-15-keyword-research.md)、[2026-08-01 `AI agent vs AI automation` 实跑记录](./2026-08-01-ai-agent-vs-automation-research.md)、[2026-08-02 热词与长尾词扩池](./2026-08-02-hot-and-long-tail-keywords.md)、Search Console、Google Trends、用户问题与 xAgent 当前产品文档
- 更新规则：每周补充和调整状态；发布后 2 至 4 周按页面与查询复盘。没有新证据时保留原状态，不用推测数据补位。

## 状态定义

| 状态 | 含义 | 下一步 |
| --- | --- | --- |
| 已选题 | 已确定主要搜索意图和内容方向 | 完成搜索结果调研与第一手内容写作 |
| 待发布 | 中英文内容、第一手证据和本地校验已经完成 | 人工审阅后发布；发布后进入 2 至 4 周复盘 |
| 优化现有页 | 已有页面负责该意图 | 优化原页，不创建近义页面 |
| 候选 | 与产品能力直接相关，但尚未完成搜索结果和需求验证 | 补充搜索意图、竞争页面和用户问题证据 |
| 观察 | 词义过宽、数据不足或当前优先级较低 | 等待 Search Console、趋势或用户反馈形成新信号 |
| 排除 | 当前搜索意图与产品定位不符 | 不主动生产内容；出现明确新证据后再重新评估 |

## 候选词

每行只记录一个搜索词。落地页为“待定”的候选词，在搜索意图调研完成前不得提前新建页面。

### 已选题

| 关键词 | 语言 | 集群 | 搜索意图 | 目标读者 | 产品事实依据 | 对应落地页 | 来源 | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `AI agent vs AI automation` | EN | Agent 与自动化 | 方案比较 | 技术决策者、自动化负责人 | xAgent 支持目标驱动的任务执行、工具调用、状态保持与人工审批 | `/insights/ai-agents-vs-ai-automation/` | Google Trends 2026-07-15；SERP 2026-08-01；受控实跑 2026-08-02 | 待发布 |
| `agentic AI vs automation` | EN | Agent 与自动化 | 方案比较 | 技术决策者、自动化负责人 | xAgent 支持目标驱动的任务执行、工具调用、状态保持与人工审批 | `/insights/ai-agents-vs-ai-automation/` | Google Trends 2026-07-15；SERP 2026-08-01；受控实跑 2026-08-02 | 待发布 |
| `ai automation` | EN | Agent 与自动化 | 概念与方案选择 | 技术决策者、自动化负责人 | xAgent 可用于解释确定性自动化与 Agent 任务执行的边界 | `/insights/ai-agents-vs-ai-automation/` | Google Trends 2026-07-15；SERP 2026-08-01；受控实跑 2026-08-02 | 待发布 |
| `agentic AI vs traditional automation` | EN | Agent 与自动化 | 方案比较 | 技术决策者、自动化负责人 | xAgent 可用于解释固定流程、Agent 决策和混合执行的边界 | `/insights/ai-agents-vs-ai-automation/` | Google Autocomplete；SERP 2026-08-01；受控实跑 2026-08-02 | 待发布 |
| `when to use AI agents and when not to` | EN | Agent 与自动化 | 选择与风险边界 | 技术决策者、安全负责人 | xAgent 的工具发现、审批和服务端任务状态可用于说明适用与不适用条件 | `/insights/ai-agents-vs-ai-automation/` | Google Autocomplete 2026-08-01；受控实跑 2026-08-02 | 待发布 |
| `AI agent tools vs skills` | EN | Skill、Tool 与 MCP | 概念比较与架构选择 | Agent 使用者、平台工程师 | xAgent 明确定义 Skill 为工作方法、Tool 为具体动作，并按需发现和组合二者 | 待建：`insights/ai-agent-tools-vs-skills` | Google Trends、Autocomplete、SERP 2026-08-02 | 已选题 |
| `AI agent skills vs tools` | EN | Skill、Tool 与 MCP | 概念比较 | Agent 使用者、平台工程师 | xAgent 有当前版本的 Skill、Tool、MCP 来源、加载和治理事实 | 待建：`insights/ai-agent-tools-vs-skills` | Google Autocomplete 2026-08-02 | 已选题 |
| `skills vs tools vs MCP` | EN | Skill、Tool 与 MCP | 能力边界与选型 | Agent 开发者、平台工程师 | xAgent 同时使用 Skill、原生 Tool 与 MCP Tool，可以给出产品内的组合边界 | 待建：`insights/ai-agent-tools-vs-skills` | Google SERP 相关搜索 2026-08-02 | 已选题 |

### 优化现有页

| 关键词 | 语言 | 集群 | 搜索意图 | 目标读者 | 产品事实依据 | 对应落地页 | 来源 | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `self hosted ai agent setup` | EN | 私有化部署 | 部署教程 | 部署工程师、平台管理员 | xAgent 提供服务端部署、模型配置、工作区与运行治理能力 | `guides/self-hosted-ai-agent` | Search Console 2026-07-15 | 优化现有页 |
| `how to host ai agent` | EN | 私有化部署 | 操作教程 | 部署工程师、平台管理员 | xAgent 提供服务端部署、模型配置、工作区与运行治理能力 | `guides/self-hosted-ai-agent` | Search Console 2026-07-15 | 优化现有页 |
| `ai agent hosting` | EN | 私有化部署 | 服务端运行方案 | 技术决策者、部署工程师 | xAgent 在服务端运行长任务，并保留会话与工作区状态 | `guides/self-hosted-ai-agent` | Search Console 2026-07-15 | 优化现有页 |
| `host ai agent` | EN | 私有化部署 | 部署或托管方案 | 部署工程师、平台管理员 | xAgent 作为服务端门户运行，并提供安装、模型、工作区和治理说明 | `guides/self-hosted-ai-agent` | Search Console 2026-08-02：3 次展示 | 优化现有页 |
| `self hosted ai agent platform` | EN | 私有化部署 | 自托管产品选择 | 技术决策者、部署工程师 | xAgent 是可自行部署的多用户 Agent 工作门户，但不宣称源码开源或完全离线 | `guides/self-hosted-ai-agent`；首页 | Google Trends、Autocomplete、SERP 2026-08-02 | 优化现有页 |
| `AI Agent 私有化部署` | zh-CN | 私有化部署 | 部署与数据边界 | 技术决策者、平台管理员 | xAgent 支持自托管、模型接入、用户管理与运行治理 | `guides/self-hosted-ai-agent` | 现有内容主题，待 Search Console 验证 | 优化现有页 |
| `智能体私有化部署` | zh-CN | 私有化部署 | 部署与数据边界 | 技术决策者、平台管理员 | xAgent 支持自托管、模型接入、用户管理与运行治理 | `guides/self-hosted-ai-agent` | 现有内容主题，待 Search Console 验证 | 优化现有页 |
| `如何部署ai agent` | zh-CN | 私有化部署 | 部署教程 | 部署工程师、平台管理员 | xAgent 提供安装、模型配置、服务端运行和升级路径 | `guides/self-hosted-ai-agent` | Search Console 2026-08-01 | 优化现有页 |
| `AI agent tool approval` | EN | 工具治理 | 审批机制 | 安全负责人、平台管理员 | 工具调用支持风险判断、`waiting_approval` 与 Web/IM 审批回复 | `guides/agent-approval-security` | 产品能力与现有页面 | 优化现有页 |
| `AI agent approval workflow` | EN | 工具治理 | 审批流程 | 安全负责人、平台管理员 | 工具调用支持风险判断、`waiting_approval` 与 Web/IM 审批回复 | `guides/agent-approval-security` | 产品能力与现有页面 | 优化现有页 |
| `agent tool permissions` | EN | 工具治理 | 权限与安全 | 安全负责人、平台管理员 | 工具可用性同时受用户授权、连接状态和审批策略约束 | `guides/agent-approval-security` | 产品能力与现有页面 | 优化现有页 |
| `智能体审批` | zh-CN | 工具治理 | 审批机制 | 安全负责人、平台管理员 | 工具调用支持风险判断、等待审批与多入口回复 | `guides/agent-approval-security` | 产品能力与现有页面 | 优化现有页 |
| `agent safety procedures` | EN | 工具治理 | Agent 安全流程 | 安全负责人、平台管理员 | xAgent 以工具权限、审批策略、工作区隔离和人工确认约束高风险动作 | `guides/agent-approval-security` | Search Console 2026-08-01 | 优化现有页 |
| `AI agent security risks` | EN | 工具治理 | 风险识别与控制 | 安全负责人、平台管理员 | xAgent 可用当前审批、密钥、工作区、沙箱和外部权限边界解释部分风险与缓解措施 | `guides/agent-approval-security` | Google Trends、Autocomplete、SERP 2026-08-02 | 优化现有页 |
| `AI agent tool discovery` | EN | 动态能力 | 工具发现机制 | Agent 开发者、平台工程师 | xAgent 通过 `tools_find` 与 `skills_find` 按需发现和加载能力 | `guides/ai-agent-dynamic-tool-discovery` | 产品能力与现有页面 | 优化现有页 |
| `on-demand tool loading` | EN | 动态能力 | 按需加载 | Agent 开发者、平台工程师 | xAgent 按任务需要加载 Tool 与 Skill，避免一次注入全部能力 | `guides/ai-agent-dynamic-tool-discovery` | 产品能力与现有页面 | 优化现有页 |
| `AI agent context management` | EN | 动态能力 | 上下文控制 | Agent 开发者、平台工程师 | xAgent 通过动态能力发现减少无关工具定义占用上下文 | `guides/ai-agent-dynamic-tool-discovery` | 产品能力与现有页面 | 优化现有页 |
| `AI agent workspace isolation` | EN | 工作区隔离 | 多用户文件隔离 | 企业架构师、平台管理员 | xAgent 使用服务端虚拟文件系统落实用户、会话和系统文件边界 | `guides/multi-user-workspace-isolation` | 产品能力与现有页面 | 优化现有页 |
| `virtual filesystem for AI agents` | EN | 工作区隔离 | 技术实现 | Agent 开发者、企业架构师 | xAgent 使用服务端虚拟文件系统管理挂载、访问与工作区投影 | `guides/multi-user-workspace-isolation` | 产品能力与现有页面 | 优化现有页 |
| `多用户智能体工作区隔离` | zh-CN | 工作区隔离 | 多用户文件与权限边界 | 企业架构师、平台管理员 | xAgent 使用服务端虚拟文件系统落实用户、会话和系统文件边界 | `guides/multi-user-workspace-isolation` | 产品能力与现有页面 | 优化现有页 |
| `AI agent session events` | EN | 会话协作 | 事件协作机制 | Agent 开发者、自动化负责人 | xAgent 通过通知与协作事件在独立会话间传递状态和任务 | `guides/multi-agent-session-event-collaboration` | 产品能力与现有页面 | 优化现有页 |
| `multi-agent communication` | EN | 会话协作 | 多 Agent 通信 | Agent 开发者、自动化负责人 | xAgent 使用用户范围内的会话事件和明确目标会话进行协作 | `guides/multi-agent-session-event-collaboration` | 产品能力与现有页面 | 优化现有页 |
| `agent task delegation` | EN | 会话协作 | 任务委派 | Agent 开发者、自动化负责人 | xAgent 支持主会话与子会话通过协作事件分派任务和回传结果 | `guides/multi-agent-session-event-collaboration` | 产品能力与现有页面 | 优化现有页 |
| `agent to agent communication example` | EN | 会话协作 | Agent 间通信示例 | Agent 开发者、自动化负责人 | xAgent 有通知、协作事件、持久队列和同用户会话边界的完整案例 | `guides/multi-agent-session-event-collaboration` | Google Autocomplete、SERP 2026-08-02 | 优化现有页 |
| `AI agent memory management` | EN | 长期记忆 | 记忆保存、召回与治理 | Agent 使用者、平台管理员 | xAgent 只在用户明确要求时保存长期记忆，并区分当前输入、来源、时效与用户边界 | `user-guide/memory` | Google Trends、Autocomplete 2026-08-02 | 优化现有页 |
| `DeepSeek Harness task orchestration` | EN | Agent Harness | 架构比较与任务编排 | Agent 开发者、平台工程师 | xAgent 有阶段目标、会话全局目标、任务相关度和按需能力编排的当前实现，可与 DeepSeek Harness 的插件式运行边界做事实对照 | `/en/insights/xagent-agent-harness-task-alignment/` | DeepSeek 官方页面、官方 GitHub 与 SERP 2026-08-15 | 优化现有页 |
| `DeepSeek Harness 任务编排` | zh-CN | Agent Harness | 架构比较与任务编排 | Agent 开发者、平台工程师 | xAgent 有阶段目标、会话全局目标、任务相关度和按需能力编排的当前实现，可与 DeepSeek Harness 的插件式运行边界做事实对照 | `/insights/xagent-agent-harness-task-alignment/` | DeepSeek 官方页面、官方 GitHub 与 SERP 2026-08-15 | 优化现有页 |
| `DeepSeek Harness agent loop` | EN | Agent Harness | 执行循环与运行时架构 | Agent 开发者、平台工程师 | xAgent 有 Session runner、动态上下文、Tool loop、审批、压缩和恢复的当前实现，可与 DeepSeek Harness 的 Turn、Step 和事件日志做事实对照 | `/en/insights/xagent-agent-harness-execution-loop/` | DeepSeek 官方架构文档与 SERP 2026-08-15 | 优化现有页 |
| `DeepSeek Harness Agent Loop` | zh-CN | Agent Harness | 执行循环与运行时架构 | Agent 开发者、平台工程师 | xAgent 有 Session runner、动态上下文、Tool loop、审批、压缩和恢复的当前实现，可与 DeepSeek Harness 的 Turn、Step 和事件日志做事实对照 | `/insights/xagent-agent-harness-execution-loop/` | DeepSeek 官方架构文档与 SERP 2026-08-15 | 优化现有页 |

### 候选

| 关键词 | 语言 | 集群 | 搜索意图 | 目标读者 | 产品事实依据 | 对应落地页 | 来源 | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `AI agent Telegram bot` | EN | 消息入口与连接器 | Telegram 接入方案 | 集成工程师、自动化负责人 | xAgent Connector 支持 Telegram 消息入口、用户绑定与会话路由 | 待定：Connector 场景指南 | 产品能力与内容缺口 | 候选 |
| `AI agent messaging` | EN | 消息入口与连接器 | 外部消息接入 | 集成工程师、自动化负责人 | Connector 可持有外部通道状态，并主动向 xAgent 投递消息和事件 | 待定：Connector 场景指南 | 产品能力与内容缺口 | 候选 |
| `AI agent connector` | EN | 消息入口与连接器 | 连接器概念与实现 | 集成工程师、Agent 开发者 | Connector 负责认证、通道状态、主动事件与会话路由 | 待定：Connector 场景指南 | 产品能力与内容缺口 | 候选 |
| `智能体接入微信` | zh-CN | 消息入口与连接器 | 微信接入方案 | 集成工程师、业务自动化负责人 | xAgent Connector 支持微信消息入口、用户绑定与会话路由 | 待定：Connector 场景指南 | 产品能力与内容缺口 | 候选 |
| `AI agent skills` | EN | 团队 Skill 复用 | Skill 概念与使用 | Agent 使用者、平台管理员 | xAgent 支持内置、公共和个人 Skill，并按任务动态发现 | 待定：个人与公共 Skill 协作指南 | 产品能力与内容缺口 | 候选 |
| `shared agent skills` | EN | 团队 Skill 复用 | 团队共享能力 | 团队负责人、平台管理员 | 个人 Skill 可先验证，再由管理员纳入公共库供团队使用 | 待定：个人与公共 Skill 协作指南 | 产品能力与内容缺口 | 候选 |
| `agent skill management` | EN | 团队 Skill 复用 | Skill 治理 | 团队负责人、平台管理员 | xAgent 区分个人、公共和内置 Skill 的来源与管理责任 | 待定：个人与公共 Skill 协作指南 | 产品能力与内容缺口 | 候选 |
| `智能体技能管理` | zh-CN | 团队 Skill 复用 | Skill 治理 | 团队负责人、平台管理员 | xAgent 区分个人、公共和内置 Skill 的来源与管理责任 | 待定：个人与公共 Skill 协作指南 | 产品能力与内容缺口 | 候选 |
| `AI agent vs workflow automation` | EN | Agent 与自动化 | 工作流方案比较 | 技术决策者、自动化负责人 | xAgent 可用于比较固定工作流、动态工具选择和人工确认 | 先由 `insights/ai-agents-vs-ai-automation` 覆盖 | Google Autocomplete 2026-08-01 | 候选 |
| `agentic AI vs process automation` | EN | Agent 与自动化 | 流程自动化比较 | 技术决策者、自动化负责人 | xAgent 可用于解释确定性流程与目标驱动执行的组合方式 | 先由 `insights/ai-agents-vs-ai-automation` 覆盖 | Google Autocomplete 2026-08-01 | 候选 |
| `AI agent workflow example` | EN | Agent 工作流 | 实际任务流程 | 自动化负责人、Agent 使用者 | xAgent 可以提供真实的材料输入、能力发现、工具执行、审批和文件交付案例 | 待定：真实任务案例 Blog | Google Trends、Autocomplete、SERP 2026-08-02 | 候选 |
| `AI agent memory system` | EN | 长期记忆 | 记忆系统与架构 | Agent 开发者、平台工程师 | xAgent 有跨会话长期记忆、会话状态和上下文压缩，但需要先核对完整实现再写架构内容 | 待定：先做代码事实审计 | Google Trends、Autocomplete、SERP 2026-08-02 | 候选 |
| `智能体工作流搭建` | zh-CN | Agent 工作流 | 工作流设计与落地 | 自动化负责人、Agent 使用者 | xAgent 可组合 Agent、Skill、Tool、Trigger 与审批完成任务流程，但不是固定画布式工作流产品 | 待定：真实任务案例 Blog | Google Autocomplete 2026-08-02 | 候选 |
| `智能体平台架构` | zh-CN | Agent 平台 | 平台架构理解 | 企业架构师、平台管理员 | xAgent 有服务端运行、模型、会话、工作区、能力加载、连接与治理边界 | 待定：先做全产品架构事实审计 | Google Trends、Autocomplete 2026-08-02 | 候选 |

### 观察与排除

| 关键词 | 语言 | 集群 | 搜索意图 | 目标读者 | 产品事实依据 | 对应落地页 | 来源 | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `AI agent` | EN | 泛行业词 | 概念、产品或方案探索 | 泛 AI 用户 | xAgent 属于 Agent 产品，但该词没有独占的产品意图 | 无单独落地页 | Google Trends 2026-07-15 | 观察 |
| `智能体` | zh-CN | 泛行业词 | 概念、产品或方案探索 | 泛 AI 用户 | xAgent 属于智能体产品，但当前中文指数没有可用量级数据 | 无单独落地页 | 百度指数 2026-07-15 无公开数据 | 观察 |
| `llm agent` | EN | 泛技术词 | 技术概念 | LLM 开发者 | xAgent 使用 LLM 驱动任务执行，但该词意图偏技术科普 | 无单独落地页 | Google Trends 2026-07-15 | 观察 |
| `multi-agent system` | EN | 泛技术词 | 框架、论文与系统设计 | 研究者、Agent 开发者 | xAgent 有会话协作能力，但不以学术多 Agent 框架为主定位 | 无单独落地页 | Google Trends 2026-07-15 | 观察 |
| `agent session` | EN | Agent 会话 | 产品、概念或操作 | Agent 使用者、开发者 | xAgent 有独立会话状态、工作区和长任务能力，但当前查询意图不明确 | `user-guide/agent-session` | Search Console 2026-08-01 | 观察 |
| `connector agent` | EN | 消息入口与连接器 | 产品或架构概念 | 集成工程师、Agent 开发者 | xAgent Connector 负责外部通道、主动事件和会话路由 | `user-guide/connector` | Search Console 2026-08-01 | 观察 |
| `agent connector` | EN | 消息入口与连接器 | 产品或架构概念 | 集成工程师、Agent 开发者 | xAgent Connector 负责外部通道、主动事件和会话路由 | `user-guide/connector` | Search Console 2026-08-01 | 观察 |
| `approval agent` | EN | 工具治理 | 产品、概念或审批机制 | 安全负责人、平台管理员 | xAgent 支持按风险策略等待人工批准或拒绝工具动作 | `guides/agent-approval-security` | Search Console 2026-08-01 | 观察 |
| `AI agent security framework` | EN | 工具治理 | 完整安全框架 | 安全负责人、平台架构师 | xAgent 当前审批页只覆盖部分控制，不能冒充完整的行业威胁模型 | `guides/agent-approval-security` | Google Autocomplete 2026-08-02 | 观察 |
| `best ai agent` | EN | 评测词 | 产品排行与比较 | 采购者、泛 AI 用户 | 当前没有完整、可复核的跨产品评测依据 | 无 | Google Trends 相关查询 2026-07-15 | 排除 |
| `free ai agent` | EN | 价格词 | 免费在线服务 | 价格敏感型个人用户 | 自托管仍涉及服务器和模型成本，不符合“完全免费”预期 | 无 | Google Trends 相关查询 2026-07-15 | 排除 |
| `AI coding agent` | EN | 编程 Agent | 代码生成与开发 | 软件开发者 | xAgent 不以代码 Agent 为主定位 | 无 | Google Trends 相关查询 2026-07-15 | 排除 |
| `autonomous agent` | EN | 自主 Agent | 无人干预执行 | Agent 开发者、泛 AI 用户 | xAgent 强调权限、审批和人工控制，不承诺完全自主运行 | 无 | Google Trends 2026-07-15 | 排除 |
| `AI agent skills marketplace` | EN | Skill 市场 | 公开技能发现与分发 | Agent 使用者、Skill 作者 | xAgent 当前只有部署内的个人、公共和内置 Skill，不提供公开 marketplace | 无 | Google Autocomplete、SERP 2026-08-02 | 排除 |
| `智能体平台开源` | zh-CN | Agent 平台 | 开源平台选择 | 技术决策者、开发者 | xAgent 当前是免费二进制测试版，官方文档明确说明不等于源码开源 | 无 | Google Autocomplete 2026-08-02 | 排除 |

## 每周维护记录

| 日期 | 新增或调整 | 依据 | 下一次检查 |
| --- | --- | --- | --- |
| 2026-08-01 | 用 2026-07-15 研究结果初始化词池；补齐语言、意图、目标读者、产品事实、落地页和状态 | 研究快照、现有产品文档 | 下次获得 Search Console 28 天对比数据时 |
| 2026-08-01 | 完成 `AI agent vs AI automation` SERP 实跑；补充 46 个联想词的筛选结果和 Search Console 新查询 | 实时 SERP、Google Autocomplete、Search Console、站点构建检查 | 发布前补做 Ahrefs 或 Keyword Planner 数值核验 |
| 2026-08-01 | 完成 114 份中英文 Docs/Blog 源内容责任审计；相近页面意图边界清楚，本轮不合并页面、不新增近义落地页、不调整关键词状态 | 全站内容清单与生成站点审计 | 部署后按页面检查 Search Console 查询落点 |
| 2026-08-02 | 扩展 6 个产品主题集群；新增 Tools/Skills/MCP 已选题，并补充部署、安全、记忆、会话协作、工作流和中文平台候选 | Search Console、4 组 Google Trends、15 个 Autocomplete 种子、4 组 SERP 意图抽查 | 先完成 Agent 与自动化文章，再制作 Tools/Skills/MCP 内容简报 |
| 2026-08-02 | 完成 Agent 与自动化中英文 Insights、真实计划与审批截图、失败产物复验、持久化修复计划和发布前站点校验 | xAgent 受控实跑、真实 CSV 解析器、双语生产构建、浏览器桌面与移动 QA | 人工审阅后发布；发布 2 至 4 周后按页面复盘 Search Console |
| 2026-08-15 | DeepSeek Harness 开发者预览发布后复核官方页面、GitHub 和当前 SERP；将任务编排与 Agent Loop 两组比较意图分配给已有双语 Harness Insights，保留 xAgent 标题与 slug，避免误导和页面竞争 | DeepSeek 官方页面、官方 GitHub、官方架构文档与 SERP 2026-08-15 | 发布后 2 至 4 周按四个页面分别复盘 Search Console 查询落点 |
