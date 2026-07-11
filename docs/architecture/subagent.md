---
title: SubAgent
status: experimental
updated: 2026-07-05
unlisted: true
---

# SubAgent

> 状态：实验性能力，接口可能变化。

## 适用对象

本文适合需要理解长任务拆分和独立执行单元的读者。

## 这是什么

SubAgent 是面向长任务的独立执行单元。它用于把复杂目标拆成可以独立推进、观察和收束的子执行过程。

## 什么时候使用

当一个 Task 需要长时间执行、并行推进或独立状态管理时，可以考虑 SubAgent。

## 基本用法

当前阶段只描述边界：

- SubAgent 不应被写成所有 Task 的默认结果。
- SubAgent 与 Session、Workspace、Memory 的关系需要以实现为准。
- SubAgent 的生命周期、状态和结果归档需要明确 owner。

## 常见问题

### SubAgent 是否一定是新的 Session？

不在当前文档中承诺。具体实现应以代码为准。

### SubAgent 是否可以直接绕过主 Agent？

不应这样描述。长任务拆分仍需受平台治理。

### SubAgent 是否稳定？

当前仍按实验性能力处理。

## 相关文档

- [长任务](/docs/user-guide/long-task)
- [Task](/docs/user-guide/task)
