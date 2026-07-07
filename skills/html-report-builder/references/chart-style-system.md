# Chart Style System

Use this reference whenever a report includes KPI cards, SVG charts, timelines, matrices, or chart-like tables.

## Hard Rules

- Use chart colors only from `--chart-1` through `--chart-5` and `--chart-muted`.
- Every chart must have a title, unit, source or caveat, and interpretation.
- Pair every chart with a caption, legend, or nearby data table.
- Do not use 3D charts, rainbow palettes, random colors, decorative gradients, or decorative animation.
- Do not visualize assumptions as facts. Label assumptions and unverified values.
- Keep chart and explanation adjacent.

## Figure Structure

```html
<figure class="figure-card">
  <div class="chart-header">
    <div>
      <h3>Monthly revenue trend</h3>
      <p>Unit: USD thousands; scope: 2025-01 to 2025-12</p>
    </div>
    <span class="chart-badge">Trend</span>
  </div>
  <div class="chart-body">
    <svg class="svg-chart" viewBox="0 0 720 280" role="img" aria-labelledby="chart-title">
      <title id="chart-title">Monthly revenue line chart</title>
    </svg>
  </div>
  <figcaption class="chart-caption">
    Revenue rises after March and peaks in August. Source: user-provided table.
  </figcaption>
</figure>
```

## KPI Cards

- Use `kpi-grid` and `kpi-card`.
- KPI values must include label, value, unit, and basis/source if available.
- Use `metric-delta` only when the basis period or comparator is provided.
- Do not invent deltas.

## Bar Charts

- Use bars for category ranking and option comparison.
- Sort bars by value unless source order is meaningful.
- Show exact values through labels, captions, or a paired table.
- Avoid more than 8 categories in the main chart; move the full list to a table when needed.

## Line Charts

- Use line charts for time series only.
- Sort dates and state the time grain.
- Do not smooth lines unless the source data is explicitly smoothed.
- Label axis units and show key inflection points in the caption.

## Donut Charts

- Use donut charts only for simple composition with a known total and few categories.
- Always show the total and exact category values in a legend or table.
- Avoid donut charts when there are more than 5 slices or when differences are small.

## Heatmap-Like Tables

- Use tables for matrix intensity when exact values matter.
- Use low-saturation backgrounds plus text values.
- Color must not be the only signal.
- Include a legend that explains scale and direction.

## Comparison Matrix

- Use `comparison-matrix` for options, criteria, weights, scores, and recommendation labels.
- Keep scoring definitions visible.
- Mark disqualifying risks separately from weighted scores.
- Do not compute weights or final rankings unless provided by upstream content or verified data.

## Timeline

- Use timeline for ordered events, phases, milestones, or roadmap items.
- Each item needs date/phase, title, status, and evidence/caveat if available.
- Use status text plus color. Do not rely on color alone.

## Legend And Caption

- Legends must use the same token colors as the chart.
- Captions should state what the chart shows, the data source, and any caveat.
- Place captions directly below charts.

## Overflow And Small Screens

- At 390px, SVG labels must not overlap.
- If labels overflow, replace inline labels with numbered marks and a legend.
- For dense charts, provide a compact summary chart and a full data table.

## Print Handling

- Use `break-inside: avoid` on `figure-card`.
- Keep figure, legend, caption, and source note together when practical.
- Avoid charts that require hover, tooltip, or JavaScript to understand.

