---
title: Connector
status: experimental
updated: 2026-07-05
unlisted: true
---

# Connector

> 状态：实验性能力，接口可能变化。

## 适用对象

本文适合准备接入外部系统的 Connector 开发者。

## 这是什么

Connector 是连接外部系统的协议桥和能力声明来源。它负责把目标系统能力、登录态和消息事件以受控方式投影给 xAgent。

## 什么时候使用

当 xAgent 需要连接即时通信、企业系统、第三方 API 或其他外部目标系统时，可以使用 Connector。

## 基本用法

当前架构文档中，Connector 边界包括：

- Connector Card：未绑定前的静态能力声明。
- Connection Descriptor：绑定后的用户级动态投影。
- Data Plane：结构化 packet 通信。
- Transfer Plane：文件和媒体流转。

具体 wire schema 仍以实现和协议文档为准。

## 常见问题

### xAgent 是否保存目标系统登录态？

不应这样设计。目标系统登录态属于 Connector 或目标系统。

### Agent 是否能看到 connector_channel_id？

不应让 Agent 看到系统级和通道级内部 ID。

### Connector 是否就是 Skill？

不是。Connector 可以提供 Skill，但 Connector 本身是外部系统协议桥。

## 相关文档

- [Connector System](/docs/architecture/connector-system)
- [Skill](/docs/developer-guide/skill)
