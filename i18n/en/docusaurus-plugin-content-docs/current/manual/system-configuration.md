---
title: System Configuration Pages
description: Page-by-page guidance and English UI examples for xAgent models, system settings, software license, and Agent roles.
status: beta
updated: 2026-07-27
---

# System Configuration Pages

System Configuration is available only to administrators. Changes affect all users or service operation, so confirm their scope before saving.

## Model Config

**Menu:** System Config > Model Config

**Visibility:** Administrators

![xAgent Model Config showing provider, capabilities, default state, and actions](/img/manual/v005/en/admin-models.webp)

- Create a model and select its Provider protocol.
- Configure the Base URL, API key, upstream model name, headers, and timeout.
- Declare chat, streaming, tool-call, vision, audio, and file capabilities.
- Test the connection before saving and keep one default model.

See [Model Configuration](/en/docs/user-guide/model-config) for details.

## System Config

**Menu:** System Config > System Config

**Visibility:** Administrators

![xAgent System Config showing listener, runtime root, timeout, and system mailbox](/img/manual/v005/en/admin-system-config.webp)

- Review the listening address and read-only runtime root.
- Adjust the single-session LLM timeout.
- Configure the system sender address, SMTP host, TLS, and password.
- Follow the page guidance to determine whether a restart is required.

## Software License

**Menu:** System Config > Software License

**Visibility:** Administrators

![xAgent Software License showing device, validity, scope, and update action](/img/manual/v005/en/admin-license.webp)

Review the device and license identifiers, customer, issue and expiry time, licensed users, devices, and features. Use **Update license** to upload a replacement license file.

## Agent Role Config

**Menu:** System Config > Agent Role Config

**Visibility:** Administrators

![xAgent Agent Role Config showing main, orchestrator, index, and summary roles](/img/manual/v005/en/admin-agent-roles.webp)

- Main Agent runs normal sessions, task progression, and tool loops.
- Orchestrator Agent completes sub-Agent blueprints.
- Index Agent provides index-building instructions.
- Summary Agent handles summaries and context compression.
- Each fixed role can select a model, output format, streaming mode, and request policy. Keep a rollback path before changing these settings.
