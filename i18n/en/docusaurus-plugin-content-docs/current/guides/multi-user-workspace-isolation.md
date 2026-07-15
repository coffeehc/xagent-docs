---
title: How xAgent Isolates Workspaces with a Virtual File System
description: Learn how xAgent builds a virtual file system above server storage to control file visibility, reads, and writes by user, session, and system rules.
image: /img/share/en/xagent-security.png
status: beta
updated: 2026-07-14
---

# How xAgent Isolates Workspaces with a Virtual File System

When multiple people share one AI Agent service, creating a separate directory for each user is not sufficient isolation. The platform must also control what users and Agents can see, read, and write, and which internal files must remain inaccessible under all circumstances.

xAgent provides a built-in virtual file system above the server's underlying filesystem. The web UI, Agent Sessions, and file tools do not access server directories directly. They receive a filtered and authorized workspace view through this virtual filesystem.

## Why Workspace Isolation Matters

A chat application mainly handles messages. A task-oriented AI Agent also works with files over time. For example, users may:

- Upload contracts, spreadsheets, meeting notes, or source code.
- Generate Markdown, CSV, HTML, PDF, or image outputs.
- Save intermediate materials during a long-running task.
- Let tools read, modify, move, or delete task files.

If isolation relies only on physical directories, a file that exists may still be scanned, read, or modified by mistake. A virtual file system separates physical existence from whether the current user or session is allowed to see the file.

For example, a user's physical workspace may contain 1,000 files, while the web UI or a particular Agent Session sees only the subset exposed by the virtual filesystem. A file does not become accessible merely because its name or server path is known.

## How xAgent Applies Isolation

xAgent applies several layers of workspace rules rather than relying on one directory boundary:

1. **User scope:** Every file operation carries the current user identity and is resolved inside that user's workspace.
2. **Virtual visibility:** Workspace pages and file tools return only the business entries and files that are visible in the current context, not the physical directory tree.
3. **Session access:** Each Agent Session has its own readable and writable scope. A task can operate only inside the boundaries granted by the virtual filesystem.
4. **Hard-coded protection:** Internal indexes, runtime state, session metadata, and private system directories are protected in code. Requests to include hidden files or grant additional access cannot bypass these rules.

Physical file existence therefore does not directly determine visibility. Browsing, reading, writing, moving, deleting, uploading, and downloading must all pass path normalization, visibility filtering, and access checks in the virtual filesystem.

When a user browses or downloads a file through the web UI, the API reads the workspace of the currently authenticated user. Before opening a session directory, xAgent also verifies that the session belongs to that user.

As a result, two users can both upload a file named `report.xlsx` without creating one shared file. Each copy remains in its owner's workspace.

## Business Directory Categories

xAgent does not present a user's workspace as a server directory tree. Its virtual filesystem organizes files into task-oriented business entry points. The current categories are:

| Business directory | Primary purpose |
| --- | --- |
| Business Spaces | Stores formal business materials, reusable documents, and confirmed results that should remain available beyond one session. |
| Project Files | Keeps files that a user creates and maintains for a specific project, including source materials, working documents, and outputs. |
| Uploaded Files | Stores local materials uploaded from the Workspace Files page. Uploading makes a file available in the workspace, but the user still needs to tell the Agent how to process it. |
| Agent Sessions | Presents task outputs by session. When a user opens a session, the workspace primarily shows its formal results rather than every runtime file created during execution. |
| Personal Skills | Stores private Skill files created, imported, or continuously improved by the current user. Other users cannot see them in their own workspaces. |

These entry points are business categories in the virtual workspace. They do not mean that every physically stored file inside a category is readable. xAgent still evaluates the user identity, current entry point, session access scope, and hard-coded protection rules before displaying a file or allowing it to be read or written.

If a business directory has not been created or contains nothing that can be displayed, its entry may not appear on the Workspace Files page.

## How Sessions Limit File Operations

User isolation establishes whose data is being accessed. The virtual filesystem determines what is visible in the current entry point, and session access rules further define what the current task can read or modify.

During task execution, xAgent gives file tools explicit readable and writable scopes:

- File tools accept paths relative to the virtual workspace, not server absolute paths, URLs, or parent-directory traversal.
- Directory listings are virtual views and do not reveal every file that physically exists on the server.
- System-maintained directories, internal indexes, and session metadata are hard-hidden from Agents.
- A session can write only to explicitly allowed directories. Being inside the same user's physical workspace does not make every file writable.
- Additional authorization may expand access to ordinary business files, but it cannot unlock hard-hidden system paths.
- Deletion, external delivery, and other sensitive actions can still be controlled by approval policies.

The Agent therefore operates on an authorized virtual filesystem view, not the server filesystem itself.

## Uploaded Files and Session Attachments

Files uploaded from Workspace Files enter the current user's upload area and are registered as files owned by that user. If a file with the same name already exists, xAgent uses a distinct display path instead of overwriting the original.

Attachments uploaded in an Agent Session are bound to both the current user and the current session. xAgent verifies that relationship before allowing the file to be previewed, downloaded, or processed by a task. The visible file inside the session workspace is an access point for the task, while xAgent keeps a stable file record so a page path is not treated as the file's only identity.

## A Simple Example

Assume Alice and Bob share the same xAgent server:

1. Alice uploads `customer-list.xlsx` in her session and asks for a customer follow-up plan.
2. Bob uploads a different file with the same name and asks for sales statistics.
3. The files belong to different users and enter different session scopes.
4. Alice's Agent cannot browse Bob's file through workspace tools, and Bob cannot open Alice's session output.
5. Both tasks may generate `summary.md`, but each result remains under its own user and session scope.
6. Even if Alice's physical workspace contains additional system or unauthorized files, the current session sees only the subset exposed by the virtual filesystem.

## What Workspace Isolation Does Not Replace

Workspace isolation protects task files inside xAgent. It is not a complete enterprise data authorization system.

- **External system permissions:** When MCP services or connectors access a CRM, mailbox, database, or other system, the external account still determines which data can be read or changed.
- **Model data boundaries:** Data sent to an external model API remains subject to that provider's terms. Use a local model or self-managed model gateway when the data must remain fully private.
- **Deployment security:** Server accounts, disk encryption, backups, HTTPS, firewalls, and network controls remain the deployment owner's responsibility.
- **Business approvals:** File isolation cannot decide whether a deletion or external delivery is appropriate. Sensitive actions should also use approval policies.

## Deployment Checklist

1. Create an individual xAgent account for each person instead of sharing one account.
2. Protect authentication and file transfers with a reverse proxy and HTTPS.
3. Back up xAgent runtime data and test the recovery process.
4. Give MCP services, connectors, and external accounts only the permissions they need.
5. Use two test users to verify that same-name uploads, session outputs, previews, and downloads do not cross user boundaries.
6. Configure approval policies for file deletion, external delivery, and other sensitive actions.

## Related Concepts

- [Workspace Files](/docs/user-guide/workspace)
- [Agent Session](/docs/user-guide/agent-session)
- [AI Agent Approval and Safety Controls](/docs/guides/agent-approval-security)
- [MCP vs. Connectors](/docs/guides/mcp-vs-connector)

## Next Steps

- [Complete Your First Task](/docs/getting-started/first-task)
- [Configure Approval Policies](/docs/user-guide/approval-policy)
- [Self-host xAgent](/docs/guides/self-hosted-ai-agent)
