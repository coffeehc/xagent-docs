---
title: 支持的智能体功能
description: 了解 xAgent v0.0.6.beta 根据 51 个内置 Skill 可以完成的任务，以及文件上传、解析、预览和产物格式的当前边界。
status: beta
updated: 2026-08-01
---

# 支持的智能体功能

`v0.0.6.beta` 源码随包内置 **51 个 Skill**。它们不是彼此隔离的聊天机器人，而是可按任务动态发现和加载的工作方法。一个任务可以组合多个 Skill，再调用 Tool、MCP 或 Connector 完成文件处理、数据计算和外部动作。

实际部署中的可用列表以“运行治理 → Skill”页面为准。管理员可以停用内置 Skill，也可以增加个人或公共 Skill。

| 当前数据 | 数值 | 口径 |
| --- | ---: | --- |
| 随包内置 Skill | 51 个 | `v0.0.6.beta` 内置 Skill 目录 |
| 手册能力分组 | 6 类 | 为便于查找而归纳，不是系统权限分类 |
| Web 会话附件数量与大小 | 以服务端文件能力为准 | 按文件类型和上传入口校验，控制台会在保存前提示限制 |

![xAgent 中文界面的智能体管理图例](/img/home/v005/xagent-agent-management-zh.webp)

> **图例说明**
>
> 图片来自中文界面的当前智能体管理页面，环境专属信息已经脱敏。部署方新增或停用智能体后，页面内容会与本文的能力清单不同。

## 可以完成哪些任务

下表完整覆盖当前 51 个内置 Skill。用户不需要记住 Skill ID，直接说明目标、材料、约束和交付格式即可；xAgent 会按任务发现和加载合适能力。

| 能力方向 | 可以做什么 | 内置 Skill |
| --- | --- | --- |
| 研究、分析与决策支持 | 深度调研、多来源证据综合、市场与政策分析、商业模式和定价分析、投研与财务报表分析、数据可视化、足球赛事分析 | `deep-research`、`research-synthesis`、`market-research`、`policy-analysis`、`business-model-analysis`、`pricing-strategy`、`investment-research`、`financial-statement-analysis`、`data-visual-report-builder`、`football-match-analysis` |
| 文档理解与内容生产 | 阅读和比较材料，生成文章、公文、知识库、会议材料、周报、内部沟通、SEO 与社交内容，以及自包含 HTML 报告、幻灯片和模板化 Word 文档 | `document-understanding`、`writing-and-editing`、`blog-writing-workflow`、`official-document-drafting`、`knowledge-base-article`、`meeting-brief`、`meeting-recap`、`weekly-report`、`internal-comms`、`seo-content-strategy`、`social-media-content`、`html-report-builder`、`html-slide-builder`、`visual-design-selector`、`word-document-builder` |
| 产品、项目与流程 | 产品探索、需求文档、方案简报、项目计划、流程改进、AI 工作流设计、培训材料和个人效率规划 | `product-discovery`、`product-requirements`、`solution-brief`、`project-management`、`operations-process-improvement`、`ai-workflow-automation`、`learning-and-training`、`personal-productivity` |
| 市场、销售与客户运营 | 营销活动、销售触达、CRM 管道梳理、客户成功、客户支持、电商运营和增长实验 | `marketing-campaign`、`sales-outreach`、`crm-pipeline-management`、`customer-success`、`customer-support`、`ecommerce-operations`、`growth-experimentation` |
| 财务、法务、采购与人才 | 应收跟进、预算预测、合同与合规审查、采购与供应商评估、RFP 响应、招聘、绩效材料和求职准备 | `accounts-receivable-collections`、`budget-and-forecasting`、`contract-review`、`compliance-review`、`procurement-and-vendor-management`、`rfp-proposal-response`、`recruiting-and-hiring`、`performance-review`、`resume-and-interview-prep` |
| 技术工作与能力扩展 | 阅读、解释、调试、修改和验证代码；创建、审查和改进新的 xAgent Skill | `code-reading-and-change`、`skill-creator` |

## 常见任务写法

| 目标 | 可以这样描述 |
| --- | --- |
| 研究与报告 | `调研这个市场，区分事实、推断和待验证信息，保留来源，最后生成一份 HTML 报告。` |
| 多文档比较 | `比较我上传的三份方案，提取共同点、冲突、风险和原文证据，输出对比表。` |
| 会议与项目 | `从会议记录提取决策、负责人、截止时间和风险，再生成项目行动清单。` |
| 表格分析 | `分析这个 Excel 的收入、成本和异常项，给出 KPI、图表和可复核的计算口径。` |
| 合同与合规 | `找出合同中的责任、期限、自动续约、数据处理和违约风险；不要把结果表述为正式法律意见。` |
| 代码任务 | `先阅读仓库和测试，定位这个报错的真实原因，只修改必要范围并验证。` |

## 可以处理哪些文档

Web 会话的上传入口当前接受以下格式：

| 文件类别 | 当前可上传格式 | xAgent 的处理方式 |
| --- | --- | --- |
| 图片 | `.png`、`.jpg`、`.jpeg`、`.webp` | 生成可预览图片，并在模型支持视觉输入时用于识别和分析 |
| PDF | `.pdf` | 按页提取可读文本并建立索引；工作区支持 PDF 预览 |
| Word | `.docx` | 提取标题、段落和表格为可读内容；预览的是提取文本，不是 Word 原版式 |
| PowerPoint | `.pptx` | 按幻灯片提取标题、正文、表格和备注；不等同于原版幻灯片渲染 |
| 表格 | `.xlsx`、`.csv`、`.tsv` | 按工作表或分隔行列解析，可用于筛选、计算、汇总和表格预览 |
| 网页与结构化文本 | `.html`、`.htm`、`.json`、`.xml`、`.yaml`、`.yml` | HTML 会去除脚本和样式后转成 Markdown；其余按文本读取 |
| 文本与代码 | `.txt`、`.md`、`.log`、`.css`、`.js`、`.jsx`、`.ts`、`.tsx`、`.go`、`.py`、`.java`、`.c`、`.cc`、`.cpp`、`.h`、`.hpp`、`.rs`、`.sh`、`.sql` | 作为文本材料读取、检索、比较或修改 |

![xAgent 中文界面的工作区文件图例](/img/manual/v005/zh/workspace-files.webp)

> **“可上传”“可理解”和“可预览”不是同一个概念。** xAgent 会先为 Office、PDF、HTML 和表格生成可读材料，再把短内容放入任务上下文，或让长内容按索引分块读取。工作区预览则根据文件类型显示文本、Markdown、HTML、图片、PDF 或表格。是否能把原文件作为原生附件直接交给模型，还取决于所选模型的视觉与文件能力。

## 常见产物格式

| 产物 | 当前方式 |
| --- | --- |
| Markdown、TXT、JSON、CSV 和代码文件 | 可直接写入工作区，适合总结、清单、结构化数据和代码修改 |
| XLSX | 由表格 Tool 创建或修改；是否可用取决于当前账号可见 Tool 和执行环境 |
| 自包含 HTML 报告 | `html-report-builder` 生成可离线打开、响应式且适合打印的报告 |
| HTML 幻灯片 | `html-slide-builder` 生成浏览器演示文稿；它不是 PPTX 编辑器或 PPTX 导出器 |
| DOCX | `word-document-builder` 可基于内置或用户提供模板创建新的 Word 文档，并在交付前渲染验证；具体可用性取决于当前账号可见能力 |
| PDF | 当前 Tool 可检查、验证、合并、抽取页面和优化 PDF；把 HTML 产物转换成最终 PDF 仍取决于当前可用转换工具和实际验证 |

`word-document-builder` 支持基于模板创建新的 DOCX、替换模板正文或填充已有占位符，并在交付前进行渲染检查；它不承诺任意原生 DOCX/PPTX 的就地编辑、修订记录、批注、宏、自动目录、嵌入字体或跨系统像素级一致渲染。需要这些能力时，应使用专门的 Office 工具链并检查最终文件。

## 使用边界

- Skill 提供处理方法，不代表外部系统已经连接。发送消息、写入 CRM、发布内容或修改业务数据，需要对应 Tool、MCP 或 Connector、账号授权和审批策略。
- 扫描版 PDF 如果没有可提取文本，当前原生解析可能得不到有效正文；OCR 属于后续增强方向。
- 加密、损坏或超出处理上限的文件可能无法解析；长文档可能显示为部分完成，但仍可按索引继续读取已准备的内容。
- 合同、合规、财务、投资和人事类 Skill 用于资料整理和决策辅助，不替代律师、会计师、审计师或其他有资质人员的最终判断。
- Skill 清单会随版本调整。查看某个部署中的真实状态，请进入“运行治理 → Skill”；查看文件产物，请进入[工作区](/docs/manual/workspace)。
