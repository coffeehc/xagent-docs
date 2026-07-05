---
title: 什么是 xAgent
status: stable
updated: 2026-07-05
---

# 什么是 xAgent

## 适用对象

本文适合第一次了解 xAgent 的使用者、维护者和扩展开发者。

## 这是什么

xAgent 是一个以 `Session` 为入口的智能体运行平台。它围绕用户目标组织 `Agent` 执行、上下文装配、工具调用、记忆管理、工作区文件和外部系统连接。

xAgent 的核心不是单个聊天界面，而是一套支持长任务、多工具、多运行环境和可扩展能力的运行基础设施。

## 什么时候使用

当你需要让 Agent 在明确的会话上下文内处理任务、调用工具、读写工作区、使用长期上下文或连接外部系统时，可以使用 xAgent。

## 基本用法

第一阶段文档只描述稳定概念和维护边界。具体运行命令请以 xAgent 主仓库 `README.md` 和当前代码为准。

推荐阅读顺序：

1. [快速开始](/docs/getting-started/quick-start)
2. [核心概念](/docs/getting-started/core-concepts)
3. [Session](/docs/user-guide/session)
4. [Tool](/docs/user-guide/tool)

## 常见问题

### xAgent 是一个聊天机器人吗？

不是。聊天只是入口形态之一。xAgent 更关注 Session、工具、运行时、记忆和扩展能力的组织。

### xAgent 是否承诺所有规划能力已经稳定？

不承诺。文档中未稳定能力会明确标记为 `experimental` 或 `planned`。

### 文档里的术语是否可以替换成同义词？

不建议。所有术语以 [术语表](/docs/reference/glossary) 为准。

## 相关文档

- [核心概念](/docs/getting-started/core-concepts)
- [术语表](/docs/reference/glossary)
