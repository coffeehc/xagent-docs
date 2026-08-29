---
title: Database Connector 配置：连接 MySQL 与 PostgreSQL
description: 安装 xAgent Database Connector，通过管理页面添加 MySQL 和 PostgreSQL 数据库，并完成用户连接与故障排查。
image: /img/user-guide/connectors/database-management-zh.webp
status: beta
updated: 2026-08-29
---

# Database Connector 配置：连接 MySQL 与 PostgreSQL

Database Connector 由管理员配置数据库地址，用户再用自己的数据库账号连接。数据库地址和登录凭据保留在 Connector Server 内，不会作为工具参数发送给模型。

当前公开版本为 `0.0.6`，支持 MySQL 和 PostgreSQL。

## 安装

在 xAgent 服务器上重新运行安装器，并只选择 Database Connector：

```bash
curl -fsSL https://downloads.xagent.xiagaogao.com/scripts/install.sh \
  | bash -s -- --yes --connectors database
```

安装器会保留已有配置，并在结束时打印 Connector 地址和 API Key。

| 内容 | Linux | macOS |
| --- | --- | --- |
| 配置文件 | `/opt/xagent/connectors/database/config.yml` | `~/.local/share/xagent/connectors/database/config.yml` |
| 状态目录 | `/opt/xagent/connectors/database/state` | `~/.local/share/xagent/connectors/database/state` |
| 可执行文件 | `/usr/local/bin/xagent-database-connector` | `~/.local/bin/xagent-database-connector` |

Linux 会自动创建并启动 `xagent-database-connector` systemd 服务。macOS 需要按安装器输出启动：

```bash
cd ~/.local/share/xagent/connectors/database
~/.local/bin/xagent-database-connector start --config ./config.yml
```

## 接入 xAgent

管理员打开“控制台 → Connector 管理”，点击“添加 Connector”。

| 字段 | 填写内容 |
| --- | --- |
| Connector 地址 | 同机安装通常填写 `http://127.0.0.1:19094`；分开部署时填写 xAgent Server 可以访问的地址 |
| API Key | 安装器输出的 API Key，与 `database_connector.api_key` 一致 |

接入后应显示“在线”和协议 `4.3`。Database Connector `0.0.4` 及以上会显示独立管理按钮。没有按钮时，先升级 Connector，并确认 API Key 不为空。

`19094` 只需要允许 xAgent Server 访问，不要直接开放到公网。

## 添加数据库

点击 Database Connector 行末的管理按钮，进入数据库资源页面。

![Database Connector 数据库资源列表](/img/user-guide/connectors/database-management-zh.webp)

点击“添加数据库”：

![Database Connector 添加数据库对话框](/img/user-guide/connectors/database-add-resource-zh.webp)

| 字段 | 填写说明 |
| --- | --- |
| 资源 ID | 稳定且唯一，例如 `business_mysql`；保存后会作为 `resource_key` 和 `database_id` 使用 |
| 显示名 | 用户在“我的连接”中看到的名称 |
| 类型 | `MySQL` 或 `PostgreSQL` |
| 数据库名 | 目标实例内的实际数据库名 |
| 主机 | Connector Server 可以访问的数据库地址 |
| 端口 | 按实际服务填写；MySQL 常用 `3306`，PostgreSQL 常用 `5432` |
| 用途说明 | 说明数据库用途，不要填写用户名、密码或其他凭据 |

保存后立即生效，不需要重启 Connector：

- 新增资源会进入用户可选列表。
- 修改显示名或用途不会重建已有连接。
- 修改主机、端口、数据库名或类型会重新连接目标。
- 删除资源会关闭对应连接，并清理 Connector Server 保存的用户凭据。

## 用户连接

管理员添加资源后，用户打开“我的连接”，选择 Database Connector 和数据库资源，再填写自己的数据库用户名和密码。

一个用户可以连接多个数据库。再次连接同一资源会替换旧凭据。SQL 是否可执行由数据库账号本身的权限决定，Connector 不会提升权限。

建议先用只读任务验证：

```text
列出我已连接的数据库，然后读取业务数据库的表结构，不要修改数据。
```

Database Connector 提供 `db_list`、`db_getinfo` 和 `db_execute_sql`。生产环境应使用最小权限数据库账号；只读场景直接使用数据库原生的只读账号或角色。

用户凭据保存在 Connector 的 `state_dir/credentials.json`。目录权限为 `0700`，文件权限为 `0600`，当前没有应用层加密，生产环境应把状态目录放在加密磁盘或受控 volume 中。

## 直接编辑配置文件

管理页面只修改 `database_connector.databases`。监听地址、API Key、状态目录和查询限制需要编辑 `config.yml`：

```yaml
database_connector:
  addr: 127.0.0.1:19094
  api_key: replace-with-a-long-random-system-api-key
  state_dir: /opt/xagent/connectors/database/state
  query_timeout_seconds: 30
  max_rows: 500
  max_result_bytes: 1048576
  databases:
    - id: business_mysql
      display_name: 业务数据库
      description: 核心业务数据
      database_name: business
      host: 10.0.0.10
      port: 3306
      type: mysql
```

Connector 不监听手工文件变化。直接修改 `config.yml` 后需要重启：

```bash
sudo systemctl restart xagent-database-connector
sudo systemctl status xagent-database-connector
```

## 常见问题

| 现象 | 处理方法 |
| --- | --- |
| Connector 离线 | 检查服务、`19094` 监听、网络和 API Key |
| 没有管理按钮 | 升级到 `0.0.4` 以上，并确认使用配置文件启动且 API Key 非空 |
| 新资源没有出现在“我的连接” | 确认保存成功、Connector 在线，然后刷新 Connector Card 和用户页面 |
| 用户认证失败 | 从 Connector Server 检查数据库网络、数据库名、用户名和密码 |
| SQL 被拒绝 | 查看数据库返回的权限或 SQL 错误，调整数据库账号或 SQL |
| 手工修改配置后没有变化 | 重启 Connector；只有管理页面保存的资源会立即应用 |

Linux 日志：

```bash
journalctl -u xagent-database-connector -f
```

## 相关文档

- [Connector 总览](/docs/user-guide/connector)
- [SSH Connector 配置](/docs/user-guide/ssh-connector)
- [开始安装 xAgent](/docs/getting-started/install)
- [Tool 管理](/docs/user-guide/tool)
- [审批策略](/docs/user-guide/approval-policy)
