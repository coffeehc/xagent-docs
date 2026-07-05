# xAgent Docs

这是 xAgent 官方文档站项目，基于 Docusaurus、TypeScript 和 Markdown / MDX 构建。

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

- `docs/`：正式文档、架构说明、参考资料和 Changelog。
- `blog/`：技术文章、产品更新和社区运营内容。
- `.codex/prompts/write-doc.md`：Codex 辅助写作规范。

## 搜索

第一阶段使用 `@easyops-cn/docusaurus-search-local` 提供本地搜索。修改插件配置或升级 Docusaurus 后，必须运行 `npm run build` 验证兼容性。
