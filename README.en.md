# xAgent User Manual

This repository contains the public user manual and contribution materials for xAgent.

xAgent is a server-side, multi-user AI work portal designed for task completion. It is not a CLI project and not primarily a casual chat companion. Teams can prepare models, Skills, Tools, connectors, files, approval rules, and safety boundaries in one web-based system, so users can describe the task, provide materials, confirm sensitive actions, and receive results.

## Beta Notice

xAgent's public beta release reviewed on 2026-10-01 is [`v0.0.21.beta`](https://github.com/coffeehc/xagent-releases/releases/tag/v0.0.21.beta). Newer source behavior and the version installed in a particular environment may differ. Features, built-in Skills, and documentation are still being refined.

If you find a problem, use the public feedback page:

https://xagent.xiagaogao.com/en/docs/cooperation/idea/

## English Entry

The English documentation now covers all 58 Chinese documentation routes. Start at the reading-path overview, then follow the path for your goal:

- Documentation overview: `/en/docs/manual/overview`
- Site page: `/en/docs/getting-started/what-is-xagent`
- Source file: [i18n/en/docusaurus-plugin-content-docs/current/getting-started/what-is-xagent.md](./i18n/en/docusaurus-plugin-content-docs/current/getting-started/what-is-xagent.md)

The six paths are Understand xAgent, Install and Get Started, Everyday Work, Advanced Workflows, Deployment and Governance, and Troubleshooting and Reference. The earlier small-English-edition guidance is superseded by the complete bilingual structure. Keep both languages in sync while the product changes; preserve existing URLs, technical examples, steps, and historical reference material.

## Built-in Skill Files

This repository includes selected built-in Skill file copies under:

```text
skills/
```

These files are provided so the community can review early built-in Skills and propose improvements through the feedback page. Feedback should focus on general task workflows, inputs, outputs, quality checks, and safety boundaries.

Please do not make a Skill depend on a specific third-party MCP, private service, external account, internal URL, or non-public business system. If an external system is needed, describe the business goal, required information, and authorization boundary; leave the concrete integration to xAgent Tools, MCP, or connectors.

## Local Development

Requirements:

- Node.js 20+

```bash
npm install
npm run start
```

Build:

```bash
npm run build
```

Type check:

```bash
npm run typecheck
```

Documentation and generated-site checks:

```bash
npm run validate:docs
npm run build
npm run validate:site
```
