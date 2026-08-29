---
title: SSH Connector 配置：私钥、目标与访问身份
description: 安装 xAgent SSH Connector，把私钥放入 keys 目录，通过管理页面配置 SSH 目标、访问身份和主机指纹。
image: /img/user-guide/connectors/ssh-management-zh.webp
status: beta
updated: 2026-08-29
---

# SSH Connector 配置：私钥、目标与访问身份

SSH Connector 使用管理员配置的远端账号和私钥连接服务器。xAgent 用户只选择目标并填写 Connector 访问身份，不会看到主机地址、远端账号或私钥。

当前公开版本为 `0.0.8`。配置目标前，先把私钥放进 SSH Connector 的 `keys/` 目录。管理页面只填写文件名，不负责上传私钥。

## 安装

在 xAgent 服务器上重新运行安装器，并只选择 SSH Connector：

```bash
curl -fsSL https://downloads.xagent.xiagaogao.com/scripts/install.sh \
  | bash -s -- --yes --connectors ssh
```

| 内容 | Linux | macOS |
| --- | --- | --- |
| 配置文件 | `/opt/xagent/connectors/ssh/config.yml` | `~/.local/share/xagent/connectors/ssh/config.yml` |
| 私钥目录 | `/opt/xagent/connectors/ssh/keys/` | `~/.local/share/xagent/connectors/ssh/keys/` |
| 审计日志 | `/opt/xagent/connectors/ssh/logs/ssh-audit.jsonl` | `~/.local/share/xagent/connectors/ssh/logs/ssh-audit.jsonl` |
| 可执行文件 | `/usr/local/bin/xagent-ssh-connector` | `~/.local/bin/xagent-ssh-connector` |

Linux 会自动创建并启动 `xagent-ssh-connector` systemd 服务。macOS 需要按安装器输出启动。

## 把私钥放进 `keys/` 目录

私钥必须是 `config.yml` 同目录下 `keys/` 里的普通文件。不要在配置中填写任意绝对路径。

- 文件权限必须是 `0400` 或 `0600`。
- 文件不能是符号链接。
- `keys/` 目录不能允许 group 或 other 写入，建议使用 `0700`。
- `private_key` 只填写文件名，例如 `production_server`。
- 不要填写 `keys/production_server`，也不要填写绝对路径。
- 不要把 `.pub` 公钥当成私钥，更不要把私钥提交到 Git。

Linux：

```bash
sudo install -d -m 700 /opt/xagent/connectors/ssh/keys
sudo install -m 600 /secure/path/id_ed25519 \
  /opt/xagent/connectors/ssh/keys/production_server
sudo systemctl restart xagent-ssh-connector
```

macOS：

```bash
install -d -m 700 ~/.local/share/xagent/connectors/ssh/keys
install -m 600 /secure/path/id_ed25519 \
  ~/.local/share/xagent/connectors/ssh/keys/production_server
```

放好私钥后启动 Connector：

```bash
cd ~/.local/share/xagent/connectors/ssh
~/.local/bin/xagent-ssh-connector start --config ./config.yml
```

Connector 只在启动时读取 `config.yml` 和 `keys/`。新增或替换私钥后要重启；管理页面不会上传或热重载私钥。

## 接入 xAgent

管理员打开“控制台 → Connector 管理”，点击“添加 Connector”。

| 字段 | 填写内容 |
| --- | --- |
| Connector 地址 | 同机安装通常填写 `http://127.0.0.1:19095`；分开部署时填写 xAgent Server 可以访问的地址 |
| API Key | 安装器输出的 API Key，与 `ssh_connector.api_key` 一致 |

接入后应显示“在线”和协议 `4.3`。SSH Connector `0.0.5` 及以上会显示独立管理按钮。没有按钮时，先升级 Connector，并确认 API Key 不为空。

`19095` 只需要允许 xAgent Server 访问，不要直接开放到公网。

## 添加 SSH 目标

点击 SSH Connector 行末的管理按钮，进入目标管理页面。

![SSH Connector 目标列表和连接状态](/img/user-guide/connectors/ssh-management-zh.webp)

点击“添加目标”或“编辑”：

![SSH Connector 编辑目标和访问身份](/img/user-guide/connectors/ssh-edit-target-zh.webp)

| 字段 | 填写说明 |
| --- | --- |
| 资源 Key | 稳定且唯一，例如 `production_server` |
| 显示名 | 用户在“我的连接”中看到的名称 |
| 主机 | Connector Server 可以访问的 SSH 地址 |
| 端口 | 按实际服务填写，常用值为 `22` |
| 远端账号 | Connector 使用私钥登录远端服务器的账号 |
| 私钥文件 | `keys/` 目录中的文件名，例如 `production_server`；不能填写路径 |
| 用途说明 | 说明服务器用途，不要填写 token 或其他凭据 |
| Access Token 身份 | xAgent 用户连接时填写的 `principal + token`，同时用于审计归属 |
| 账号密码身份 | xAgent 用户连接时填写的本地账号密码身份，不是远端 SSH 密码 |

管理页面新增 token 时保存 SHA-256 摘要，新增密码时保存 bcrypt 摘要。编辑已有身份时，凭据留空表示保留原值。

保存目标后会立即重新探测。连接参数变化时，旧 SSH 连接、用户绑定和相关 PTY 会话会被关闭。

## 用户连接

管理员添加目标后，用户打开“我的连接”，选择 SSH Connector 和目标，再填写管理员分配的 principal 与 access token，或账号密码身份。

这些凭据只用于 Connector 身份认证和审计。远端 SSH 登录仍使用管理员配置的远端账号和 `keys/` 私钥。

建议先执行只读命令：

```text
列出我可以使用的 SSH 目标，然后在测试服务器执行 uname -a 和 pwd，不要修改文件。
```

SSH Connector 支持受限命令、交互式 PTY 和 SFTP 上传下载，当前不支持端口转发、跳板机、agent forwarding、键盘交互认证或任意 TCP 代理。

## 主机指纹

第一次连接时，Connector 会记录远端主机公钥的 `SHA256:` 指纹。以后指纹不一致，目标会进入 `host_key_changed`，不会自动信任新密钥。

只有通过其他渠道确认服务器确实更换了 SSH 主机密钥后，才能在编辑页面勾选“下次连接时信任新的主机密钥”。无法确认时不要清除旧指纹。

## 直接编辑配置文件

管理页面维护目标和访问身份。监听地址、API Key、状态目录、超时、文件限制和审计方式需要编辑 `config.yml`：

```yaml
ssh_connector:
  addr: 127.0.0.1:19095
  api_key: replace-with-a-long-random-system-api-key
  state_dir: /opt/xagent/connectors/ssh/state
  connect_timeout_seconds: 10
  exec_timeout_seconds: 30
  max_output_bytes: 1048576
  shell_idle_timeout_seconds: 900
  shell_buffer_bytes: 1048576
  max_file_bytes: 67108864
  file_ttl_seconds: 900
  audit_file: ./logs/ssh-audit.jsonl
  audit_shell_input: hash_only
  targets:
    - resource_key: production_server
      label: 生产服务器
      description: 受控运维目标
      host: 10.0.0.20
      port: 22
      remote_username: deploy
      private_key: production_server
      access:
        tokens:
          - principal: operator
            token_hash: sha256:replace-with-64-hex-characters
```

直接编辑 `config.yml` 或替换 `keys/` 文件后需要重启：

```bash
sudo systemctl restart xagent-ssh-connector
sudo systemctl status xagent-ssh-connector
```

`audit_shell_input` 可设为 `full`、`hash_only` 或 `none`。Shell 输入可能包含敏感内容，生产环境通常使用 `hash_only` 或 `none`。

## 常见问题

| 状态或现象 | 处理方法 |
| --- | --- |
| `invalid_config` | 检查私钥是否在 `keys/`、配置是否只写文件名、文件是否为普通文件且权限为 `0400` 或 `0600` |
| `auth_failed` | 检查远端账号、公钥是否已加入 `authorized_keys`，以及 SSH Server 是否允许公钥认证 |
| `unreachable` | 从 Connector Server 检查地址、端口、防火墙、路由和 SSH 服务 |
| `host_key_changed` | 先核验主机密钥变化，确认后再选择信任新密钥 |
| 用户无法连接 | 检查用户填写的是 Connector principal/token 或本地账号密码，不是远端 SSH 密码 |
| 更换私钥后仍未生效 | 重启 SSH Connector；`keys/` 不支持热重载 |
| 没有管理按钮 | 升级到 `0.0.5` 以上，并确认使用配置文件启动且 API Key 非空 |

Linux 日志：

```bash
journalctl -u xagent-ssh-connector -f
sudo tail -f /opt/xagent/connectors/ssh/logs/ssh-audit.jsonl
```

## 相关文档

- [Connector 总览](/docs/user-guide/connector)
- [Database Connector 配置](/docs/user-guide/database-connector)
- [开始安装 xAgent](/docs/getting-started/install)
- [Tool 管理](/docs/user-guide/tool)
- [审批策略](/docs/user-guide/approval-policy)
