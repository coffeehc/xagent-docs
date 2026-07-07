# Deck Rules

## Deck Shape

Default to a 16:9 deck unless the user specifies another aspect ratio. Treat each slide as a fixed stage with stable dimensions, then scale the stage to fit the browser viewport. Do not let viewport width change the slide's internal composition.

Recommended slide anatomy:

- `section.slide` for each slide.
- One primary heading per slide.
- One dominant idea, evidence point, diagram, or decision per slide.
- Optional `aside.notes` for speaker notes when requested.
- Optional appendix slides for source detail, long tables, glossary, and caveats.

## Narrative Modes

Choose a mode before drafting:

- Briefing: context, finding, implication, recommendation, next step.
- Pitch: problem, audience pain, solution, proof, business case, ask.
- Teaching: concept, example, practice, synthesis, recap.
- Product walkthrough: user need, flow, capability, state change, evidence, rollout.
- Strategy: current state, forces, choices, trade-offs, operating plan.
- Decision: options, criteria, evidence, risks, recommendation, decision ask.
- Status: objective, progress, blockers, risks, next milestone.

## Slide Density

Prefer fewer stronger slides over dense walls of text.

- Title slide: one title, one subtitle or context line, date/scope if useful.
- Section divider: short section label and one framing sentence.
- Insight slide: headline conclusion, evidence, implication.
- Comparison slide: 2-4 options, consistent criteria, clear recommendation.
- Timeline slide: ordered phases, dates or sequence, owners only if provided.
- Chart slide: title, unit, exact values, source/caveat, one takeaway.
- Workflow slide: 3-7 steps, visible direction, inputs/outputs.
- Appendix slide: dense detail is allowed but must remain readable and printable.

## HTML Structure

Use one static HTML file:

- `<!doctype html>`, `<html lang>`, charset, viewport, descriptive `<title>`.
- One `<style>` block and one optional `<script>` block.
- A deck root such as `<main class="deck">`.
- A slide track or slide list with stable slide IDs.
- Navigation controls as real buttons with accessible labels.
- A slide counter and URL hash support when possible.

Avoid inline `style=""` except for SVG geometry or CSS custom properties that are easier to bind per element.

## Layout

Use CSS custom properties for stage size, spacing, color, type, and chart tokens.

Rules:

- Keep the slide stage fixed and scale the whole stage to the viewport.
- Use grid or flex layouts with explicit tracks and min/max constraints.
- Reserve space for persistent counters or controls so they do not overlap content.
- Make long identifiers, paths, URLs, and code wrap or scroll inside their own boxes.
- Do not place cards inside cards.
- Do not rely on page scroll for normal slide navigation.

## Navigation

Minimum behavior:

- ArrowRight, PageDown, Space: next slide.
- ArrowLeft, PageUp, Backspace: previous slide.
- Home and End: first and last slide.
- Click or tap controls for next/previous.
- URL hash or equivalent state restores the current slide.
- `prefers-reduced-motion: reduce` disables animated transitions.

Keep navigation code small and readable. Do not add routing frameworks, animation libraries, gesture libraries, or external runtime code.

## Print And PDF

Print mode should:

- Hide navigation controls and presentation-only UI.
- Render one slide per page where feasible.
- Preserve readable colors and backgrounds.
- Avoid clipped content.
- Expand or reveal notes only when the user asked for speaker notes or handout mode.

Use `@page` and `break-after: page` where appropriate, but keep browser variance in mind.

## Charts And Data

Use native SVG, semantic tables, or CSS diagrams by default.

Every chart must include:

- title;
- unit;
- exact values or adjacent table;
- source or caveat;
- clear takeaway.

Avoid decorative charts, 3D effects, hidden denominators, truncated axes without disclosure, and color-only status encoding.

## Validation

Before delivery, check:

- No remote network resources, CDN, remote font, iframe, analytics, or package manager dependency.
- No `script src`, external stylesheet, Open Design runtime, `od` CLI assumption, MCP server, deploy instruction, or local server requirement.
- Slide navigation works with keyboard and pointer.
- 16:9 stage scales without cropping at common desktop sizes and remains usable on narrow screens.
- Print preview has one readable slide per page or a clearly usable fallback.
- No incoherent text overlap, clipped headings, clipped controls, or unreadable chart labels.
- All important claims are source-backed or labeled as unverified.
