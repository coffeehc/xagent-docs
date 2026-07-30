---
title: Glossary
description: Find the standard meanings of core xAgent terms including Agent, Task, Skill, Tool, Connector, Memory, Session, Workspace, and Runtime.
status: stable
updated: 2026-07-30
---

# Glossary

## Who This Is For

This page is for every author and reader of xAgent documentation.

## What It Is

The glossary is the source of standardized terminology for xAgent documentation. Add new terms here when they are introduced.

## Core Terms

| Term | Standard Meaning |
| --- | --- |
| Agent | The entity responsible for understanding goals, planning, scheduling Tools, and providing feedback |
| Task | A goal unit executed by an Agent |
| Tool | The smallest external capability an Agent can invoke |
| Skill | A reusable set of task methods, constraints, and Tool usage guidance |
| Connector | A protocol bridge to an external system and the source of its capability declarations |
| ProcessSandbox | The platform isolation boundary for untrusted processes, responsible for file mounts, environment, process trees, and resource limits |
| Runtime Assets | Execution dependencies independently installed and verified by xAgent, then provided read-only to ProcessSandbox |
| Execution Lease | The minimal file view, overlapping-write coordination, and file-change commit capability that WorkspaceFileService provides for one process execution |
| Memory | The memory system for long-term context |
| SubAgent | An independent execution unit for long-running tasks |
| Session | An interaction context between a user and an Agent |
| Workspace | The space for files, context, and intermediate artifacts used by an Agent during a Task |
| Trigger | A mechanism that turns a future time or external event into a Session Task |

## When to Use It

User guides, technical references, and maintenance documentation should all follow this glossary. A user guide can explain a term in plain language, but its core meaning must remain consistent.

## Writing Rules

When writing documentation:

- Do not invent synonyms without a reason.
- Do not describe planned capabilities as implemented.
- Update this page and related documentation when adding a term.
- Explain how to use a feature in user-facing pages; reserve internal boundaries for technical references.

## Related Documentation

- [What Is xAgent](/docs/getting-started/what-is-xagent)
- [Long-Term Memory](/docs/user-guide/memory)
- [Runtime and ProcessSandbox](/docs/architecture/runtime)
