---
title: "Runtime and ProcessSandbox"
description: "Learn how xAgent isolates local commands, file projections, and execution dependencies with Execution Leases, ProcessSandbox, and Runtime Assets."
status: beta
updated: 2026-10-01
---

# Runtime and ProcessSandbox

## Who This Is For {/* #who-this-is-for */}

This page is for developers and deployment administrators who need to understand local command execution, file projection, runtime dependencies, and ownership boundaries in xAgent.

## Current Implementation {/* #current-implementation */}

`v0.0.6.beta` includes a local Runtime execution chain; it is no longer only a planned concept. Three owners collaborate on each command execution:

| Owner | Responsibility |
| --- | --- |
| WorkspaceFileService | Creates the Execution Lease, minimal file view, and pre-commit snapshot from user and Session authorization, then commits file changes |
| UserRuntime local provider | Assembles the resolved command, working directory, environment, and Runtime Assets into an execution plan |
| ProcessSandbox | Validates the execution plan and uses the platform backend to start and clean up the untrusted process |

Runtime does not own Workspace permissions and must not pass absolute host paths directly to a command. ProcessSandbox does not reinterpret business authorization; it only consumes a mount plan that upstream owners have already validated.

## File View {/* #file-view */}

The stable logical roots in ProcessSandbox are:

- `/workspace`: read-only and writable projections authorized by WorkspaceFileService.
- `/input`: exact inputs for a system task.
- `/output`: exact outputs for a system task.
- `/runtime`: read-only Runtime Assets.
- `/user-runtime`: user-private writable runtime dependency directories mounted by the execution plan. They may persist across executions but are not Workspace file facts.
- `/tmp`: scratch space dedicated to one execution.

Each mount must be a regular file or directory, and target paths must not be duplicated. System-owned nodes can be added as exclusions that override permissions inherited from a parent directory, preventing a broad directory projection from exposing internal indexes and state files.

## Execution Lease {/* #execution-lease */}

A local Runtime must first request an Execution Lease from WorkspaceFileService. The lease:

1. Creates a minimal projection from the Session's readable and writable roots.
2. Coordinates locks for overlapping writable roots owned by the same user.
3. Records pre-execution file facts and creates dedicated scratch space.
4. Scans file changes after the process exits and commits them as one batch.
5. Persists repair input when a commit fails so recovery can be idempotent.

After ProcessSandbox returns, the local provider must commit the lease before releasing temporary resources and write locks. Successfully starting a process is not sufficient for the overall execution to be considered successful.

## Environment and Resources {/* #environment-and-resources */}

The target process does not inherit the complete host environment. ProcessSandbox creates fixed `HOME`, `PATH`, and temporary-directory variables, along with `XAGENT_WORKSPACE`, `XAGENT_INPUT`, and `XAGENT_OUTPUT` according to the file view. Callers can append only non-reserved environment variables.

Default limits include:

- 60-second execution timeout.
- 128 processes.
- 512 MiB of memory.
- 100,000 microseconds of CPU time per 100,000-microsecond period, equivalent to one CPU of quota.
- 1 MiB retained for each of stdout and stderr.

The caller can tighten or adjust limits in the execution plan. After a command exits, times out, or is canceled, the full process tree and all platform resources must be cleaned up before the result is returned.

These are ProcessSandbox defaults when a request does not supply the corresponding value. They are not fixed settings for every Tool or a 60-second limit on a whole long-running task. A long task can contain multiple independent commands, each with its own timeout, resources, and retained-output limit. Check truncation flags; truncated stdout/stderr is not a complete log.

`/user-runtime`, exact defaults, and execution-plan boundaries were checked against main commit `43d2698` on 2026-10-01. The reference to `v0.0.6.beta` records when the local execution chain was introduced, not when every later capability became available.

## Platform Backends {/* #platform-backends */}

### Linux {/* #linux */}

Linux uses `bubblewrap` for filesystem mounts and namespace boundaries, cgroup v2 for process-tree resources, and seccomp to restrict system calls. The platform check runs a real minimal sandbox command to verify both startup and cleanup.

### macOS {/* #macos */}

macOS creates a private file view for each execution and uses a `sandbox-exec` profile to restrict file access. Stable logical paths are mapped to host paths inside the private view, while explicit deny rules protect system-owned files.

Linux enforces CPU, memory, and process-count limits through cgroup v2. The current macOS backend provides the private file view, sandbox-exec restrictions, and process cleanup, without an equivalent cgroup resource-limit implementation. The request defaults above are not identical hard-resource guarantees on both platforms. The shared execution layer still handles timeouts and output truncation.

If the required isolation capability is missing, ProcessSandbox returns an unavailable error. It never falls back to uncontrolled execution on the host.

## Runtime Assets {/* #runtime-assets */}

RuntimeAssetService independently downloads, verifies, installs, and activates Runtime Assets, including xAgent-managed Python, Node, and helper binaries. A ready version is mounted read-only at `/runtime`.

Tool readiness is based on installed Runtime Assets and probes run inside the sandbox. An interpreter that happens to exist on the host is not used as a fallback. See [Start Installing xAgent](/docs/getting-started/install) for the installation flow.

## Concurrency Semantics {/* #concurrency-semantics */}

ProcessSandbox Service supports concurrent calls. Each call uses an independent file view, process tree, and set of platform resources. Only overlapping writable Workspace roots owned by the same user must be serialized; the Execution Lease owner enforces that constraint. Non-overlapping roots can execute concurrently.

## Related Documentation {/* #related-documentation */}

- [Multi-user Workspace and Task Process Isolation](/docs/guides/multi-user-workspace-isolation)
- [Start Installing xAgent](/docs/getting-started/install)
- [Tool](/docs/user-guide/tool)
