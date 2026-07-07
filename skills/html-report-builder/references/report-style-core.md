# Report Style Core

Use this reference when a report needs stable visual quality. The goal is not creative freedom; the goal is a consistent offline HTML report system.

## Hard Rule

Do not design the report from scratch. Select a preset, use approved components, and style with design tokens. Only adjust tokens when the user gives explicit brand or style constraints.

## Presets

| preset | use case | visual direction |
| --- | --- | --- |
| `official-clean` | formal reports, policy briefs, PDF-first documents | white paper, restrained blue accent, low decoration |
| `executive-brief` | one-pagers, decision memos, leadership summaries | conclusion first, strong KPI strip, compact evidence |
| `research-editorial` | research briefs, market scans, long-form analysis | readable text, visible evidence, quiet figures |
| `data-dashboard` | KPI reports and chart-heavy pages | dense metrics, strong tables, chart consistency |
| `comparison-matrix` | vendor, option, competitor, or policy comparison | clear criteria, scores, weights, recommendation marks |
| `timeline-report` | project reviews, roadmaps, incident timelines | phases, milestone cards, status badges |

Default preset: `official-clean`.
Data-heavy default: `data-dashboard`.

## Design Tokens

Use this token set unless a selected template provides a compatible preset override:

```css
:root {
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Microsoft YaHei", "Noto Sans CJK SC", sans-serif;
  --font-serif: "Times New Roman", "Songti SC", "SimSun", serif;

  --page-bg: #f6f8fb;
  --paper-bg: #ffffff;
  --text: #172033;
  --text-soft: #344054;
  --muted: #667085;
  --border: #d9e0ea;
  --border-soft: #edf1f7;

  --accent: #1f5eff;
  --accent-soft: #eef4ff;
  --success: #16835b;
  --warning: #b7791f;
  --danger: #b42318;

  --chart-1: #1f5eff;
  --chart-2: #16a3a3;
  --chart-3: #7c3aed;
  --chart-4: #f59e0b;
  --chart-5: #ef4444;
  --chart-muted: #94a3b8;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --shadow-card: 0 8px 24px rgba(15, 23, 42, 0.08);
}
```

## Typography

- Use `--font-sans` for most reports.
- Use `--font-serif` only for formal long-form body text or appendix extracts.
- Keep heading hierarchy compact: `h1` for title, `h2` for sections, `h3` for cards and figures.
- Use tabular numbers for KPI values and numeric table columns.
- Do not use viewport-based font sizing.

## Layout

Use a document shell:

```html
<main class="report-shell" data-skill="html-report-builder" data-report-preset="official-clean">
  <header class="report-header">...</header>
  <section class="executive-summary">...</section>
  <section class="kpi-grid">...</section>
  <section class="report-section">...</section>
  <section class="evidence-box">...</section>
  <footer class="report-footer">...</footer>
</main>
```

Rules:

- Keep the first screen conclusion-first: title, scope, summary, and key KPI or caveat.
- Use cards for repeated items, KPIs, figures, or framed evidence only.
- Do not nest cards inside cards.
- Use a spacing scale from the tokens. Do not invent one-off margins.
- Keep long paths, URLs, hashes, code, and identifiers wrapped or inside controlled scroll containers.

## Approved Components

- `report-shell`: centered report paper with max width and print-safe padding.
- `report-header`: title, subtitle, date/scope, status, and caveat.
- `report-meta`: compact metadata row.
- `executive-summary`: first-screen conclusion block.
- `kpi-grid`: responsive KPI card grid.
- `kpi-card`: label, value, unit, source, delta, and caveat.
- `metric-delta`: positive/negative/neutral delta label with text plus color.
- `report-section`: major content section.
- `section-header`: section title plus short framing sentence.
- `insight-card`: one finding with evidence and caveat.
- `figure-card`: chart or diagram frame.
- `chart-header`, `chart-body`, `chart-caption`, `chart-legend`: chart wrapper.
- `data-table`: all tabular data.
- `comparison-matrix`: criteria and option comparison.
- `timeline`: dated or phased sequence.
- `evidence-box`: source and verification block.
- `caveat-box`: limitations and unverified items.
- `risk-box`: risks, blockers, or warnings.
- `action-list`: next steps and owners if provided.
- `appendix`: supporting detail.
- `report-footer`: generated artifact metadata and final caveats.

## Mobile Rules

- At 390px, no page-level horizontal overflow.
- Collapse KPI and card grids to one column.
- Keep charts responsive with `max-width: 100%`.
- If SVG labels do not fit, use numbered marks plus a legend or table.
- Long tables may scroll inside their own wrapper; the page itself must not scroll horizontally.

## Print And PDF Rules

- Include `@page { size: A4 portrait; margin: 16mm; }` unless the user specifies another page size.
- Include `@media print`.
- Include `-webkit-print-color-adjust: exact` and `print-color-adjust: exact` so browser "Save as PDF" and PDF workers preserve intended report colors.
- Avoid `position: fixed`, `position: sticky`, `height: 100vh`, full-viewport hero layouts, and layout that depends on viewport height.
- Apply `break-inside: avoid` and `page-break-inside: avoid` only to compact blocks such as KPI cards, figure cards, short evidence/caveat boxes, table rows, timeline items, and matrix items.
- Do not apply `break-inside: avoid` to long page-level sections, `report-section`, or large highlight/content boxes. They must be allowed to split across pages to avoid large blank areas in PDF output.
- Keep charts, captions, legends, and source notes together where practical.
- Core content must exist in HTML/SVG before JavaScript runs.
- If the report uses a colored header, KPI strip, badge, table header, or callout background, repeat that background in `@media print` with `!important` when needed.
- If no PDF conversion was actually performed, mark PDF conversion as `Not verified`.
