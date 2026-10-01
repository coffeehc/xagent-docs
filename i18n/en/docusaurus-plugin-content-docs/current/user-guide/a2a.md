---
title: "A2A Client and Remote Agents"
description: "Discover remote Agent Cards, configure user-level connections, send or cancel tasks, and inspect the inbox."
status: beta
updated: 2026-10-01
---

# A2A Client and Remote Agents

Since `v0.0.16.beta`, xAgent includes a user-level A2A Client. Open **Operations &gt; A2A** to manage remote Agents and tasks. A2A is separate from locally installed AgentPlugins and does not add the remote Agent to your Workspace.

## When to Use It and Version Scope {/* #when-to-use-it-and-version-scope */}

Use this entry point to delegate work to an independently deployed Agent that supports A2A. Use Session capabilities for Main/Sub Session collaboration within one user, and AgentPlugins for IM entry points. Their identities, credentials, and result-return paths are different.

The persistence, unknown-outcome, and return-delivery behavior below was checked against main commit `43d2698` on 2026-10-01. `v0.0.16.beta` introduced the A2A entry point; it does not mean later fixes are present in that release or every deployed instance. Check your installed version and the changelog.

## Add a Remote Agent {/* #add-a-remote-agent */}

1. Add a remote Agent in the A2A page, enter its Agent Card address, discover the Card, and check its name and capabilities.
2. Configure the remote service's API Key, Bearer, or existing OAuth bearer token as required and save the connection. Do not put credentials in Session messages or documentation.
3. A callable remote Agent needs a working connection, valid authentication, and available Enterprise license capacity.

The client supports A2A v1 JSON-RPC and HTTP+JSON. Available actions depend on the remote Card and service implementation.

## Tasks and Results {/* #tasks-and-results */}

Select a remote Agent and send a task in the A2A page. You can inspect or refresh task status, reply when the remote Agent requests more input, or attempt to cancel a nonterminal task. After obtaining a remote task ID, monitoring prefers streaming for nonterminal tasks that are not waiting for user input, and falls back to polling when needed. After a restart it attempts to resume monitoring the original task. Handle input or authentication requests first; a valid reply can resume monitoring.

Remote Messages, Artifacts, states, and errors are retained as inbox event facts; delivery status is updated separately. Results requiring user action, terminal results, and errors with an originating Session can return to that Session. An Artifact-only update does not trigger this return delivery. Inspect task details for remote outcomes and failures. Administrators can review A2A usage and connection capacity separately from AgentPlugin Channel entitlements.

## Distinguish Three Outcomes {/* #distinguish-three-outcomes */}

| Visible state | What it establishes | What still needs checking |
| --- | --- | --- |
| Local task created or submitted | A local action record exists and remote submission was attempted | Remote acceptance, remote task ID, and subsequent state |
| Inbox event saved | This remote result is retained locally | Artifact contents, errors, and actual business effects |
| Returned to the source Session | The source Session reliably accepted the result input | Whether the Agent finished processing and whether approval is still pending |

The latest implementation commits the task result, corresponding inbox event, and terminal usage event in one database transaction. It validates remote task/context identity so unrelated or stale results cannot overwrite current facts. Return delivery retries with a stable message identity and is marked delivered only after SessionEngine reliably accepts it. This is not a read receipt or proof of business completion.

Return delivery is skipped when the source Session is missing, deleted, or owned by a different user. Temporary failures remain pending. A result notification can enter the Session execution path, but it cannot act as the user's approval or confirmation.

## Timeouts, Unknown Outcomes, and Retries {/* #timeouts-unknown-outcomes-and-retries */}

A timeout while sending, replying, or canceling does not prove the remote action never ran. When its effect cannot be confirmed, the original local task is retained with state `unknown`. Do not submit the same business action again merely because of that state.

1. Keep the local task ID, any known remote task ID, and the error details.
2. If a remote task ID exists, refresh or monitor the original task. Do not create a replacement task as a retry.
3. Without a remote task ID, the client cannot query that task and does not blindly resend on startup recovery. Verify the original request with the remote service.
4. On a terminal result, inspect the outcome and artifacts. Requesting cancellation does not establish successful cancellation or undo earlier external effects.

## Using A2A with Scheduled Work {/* #using-a2a-with-scheduled-work */}

A scheduled business run can explicitly wait for an A2A task started by the same Session. This binds the original action; a later receipt does not authorize a new action. Late results from a closed run may still require human attention. A completed local run does not prove that the remote action had no effect, and must not resume or overwrite another run's wait.

Related: [Agent Sessions](/docs/user-guide/agent-session) · [AgentPlugins](/docs/user-guide/connector) · [Changelog](/docs/changelog)
