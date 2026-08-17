---
title: 功能导览与菜单入口
description: 了解当前 xAgent 控制台的信息架构、简洁与高级模式，以及普通用户和管理员的主要菜单入口。
status: stable
updated: 2026-08-17
---

# 功能导览与菜单入口

如需按当前控制台逐页查找入口、可见范围、操作说明和界面图例，请使用 [xAgent 使用手册](/docs/manual/overview)。

## 适用对象

本文适合第一次进入 xAgent 控制台，希望先知道“有哪些功能、从哪里进入、为什么有些菜单看不到”的用户和管理员。

## 当前界面结构

当前控制台延续并继续演进了 `v0.0.5.beta` 开始的信息架构：统一品牌、排版密度、页面层级、响应式布局，以及列表、对话框与侧边抽屉的交互。会话页集中展示消息时间线、附件、Tool 调用状态和工作区入口，支持桌面端与窄屏连续使用。

侧边栏现在按职责分组，不再把偏好设置、主题设置和邮箱管理分别作为独立菜单。账号信息、界面主题和显示密度统一放在“账号管理”中；多套界面配色已取消。

> 改版前的截图不再放在本文中，以免页面结构和按钮位置误导当前版本用户。请以当前部署界面和[xAgent 使用手册](/docs/manual/overview)为准。

## 简洁模式与高级模式

管理员可以为每个用户控制是否启用高级功能。简洁模式保留完成日常任务所需的入口，高级模式再显示编排和能力管理页面。

| 模式 | 默认可见入口 |
| --- | --- |
| 简洁模式 | 仪表板、Agent会话、工作区文件、审批、我的连接、密钥管理、账号管理 |
| 高级模式 | 在简洁模式基础上增加会话列表、触发器管理、智能体管理、Skill 管理、我的工具、我的 MCP、个人审批策略 |

管理员专用分组是否显示由管理员角色决定，不受个人高级模式开关影响。

## 常用路径

| 想做什么 | 打开哪个菜单 | 说明 |
| --- | --- | --- |
| 提交任务、上传材料、查看执行过程 | [Agent会话](/docs/user-guide/agent-session) | 日常工作的主要入口 |
| 查看上传文件、生成文件和最终产物 | [工作区文件](/docs/user-guide/workspace) | 预览、下载或继续引用工作区文件 |
| 查找和管理历史对话 | 会话列表 | 高级模式入口，可搜索主会话和子会话 |
| 查看需要人工确认的动作 | 审批 | 查看审批内容、风险等级和关联会话 |
| 让任务定时或由外部事件启动 | [触发器管理](/docs/user-guide/trigger) | 高级模式入口 |
| 管理个人智能体、Skill、Tool 或 MCP | 智能体管理、Skill 管理、我的工具、我的 MCP | 高级模式入口 |
| 绑定微信、Telegram、飞书等消息渠道 | [我的连接](/docs/user-guide/connector) | 简洁模式也会保留 |
| 保存 API Key 和外部系统 token | 密钥管理 | 简洁模式也会保留 |

## 工作台

| 菜单 | 用途 |
| --- | --- |
| 仪表板 | 查看 Token 使用、会话状态、等待审批和最近会话 |
| [Agent会话](/docs/user-guide/agent-session) | 输入任务、上传附件、查看执行状态并继续追问 |
| [工作区文件](/docs/user-guide/workspace) | 浏览业务空间、会话产物、上传文件和个人 Skill 文件 |
| 会话列表 | 高级模式下统一搜索和管理主会话、子会话 |

第一次使用时从 Agent会话 开始。任务涉及文件时再进入工作区文件，需要查找历史时进入会话列表。

## 运行治理

| 菜单 | 可见条件 | 用途 |
| --- | --- | --- |
| 审批 | 所有用户 | 查看当前用户相关的敏感动作审批 |
| [触发器管理](/docs/user-guide/trigger) | 高级模式 | 创建、启停或手动运行长期触发器 |
| [智能体管理](/docs/user-guide/agent-management) | 高级模式 | 管理个人和公共智能体入口 |
| [Skill 管理](/docs/user-guide/skill) | 高级模式 | 使用公共 Skill，创建和维护个人 Skill |
| [我的工具](/docs/user-guide/tool) | 高级模式 | 查看当前用户可用工具、来源和状态 |
| 我的 MCP | 高级模式 | 接入个人 MCP 服务并发现工具 |
| [我的连接](/docs/user-guide/connector) | 所有用户 | 绑定外部账号，查看认证、通道和工具状态 |
| 密钥管理 | 所有用户 | 保存当前用户的 workspace secret |

普通用户不需要理解底层协议。审批负责风险控制，触发器负责自动启动任务，Skill 与 Tool 扩展执行能力，连接器与密钥负责接入外部系统。

## 个人设置

| 菜单 | 可见条件 | 用途 |
| --- | --- | --- |
| 账号管理 | 所有用户 | 管理账号资料、交互偏好、界面主题和显示密度等个人设置 |
| [个人审批策略](/docs/user-guide/approval-policy) | 高级模式 | 维护当前账号的审批覆盖规则 |

## 用户管理

以下菜单只对管理员显示：

| 菜单 | 用途 |
| --- | --- |
| 用户账号 | 管理本地账号、角色、用户组和每个用户的高级功能开关 |
| 用户组 | 管理用于授权和数据隔离的本地用户组 |

企业账号入口当前仍隐藏，不作为当前版本的可用功能说明。

## 统计分析

以下菜单只对管理员显示：

| 菜单 | 用途 |
| --- | --- |
| Token 统计 | 按用户查看模型 Token 使用情况 |
| 系统监控 | 查看服务运行和资源状态 |

## Agent 治理

以下菜单只对管理员显示，用于维护系统级能力：

| 菜单 | 用途 |
| --- | --- |
| [智能体管理](/docs/user-guide/agent-management) | 管理系统级智能体定义 |
| [审批策略](/docs/user-guide/approval-policy) | 管理系统级审批规则 |
| [Skill 管理](/docs/user-guide/skill) | 管理公共 Skill 和提交审批 |
| [Tool 管理](/docs/user-guide/tool) | 管理系统工具、来源、状态和输入输出合同 |
| [Connector 管理](/docs/user-guide/connector) | 管理系统级 Connector catalog、Card、health 和工具声明 |
| MCP 配置 | 管理全局 MCP 服务 |
| 执行环境 | 查看和检测服务端 Runtime Assets 与执行环境组件 |

## 系统配置

以下菜单只对管理员显示：

| 菜单 | 用途 |
| --- | --- |
| [模型配置](/docs/user-guide/model-config) | 管理模型和 provider 连接信息 |
| 系统配置 | 管理系统级配置字段 |
| 软件授权 | 查看版本、用户数量限制和授权状态 |
| Agent 角色配置 | 管理主执行、子 Agent、索引、摘要和压缩等固定角色配置 |

## 相关文档

- [Agent会话](/docs/user-guide/agent-session)
- [工作区](/docs/user-guide/workspace)
- [连接器](/docs/user-guide/connector)
- [Skill 管理](/docs/user-guide/skill)
- [Tool 管理](/docs/user-guide/tool)
- [审批策略](/docs/user-guide/approval-policy)

## 下一步操作

- [在 Agent 会话中完成第一个任务](/docs/getting-started/first-task)
- [上传并管理工作区文件](/docs/user-guide/workspace)
- [创建或更新个人 Skill](/docs/getting-started/create-skill)
