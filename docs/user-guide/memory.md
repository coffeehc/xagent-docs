---
title: Memory
status: experimental
updated: 2026-07-05
---

# Memory

> 状态：实验性能力，接口可能变化。

## 适用对象

本文适合需要理解 xAgent 长期上下文能力的读者。

## 这是什么

Memory 是面向长期上下文的记忆系统。它不等同于 Session 历史，也不等同于上下文压缩摘要。

当前架构文档强调：记忆提取应从当前 history source 的冻结切片出发，先产生候选，再经过过滤进入后续队列或交接。

## 什么时候使用

当需要跨任务、跨轮次保留重要偏好、决定或上下文时，可以考虑 Memory。

## 基本用法

第一阶段只描述边界：

- Memory 候选应能追溯到明确来源。
- 未稳定接口不写成公共 API。
- Memory 与 Session 历史、压缩摘要、工作区文件应保持边界清晰。

## 常见问题

### Memory 是否自动保存所有消息？

不应这样描述。长期 Memory 需要明确价值判断和来源证据。

### Memory 是否替代 Session 历史？

不替代。二者生命周期和用途不同。

### Memory 规则是否已经完全稳定？

没有。相关接口和提取策略可能变化。

## 相关文档

- [Memory System](/docs/architecture/memory-system)
- [术语表](/docs/reference/glossary)
