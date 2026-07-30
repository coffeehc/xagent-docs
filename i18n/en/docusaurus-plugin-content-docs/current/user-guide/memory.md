---
title: xAgent Long-Term Memory for Preferences and Decisions
description: Learn how xAgent stores long-term memory on explicit request and recalls preferences, decisions, boundaries, and verified facts in later sessions.
status: experimental
updated: 2026-07-30
---

# xAgent Long-Term Memory for Preferences and Decisions

> Status: Experimental. Interfaces may change.

## Who This Is For

This page is for users who want xAgent to retain stable preferences, confirmed decisions, or long-term context across Sessions.

## What It Is

Long-term Memory preserves information that the current user explicitly asks xAgent to retain. It provides cross-Session background context, but it is not Session history, context compression, or an automatic archive of every conversation.

## When to Use It

Explicitly ask xAgent to remember information that will continue to affect future Tasks, such as:

- Stable output language, format, or collaboration preferences.
- Long-term project context.
- Confirmed decisions.
- Business boundaries or collaboration rules that must not be crossed.

## Basic Usage

### Explicitly Ask xAgent to Remember

State the durable fact directly in the current message:

```text
Remember this: use Chinese for this project's weekly reports and always include risks and next steps.
```

xAgent registers long-term Memory only when the current user message explicitly asks to remember, store, or retain something across Sessions. A successful registration means the background write has been queued; it does not mean every conversation is saved automatically.

### Recall Earlier Information

When an earlier preference or decision is relevant, describe the subject directly:

```text
Check my earlier agreement about this project's weekly report format, then generate this week's report.
```

xAgent queries the current user's long-term Memory when relevant information may materially affect the current Task. A result is still evaluated against its source, update time, confidence, and current facts, and it does not replace verification of live external information.

### Change the Current Request

If the current request conflicts with older Memory, state the new requirement directly:

```text
Use English for this weekly report only.
```

Current user input, Tool results, permissions, and system rules take priority over older Memory. A temporary change does not automatically rewrite long-term Memory. To make a lasting change, explicitly ask xAgent to remember the new rule.

## Usage Boundaries

| Information | Suitable for Long-Term Memory? |
| --- | --- |
| Stable preferences, confirmed decisions, and durable boundaries | Yes, when the user explicitly asks xAgent to remember them |
| Temporary Tasks, current progress, and one-off file paths | No |
| Passwords, tokens, private keys, and other secrets | Do not store |
| Assistant suggestions or unconfirmed inferences | Do not store |
| Live prices, news, and current external-system state | Query the source again |
| Another user's data or data outside the current user's access | Cannot be read or stored |

## Privacy and Accuracy

- Long-term Memory is read within the current user boundary. Knowing the name of another Session or user does not grant access.
- Memory provides background continuity. It does not prove that an action ran or expand the current Session's responsibility or permissions.
- Low-confidence, stale, conflicting, or superseded Memory must not be presented directly as a confirmed fact.
- When Memory retains an original source, responses that rely on it should preserve the verifiable source link.

## Related Documentation

- [Agent Session](/docs/user-guide/agent-session)
- [Long-running Tasks](/docs/user-guide/long-task)
- [Glossary](/docs/reference/glossary)
