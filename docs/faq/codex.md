---
title: Codex 维护 FAQ
status: stable
updated: 2026-07-05
---

# Codex 维护 FAQ

## 适用对象

本文适合使用 Codex 辅助维护 xAgent 文档的维护者。

## 这是什么

本文说明 Codex 在修改文档时应遵守的边界。

## 什么时候使用

当让 Codex 新增、修改或整理 xAgent 文档时，应先参考本文和 `.codex/prompts/write-doc.md`。

## 基本用法

Codex 修改文档时应：

- 使用中文 Markdown。
- 回查代码或已有文档，不编造未实现能力。
- 新增术语时更新术语表。
- 修改功能行为说明时更新 Changelog。
- 默认只改文档和 Docusaurus 配置相关文件。

## 常见问题

### Codex 可以直接改部署配置吗？

除非任务明确要求，否则不应修改部署配置。

### Codex 可以补 API 示例吗？

只有在代码或稳定文档中能验证时才可以。

### Codex 可以改导航吗？

导航结构不应随意改动。新增一级入口前需要明确需求。

## 相关文档

- [贡献指南](https://github.com/coffeehc/xagent)
- [Changelog](/docs/changelog)
