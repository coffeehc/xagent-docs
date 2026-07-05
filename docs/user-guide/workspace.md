---
title: Workspace
status: stable
updated: 2026-07-05
---

# Workspace

## 适用对象

本文适合需要理解 xAgent 文件和中间产物边界的用户。

## 这是什么

Workspace 是 Agent 执行任务时使用的文件、上下文和中间产物空间。它用于承载任务过程中的输入、产物和可见资源。

## 什么时候使用

当任务涉及文件读取、生成报告、保存中间结果或引用用户上传内容时，通常需要 Workspace。

## 基本用法

描述 Workspace 时应说明：

- 文件属于哪个 Session 或用户范围。
- Agent 是否可见。
- Tool 是否可处理。
- 产物是否需要保留或交付。

不要把 Workspace 写成任意全局文件系统访问。

## 常见问题

### Workspace 是否等同于本机任意目录？

不是。Workspace 应有明确可见性和归属边界。

### Tool 生成的文件是否都应该放入 Workspace？

应根据任务交付和生命周期判断，不能默认写成固定规则。

### Workspace 文件是否自动进入 Memory？

不自动。Memory 需要独立来源和价值判断。

## 相关文档

- [Session](/docs/user-guide/session)
- [Tool](/docs/user-guide/tool)
