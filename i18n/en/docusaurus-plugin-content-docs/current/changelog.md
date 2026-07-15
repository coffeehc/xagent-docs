---
title: Changelog
description: Review important user-facing changes, binary release contents, and upgrade notes for each xAgent release.
image: /img/share/en/xagent-overview.png
status: stable
updated: 2026-07-15
---

# Changelog

This page records important installation, usage, and safety-governance changes in xAgent binary releases. xAgent remains in beta, and features, interfaces, and protocols may continue to change.

## `v0.0.4.beta` - 2026-07-15

[Download from GitHub Release](https://github.com/coffeehc/xagent-releases/releases/tag/v0.0.4.beta)

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

### Connector Management

- User connections now follow the connection mode declared by each Connector Card, reducing duplicate or invalid connections.
- Connector Management shows software version and authentication method details.
- My Connections adds connection deletion, invalid-state handling, and clearer unavailable states.

The independently released WeChat and Telegram Connectors are currently both `v0.0.3`. Download them from [xAgent Connectors Releases](https://github.com/coffeehc/xagent-connectors/releases).

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

### Upgrade Notes

xAgent does not currently support online upgrades. Stop the service and back up runtime data, configuration, and Connector state before replacing the server binary and restarting. See [Server Installation and Deployment](/docs/deployment/server-install) for the installation workflow.

## `v0.0.3.beta`

This earlier public beta improved Connector integration, added the Telegram Connector, expanded the user manual, and established the initial safety-governance workflow.

Previous binary packages remain available under [xAgent Releases](https://github.com/coffeehc/xagent-releases/releases). New deployments should use the current release.
