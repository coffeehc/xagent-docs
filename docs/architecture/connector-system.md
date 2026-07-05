---
title: Connector System
status: experimental
updated: 2026-07-05
---

# Connector System

> 状态：实验性能力，接口可能变化。

## 适用对象

本文适合需要理解外部系统连接边界的开发者。

## 这是什么

Connector System 负责连接外部系统，并把外部能力、消息和认证状态投影到 xAgent 可治理的边界内。

## 什么时候使用

当 xAgent 需要接入微信、邮件、企业系统或其他目标系统时，可以使用 Connector System 的模型。

## 基本用法

当前架构边界强调：

- xAgent 管 Connector catalog、系统级连接、通道路由和 Agent 工具投影。
- Connector Server 管目标系统登录态、目标权限、Connection Descriptor 和媒体引用。
- Agent 不应看到系统 API key、目标系统 token 或内部 channel ID。

## 常见问题

### Connector 是否由 xAgent 保存目标系统 token？

不应这样描述。目标系统 token 属于 Connector 或目标系统边界。

### Connector 是否必须提供 Skill？

可以提供，但不是唯一职责。

### Connector 的协议是否已经完全稳定？

当前标记为实验性，接口可能变化。

## 相关文档

- [Connector](/docs/developer-guide/connector)
- [Tool System](/docs/architecture/tool-system)
