---
title: "How Multiple AI Agents Collaborate Through Session Events"
description: "Learn how independent AI Agent sessions exchange status, tasks, and file references through notifications and collaboration events without polluting context or crossing user boundaries."
status: beta
updated: 2026-10-01
---

# How Multiple AI Agents Collaborate Through Session Events

Putting every role, message, and tool call into one shared context is a simple way to coordinate multiple Agents. As tasks grow, however, histories and execution states from different roles begin to interfere with one another.

xAgent uses independent sessions plus Session messages. Each Agent keeps its own context, task state, and workspace scope. When another Session needs information or should continue working, the sender delivers a targeted message. This page retains the conceptual term Session Event; the current implementation preprocesses a MessageEnvelope before passing input to the target SessionEngine.

Message kinds, acceptance boundaries, and WorkGroup behavior below were checked against main commit `43d2698` on 2026-10-01. Older event modes or automatic-return descriptions are not current tool parameters. Available behavior still depends on the deployed version.

## Why Use Independent Sessions {/* #why-use-independent-sessions */}

Independent sessions let each Agent maintain its own goal, role, context, Tools, Skills, plan, progress, workspace, and outputs. Research, writing, data processing, and external delivery do not need to share one context. One session can also wait for approval while others continue working.

## Main Agents and Sub Agents {/* #main-agents-and-sub-agents */}

| Session type | Primary responsibility |
| --- | --- |
| Main Agent Session | Receives the user's goal, decides whether work should be delegated, creates or activates Sub Sessions, and remains the primary interaction entry point. |
| Sub Agent Session | Independently executes a focused objective with its own context, plan, Tools, and outputs. |

A Sub Agent is not a hidden reasoning block inside the Main Session. It is an independent Agent Session that users can open, inspect, and continue refining.

## What Is a Session Event? {/* #what-is-a-session-event */}

A Session Event is a lightweight message for a specific target session. It can include a source, task or status summary, expected action, and workspace or external resource references.

It does not copy the sender's full history. Only the information required for the current collaboration is transferred, while the target continues with its own context.

## Notifications and Collaboration Events {/* #notifications-and-collaboration-events */}

### Notification Events {/* #notification-events */}

Notifications are suitable for progress, completion status, warnings, output locations, and facts that require user attention.

Distinguish display-only notifications from notifications that require Agent processing. An input with `context_scope=notify` is written to UI history without starting execution. Current A2A results can instead use `message_kind=notification` with `context_scope=full` to enter the processing path. The word notification alone does not determine whether an Agent is activated.

### Collaboration Events {/* #collaboration-events */}

Collaboration Events are used when the target Agent must take over or continue work, such as delegating a task to an existing Sub Agent, handing off a later stage, or asking a target session to process new material.

A Collaboration Event enters the target runtime queue, becomes a new session input, and activates further processing. The target Agent uses its own context, Tools, and workspace boundaries.

Current `session_send` submissions use `full` context scope. `forward` means that no result is requested; it does not mean UI-only or no activation. Message meaning and context consumption scope are separate dimensions.

<span id="why-notifications-stay-out-of-model-context"></span>

## Why Display-only Notifications Do Not Start Execution {/* #why-display-only-notifications-do-not-start-execution */}

A multi-Agent system can produce many “started,” “progress updated,” and “file generated” messages. Injecting all of them into model context consumes space, increases cost, and may accidentally trigger another execution round.

That is the purpose of display-only notifications, not a universal rule for every `notification` message. Inputs requiring processing, including Session messages and A2A results, must be interpreted using their actual context scope and runtime-queue behavior. Do not turn a result that needs processing into display-only input merely to reduce notification noise.

## How the Session Event Bus Works {/* #how-the-session-event-bus-works */}

Separate submission from durable acceptance:

1. The sender determines the target Session, message body, and message kind.
2. Brain validates ownership and processes trusted source metadata and resource references.
3. An ordinary `session_send` response with `accepted=true` means Brain accepted asynchronous delivery work.
4. SessionEngine subsequently accepts the input. `full` / `sliced` input enters the Session queue with a recovery snapshot; `notify` input is written to history.
5. Reliably accepted runtime input is processed or queued according to the target state. Running work, pending approval, and incomplete recovery affect timing.
6. Actual execution, artifacts, and later replies establish the business outcome.

The older durable-queue description maps to current SessionEngine acceptance and recovery facts. It does not make ordinary send acceptance a durable target-Engine receipt. Asynchronous delivery can fail after submission succeeds. Check the target timeline and errors rather than treating submission as business completion.

### Choose the Right Message Kind {/* #choose-the-right-message-kind */}

| `message_kind` | Purpose | Return semantics |
| --- | --- | --- |
| `assignment` | Give an existing Session a new task | Does not create an automatic reply binding |
| `forward` | Pass information; the default kind | Does not request a result, but can still activate the target |
| `collaboration_request` | Request work and a result | A trusted marker supplies the exact source Session for the model to reply to |
| `reply` | Return the result to the requester | Another one-way send, not a runtime completion acknowledgement |

Use `session_query` to locate a Session, `session_create_sub` when a new execution owner is needed, and `session_send` to send one message to an exact existing Session. Use a precise SessionRef supplied by the user or a successful tool result; never guess or alter the identity.

Creating a Sub Session submits its first `assignment`. Neither creation nor sending establishes a wait state, completion state, or automatic return path. A collaboration request instructs the receiving model to finish the work and call `session_send` once with `reply` and the complete result. This is model behavior guided by a trusted message marker, not a runtime guarantee that every Sub Session replies.

Consequently, two child replies arriving and separately resuming the coordinator does not mean the runtime generated those replies for the children. Missing materials, errors, or a missed reply action may still require user follow-up. Check the actual replies and artifacts; do not duplicate assignments or poll merely because sending succeeded.

## What Can Produce Session Events? {/* #what-can-produce-session-events */}

### Agent Sessions {/* #agent-sessions */}

A Main Agent can create a Sub Session and submit its first assignment, or send a message to an existing target. A Sub Session can display progress; when the coordinator needs to continue, it should send a reply to the exact source rather than only leaving a final answer locally.

### Triggers {/* #triggers */}

A timer or external Trigger can submit configured work to a specific session. The Trigger submits the event but does not wait for the target task to finish.

### AgentPlugins {/* #agentplugins */}

AgentPlugins such as WeChat or Telegram can turn incoming messages into Session input with a trusted source. Routing depends on the plugin entry point, Session references, and front-desk responsibilities. Do not assume every unaddressed message goes to the Main Session.

AgentPlugins can also include images and documents. xAgent resolves them and makes them available as attachments in the target session.

Current `session_send` supports internal Session forwarding and rejects AgentPlugin front-desk Sessions as targets. Delivering a result to an external user requires the relevant plugin send capability and exact source. A final answer in an internal Session does not establish external delivery.

### External Interfaces {/* #external-interfaces */}

Enterprise systems can use controlled interfaces to deliver business changes to a target Agent Session. External requests still require appropriate authentication and permissions.

## A Collaboration Example {/* #a-collaboration-example */}

Assume a user wants to collect industry news continuously and generate periodic reports:

1. The Main Agent creates a news collection Sub Session and a report generation Sub Session.
2. A timer Trigger activates the collection session through a Collaboration Event.
3. The collection session saves materials and organized results as session outputs.
4. It displays the stage result and artifact references. A display-only notification does not continue work in the reporting Session.
5. When a report is needed, the Main Agent or user sends a clear task to the reporting Session. Use a collaboration request when a reply is needed, with confirmed material references the target is allowed to access.
6. The report session uses its own context and Skills instead of inheriting the collection session's full history.

The sessions exchange explicit tasks and outputs rather than merging every conversation into one context.

## Security Boundaries {/* #security-boundaries */}

### Sessions Communicate Only Within One User {/* #sessions-communicate-only-within-one-user */}

Before an event is queued, xAgent verifies target ownership. The current version only allows events between sessions owned by the same user. Cross-user Session Events are not supported.

Cross-user communication involves impersonation, data disclosure, external account permissions, and approval responsibility. It requires a separate authorization and audit design.

### Every Event Needs a Specific Target {/* #every-event-needs-a-specific-target */}

Session Events are not unrestricted broadcasts. The target must be resolved when the event is created. The queue does not infer a destination from event content.

### Events Do Not Bypass Approval {/* #events-do-not-bypass-approval */}

A Collaboration Event can activate a target session, but later Tool calls, file operations, external delivery, and business-system changes remain subject to permissions, workspace boundaries, and approval policies.

### AgentPlugins Do Not Expand External Permissions {/* #agentplugins-do-not-expand-external-permissions */}

An AgentPlugin is an event and message entry point. What the external system allows still depends on user authorization and that system's permissions.

## Current Boundaries {/* #current-boundaries */}

- Current main includes same-user Session collaboration and WorkGroup management Sessions, Agent/edge directories, drafts, and published versions. WorkGroup owns orchestration configuration rather than a separate business runtime state; Sessions still execute the work.
- The earlier project-level Agent Team roadmap must not obscure implemented WorkGroup capabilities, nor be read as a promise of cross-user shared teams, automatic task closure, or autonomous completion of arbitrary projects.
- Display-only notifications do not activate the target Agent. Check message kind and context consumption scope separately.
- Successful delivery is not proof of business-task completion.
- Cross-user session collaboration is not supported.
- Complex collaboration should pass explicit tasks, file outputs, and verifiable results instead of vague status text.

## Related Concepts {/* #related-concepts */}

- [Agent Session](/docs/user-guide/agent-session)
- [How AI Agents Run Long Tasks](/docs/guides/long-running-agent-task)
- [AgentPlugins](/docs/user-guide/connector)
- [Triggers](/docs/user-guide/trigger)

## Next Steps {/* #next-steps */}

- [Create and Use an Agent Session](/docs/user-guide/agent-session)
- [Configure a Trigger](/docs/user-guide/trigger)
- [AgentPlugin user guide](/docs/user-guide/connector)
