---
title: RuntimeConnection
status: planned
updated: 2026-07-05
unlisted: true
---

# RuntimeConnection

> 状态：规划中。

## 适用对象

本文适合准备接入外部执行环境的开发者。

## 这是什么

RuntimeConnection 是可运行的外部执行环境或执行体。它用于把命令环境、沙箱、远程运行时或其他执行能力纳入 xAgent 的治理边界。

## 什么时候使用

当 Tool 需要依赖外部执行环境，而不是在 xAgent 进程内完成时，可以考虑 RuntimeConnection。

## 基本用法

后续文档应补充：

- RuntimeConnection 的注册方式。
- 与 Tool runtime 的关系。
- 执行权限、文件访问和结果归档规则。
- 失败、中断和恢复行为。

## 相关文档

- [Runtime](/docs/architecture/runtime)
- [Tool](/docs/user-guide/tool)
