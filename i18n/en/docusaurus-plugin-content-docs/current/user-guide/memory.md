---
title: Memory
status: experimental
updated: 2026-07-05
unlisted: true
---

# Memory

> Status: Experimental. Interfaces may change.

## Who This Is For

This page is for users who want xAgent to remember preferences, decisions, or long-term context across Sessions.

## What It Is

Memory provides long-term context. It is not the same as Session history, and it does not mean saving every conversation as a memory.

## When to Use It

Consider Memory when information will repeatedly affect future Tasks, such as:

- Preferred output language, format, and style.
- Long-term project background.
- Confirmed key decisions.
- Common workflows or collaboration rules.

## Basic Usage

When using Memory:

- Do not store temporary material, one-time paths, or unverified facts as long-term Memory.
- State important preferences explicitly, for example: "Use English by default for this project."
- When a current instruction conflicts with an older memory, the user's current explicit instruction takes precedence.
- Memory is experimental, so extraction, review, and activation behavior may change.

## Related Documentation

- [Memory System Technical Reference](/docs/architecture/memory-system)
- [Glossary](/docs/reference/glossary)
