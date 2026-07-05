---
title: Tool
status: stable
updated: 2026-07-05
---

# Tool

## 适用对象

本文适合需要理解 xAgent 工具系统的用户和开发者。

## 这是什么

Tool 是可被 Agent 调用的最小外部能力。Tool 可以来自内置能力、外部连接、运行环境或其他可治理的能力来源。

## 什么时候使用

当 Agent 需要执行读取文件、调用接口、运行命令、访问外部系统等动作时，通常通过 Tool 完成。

## 基本用法

描述 Tool 时应区分：

- Tool schema：Agent 能看到的参数和结果契约。
- Tool runtime：实际执行能力所在位置。
- Tool governance：审批、权限、边界和结果归档规则。

不要把 Tool 写成绕过 Session、权限或运行时治理的直接调用。

## 常见问题

### Tool 和 Skill 的关系是什么？

Skill 可以指导 Agent 如何使用一组 Tool，但 Skill 本身不是 Tool runtime。

### Tool 是否可以直接访问系统密钥？

文档不应这样描述。密钥应由对应 owner 管理，不进入 Agent 可见参数。

### Tool 调用失败应该如何记录？

具体错误结构以实现为准。未稳定前不要编造错误码。

## 相关文档

- [Skill](/docs/developer-guide/skill)
- [工具系统](/docs/architecture/tool-system)
