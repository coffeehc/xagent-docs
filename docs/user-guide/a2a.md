---
title: A2A Client 与远端 Agent
description: 配置用户级远端 Agent，发现 Agent Card，发送、回复或取消任务并查看收件箱。
status: beta
updated: 2026-09-17
---

# A2A Client 与远端 Agent

从 `v0.0.16.beta` 起，xAgent 提供用户级 A2A Client。打开“运行治理 > A2A”管理远端 Agent 和任务；A2A 不是本机 AgentPlugin，也不等于把远端 Agent 加进当前用户工作区。

## 添加远端 Agent

1. 在 A2A 页面添加远端 Agent，填写对方提供的 Agent Card 地址，发起发现并检查 Card 的名称与能力。
2. 根据远端服务要求配置 API Key、Bearer 或已有 OAuth bearer token，保存连接。凭据属于远端访问边界，不要粘贴到会话正文或文档中。
3. 只有连接可用、认证正确且企业授权容量允许时，才能正常发起远端任务。

支持 A2A v1 JSON-RPC 与 HTTP+JSON。具体可用能力以远端 Card 和对端实现为准。

## 任务与结果

从 A2A 页面选择远端 Agent 并发送任务。已发任务可查询或刷新状态；远端要求补充输入时可以回复，未结束时可尝试取消。非终态任务优先通过流式更新，必要时回退轮询，服务重启后继续监控。

远端 Message、Artifact、状态与错误进入不可变收件箱。若任务来自某个 Session，可操作或终态结果会回投来源 Session；仍应在任务详情核对远端执行结果和错误。管理员可查看 A2A 容量与运行统计；它与 AgentPlugin Channel 的额度是不同权益。

相关文档：[Agent 会话](/docs/user-guide/agent-session) · [AgentPlugin](/docs/user-guide/connector) · [更新日志](/docs/changelog)
