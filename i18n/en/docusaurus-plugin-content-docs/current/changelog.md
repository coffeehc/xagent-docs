---
title: Changelog
description: Review important user-facing changes, binary release contents, and upgrade notes for each xAgent release.
image: /img/share/en/xagent-overview.png
status: stable
updated: 2026-07-27
---

# Changelog

This page records important installation, usage, and safety-governance changes in xAgent binary releases. xAgent remains in beta, and features, interfaces, and protocols may continue to change.

## `v0.0.5.beta` - 2026-07-27

[View installation instructions](/docs/getting-started/install)

This release upgrades the console experience, real-time Connector interaction, task-process isolation, and automated installation. The server, Runtime Assets, and three IM Connectors now use one version catalog.

### Console and Session Experience

- Unified console branding, typography density, page hierarchy, status presentation, and responsive layouts.
- Resource lists now use shared searchable and paginated data tables. Details and editing use drawers or dialogs to preserve list context.
- The sidebar is reorganized around Workspace, Operations, Personal Settings, Analytics, Agent Governance, and System Configuration.
- Administrators can enable advanced mode per user. Simple mode keeps high-frequency session, file, approval, connection, and account entries; advanced mode also exposes triggers, Agents, Skills, Tools, MCP, and session diagnostics.
- Agent Session reorganizes the timeline, attachments, tool calls, runtime state, session files, and advanced settings, with stronger narrow-screen and mobile layouts.

### Connectors and Browser Connections

- Connector source, public protocol, and architecture documents are consolidated under `connectors/` and `docs/architecture/connector/` in the xAgent repository.
- The common protocol is now `3.0`. WeChat, Telegram, and Feishu use `xagent.im.v2` for bidirectional final messages, streaming deltas, acknowledgements, activity state, and file references.
- Images, audio, video, and regular files use a separate transfer path instead of putting file bytes or Base64 in the message WebSocket.
- One or two consecutive health failures are shown as degraded; the third failure marks the Connector offline. A successful probe can restore it to online.
- WeChat Connector adds recipient-scoped credential renewal and expiration reminders and stops invalid sends after expiration.
- Browser extensions connect through the built-in Browser Connector for governed browser messaging, page context, and tool calls.
- Current independent Connector versions are WeChat `0.0.8`, Telegram `0.0.9`, and Feishu `0.0.8`.

### ProcessSandbox and Runtime Environment

- A unified `ProcessSandbox` now starts and reaps every untrusted command without inheriting undeclared host environment variables.
- Linux uses `bubblewrap + cgroup v2 + seccomp`; macOS uses `sandbox-exec` with a private file view per execution.
- Each execution mounts only explicit read-only files, writable roots, inputs, outputs, Runtime Assets, and scratch space, with limits for timeout, processes, memory, CPU, and captured output.
- Workspace execution leases serialize overlapping writable roots, scan real file changes, and commit workspace facts. Failed commits can be recovered later.
- Python, Node.js, and other Runtime Assets are installed independently and mounted read-only. User tasks no longer fall back to an unrestricted host runtime.

### Automated Installation, Upgrades, and Rollback

- Linux and macOS use one stable installer:

  ```bash
  curl -fsSL https://downloads.xagent.xiagaogao.com/scripts/install.sh | bash
  ```

- The installer detects the OS and CPU architecture, reads `versions.json`, verifies the platform package and every internal module with SHA256, and removes temporary files on exit.
- It upgrades an older installation but never automatically downgrades a newer local build.
- Server and Connector binaries remain versioned behind stable symlinks. A failed Linux activation restores the previous working target.
- Linux runs `xagent setup`, generates or updates the systemd service, and starts it. macOS uses user-level installation paths.
- Interactive setup first asks whether to install any Connector, then asks about WeChat, Telegram, and Feishu individually. Unattended installs can use `--connectors` or `--no-connectors`.

### Upgrade Notes

Back up the xAgent runtime directory, configuration, database, and Connector state before upgrading. Run the installer again to check for and install `v0.0.5.beta`; it preserves configuration and state and records the active and previous binary versions. See [Start Installation](/docs/getting-started/install).

## `v0.0.4.beta` - 2026-07-15

[Install a specific version with the installer](/docs/getting-started/install)

This release unifies session targeting, object references, and approval replies. Users can now handle the same approval from the Web or an available IM Connector.

### Shortcut Instructions and Unified References

- `/command` runs a deterministic session command explicitly supported by the system.
- `@{session:id}` directs a message or command to a specific session.
- `#{type:id}` only references an object. It does not reroute a message or implicitly read, delete, approve, or execute anything.
- `@{approval:id} approve/reject` submits a decision to a specific approval. Chinese environments accept `同意/不同意`.
- Web, IM Connectors, and Agent Sessions use the same target and reference semantics.

See the [Shortcut Instruction Protocol](/docs/guides/shortcut-instruction-protocol) for usage details.

### Web and IM Approval

- Every new suspended confirmation creates an approval with a stable ID.
- When a session waits for approval, xAgent attempts to notify every available IM messaging channel owned by that user.
- Notifications include the target session, approval content, risk information, and a complete reply command.
- Users can decide from the Web, WeChat, or Telegram, and the approval ID routes the reply to the correct session.
- The first valid decision takes effect. Later decisions for the same approval cannot change its state again.

### Connector Management and Connector `v0.0.4`

- User connections now follow the connection mode declared by each Connector Card, reducing duplicate or invalid connections.
- Connector Management shows software version and authentication method details.
- My Connections adds connection deletion, invalid-state handling, and clearer unavailable states.

- Connector Release `v0.0.4` adds Feishu Connector alongside WeChat and Telegram.
- The release provides 12 Linux/Darwin, AMD64/ARM64 binary archives and a `SHA256SUMS` verification file.
- Feishu Connector supports mainland China Feishu direct messages and group @mentions. Lark is not yet supported. See the [Connector user guide](/docs/user-guide/connector) for connection and authorization.
- At that time, all three Connectors shipped in one `v0.0.4` release. Current Connectors use independent versions and download roots.

### Stability Fixes

- Fixed duplicate progression caused by concurrent approval recovery, session runtime synchronization, and timer scheduling.
- Fixed internal errors for invalid approval IDs and empty Agent runs caused by target-only messages.
- Fixed inconsistent IM approval notifications, reply routing, and duplicate decisions from multiple entry points.
- Timer triggers no longer keep appending duplicate task prompts while a session waits for approval.

### Release Assets

The Release contains only:

- `SHA256SUMS`
- Linux AMD64 binary archive
- Linux ARM64 binary archive
- macOS AMD64 binary archive
- macOS ARM64 binary archive

Each archive contains only the xAgent executable, README, and version metadata. Source code is not included.

### Upgrade Method at the Time

`v0.0.4.beta` required a stopped service, backup, and manual binary replacement. The current `v0.0.5.beta` installer provides automated installation, upgrades, and rollback after failed activation. See [Start Installation](/docs/getting-started/install).

## `v0.0.3.beta`

This earlier public beta improved Connector integration, added the Telegram Connector, expanded the user manual, and established the initial safety-governance workflow.

New deployments and upgrades should use the current installer and the `v0.0.5.beta` release catalog.
