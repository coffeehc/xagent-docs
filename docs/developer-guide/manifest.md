---
title: Manifest
status: planned
updated: 2026-07-05
unlisted: true
---

# Manifest

> 状态：规划中。

## 适用对象

本文适合需要描述扩展包、Connector 或运行能力声明文件的开发者。

## 这是什么

Manifest 是描述扩展能力元信息和声明内容的文件。当前阶段不定义固定字段，避免提前锁定未稳定 schema。

## 什么时候使用

当需要让 xAgent 发现、校验或加载外部能力时，通常需要 Manifest。

## 基本用法

后续应补充：

- Manifest 文件名和位置。
- 必填字段和可选字段。
- 版本和兼容策略。
- 校验失败的错误说明。

## 常见问题

### 是否可以参考其他项目的 manifest 字段？

可以参考，但不能直接写入 xAgent 官方文档，除非 xAgent 已实现。

### Manifest 是否只用于 Skill？

不应提前限定。具体归属以实现为准。

### 新增字段是否需要更新术语表？

如果字段引入新术语，需要同步更新术语表。

## 相关文档

- [Skill](/docs/developer-guide/skill)
- [Connector](/docs/developer-guide/connector)
