---
title: SubAgent
status: experimental
updated: 2026-07-05
unlisted: true
---

# SubAgent

> Status: Experimental. Interfaces may change.

## Who This Is For

This page is for readers who need to understand long-task decomposition and independent execution units.

## What It Is

A SubAgent is an independent execution unit for long tasks. It breaks a complex goal into smaller execution processes that can be advanced, observed, and completed independently.

## When to Use It

Consider a SubAgent when a Task requires long-running work, parallel progress, or independent state management.

## Current Boundaries

At this stage, only the boundaries are documented:

- A SubAgent should not be presented as the default outcome of every Task.
- The implementation defines how a SubAgent relates to Session, Workspace, and Memory.
- Lifecycle, state, and result archival require an explicit owner.

## Related Documentation

- [Long Tasks](/docs/user-guide/long-task)
- [Task](/docs/user-guide/task)
