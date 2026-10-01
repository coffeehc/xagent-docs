---
title: "支持的智能体功能"
description: "按任务选择 xAgent 能力，区分版本清单与部署可用状态，并了解文件上传、解析、预览和 Word、Excel、PowerPoint 产物边界。"
status: beta
updated: 2026-10-01
---

# 支持的智能体功能

本页保留 `v0.0.20.beta` 随包内置 **54 个 Skill** 的版本清单，便于按任务查找和比较。它们不是彼此隔离的聊天机器人，而是可按任务动态发现和加载的工作方法。一个任务可以组合多个 Skill，再调用 Tool、MCP 或 AgentPlugin 完成文件处理、数据计算和外部动作。

当前公开 Server 版本为 [v0.0.21.beta](https://github.com/coffeehc/xagent-releases/releases/tag/v0.0.21.beta)。该版本的公共 Skill catalog 使用逐项制品：每个 Skill 对应独立、不可变的 ZIP 和 `skill.json`，不再生成公共 Skill 整包或执行旧的启动迁移。因此，下面的 54 项是明确版本的参考清单，不是新版部署的固定数量承诺。

实际部署中的可用列表以“运行治理 → Skill”页面为准。管理员可以停用内置 Skill，也可以增加个人或公共 Skill；页面卡片数量还会受到安装来源和可见范围影响，不能用来反推某个发布包的内置数量。

| 数据范围 | 数值 | 口径 |
| --- | ---: | --- |
| 随包内置 Skill | 54 个 | `v0.0.20.beta` 内置 Skill 目录 |
| 手册能力分组 | 6 类 | 为便于查找而归纳，不是系统权限分类 |
| Web 会话附件数量与大小 | 以服务端文件能力为准 | 按文件类型和上传入口校验，控制台会在保存前提示限制 |

## 从任务开始 {/* #从任务开始 */}

- **想知道能做什么：** 先看[任务分组](#%E5%8F%AF%E4%BB%A5%E5%AE%8C%E6%88%90%E5%93%AA%E4%BA%9B%E4%BB%BB%E5%8A%A1)，再参考[任务写法](#%E5%B8%B8%E8%A7%81%E4%BB%BB%E5%8A%A1%E5%86%99%E6%B3%95)。
- **准备上传材料：** 先确认[可上传格式与处理方式](#%E5%8F%AF%E4%BB%A5%E5%A4%84%E7%90%86%E5%93%AA%E4%BA%9B%E6%96%87%E6%A1%A3)，不要把上传成功当成完整理解或原版式预览。
- **需要可下载文件：** 先选择[产物格式](#%E5%B8%B8%E8%A7%81%E4%BA%A7%E7%89%A9%E6%A0%BC%E5%BC%8F)，再检查是否需要额外运行依赖。
- **要连接外部系统：** 查看[AgentPlugin](/docs/user-guide/connector)或[工具管理](/docs/user-guide/tool)，确认连接、账号权限和审批条件。

![xAgent 中文界面的智能体管理图例](/img/home/v005/xagent-agent-management-zh.webp)

> **图例说明**
>
> 图片展示中文界面的智能体管理图例，环境专属信息已经脱敏。部署方新增或停用智能体后，页面内容会与本文的能力清单不同。

## 可以完成哪些任务 {/* #可以完成哪些任务 */}

下表完整保留 `v0.0.20.beta` 清单中的 54 个内置 Skill。用户不需要记住 Skill ID，直接说明目标、材料、约束和交付格式即可；xAgent 会按任务发现和加载合适能力。

| 能力方向 | 可以做什么 | 内置 Skill |
| --- | --- | --- |
| 研究、分析与决策支持 | 深度调研、多来源证据综合、市场与政策分析、商业模式和定价分析、投研与财务报表分析、数据可视化、足球赛事分析 | `deep-research`、`research-synthesis`、`market-research`、`policy-analysis`、`business-model-analysis`、`pricing-strategy`、`investment-research`、`financial-statement-analysis`、`data-visual-report-builder`、`football-match-analysis` |
| 文档理解与内容生产 | 阅读和比较材料，生成文章、公文、知识库、会议材料、周报、内部沟通、SEO 与社交内容，以及自包含 HTML 报告、HTML 幻灯片、Word、PowerPoint 和 Excel 文档 | `document-understanding`、`writing-and-editing`、`blog-writing-workflow`、`official-document-drafting`、`knowledge-base-article`、`meeting-brief`、`meeting-recap`、`weekly-report`、`internal-comms`、`seo-content-strategy`、`social-media-content`、`html-report-builder`、`html-slide-builder`、`visual-design-selector`、`word-document-builder`、`powerpoint-builder`、`excel-workbook-builder` |
| 产品、项目与流程 | 产品探索、需求文档、方案简报、项目计划、流程改进、AI 工作流设计、培训材料和个人效率规划 | `product-discovery`、`product-requirements`、`solution-brief`、`project-management`、`operations-process-improvement`、`ai-workflow-automation`、`learning-and-training`、`personal-productivity` |
| 市场、销售与客户运营 | 营销活动、销售触达、CRM 管道梳理、客户成功、客户支持、电商运营和增长实验 | `marketing-campaign`、`sales-outreach`、`crm-pipeline-management`、`customer-success`、`customer-support`、`ecommerce-operations`、`growth-experimentation` |
| 财务、法务、采购与人才 | 应收跟进、预算预测、合同与合规审查、采购与供应商评估、RFP 响应、招聘、绩效材料和求职准备 | `accounts-receivable-collections`、`budget-and-forecasting`、`contract-review`、`compliance-review`、`procurement-and-vendor-management`、`rfp-proposal-response`、`recruiting-and-hiring`、`performance-review`、`resume-and-interview-prep` |
| 技术工作与能力扩展 | 阅读、解释、调试、修改和验证代码；创建、审查和改进 xAgent Skill；创建可持续复用的智能体 | `code-reading-and-change`、`skill-creator`、`agent-creator` |

## 常见任务写法 {/* #常见任务写法 */}

| 目标 | 可以这样描述 |
| --- | --- |
| 研究与报告 | `调研这个市场，区分事实、推断和待验证信息，保留来源，最后生成一份 HTML 报告。` |
| 多文档比较 | `比较我上传的三份方案，提取共同点、冲突、风险和原文证据，输出对比表。` |
| 会议与项目 | `从会议记录提取决策、负责人、截止时间和风险，再生成项目行动清单。` |
| 表格分析 | `分析这个 Excel 的收入、成本和异常项，给出 KPI、图表和可复核的计算口径。` |
| 合同与合规 | `找出合同中的责任、期限、自动续约、数据处理和违约风险；不要把结果表述为正式法律意见。` |
| 代码任务 | `先阅读仓库和测试，定位这个报错的真实原因，只修改必要范围并验证。` |

## 可以处理哪些文档 {/* #可以处理哪些文档 */}

Web 会话的上传入口当前接受以下格式：

| 文件类别 | 当前可上传格式 | xAgent 的处理方式 |
| --- | --- | --- |
| 图片 | `.png`、`.jpg`、`.jpeg`、`.webp` | 生成可预览图片；配置可用的 OCR 模型后可提取可见文字和必要视觉描述，也可在模型支持视觉输入时用于识别和分析 |
| PDF | `.pdf` | 按页提取可读文本并建立索引；工作区支持 PDF 预览 |
| Word | `.docx` | 提取标题、段落和表格为可读内容；预览的是提取文本，不是 Word 原版式 |
| PowerPoint | `.pptx` | 按幻灯片提取标题、正文、表格和备注；不等同于原版幻灯片渲染 |
| 表格 | `.xlsx`、`.csv`、`.tsv` | Excel 由模型通过原生 Tool 按工作表和区域读取，不再预先内联整份文本；工作区支持表格预览 |
| 网页与结构化文本 | `.html`、`.htm`、`.json`、`.xml`、`.yaml`、`.yml` | HTML 会去除脚本和样式后转成 Markdown；其余按文本读取 |
| 文本与代码 | `.txt`、`.md`、`.log`、`.css`、`.js`、`.jsx`、`.ts`、`.tsx`、`.go`、`.py`、`.java`、`.c`、`.cc`、`.cpp`、`.h`、`.hpp`、`.rs`、`.sh`、`.sql` | 作为文本材料读取、检索、比较或修改 |

![xAgent 中文界面的工作区文件图例](/img/manual/v005/zh/workspace-files.webp)

> **“可上传”“可理解”和“可预览”不是同一个概念。** xAgent 会为 Word、PowerPoint、PDF、HTML 和文本等文件准备可读材料，再把短内容放入任务上下文，或让长内容按索引分块读取。Excel 不再预先内联整份可读文本，Agent 会在需要内容时通过 Excel Tool 读取指定范围。工作区预览则根据文件类型显示文本、Markdown、HTML、图片、PDF 或表格。是否能把原文件作为原生附件直接交给模型，还取决于所选模型的视觉与文件能力。

## 常见产物格式 {/* #常见产物格式 */}

| 产物 | 当前方式 |
| --- | --- |
| Markdown、TXT、JSON、CSV 和代码文件 | 可直接写入工作区，适合总结、清单、结构化数据和代码修改 |
| PNG、JPEG 和 WebP 图片 | 通过 `image_generate` 创建，结果作为不可变会话产物保存并可预览。旧版通过 OpenAI-compatible 配置的生成图片能力开关启用；2026-10-01 当前源码改用专用 OpenAI Images Provider，不能把图片 Provider 设为默认聊天模型 |
| XLSX | `excel-workbook-builder` 可通过原生 Excel Tool 创建和修改可编辑工作簿，支持公式、格式、表格、图表、重算和按需导出 PDF |
| 自包含 HTML 报告 | `html-report-builder` 生成可离线打开、响应式且适合打印的报告 |
| HTML 幻灯片 | `html-slide-builder` 生成浏览器演示文稿；它不是 PPTX 编辑器或 PPTX 导出器 |
| PPTX | `powerpoint-builder` 先规划受众问题与内容顺序，再从声明式规格创建可编辑 PowerPoint，支持产品方案、技术架构、项目进展、经营分析等场景和按需导出 PDF；不支持任意编辑已有 PPTX |
| DOCX | `word-document-builder` 基于内置默认排版创建可编辑 Word 文档，提供统一字体、独立封面、链接目录、表格和品牌样式；也可先检查已有 DOCX，再用 `word_update` 定向修改正文、样式、表格单元格和图片 |
| PDF | 当前 Tool 可检查、验证、合并、抽取页面和优化 PDF；Word、PowerPoint 和 Excel 可通过服务器安装的 LibreOffice 按需导出 PDF |

Word、PowerPoint 和 PDF 预览使用统一的字体及缺字回退策略。Office 转 PDF、Excel 重算所需的 LibreOffice 及系统依赖不在 Server 发布包中，需管理员[安装并验证](/docs/getting-started/install#%E7%AC%AC%E4%B8%83%E6%AD%A5%E5%87%86%E5%A4%87-runtime-assets)。用户也可按管理员策略[创建限时文件分享](/docs/user-guide/file-sharing)。

### Word 创建、模板与编辑边界 {/* #word-创建模板与编辑边界 */}

- **新建与排版：** `word_create` 从 Markdown 或结构化内容块创建完整 DOCX，应用内置默认排版资源、字体、封面、表格和品牌样式；可以根据明确的用户要求调整页面和语义样式。
- **已有模板与占位符：** 当前 `word_create` 没有任意用户模板路径或通用占位符填充参数。用户提供的 DOCX 模板可作为已有文档先由 `word_inspect` 检查，再通过 `word_update` 定向替换正文块，或精确替换正文中的普通文本占位符。这里不承诺处理任意模板字段或自动填充所有模板控件。
- **定向编辑与版本校验：** `word_update` 可修改语义样式、精确匹配的文字、表格单元格、正文块和图片。更新需使用 `word_inspect` 返回的文件 SHA-256；文件已变化时必须重新检查。需要保留原文件时，可将结果写入另一个目标路径。
- **目录：** 新建文档可根据一级至三级标题生成链接目录，并将封面、目录和正文分页。这里支持的是生成链接目录，不承诺任意 Word 自动目录域的编辑或自动维护。
- **未承诺的 Office 特性：** 任意字符偏移编辑、修订记录、Word 批注、宏、嵌入字体或跨系统像素级一致渲染仍不在承诺范围内。

`powerpoint-builder` 创建新 PPTX，不保留或任意修改已有 PPTX/POTX。需要精确复刻原版式或复杂 Office 特性时，应检查最终文件。

## 使用边界 {/* #使用边界 */}

- Skill 提供处理方法，不代表外部系统已经连接。发送消息、写入 CRM、发布内容或修改业务数据，需要对应 Tool、MCP 或 AgentPlugin、账号授权和审批策略。
- 图片附件已支持 OCR，需要管理员配置可用的视觉模型。OCR 当前面向图片；没有文本层的纯扫描 PDF 仍不支持，原生文本解析可能得不到有效正文。
- 加密、损坏或超出处理上限的文件可能无法解析；长文档可能显示为部分完成，但仍可按索引继续读取已准备的内容。
- 合同、合规、财务、投资和人事类 Skill 用于资料整理和决策辅助，不替代律师、会计师、审计师或其他有资质人员的最终判断。
- Skill 清单会随版本调整。查看某个部署中的真实状态，请进入“运行治理 → Skill”；查看文件产物，请进入[工作区](/docs/manual/workspace)。
