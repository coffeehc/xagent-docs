---
title: Memory System
status: experimental
updated: 2026-07-05
unlisted: true
---

# Memory System

> Status: Experimental. Interfaces may change.

## Who This Is For

This page is for developers who need to understand the boundaries around memory extraction, candidates, and long-term context.

## What It Is

The Memory System manages long-term context. Its current architecture freezes the source from the active history, extracts candidates, and applies a value filter before candidates enter a later queue or handoff.

## When to Use It

Memory may be involved when a user explicitly asks xAgent to remember something, a task produces an important decision, or context must be retained across conversations.

## Core Boundaries

Documentation should follow these rules:

- Memory is not the same as Session history.
- Memory is not the same as context compression.
- A candidate must have a traceable source.
- Unstable fields must not be documented as public contracts.

## Related Documentation

- [Memory](/docs/user-guide/memory)
- [Session](/docs/user-guide/session)
