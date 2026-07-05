---
title: CLI
status: planned
updated: 2026-07-05
---

# CLI

> 状态：规划中。

## 适用对象

本文适合需要通过命令行运行或维护 xAgent 的用户。

## 这是什么

CLI 文档用于记录稳定命令、参数和示例。当前阶段只保留位置，不编造未验证命令。

## 什么时候使用

当命令入口和参数稳定后，再补充本文。

## 基本用法

后续补充命令时必须说明：

- 命令名称。
- 参数和默认值。
- 运行前置条件。
- 预期输出。
- 常见失败原因。

## 常见问题

### 可以写主仓库 README 中已有命令吗？

可以，但补充前应重新核对当前代码和 README。

### CLI 是否等同于 API？

不是。CLI 是命令行入口，API 是程序化调用接口。

### 命令变更是否需要更新 Changelog？

需要。

## 相关文档

- [Config](/docs/reference/config)
- [Testing](/docs/developer-guide/testing)
