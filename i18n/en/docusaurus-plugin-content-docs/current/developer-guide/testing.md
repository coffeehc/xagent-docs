---
title: Testing
status: stable
updated: 2026-07-05
unlisted: true
---

# Testing

## Who This Is For

This page is for developers who maintain the xAgent user guide and related documentation.

## What It Is

Testing defines the basic validation requirements for the documentation site. Current checks focus on static builds, type checking, and link validation.

## When to Use It

Run a build after changing navigation, documentation links, Docusaurus configuration, or dependencies.

## Basic Usage

```bash
npm run build
```

If TypeScript code changed, also run:

```bash
npm run typecheck
```

## Related Documentation

- [Report a Documentation Issue](/docs/cooperation/idea)
