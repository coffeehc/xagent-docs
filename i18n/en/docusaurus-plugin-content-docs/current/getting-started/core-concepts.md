---
title: Terminology
status: stable
updated: 2026-07-05
unlisted: true
---

# Terminology

## Who This Is For

This page is for people who maintain documentation, troubleshoot issues, build custom integrations, or read technical material. Regular users do not need to read it first.

## Core Concepts

The following terms are common in xAgent technical documentation:

| Concept | Meaning |
| --- | --- |
| Session | A continuous work context containing messages, state, visible capabilities, and artifacts |
| Agent | The work entity that understands goals, decides what to do next, and invokes capabilities in a Session |
| Task | A goal the user wants to complete, from a simple request to a multi-stage task |
| Tool | A concrete capability an Agent can invoke, such as reading or writing files, querying data, requesting a web page, or sending email |
| Skill | Reusable methods and Tool usage guidance for a type of task |
| Connector | A connection that integrates an external system such as WeChat, email, an enterprise system, or a third-party API with xAgent |
| Workspace | The space that stores input files, intermediate results, reports, and previewable artifacts |
| Memory | A long-term context capability that retains valuable preferences, decisions, and background |
| SubAgent | An independent execution unit for long-running or decomposed tasks |
| RuntimeConnection | An execution environment that a Tool may depend on; regular users generally do not operate it directly |

## When to Use It

Use this page when discussing system boundaries with development, implementation, or maintenance teams. For standardized terminology, refer to the [Glossary](/docs/reference/glossary).

## Basic Flow

A system interaction can be understood in this order:

```text
User goal -> Session -> Agent -> Tool / Skill / Connector / Workspace -> Results and artifacts
```

As a task becomes more complex, xAgent may use Memory, SubAgents, or Triggers to retain context, decompose work, or schedule execution. Regular users only need to provide material, approve actions, and review results when prompted by the interface.

## Related Documentation

- [Agent](/docs/user-guide/agent)
- [Session](/docs/user-guide/session)
- [Tool Management](/docs/user-guide/tool)
- [Glossary](/docs/reference/glossary)
