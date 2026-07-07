---
title: CLI
status: stable
updated: 2026-07-05
---

# CLI

## 适用对象

本文适合需要在本地启动、开发或构建 xAgent 的用户。

## 这是什么

CLI 文档记录当前已核对的最小命令入口。

## 什么时候使用

当你需要启动后端服务、运行前端开发环境或构建生产 Web UI 时使用本文。

## 基本用法

### 启动后端服务

在 xAgent 主仓库根目录运行：

```bash
go run ./cmd/xagent-server
```

### 启动 Web 前端开发环境

```bash
cd frontend
pnpm install
pnpm dev
```

开发态前端会把 `/api` 和 `/api/ws` 代理到后端服务。

### 构建可嵌入 Web UI 的服务端

```bash
cd frontend
pnpm build:webui-embed
cd ..
go build -tags webui_embed ./cmd/xagent-server
```

普通 `pnpm build` 只输出前端构建产物，不会嵌入 Go 服务端。

### 运行文档站

本文档站是独立项目：

```bash
npm install
npm run start
```

## 常见问题

### 为什么这里只有少量命令？

使用手册只记录已核对、用户常用的入口。测试、评估、迁移类命令应放到更具体的维护文档中。

### CLI 是否等同于 API？

不是。CLI 是命令行入口，API 是程序化调用接口。

### 命令变更是否需要更新 Changelog？

需要。

## 相关文档

- [Config](/docs/reference/config)
- [Testing](/docs/developer-guide/testing)
