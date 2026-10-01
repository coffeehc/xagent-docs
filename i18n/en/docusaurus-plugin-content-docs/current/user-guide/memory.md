---
title: "xAgent Long-Term Memory for Preferences and Decisions"
description: "Learn explicit memory requests, My Memory management, and background history extraction, and distinguish cross-session facts from standing rules and task continuity."
status: experimental
updated: 2026-10-01
---

# xAgent Long-Term Memory for Preferences and Decisions

> Status: Experimental. Interfaces may change.

## Who This Is For {/* #who-this-is-for */}

This page is for users who want xAgent to retain stable preferences, confirmed decisions, or long-term context across Sessions.

## What It Is {/* #what-it-is */}

Long-term Memory reuses stable information across Sessions owned by the same user. The current implementation has three entry paths: explicit requests, direct user management, and background history extraction. It provides cross-Session background context, but it is not Session history, context compression, or an automatic archive of every conversation.

This page was checked against main commit `43d2698` on 2026-10-01. Earlier experimental implementations provided explicit registration only. Background extraction and management depend on the deployed version; do not assume older instances behave the same way.

## When to Use It {/* #when-to-use-it */}

Explicitly ask xAgent to remember information that will continue to affect future Tasks, such as:

- Stable output language, format, or collaboration preferences.
- Long-term project context.
- Confirmed decisions.
- Business boundaries or collaboration rules that must not be crossed.

## Basic Usage {/* #basic-usage */}

### Explicitly Ask xAgent to Remember {/* #explicitly-ask-xagent-to-remember */}

State the durable fact directly in the current message:

```text
Remember this: use Chinese for this project's weekly reports and always include risks and next steps.
```

The explicit conversational entry point requires the current user message to authorize creating, appending, correcting, or archiving cross-Session Memory. Successful registration means the background write is queued, not already finished. Standing rules and prohibitions require explicit authorization and cannot be inferred by background extraction.

### Recall Earlier Information {/* #recall-earlier-information */}

When an earlier preference or decision is relevant, describe the subject directly:

```text
Check my earlier agreement about this project's weekly report format, then generate this week's report.
```

xAgent queries the current user's long-term Memory when relevant information may materially affect the current Task. A result is still evaluated against its source, update time, confidence, and current facts, and it does not replace verification of live external information.

### Change the Current Request {/* #change-the-current-request */}

If the current request conflicts with older Memory, state the new requirement directly:

```text
Use English for this weekly report only.
```

Current user input, Tool results, permissions, and system rules take priority over older Memory. A change explicitly limited to this task should not become long-term Memory. For a lasting change, explicitly ask xAgent to remember the new rule and verify the saved content.

### Manage My Memory {/* #manage-my-memory */}

If your version provides My Memory, use it to inspect your memories and directly add or delete entries. Manual creation retains the submitted text as source evidence and writes the fact synchronously. A conversational remember request instead registers a background write.

Archiving removes an entry from automatic recall; direct deletion removes the Memory and its search projection. Neither clears the original Session history nor reverses external actions previously taken using that information.

### Understand Background History Extraction {/* #understand-background-history-extraction */}

After successful context compression or sustained Session inactivity, the system can send sealed original history to background extraction. It reads original message segments, rather than treating the context summary as a source of facts.

- Only evidenced stable preferences, user-accepted decisions, verifiable facts, and a small number of lasting events are eligible.
- Questions, hypotheticals, unaccepted suggestions, temporary progress, secrets, and candidates without valid evidence are rejected.
- Preferences and decisions require direct user evidence; decisions additionally require evidence of user acceptance.
- Background content has no standing instruction authority. It cannot become a rule or prohibition, or overwrite, archive, or supersede an existing fact merely because a conflicting candidate appears.
- Background extraction and search may lag. A missing recall does not mean the information was never discussed or prove that it was saved successfully.

### Distinguish Four Types of Continuity {/* #distinguish-four-types-of-continuity */}

| Information | Scope | How to use it |
| --- | --- | --- |
| Session history | Original communication in the current Session | Check what was said |
| Context summary | Continuation of the current Session | Retain goals, constraints, progress, and unresolved questions |
| Work records | Topic records, revisions, and increments in the current Session | Check stage evidence and continuation state |
| Long-term Memory | Sessions owned by the same user | Reuse stable background that passes admission checks |

## Usage Boundaries {/* #usage-boundaries */}

| Information | Suitable for Long-Term Memory? |
| --- | --- |
| Stable preferences, confirmed decisions, and durable boundaries | Yes, when the user explicitly asks xAgent to remember them |
| Temporary Tasks, current progress, and one-off file paths | No |
| Passwords, tokens, private keys, and other secrets | Do not store |
| Assistant suggestions or unconfirmed inferences | Do not store |
| Live prices, news, and current external-system state | Query the source again |
| Another user's data or data outside the current user's access | Cannot be read or stored |

## Privacy and Accuracy {/* #privacy-and-accuracy */}

- Long-term Memory is read within the current user boundary. Knowing the name of another Session or user does not grant access.
- Memory provides background continuity. It does not prove that an action ran or expand the current Session's responsibility or permissions.
- Low-confidence, stale, conflicting, or superseded Memory must not be presented directly as a confirmed fact.
- When Memory retains an original source, responses that rely on it should preserve the verifiable source link.

## Related Documentation {/* #related-documentation */}

- [Agent Session](/docs/user-guide/agent-session)
- [Long-running Tasks](/docs/user-guide/long-task)
- [Glossary](/docs/reference/glossary)
