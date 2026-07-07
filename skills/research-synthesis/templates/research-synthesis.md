---
artifact_type: research-synthesis
generated_by_skill: research-synthesis
research_question: "{{question}}"
source_scope: "{{web | provided_files | workspace | mixed}}"
freshness_requirement: "{{current | historical | evergreen | time_bounded}}"
confidence: "{{high | medium | low | unresolved}}"
status: draft
---

# Research Synthesis: {{question}}

## Answer

{{concise_synthesis_answer}}

## Confidence

**Overall confidence:** {{high_medium_low_or_unresolved}}  
**Reason:** {{authority_freshness_independence_conflict_summary}}

## Scope And Assumptions

- **Scope:** {{source_scope_and_limits}}
- **Freshness:** {{date_or_period_requirement}}
- **Assumptions:** {{assumptions_or_none}}
- **Not inspected:** {{unavailable_sources_or_none}}

## Key Findings

| Finding | Confidence | Evidence basis | Caveat |
| --- | --- | --- | --- |
| {{finding}} | {{high_medium_low}} | {{source_refs}} | {{caveat}} |

## Evidence Table

| Claim | Support | Source(s) | Tier | Date | Confidence | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| {{claim}} | {{direct_partial_weak_contextual}} | {{source_refs}} | {{tier}} | {{date}} | {{confidence}} | {{notes}} |

## Source Log

| Source | Origin | Type | Tier | Date | Relevance | Limitations |
| --- | --- | --- | --- | --- | --- | --- |
| {{title_or_id}} | {{url_file_or_artifact}} | {{type}} | {{tier}} | {{date_or_unknown}} | {{relevance}} | {{limitations}} |

## Conflicts

| Conflict | Sources | Best current read | What would resolve it |
| --- | --- | --- | --- |
| {{conflicting_claims}} | {{source_refs}} | {{assessment_or_unresolved}} | {{verification_step}} |

## Gaps

- {{missing_evidence_or_source}}

## Recommendation

{{recommendation_or_not_requested}}

## Next Verification

- {{next_step}}
