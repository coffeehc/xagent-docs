# Visual Quality Gate

Run this gate before delivering an HTML report.

## Preset And Tokens

- A preset was selected before HTML was written.
- If no style was specified, `official-clean` was used.
- If the report is data-heavy, `data-dashboard` was used.
- Colors, spacing, typography, radius, shadow, and chart colors come from tokens.
- No random palettes, random shadows, random gradients, or one-off card styles were invented.

## Component Discipline

- The report uses approved components from `SKILL.md`.
- It does not define a parallel card/table/chart/component system.
- Cards are used only for KPIs, figures, repeated items, evidence, caveats, or actions.
- Cards are not nested inside cards.

## Visual Quality

- The report looks like a formal report, not a landing page.
- The first screen contains the title, scope, conclusion or summary, and caveat if needed.
- KPI cards align cleanly and use consistent numeric formatting.
- Charts and explanations are adjacent.
- Chart colors are consistent across the report.
- Tables are readable, aligned, and use one table style.
- Evidence, caveats, and limitations are visible near relevant claims.

## Prohibited Styles

- Generic purple gradients.
- Glassmorphism.
- Decorative blobs, orbs, or bokeh.
- Random chart colors.
- 3D charts.
- Decorative animation.
- Remote fonts, CDN, remote images, iframes, analytics, React, Vue, Tailwind, npm, package-manager runtime, or unapproved remote runtime dependencies. Workspace-local CSS/JS/assets under the report root are allowed.

## Responsive And Print

- 390px viewport has no page-level horizontal overflow.
- Long URLs, code, paths, hashes, and IDs wrap or scroll within their own container.
- Core content remains readable with JavaScript disabled.
- `@page` exists.
- `@media print` exists.
- `-webkit-print-color-adjust: exact` and `print-color-adjust: exact` exist.
- Color-critical headers, KPI cards, badges, table headers, and callouts are not stripped to gray/white in print CSS.
- Cards, figure cards, KPI blocks, compact tables, evidence boxes, and caveat boxes use break avoidance.
- Long page-level sections are not forced to `break-inside: avoid`; PDF pages should not show large blank gaps before major sections.
- If actual PDF conversion was not run, PDF conversion is marked `Not verified`.
