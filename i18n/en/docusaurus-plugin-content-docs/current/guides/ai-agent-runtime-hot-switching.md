---
title: How AI Agents Switch Models, Skills, and Prompts During a Task
description: Learn how a task-oriented AI Agent adjusts later model calls, Skills, Tools, and prompts while preserving session history, plans, and files, including the real boundaries of runtime switching.
status: beta
updated: 2026-07-15
---

# How AI Agents Switch Models, Skills, and Prompts During a Task

The model, Skill, or prompt selected at the beginning of a long task may not remain ideal for every stage. Material collection benefits from speed and context capacity, complex analysis requires stronger reasoning, and final delivery may need a different writing method.

The traditional approach is to stop the task, create another session, upload materials again, and explain what has already been completed. This can lose plans, file references, and confirmed context.

xAgent lets users adjust the model, request policy, Agent Prompt, resident Skills, resident Tools, and selected secret names inside the same Agent Session. Later steps use the updated configuration without deleting the session or restarting the whole task.

## What Runtime Switching Means

Runtime switching preserves the session, history, plans, task state, and workspace outputs while changing how the session continues.

It does not rewrite a model request that has already been sent, and it does not replace a Tool halfway through execution. The new configuration applies to later model requests or execution steps.

## Why Different Stages Need Different Configurations

| Stage | Primary concerns |
| --- | --- |
| Material reading | Speed, context size, and stable file handling |
| Complex analysis | Reasoning quality, constraint following, and validation |
| Writing | Structure, language, tone, and audience |
| File generation | Output format and Tool/Skill coordination |
| External delivery | Connection state, approval, and target confirmation |

One model and one method do not always provide the best quality or cost across every stage.

## Switching Models During a Session

Users can select the model for later work in Agent Session advanced settings and adjust the session-level model policy.

After a switch, session history remains available, later requests use the updated model setting, context budgeting follows the new model configuration, and Tools, Skills, plans, and workspace files remain in the original session.

If a model request has already been sent, it still completes with the original model. A separately bound execution step also keeps its current model for consistency before the new setting affects later unbound calls.

Runtime model switching therefore means switching future calls without stopping the session, not changing the model halfway through one streaming response.

### When to Switch Models

- The current model cannot fit the required material in context.
- Initial organization is complete and stronger reasoning is needed.
- Analysis is finished and a writing-oriented model should prepare the report.
- Tool Calling is unstable with the current model.
- The current provider is temporarily unavailable.

Confirm that the new model supports required capabilities, especially Tool Calling, vision, and sufficient context length.

## Adjusting Skills

xAgent supports two Skill selection patterns:

- **Resident Skills:** selected in advanced settings as a persistent method baseline.
- **On-demand Skills:** discovered and loaded during execution, then unloaded when they no longer apply.

Advanced settings show only the resident Skills explicitly selected by the user. Skills that the Agent discovers and loads at runtime through core capabilities such as `skill_find` and `skill_load` remain runtime capabilities of the current session. They are not written back to advanced settings and do not appear as resident Skills.

When Skill selection or content changes, later context assembly reads the effective Skill content available to the current user. Cached content is rebuilt from the actual Skill content rather than retained indefinitely by name.

Users can add a research Skill during analysis, switch to a report Skill for delivery, or update a personal Skill and continue testing it in the same session.

Loading a Skill changes later method guidance. It does not grant Tool permission or execute actions described by the Skill.

## Adjusting the Agent Prompt

Users can edit the current Agent Prompt in advanced settings. For example:

```text
From now on, present evidence and uncertainty before conclusions. Write the final result for management and avoid implementation terminology.
```

After saving, xAgent updates the session prompt and refreshes the stable prompt prefix used by later requests. History does not need to be cleared and the server does not need to restart.

Some Sub Agents can also refine their prompt through a controlled runtime capability. This changes only the role prompt body for the current session and cannot modify Tools, Skills, secrets, or other security settings at the same time.

Prompt changes do not rewrite previous messages or regenerate existing outputs automatically. Ask the Agent to recheck or regenerate a result when needed.

## Tools and Secret Selection Can Also Change

Advanced settings also manage resident Tools and the secret names the current session may reference.

As with Skills, every Tool shown in advanced settings is a resident Tool explicitly selected by the user. Tools discovered and loaded on demand through core capabilities such as `tool_find` and `tool_load` apply only to the session runtime and do not automatically appear in advanced settings.

- A newly selected resident Tool can enter later request assembly when it is available.
- Removing a resident Tool does not reverse an external action that already completed.
- Tool execution still depends on MCP, Connector, runtime state, permission, and approval.
- Only secret names are selected; real values do not enter model context.

For stage-specific capabilities, dynamic Tool discovery avoids keeping every Tool resident.

## What Remains Available

Runtime tuning preserves session history, user supplements, plans, task state, workspace files, attachments, stable file references, completed Tool results, and Main/Sub Session relationships.

The new model or Skill can continue from these facts, but critical conclusions should still be validated rather than accepted only because they appeared earlier in history.

## A Staged Example

For an industry research report:

1. Use a fast model with a large context window to read materials.
2. Load a research Skill to organize sources and evidence.
3. Switch to a stronger reasoning model in the same session.
4. Refine the prompt to separate facts, inferences, and uncertainty.
5. Load a report-generation Skill and create an HTML report.
6. Validate it with existing workspace files without uploading them again.

The task remains in one session while each stage uses a better-suited model and method.

## A Safe Tuning Process

1. Preserve a reusable output or status summary before a major change.
2. Change one important variable at a time.
3. Write prompt changes as explicit rules that apply “from now on.”
4. Load only Skills that accurately match the current stage.
5. Test one verifiable step after switching models.
6. Recheck important conclusions because models may judge evidence differently.

## Runtime Switching Boundaries

- It does not replace a model request that has already been sent.
- It does not interrupt and rewrite an active Tool call.
- It does not modify previous messages or generated files.
- It does not bypass Tool permissions, workspace boundaries, or approvals.
- It does not train the model or turn a Skill into model parameters.
- Some configuration operations may be temporarily frozen during context compression.

Runtime switching preserves task continuity while allowing later steps to use a better configuration. It is not an unrestricted replacement mechanism for every action already in progress.

## Related Concepts

- [Agent Session](/docs/user-guide/agent-session)
- [How AI Agents Discover and Load Tools on Demand](/docs/guides/ai-agent-dynamic-tool-discovery)
- [Model Notes](/docs/deployment/model-requirements)
- [Skill Management](/docs/user-guide/skill)

## Next Steps

- [Tune Advanced Settings in Agent Session](/docs/user-guide/agent-session)
- [Create or Update a Skill](/docs/getting-started/create-skill)
- [Configure Models](/docs/user-guide/model-config)
