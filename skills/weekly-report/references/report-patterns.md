# Weekly Report Patterns

## Report Modes

### Individual Update

Use when one person reports their own work. Optimize for accountability and support.

Required sections:

- summary
- accomplishments
- in progress
- blockers or risks
- next-week priorities
- support needed

Good individual reports state what changed, why it matters, and what is needed next. Avoid long task logs unless the user asks for detail.

### Team Rollup

Use when several updates must become one status report. Optimize for cross-team scanning.

Required sections:

- team status
- major wins
- grouped progress by workstream
- shared blockers
- risks and decisions
- next-week focus

Do not paste individual updates unchanged. Merge duplicate blockers, surface dependencies, and preserve owner names for actions.

### Project Status

Use when a project, initiative, or client workstream is the unit of reporting.

Required sections:

- status: on track, at risk, blocked, completed, or unknown
- progress this week
- milestone movement
- blockers and mitigations
- decisions needed
- next milestone

If status is inferred rather than provided, label it as inferred and explain the evidence.

### Executive Summary

Use for leadership readers who need outcome, risk, and ask first.

Required sections:

- TL;DR
- key outcomes
- risk and mitigation
- metrics
- decisions or support needed
- next week

Keep implementation detail below the main status. Include only the technical detail needed to explain risk, timeline, or decision.

### Client Progress Report

Use when the reader is outside the team or organization.

Required sections:

- concise summary
- completed this week
- in progress
- upcoming milestones
- items requiring client input
- next-week focus

Remove internal-only debate, personnel issues, unapproved roadmap detail, and unverified dates.

## 3P Model

Use 3P when the user wants a quick status format:

- Progress: what moved forward.
- Plans: what will happen next.
- Problems: blockers, risks, dependencies, or decisions needed.

The Problems section should include impact and requested help where known.

## Blocker Writing

A useful blocker includes:

- blocked item
- cause
- impact
- current owner or missing owner
- next action
- requested escalation or decision

Weak: `Waiting on review.`

Better: `Waiting on security review for authentication flow; deployment is blocked until approval is complete. Need review owner and target date confirmed.`

## Metrics

Use metrics only when provided or visible in source material. Preserve units and period:

- `12 tickets closed this week`
- `checkout error rate down from 3.2% to 1.1%`
- `2 of 5 milestones completed`

If the user asks for metrics but no source exists, add a `Metrics to collect` subsection instead of inventing values.

## Review Checklist

- Does the first section tell the reader the real status?
- Are blockers actionable?
- Are next steps few enough to be credible?
- Are dates, numbers, owners, and commitments source-backed?
- Is anything confidential or speculative accidentally exposed?
- Is the tone appropriate for the audience?
