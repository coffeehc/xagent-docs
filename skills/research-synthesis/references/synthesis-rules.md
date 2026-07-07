# Research Synthesis Rules

## Source Tiers

Use source tiers to decide weight. Tiers are not automatic truth labels; they are a starting point for judgment.

### Tier 1: Primary Or High-Authority Sources

Prefer when available:

- peer-reviewed papers, academic books, standards, laws, regulations, court records
- official datasets, filings, releases, technical docs, product docs, or changelogs
- primary interviews, transcripts, meeting notes, tickets, design docs, or internal artifacts provided by the user
- original research reports with transparent method and data

### Tier 2: Credible Secondary Sources

Use for context and corroboration:

- reputable analyst reports, industry reports, journalism, or trade publications
- official repositories, issue trackers, conference talks, and project documentation
- authors with clear expertise and identifiable accountability
- Wikipedia or summaries only when checked against cited references

### Tier 3: Useful But Weak Sources

Use cautiously:

- blogs, newsletters, forum answers, social posts, videos, and interviews
- vendor material, marketing pages, landing pages, and sales decks
- AI-generated or unattributed summaries only as leads to inspect stronger sources

### Reject Or Quarantine

Do not rely on:

- no author, no date, no source trail, or unverifiable reposts
- SEO spam, content farms, scraped summaries, or opaque AI pages
- claims with no data, no method, and no accountable origin
- tutorials or opinion posts used as proof for factual, legal, compliance, financial, or technical claims

## Freshness Rules

Match freshness to the question:

- Current status, product availability, laws, policies, prices, personnel, schedules, and API behavior need fresh sources and exact dates.
- Historical questions need sources close to the event plus later authoritative interpretation.
- Evergreen methods can use older sources if still accepted, but note age when it affects applicability.
- Internal state must come from current workspace/session artifacts or be labeled unverified.

## Source Log

Track each source with:

- title or identifier
- origin, URL, file path, artifact, or note location
- author, organization, or owner when known
- publication or update date when known
- source type and tier
- inspected portion or relevant section
- key claims extracted
- limitations, bias, or freshness concern

## Research Depth

Choose depth before gathering sources:

- Focused: one specific question, quick comparison, or verification task. Stop after enough authoritative evidence answers it.
- Wide: landscape scan across categories, competitors, policies, tools, or options. Useful before writing a spec, brief, or recommendation.
- Deep: high-stakes or build-planning research where weak sources, conflicts, and edge cases could materially change the outcome.

Do not escalate depth just because more sources are available. Escalate only when the user's decision, freshness need, disagreement between sources, or risk requires it.

## Claim Verification

For each important claim:

- identify the claim exactly;
- find the most direct source available;
- check whether the source is current enough for the claim;
- look for independent confirmation when the claim is material or contested;
- mark the claim as verified, partially supported, contradicted, outdated, or unresolved.

Avoid source laundering: a blog or article repeating an announcement is not independent confirmation of the underlying fact.

## Deduplication

Treat sources as duplicates or near-duplicates when they:

- repeat the same text or data from a shared origin
- cite the same underlying report without adding independent evidence
- mirror the same press release, announcement, or syndicated article
- come from the same author, organization, dataset, or timestamped source package

Prefer the most complete, direct, authoritative, and recent version. Do not count duplicates as independent confirmation.

Do not deduplicate when:

- sources reach different conclusions from different methods
- later sources update, correct, or contradict earlier ones
- viewpoints differ by stakeholder, geography, market segment, or period
- a repeated claim is independently verified by different data or methods

## Evidence Units

Extract evidence as claims:

- claim
- source or sources
- direct quote or paraphrase, if needed
- date or period covered
- relevance to the research question
- support strength: direct, partial, weak, or contextual
- confidence: high, medium, low, or unresolved
- caveat

Avoid treating a source summary as evidence. The evidence unit is the specific claim that supports or challenges the conclusion.

## Confidence Language

Use:

- **High confidence:** multiple independent strong sources, direct evidence, current enough for the question, low conflict.
- **Medium confidence:** credible evidence but limited independence, incomplete freshness, partial conflict, or inference required.
- **Low confidence:** weak or indirect evidence, stale source, unverified source, single source, or material gap.
- **Unresolved:** credible sources conflict and available evidence does not justify choosing one.

Do not hide uncertainty with vague wording. Use plain labels such as `[high confidence]`, `[medium confidence]`, `[low confidence]`, and `[unresolved]`.

## Conflict Handling

For conflicts, record:

- what claims conflict
- which sources support each side
- whether the conflict is caused by date, method, definition, geography, scope, stakeholder interest, or evidence quality
- which side is better supported, if any
- what would resolve the conflict

If no side is clearly stronger, say so.

## Recursive Research Checkpoints

Use checkpoints for broad, ambiguous, or high-stakes research.

At each checkpoint, produce:

- current answer in one paragraph
- strongest evidence found
- weak or missing evidence
- conflicts
- source coverage by tier
- confidence level
- next search direction or stop reason

Stop expanding when:

- the research question is answered at the required depth
- new sources are duplicative
- marginal value is low
- the next step needs paid/private access, user input, or a domain expert
- time or scope budget is reached

## Recommendation Rules

When recommending:

- separate evidence from judgment
- state decision criteria
- compare options against the same criteria
- name assumptions
- explain what would change the recommendation
- avoid presenting a recommendation as fact

## High-Stakes Guardrails

For legal, medical, financial, safety, hiring, compliance, or regulated topics:

- prioritize primary and official sources
- include exact dates
- mark non-authoritative interpretation clearly
- avoid definitive advice beyond the evidence
- recommend qualified review when action has material risk
