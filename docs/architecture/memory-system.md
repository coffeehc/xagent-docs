---
title: Memory System
status: experimental
updated: 2026-07-05
unlisted: true
---

# Memory System

> 状态：实验性能力，接口可能变化。

## 适用对象

本文适合需要理解记忆提取、候选和长期上下文边界的开发者。

## 这是什么

Memory System 面向长期上下文。当前已知架构重点是：从当前 history source 冻结来源，提取 candidate，再经过 value filter 后进入后续队列或交接。

## 什么时候使用

当用户明确要求记住信息、任务中出现重要决策，或需要跨轮次保留上下文时，可能涉及 Memory。

## 基本用法

文档写作中应遵守：

- Memory 不等同于 Session 历史。
- Memory 不等同于上下文压缩。
- Candidate 必须可追溯来源。
- 未稳定字段不写成公共契约。

## 常见问题

### Memory 是否可以从压缩摘要中提取？

当前架构基线不应这样描述。Memory extraction source 应来自当前 history 的冻结切片。

### Memory 是否直接写最终长期事实？

不应写成直接写入。候选和过滤阶段需要保持清晰。

### Memory 是否会影响所有 Agent？

作用范围取决于实现和权限边界，未稳定前不做承诺。

## 相关文档

- [Memory](/docs/user-guide/memory)
- [Session](/docs/user-guide/session)
