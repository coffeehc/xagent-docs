---
title: Runtime
status: planned
updated: 2026-07-05
unlisted: true
---

# Runtime

> 状态：规划中。

## 适用对象

本文适合需要理解 xAgent 执行环境边界的开发者。

## 这是什么

Runtime 表示 Tool 或任务执行所依赖的运行环境。它可以是本地命令环境、受控沙箱、远程执行环境或其他可治理执行体。

## 什么时候使用

当某个能力需要运行代码、命令或外部程序时，应明确 Runtime 边界。

## 基本用法

后续文档应补充：

- RuntimeConnection 如何注册。
- Tool 如何选择 runtime。
- 输入、输出、文件和权限边界。
- 中断、失败和清理规则。

## 常见问题

### Runtime 是否直接暴露给用户？

不一定。用户通常通过 Task 或 Tool 间接使用 runtime。

### Runtime 是否等同于 Workspace？

不是。Workspace 关注文件和上下文空间，Runtime 关注执行环境。

### Runtime 是否已经稳定？

当前文档只保留概念位置。

## 相关文档

- [RuntimeConnection](/docs/developer-guide/runtime-connection)
- [Tool](/docs/user-guide/tool)
