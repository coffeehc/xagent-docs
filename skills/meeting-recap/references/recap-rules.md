# Meeting Recap Rules

## Input Quality

Classify the material before writing:

- High: speaker-attributed transcript plus agenda or structured notes.
- Medium: meeting notes with clear topics, decisions, and owner names.
- Low: loose bullets, memory summary, or notes without attendee/owner context.

Low-quality input can still produce a useful recap, but decisions and actions need more confidence markers.

## Fabrication Prohibition

Never fabricate:

- owners
- due dates
- attendees
- decisions
- approvals
- commitments
- metrics
- links
- next meeting dates

Use explicit placeholders:

- `owner: unassigned`
- `due: not specified`
- `decision: inferred, confidence medium`
- `attendees: not provided`
- `source: user-provided notes`

## Decision Detection

Treat a decision as explicit when source text says:

- decided
- approved
- agreed
- final call
- go with
- no-go
- confirmed
- signed off

Treat a decision as inferred when the conversation strongly implies agreement but does not state finality. Label it.

Do not convert suggestions, ideas, objections, or unresolved tradeoffs into decisions.

## Action Detection

An action should include:

- owner or unassigned
- task
- due date or not specified
- dependency when known
- topic context

Imperative statements, "I will", "we need to", "can you", "next step", and "follow up" often signal actions. Confirm against surrounding context before adding them.

## Ownership Reconciliation

Add `## Ownership Reconciliation Required` near the top when:

- more than 30 percent of actions are unassigned, or
- any high-priority action lacks an owner, or
- the recap contains actions that cannot move without a named owner.

For each unassigned action:

- restate the action
- explain why owner is missing
- suggest a next confirmation step
- if suggesting a likely owner, mark it as inference

## Agenda Reconciliation

When an agenda exists:

- list planned topics
- list topics addressed
- list skipped topics
- list emergent topics
- note whether desired outcomes were met when the source supports it

When no agenda exists:

- say no agenda was provided or found
- omit planned-vs-actual claims

## Shareable Versus Internal

Shareable recap:

- short summary
- key decisions
- top actions
- link or reference to full recap if available

Internal notes:

- source quality
- inference notes
- unresolved source conflicts
- missing owners/dates
- generation context

Keep these separated so users can safely copy the shareable section.
