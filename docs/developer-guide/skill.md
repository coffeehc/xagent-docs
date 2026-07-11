---
title: Skill
status: experimental
updated: 2026-07-05
unlisted: true
---

# Skill

> 状态：实验性能力，接口可能变化。

## 适用对象

本文适合准备为 xAgent 编写或维护 Skill 的开发者。

## 这是什么

Skill 是一组可复用的任务方法、约束和工具使用规范。它帮助 Agent 在特定任务中理解流程、边界和推荐工具用法。

## 什么时候使用

当某类任务有稳定方法、固定约束或需要组合多个 Tool 时，可以沉淀为 Skill。

## 基本用法

编写 Skill 时应遵守：

- 不保存密钥。
- 不编造不存在的 Tool。
- 不绕过 Tool governance。
- 描述任务方法和约束，而不是把 Skill 写成执行 runtime。

具体 Skill 文件格式和导入规则以 xAgent 当前实现为准。

## 常见问题

### Skill 是否等同于插件？

不等同。Skill 更偏向任务方法和工具使用规范。

### Skill 是否能直接执行代码？

不应这样描述。执行能力应属于 Tool 或 RuntimeConnection。

### Skill 是否可以来自 Connector？

可以作为 Connector 给 Agent 的运行时说明，但具体格式以实现为准。

## 相关文档

- [Tool](/docs/user-guide/tool)
- [Connector](/docs/developer-guide/connector)
