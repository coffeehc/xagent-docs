---
title: 系统配置页面
description: xAgent 模型、系统、软件授权和 Agent 角色配置页面说明与界面图例。
status: beta
updated: 2026-09-17
---

# 系统配置页面

系统配置页面仅管理员可见。这里的修改会影响所有用户或服务运行，应在保存前核对作用范围。

## 模型配置

**菜单路径：** 系统配置 > 模型配置

**可见范围：** 管理员

![xAgent 模型配置页面，显示 Provider、模型能力、默认状态和操作入口](/img/manual/v005/zh/admin-models.webp)

模型配置维护 Agent 可以选择的上游模型：

- 新建模型并选择 Provider 协议。
- 配置 Base URL、API Key、真实模型名、请求头和超时。
- OpenAI 兼容 Provider 可从 `/api/models` 选择模型，或手工填写模型 ID；可配置上下文上限、最大输出、推理强度和思考参数。
- 声明聊天、生成图片、工具调用、视觉、音频和文件能力。
- 测试连接后保存，并设置一个默认模型。

完整说明见 [模型配置](/docs/user-guide/model-config)。

## 系统配置

**菜单路径：** 系统配置 > 系统配置

**可见范围：** 管理员

![xAgent 系统配置页面，显示监听地址、运行目录、超时和系统邮箱](/img/manual/v005/zh/admin-system-config.webp)

系统配置维护服务级基础参数：

- 查看监听地址和只读运行根目录。
- 调整 LLM 单次会话超时。
- 配置系统发信邮箱、SMTP Host、TLS 和密码。
- 保存后按页面提示判断是否需要重启服务。

## 软件授权

**菜单路径：** 系统配置 > 软件授权

**可见范围：** 管理员

![xAgent 软件授权页面，显示设备、授权状态、范围和更新入口](/img/manual/v005/zh/admin-license.webp)

没有安装企业授权证书时，xAgent 直接使用免费版。页面会显示免费版状态和固定额度：2 个用户、30 个会话、1 个 WorkGroup、5 个 AgentPlugin VChannel 和 5 个定时任务；免费版没有证书有效期。

安装企业版证书后，可以在这里查看设备 ID、授权编号、客户、签发时间、过期时间和数量权益。使用“更新 license”上传新的企业授权文件。

企业授权还可能设置允许的最高 xAgent 版本和 A2A 连接容量。升级到 `v0.0.20.beta` 前应检查版本上限；A2A 额度与 AgentPlugin Channel 额度分开计算。

## 文件分享策略

**菜单路径：** 存储管理 > 文件分享（管理员）

外链默认关闭。管理员可设为仅允许 xAgent 产物或所有受管文件，并限制默认与最长有效期、原文件下载和公开 Base URL。只有保存策略并配置可访问的 HTTPS 域名后，用户才能按策略[创建限时分享](/docs/user-guide/file-sharing)。

## Agent 角色配置

**菜单路径：** 系统配置 > Agent 角色配置

**可见范围：** 管理员

![xAgent Agent 角色配置页面，显示主 Agent、编排、索引和摘要角色](/img/manual/v005/zh/admin-agent-roles.webp)

Agent 角色配置维护系统内部固定执行角色：

- 主 Agent 负责正常会话、任务推进和工具循环。
- 编排 Agent 负责补齐子 Agent 蓝图。
- 索引 Agent 负责索引构建方法。
- 摘要 Agent 负责摘要和上下文压缩。
- 每个角色可配置模型、输出格式、流式开关和请求策略；修改前应保留可回退配置。
