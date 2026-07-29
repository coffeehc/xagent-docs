---
title: Tool System
status: experimental
updated: 2026-07-05
unlisted: true
---

# Tool System

> Status: Experimental. Interfaces may change.

## Who This Is For

This page is for developers who need to understand Tool registration, governance, and execution boundaries.

## What It Is

The Tool System projects executable capabilities to an Agent and handles schemas, permissions, execution, result archival, and errors at runtime.

## When to Use It

Read this page when adding a capability, reviewing Tool-call boundaries, or writing Tool usage guidance for a Skill.

## Core Boundaries

A Tool design should distinguish between:

- The Tool schema visible to the Agent.
- Internal runtime dependencies and secrets.
- Session-level context and permissions.
- How Tool results return to the Agent and user.

## Related Documentation

- [Tool](/docs/user-guide/tool)
- [Skill](/docs/developer-guide/skill)
