---
title: Tool System
status: experimental
updated: 2026-07-05
---

# Tool System

> 状态：实验性能力，接口可能变化。

## 适用对象

本文适合需要理解工具注册、治理和执行边界的开发者。

## 这是什么

Tool System 负责把可执行能力投影给 Agent，并在运行时完成 schema、权限、执行、结果归档和错误处理。

## 什么时候使用

当你需要新增能力、审查工具调用边界或编写 Skill 工具使用说明时，阅读本文。

## 基本用法

设计 Tool 时应区分：

- Agent 可见的 Tool schema。
- 系统内部的 runtime 和密钥。
- Session 级上下文和权限。
- Tool 结果如何返回给 Agent 和用户。

## 常见问题

### Tool 是否可以绕过 Session 执行？

不应这样设计。Tool 调用应在明确上下文和治理边界内发生。

### Tool 是否应保存业务事实？

通常不应。业务事实应归属于明确 owner。

### Tool 错误码在哪里定义？

未稳定前不在本文编造错误码。后续应在 [Error Codes](/docs/reference/error-codes) 中维护。

## 相关文档

- [Tool](/docs/user-guide/tool)
- [Skill](/docs/developer-guide/skill)
