---
title: xAgent Triggers
description: Learn how to use xAgent Triggers to submit tasks on a schedule or in response to events, including creation, testing, enabling, and run-state checks.
status: experimental
updated: 2026-07-11
---

# xAgent Triggers

> Status: Experimental. The page and its fields may change.

## Who This Is For

This page is for users and administrators who need xAgent to run tasks on a schedule or create tasks automatically from external events.

## What It Is

A Trigger automatically submits a task. Think of it as “when a scheduled time arrives or an event is received, send a prepared task to xAgent automatically.”

A Trigger is not the task result. It starts the task; use the session and workspace to view results.

![xAgent Trigger Management page showing scheduled task status, execution policies, and run information](/img/manual/xagent-triggers.png)

## When to Use It

Triggers are suitable for:

- Checking email at 9 AM every day and generating a summary.
- Collecting news every four hours and sending a summary.
- Generating a recurring weekly report.
- Sending a task into a session after an external system receives a new message.
- Reminding xAgent to handle a repeated task at a scheduled time.

Triggers are not suitable when:

- The task goal is still unstable.
- Materials differ every time and need human judgment.
- The action is high risk and should not start automatically.
- External system authorization is not ready.

## Reading the Page

The **Trigger Management** page normally shows:

| Information | Meaning |
| --- | --- |
| Name | Display name of the Trigger |
| Key | Trigger identifier used to distinguish it from others |
| Status | Whether it is enabled |
| Policy | Schedule interval or event rule |
| Run state | Next run, latest run, and trigger count |
| Actions | Manually trigger, disable, edit, or delete |

Ordinary users should focus on the name, status, next run time, and latest run result.

## Basic Usage

### Create a Scheduled Trigger

1. Open **Trigger Management**.
2. Select **New Trigger**.
3. Choose a trigger type, such as scheduled.
4. Enter a name and key.
5. Set the execution time or interval.
6. Enter the task that should be sent to xAgent after it fires.
7. Save and confirm that it is enabled.
8. Manually trigger it once for testing when needed.

Write a full task for a Trigger. Do not use vague instructions such as “continue” or “handle it.”

Example:

```text
Please check customer email received today and list messages that need a reply. Generate drafts first and do not send them automatically.
```

### Trigger It Manually Once

Manual triggering is useful for checking whether configuration is correct. After triggering, open the related session and verify that the task was created, whether it failed, and whether it needs approval.

If a test could affect an external system, change it first to only generate a draft or only read data.

### Disable a Trigger

Disable a Trigger when it is no longer needed, its external connection is failing, its policy needs adjustment, or it might run repeatedly. Disabling is better than deleting when you only need to pause it temporarily.

## Writing a Trigger Task

A Trigger task should include:

| Content | Example |
| --- | --- |
| Goal | Generate a daily email summary |
| Data scope | Process only new email received after 00:00 today |
| Output format | Produce a to-do list and suggested replies |
| Risk constraint | Do not send automatically; wait for confirmation |
| Failure handling | State the reason in the session if the connection is unavailable |

Full example:

```text
Please check today's new email, filter the items I need to handle, and sort them by urgency. For messages requiring a reply, generate drafts only and do not send them directly.
```

## Common Questions

### Does a Trigger wait until the task finishes?

No. A Trigger starts the task. The execution progress and results remain in the session.

### Why did a Trigger not run?

Possible reasons include: it is disabled, the scheduled time has not arrived, an external connection is unavailable, the task was blocked by an approval policy, or the configuration did not save successfully.

### Can a scheduled task send messages directly?

Whether it can send depends on Tools, connections, and approval policies. By default, generate a draft first and send only after confirmation.

### When should I delete a Trigger?

Delete it only when it is no longer needed and will not be reused. Disable it first when you only need to pause the task.

## Continue Reading

- [Agent Session](/docs/user-guide/agent-session)
- [Tasks](/docs/user-guide/task)
- [Long-running Tasks](/docs/user-guide/long-task)
- [Connectors](/docs/user-guide/connector)
