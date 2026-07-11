---
title: Config
status: stable
updated: 2026-07-05
unlisted: true
---

# Config

## 适用对象

本文适合需要理解 xAgent 最小配置项的用户和维护者。

## 这是什么

Config 记录 xAgent 运行配置。当前页面只列已核对的常用字段，不替代完整配置源码。

## 什么时候使用

当后端服务无法启动、前端无法连接、模型请求超时、邮件能力不可用或安全密钥需要调整时，先检查配置。

## 基本用法

常见字段：

| 字段 | 用途 |
| --- | --- |
| `server_addr` | 后端 HTTP 服务监听地址 |
| `root_dir` | xAgent 运行根目录 |
| `llm.request_timeout_seconds` | 单次 LLM 请求超时时间 |
| `security.access_token_secret` | Access Token 签名密钥 |
| `security.secret_master_key` | 用户 Secret 静态加密主密钥 |
| `security.access_token_ttl_seconds` | Access Token 有效期 |
| `security.refresh_token_ttl_seconds` | Refresh Token 有效期 |
| `xagent_email.*` | 系统邮件发信配置 |
| `runtime.server_runtime.*` | 托管运行时连接配置 |

注意：

- 不要把真实 token、密码或密钥写入文档、截图或公开仓库。
- `root_dir` 会影响运行数据、模型配置、用户文件和系统资源位置。
- 修改监听地址后，前端代理或访问地址也要同步检查。
- 邮件、模型、Connector 等能力还可能有各自页面或用户级配置。

## 常见问题

### 为什么不列出 config.yml 的所有字段？

使用手册只列用户高频字段。完整字段应以当前代码和配置管理页面为准。

### 可以把真实密钥作为示例吗？

不可以。示例只能使用占位值。

## 相关文档

- [Testing](/docs/developer-guide/testing)
