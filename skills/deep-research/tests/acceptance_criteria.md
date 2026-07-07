# Acceptance Criteria

一个合格的深度研究运行至少应满足：

- 有 `brief.md`，且说明范围、时间、深度和假设。
- 有 `plan.md`，且包含可验证 checklist。
- 有 `query_log.jsonl`，能看到搜索策略。
- 有 `source_registry.jsonl`，来源有状态和质量等级。
- 有 `evidence_ledger.jsonl`，证据能追溯到 source。
- 有 `gap_matrix.md`，说明哪些问题已回答、哪些仍有缺口。
- 有 `contradiction_log.md`，或明确说明未发现重要冲突。
- 有 `claim_map.jsonl`，关键结论绑定 evidence IDs。
- 有 `audit_report.md`，说明报告质量和限制。
- 最终报告区分事实、推断和建议。

## 不合格迹象

- 只根据搜索摘要写结论。
- 没有来源质量判断。
- 没有下载/解析关键 PDF 或报告。
- 关键数字没有日期和口径。
- 只引用厂商资料得出竞品优劣结论。
- 发现冲突但不解释。
- 把不确定结论写得过于绝对。
