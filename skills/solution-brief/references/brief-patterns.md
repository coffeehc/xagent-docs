# Solution Brief Patterns

## Shared Structure

Every solution brief needs:

- title
- decision status
- audience and decision ask
- problem recap
- proposed solution
- key capabilities
- success metrics
- trade-offs and non-goals
- risks and mitigations
- open questions
- next steps
- source quality notes when evidence is incomplete

## Mode Selection

Use the smallest structure that answers the decision.

Product solution:

- Emphasize user segment, user experience, value proposition, adoption path, success metrics, and rollout risk.
- Avoid burying user impact under implementation detail.

Technical solution:

- Emphasize system boundary, architecture option, integration points, reliability/security risks, migration constraints, and operational impact.
- Include implementation detail only when it changes the decision.

Operational process:

- Emphasize current workflow pain, proposed process, handoffs, owners, SLAs, tooling impact, training, and control points.

Business initiative:

- Emphasize commercial rationale, target customer or market, expected business outcome, dependency on sales/marketing/ops, and investment trade-offs.

Customer-facing proposal:

- Use approved facts only.
- Remove internal debates, unapproved roadmap, staffing constraints, vendor disputes, private financial details, and speculative dates.
- Mark commitments that need approval as `待确认`.

Option comparison:

- Present 2-4 viable options.
- Use the same criteria for every option.
- Recommend the option only if the sources support it.
- If the decision is not supportable, recommend the decision criterion or missing evidence instead.

## Decision Quality Rules

When the brief is used for a decision:

- define the decision in one sentence;
- separate must-have constraints from preferences;
- compare options on the same criteria;
- identify what would make the recommendation change;
- state whether the recommendation is evidence-backed, assumption-backed, or only a working hypothesis;
- preserve dissenting evidence or unresolved disagreement when it could affect the decision.

Do not write a recommendation just because a recommendation-shaped section is expected. If evidence is weak, recommend the next validation step or decision criterion.

## Prioritized Next Step Rules

When the user needs action sequencing:

- identify the main constraint or blocker that limits progress now;
- make the first next step relieve that constraint or answer the highest-risk unknown;
- keep follow-on steps dependent on the result of the first step when uncertainty is high;
- explicitly defer work that would consume effort without changing the decision;
- mark low-confidence prioritization as low-confidence rather than forcing certainty.

Do not import a full action-plan framework unless the user asks for a detailed plan. A solution brief should explain priority enough to guide the next decision.

## Metric Rules

Metrics should answer what will prove the solution worked.

Good metrics:

- name the metric and unit
- include baseline or current state when available
- include target and timeline
- connect to the problem impact
- have a measurement source or owner when available

Weak metrics:

- "improve user experience"
- "make operations smoother"
- "increase efficiency"
- "reduce issues"

Rewrite weak metrics into measurable form or mark them `待确认`.

## Trade-Off Rules

Trade-offs should explain what is intentionally not being optimized.

Include:

- rejected alternatives
- non-goals
- scope exclusions
- constraints accepted
- quality, speed, cost, reliability, UX, security, or complexity trade-offs

Avoid fake trade-offs such as "we will do everything later" or "not doing anything unnecessary." A real trade-off names the cost of the choice.

## Risk Rules

For each material risk, capture:

- risk statement
- likelihood: high, medium, or low
- impact: high, medium, or low
- mitigation
- owner or trigger when known

Do not overfill low-value risk tables. Prefer 3-5 risks that could change the decision or execution path.

## Open Questions

Open questions belong outside the main proposal unless they block the decision.

Separate:

- decision-blocking questions
- implementation questions
- measurement questions
- approval questions
- follow-up research questions

If an open question changes the viability of the proposal, call it out near the decision ask.

## Review Checklist

When reviewing an existing brief, flag:

- unclear audience or decision ask
- problem and solution mismatch
- unsupported metric or target
- feature list too broad
- missing non-goals
- hidden implementation commitment
- missing owner or next step
- risk with no mitigation
- external-facing claim without source
- wording that implies approval before approval exists
