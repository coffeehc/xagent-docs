---
title: "xAgent Model Configuration: Providers, Tool Calling, and Task Routing"
description: Learn about xAgent Provider integration, tool-calling capabilities, connection testing, hot switching, and the future direction of unified task routing.
status: stable
updated: 2026-07-15
---

# xAgent Model Configuration: Providers, Tool Calling, and Task Routing

## Who This Is For

This page is for administrators and maintainers. Ordinary users do not usually need to open Model Configuration.

## What It Is

Model Configuration maintains the models xAgent can use. Administrators configure the display name, service address, key, capability switches, and default policy here. Once configured, ordinary users can use the models in a session without filling in these details themselves.

The model configuration page is open in the current release to make deployment, testing, and evaluation easier. It is a transitional entry point, not the final long-term model experience.

As the built-in Agent “brain” capability matures, model selection will gradually move to unified model management. xAgent will not be limited to one model or one provider. Different models have different strengths: fast summaries, complex reasoning, tool collaboration, image understanding, or file understanding.

xAgent will keep optimizing model routing through ongoing testing and real usage. It will consider task type, cost, speed, Tool collaboration requirements, and context when choosing a better model combination for the current task. Ordinary users do not need to choose a specific model; they only need to state the task goal.

![xAgent Model Configuration page showing the model list, Provider, connection details, and capability options](/img/manual/xagent-model-config.png)

## When to Use It

Open this page when you need to:

- Add an available model after initial deployment.
- Change a model service address, key, or actual model name.
- Test whether a model can connect.
- Adjust whether a model supports images, files, Tool calling, or streaming output.
- Prepare different models for different task types.

## Reading the Page

The left side lists models; the right side edits the selected model. Common fields include:

| Field | Purpose |
| --- | --- |
| Model name | The name displayed in xAgent |
| Actual model name | The identifier used by the Provider |
| Provider type | The model service type |
| Base URL | The model service address |
| API Key | The model service key |
| Request timeout | The maximum wait time for one request |
| Description | A usage note for administrators |
| Model capabilities | Whether it supports chat, vision, audio, files, streaming output, and Tool calling |
| Default policy Raw JSON | Advanced default policy settings |
| HTTP Headers | Additional request headers |

Ordinary users do not need to understand these fields. Administrators only need to ensure that the model connects, its capability switches are accurate, and its description is clear.

## Basic Usage

### Add a Model

1. Select **New Model**.
2. Enter the display name.
3. Enter the actual model name.
4. Select the Provider type.
5. Enter the Base URL and API Key.
6. Select the capabilities the model actually supports.
7. Select **Test Connection**.
8. Save the model after the test succeeds.

Name models by their use case, such as “General Writing Model,” “Code and Tool Model,” or “Lightweight Fast Model.” Avoid internal abbreviations that ordinary users cannot understand.

### Test the Connection

Test before saving. If it fails, check:

- Whether the Base URL is correct.
- Whether the API Key is valid.
- Whether the actual model name exists.
- Whether the Provider type is correct.
- Whether the current server can reach the model service.
- Whether the request timeout is too short.

### Configure Capability Switches

Configure switches according to the model's real capabilities. Do not enable every capability just to make a model look stronger.

| Capability | Effect |
| --- | --- |
| Chat | Whether it can be used for regular conversation and tasks |
| Vision | Whether it can process image input |
| Audio | Whether it can process audio input or output |
| Files | Whether it can process file input |
| Streaming | Whether output can appear while it is being generated |
| Tool calling | Whether it can work with Tools to perform actions |

A model without Tool calling is not appropriate for tasks that need file reading, external system calls, or concrete actions.

## Administration Recommendations

- The current configuration page is a transitional capability for deployment validation and model integration. Do not treat it as the final model-governance interface.
- Prepare at least one stable general-purpose model for ordinary tasks.
- Prepare a Tool-calling model for tasks that need Tools.
- Prepare a lightweight model for cost-sensitive tasks.
- Do not bind system capability to one Provider. Different models suit different tasks, and model routing will continue to improve based on test results.
- Write model descriptions for administrators and users, not only with Provider-internal details.
- Never expose an API Key in screenshots, documentation, chat messages, or commit history.
- Before changing a public model, confirm whether it will affect active sessions.

## Common Questions

### Do ordinary users need to configure models themselves?

Usually not. Once an administrator configures them, ordinary users can use them directly in a session.

When unified model management and task routing mature, ordinary users will notice model selection even less and will only need to state their task goal.

### Does a successful connection test mean every task will work?

No. It only confirms that the model service is available. Successful task completion also depends on capability switches, Tools, Skills, external connections, and approval policies.

### Why switch models in a session?

Different models suit different tasks. Some are better at fast summaries, some at complex reasoning, and some at Tool collaboration. Switching models does not mean restarting the entire session.

### Can screenshots include a Base URL and API Key?

They should not. Screenshots in public documentation or public channels should obscure internal addresses, keys, and accounts.

## Continue Reading

- [How AI Agents Switch Models, Skills, and Prompts During a Task](/docs/guides/ai-agent-runtime-hot-switching)
- [Agent Session](/docs/user-guide/agent-session)
- [Agent Management](/docs/user-guide/agent-management)
- [Tool Management](/docs/user-guide/tool)
- [Approval Policies](/docs/user-guide/approval-policy)

## Next Steps

- [Test a model and tool calling in Agent Session](/docs/user-guide/agent-session)
- [Configure Agent capabilities](/docs/user-guide/agent-management)
- [Validate the model with a real task](/docs/getting-started/first-task)
