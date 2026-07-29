---
title: Connector
status: experimental
updated: 2026-07-05
unlisted: true
---

# Connector

> Status: Experimental. Interfaces may change.

## Who This Is For

This page is for Connector developers preparing to integrate an external system.

## What It Is

A Connector is a protocol bridge to an external system and the source of its capability declarations. It projects target-system capabilities, authentication state, and message events into xAgent through controlled boundaries.

## When to Use It

Use a Connector when xAgent needs to connect to instant messaging, an enterprise system, a third-party API, or another external target system.

## Core Boundaries

The current architecture defines these Connector concepts:

- Connector Card: a static capability declaration before binding.
- Connection Descriptor: a dynamic user-level projection after binding.
- Data Plane: structured packet communication.
- Transfer Plane: file and media transfer.

The implementation and protocol documentation remain the source of truth for exact wire schemas.

## Related Documentation

- [Connector System](/docs/architecture/connector-system)
- [Skill](/docs/developer-guide/skill)
