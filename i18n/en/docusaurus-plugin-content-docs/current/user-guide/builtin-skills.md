---
title: xAgent Built-in Skill Files
description: Browse xAgent beta built-in Skill files, their scope, community improvement workflow, and contribution boundaries that avoid third-party MCP-specific behavior.
status: stable
updated: 2026-07-11
---

# xAgent Built-in Skill Files

## Who This Is For

This page is for users and contributors who want to view, modify, discuss, or submit improvement proposals for xAgent built-in Skills.

## What It Is

The repository contains a copy of xAgent built-in Skill files in the `skills/` directory. These Skills currently cover a set of common scenarios for the beta release. They are still early in development, and pull requests are welcome.

These Skills ship with the beta release to cover common work scenarios early and let real users view, try, and improve them. Their descriptions, workflows, templates, and boundaries are still being refined. They live in the documentation repository so community feedback can improve them over time, not because the current version is final.

Their location in the documentation repository is:

```text
skills/
```

You can view and edit built-in Skill text, templates, references, and examples there, then use GitHub issues or pull requests to discuss an improvement.

## Important Notes

- `skills/` is an editable copy in the documentation repository, not the installation directory of a running xAgent instance.
- Changes in the documentation repository do not immediately alter released xAgent binaries.
- A built-in Skill must be reviewed, synchronized, and released by maintainers before it enters the product.
- Contributions should stay general, readable, and maintainable. Prioritize better workflows, input requirements, output standards, quality checks, and risk boundaries.
- Safety comes first for teams and companies. Depending on the actual severity of Skill security risks, xAgent may later evaluate a unified Skill Marker or similar mechanism for centralized marking, review, and management.
- A Skill should not depend on a particular third-party MCP, private service, or external account capability. When an external system is needed, describe the business goal, required information, and authorization boundary; leave the concrete integration to xAgent Tool, MCP, or Connector configuration.
- Do not put real keys, customer data, internal addresses, tokens, verification codes, or one-off business material into a Skill.
- You can also submit an issue when you only want to report a problem.

GitHub directory:

[https://github.com/coffeehc/xagent-docs/tree/main/skills](https://github.com/coffeehc/xagent-docs/tree/main/skills)

Report an issue:

[https://github.com/coffeehc/xagent-docs/issues](https://github.com/coffeehc/xagent-docs/issues)

## How to Modify a Skill

A Skill is usually an independent directory whose most important file is `SKILL.md`. Some Skills also include `references/`, `templates/`, `examples/`, `scripts/`, `assets/`, or `LICENSE`.

Use this order when editing:

1. Find the directory, for example `skills/weekly-report/`.
2. Read `SKILL.md` first to understand the scenario, input requirements, processing steps, and boundaries.
3. Update resources in the same directory when you need to change templates, examples, or reference rules.
4. Confirm that every resource mentioned in `SKILL.md` exists.
5. Do not add real sensitive business information.
6. If the change is intended for a product release, update `meta.version` in `SKILL.md`.
7. Submit a pull request on GitHub, or create an issue first to explain the problem.

## Current Coverage

As of July 7, 2026, this copy contains 47 built-in Skill directories. It focuses on practical task scenarios that are suitable for community improvement. The count, categories, and content may change after beta feedback and later review.

| Area | Skill directories |
| --- | --- |
| Reports, writing, and documents | `weekly-report`, `data-visual-report-builder`, `html-report-builder`, `html-slide-builder`, `official-document-drafting`, `document-understanding`, `writing-and-editing`, `blog-writing-workflow` |
| Research and analysis | `deep-research`, `research-synthesis`, `market-research`, `investment-research`, `policy-analysis`, `financial-statement-analysis`, `business-model-analysis`, `pricing-strategy` |
| Contracts, compliance, and proposals | `contract-review`, `compliance-review`, `rfp-proposal-response`, `solution-brief` |
| Customers, sales, and operations | `customer-support`, `customer-success`, `sales-outreach`, `crm-pipeline-management`, `marketing-campaign`, `social-media-content`, `ecommerce-operations`, `accounts-receivable-collections` |
| Management, projects, and organization | `project-management`, `operations-process-improvement`, `procurement-and-vendor-management`, `performance-review`, `recruiting-and-hiring`, `learning-and-training`, `personal-productivity`, `internal-comms` |
| Product, engineering, and specialized scenarios | `product-discovery`, `product-requirements`, `code-reading-and-change`, `ai-workflow-automation`, `growth-experimentation`, `knowledge-base-article`, `seo-content-strategy`, `resume-and-interview-prep` |

## Suggestions for Improvements

Good Skill improvements usually focus on one of these areas:

- **Unclear description:** Users cannot tell when to use it.
- **Unclear input requirements:** Users do not know which materials to provide.
- **Overly broad steps:** xAgent cannot reliably repeat the method.
- **Unstable output:** The result structure varies too much from run to run.
- **Insufficient risk boundaries:** It does not say when to confirm, stop, or hand work to a person.
- **Too few examples:** Ordinary users still do not know how to start a task after reading it.
- **Incomplete resources:** `SKILL.md` mentions a template or reference that does not exist in the directory.
- **Heavy dependencies:** A specific third-party MCP, private service, external account, or local tool is treated as a default requirement and prevents reuse by others.

Do not put temporary projects, a single customer, personal accounts, real system addresses, or non-public internal workflows directly into public built-in Skills. Private team workflows are better maintained as personal or team Skills in your own xAgent environment.

## Continue Reading

- [Skill Management](/docs/user-guide/skill)
- [Agent Session](/docs/user-guide/agent-session)
- [Tool Management](/docs/user-guide/tool)
- [What is xAgent](/docs/getting-started/what-is-xagent)
