---
title: Changelog
description: Review important user-facing changes, binary release contents, and upgrade notes for each xAgent release.
image: /img/share/en/xagent-overview.png
status: stable
updated: 2026-08-01
schemaType: CollectionPage
---

# Changelog

This page records important installation, usage, and safety-governance changes in xAgent binary releases. xAgent remains in beta, and features, interfaces, and protocols may continue to change.

## `v0.0.6.beta` - 2026-08-01

[View installation instructions](/docs/getting-started/install)

### Files and Attachments

- Session attachments and Workspace files now use one receive flow. Files that fail format, size, or content parsing checks do not leave unusable records behind.
- Supported uploads include DOCX, text-extractable PDF, PPTX, XLSX, CSV, TSV, static HTML, Markdown, common text and source files, and PNG, JPEG, and WebP images.
- Server-side capabilities determine upload limits by file type and entry point, with clear errors before saving. The console no longer relies on fixed client-side limits or one universal maximum.
- Small text can be read directly. Large documents expose page, worksheet, slide, or section locations so a task can read only what it needs instead of filling the context at once.
- Word and HTML retain semantic structure where possible; PDFs, spreadsheets, and presentations retain page, worksheet, and slide locations.
- Fixed Workspace files that appeared to exist but could not be read, plus downloads with Chinese characters or spaces in their filenames.
- GIF, legacy Office files, encrypted documents, and scanned PDFs without a text layer are not supported for upload yet.

### Word Documents and Fonts

- Added a built-in Word template catalog and default template. `.docx` files can use built-in or user-provided templates while retaining template styles, headers, footers, and placeholders.
- Document creation completes the full content before creating the file, then validates delivery through DOCX-to-PDF and page rendering checks for pagination, fonts, spacing, tables, and clipping.
- Added shared font resources, initially including Noto Sans SC, Noto Serif SC, and Noto Sans Mono CJK SC. Administrators can add local fonts or register internal online fonts with integrity checks.

### Sub-sessions, Models, and Runtime

- New sub-sessions now initialize orchestration and capability selection automatically without an extra approval. The release also avoids duplicate capability loads, repeated delegated work, and duplicate result delivery.
- Improved model request-cache stability in ongoing sessions, configuration compatibility for OpenAI, Anthropic, and Gemini, and configuration change activation.
- Python dependencies are installed in a user-shared location while built-in runtime resources remain read-only. CLI output hides host and temporary paths and enables pipeline failure detection by default.

### Updates and Stability

- Supported managed installations can download, switch, and restart from the console after a new version is detected, with automatic rollback after a failed health check.
- Older OpenAI model configurations are adapted during upgrade, and one damaged or unrecognized legacy file no longer blocks startup.
- User-data formatting more completely removes triggers, sessions, attachments, Workspaces, and related runtime data. Accounts, model usage, and explicitly retained external connections are unaffected.

### Upgrade Notes

Back up the xAgent runtime directory, configuration, database, and Connector state before upgrading. Run the existing installer command to check for and install `v0.0.6.beta`; it preserves configuration and state and records the active and previous binary versions. See [Start Installation](/docs/getting-started/install).

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

When this release shipped, rerunning the installer checked for and installed `v0.0.5.beta`. For current upgrades, use the `v0.0.6.beta` [Upgrade Notes](#upgrade-notes).

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

`v0.0.4.beta` required a stopped service, backup, and manual binary replacement. The current installer provides automated installation, upgrades, and rollback after failed activation. See [Start Installation](/docs/getting-started/install).

## `v0.0.3.beta`

This earlier public beta improved Connector integration, added the Telegram Connector, expanded the user manual, and established the initial safety-governance workflow.

New deployments and upgrades should use the current installer and the `v0.0.6.beta` release catalog.
