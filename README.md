# xAgent 使用手册

English: [README.en.md](./README.en.md)

这是 xAgent 官方使用手册项目，基于 Docusaurus、TypeScript 和 Markdown / MDX 构建。

内容定位：先介绍 xAgent 是一个多用户智能工作门户，并说明免费二进制版本用于产品体验和评估；再从功能入手说明菜单、任务、文件、工具、技能、外部连接、触发器和常见问题。技术实现细节、命令和配置只作为维护和定制时的补充，不作为主阅读路径。

## 本地开发

要求 Node.js 20+。

```bash
npm install
npm run start
```

## 构建

```bash
npm run build
```

## 本地预览构建产物

```bash
npm run serve
```

## Cloudflare Workers 部署

当前仓库按 Cloudflare Workers Static Assets 部署。

Workers Git 构建配置：

```text
Build command: npm run build
Deploy command: npx --yes wrangler@latest deploy
Build output directory: build
Root directory: /
Node version: 20 或更高
```

仓库根目录的 `wrangler.jsonc` 声明了 Worker 名称和静态资源目录：

```json
{
  "name": "xagent-docs",
  "compatibility_date": "2026-07-07",
  "assets": {
    "directory": "./build"
  }
}
```

如果 Cloudflare 控制台中的 Worker 名称不是 `xagent-docs`，需要同步修改 `wrangler.jsonc` 中的 `name`。

## Cloudflare Pages 部署

Cloudflare Pages 可使用以下配置：

```text
Framework preset: Docusaurus 或 None
Build command: npm run build
Build output directory: build
Node version: 20
```

## 内容结构

首页用于介绍产品与展示任务交付；完整技术文档从 `docs/manual/overview` 进入。侧栏按阅读目标组织为六条路径：了解产品、安装与第一次使用、日常工作、进阶能力、部署与治理、排错与技术参考。

- `docs/getting-started/`：产品定位、安装、第一次使用与能力准备。
- `docs/manual/`、`docs/user-guide/`：页面操作、任务、文件、工具、技能与日常使用。
- `docs/guides/`、`docs/deployment/`：专题说明、安全策略、部署与模型选择。
- `docs/architecture/`、`docs/reference/`、`docs/attachments/`：实现边界、命令协议和历史技术参考。维护与扩展细节仍完整保留，不要求普通用户先读完这些材料。
- `docs/faq/`：按问题现象查找答案与排错入口。
- `i18n/en/docusaurus-plugin-content-docs/current/`：与中文 58 篇文档对应的完整英文版本。

只调整导航与阅读顺序，不搬动已发布文档 URL。版本说明须区分公开发布版本、较新的源码行为和用户实际部署版本；历史截图与旧协议示例保留并标明适用范围。

提交前检查：

```bash
npm run typecheck
npm run validate:docs
npm run build
npm run validate:site
```

## 搜索

当前使用 `@easyops-cn/docusaurus-search-local` 提供本地搜索。修改插件配置或升级 Docusaurus 后，必须运行 `npm run build` 验证兼容性。

## 搜索元数据维护

- 当前公开 Server 版本统一维护在 `src/data/product-release.json`；核对正式 Release 后更新，并运行 `npm run sync:release` 同步 `static/llms.txt`。首页展示与结构化数据读取同一个版本。历史更新日志不自动改写。
- 文章只有经过实质修改或重新核实时才添加 `updated: YYYY-MM-DD`，保留原始发布日期。它同时控制可见更新时间、JSON-LD 和 sitemap；不得使用构建时间批量刷新旧文章。
- 首页修订日期记录在 `src/data/content-dates.json`，附对应内容提交作为依据。列表页只继承实际展示文章的明确更新日期；未知日期保持缺省。
- 分享标题与描述使用页面自己的 Open Graph 元数据，X/Twitter 回退到这些值，避免全站套用首页文案。
- `npm run build` 先检查版本一致性；构建后运行 `npm run validate:site` 检查 JSON-LD、日期、分享元数据、链接和分析代码。
