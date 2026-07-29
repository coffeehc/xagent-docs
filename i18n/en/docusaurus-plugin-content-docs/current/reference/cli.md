---
title: CLI
status: stable
updated: 2026-07-05
unlisted: true
---

# CLI

## Who This Is For

This page is for users who need to run, develop, or build xAgent locally.

## What It Is

The CLI reference records the minimal command entry points that have been verified against the current project.

## When to Use It

Use these commands to start the backend service, run the frontend development environment, or build the production Web UI.

## Basic Usage

### Start the Backend Service

Run from the root of the xAgent repository:

```bash
go run ./cmd/xagent-server
```

### Start the Web Frontend for Development

```bash
cd frontend
pnpm install
pnpm dev
```

The development frontend proxies `/api` and `/api/ws` to the backend service.

### Build the Server with an Embedded Web UI

```bash
cd frontend
pnpm build:webui-embed
cd ..
go build -tags webui_embed ./cmd/xagent-server
```

A regular `pnpm build` produces only frontend build artifacts; it does not embed them in the Go server.

### Run the Documentation Site

This documentation site is a separate project:

```bash
npm install
npm run start
```

## Related Documentation

- [Config](/docs/reference/config)
- [Testing](/docs/developer-guide/testing)
