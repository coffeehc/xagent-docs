---
title: How xAgent Isolates Multi-user Workspaces and Task Processes
description: Learn how xAgent combines virtual workspaces, Execution Leases, ProcessSandbox, and Runtime Assets to isolate files and process execution.
image: /img/share/en/xagent-security.png
status: beta
updated: 2026-07-27
---

# How xAgent Isolates Multi-user Workspaces and Task Processes

Separate user directories are not sufficient when multiple users share an AI Agent service. The platform must independently control file ownership, Session write scope, operating-system process mounts, and resource consumption.

`v0.0.5.beta` combines four boundaries:

1. User and Session authorization establish file ownership.
2. The virtual workspace determines what a page or Tool can see.
3. An Execution Lease creates the minimum file view for one process and coordinates commits.
4. ProcessSandbox executes the command with operating-system file, environment, process-tree, and resource limits.

## What Each Boundary Owns

| Layer | Responsibility | Not its responsibility |
| --- | --- | --- |
| User and Session authorization | File ownership and readable/writable roots | Starting operating-system processes |
| Virtual workspace | Business paths shown to pages and file Tools | Operating-system sandboxing |
| Execution Lease | Minimum file snapshot, overlapping-write coordination, and file-change commit | Platform process isolation |
| ProcessSandbox | File mounts, clean environment, process-tree cleanup, and resource limits | Business file ownership |

External-system authorization is separate. A Connector or MCP service can access only the CRM, mailbox, or messaging data permitted by its external account.

## User and Virtual Workspace Isolation

Every file operation carries the current user identity and resolves within that user's Workspace. Workspace pages and file Tools receive an authorized business view, not the server's physical directory tree.

Current business entries include:

| Business directory | Purpose |
| --- | --- |
| Business Spaces | Long-lived business material, reusable documents, and confirmed outputs |
| Project Files | Material, working documents, and outputs maintained for a project |
| Uploaded Files | Local material uploaded through the Workspace page |
| Agent Sessions | Formal task outputs organized by Session |
| Personal Skills | Private Skill files owned by the current user |

System indexes, internal state, Session metadata, and private system directories are protected in code. Requests to include hidden files or expand ordinary authorization cannot turn them into task files.

File Tools accept Workspace-relative paths rather than server absolute paths, URLs, or parent traversal. A Session can write only to explicitly authorized roots. Approval policies can still govern deletion, external delivery, and other sensitive operations.

## How an Execution Lease Protects Writes

Before an external process starts, WorkspaceFileService creates an Execution Lease:

- It derives the minimum read-only, writable, and immutable projections from the current user and Session permissions.
- It creates an exclusive scratch directory and a pre-execution snapshot.
- Overlapping writable roots for the same user are serialized so two processes cannot overwrite the same files concurrently. Disjoint roots and different users can still execute in parallel.
- After the process exits, writable roots are scanned safely and additions, changes, and deletions are committed as one fact batch.
- If commit fails, repair input is persisted so file facts can be recovered idempotently.

A host-file write therefore does not by itself complete a Workspace commit. The Execution Lease reconciles process changes back into xAgent's file facts and indexes.

## How ProcessSandbox Isolates Processes

ProcessSandbox is the common boundary for untrusted process execution. Each run uses an independent file view, process tree, scratch directory, and platform resources. Undeclared host environment variables are not inherited.

Only explicit mounts are accepted:

| Sandbox path | Purpose |
| --- | --- |
| `/workspace` | Authorized read-only or writable Session Workspace projections |
| `/input` | Exact inputs for system processing tasks |
| `/output` | Exact outputs for system processing tasks |
| `/runtime` | Read-only Runtime Assets and execution dependencies |
| `/tmp` | Scratch directory exclusive to this command |

The working directory must be under `/workspace`, `/input`, `/output`, or `/tmp`. Undeclared host paths and environment variables do not become accessible merely because a process knows their names.

ProcessSandbox also limits execution time, process count, memory, CPU, and retained stdout/stderr. Timeout or cancellation cleans up the complete process tree and platform resources.

### Linux

Linux uses `bubblewrap` for mount and namespace boundaries, cgroup v2 for process-tree resources, and seccomp to restrict system calls. If a required isolation component is unavailable, ProcessSandbox returns an unavailable error instead of falling back to unrestricted host execution.

### macOS

macOS uses a `sandbox-exec` profile and a private file view for each run. Allowed paths are projected to stable logical sandbox paths, while system-owned files remain inaccessible through explicit deny rules.

## Runtime Assets

Runtime Assets are xAgent-managed Python, Node, and helper-binary dependencies. They are installed and verified independently, do not live in a user's Workspace, and are mounted read-only at `/runtime` during execution.

If required Runtime Assets are missing or fail readiness checks, the corresponding Tool is unavailable. xAgent does not bypass that gate by using an interpreter or binary that happens to exist on the host.

Administrators can inspect ProcessSandbox and Runtime Assets readiness under **Agent governance > Execution environment**.

## Uploads and Session Attachments

Files uploaded from the Workspace page belong to the current user. A distinct display path is generated for a duplicate name instead of overwriting the existing file.

Agent Session attachments are bound to both user and Session. xAgent verifies ownership before preview, download, or task processing. The visible Session path is an access point, while xAgent keeps the stable file record.

## A Simple Example

Assume Alice and Bob share one xAgent server:

1. Each uploads a different file named `report.xlsx`.
2. The files enter separate user and Session scopes and cannot be browsed across users.
3. Alice's task receives only her authorized projection; ProcessSandbox cannot see Bob's directory.
4. If Alice starts two commands that modify the same output root, the second Execution Lease waits for the first commit.
5. Both tasks may create `summary.md`, while each output remains in its owner's Workspace facts.

## What These Boundaries Do Not Replace

- **External permissions:** Connector and MCP data scope still depends on the external account.
- **Model data boundaries:** Data sent to an external model API remains subject to that provider's terms.
- **Deployment security:** HTTPS, firewalls, disk encryption, backups, and server-account permissions remain deployment responsibilities.
- **Business approvals:** File and process isolation cannot decide whether deletion or external delivery is appropriate.

## Deployment Checks

1. Create an individual account for every user instead of sharing an xAgent account.
2. Confirm ProcessSandbox and Runtime Assets readiness under **Execution environment**.
3. Use two test users to verify that same-name uploads, Session outputs, previews, and downloads do not cross boundaries.
4. Configure approval policies for deletion, external delivery, and external writes.
5. Back up runtime data and test recovery regularly.

## Related Docs

- [Workspace Files](/docs/user-guide/workspace)
- [Agent Sessions](/docs/user-guide/agent-session)
- [Runtime Architecture](/docs/architecture/runtime)
- [Approval and Safety Controls](/docs/guides/agent-approval-security)

## Next Steps

- [Install and check Runtime Assets](/docs/getting-started/install)
- [Configure Approval Policies](/docs/user-guide/approval-policy)
- [Self-host xAgent](/docs/guides/self-hosted-ai-agent)
