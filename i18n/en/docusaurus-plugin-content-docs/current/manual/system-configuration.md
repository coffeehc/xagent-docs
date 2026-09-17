---
title: System Configuration Pages
description: Page-by-page guidance and English UI examples for xAgent models, system settings, software license, and Agent roles.
status: beta
updated: 2026-09-17
---

# System Configuration Pages

System Configuration is available only to administrators. Changes affect all users or service operation, so confirm their scope before saving.

## Model Config

**Menu:** System Config > Model Config

**Visibility:** Administrators

![xAgent Model Config showing provider, capabilities, default state, and actions](/img/manual/v005/en/admin-models.webp)

- Create a model and select its Provider protocol.
- Configure the Base URL, API key, upstream model name, headers, and timeout.
- OpenAI-compatible Providers can select upstream models from `/api/models` or use a manual ID; context limits, max output, reasoning effort, and thinking settings are configurable.
- Declare chat, image-generation, tool-call, vision, audio, and file capabilities.
- Test the connection before saving and keep one default model.

See [Model Configuration](/docs/user-guide/model-config) for details.

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

When no Enterprise license certificate is installed, xAgent enters the Free edition directly. This page shows the Free state and its fixed limits: 2 users, 30 Sessions, 1 WorkGroup, 5 AgentPlugin VChannels, and 5 scheduled tasks. The Free edition has no certificate expiry.

After an Enterprise certificate is installed, this page shows the device and license identifiers, customer, issue and expiry time, and licensed capacity. Use **Update license** to upload a replacement Enterprise license file.

Enterprise licenses can also limit the highest allowed xAgent version and A2A connection capacity. Check version eligibility before upgrading to `v0.0.20.beta`; A2A capacity is separate from AgentPlugin Channel capacity.

## File Sharing Policy

**Menu:** Storage Management > File Sharing (administrators)

Public links are disabled by default. Administrators can allow xAgent-generated outputs only or all managed files, and set default and maximum expiry, original-download permission, and a public base URL. Users can [create expiring links](/docs/user-guide/file-sharing) only after the policy is saved and a reachable HTTPS domain is configured.

## Agent Role Config

**Menu:** System Config > Agent Role Config

**Visibility:** Administrators

![xAgent Agent Role Config showing main, orchestrator, index, and summary roles](/img/manual/v005/en/admin-agent-roles.webp)

- Main Agent runs normal sessions, task progression, and tool loops.
- Orchestrator Agent completes sub-Agent blueprints.
- Index Agent provides index-building instructions.
- Summary Agent handles summaries and context compression.
- Each fixed role can select a model, output format, streaming mode, and request policy. Keep a rollback path before changing these settings.
