---
artifact_type: meeting-recap
generated_by_skill: meeting-recap
meeting_title: "{{meeting_title}}"
meeting_date: "{{date_or_tbd}}"
project: "{{project_or_tbd}}"
input_quality: "{{high | medium | low}}"
visibility: "{{team | internal | private}}"
status: draft
---

# Meeting Recap: {{meeting_title}}

## Shareable Summary

**{{meeting_title}}** | {{date_or_tbd}}

{{1-3 sentence outcome summary.}}

**Key decisions**

- {{decision_or_none}}

**Top actions**

- {{owner_or_unassigned}}: {{action}} | Due: {{date_or_not_specified}}

{{ownership_warning_if_needed}}

## Ownership Reconciliation Required

{{Include only when threshold is triggered. Otherwise remove this section.}}

| Action | Why owner is missing | Suggested confirmation |
| --- | --- | --- |
| {{action}} | {{reason}} | {{next_step}} |

## Meeting Details

- **Date:** {{date_or_tbd}}
- **Attendees:** {{attendees_or_not_provided}}
- **Absent key people:** {{absent_or_not_provided}}
- **Source material:** {{source_description}}
- **Input quality:** {{high | medium | low}}

## Agenda Reconciliation

- **Planned topics:** {{list_or_no_agenda_provided}}
- **Topics addressed:** {{list}}
- **Topics skipped:** {{list_or_none}}
- **Emergent topics:** {{list_or_none}}

## Topics

### {{Topic 1}}

**Discussion**

{{2-4 sentence summary.}}

**Decisions**

- {{decision}} {{confidence_marker_if_inferred}}

**Actions**

- [ ] {{owner_or_unassigned}}: {{action}} | Due: {{date_or_not_specified}} | Dependencies: {{dependency_or_none}}

**Open Questions**

- {{question_or_none}}

## All Actions By Owner

### {{Owner Or Unassigned}}

- [ ] {{action}} | Due: {{date_or_not_specified}} | Topic: {{topic}}

## Internal Notes

- **Inference notes:** {{notes}}
- **Source conflicts:** {{conflicts_or_none}}
- **Missing facts:** {{missing_facts_or_none}}
