# Gap Analysis and Iteration

深度研究不是执行固定搜索次数，而是不断检查“证据是否足以回答问题”。

## Gap matrix 模板

```markdown
# Gap Matrix

| Sub-question | Current answer | Evidence IDs | Confidence | Gaps | Next action |
|---|---|---|---|---|---|
| Q1 | ... | E0001, E0002 | medium | lacks current official data | search official 2025 update |
```

## Gap 类型

| Gap type | Meaning | Action |
|---|---|---|
| no_evidence | 没有证据 | targeted search |
| weak_evidence | 来源弱或间接 | search stronger source |
| stale_evidence | 来源过旧 | freshness search |
| single_source | 重大结论只有单一来源 | independent corroboration |
| conflict | 来源冲突 | contradiction resolution |
| scope_mismatch | 地域/时间/行业口径不匹配 | narrower query |
| metric_mismatch | 指标口径不同 | define metrics |
| missing_negative | 缺少反方证据 | search limitations/risks |

## 迭代搜索触发器

必须继续搜索：

- 高优先级 checklist item 仍为 open。
- evidence strength 主要是 weak。
- 关键结论没有独立交叉验证。
- 当前来源集中在一个利益相关方。
- 发现新术语、新实体、新政策或新版本。
- 报告建议会依赖尚未验证的事实。

## 退出前检查

进入 drafting 前，所有 high priority items 至少应为：

- answered with strong/moderate evidence；或
- explicitly unresolved with reason；或
- out of scope by updated brief。

## 避免无限搜索

继续搜索必须有明确 gap。不要因为“可能还有更多资料”而无限搜索。

每轮迭代都要说明：

- 本轮要解决哪个 gap；
- 使用哪些查询；
- 找到什么；
- gap 是否关闭。
