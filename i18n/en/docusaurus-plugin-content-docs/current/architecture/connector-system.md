---
title: Connector System
status: experimental
updated: 2026-07-05
unlisted: true
---

# Connector System

> Status: Experimental. Interfaces may change.

## Who This Is For

This page is for developers who need to understand the boundary between xAgent and external systems.

## What It Is

The Connector System connects external systems and projects their capabilities, messages, and authentication state into boundaries that xAgent can govern.

## When to Use It

Use the Connector System model when xAgent needs to integrate with WeChat, email, enterprise systems, or other target systems.

## Core Boundaries

The current architecture emphasizes these boundaries:

- xAgent owns the Connector catalog, system-level connections, channel routing, and the projection of tools to Agents.
- Connector Server owns authentication state in the target system, target-system permissions, the Connection Descriptor, and media references.
- An Agent must not see system API keys, target-system tokens, or internal channel IDs.

## Related Documentation

- [Connector](/docs/developer-guide/connector)
- [Tool System](/docs/architecture/tool-system)
