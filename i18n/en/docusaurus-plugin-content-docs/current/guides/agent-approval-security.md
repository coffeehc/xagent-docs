---
title: How AI Agent Approval and Safety Controls Work
description: Learn how xAgent reduces tool calls into file, network, data, session, and Skill operations, then pauses, approves, and resumes specific risky actions.
status: beta
updated: 2026-07-14
---

# How AI Agent Approval and Safety Controls Work

An AI Agent may do more than generate text. It can read or delete files, execute commands, access networks, send data, modify external systems, or publish team-visible Skills. Approval does not review an entire conversation before a task starts. It pauses the task when execution reaches a specific risky action.

## How xAgent Decides Whether Approval Is Required

Before a tool runs, xAgent derives atomic operation facts from the tool and its arguments. The current implementation covers these main areas:

- Workspace file reads, writes, and deletion.
- Network requests and process execution.
- Reading, writing, deleting, and transferring personal data such as email.
- Creating sub-sessions.
- Activating Skill drafts and submitting public Skills.

One tool call may produce several facts. Downloading an email attachment, for example, reads personal data and writes a workspace file. xAgent evaluates each fact and merges the result with this priority: deny, approval, then allow.

## When a Task Pauses

Approval does not prevent users from submitting a task. The normal flow is:

1. The user submits a task and the Agent starts working.
2. The Agent prepares a tool call.
3. xAgent derives operation facts and evaluates approval policies.
4. An allowed action runs immediately.
5. A denied action does not run.
6. An action requiring approval moves the session to `waiting_approval` and preserves the original tool call.
7. Approval resumes the preserved call. Rejection ends that operation and lets the Agent adjust its next step.

`waiting_approval` therefore means a specific operation has paused the session. It does not mean the whole task waited for administrator review before starting.

## Current Default Policy

In `v0.0.3.beta`, the default policy allows a main session to create sub-sessions and allows deletion inside the current session's artifact directory. These actions require one-time approval by default:

- Deleting other workspace files.
- Transferring personal data to an external system.
- Writing or deleting sensitive personal data.
- Activating a Skill draft.
- Submitting a Skill to the public library.

Other operations are allowed when no rule matches. Teams should add stricter rules for network access, process execution, file writes, and external-system actions instead of treating the default policy as a complete enterprise security baseline.

## System and Personal Policies

Administrators maintain the system policy, while users can maintain a personal policy. The current beta evaluates them in this order:

1. Evaluate the personal policy first.
2. Fall back to the system policy when the personal policy has no match or explicitly uses inherit.
3. Use the personal decision when a personal rule explicitly matches.

The current personal policy is therefore an override layer, not an add-only restriction layer. Environments that require administrator rules to be an immutable minimum baseline should not treat this beta behavior as the final enterprise governance model. The approval architecture still needs further unification for that requirement.

## Handling Approval in Web and IM

Users can inspect and decide approvals in the web session. `v0.0.3.beta` can also send approval notifications for tasks that originated from an IM connector back to the original connection channel:

- When the current task input came from an IM connector and the original channel is still connected and can send messages, xAgent attempts to send the approval notification back through that channel.
- The notification includes the approval reference, action summary, and related tool information.
- The user replies with the approval reference and the exact approve or reject wording shown by the notification.
- After the first valid decision, later replies for the same approval do not change the result again.

The current release does not broadcast approvals from web-originated tasks to every IM channel owned by the user. IM approval depends on the task originating from that connector, connector availability, user authentication, the original channel state, and an available message-send tool.

## Approval Does Not Replace External Authorization

Approval controls whether xAgent runs an action. It does not replace account permissions, data permissions, or auditing in an external system. When a Connector or MCP service accesses an enterprise system, that system should still decide what the connected identity can read or change.

Enterprise deployments should also use:

- Least-privilege external accounts.
- User workspace isolation and backups.
- Independent secret management.
- HTTPS, network controls, and firewalls.
- Real task validation for high-risk tools and external systems.

## Related Concepts

- [Tool Management](/docs/user-guide/tool)
- [Skill Management](/docs/user-guide/skill)
- [Connectors](/docs/user-guide/connector)
- [MCP vs. Connectors](/docs/guides/mcp-vs-connector)

## Next Steps

- [Configure Approval Policies](/docs/user-guide/approval-policy)
- [Validate Approval in an Agent Session](/docs/user-guide/agent-session)
- [How to Self-host an AI Agent](/docs/guides/self-hosted-ai-agent)
