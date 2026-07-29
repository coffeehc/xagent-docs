---
title: Workspace Pages
description: Page-by-page guidance and UI examples for the xAgent Dashboard, Agent Sessions, Workspace Files, and Session List.
status: beta
updated: 2026-07-27
---

# Workspace Pages

Workspace contains the pages used most often. Dashboard, Agent Sessions, and Workspace Files are available to standard users. Session List requires advanced mode.

## Simple and Advanced Modes

xAgent uses two menu modes to balance ease of use and configurability. Simple mode keeps only the entries needed for daily work, so it is the recommended starting point for most users, especially people who are new to AI. With fewer menus, users can submit tasks directly without being distracted by settings they do not need.

Advanced mode adds orchestration and capability-management entries for users who need to find historical sessions, configure automation, manage Agents, Skills, Tools/MCP, or maintain personal approval policies. An administrator can enable advanced mode for each account. The mode changes menu visibility only; it does not change the permissions already assigned to the account.

| Mode | Menu difference | Recommendation |
| --- | --- | --- |
| Simple | Dashboard, Agent sessions, Workspace files, Approvals, My connections, Secrets, Account management | Default mode for starting work directly |
| Advanced | Everything in Simple, plus Session list, Triggers, Agents, Skills, My tools, My MCP, and Personal approval policy | Enable when more management or orchestration is needed |

### Simple mode

![xAgent English simple mode menu showing the entries needed for daily work](/img/manual/v005/en/mode-simple.webp)

### Advanced mode

![xAgent English advanced mode menu showing the full orchestration and capability-management entries](/img/manual/v005/en/mode-advanced.webp)

## Dashboard

**Menu:** Workspace > Dashboard

**Visibility:** All users

![xAgent Dashboard showing token usage, model calls, tool calls, and session state](/img/home/v005/xagent-dashboard-en.webp)

- Review input, cached, output, and total tokens together with model and tool call counts.
- Switch between today, week, month, year, or a custom date range.
- Use the charts to compare usage and call trends.
- Open a session from the session panel and check execution or approval blocking.

## Agent Sessions

**Menu:** Workspace > Agent Sessions

**Visibility:** All users

![xAgent Agent Sessions showing the session list, timeline, context state, and composer](/img/home/v005/xagent-task-session-en.webp)

- Manage recent sessions and create new ones from the left panel.
- Read messages, tool calls, approvals, files, and task results in the timeline.
- Check context, token state, tool-call visibility, and advanced settings at the top.
- Add text, files, or voice input and refine a task while it runs.

See [Agent Session](/docs/user-guide/agent-session) and [Shortcut Instructions](/docs/user-guide/shortcut-instructions) for complete workflows.

## Workspace Files

**Menu:** Workspace > Workspace Files

**Visibility:** All users

![xAgent Workspace Files showing business spaces, shared materials, uploads, and session files](/img/manual/v005/en/workspace-files.webp)

- Browse business-space, work-group, uploaded, and Agent Session files.
- Select a file to preview text, images, PDF, spreadsheets, or HTML output.
- Upload, refresh, download, or copy a readable workspace path.
- This view contains authorized workspace projections, not arbitrary host directories.

See [Workspace Files](/docs/user-guide/workspace) for details.

## Session List

**Menu:** Workspace > Session List

**Visibility:** Advanced-mode users

![xAgent Session List showing state, type, update time, target, and actions](/img/manual/v005/en/session-list.webp)

- Search by session name or target type.
- Compare state, main or child type, update time, and target summary.
- Open a session or remove an obsolete child session when permitted.
- Use this page for management; the execution timeline remains in Agent Sessions.
