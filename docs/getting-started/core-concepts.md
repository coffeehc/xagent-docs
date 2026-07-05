---
title: 核心概念
status: stable
updated: 2026-07-05
---

# 核心概念

## 适用对象

本文适合需要理解 xAgent 基础模型的用户和开发者。

## 这是什么

xAgent 的核心概念包括：

| 概念 | 含义 |
| --- | --- |
| Agent | 负责理解目标、规划、调度工具和反馈的主体 |
| Task | Agent 执行的目标单元 |
| Session | 用户与 Agent 的一次交互上下文 |
| Tool | 可被 Agent 调用的最小外部能力 |
| Skill | 一组可复用的任务方法、约束和工具使用规范 |
| Connector | 连接外部系统的协议桥和能力声明来源 |
| RuntimeConnection | 可运行的外部执行环境或执行体 |
| Memory | 面向长期上下文的记忆系统 |
| SubAgent | 面向长任务的独立执行单元 |
| Workspace | Agent 执行任务时使用的文件、上下文和中间产物空间 |

## 什么时候使用

阅读任何功能文档前，都应先对齐这些术语。新增术语必须同步更新 [术语表](/docs/reference/glossary)。

## 基本用法

理解一次执行时，可以按下面的顺序阅读：

```text
User Input -> Session -> Agent -> Tool / Skill / Memory / Workspace -> Result
```

Connector 和 RuntimeConnection 用于把外部系统和运行环境投影成 Agent 可治理、可调用的能力。

## 常见问题

### Skill 和 Tool 有什么区别？

Tool 是最小外部能力。Skill 是围绕任务方法、约束和工具使用方式形成的可复用说明。

### Session 和 Task 是一回事吗？

不是。Session 是交互上下文，Task 是 Agent 要完成的目标单元。

### Memory 是否等同于聊天历史？

不是。聊天历史属于 Session 上下文，Memory 面向长期上下文和跨轮次复用。

## 相关文档

- [Agent](/docs/user-guide/agent)
- [Tool](/docs/user-guide/tool)
- [术语表](/docs/reference/glossary)
