---
title: "xAgent 文档导航与使用手册"
description: "按了解产品、第一次使用、日常工作、进阶能力、部署治理和排错六条路径阅读 xAgent 文档，也可按角色和控制台页面查找完整操作说明。"
status: beta
updated: 2026-10-01
schemaType: CollectionPage
---

import DocsJourney from '@site/src/components/DocsJourney';

# xAgent 使用手册

先选你要完成的事，不必从头读完所有概念。已有账号的用户可以直接做第一个任务；负责部署的人先走安装与模型验证。下方继续保留完整的角色索引、页面目录和通用操作说明。

<DocsJourney />

<div className="alert alert--info margin-bottom--lg" role="note">

**版本与界面怎么对照**

公开二进制发行版已更新到 `v0.0.21.beta`（2026-09-22）。本轮文档同时核对了 2026-10-01 的源码；超出公开发行版的行为会单独注明，不能仅凭文档日期判断自己的部署已支持。先运行 `xagent version` 或查看软件授权页，再核对[更新日志](/docs/changelog)。页面、角色、已安装工具与外部授权仍以当前部署为准。

</div>

## 怎么使用本手册 {/* #怎么使用本手册 */}

| 你的身份 | 建议先看 | 说明 |
| --- | --- | --- |
| 普通用户 | [工作台](/docs/manual/workspace) | 从仪表板、Agent 会话和工作区文件开始 |
| 需要配置进阶能力的用户 | [运行治理](/docs/manual/operations) | 管理触发器、智能体、Skill、Tool、MCP、连接和密钥 |
| 管理员 | [用户管理](/docs/manual/user-management)、[统计分析](/docs/manual/analytics)、[Agent 治理](/docs/manual/agent-governance)、[系统配置](/docs/manual/system-configuration) | 负责全局资源、执行环境和系统配置 |

![2026-10-01 实际核对的产品界面](/img/home/current/xagent-launch-session.webp)

从会话看到可检查的文件：当次首发包演示，经人工检查和补充指令完成。中文界面，示例内容用于产品展示。

<details>
<summary>查看保留的旧版界面参考</summary>

![旧版控制台仪表板功能图例](/img/home/v005/xagent-dashboard-zh.webp)
</details>

> **图例说明**
>
> 旧版截图来自真实控制台，保留用于说明页面功能和信息结构，不作为当前按钮位置的依据。邮箱、会话标识、任务标题、连接目标、内网地址、运行目录和授权信息等环境专属数据已经脱敏；具体布局会随版本与角色变化。当前源码的用户端与管理后台已分离；旧版“高级模式”分组不代表当前菜单的通用开关。
>
> 中文版手册使用中文界面图例；英文版手册单独使用英文界面图例，两套旧版图片不复用。新增的当次真实操作证据会注明界面语言；没有当前权限的管理员页面仍保留并标注旧图。

## 页面目录 {/* #页面目录 */}

### 智能体能力 {/* #智能体能力 */}

- [v0.0.20 的 54 项 Skill 清单、任务与文件范围](/docs/manual/capabilities)

### 工作台 {/* #工作台 */}

- [仪表板、Agent 会话、工作区文件、文件分享、会话列表](/docs/manual/workspace)

### 运行治理 {/* #运行治理 */}

- [审批、触发器、智能体、Skill、Tool、MCP、插件连接、A2A 与密钥](/docs/manual/operations)

### 个人设置 {/* #个人设置 */}

- [账号管理与个人审批策略](/docs/manual/personal-settings)

### 管理员页面 {/* #管理员页面 */}

- [用户账号与用户组](/docs/manual/user-management)
- [Token 统计与系统监控](/docs/manual/analytics)
- [Agent 治理](/docs/manual/agent-governance)
- [系统配置](/docs/manual/system-configuration)

## 通用页面结构 {/* #通用页面结构 */}

1. 用户设置区按工作台、运行治理、个人设置分组；当前源码的管理员功能位于独立管理后台。旧版曾把管理员分组放在同一侧栏。
2. 顶部栏显示面包屑、界面语言、帮助入口和当前账号。
3. 页面标题下方通常是搜索、筛选、刷新和新建操作。
4. 表格或卡片展示当前资源；右侧操作列进入详情、编辑、启停或删除。
5. 左侧菜单收起时只显示图标，悬停可以查看名称，点击顶部菜单按钮可展开。

需要先确认 xAgent 能做什么、能处理哪些文件，请阅读[支持的智能体功能](/docs/manual/capabilities)。需要深入了解任务写法、长任务或快捷指令时，继续阅读侧栏“日常工作”和“进阶能力”中的对应页面。
