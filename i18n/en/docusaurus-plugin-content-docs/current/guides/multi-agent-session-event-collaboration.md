---
title: How Multiple AI Agents Collaborate Through Session Events
description: Learn how independent AI Agent sessions exchange status, tasks, and file references through notifications and collaboration events without polluting context or crossing user boundaries.
status: beta
updated: 2026-07-15
---

# How Multiple AI Agents Collaborate Through Session Events

Putting every role, message, and tool call into one shared context is a simple way to coordinate multiple Agents. As tasks grow, however, histories and execution states from different roles begin to interfere with one another.

xAgent uses independent sessions connected by Session Events. Each Agent Session keeps its own context, task state, and workspace scope. When another session needs information or must continue working, the sender creates an event for a specific target session.

## Why Use Independent Sessions

Independent sessions let each Agent maintain its own goal, role, context, Tools, Skills, plan, progress, workspace, and outputs. Research, writing, data processing, and external delivery do not need to share one context. One session can also wait for approval while others continue working.

## Main Agents and Sub Agents

| Session type | Primary responsibility |
| --- | --- |
| Main Agent Session | Receives the user's goal, decides whether work should be delegated, creates or activates Sub Sessions, and remains the primary interaction entry point. |
| Sub Agent Session | Independently executes a focused objective with its own context, plan, Tools, and outputs. |

A Sub Agent is not a hidden reasoning block inside the Main Session. It is an independent Agent Session that users can open, inspect, and continue refining.

## What Is a Session Event?

A Session Event is a lightweight message for a specific target session. It can include a source, task or status summary, expected action, and workspace or external resource references.

It does not copy the sender's full history. Only the information required for the current collaboration is transferred, while the target continues with its own context.

## Notifications and Collaboration Events

### Notification Events

Notifications are suitable for progress, completion status, warnings, output locations, and facts that require user attention.

A notification appears in the target session's UI history, but it does not enter model context and does not automatically activate the target Agent. Notifications make a fact visible without allowing status noise to consume context.

### Collaboration Events

Collaboration Events are used when the target Agent must take over or continue work, such as delegating a task to an existing Sub Agent, handing off a later stage, or asking a target session to process new material.

A Collaboration Event enters the target runtime queue, becomes a new session input, and activates further processing. The target Agent uses its own context, Tools, and workspace boundaries.

Use a notification when a fact only needs to be displayed. Use a Collaboration Event when the target Agent must continue executing.

## Why Notifications Stay Out of Model Context

A multi-Agent system can produce many “started,” “progress updated,” and “file generated” messages. Injecting all of them into model context consumes space, increases cost, and may accidentally trigger another execution round.

xAgent stores notifications as user-visible session facts but filters them out of model requests. Only events that require Agent processing enter the execution path.

## How the Session Event Bus Works

xAgent includes a durable Session Event queue:

1. The sender specifies a target session and event mode.
2. xAgent verifies that the target exists and belongs to the current user.
3. The event enters the durable queue.
4. It is delivered to the target session.
5. A notification is written to UI history, while a Collaboration Event enters the runtime queue.
6. The target session handles it immediately or keeps it queued according to its current state.

An accepted or delivered event means that the target session has received it reliably. It does not mean that the business task has completed. Completion still requires task state, outputs, Tool results, or a later notification.

The durable queue also prevents events from being discarded when the target is busy or the delivery entry point is temporarily unavailable.

## What Can Produce Session Events?

### Agent Sessions

A Main Agent can create a Sub Session and send its first activation event. It can also collaborate with an existing target session. Sub Sessions can send notifications that report status and completion.

### Triggers

A timer or external Trigger can submit configured work to a specific session. The Trigger submits the event but does not wait for the target task to finish.

### Connectors

When WeChat, Telegram, or another Connector receives a message, it can convert the message into a Session Event. An explicit session reference targets that session; otherwise the message normally enters the current user's Main Session.

Connectors can also include images and documents. xAgent resolves them and makes them available as attachments in the target session.

### External Interfaces

Enterprise systems can use controlled interfaces to deliver business changes to a target Agent Session. External requests still require appropriate authentication and permissions.

## A Collaboration Example

Assume a user wants to collect industry news continuously and generate periodic reports:

1. The Main Agent creates a news collection Sub Session and a report generation Sub Session.
2. A timer Trigger activates the collection session through a Collaboration Event.
3. The collection session saves materials and organized results as session outputs.
4. It sends a notification so the user can see that the run has completed and review the output references.
5. When a report is needed, the Main Agent or user sends a Collaboration Event to the report session with confirmed source references.
6. The report session uses its own context and Skills instead of inheriting the collection session's full history.

The sessions exchange explicit tasks and outputs rather than merging every conversation into one context.

## Security Boundaries

### Sessions Communicate Only Within One User

Before an event is queued, xAgent verifies target ownership. The current version only allows events between sessions owned by the same user. Cross-user Session Events are not supported.

Cross-user communication involves impersonation, data disclosure, external account permissions, and approval responsibility. It requires a separate authorization and audit design.

### Every Event Needs a Specific Target

Session Events are not unrestricted broadcasts. The target must be resolved when the event is created. The queue does not infer a destination from event content.

### Events Do Not Bypass Approval

A Collaboration Event can activate a target session, but later Tool calls, file operations, external delivery, and business-system changes remain subject to permissions, workspace boundaries, and approval policies.

### Connectors Do Not Expand External Permissions

A Connector is an event and message entry point. What the external system allows still depends on user authorization and that system's permissions.

## Current Boundaries

- The current version provides session-level notifications and collaboration; a complete project-level Agent Team remains future work.
- Notifications do not activate the target Agent automatically.
- Successful delivery is not proof of business-task completion.
- Cross-user session collaboration is not supported.
- Complex collaboration should pass explicit tasks, file outputs, and verifiable results instead of vague status text.

## Related Concepts

- [Agent Session](/docs/user-guide/agent-session)
- [How AI Agents Run Long Tasks](/docs/guides/long-running-agent-task)
- [Connectors](/docs/user-guide/connector)
- [Triggers](/docs/user-guide/trigger)

## Next Steps

- [Create and Use an Agent Session](/docs/user-guide/agent-session)
- [Configure a Trigger](/docs/user-guide/trigger)
- [Install a Connector](/docs/deployment/connector-install)
