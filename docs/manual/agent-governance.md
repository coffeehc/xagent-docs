---
title: Agent 治理页面
description: xAgent 管理员侧智能体、审批、Skill、Tool、Connector、MCP 和执行环境页面说明与图例。
status: beta
updated: 2026-07-27
---

# Agent 治理页面

Agent 治理页面仅管理员可见，负责全局能力、执行边界和公共资源。

## 智能体管理

**菜单路径：** Agent 治理 > 智能体管理

**可见范围：** 管理员

![xAgent 管理员智能体管理页面，显示定义来源、描述和操作入口](/img/manual/v005/zh/admin-agent-definitions.webp)

管理员在这里维护内置、公共和系统范围的智能体定义：

- 查看定义来源、角色说明和能力依赖。
- 新建、编辑、沉淀或查看智能体定义。
- 公共智能体供用户选择，个人智能体仍由各自用户管理。

## 审批策略

**菜单路径：** Agent 治理 > 审批策略

**可见范围：** 管理员

![xAgent 管理员审批策略页面，显示风险规则和策略配置](/img/home/v005/xagent-security-policy-zh.webp)

审批策略定义整个系统的动作控制底线：

- 配置风险等级对应的放行、确认或拒绝策略。
- 对具体工具和动作设置全局规则。
- 管理员强制规则优先于用户个人策略。

## Skill 管理

**菜单路径：** Agent 治理 > Skill 管理

**可见范围：** 管理员

![xAgent 管理员 Skill 管理页面，显示全局 Skill、来源和状态](/img/home/v005/xagent-skill-tool-zh.webp)

管理员 Skill 管理用于治理内置和公共 Skill：

- 搜索、查看、校验和维护 Skill 资源。
- 管理公共发布、审核状态和更新。
- 检查 Skill 是否声明了需要的工具、资源和安全边界。

## Tool 管理

**菜单路径：** Agent 治理 > Tool 管理

**可见范围：** 管理员

![xAgent Tool 管理页面，显示工具来源、风险、状态和治理操作](/img/manual/v005/zh/admin-tools.webp)

Tool 管理汇总系统可以发现的全部工具：

- 按工具名、来源、风险和状态筛选。
- 查看参数协议、权限、审批要求和不可用原因。
- 管理工具是否进入用户可发现和可执行范围。

## Connector 管理

**菜单路径：** Agent 治理 > Connector 管理

**可见范围：** 管理员

![xAgent Connector 管理页面，显示软件版本、协议、在线状态和操作入口](/img/home/v005/xagent-connectors-zh.webp)

Connector 管理维护系统安装的连接器实例：

- 查看软件版本、协议版本、在线状态和更新提示。
- 添加 Connector，编辑地址和认证配置。
- 刷新运行状态，查看详情或移除不再使用的实例。

安装说明见[连接器使用手册](/docs/user-guide/connector)。

## MCP 配置

**菜单路径：** Agent 治理 > MCP 配置

**可见范围：** 管理员

![xAgent MCP 配置页面，显示服务、协议、工具数和地址](/img/manual/v005/zh/admin-mcp.webp)

MCP 配置维护系统范围的 MCP 服务：

- 新建服务并选择传输协议。
- 查看健康状态、发现到的工具数和服务地址。
- 编辑或删除配置后，检查用户侧“我的 MCP”和工具列表是否同步。

## 执行环境

**菜单路径：** Agent 治理 > 执行环境

**可见范围：** 管理员

![xAgent 执行环境页面，显示沙箱后端、托管运行时和宿主适配器状态](/img/manual/v005/zh/admin-file-processing.webp)

执行环境页展示任务进程实际依赖的运行条件：

- 顶部汇总沙箱后端、托管运行时和宿主适配器数量。
- 列表显示 Python、Node.js、CLI 隔离等能力的来源和就绪状态。
- “刷新探测”重新检查 ProcessSandbox 和 Runtime Assets。
- 必要执行环境未就绪时，依赖能力保持不可用，不回退到无隔离执行。
