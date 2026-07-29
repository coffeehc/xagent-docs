---
title: Your First Agent
status: stable
updated: 2026-07-05
unlisted: true
---

# Your First Agent

## Who This Is For

This page is for first-time xAgent users who are unsure whether they need to create a custom Agent.

## What It Is

An Agent is the work entity that understands goals, invokes Tools, and reports results in a Session. You do not need to design a complex Agent before starting. Begin with the default Session and default Agent, then configure a dedicated Agent or expert Session after the workflow becomes stable.

## When to Use It

Configure an Agent when xAgent needs to work in a persistent role, use a fixed combination of Tools, or follow a specific long-term working style.

## Basic Usage

For your first task:

1. Open the default Session and describe the task directly.
2. If the task requires a fixed role, such as contract reviewer or data analyst, configure the role in the Agent or expert settings.
3. Select the Tools, Skills, model, and Secrets the Agent needs.
4. Return to the Session and test one minimal task.
5. After the behavior is stable, keep the Agent for repeated use.

An Agent role description should contain long-lived information:

- The types of tasks the Agent owns.
- The default output style and delivery format.
- Common Tools, Skills, and external connections.
- Work the Agent should not handle.

Do not put temporary material, current file paths, the current plan, or one-time requirements into an Agent role description.

## Related Documentation

- [Agent](/docs/user-guide/agent)
- [Session](/docs/user-guide/session)
- [Tool Management](/docs/user-guide/tool)
