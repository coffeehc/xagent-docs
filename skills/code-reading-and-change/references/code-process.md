# Code Process Rules

## Task Modes

Classify the task before touching files.

- Read/explain: trace behavior and report code evidence.
- Bug diagnosis: reproduce or inspect the failing path, then identify owner and cause.
- Implementation: add requested behavior in the existing owner module.
- Refactor: simplify or relocate behavior without changing external behavior unless requested.
- Review: produce findings first; do not edit unless asked.
- Test repair: distinguish broken test assumptions from real regressions.
- Config update: inspect consumers before changing config shape or defaults.

## Code Reading

Read from the behavior boundary inward:

1. Entry point: command, handler, component, service method, test, or runtime event.
2. Contract: types, schema, prompt contract, config, API, persistence, or output shape.
3. Owner: module or service that should decide the behavior.
4. Consumers: callers, UI, tests, downstream parsers, migration paths.
5. Existing patterns: nearby helpers, naming, error handling, validation, logging, and tests.

Do not infer ownership from filenames alone when code paths can prove it.

## Bug Diagnosis

For failures:

- capture the observed symptom and exact failing step;
- identify whether the failure is input, state, parsing, ownership, persistence, runtime, tool, network, UI, or test expectation;
- follow real data and control flow before changing code;
- avoid treating a UI symptom as backend fact, or a backend log as user-facing behavior, without tracing the boundary.

## Change Discipline

Good changes are narrow and owner-aligned.

- Prefer existing service/model/component/tooling boundaries.
- Do not add a new abstraction unless it removes real complexity or matches local architecture.
- Delete old behavior only when the live path is proven replaced and the user asked for cleanup or compatibility is not needed.
- Keep public interfaces small.
- Add comments only for non-obvious why, not for line-by-line narration.
- Preserve unrelated user edits in dirty files.

## Validation Selection

Choose validation by risk:

- type/compile tests for touched packages;
- unit tests for changed behavior;
- integration tests for cross-module contracts;
- frontend build or browser verification for rendered UI changes;
- targeted reproduction for bugs;
- diff or static scans for prompt/schema/resource changes;
- manual inspection only when executable validation is unavailable or not meaningful.

If validation cannot run, state why and what remains unverified.

## Review Mode

When reviewing:

- findings first, ordered by severity;
- cite exact file and line when possible;
- focus on bugs, regressions, missing tests, security, data loss, and behavioral drift;
- avoid style-only comments unless they hide real risk;
- if no issues are found, say so and name residual risk.

## Recovery

If a patch fails or tests fail:

1. Read the failure.
2. Decide whether it reveals a real bug, stale expectation, environment issue, or unrelated dirty-state conflict.
3. Fix only when the failing path is in scope.
4. Do not blindly retry without changed evidence.
5. Report unresolved blockers with the next required fact or action.
