# Table Style System

Use this reference whenever a report includes data tables, comparison tables, score tables, appendix tables, or long structured records.

## Base Table

Use `data-table` for every report table.

```html
<div class="table-wrap">
  <table class="data-table">
    <caption>Revenue by region</caption>
    <thead>
      <tr><th>Region</th><th class="num">Revenue</th><th>Note</th></tr>
    </thead>
    <tbody>
      <tr><td>North</td><td class="num">$1.2M</td><td>Verified source</td></tr>
    </tbody>
  </table>
</div>
```

## Required Styles

```css
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  line-height: 1.5;
}
.data-table caption {
  text-align: left;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
}
.data-table th {
  text-align: left;
  background: #f3f6fb;
  color: var(--text-soft);
  font-weight: 700;
  border-bottom: 1px solid var(--border);
}
.data-table th,
.data-table td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--border-soft);
  vertical-align: top;
}
.data-table tbody tr:nth-child(even) td {
  background: #fafbfd;
}
.data-table .num {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
```

## Table Types

- Normal data table: default `data-table`.
- Compact table: add `table-compact` and reduce padding only.
- Comparison table: add `comparison-table`; keep criteria in the first column.
- Score table: add `score-table`; include scoring scale and source.
- Appendix table: add `appendix-table`; can be denser but must remain readable.

## Numeric Alignment

- Use `.num` for numeric columns.
- Keep units in headers or captions.
- Use tabular numbers.
- Do not mix percentages, rates, and counts without labels.

## Long Text, URLs, And Code

- Use `overflow-wrap: anywhere` for long text cells.
- Long URLs, hashes, code, and paths must wrap or be placed in a scrollable code block inside the cell.
- Do not allow one cell to create page-level horizontal overflow.

## Sticky Headers

- Sticky table headers are allowed only for screen mode.
- Disable sticky behavior in print mode.
- Do not rely on sticky headers for comprehension; captions and headers must still print.

## Print Mode

- Use semantic `<thead>` and `<tbody>` so print engines can repeat headers when supported.
- Use `break-inside: avoid` for short summary tables.
- Large tables may split across pages, but captions, units, and caveats must remain clear.
- Avoid background-only meaning; printed tables must be readable without background colors.

