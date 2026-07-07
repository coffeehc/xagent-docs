# xAgent 使用手册

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

## Cloudflare Pages 部署

Cloudflare Pages 可使用以下配置：

```text
Framework preset: Docusaurus 或 None
Build command: npm run build
Build output directory: build
Node version: 20
```

## 内容结构

- `docs/getting-started/`：项目介绍、快速开始和第一次使用路径。
- `docs/user-guide/`：面向用户的主要使用手册。
- `docs/developer-guide/`：扩展开发和维护说明，默认不放入普通用户阅读路径。
- `docs/architecture/`：技术参考和架构边界，默认不放入普通用户阅读路径。
- `docs/reference/`：命令、配置、术语和排错参考。
- `blog/`：技术文章、产品更新和社区运营内容。
- `.codex/prompts/write-doc.md`：Codex 辅助写作规范。

## 搜索

当前使用 `@easyops-cn/docusaurus-search-local` 提供本地搜索。修改插件配置或升级 Docusaurus 后，必须运行 `npm run build` 验证兼容性。
