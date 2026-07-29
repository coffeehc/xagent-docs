---
title: Config
status: stable
updated: 2026-07-05
unlisted: true
---

# Config

## Who This Is For

This page is for users and maintainers who need to understand the minimal xAgent configuration.

## What It Is

Config defines xAgent runtime settings. This page lists only commonly used fields that have been verified; it does not replace the complete configuration source.

## When to Use It

Check configuration first when the backend does not start, the frontend cannot connect, model requests time out, email is unavailable, or a security key must be changed.

## Common Fields

| Field | Purpose |
| --- | --- |
| `server_addr` | Listening address for the backend HTTP service |
| `root_dir` | xAgent runtime root directory |
| `llm.request_timeout_seconds` | Timeout for one LLM request |
| `security.access_token_secret` | Signing key for Access Tokens |
| `security.secret_master_key` | Master key for encryption of stored user Secrets |
| `security.access_token_ttl_seconds` | Access Token lifetime |
| `security.refresh_token_ttl_seconds` | Refresh Token lifetime |
| `xagent_email.*` | System email delivery configuration |
| `runtime.server_runtime.*` | Managed runtime connection configuration |

Notes:

- Never put a real token, password, or key in documentation, screenshots, or a public repository.
- `root_dir` affects the locations of runtime data, model configuration, user files, and system resources.
- After changing the listening address, also verify the frontend proxy and the URL users open.
- Email, model, and Connector capabilities may also have separate system-level or user-level settings.

## Related Documentation

- [Testing](/docs/developer-guide/testing)
