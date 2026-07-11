---
title: xAgent Approvals and Approval Policies
description: Learn how xAgent uses approvals and approval policies to control sensitive actions, including user confirmations and administrator rule configuration.
status: stable
updated: 2026-07-11
---

# xAgent Approvals and Approval Policies

## Who This Is For

This page is for ordinary users who need to confirm risky actions and administrators who need to configure security rules.

## What It Is

Approvals let a person confirm a sensitive action before it happens. Approval policies define in advance which actions can run directly, which require confirmation, and which should be rejected.

Ordinary users only need to remember one thing: when the page asks for confirmation, check the action and its effect before allowing it to continue.

![xAgent Approval Policy page showing rule types, risk levels, and approval decisions](/img/manual/xagent-approval-policy.png)

## When to Use It

The following situations commonly require approvals or policy controls:

- Deleting, overwriting, or moving important files.
- Sending messages, emails, or requests to an external system.
- Using a connection that may affect an external account.
- Accessing sensitive resources, internal addresses, or restricted data.
- Creating sub-sessions, long-running tasks, or automatically triggered tasks.

## How Ordinary Users Handle Approvals

When a session is waiting for confirmation, handle it in this order:

1. Check the action that will be performed.
2. Check the involved file, external system, or recipient.
3. Decide whether it matches the current task goal.
4. If the work should only produce a draft, ask it not to send anything yet.
5. Allow it to continue after confirming it is correct; reject it or add instructions when uncertain.

Do not approve an action just because the page says approval is required. The purpose of approval is to make users pause at an important point and verify it.

## How Administrators Configure Policies

Administrators can maintain system-wide rules on the **Approval Policies** page. The page usually includes a policy overview, a visual editor, and advanced JSON.

Use the visual editor first where possible:

| Field | How to understand it |
| --- | --- |
| Atomic action | The specific action type controlled by the rule |
| Decision | Allow directly, require approval, or reject |
| Resource scope | The files, sessions, or external resources affected by the rule |
| Risk | The risk label for the action |
| Session type | Whether the rule applies to main sessions, sub-sessions, or all sessions |
| Data domain | The category of data covered by the rule |
| Sensitive action | Whether it involves sending, deletion, authorization, or another sensitive action |
| Host / URL prefix | The target scope for external requests |

Policies are matched in order. The first matching rule takes effect. Put more specific and higher-risk rules first so a broad rule does not allow them too early.

## Recommended Policies

| Scenario | Recommendation |
| --- | --- |
| Regular file reading | Allow directly |
| Generating files in a workspace | Allow directly or require low-risk confirmation |
| Deletion, overwriting, or external sending | Require approval |
| Access to an unknown external address | Require approval or reject |
| Explicitly prohibited paths or systems | Reject directly |

Security requirements differ across teams. The administrator configuration is the final source of truth.

## Checks After Configuration

Before saving, check:

- Whether any direct-allow rule is too broad.
- Whether deletion, sending, and external requests still require approval.
- Whether the rule order works as intended.
- Whether example hosts or paths were mistakenly used as real configuration.
- Whether a personal approval policy needs additional rules.

After saving, use a low-risk test task to verify that the policy takes effect.

## Notes

- Approval policies do not replace account permissions.
- Do not put keys, tokens, or real passwords into policy descriptions.
- Public policies affect every user, so edit carefully.
- Keep human confirmation for high-risk actions even when they are technically executable.
- If you are unsure about a rule's scope, begin with a stricter rule and relax it gradually.

## Common Questions

### Will approvals block every dangerous action?

Approvals reduce risk, but they do not replace account permissions, external system permissions, or administrator management. Sensitive connections should still follow least-privilege configuration.

### Why does the same action sometimes require approval and sometimes not?

It may match a different resource scope, session type, or personal policy. Follow the current page state and administrator configuration.

### Can ordinary users edit system approval policies?

Usually not. Ordinary users may only configure personal approval policies, while administrators maintain system-wide policies.

## Continue Reading

- [Agent Session](/docs/user-guide/agent-session)
- [Workspace Files](/docs/user-guide/workspace)
- [Tool Management](/docs/user-guide/tool)
- [Connectors](/docs/user-guide/connector)
