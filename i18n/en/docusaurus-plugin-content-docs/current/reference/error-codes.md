---
title: Error Codes
status: planned
updated: 2026-07-05
unlisted: true
---

# Error Codes

> Status: Planned.

## Who This Is For

This page is for users troubleshooting xAgent errors.

## What It Is

The Error Codes reference will centralize stable error codes, their meanings, triggering conditions, and recommended responses. The stable catalog is not complete yet, so this page currently documents a troubleshooting approach.

## When to Use It

Use this approach when a Session, sign-in, Tool call, file operation, or external connection fails.

## Troubleshooting Flow

1. Read the original error shown on the page or in the Session.
2. Determine whether the failure belongs to authentication, model access, Tool, Workspace, Connector, Trigger, or configuration.
3. Check that the current user has permission, required configuration is complete, and the target resource exists.
4. For a Tool failure, inspect the Tool result for status, parameter guidance, and recovery suggestions.
5. If the problem is reproducible, record the error code, page, input, time, and related Session.

Each stable error-code entry added later should include the code, owning module, meaning, triggering conditions, and an action the user can take.

## Related Documentation

- [FAQ](/docs/faq/common)
