---
title: 内置 Skill 文件
status: stable
updated: 2026-07-07
---

# 内置 Skill 文件

## 适用对象

本文适合希望查看、修改、讨论或提交 xAgent 内置 Skill 改进建议的用户和贡献者。

## 这是什么

仓库中提供了一套 xAgent 内置 Skill 文件副本，放在 `skills/` 目录下。目前这些 Skill 主要是为了测试版先覆盖一批常见场景，内容还比较早期，欢迎大家通过 PR 一起完善。

这些 Skill 随测试版一起提供，目的是先覆盖常见工作场景，并尽早让真实用户看到、试用和提出改进意见。当前内容还处在早期整理阶段，部分描述、流程、模板和边界仍需要继续打磨。把它们放到 docs 仓库中，是希望借助社区反馈逐步完善，而不是把当前版本视为最终定稿。

在 docs 仓库中的位置是：

```text
skills/
```

它的用途是让大家能直接查看和修改内置 Skill 的文本、模板、参考资料和示例，再通过 GitHub 提交 issue 或 pull request 讨论改进。

## 重要说明

- `skills/` 是文档仓库中的可编辑副本，不是运行中 xAgent 的安装目录。
- 修改 docs 仓库里的 `skills/` 不会立刻改变已经发布的 xAgent 二进制。
- 内置 Skill 是否进入产品，需要经过维护者审查、同步和后续发布。
- 贡献内容应尽量保持通用、可读、可维护，优先改进任务流程、输入要求、输出标准、质量检查和风险边界。
- 对企业和团队来说，安全始终是第一位的。后续会根据 Skill 安全风险的实际情况，评估是否开发统一的 Skill Marker 或类似机制，用于更集中地标记、审查和管理 Skill。
- Skill 不应绑定特定第三方 MCP、私有服务或外部账号能力。需要外部系统参与时，建议只描述业务目标、所需信息和授权边界，把具体接入留给 xAgent 的工具、MCP 或连接器配置。
- 不要把真实密钥、客户数据、内部地址、token、验证码或一次性业务材料写进 Skill。
- 如果只是反馈问题，也可以直接提交 issue。

GitHub 目录：

[https://github.com/coffeehc/xagent-docs/tree/main/skills](https://github.com/coffeehc/xagent-docs/tree/main/skills)

提交问题：

[https://github.com/coffeehc/xagent-docs/issues](https://github.com/coffeehc/xagent-docs/issues)

## 如何修改

一个 Skill 通常是一个独立目录，最重要的文件是 `SKILL.md`。有些 Skill 还带有 `references/`、`templates/`、`examples/`、`scripts/`、`assets/` 或 `LICENSE`。

修改时建议按下面顺序处理：

1. 找到对应目录，例如 `skills/weekly-report/`。
2. 先阅读 `SKILL.md`，确认它的适用场景、输入要求、处理步骤和边界。
3. 如果需要改模板、示例或参考规则，再同步修改同目录下的资源文件。
4. 确认 `SKILL.md` 中提到的资源文件都真实存在。
5. 不要加入真实业务敏感信息。
6. 如果这次修改准备进入产品版本，更新 `SKILL.md` 里的 `meta.version`。
7. 通过 GitHub 提交 pull request，或先提交 issue 说明问题。

## 当前包含范围

截至 2026 年 7 月 7 日，这份副本包含 47 个内置 Skill 目录。这里优先整理面向实际任务场景、适合社区一起改进的 Skill。随着测试版反馈和后续审计，数量、分类和内容都可能继续调整。

| 范围 | Skill 目录 |
| --- | --- |
| 报告、写作与文档 | `weekly-report`、`data-visual-report-builder`、`html-report-builder`、`html-slide-builder`、`official-document-drafting`、`document-understanding`、`writing-and-editing`、`blog-writing-workflow` |
| 研究与分析 | `deep-research`、`research-synthesis`、`market-research`、`investment-research`、`policy-analysis`、`financial-statement-analysis`、`business-model-analysis`、`pricing-strategy` |
| 合同、合规与方案 | `contract-review`、`compliance-review`、`rfp-proposal-response`、`solution-brief` |
| 客户、销售与运营 | `customer-support`、`customer-success`、`sales-outreach`、`crm-pipeline-management`、`marketing-campaign`、`social-media-content`、`ecommerce-operations`、`accounts-receivable-collections` |
| 管理、项目与组织 | `project-management`、`operations-process-improvement`、`procurement-and-vendor-management`、`performance-review`、`recruiting-and-hiring`、`learning-and-training`、`personal-productivity`、`internal-comms` |
| 产品、技术与专用场景 | `product-discovery`、`product-requirements`、`code-reading-and-change`、`ai-workflow-automation`、`growth-experimentation`、`knowledge-base-article`、`seo-content-strategy`、`resume-and-interview-prep` |

## 修改建议

好的 Skill 修改通常聚焦在下面几类问题：

- 描述不清楚：用户不知道什么时候该用它。
- 输入要求不明确：用户不知道需要提供哪些材料。
- 步骤太笼统：xAgent 不容易稳定复现同一套方法。
- 输出格式不稳定：每次结果结构差异太大。
- 风险边界不足：没有说明什么时候需要确认、停止或转人工。
- 示例不足：普通用户看完仍不知道如何发起任务。
- 资源不完整：`SKILL.md` 提到了模板或参考文件，但目录里没有对应文件。
- 依赖过重：把某个第三方 MCP、私有服务、外部账号或本地工具写成了默认前提，导致其他用户无法直接复用。

不建议把临时项目、单个客户、个人账号、真实系统地址或不可公开的内部流程直接写进公共内置 Skill。确实需要沉淀团队私有流程时，更适合在自己的 xAgent 环境中维护个人或团队 Skill。

## 相关文档

- [Skill 管理](/docs/user-guide/skill)
- [Agent会话](/docs/user-guide/agent-session)
- [Tool 管理](/docs/user-guide/tool)
- [什么是 xAgent](/docs/getting-started/what-is-xagent)
