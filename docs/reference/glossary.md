---
title: 术语表
status: stable
updated: 2026-07-05
---

# 术语表

## 适用对象

本文适合所有 xAgent 文档作者和读者。

## 这是什么

术语表是 xAgent 文档的固定用词来源。新增术语必须同步更新本文。

## 核心术语

| 术语 | 固定含义 |
| --- | --- |
| Agent | 负责理解目标、规划、调度工具和反馈的主体 |
| Task | Agent 执行的目标单元 |
| Tool | 可被 Agent 调用的最小外部能力 |
| Skill | 一组可复用的任务方法、约束和工具使用规范 |
| Connector | 连接外部系统的协议桥和能力声明来源 |
| RuntimeConnection | 可运行的外部执行环境或执行体 |
| Memory | 面向长期上下文的记忆系统 |
| SubAgent | 面向长任务的独立执行单元 |
| Session | 用户与 Agent 的一次交互上下文 |
| Workspace | Agent 执行任务时使用的文件、上下文和中间产物空间 |

## 什么时候使用

所有 Docs、Blog、Changelog 和 Codex 维护提示都应使用本文术语。

## 基本用法

写文档时：

- 不随意创造同义词。
- 不把规划能力写成已实现能力。
- 新增术语时同步本文和相关文档。

## 常见问题

### 可以把 Connector 叫插件吗？

不建议。Connector 是外部系统协议桥，不等同于普通插件。

### 可以把 Memory 叫历史记录吗？

不可以。Memory 和 Session 历史是不同概念。

### 术语变化需要更新 Changelog 吗？

需要。术语变化会影响读者理解。

## 相关文档

- [核心概念](/docs/getting-started/core-concepts)
- [Changelog](/docs/changelog)
