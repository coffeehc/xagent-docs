# Requirement Rules

## Requirement Anatomy

Good requirements make these facts inspectable:

- user, role, permission, and context;
- user problem and desired outcome;
- entry point and trigger;
- current behavior and target behavior;
- data read, data written, and data retained;
- states, transitions, validation, errors, loading, empty states, retries, and cancellation;
- notifications, audit trail, logs, permissions, and privacy/security expectations;
- non-goals, out-of-scope behavior, assumptions, dependencies, and open questions;
- acceptance criteria and release checks.

## Behavior Definition

Describe behavior by scenario:

1. Preconditions.
2. User or system action.
3. Expected system response.
4. Data or state change.
5. User-visible result.
6. Failure or fallback behavior.

Use concrete language. Avoid words such as "simple", "intuitive", "robust", or "fast" unless a measurable bar is stated.

## Acceptance Criteria

Acceptance criteria should be:

- observable by a reviewer, tester, or user;
- tied to a scenario or state;
- clear about success and failure;
- measurable when performance, quality, or business impact matters;
- independent of hidden implementation choices unless the implementation is part of the requirement.

Prefer "Given / When / Then" only when it improves clarity; do not force the format.

## Scope And Non-Goals

State:

- must-have behavior for the first useful release;
- optional behavior that may be deferred;
- explicitly excluded behavior;
- decisions already made;
- assumptions that must be validated;
- unknowns that block final commitment.

If priority matters, identify the binding constraint rather than making every item equal.

## Rollout And Operations

Consider when relevant:

- migration, backfill, feature flag, phased rollout, rollback, and deprecation;
- support workflow, admin workflow, customer communication, training, and documentation;
- analytics events, monitoring, alerts, audit logs, and operational dashboards;
- privacy, security, compliance, legal, data retention, and access control review.
