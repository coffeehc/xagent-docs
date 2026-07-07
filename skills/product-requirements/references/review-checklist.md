# Requirement Review Checklist

## Clarity

- The user problem is specific.
- The target user or role is clear.
- The outcome is distinguishable from the proposed solution.
- Scope and non-goals are explicit.
- Terms, statuses, permissions, and data fields are defined or marked `待确认`.

## Completeness

- Main scenario, alternate flows, empty states, errors, retries, and permissions are covered when relevant.
- Dependencies on other teams, systems, data, legal/compliance review, operations, support, or release tooling are visible.
- Analytics, logging, audit, and monitoring needs are included when they affect validation or operations.

## Testability

- Acceptance criteria can be checked without guessing intent.
- Success metrics have baseline, target, timeline, or are marked `待确认`.
- Ambiguous words are replaced with observable conditions.

## Handoff

- Engineering can identify behavior to implement.
- Design can identify UI states and content needs.
- QA can identify test paths.
- Operations/support can identify runbook and user-impact needs.
- Approvers can identify unresolved decisions.
