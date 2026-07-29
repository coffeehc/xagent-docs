---
title: Skill
status: experimental
updated: 2026-07-05
unlisted: true
---

# Skill

> Status: Experimental. Interfaces may change.

## Who This Is For

This page is for developers preparing to write or maintain a Skill for xAgent.

## What It Is

A Skill is a reusable set of task methods, constraints, and Tool usage guidance. It helps an Agent understand the workflow, boundaries, and recommended Tool usage for a specific type of task.

## When to Use It

A task type can become a Skill when it has a stable method, fixed constraints, or requires a coordinated set of Tools.

## Authoring Rules

When writing a Skill:

- Do not store secrets.
- Do not invent Tools that do not exist.
- Do not bypass Tool governance.
- Describe task methods and constraints instead of treating the Skill as an execution runtime.

The current xAgent implementation remains the source of truth for the Skill file format and import rules.

## Related Documentation

- [Tool](/docs/user-guide/tool)
- [Connector](/docs/developer-guide/connector)
