# 2026-08-01 Google Search 全站审计记录

## 1. 记录定位

本文件保存 2026-08-01 对 xAgent 文档站的学习、审计、修改与验证证据，不是长期规则来源。后续 SEO/GEO 检查统一遵守 [`seo-geo-protocol.md`](./seo-geo-protocol.md)。

## 2. 官方学习范围

- 结构化遍历 Google Search Central 文档导航根页及其 154 个文档入口，共 155 个页面，均成功取得；
- 针对当前站点深入复核 Search Essentials、技术最低要求、垃圾内容政策、有用内容、生成式 AI 内容、Google AI 功能、抓取与索引、链接、URL、canonical、sitemap、redirect、`noindex`、robots、JavaScript SEO、移动优先、标题链接、摘要、站点名称、日期、图片、页面体验、结构化数据、Article、多语言、Search Console、流量下降、Trends 与 Core Web Vitals；
- 把 Google 官方要求、官方建议、条件性增强和 xAgent 内部门槛分层写入协议，未把第三方套路或竞品共同结构改写成 Google 排名规则。

主要依据：

- [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=zh-cn)
- [Search Essentials](https://developers.google.com/search/docs/essentials?hl=zh-cn)
- [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=zh-cn)
- [Google AI features and your website](https://developers.google.com/search/docs/appearance/ai-features?hl=zh-cn)
- [Google's guide to optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide?hl=zh-cn)
- [Managing multi-regional and multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites?hl=zh-cn)
- [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals?hl=zh-cn)

## 3. 审计范围

| 对象 | 数量 | 检查方式 |
| --- | ---: | --- |
| 中文 Docs 源文件 | 53 | front matter、结构、内容责任、内部链接与双语对应 |
| 英文 Docs 源文件 | 53 | 同上，并检查正文语言与中文事实一致性 |
| 中文 Blog 源文件 | 4 | front matter、内容责任、图片、内部链接与双语对应 |
| 英文 Blog 源文件 | 4 | 同上，并检查 Docusaurus 翻译路径是否实际生效 |
| 生成 HTML | 152 | 自动检查索引状态、元数据、H1、canonical、hreflang、Schema、语言、图片、链接与锚点 |
| 修改前 sitemap URL | 146 | 与可索引 HTML 做集合对比 |

共审阅 114 份中英文内容源。已有“手册、用法指南、机制说明、协议说明”等相近主题承担不同用户任务，未发现需要合并或批量重写的关键词蚕食页面。

## 4. 已确认问题与处理

| 问题 | 依据与判断 | 处理 |
| --- | --- | --- |
| 英文 Blog 翻译位于错误的 `default/` 子目录 | 构建和本地页面实际回退到中文，英文 URL 的可见正文仍是中文 | 将 4 篇英文翻译移到 Docusaurus 默认 Blog 插件的正确 i18n 目录 |
| 14 个标签、作者与归档页/语言没有独立搜索意图 | 页面只重复少量文章摘要，不应与正文争夺索引 | 共 28 个聚合页设为 `noindex,follow` 并从 sitemap 排除 |
| `/404` 生成文档可返回 200 | 作为 404 展示兜底存在，但不能参与索引 | 给 NotFound 模板增加 `noindex,follow`；部署后仍需确认不存在未知 URL 的 soft 404 |
| 4 个列表页缺少可见 H1 | 内部门槛要求索引页有明确主标题 | 补齐 Blog 与 Insights 的中英文列表页 H1；空 Insights 保持 `noindex,follow` |
| 首页 13 个旧锚点链接依赖过时标题 | 目标锚点随标题变化而失效，且链接责任不够明确 | 改为稳定、职责清楚的现有文档页与有效锚点 |
| 1 个中文协议页 description 含未加引号的 `#` | YAML 会把后半段当注释，生成 description 被截断 | 给字段加引号，并增加构建前 front matter 风险检查 |
| 3 个英文 Blog front matter 字段含未加引号的冒号 | YAML 无法解析，英文构建失败 | 给字段加引号，并让 `validate:docs` 提前拦截 |
| 2 篇文章的中英文社交分享图缺失 | `og:image` 与文章 Schema 指向不存在资源 | 从真实 xAgent 产品界面生成 4 张 1200 x 630 分享图 |
| 2 篇文章缺少正文产品截图 | 页面在讲产品形态但缺少可核验的第一手视觉证据 | 在中英文正文加入对应的真实界面截图 |
| 首页产品截图使用空 alt | 图片承载产品界面信息，不是纯装饰 | 使用已有中英文图片说明作为 alt |
| 全局输出 `meta keywords` | Google 不使用该标签，继续维护会制造错误优化信号 | 删除全局 `meta keywords` 与配置中的关键词常量 |
| 移动端首页标题出现孤立单字换行 | 不影响抓取，但降低首屏可读性 | 对首页主标题使用平衡换行，并保留窄屏溢出检查 |

## 5. 修改后验证

以下命令均通过：

```text
npm run validate:docs
npm run typecheck
npm run build
npm run validate:site
git diff --check
```

最终自动审计结果：

| 指标 | 结果 |
| --- | ---: |
| 生成 HTML | 152 |
| sitemap URL | 118 |
| `noindex` 页面 | 34 |
| 中文/英文 Docs | 53 / 53 |
| 中文/英文 Blog | 4 / 4 |
| 校验发现的断链、失效锚点、canonical、hreflang、H1、图片或 Schema 错误 | 0 |

34 个 `noindex` 页面包括两种语言的搜索页、空 Insights 列表、标签/作者/归档聚合页和 404 展示页。sitemap 只保留 118 个可索引规范 URL。

## 6. 未取得数据与部署后事项

- PageSpeed Insights API 的移动端和桌面端请求均返回 HTTP 429（当日配额已用尽），因此本轮没有新的 CrUX 真实用户 Core Web Vitals 数据；不得用本地渲染结果替代。
- 当前生产站仍是修改前版本；英文 Blog、noindex、sitemap 和 404 行为必须在部署后再次抽查。
- 部署后通过 Search Console 检查 sitemap、索引、查询落地页与 Web 搜索类型总量。Google AI Overview 与 AI Mode 当前计入 Web 搜索类型，没有独立筛选器，不能从汇总数据反推出 AI 功能流量。
- 新内容发布后按协议等待 2 至 4 周，再比较最近 28 天与前 28 天数据；没有数据时保持“未取得”，不补写推测结论。
