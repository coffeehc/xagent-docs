---
title: How AI Agents Discover and Load Tools on Demand
description: Learn why AI Agents should not load every capability at startup and how summary discovery, candidate selection, and on-demand loading reduce context use and improve execution accuracy.
status: beta
updated: 2026-07-15
---

# How AI Agents Discover and Load Tools on Demand

An AI Agent may connect to dozens or hundreds of tools and a large library of task-specific Skills. Loading every tool description, parameter schema, Skill body, and reference file at the beginning of every session increases cost and makes it harder for the model to select the capability that actually fits the task.

A better approach is to keep a small set of baseline capabilities and let the session discover, evaluate, and load additional Tools or Skills only when they are needed.

## Why Loading Everything at Startup Does Not Scale

### It Consumes Context

Every tool usually includes a name, purpose, parameters, return schema, and usage constraints. A Skill may include a full workflow, examples, templates, and references. Loading all of this content leaves less context for user materials, task history, and result validation.

### It Increases Selection Noise

The more capabilities a model sees, the easier it is to choose the wrong tool among similar options. Unrelated Skills can also steer the task toward an inappropriate method.

### It Expands the Maintenance Surface

Tools, MCP services, connectors, and Skills change over time. If every session carries every capability, adding or removing one capability affects a larger prompt and a wider test surface.

### Visibility Is Not Permission

Knowing that a tool exists does not mean that the current user has completed authorization, the external service is online, a key is available, or the action has passed approval. Capability descriptions and executable state must remain separate.

## Tools and Skills Serve Different Roles

| Type | What it provides | Examples |
| --- | --- | --- |
| Tool | Performs a concrete operation | Read a file, query a database, send a message, call a web API |
| Skill | Provides a method for completing a class of tasks | Contract review, market research, meeting recap, report generation |

A Skill can guide the Agent in selecting and combining Tools, but it does not grant Tool permissions or perform an action merely because it has been loaded.

## The On-demand Discovery and Loading Flow

### 1. Identify the Missing Capability

The Agent first determines whether the next step needs inspection, search, retrieval, transformation, analysis, writing, execution, validation, or external delivery. If a currently visible tool already satisfies the need, the Agent should use it instead of repeating discovery.

### 2. Search Capability Summaries

When the current capability set is insufficient, the platform searches Tool or Skill summaries using the task intent and keywords. Discovery only needs names, purposes, and short descriptions. It does not need to inject every parameter schema, Skill body, or attached resource immediately.

### 3. Treat Results as Candidates

Discovery results are candidates. They are not yet callable Tools and are not proof that a Skill fits the task. The Agent should check whether each candidate precisely matches the current step.

If no candidate fits, the Agent should not load a marginal capability merely to continue. It can change the approach, narrow the task, ask for additional material, or report the missing capability.

### 4. Load Only Accurate Matches

The Agent loads only Tools or Skills that have been confirmed as relevant. When several related capabilities are required, they can be loaded together instead of repeating the same search many times.

Loading means selecting the capability for later session assembly. It does not execute a tool, install software, or call an external service.

### 5. Confirm Availability in a Later Step

After loading, the Agent still needs to verify that:

- The Tool appears in the current callable capability list.
- Its parameter schema matches the task input.
- The MCP service or connector is online and authorized for the user.
- Required keys, file permissions, and external account permissions are available.
- Sensitive actions have the required approval.
- The Skill appears in the session and its main method is visible.

### 6. Execute and Validate

Only after the capability becomes available should the Agent call the Tool or follow the Skill method. A successful Tool response is not automatically proof that the task goal is complete. Outputs, external state, generated files, or other verifiable results still need to be checked.

### 7. Remove Capabilities That No Longer Fit

When the task goal, material type, or deliverable changes materially, the Agent should reassess whether the current Skill still applies. A no-longer-relevant Skill can be unloaded or ignored so that an old method does not keep influencing the next stage.

## How xAgent Implements Dynamic Capabilities

xAgent sessions retain a baseline capability set that includes Tool and Skill discovery and loading. Common file, network, planning, task, and session collaboration capabilities are also included according to the session type and current runtime state.

When the Agent lacks a required tool or method, it can follow this sequence:

1. Use `tools_find` or `skills_find` to search capability summaries available to the current user.
2. Evaluate whether the returned candidates accurately match the current step.
3. Pass exact candidate IDs to `tools_load` or `skills_load`.
4. Let a later model request assemble the new Tool schema or Skill content.
5. Continue only after the capability is actually visible.

Discovery does not return every Tool schema, full Skill body, or resource file. Templates, examples, and detailed references attached to a Skill are also read separately only when the task needs them.

After a candidate has been loaded successfully, the earlier discovery result can leave future context assembly, preventing one-time search data from occupying the session indefinitely.

## How MCP and Connector Capabilities Participate

Tools may come from built-in capabilities, personal MCP services, administrator-configured MCP services, or authorized connectors.

Whether a capability can be discovered and used by the current user depends on actual configuration, user authorization, connection state, tool state, and administrator policies. Dynamic discovery does not bypass these conditions. It searches within the capability scope that is currently available to the user.

A previously available tool may become unavailable when a connection state changes. The Agent must therefore rely on the current turn's callable tools and returned execution state before acting.

## A Practical Example

The user asks:

```text
Analyze the quarterly sales spreadsheet in my workspace, generate an HTML report with charts, and send a summary to my connected IM account.
```

The Agent can handle this in stages:

1. Check whether spreadsheet reading and report generation capabilities are currently available.
2. If spreadsheet analysis is missing, discover and load an exact matching Tool.
3. Discover a data-analysis or HTML-report Skill and load only a candidate that matches the required deliverable.
4. Read the spreadsheet, generate the report, and verify that the file exists and is complete.
5. Check whether the user's connector is online, whether the send Tool is available, and whether approval is required.
6. Send the summary after approval and confirm delivery from the Tool result.

The session does not need to load every spreadsheet, report, MCP, and connector capability before the task begins.

## What Dynamic Loading Does Not Mean

- It does not grant external system permissions.
- It does not bypass approval policies.
- It does not prove that a candidate Tool is online or ready.
- It does not let a Skill replace a Tool operation.
- It does not mean the task is complete after loading succeeds.
- It does not justify loading every search result.

Dynamic capability loading helps an Agent obtain the right capability when needed while keeping context smaller and execution boundaries explicit.

## Related Concepts

- [Tool Management](/docs/user-guide/tool)
- [Skill Management](/docs/user-guide/skill)
- [MCP vs. Connectors](/docs/guides/mcp-vs-connector)
- [AI Agent Approval and Safety Controls](/docs/guides/agent-approval-security)

## Next Steps

- [Submit a Task in Agent Session](/docs/user-guide/agent-session)
- [Create or Update a Skill](/docs/getting-started/create-skill)
- [Review Tools and Approval Scope](/docs/user-guide/tool)
