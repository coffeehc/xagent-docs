---
title: Agent
status: stable
updated: 2026-07-06
unlisted: true
---

# Agent

## Who This Is For

This page is for users who need to select or configure an Agent, or understand how an Agent behaves.

## What It Is

An Agent is the work entity that executes Tasks in a Session. It decides what to do next based on the current Session context, visible Tools, Skills, Memory, model configuration, and user instructions.

For team deployments, an administrator typically configures general-purpose or specialized Agents before regular users select them. Create or adjust an Agent only after a workflow is stable and the role will be reused.

## Primary Agents and SubAgents

From a user's perspective, xAgent has two types of Agent: primary Agents and SubAgents.

The primary Agent is the main assistant a user interacts with in an Agent Session. It understands the user's goal, maintains the direction of the Session, coordinates Tools and Skills, decides when approval is required, and delivers the final result.

A SubAgent is a temporary worker created by the primary Agent for a bounded part of a complex task. It might read a collection of materials, verify one category of data, organize a section, or perform an independent check. Its result returns to the primary Agent, which evaluates, combines, and continues the work.

| Comparison | Primary Agent | SubAgent |
| --- | --- | --- |
| Audience | Interacts directly with the user | Handles a subtask assigned by the primary Agent |
| Scope | Owns the overall goal and final delivery | Owns a local goal and intermediate result |
| Usage | The user interacts with it in a Session | The system generally uses it automatically for complex tasks |
| Result ownership | Responsible for the final result | Returns a subtask result to the primary Agent |
| Typical work | Questions, file processing, report generation, and collaboration with external systems | Multi-source analysis, long-task decomposition, parallel review, and staged research |

A regular user can think of the primary Agent as the overall owner and a SubAgent as a temporary specialist. A SubAgent cannot bypass the current Session, Workspace, Tool permissions, or approval policy.

## When to Use It

Agent configuration matters when you need a persistent role, output convention, model choice, or combination of capabilities.

## Basic Usage

Recommendations:

- Start with the default Agent instead of creating a complex role immediately.
- Configure a dedicated Agent or expert Session when the role will be reused.
- Administrators can preconfigure common models, Tools, Skills, and safety policies for each Agent.
- Put long-lived responsibilities in the role description, not one-time task material.
- Match Tools, Skills, Secrets, and model configuration to the task type.
- To change models during execution, adjust the current Session model configuration instead of restarting the task.
- If output style is inconsistent, add explicit formatting requirements.

An Agent should not be treated as the owner of every fact. Current files, history, permissions, external authentication state, and long-term Memory each have their own boundaries.

## Related Documentation

- [Session](/docs/user-guide/session)
- [Tool Management](/docs/user-guide/tool)
- [Memory](/docs/user-guide/memory)
