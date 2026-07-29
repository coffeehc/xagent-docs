---
title: Architecture Overview
status: experimental
updated: 2026-07-05
unlisted: true
---

# Architecture Overview

> Status: Experimental. Interfaces may change.

## Who This Is For

This page is for developers who need to understand xAgent module boundaries and its execution flow.

## What It Is

The xAgent architecture is organized around Session, Agent, Tool, Skill, Memory, Workspace, Connector, and RuntimeConnection. Its goal is to separate the intelligent execution chain from the owners of foundational capabilities so that no single module owns every fact.

## When to Use It

Start here when you need to determine ownership, understand extension boundaries, or choose consistent terminology for documentation.

## Basic Flow

A simplified view:

```text
Incoming request
  -> Session
  -> Agent
  -> Tool / Skill / Memory / Workspace / Connector
  -> Result archival and feedback
```

The architecture documentation describes only the currently known boundaries and direction. Check the source code whenever you need exact interface behavior.

## Related Documentation

- [Runtime](/docs/architecture/runtime)
- [Tool System](/docs/architecture/tool-system)
- [Memory System](/docs/architecture/memory-system)
