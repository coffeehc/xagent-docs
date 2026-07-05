---
title: Agent
status: stable
updated: 2026-07-05
---

# Agent

## 适用对象

本文适合需要理解 Agent 在 xAgent 中承担什么职责的读者。

## 这是什么

Agent 是负责理解目标、规划、调度工具和反馈的主体。在 xAgent 中，Agent 运行在 Session 上下文内，不能脱离当前上下文随意读取或修改事实。

## 什么时候使用

当你需要说明“谁在执行任务”“谁在调用 Tool”“谁在根据上下文回复用户”时，使用 Agent 这个术语。

## 基本用法

Agent 的典型职责包括：

- 理解用户目标。
- 结合 Session 历史和可见上下文决定下一步。
- 按治理规则调用 Tool。
- 根据执行结果给出反馈。

Agent 不应被写成拥有所有系统事实的对象。Session、Tool、Memory、Workspace 等各有自己的责任边界。

## 常见问题

### Agent 是否直接保存长期记忆？

不直接保存。Memory 是独立能力，Agent 只在上下文中使用被投影出来的内容。

### Agent 是否直接管理外部系统登录态？

不管理。外部系统登录态属于 Connector 或目标系统边界。

### Agent 是否总是自动执行所有工具？

不应这样描述。Tool 调用需要遵守当前会话、能力选择和治理规则。

## 相关文档

- [Session](/docs/user-guide/session)
- [Tool](/docs/user-guide/tool)
- [Memory](/docs/user-guide/memory)
