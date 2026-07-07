# Evidence Ledger 规范

Evidence ledger 是深度研究的核心。最终报告中的事实、数字、判断和建议都应能追溯到 evidence ID。

## evidence 不是来源

来源是文档、网页或数据集。证据是来源中支持某个具体结论的内容。

一个来源可以产生多条 evidence。

## evidence JSONL 字段

```json
{
  "evidence_id": "E0001",
  "source_id": "S0001",
  "sub_questions": ["Q1", "Q3"],
  "claim_supported": "This evidence supports a specific claim.",
  "evidence_summary": "Concise summary of the evidence.",
  "exact_quote": "Short exact quote only if needed.",
  "location": "page 12, section 3.1, table 2",
  "data_value": "optional numeric value",
  "data_unit": "optional unit",
  "date_context": "2024, Q2 2025, as of 2026-06-26, etc.",
  "published_date": "YYYY-MM-DD or unknown",
  "accessed_date": "YYYY-MM-DD",
  "strength": "strong|moderate|weak",
  "relevance": "high|medium|low",
  "limitations": "Known limitations or caveats.",
  "notes": "Additional interpretation notes."
}
```

## 证据强度

### Strong

- 一手来源。
- 与问题直接相关。
- 当前或适用于研究时间窗口。
- 方法、口径或上下文清晰。
- 可验证。

### Moderate

- 来源可信但二手。
- 相关但不完全匹配范围。
- 有一定时间滞后。
- 口径需要解释。

### Weak

- anecdotal。
- 明显利益相关。
- 缺少日期、作者或方法。
- 与研究问题只有间接关系。

## 证据抽取粒度

每条 evidence 只支持一个主要结论。不要把一整页内容塞进一条 evidence。

好的 evidence：

```text
E0012 supports: Vendor A added feature X in version 2.4 released in March 2025.
```

差的 evidence：

```text
E0012 supports: Vendor A is good and has many features.
```

## 数字证据

数字必须记录：

- value
- unit
- denominator
- time period
- geography
- source location
- methodology if available

示例：

```json
{
  "data_value": "38",
  "data_unit": "% CAGR",
  "date_context": "2023-2028 forecast, global market",
  "limitations": "Forecast from vendor-sponsored report; methodology not fully disclosed."
}
```

## 反证也要登记

不支持主流结论的证据也要登记，用于 contradiction log 和 uncertainty section。
