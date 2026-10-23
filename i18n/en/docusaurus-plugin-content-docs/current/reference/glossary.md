---
title: "Glossary"
description: "Find the meanings of xAgent terms including Agentic Loop, context engineering, long-term memory, multi-agent collaboration, Skills, MCP, A2A, and human approval."
status: stable
updated: 2026-10-23
---

# Glossary

## Who This Is For {/* #who-this-is-for */}

This page is for every author and reader of xAgent documentation.

## What It Is {/* #what-it-is */}

The glossary is the source of standardized terminology for xAgent documentation. Start with familiar AI terms, then explain their meaning and boundaries in xAgent. Product-specific terms identify interfaces, configuration, or implementation details rather than replacing general concepts.

xAgent is an **agentic platform for ongoing work**. Agentic capabilities are the core; private deployment, multi-user access, and centralized configuration are deployment and administration extensions.

## Core AI Terms {/* #core-terms */}

| Term | Standard Meaning |
| --- | --- |
| Agent Harness | Runtime mechanisms around the model that organize tools, context, memory, progress recovery, collaboration, and human review; not a model, a prompt, or a certification standard |
| Agent | An entity that understands goals, plans, calls tools, and progresses work based on execution results |
| Agentic Loop | A cycle of model decisions, tool execution, result feedback, and further decisions; it does not guarantee task success |
| Tool Calling | Performing concrete operations through tool interfaces and using their results to inform the next step |
| Tool | A concrete capability an Agent can invoke, such as reading a file, querying data, or sending a message |
| Skill | A reusable task method, constraints, and tool-use guidance; not an individual tool or an automatic grant of tool permissions |
| Context Engineering | Organizing instructions, materials, history, and capability definitions for the current task; xAgent includes on-demand Skill and tool loading and context compaction |
| Context Compaction | Reducing session history while retaining goals, constraints, progress, and key results for continued execution; not long-term memory, infinite context, or lossless retention |
| Agent Memory / Long-term Memory | Experimental reuse of stable preferences, accepted decisions, and background across one user's sessions, checked against source evidence, time, and current facts; not storage of every conversation |
| Resumable Execution / Tasks | Continuing tasks after waiting or interruption using session state, recovery snapshots, and work artifacts; not a guarantee of exactly-once external actions |
| Agent Teams | Multiple agents organized through dedicated managers, member session trees, role reuse, manager delegation, owner guidance, and shared materials; the product's Virtual Teams, not multi-user account administration |
| Multi-agent Orchestration | Organization of agent roles, task delegation, and collaboration; xAgent executes through teams and sessions, while WorkGroup stores orchestration configuration. Publishing configuration is not task completion |
| Multi-agent Collaboration | Independent Agent sessions collaborating through explicit tasks, messages, and artifact references, including parent-child delegation; not shared full context or cross-user authorization |
| MCP (Model Context Protocol) | A protocol for connecting external tools and capabilities; usability still depends on connection state, configuration, and authorization |
| A2A Client (Agent2Agent Client) | User-scoped connections to remote Agents, remote task tracking, and result delivery; current client support does not mean xAgent exposes an A2A server |
| Human-in-the-loop (HITL) | Human input, review, and action approval within a task; approval coverage depends on the tools and policies involved |
| Observability | Inspecting execution through task status, messages, tool results, and artifacts; not a full automated evaluation platform |
| BM25 Retrieval | Term-relevance retrieval for memory and artifacts; it must not be described as vector retrieval or GraphRAG |

## Product and Technical Terms {/* #product-and-technical-terms */}

| Term | Standard Meaning |
| --- | --- |
| Task | A goal unit executed by an Agent |
| SubAgent | An Agent session that accepts a defined subtask, maintains its own context, and executes work independently |
| Session | A context for user-Agent interaction, task execution, and retained state |
| Workspace | The space for files, context, and intermediate artifacts used by an Agent during a Task |
| AgentPlugin | A plugin service connecting external systems, user Channels, and capability declarations; called Connector before `0.0.16.beta` |
| ProcessSandbox | The platform isolation boundary for untrusted processes, responsible for file mounts, environment, process trees, and resource limits |
| Runtime Assets | Execution dependencies independently installed and verified by xAgent, then provided read-only to ProcessSandbox |
| Execution Lease | The minimal file view, overlapping-write coordination, and file-change commit capability that WorkspaceFileService provides for one process execution |
| Trigger | A mechanism that turns a future time or external event into a Session Task |
| Virtual team | Product name for Agent Teams; Server 0.1.0 provides dedicated managers, member session trees, role reuse, manager delegation, owner guidance, shared materials, and whole-team archiving |
| WorkGroup | Implemented orchestration configuration for Agents and communication links, with drafts and published versions; Sessions execute the actual tasks |
| Work Record | Session-scoped topic records, revisions, and deltas used to inspect continuity and evidence |
| Model Profile ID | Stable reference to a model configuration; distinct from its display name or the Provider's model ID |
| Delivery Receipt | Evidence that a particular messaging stage was accepted; does not by itself prove the whole task completed |

## When to Use It {/* #when-to-use-it */}

User guides, technical references, and maintenance documentation should all follow this glossary. In user-facing pages, explain the work value first, introduce familiar terminology when needed, and then use it consistently without piling up acronyms. Preserve exact UI labels in operating instructions.

## Writing Rules {/* #writing-rules */}

When writing documentation:

- Start with what the user can accomplish, then explain the Agentic capability; do not replace product positioning with implementation names.
- Do not invent synonyms or stretch feature claims to fit popular terminology.
- Do not describe planned capabilities as implemented; identify experimental features, version differences, and applicable boundaries.
- Distinguish memory, context compaction, and information retrieval; distinguish successful calls, message delivery, and task completion.
- Update this page, its translation, and related concept pages when adding a term.
- Explain how to use a feature in user-facing pages; reserve internal boundaries for technical references.

## Related Documentation {/* #related-documentation */}

- [What Is xAgent](/docs/getting-started/what-is-xagent)
- [Discovering and Loading Tools and Skills on Demand](/docs/guides/ai-agent-dynamic-tool-discovery)
- [Long-Term Memory](/docs/user-guide/memory)
- [Long-running Tasks](/docs/user-guide/long-task)
- [Runtime and ProcessSandbox](/docs/architecture/runtime)
