---
title: Runtime and ProcessSandbox
status: beta
updated: 2026-07-27
unlisted: true
---

# Runtime and ProcessSandbox

## Who This Is For

This page is for developers and deployment administrators who need to understand local command execution, file projection, runtime dependencies, and ownership boundaries in xAgent.

## Current Implementation

`v0.0.5.beta` includes a local Runtime execution chain; it is no longer only a planned concept. Three owners collaborate on each command execution:

| Owner | Responsibility |
| --- | --- |
| WorkspaceFileService | Creates the Execution Lease, minimal file view, and pre-commit snapshot from user and Session authorization, then commits file changes |
| UserRuntime local provider | Assembles the resolved command, working directory, environment, and Runtime Assets into an execution plan |
| ProcessSandbox | Validates the execution plan and uses the platform backend to start and clean up the untrusted process |

Runtime does not own Workspace permissions and must not pass absolute host paths directly to a command. ProcessSandbox does not reinterpret business authorization; it only consumes a mount plan that upstream owners have already validated.

## File View

The stable logical roots in ProcessSandbox are:

- `/workspace`: read-only and writable projections authorized by WorkspaceFileService.
- `/input`: exact inputs for a system task.
- `/output`: exact outputs for a system task.
- `/runtime`: read-only Runtime Assets.
- `/tmp`: scratch space dedicated to one execution.

Each mount must be a regular file or directory, and target paths must not overlap. System-owned nodes can be added as exclusions that override permissions inherited from a parent directory, preventing a broad directory projection from exposing internal indexes and state files.

## Execution Lease

A local Runtime must first request an Execution Lease from WorkspaceFileService. The lease:

1. Creates a minimal projection from the Session's readable and writable roots.
2. Coordinates locks for overlapping writable roots owned by the same user.
3. Records pre-execution file facts and creates dedicated scratch space.
4. Scans file changes after the process exits and commits them as one batch.
5. Persists repair input when a commit fails so recovery can be idempotent.

After ProcessSandbox returns, the local provider must commit the lease before releasing temporary resources and write locks. Successfully starting a process is not sufficient for the overall execution to be considered successful.

## Environment and Resources

The target process does not inherit the complete host environment. ProcessSandbox creates fixed `HOME`, `PATH`, and temporary-directory variables, along with `XAGENT_WORKSPACE`, `XAGENT_INPUT`, and `XAGENT_OUTPUT` according to the file view. Callers can append only non-reserved environment variables.

Default limits include:

- 60-second execution timeout.
- 128 processes.
- 512 MiB of memory.
- One CPU quota period.
- 1 MiB retained for each of stdout and stderr.

The caller can tighten or adjust limits in the execution plan. After a command exits, times out, or is canceled, the full process tree and all platform resources must be cleaned up before the result is returned.

## Platform Backends

### Linux

Linux uses `bubblewrap` for filesystem mounts and namespace boundaries, cgroup v2 for process-tree resources, and seccomp to restrict system calls. The platform check runs a real minimal sandbox command to verify both startup and cleanup.

### macOS

macOS creates a private file view for each execution and uses a `sandbox-exec` profile to restrict file access. Stable logical paths are mapped to host paths inside the private view, while explicit deny rules protect system-owned files.

If the required isolation capability is missing, ProcessSandbox returns an unavailable error. It never falls back to uncontrolled execution on the host.

## Runtime Assets

RuntimeAssetService independently downloads, verifies, installs, and activates Runtime Assets, including xAgent-managed Python, Node, and helper binaries. A ready version is mounted read-only at `/runtime`.

Tool readiness is based on installed Runtime Assets and probes run inside the sandbox. An interpreter that happens to exist on the host is not used as a fallback. See [Start Installing xAgent](/docs/getting-started/install) for the installation flow.

## Concurrency Semantics

ProcessSandbox Service supports concurrent calls. Each call uses an independent file view, process tree, and set of platform resources. Only overlapping writable Workspace roots owned by the same user must be serialized; the Execution Lease owner enforces that constraint. Non-overlapping roots can execute concurrently.

## Related Documentation

- [Multi-user Workspace and Task Process Isolation](/docs/guides/multi-user-workspace-isolation)
- [Start Installing xAgent](/docs/getting-started/install)
- [RuntimeConnection](/docs/developer-guide/runtime-connection)
- [Tool](/docs/user-guide/tool)
