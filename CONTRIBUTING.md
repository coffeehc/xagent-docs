# Contributing

本文说明 xAgent 文档站的维护规则。

## 文档写作原则

- 使用中文 Markdown。
- 语气客观、清晰、工程化。
- 不写营销文案。
- 不编造未实现功能。
- 不把规划能力写成已实现能力。
- 涉及具体命令、API、配置或行为时，必须回查代码或已有稳定文档。

## 术语一致性

所有文档必须使用 `docs/reference/glossary.md` 中定义的术语。

新增术语时必须同步：

- `docs/reference/glossary.md`
- 相关概念页
- `docs/changelog.md`

## Changelog 更新要求

修改功能行为说明、术语、文档结构或用户可见入口时，必须同步 `docs/changelog.md`。

未发布内容放在 `Unreleased`。

不要编造版本号。

## Codex 修改范围

Codex 默认只允许修改：

- `docs/`
- `blog/`
- `sidebars.ts`
- `docusaurus.config.ts`
- `README.md`
- `CONTRIBUTING.md`
- `.codex/prompts/`

如需修改其他文件，必须说明原因。

## 文档状态说明

`status` 只允许使用：

- `stable`
- `experimental`
- `planned`
- `deprecated`

如果功能尚未稳定，正文必须明确标记：

```md
> 状态：实验性能力，接口可能变化。
```

如果功能尚未实现，正文必须明确标记：

```md
> 状态：规划中。
```

## PR 检查清单

- [ ] 文档使用中文 Markdown。
- [ ] 没有编造未实现功能。
- [ ] 新增术语已同步 `docs/reference/glossary.md`。
- [ ] 功能行为变化已同步 `docs/changelog.md`。
- [ ] 链接可以正常访问。
- [ ] `npm run build` 可以通过。
