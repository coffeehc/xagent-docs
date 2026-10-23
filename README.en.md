# xAgent User Manual

This repository contains the public user manual and contribution materials for xAgent.

xAgent is an agentic platform for ongoing work. Its core capabilities combine an Agentic Loop, context engineering, long-term memory, resumable tasks, multi-agent collaboration, and tool calling to progress work toward verifiable results. Individuals and teams use the same core capabilities. Private deployment, multi-user access, and centralized configuration are deployment and administration extensions rather than the product's core capabilities.

The documentation starts with what users can accomplish, then explains the capabilities and their boundaries using familiar AI terminology. Long-term memory is enabled by default; context compaction is not lossless retention, task recovery does not guarantee exactly-once external actions, and current A2A support is client-side. Free binary releases support product trials and evaluation, while implementation details and configuration are supporting references.

## Beta Notice

xAgent's current public release, verified on 2026-10-23, is [`v0.1.1`](https://github.com/coffeehc/xagent-releases/releases/tag/v0.1.1). Newer source behavior and the version installed in a particular environment may differ. Features, built-in Skills, and documentation are still being refined.

If you find a problem, use the public feedback page:

https://xagent.xiagaogao.com/en/docs/cooperation/idea/

## English Entry

The English documentation now covers all 59 Chinese documentation routes. Start at the reading-path overview, then follow the path for your goal:

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
node scripts/test-sync-release.mjs
npm run typecheck
```

Documentation and generated-site checks:

```bash
npm run validate:docs
npm run build
npm run validate:site
```

## Search metadata maintenance

- Keep the verified public Server version in `src/data/product-release.json`, then run `npm run sync:release` to synchronize `static/llms.txt`. The homepage and its structured data import the same version. Historical release notes are not rewritten.
- Add `updated: YYYY-MM-DD` only after a substantive article change or factual review; retain the original publication date. This drives the visible update, JSON-LD, and sitemap. Never refresh old posts using deployment time.
- `src/data/content-dates.json` records the homepage revision with its source commit. Listing pages inherit explicit updates only from articles actually displayed. Unknown dates remain absent.
- Page-specific Open Graph titles and descriptions supply the X/Twitter fallback, rather than global homepage copy.
- `npm run build` first checks release consistency. Run `npm run validate:site` after building to check JSON-LD, dates, sharing metadata, links, and analytics.

### Build-cache regression

Docusaurus 3.10.2 can leave server MDX compilation waiting for a client loader that was skipped by a persistent-cache hit. `future.faster.mdxCrossCompilerCache` is explicitly disabled; webpack caching and all content/link checks remain enabled. After changing build-cache configuration, run `node scripts/test-build-cache.mjs`. It builds both locales, removes only generated server caches, then rebuilds and validates the site with warm client caches.
