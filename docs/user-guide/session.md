---
title: Session
status: stable
updated: 2026-07-05
---

# Session

## 适用对象

本文适合需要理解 xAgent 运行上下文的读者。

## 这是什么

Session 是用户与 Agent 的一次交互上下文。它承载消息历史、当前状态、可见能力、工作区边界和执行过程中的上下文装配。

xAgent 主仓库当前说明中，Session 是请求生命周期的核心入口之一。

## 什么时候使用

当需要描述一次连续交互、一个任务上下文或一组运行期事实的归属时，使用 Session。

## 基本用法

理解 Session 时可以关注：

- 当前用户和权限边界。
- 当前 Agent 可见的历史和上下文。
- 当前可用 Tool、Skill、Memory、Workspace。
- 执行状态、阻塞状态和结果归档。

## 常见问题

### Session 是否只是聊天记录？

不是。聊天记录只是 Session 的一部分。

### Session 是否保存所有长期事实？

不保存。长期上下文应进入 Memory 或其他明确 owner。

### Session 是否可以被 SubAgent 复用？

SubAgent 与 Session 的关系需要以具体实现为准，不能在文档中提前假定。

## 相关文档

- [Agent](/docs/user-guide/agent)
- [Workspace](/docs/user-guide/workspace)
- [Memory](/docs/user-guide/memory)
