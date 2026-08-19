---
title: xAgent 使用手册
description: 按当前 xAgent 控制台菜单查找页面说明、权限范围、关键区域和常用操作，覆盖普通用户、高级模式与管理员页面。
status: beta
updated: 2026-08-19
schemaType: CollectionPage
---

# xAgent 使用手册

本手册对应 `v0.0.11.beta` 控制台，按页面而不是概念组织内容。每个页面都说明菜单入口、可见范围、关键区域和常用操作，并提供界面图例。

## 怎么使用本手册

| 你的身份 | 建议先看 | 说明 |
| --- | --- | --- |
| 普通用户 | [工作台](/docs/manual/workspace) | 从仪表板、Agent 会话和工作区文件开始 |
| 开启高级模式的用户 | [运行治理](/docs/manual/operations) | 管理触发器、智能体、Skill、Tool、MCP、连接和密钥 |
| 管理员 | [用户管理](/docs/manual/user-management)、[统计分析](/docs/manual/analytics)、[Agent 治理](/docs/manual/agent-governance)、[系统配置](/docs/manual/system-configuration) | 负责全局资源、执行环境和系统配置 |

![xAgent 当前控制台仪表板图例](/img/home/v005/xagent-dashboard-zh.webp)

> **图例说明**
>
> 截图来自真实控制台，用于说明页面功能和信息结构。邮箱、会话标识、任务标题、连接目标、内网地址、运行目录和授权信息等环境专属数据已经脱敏；具体布局可能随版本、角色和高级模式设置变化。
>
> 中文版手册使用中文界面图例；英文版手册单独使用英文界面图例，两套图片不复用。

## 页面目录

### 智能体能力

- [51 个内置 Skill、可完成的任务与文档处理范围](/docs/manual/capabilities)

### 工作台

- [仪表板、Agent 会话、工作区文件、会话列表](/docs/manual/workspace)

### 运行治理

- [审批、触发器、智能体、Skill、Tool、MCP、连接与密钥](/docs/manual/operations)

### 个人设置

- [账号管理与个人审批策略](/docs/manual/personal-settings)

### 管理员页面

- [用户账号与用户组](/docs/manual/user-management)
- [Token 统计与系统监控](/docs/manual/analytics)
- [Agent 治理](/docs/manual/agent-governance)
- [系统配置](/docs/manual/system-configuration)

## 通用页面结构

1. 左侧菜单按工作台、运行治理、个人设置和管理员功能分组。
2. 顶部栏显示面包屑、界面语言、帮助入口和当前账号。
3. 页面标题下方通常是搜索、筛选、刷新和新建操作。
4. 表格或卡片展示当前资源；右侧操作列进入详情、编辑、启停或删除。
5. 左侧菜单收起时只显示图标，悬停可以查看名称，点击顶部菜单按钮可展开。

需要先确认 xAgent 能做什么、能处理哪些文件，请阅读[支持的智能体功能](/docs/manual/capabilities)。需要深入了解任务写法、长任务或快捷指令时，继续阅读“功能详解”中的对应页面。
