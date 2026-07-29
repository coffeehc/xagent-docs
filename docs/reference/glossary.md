---
title: 术语表
status: stable
updated: 2026-07-27
unlisted: true
---

# 术语表

## 适用对象

本文适合所有 xAgent 文档作者和读者。

## 这是什么

术语表是 xAgent 文档的固定用词来源。新增术语必须同步更新本文。

## 核心术语

| 术语 | 固定含义 |
| --- | --- |
| Agent | 负责理解目标、规划、调度工具和反馈的主体 |
| Task | Agent 执行的目标单元 |
| Tool | 可被 Agent 调用的最小外部能力 |
| Skill | 一组可复用的任务方法、约束和工具使用规范 |
| Connector | 连接外部系统的协议桥和能力声明来源 |
| RuntimeConnection | 可运行的外部执行环境或执行体 |
| ProcessSandbox | 执行不受信任进程的平台隔离边界，负责文件挂载、环境、进程树和资源限制 |
| Runtime Assets | 由 xAgent 独立安装和校验、以只读方式提供给 ProcessSandbox 的执行依赖 |
| Execution Lease | WorkspaceFileService 为一次进程执行提供的最小文件视图、重叠写入协调和文件变化提交能力 |
| Memory | 面向长期上下文的记忆系统 |
| SubAgent | 面向长任务的独立执行单元 |
| Session | 用户与 Agent 的一次交互上下文 |
| Workspace | Agent 执行任务时使用的文件、上下文和中间产物空间 |
| 触发器 | 把未来时间或外部事件转换成 Session 任务的机制 |

## 什么时候使用

所有使用手册、技术参考和维护说明都应使用本文术语。用户手册中可以使用中文说明，但核心术语含义不能漂移。

## 基本用法

写文档时：

- 不随意创造同义词。
- 不把规划能力写成已实现能力。
- 新增术语时同步本文和相关文档。
- 普通用户页面优先解释“怎么用”，技术参考页再解释内部边界。

## 相关文档

- [核心概念](/docs/getting-started/core-concepts)
