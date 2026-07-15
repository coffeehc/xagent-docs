---
title: xAgent Approvals and Approval Policies
description: Learn how xAgent uses approvals and approval policies to control sensitive actions, including user confirmations and administrator rule configuration.
status: beta
updated: 2026-07-15
---

# xAgent Approvals and Approval Policies

## Who This Is For

This page is for ordinary users who need to confirm risky actions and administrators who need to configure security rules.

## What It Is

Approvals let a person confirm a specific risky operation before it runs. Approval policies define which tool operations can run directly, which require confirmation, and which should be rejected.

Users can submit a task normally. The session enters `waiting_approval` only when the Agent reaches a matching tool call. Approval resumes the preserved tool call; rejection prevents that operation from running.

Ordinary users only need to remember one thing: when the page asks for confirmation, check the action and its effect before allowing it to continue.

![xAgent Approval Policy page showing rule types, risk levels, and approval decisions](/img/manual/xagent-approval-policy.png)

## When to Use It

The current policy model can identify and control these main operations:

- Workspace file reads, writes, and deletion.
- Network requests and process execution.
- Reading, writing, deleting, and transferring personal data such as email.
- Creating sub-sessions.
- Activating Skill drafts and submitting public Skills.

One tool call may produce several operation facts. xAgent merges their results with this priority: deny, approval, then allow.

## How Ordinary Users Handle Approvals

When a session is waiting for confirmation, handle it in this order:

1. Check the action that will be performed.
2. Check the involved file, external system, or recipient.
3. Decide whether it matches the current task goal.
4. If the work should only produce a draft, ask it not to send anything yet.
5. Allow it to continue after confirming it is correct; reject it or add instructions when uncertain.

Do not approve an action just because the page says approval is required. The purpose of approval is to make users pause at an important point and verify it.

When a task originated from an IM connector and the original connection channel can still send messages, xAgent can send the approval notification back through that channel. Follow the notification format and reply with the approval reference plus the approve or reject wording. Only the first valid decision is accepted. The current release does not broadcast approvals from web-originated tasks to every IM channel.

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

## System and Personal Policies

Administrators maintain the system policy, while users can maintain a personal policy. The current beta evaluates the personal policy first and falls back to the system policy only when no personal rule matches or the personal rule uses inherit. An explicit personal match overrides the system decision.

The personal policy is therefore an override layer, not an add-only restriction layer. Enterprise environments that require administrator rules to be an immutable minimum baseline should evaluate whether personal policy editing is appropriate for the current beta.

## Current Default Policy

The default policy allows a main session to create sub-sessions and allows deletion in the current session's artifact directory. These actions require one-time approval by default:

- Deleting other workspace files.
- Transferring personal data to an external system.
- Writing or deleting sensitive personal data.
- Activating a Skill draft.
- Submitting a Skill to the public library.

Other operations are allowed when no rule matches. Teams should add rules for network access, process execution, file writes, and external systems according to their risk requirements.

## Recommended Policies

| Scenario | Recommendation |
| --- | --- |
| Regular file reading | Allow directly |
| Generating files in a workspace | Allow directly or require low-risk confirmation |
| Deletion, sensitive writes, or external sending | Require approval |
| Access to an unknown external address | Require approval or reject |
| Explicitly prohibited paths or systems | Reject directly |

Security requirements differ across teams. The current effective result is determined by the personal and system policies together.

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
- System policies affect every user, so edit carefully.
- Personal rules can currently override system decisions; confirm this behavior fits the deployment's governance requirements.
- Keep human confirmation for high-risk actions even when they are technically executable.
- If you are unsure about a rule's scope, begin with a stricter rule and relax it gradually.

## Common Questions

### Will approvals block every dangerous action?

Approvals reduce risk, but they do not replace account permissions, external system permissions, or administrator management. Sensitive connections should still follow least-privilege configuration.

### Why does the same action sometimes require approval and sometimes not?

It may match a different resource scope, session type, or personal rule. The effective result is calculated from the current tool arguments together with the personal and system policies.

### Does approval block the whole task before it starts?

No. A task starts normally. Only a specific tool operation that matches a policy pauses for approval.

### Can I approve from WeChat or Telegram?

Yes. Starting with `v0.0.4.beta`, when a session waits for approval, xAgent attempts to notify every currently available IM messaging channel owned by the user. The Connector must be online, the user must be authenticated, and the connection must provide an available message-send Tool. Reply with the notification's `@{approval:id}` and explicit approve or reject form.

### Can ordinary users edit system approval policies?

Usually not. Ordinary users may only configure personal approval policies, while administrators maintain system-wide policies.

## Continue Reading

- [Shortcut Protocol: Commands, Targets, and References](/docs/guides/shortcut-instruction-protocol)
- [Agent Session](/docs/user-guide/agent-session)
- [Workspace Files](/docs/user-guide/workspace)
- [Tool Management](/docs/user-guide/tool)
- [Connectors](/docs/user-guide/connector)
- [AI Agent Approval and Safety](/docs/guides/agent-approval-security)
