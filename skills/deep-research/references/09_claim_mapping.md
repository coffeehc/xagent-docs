# Claim Mapping

Claim map 将最终报告中的结论与 evidence ledger 绑定。

## claim 类型

| Type | Meaning | Evidence requirement |
|---|---|---|
| fact | 事实陈述 | 至少 1 条 strong/moderate evidence |
| numeric | 数字/统计 | 来源、时间、口径、单位 |
| estimate | 估算 | 方法、输入、假设 |
| interpretation | 分析判断 | 多条证据或明确推理链 |
| recommendation | 建议 | 与决策上下文相关的证据和权衡 |

## claim_map.jsonl 模板

```json
{
  "claim_id": "C0001",
  "section": "Key Findings",
  "claim": "...",
  "claim_type": "fact|numeric|estimate|interpretation|recommendation",
  "evidence_ids": ["E0001", "E0002"],
  "confidence": "high|medium|low",
  "limitations": "...",
  "requires_citation": true
}
```

## Claim 质量规则

- 一个 claim 只表达一个主要判断。
- 不要把多个复杂判断放在一个 claim。
- 重大推荐至少需要 2 条证据，最好来自不同来源类型。
- 数字 claim 必须有日期和口径。
- 如果 evidence 弱，claim confidence 不能是 high。

## 禁止事项

- 最终报告出现 claim map 中不存在的重要 claim。
- 推荐没有 evidence IDs。
- 把推断写成事实。
- 把供应商营销材料当作独立验证。
- 把过期信息写成当前状态。
