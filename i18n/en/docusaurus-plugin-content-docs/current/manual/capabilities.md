---
title: Supported Agent Capabilities
description: See what xAgent v0.0.13.beta can do through its 51 built-in Skills, together with current file upload, parsing, preview, and output boundaries.
status: beta
updated: 2026-08-29
---

# Supported Agent Capabilities

The `v0.0.13.beta` package includes **51 built-in Skills**. They are not isolated chatbots. They are reusable task methods that xAgent can discover and load dynamically. One task may combine several Skills and then use Tools, MCP, or Connectors for file processing, computation, and external actions.

Use **Operations → Skills** as the source for a specific deployment. Administrators can disable bundled Skills and add personal or shared Skills.

| Current measure | Value | Scope |
| --- | ---: | --- |
| Bundled Skills | 51 | Built-in Skill directories in `v0.0.13.beta` |
| Manual capability groups | 6 | A navigation aid, not a system permission model |
| Web session attachment count and size | Determined by server file capabilities | Validated by file type and upload entry point; the console shows the limit before saving |

![Agent management page in the English xAgent interface](/img/home/v005/xagent-agent-management-en.webp)

> **About the example**
>
> This image comes from the current English Agent management page and environment-specific data is redacted. The page will differ when a deployment adds or disables agents.

## What Tasks Are Supported

The table covers all 51 currently bundled Skills. Users do not need to memorize Skill IDs. State the goal, source material, constraints, and delivery format; xAgent can discover and load suitable capabilities for the task.

| Capability area | What it can help with | Built-in Skills |
| --- | --- | --- |
| Research, analysis, and decision support | Deep research, multi-source synthesis, market and policy analysis, business-model and pricing analysis, investment and financial-statement research, data visualization, and football analysis | `deep-research`, `research-synthesis`, `market-research`, `policy-analysis`, `business-model-analysis`, `pricing-strategy`, `investment-research`, `financial-statement-analysis`, `data-visual-report-builder`, `football-match-analysis` |
| Document understanding and content production | Read and compare material; create articles, official documents, knowledge-base content, meeting material, weekly reports, internal communications, SEO and social content, self-contained HTML reports, slide decks, and template-based Word documents | `document-understanding`, `writing-and-editing`, `blog-writing-workflow`, `official-document-drafting`, `knowledge-base-article`, `meeting-brief`, `meeting-recap`, `weekly-report`, `internal-comms`, `seo-content-strategy`, `social-media-content`, `html-report-builder`, `html-slide-builder`, `visual-design-selector`, `word-document-builder` |
| Product, project, and process work | Product discovery, requirements, solution briefs, project plans, process improvement, AI workflow design, training material, and personal productivity planning | `product-discovery`, `product-requirements`, `solution-brief`, `project-management`, `operations-process-improvement`, `ai-workflow-automation`, `learning-and-training`, `personal-productivity` |
| Marketing, sales, and customer operations | Campaign planning, sales outreach, CRM pipeline review, customer success, customer support, ecommerce operations, and growth experiments | `marketing-campaign`, `sales-outreach`, `crm-pipeline-management`, `customer-success`, `customer-support`, `ecommerce-operations`, `growth-experimentation` |
| Finance, legal, procurement, and people work | Receivables follow-up, budgeting, contract and compliance review, procurement and vendor evaluation, RFP responses, recruiting, performance material, and job-search preparation | `accounts-receivable-collections`, `budget-and-forecasting`, `contract-review`, `compliance-review`, `procurement-and-vendor-management`, `rfp-proposal-response`, `recruiting-and-hiring`, `performance-review`, `resume-and-interview-prep` |
| Technical work and capability extension | Read, explain, debug, modify, and validate code; create, review, and improve xAgent Skills | `code-reading-and-change`, `skill-creator` |

## Example Requests

| Goal | Example request |
| --- | --- |
| Research and reporting | `Research this market, separate facts from inferences and open questions, preserve sources, and create an HTML report.` |
| Multi-document comparison | `Compare the three uploaded proposals. Extract agreements, conflicts, risks, and source evidence in a comparison table.` |
| Meetings and projects | `Extract decisions, owners, due dates, and risks from the meeting notes, then create a project action list.` |
| Spreadsheet analysis | `Analyze revenue, cost, and anomalies in this workbook. Provide KPIs, charts, and a reproducible calculation method.` |
| Contract and compliance work | `Identify liability, term, auto-renewal, data-processing, and breach risks. Do not present the result as formal legal advice.` |
| Code work | `Read the repository and tests first, find the actual cause of this error, change only the necessary scope, and verify it.` |

## Supported Documents

The Web session upload control currently accepts these formats:

| File category | Upload formats | How xAgent handles them |
| --- | --- | --- |
| Images | `.png`, `.jpg`, `.jpeg`, `.webp` | Creates a preview and uses the image for recognition or analysis when the model supports vision input |
| PDF | `.pdf` | Extracts readable content by page and builds an index; Workspace supports PDF preview |
| Word | `.docx` | Extracts headings, paragraphs, and tables; the preview shows extracted text, not native Word layout |
| PowerPoint | `.pptx` | Extracts slide titles, body text, tables, and notes; this is not native slide rendering |
| Spreadsheets | `.xlsx`, `.csv`, `.tsv` | Parses worksheets or delimited rows and columns for filtering, calculation, aggregation, and table preview |
| Web and structured text | `.html`, `.htm`, `.json`, `.xml`, `.yaml`, `.yml` | Removes scripts and styles from HTML before converting it to Markdown; reads the remaining formats as text |
| Text and source code | `.txt`, `.md`, `.log`, `.css`, `.js`, `.jsx`, `.ts`, `.tsx`, `.go`, `.py`, `.java`, `.c`, `.cc`, `.cpp`, `.h`, `.hpp`, `.rs`, `.sh`, `.sql` | Reads, searches, compares, or modifies the material as text |

![Workspace Files page in the English xAgent interface](/img/manual/v005/en/workspace-files.webp)

> **Upload support, content understanding, and preview rendering are different boundaries.** xAgent first prepares readable material for Office, PDF, HTML, and spreadsheet files. It can place short content in task context or let the agent read longer content in indexed blocks. Workspace preview separately renders text, Markdown, HTML, images, PDF, or spreadsheets. Passing the original file to a model as a native attachment still depends on the selected model's vision and file capabilities.

## Common Output Formats

| Output | Current path |
| --- | --- |
| Markdown, TXT, JSON, CSV, and source files | Written directly into the Workspace for summaries, checklists, structured data, and code changes |
| PNG, JPEG, and WebP images | An image-generation-enabled OpenAI-compatible model can create them through `image_generate`; results are stored as immutable Session artifacts and can be previewed |
| XLSX | Created or modified through spreadsheet Tools; availability depends on the Tools and runtime visible to the account |
| Self-contained HTML reports | `html-report-builder` creates responsive, offline reports designed for printing |
| HTML slide decks | `html-slide-builder` creates browser-based presentations; it is not a PPTX editor or exporter |
| DOCX | `word-document-builder` can create a new Word document from a built-in or user-provided template and render it for validation before delivery; availability depends on the capabilities visible to the account |
| PDF | Current Tools can inspect, validate, merge, extract pages from, and optimize PDFs; converting an HTML artifact into a final PDF still depends on an available conversion tool and actual validation |

`word-document-builder` supports creating a new DOCX from a template, replacing a template body, or filling existing placeholders, with rendering checks before delivery. It does not promise arbitrary native DOCX/PPTX in-place editing, tracked changes, comments, macros, automatic tables of contents, embedded fonts, or pixel-identical rendering across systems. Use a dedicated Office toolchain and inspect the final file when those capabilities are required.

## Boundaries

- A Skill provides a method; it does not mean an external system is already connected. Sending messages, writing to a CRM, publishing content, or changing business data requires the corresponding Tool, MCP or Connector, account authorization, and approval policy.
- A scanned PDF with no extractable text may produce no useful content through the current native parser. OCR is a future enhancement area.
- Encrypted, damaged, or oversized files may fail processing. A long document may show partial completion while prepared content remains available through indexed reads.
- Contract, compliance, finance, investment, and people-related Skills support analysis and preparation. They do not replace final judgment by qualified legal, accounting, audit, or other professionals.
- The bundled set may change by release. Use **Operations → Skills** for the live deployment state, and use [Workspace](/docs/manual/workspace) for task files and outputs.
