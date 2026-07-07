# Search and Fetch Protocol

## web_search 使用规则

web_search 用于发现候选来源，不用于直接生成结论。

每次搜索后记录：

```json
{
  "query_id": "QRY0001",
  "query": "...",
  "purpose": "which sub-question or gap this search addresses",
  "timestamp": "ISO-8601",
  "result_count": 10,
  "notes": "..."
}
```

## 查询设计

### 基础查询

- 核心概念 + overview / landscape / report
- 核心概念 + official / documentation
- 核心概念 + market size / adoption / trends
- 核心概念 + benchmark / comparison
- 核心概念 + limitations / risks / criticism

### 技术查询

- `<technology> official docs architecture`
- `<technology> benchmark performance`
- `<technology> limitations production`
- `<technology> incident postmortem`
- `<technology> github issues`
- `<technology> release notes changelog`
- `<technology> vs <alternative>`

### 市场查询

- `<market> market size 2025 report`
- `<company> annual report investor presentation`
- `<category> Gartner Forrester IDC report`
- `<industry> regulation policy`
- `<competitor> pricing packaging`
- `<product> customer case study`

### 政策/法规查询

- `<regulation> official text`
- `<agency> guidance <topic>`
- `<policy> enforcement action`
- `<law> effective date requirements`
- `<jurisdiction> compliance guidance`

## fetch 使用规则

必须 fetch：

- 官方文档。
- 关键数据来源。
- 排名前几的权威结果。
- 所有最终报告会引用的网页。
- 反驳或限制性证据。

fetch 后记录：

- 页面标题。
- URL。
- 发布/更新日期。
- 访问日期。
- 关键段落或表格位置。
- 与哪些子问题相关。

## snippet 禁令

禁止将搜索结果摘要、网页标题、搜索引擎摘要当作最终证据。

允许使用 snippet 的场景：

- 判断是否值得 fetch。
- 发现术语、组织、关键词。
- 规划下一轮查询。

## 搜索多样性

标准深度至少覆盖 5 个搜索角度。deep 至少覆盖 8 个角度。exhaustive 至少覆盖 12 个角度。

## 反向搜索

必须搜索负面和反方证据：

- limitations
- disadvantages
- risks
- failure
- criticism
- controversy
- incident
- benchmark issue
- migration problem
- compliance risk

没有反方证据的报告通常不可靠。
