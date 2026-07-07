# Design Craft Rules

Use these rules when the deck needs strong visual judgment rather than plain content formatting.

## Avoid Generated Defaults

Reject visual choices that make the deck feel generic:

- default purple or blue-purple gradients;
- decorative blobs, orbs, glassmorphism, bokeh, and abstract background noise;
- emoji icon systems when professional icons or text labels would be clearer;
- invented metrics, fake logos, fake testimonials, fake customers, or filler quotes;
- stock-like atmosphere images that hide the real product, place, person, or state the audience needs to inspect;
- oversized hero treatment on ordinary content slides;
- one-note palettes dominated by a single hue family.

## Typography

Typography should communicate hierarchy before decoration.

- Use a small type scale with clear roles: title, section label, body, caption, data label.
- Keep letter spacing at normal unless a brand system requires otherwise.
- Do not scale font size directly with viewport width.
- Match type size to the container. Compact panels need compact headings.
- Keep line length readable; split dense prose into short blocks, bullets, or notes.
- Ensure the longest word, identifier, URL, or number fits through wrapping, truncation with title text, or a dedicated scroll area.

## Color

Color should carry structure and emphasis.

- Start from neutral surfaces and text with one or two accent colors.
- Use accent color sparingly for active states, key data, section identity, or decision emphasis.
- Provide contrast for body text, labels, and controls.
- Do not use color as the only signal for status, risk, or category.
- Keep chart colors consistent across slides.
- Avoid palettes dominated by beige/cream/tan, dark slate/blue, brown/orange, or purple gradients unless the subject justifies it.

## Layout

Layout should make the audience understand priority immediately.

- One slide, one job.
- Put the main takeaway where the eye lands first.
- Align related elements on a visible grid.
- Use whitespace to group content, not to decorate.
- Use cards only for repeated items, framed tools, or grouped comparisons.
- Do not nest cards inside cards.
- Keep controls, counters, captions, and notes out of the main content path.
- Reserve dimensions for charts, media, lists, and counters so hover or dynamic text cannot shift the slide.

## Imagery And Diagrams

Use visuals when they clarify the slide.

- Prefer real screenshots, product states, diagrams, or data graphics over atmospheric decoration.
- If an image is needed but not available, use a labeled placeholder or a native SVG diagram instead of remote stock imagery.
- Diagrams should expose flow, hierarchy, comparison, dependency, or state change.
- Every non-decorative image or diagram needs a caption, label, or surrounding text that explains why it matters.

## Motion

Motion is optional and should support comprehension.

- Use short, restrained transitions only for slide changes or progressive reveal.
- Respect `prefers-reduced-motion`.
- Do not animate data in a way that changes perceived values.
- Avoid looping motion, parallax, physics effects, or attention-grabbing decoration in business decks.

## Evidence And Tone

Strong visual polish must not hide weak substance.

- Separate facts, interpretations, and recommendations.
- Put caveats close to the claim they qualify.
- Mark unknowns as `待确认` / `Not verified`.
- Avoid exaggerated certainty, vague superlatives, and unsupported urgency.
- Keep the tone aligned with the deck setting: boardroom, product review, training, sales, engineering review, or public talk.
