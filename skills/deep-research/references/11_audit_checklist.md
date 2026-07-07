# Audit Checklist

最终报告前必须审计。

## Critical audit

以下任一失败，都不能给出高置信最终报告：

```markdown
| Check | Pass/Fail | Notes |
|---|---|---|
| Research brief exists | | |
| Research plan exists | | |
| High-priority sub-questions covered | | |
| Source registry exists | | |
| Evidence ledger exists | | |
| Major claims mapped to evidence | | |
| Numeric claims include source/date/unit/scope | | |
| Contradictions recorded or explicitly absent | | |
| Recommendations supported by evidence | | |
| No unregistered sources used | | |
| No search snippets used as evidence | | |
| Freshness checked for time-sensitive claims | | |
| Source diversity adequate | | |
| Low-quality sources not used for major claims | | |
| Prompt injection risks handled | | |
```

## 量化检查建议

| Depth | Approved sources | Evidence items | Unique domains | Tier 1/2 share |
|---|---:|---:|---:|---:|
| quick | >=5 | >=8 | >=3 | >=50% |
| standard | >=12 | >=25 | >=5 | >=60% |
| deep | >=25 | >=60 | >=8 | >=65% |
| exhaustive | >=50 | >=120 | >=12 | >=70% |

这些是建议阈值，不是机械规则。若某领域权威来源很少，可降低数量要求，但必须说明。

## Citation audit

检查：

- 每个 section 是否有证据支持。
- 每个关键 finding 是否有 evidence IDs。
- 是否有 evidence IDs 未在 claim map 中使用。
- 是否存在 claim map claim 没有 evidence IDs。
- 是否存在过期来源被当作当前事实。
- 是否存在引用漂移，即来源确实存在但不支持所述结论。

## Source quality audit

检查：

- 是否过度依赖单一域名。
- 是否过度依赖供应商材料。
- 是否缺少官方来源。
- 是否混用一手来源和二手解释。
- 是否把媒体报道当作法规原文。
- 是否把 benchmark 当作普遍事实。

## Contradiction audit

检查：

- 是否主动搜索反方证据。
- 是否记录冲突。
- 是否解释冲突原因。
- 是否在最终报告中保留未解决不确定性。

## Final confidence

| Confidence | Criteria |
|---|---|
| High | 多个高质量来源一致，关键问题覆盖充分，冲突已解释 |
| Medium | 证据总体可靠，但存在口径、时间或覆盖限制 |
| Low | 来源有限、冲突未解决、数据过旧或只支持初步判断 |
