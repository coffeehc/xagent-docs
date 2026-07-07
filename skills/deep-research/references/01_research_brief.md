# Research Brief 规范

研究 brief 是整个研究任务的合同。没有 brief，不应进入大规模搜索。

## 必填字段

```markdown
# Research Brief

## Research Question
用户真正想回答的问题。

## Intended Audience
报告读者，例如 CEO、架构委员会、采购团队、研发负责人、政策团队。

## Decision Context
报告支持什么决策，例如是否采购、是否进入市场、选择哪种架构、如何制定路线图。

## Scope
研究包含什么。

## Exclusions
明确不研究什么。

## Geography
地域范围。

## Time Window
时间窗口。时间敏感问题必须指定最近性要求。

## Depth
quick / standard / deep / exhaustive。

## Source Constraints
必须使用或禁止使用的来源。

## Output Requirements
报告长度、结构、表格、图表、语言、文件格式。

## Success Criteria
完成标准。

## Assumptions
在用户未说明情况下采用的假设。
```

## 澄清问题规则

只在缺失信息会显著影响研究方向时提问。最多问 3 个问题。

应提问的情况：

- 地域范围会显著改变结论。
- 时间窗口会显著改变结论。
- 用户需要的是技术建议还是市场分析不清楚。
- 输出用途不清楚，导致深度和结构无法确定。
- 安全、法律、医疗、金融等高风险场景需要明确边界。

不应提问的情况：

- 只是报告格式未指定。
- 用户没有指定受众但可合理假设。
- 小范围措辞不清但不影响搜索。
- 可在 assumptions 中记录的偏好。

## 默认值

| 字段 | 默认值 |
|---|---|
| Depth | standard |
| Audience | knowledgeable business/technical reader |
| Output | Markdown report |
| Geography | global, unless topic implies otherwise |
| Time Window | last 24 months for current markets/products; all-time for historical/academic topics |
| Source priority | primary and authoritative sources first |
