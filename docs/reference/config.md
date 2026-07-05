---
title: Config
status: planned
updated: 2026-07-05
---

# Config

> 状态：规划中。

## 适用对象

本文适合需要配置 xAgent 或文档站部署的维护者。

## 这是什么

Config 用于记录 xAgent 和文档站的配置说明。当前阶段不编造 xAgent 运行配置字段。

## 什么时候使用

当配置项已经在代码、README 或稳定文档中存在，并且需要面向用户说明时，补充到本文。

## 基本用法

文档站部署配置见项目 `README.md`。xAgent 主程序配置请以主仓库当前实现为准。

后续补充配置时必须包含：

- 配置项名称。
- 默认值或缺省行为。
- 生效范围。
- 是否敏感。
- 示例来源。

## 常见问题

### 为什么不列出 config.yml 的所有字段？

未逐项核对实现前，不在官方文档中写具体字段。

### 配置项变化需要更新 Changelog 吗？

需要，尤其是用户可见行为变化。

### 是否可以写环境变量？

只有代码中存在并已验证时才可以写。

## 相关文档

- [Testing](/docs/developer-guide/testing)
- [Changelog](/docs/changelog)
