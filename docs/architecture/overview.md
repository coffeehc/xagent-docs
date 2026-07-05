---
title: 架构概览
status: experimental
updated: 2026-07-05
---

# 架构概览

> 状态：实验性能力，接口可能变化。

## 适用对象

本文适合需要理解 xAgent 模块边界和执行链路的开发者。

## 这是什么

xAgent 的架构围绕 Session、Agent、Tool、Skill、Memory、Workspace、Connector 和 RuntimeConnection 展开。目标是把智能执行链和基础能力 owner 分开，避免单一模块承载所有事实。

## 什么时候使用

当你需要判断职责归属、扩展边界或文档写作术语时，可以从本文开始。

## 基本用法

一个简化视图：

```text
入口请求
  -> Session
  -> Agent
  -> Tool / Skill / Memory / Workspace / Connector
  -> 结果归档与反馈
```

架构文档只描述当前已知边界和方向。涉及具体接口时必须回查代码。

## 常见问题

### 是否可以把所有能力都写成 Agent 的职责？

不可以。Agent 是执行主体，但不同事实有各自 owner。

### 架构文档是否等同于当前实现？

不一定。标记为 experimental 的内容可能包含目标架构或仍在收口的边界。

### 新增架构术语要做什么？

必须同步 [术语表](/docs/reference/glossary)。

## 相关文档

- [Runtime](/docs/architecture/runtime)
- [Tool System](/docs/architecture/tool-system)
- [Memory System](/docs/architecture/memory-system)
