# xAgent User Manual

This repository contains the public user manual and contribution materials for xAgent.

xAgent is a server-side, multi-user AI work portal designed for task completion. It is not a CLI project and not primarily a casual chat companion. Teams can prepare models, Skills, Tools, connectors, files, approval rules, and safety boundaries in one web-based system, so users can describe the task, provide materials, confirm sensitive actions, and receive results.

## Beta Notice

xAgent is currently in beta as `v0.0.2.beta`. Many features, built-in Skills, and documentation pages are still being refined.

If you find a problem, please open an issue:

https://github.com/coffeehc/xagent-docs/issues

## English Entry

The English documentation is intentionally small for now:

- Site page: `/en/docs/getting-started/what-is-xagent`
- Source file: [i18n/en/docusaurus-plugin-content-docs/current/getting-started/what-is-xagent.md](./i18n/en/docusaurus-plugin-content-docs/current/getting-started/what-is-xagent.md)

The Chinese manual remains the primary source while the product and documentation are changing quickly.

## Built-in Skill Files

This repository includes selected built-in Skill file copies under:

```text
skills/
```

These files are provided so the community can review and improve early built-in Skills through pull requests. Contributions should focus on general task workflows, inputs, outputs, quality checks, and safety boundaries.

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
