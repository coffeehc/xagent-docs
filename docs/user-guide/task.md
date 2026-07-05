---
title: Task
status: stable
updated: 2026-07-05
---

# Task

## 适用对象

本文适合需要理解 xAgent 中任务表达方式的用户和维护者。

## 这是什么

Task 是 Agent 执行的目标单元。它可以来自用户输入、系统触发或更长任务中的拆分目标。

## 什么时候使用

当需要描述“要完成的目标”时使用 Task，而不是把所有交互都称为命令或消息。

## 基本用法

描述 Task 时建议至少说明：

- 目标是什么。
- 依赖哪些上下文。
- 是否需要 Tool、Skill、Memory 或 Workspace。
- 结果应该如何交付。

如果 Task 需要长时间执行，应明确是否涉及长任务机制或 SubAgent。

## 常见问题

### Task 是否必须一次完成？

不必须。复杂 Task 可以跨多轮 Session 推进。

### Task 是否等同于 Tool 调用？

不是。Tool 调用只是完成 Task 的手段之一。

### Task 是否应该写入 Changelog？

只有功能行为或用户可见说明变化时才需要更新 Changelog。

## 相关文档

- [Session](/docs/user-guide/session)
- [Tool](/docs/user-guide/tool)
- [长任务](/docs/user-guide/long-task)
