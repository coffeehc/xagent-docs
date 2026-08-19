---
title: Changelog
description: Review important user-facing changes, binary release contents, and upgrade notes for each xAgent release.
image: /img/share/en/xagent-overview.png
status: stable
updated: 2026-08-19
schemaType: CollectionPage
---

# Changelog

This page records important installation, usage, and safety-governance changes in xAgent binary releases. xAgent remains in beta, and features, interfaces, and protocols may continue to change.

## `v0.0.11.beta` - 2026-08-19

[View installation instructions](/docs/getting-started/install) · [View the Connector guide](/docs/user-guide/connector)

This release upgrades the Connector runtime, introduces the Database and SSH Connector Servers, and unifies Connector Skills, file capabilities, authentication, and multi-resource routing under shared protocol boundaries. It also adds image generation, ephemeral Session working state, stable Skill identities, and streamlined model and Connector administration.

### Connector Protocol and Runtime

- Connector Protocol is now `4.3`. xAgent remains compatible with `3.0`, `4.0`, `4.1`, and `4.2` Connectors and negotiates the actual data-plane version during the handshake.
- `target_type` has been removed. xAgent accepts Connectors through the Card, Profile, Tool, authentication-flow, and Channel contracts without a business-category allowlist.
- One user establishes one real Connector Channel to one Connector Server. Multi-resource mode routes business VChannels by `resource_key` on that Channel without exposing the internal `connector_channel_id` to the model.
- Tools declared by a Connector Card are registered as global runtimes. Model visibility depends on Card registration and runtime health, not user authentication or Connection Descriptor state.
- File transfer is separated from IM into the independent `xagent.file.v1` Profile.
- Connector Skills now support directories: `/skill.json` exposes a revisioned file manifest, and xAgent downloads and atomically replaces the local directory. Script files are ignored, while legacy `/skill.md` remains compatible.
- Connector and built-in Skills use stable English IDs with localized Skill Cards for Chinese and English presentation.

### Database Connector Server

- The first public Database Connector release supports administrator-defined MySQL and PostgreSQL resources with stable user-facing resource IDs.
- User authentication, database credentials, and native database authorization stay inside the Connector Server. xAgent stores only Channel ownership and routing facts.
- SQL tools enforce row, result-size, and timeout limits and expose actual execution errors.
- Configuration reloads dynamically and revalidates changed database resources without restarting the Connector.

### SSH Connector Server

- The first public SSH Connector release supports multiple administrator-defined targets. Models see only the `resource_key` and label, never the host address.
- Private keys are loaded by filename from the `keys` directory beside `config.yml`. A successful first connection records the host fingerprint, and later host-key changes are rejected.
- Users authenticate inside the Connector with a principal and access token for audit attribution. xAgent user IDs are never sent to the Connector Server.
- Bounded command execution and SSH/PTTY shell tools cover open, incremental read, write, resize, signal, close, and idle-session reclamation.
- Target changes trigger hash-based reprobes. Authentication and execution failures are logged with actionable context, while successful tool calls no longer occupy info logs.

### Image Generation and Model Configuration

- Added the native `image_generate` Tool using either the OpenAI Responses image tool or the Images API of the active model.
- Generated PNG, JPEG, and WebP results are validated, stored as immutable Session artifacts, and rendered directly in the conversation.
- `default_policy.image_generation` explicitly enables image generation and carries upstream defaults. Models without that policy do not expose the capability.
- Removed the non-decision-bearing `supports_streaming` capability field from model configuration and administration.

### Sessions, Skills, and Tools

- Added ephemeral Session working-state tools for structured long-running task state that follows Session cleanup.
- Built-in Skill IDs now use stable English identifiers while localized Skill Cards continue to provide user-facing names.
- Connector Session names show only the Connector name instead of appending dynamic connected-resource counts.
- Connector authentication forms follow Card-declared resources and fields. The SSH access-token flow also requires a principal for unambiguous auditing.

### Upgrade Notes

- Upgrade xAgent and Connector Servers separately. Current public versions are WeChat `0.0.10`, Telegram `0.0.11`, Feishu `0.0.10`, Database `0.0.3`, and SSH `0.0.4`.
- Database `0.0.3` and SSH `0.0.4` fix first-install startup with the empty resource lists generated by the installer. An unconfigured Connector stays online without declaring a login flow and activates resources through dynamic reload after configuration.
- When the version string is unchanged, the installer now also compares the platform binary digest. A republished build is offered as an update, with the previous binary preserved for rollback before replacement.
- Directory Skills and the file Profile are incremental Protocol 4.3 capabilities. Older Connectors remain usable through compatibility paths but do not gain these features.
- After installing SSH, create a `keys` directory beside the Connector configuration, add the private key, and configure targets, principals, and access tokens. Never commit real keys, tokens, or runtime fingerprints.
- Database and SSH target credentials remain in their Connector Servers. Back up Connector configuration, state directories, and SSH keys before upgrading.
- Before upgrading xAgent, back up its configuration, database, user workspaces, Memory, Skills, Tool packages, and Connector state.

## `v0.0.10.beta` - 2026-08-16

[View installation instructions](/docs/getting-started/install) · [Task understanding and tool selection](/insights/xagent-agent-harness-task-alignment) · [Agent Loop and context management](/insights/xagent-agent-harness-execution-loop)

This release improves task understanding, capability preparation, and cross-session collaboration so Agents can select Skills, Tools, and long-term memory around the active task and adjust the execution environment when the goal changes. It also adds platform capability self-awareness, project-oriented session navigation, context diagnostics, more reliable file delivery, localized Skill presentation, and local administrator recovery.

### Task Understanding, Capability Preparation, and Long-Term Memory

- Before processing a new message in a sub-session, xAgent evaluates its relationship to the current task goal and the overall session goal. Continuing goals keep the current environment, while changed goals trigger capability reconciliation.
- Capability retrieval derives separate search phrases for Skills, Tools, and Memory from the task objective, covering methods, actions, evidence, quality, domains, deliverables, and reusable knowledge topics.
- Skills, Tools, and ToolSets use a shared capability summary for candidate retrieval, followed by task-capability orchestration. Standalone Tools can enter the candidate set directly.
- xAgent now tells Agents about stable platform capability domains, including Skill and Tool discovery, long-term memory, managed secret references, external Connectors, and signals from external entry points or scheduled triggers. Runtime facts and permissions still determine what is available for each request.
- The session UI reports preparation stages such as understanding task meaning, extracting essentials, discovering capabilities, orchestrating the task, and applying the environment.
- Providing Tools no longer forces a Tool call. When Tools are available, the model decides whether the task needs one; when no Tools are available, Tool use is explicitly disabled.
- Short-request, planning, and capability-use guidance has been strengthened so the Agent checks whether a task is executable before acting, asking for missing information, or loading capabilities.

### Project Sessions and Cross-Session Collaboration

- The session sidebar groups regular sessions, projects, teams, and Connectors. Users can create projects and add separate sessions within a project.
- Sub-session creation uses an explicit session goal and first task message. Original attachments follow the assignment without turning routing wrappers into duplicate instructions.
- Collaboration requests between main and sub-sessions are persisted, and results return to the exact source session. Refreshes and service recovery no longer depend on an in-memory waiting relationship.
- A session can send a one-way message to another existing internal session using an exact session reference.
- When a plan step becomes too large during execution, the Agent can split it into consecutive checkpoints while preserving plan order and completed progress.
- Long-history loading, runtime-state recovery, and timeline rendering have been improved. Failures to load earlier messages now surface an explicit state.

### Skill Presentation and Context Management

- Skills can provide localized names, descriptions, and icons. Administration lists, detail views, and session capability pickers use the same Skill Card presentation.
- Advanced settings show the Skills and Tools actually loaded by the session and preserve unavailable-but-selected capability state for accurate runtime inspection.
- A read-only context-cache snapshot is available from the session toolbar. It reports History, System Prompt, loaded Skills, execution context, turn context, and long-term memory sizes and cache state, and its summary can be copied for diagnostics.
- Administration now exposes Task Relevance as a separate Agent role alongside Session, Task Capability Orchestration, Summary, and OCR roles.
- Skill summary generation and retrieval material now share a versioned boundary. Older derived summaries refresh when required instead of remaining out of sync with current capability descriptions.

### File Preview and Delivery

- Markdown files now have a rendered preview with Preview and Source modes. Tables, code blocks, lists, and line breaks follow the document structure.
- Spreadsheet preview supports switching worksheets within a file and uses an independent scrolling area for larger tables.
- Workspace files have a stable standalone download page with direct links, retry, and download-again actions. Paths containing special filename characters retain their original identity.
- Agent sessions, project files, shared files, business spaces, uploads, and team materials use localized names and descriptions in the Workspace browser.

### Preferences and Administrator Recovery

- Response language is now an explicit Chinese or English choice and stays aligned with the console language. Changing it updates both the interface and subsequent Agent responses.
- Reply detail and Direct Execution / Plan First workflow preferences remain centrally stored and apply consistently to new task turns.
- Formatting user data now also clears long-term memory, memory summaries, and background extraction state. The account, Skills, secrets, Connector and model configuration, and Token statistics are retained, and the confirmation dialog describes the expanded scope.
- A local administrator password-recovery command is available on the server. Passwords are accepted only through an interactive terminal, and all existing sign-in sessions for that administrator are revoked after a successful reset.

### Stability Improvements

- OpenAI and compatible Providers no longer execute truncated Tool arguments as an empty object when output limits interrupt the stream. The response is treated as output-limited and handed back to the runtime for recovery.
- Streaming and non-streaming Tool argument validation, finish reasons, and history replay are aligned, reducing repeated Tool calls after a model response has already ended.
- Tool Schemas preserve input property order while continuing to adapt to Provider-specific structural constraints, improving complex file-write and multi-parameter Tool calls.
- Session replies, Prompt assembly, file access, and storage compatibility now use one runtime path, removing older flows that could interpret or execute the same instruction twice.

### Upgrade Notes

- Storage changes for session collaboration are migrated automatically; no manual database migration is required.
- Formatting user data now includes long-term memory and background memory jobs. Review the updated confirmation scope before running it.
- If an administrator cannot sign in, stop the service and run `xagent admin reset-password --username <admin-name> --config <path-to-config.yml>` locally on the server.
- Before upgrading, back up the xAgent configuration, database, user workspaces, Memory, Skills, Tool packages, and Connector state.

## `v0.0.9.beta` - 2026-08-10

[View installation instructions](/docs/getting-started/install) · [Full release notes](/blog/xagent-0-0-9-beta)

This release separates the administration console from the user workspace, unifies the Web and desktop session layout, and makes per-session prompts directly editable and effective from the next model turn.

### Administration Console and User Workspace

- Added dedicated `/admin/login` and `/admin` entry points. Administration menus, authentication redirects, sign-out, release notices, and upgrades now remain inside the administration console.
- `/app` is always the user entry point. Administrators opening it receive the same personal sessions and workspace experience as regular users, without system-governance menus.
- The user workspace and administration console no longer link to each other, keeping personal work separate from organization administration.

### Session Workspace

- Web and desktop now share a two-column layout with the session sidebar on the left and the active conversation on the right.
- The main session is pinned above search, while sub-sessions remain ordered by recent activity.
- Conversation content scales with the available width and remains centered. Empty states, messages, and the composer now share one content axis.
- The toolbar no longer exposes the internal Session identifier. Advanced settings use an icon entry, and the sidebar account menu provides personal settings and sign-out.

### Session Prompts and Configuration

- The prompt editor remains available when a session has no existing prompt.
- The prompt section opens by default with a larger editing area. Long content scrolls inside the editor without hiding the actual configuration.
- A saved session prompt applies from the next model turn for main sessions, Connector sessions, and regular sub-sessions.
- Configuration drawers no longer close after an accidental backdrop click, reducing loss of unsaved changes. Read-only information drawers may still use backdrop dismissal.

### Usage Statistics and Stability

- The user dashboard is now Usage Statistics and shows only the current user's Token, model-call, and Tool-call data. The administration console retains organization-wide reporting.
- Model usage details are visible by default without another expand action.
- Fixed legacy Memory data being rewritten during reads or list queries, and consolidated database checks, schema creation, and migrations into the storage startup sequence.

### Upgrade Notes

Update administrator bookmarks and reverse-proxy rules from `/app/admin/...` to `/admin/...`; the administration login page is now `/admin/login`. `/app` opens the user session workspace, and personal usage statistics are available at `/app/dashboard`. Before upgrading, back up configuration, the database, user workspaces, Memory, Skills, Tool packages, and Connector state.

## `v0.0.8.beta` - 2026-08-09

[View installation instructions](/docs/getting-started/install) · [Full release notes](/blog/xagent-0-0-8-beta) · [Backup and restore guide](/blog/xagent-backup-and-disaster-recovery)

This release adds online incremental backup and disaster recovery, clarifies the boundary between formal local files and external cloud storage, and improves session file reuse, multilingual Skill governance, and local storage cleanup.

### Online Backup and Disaster Recovery

- Configure S3, an S3-compatible object store, or WebDAV as a backup repository, with connection testing and repository initialization before use.
- Run backups manually or on a schedule. Every completed snapshot is independently restorable, while only new or changed encrypted content is uploaded.
- Download, verify, and prepare the selected or latest snapshot online, then perform formal directory cutover after stopping xAgent.
- Validate and confirm a cutover, roll back after a failed validation, or resume an interrupted restore from its durable journal.
- Download a self-contained `recovery.yml` to list complete snapshots and prepare recovery even when the original database is unavailable.

### Cloud Storage and Public Files

- Mount S3, S3-compatible storage, and WebDAV into Public Files, with an independent prefix for each integration.
- Existing user and group ACLs continue to apply. Administrators can create directories and upload files; authorized users can browse, preview, and download.
- Static credentials are stored encrypted. TLS certificate verification can be skipped per integration for controlled internal storage using a self-signed certificate.
- An unavailable remote remains visible and is marked unavailable instead of appearing as an empty directory.

### Sessions, Skills, and Production Capabilities

- Attach visible Workspace, Public Files, and cloud-storage files directly from the message composer.
- Remote public files are processed into model-readable content on demand while originals remain in external storage. Failed imports leave no invalid attachment.
- Skill lists, search, and runtime capabilities are projected in the response language and use the canonical name from `SKILL.md`.
- Connector cards use the service-declared version and validate their associated Skill IDs.
- Production mode hides development-only Tool administration pages and mutation APIs without affecting Tool selection, approval policy, or personal MCP.

### Local Storage and Upgrade Boundaries

- Background cleanup watches disk space and inode usage and reclaims only expired staging, terminal diagnostics, temporary data, and unreferenced content. Formal user data is not deleted by age.
- Starting with `0.0.8.beta`, formal file storage is fixed to the local data directory. Older S3 formal storage is migrated back only after integrity validation; failure stops startup and preserves the original configuration.
- S3 and WebDAV are cloud storage integrations under Public Files, not formal file-storage Providers.

### Upgrade Notes

Back up configuration, the database, Workspaces, Memory, Skills, Tool packages, and Connector state before upgrading. After repository initialization, immediately download and store `recovery.yml` offline; it contains sensitive repository access and decryption information. Third-party cloud content mounted in Public Files is outside xAgent backup and needs its own provider-side protection.

## `v0.0.7.beta` - 2026-08-06

[View installation instructions](/docs/getting-started/install)

This release focuses on file storage and team sharing, introduces the first Desktop Client release, and continues to improve model request caching, Provider compatibility, and image recognition.

### File Storage and Team Sharing

- Added unified Local and S3 file storage Providers for AWS S3 and S3-compatible object stores, with connectivity and read/write checks before activation.
- Added managed migration between Local and S3. A failed migration does not replace the active Provider; if S3 becomes temporarily unavailable, xAgent can fall back to local storage, upload content after recovery, and switch back to S3.
- Added an instance-wide `share` directory. Administrators can create directories and upload, move, rename, download, and delete shared content.
- Unified file ACLs across `workspace`, `upload`, and `share`. Shared directories support inherited read-only `R` and read-write `RW` grants for users and groups.

### Image Recognition and OCR

- Added a configurable OCR model role so administrators can select a vision-capable model and manage OCR-specific model policy.
- When text is needed from an image attachment, xAgent can create canonical Markdown containing visible text, necessary visual description, and the primary language.
- OCR in this release applies to image attachments. Scanned PDFs without a text layer remain unsupported.

### Desktop Client `v0.0.1`

- First xAgent Desktop Client release, with packages for macOS Apple Silicon and Windows AMD64.
- The Client can discover a newer package for the current platform, then download it after confirmation, verify SHA-256, replace the installation, and restart automatically. If replacement fails, it retains the previous installation and attempts to restart it.

### Model Context and Providers

- Improved the organization of stable context and changing runtime state within a turn, increasing the overall Token Cache hit rate by 13% and reducing repeated request latency and cost.
- Improved LLM Provider compatibility across different model service configurations.
- Normalized cached-token reporting across OpenAI, Anthropic, and Gemini, and included system usage from model connectivity tests in usage statistics.

### UI and Stability

- Added administration UI and localized copy for shared files, storage runtime status, and S3 migration progress.
- Fixed Session Timeline compatibility for some legacy messages and thinking-block state.

### Upgrade Notes

Back up configuration, database, workspaces, shared files, and Connector state before upgrading. Before enabling S3, save and test the configuration, then start Provider migration; the current Provider remains active until migration succeeds. Run the existing installer command to check for and install `v0.0.7.beta`.

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
- When this release shipped, the independent Connector versions were WeChat `0.0.8`, Telegram `0.0.9`, and Feishu `0.0.8`. See [Connector Management](/docs/user-guide/connector#current-connector-versions) for current versions.

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

When this release shipped, rerunning the installer checked for and installed `v0.0.5.beta`. For current upgrades, use the [`v0.0.11.beta`](#v0011beta---2026-08-19) release notes.

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

New deployments and upgrades should use the current installer and the `v0.0.11.beta` release catalog.
