---
title: Connector 安装
description: 了解如何下载、配置并运行 xAgent Connector，以及默认地址、API Key、config.yml 和服务端接入流程。
status: beta
updated: 2026-07-11
---

# Connector 安装

## 这是什么

Connector 是连接器服务，用于把微信、邮件、企业系统或第三方入口接入 xAgent。和 MCP 不同，连接器可以主动接收外部消息，并把消息或事件投递到 xAgent 的目标会话中。

连接器不是每个用户电脑上的客户端。它通常和 xAgent 一样部署在服务器端，长期在线运行，并负责维护外部系统登录态、消息入口、健康状态和可用动作。

## 什么时候需要安装 Connector

如果只是通过 Web 页面使用 xAgent，不一定需要安装 Connector。

当你希望下面这些能力可用时，再部署对应连接器：

- 通过微信、邮件或其他 IM 工具远程下达任务。
- 让外部系统的消息主动进入 xAgent 会话。
- 把企业系统、第三方服务或自有服务包装成 xAgent 可治理的入口。
- 配合 Skill，把外部能力沉淀成更稳定的业务场景。

## 安装前准备

部署 Connector 前，先确认：

- xAgent 服务端已经可以访问。
- Connector 所在服务器可以访问对应外部系统。
- 已准备连接器需要的账号、授权方式或 API 凭证。
- 如果需要公网回调或外部访问，已经准备域名、HTTPS 和反向代理。
- 已明确 Connector 与 xAgent 之间使用的访问地址和鉴权信息。

## 部署方式

Connector 通常也是一个独立二进制服务。建议把它和 xAgent 分开部署、分开管理，便于后续单独升级、重启和排查。

示例目录：

```bash
sudo mkdir -p /opt/xagent-connectors/wechat
sudo mkdir -p /var/lib/xagent-connectors/wechat
sudo useradd --system --home /var/lib/xagent-connectors/wechat --shell /usr/sbin/nologin xagent-wechat
sudo chown -R xagent-wechat:xagent-wechat /opt/xagent-connectors/wechat /var/lib/xagent-connectors/wechat
```

不同 Connector 的二进制名称、参数和依赖可能不同。下面用微信连接器作为示例，实际部署时以对应发布包说明为准。

## 安装二进制文件

连接器二进制发布在：

[xAgent Connectors Releases](https://github.com/coffeehc/xagent-connectors/releases)

当前微信连接器示例使用 `v0.0.1`。请按服务器系统和 CPU 架构选择对应文件：

| 系统 | 架构 | 文件 |
| --- | --- | --- |
| Linux | x86_64 / amd64 | `xagent-wechat-connector-v0.0.1-linux-amd64.tar.gz` |
| Linux | arm64 / aarch64 | `xagent-wechat-connector-v0.0.1-linux-arm64.tar.gz` |
| macOS | Intel | `xagent-wechat-connector-v0.0.1-darwin-amd64.tar.gz` |
| macOS | Apple Silicon | `xagent-wechat-connector-v0.0.1-darwin-arm64.tar.gz` |

Linux amd64 示例：

```bash
VERSION=v0.0.1
ASSET=xagent-wechat-connector-${VERSION}-linux-amd64.tar.gz

curl -L -O "https://github.com/coffeehc/xagent-connectors/releases/download/${VERSION}/${ASSET}"
curl -L -O "https://github.com/coffeehc/xagent-connectors/releases/download/${VERSION}/SHA256SUMS"
grep "  ${ASSET}$" SHA256SUMS | shasum -a 256 -c -
tar -xzf "${ASSET}"
```

解压后，把发布包中的连接器二进制文件放到固定目录，例如：

```bash
sudo install -m 0755 ./xagent-wechat-connector-v0.0.1-linux-amd64/xagent-wechat-connector /opt/xagent-connectors/wechat/xagent-wechat-connector
```

如果你下载的是其他系统或架构的包，请把上面路径中的目录名替换为实际解压出来的目录。

## 启动连接器

微信连接器当前常用配置项如下：

| 配置项 | 命令行参数 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `wechat_connector.addr` | `--addr` | `127.0.0.1:19090` | Connector HTTP 监听地址 |
| `wechat_connector.api_key` | `--api-key` | `test-api` | xAgent 访问 Connector 接口时使用的鉴权密钥 |
| `wechat_connector.state_dir` | `--state-dir` | `~/.xagent/connectors/im.wechat` | 保存登录态、绑定状态、待投递消息和媒体缓存的目录 |

`state_dir` 也可以通过环境变量 `XAGENT_WECHAT_CONNECTOR_STATE_DIR` 覆盖。生产部署时建议显式配置 `api_key` 和 `state_dir`，不要直接使用默认测试密钥。

示例启动命令：

```bash
cd /opt/xagent-connectors/wechat
sudo -u xagent-wechat ./xagent-wechat-connector \
  --addr 0.0.0.0:19090 \
  --api-key your-connector-api-key \
  --state-dir /var/lib/xagent-connectors/wechat/state
```

常见参数含义：

| 参数 | 作用 |
| --- | --- |
| `--addr` | Connector 本地 HTTP 监听地址 |
| `--api-key` | Connector 接口鉴权密钥，按实际安全策略设置 |
| `--state-dir` | 保存连接器登录态、缓存和运行状态的目录 |

当前版本不再通过启动参数配置 `base_url`。如果需要公网或跨服务器访问，请在 Connector 前面配置反向代理和 HTTPS，然后在 xAgent 控制台中填写或导入 xAgent 能访问到的 Connector 地址。

## 使用 config.yml 配置

除了命令行参数，也可以使用 `config.yml` 维护连接器配置。systemd 示例中的 `WorkingDirectory` 是 `/opt/xagent-connectors/wechat`，可以把配置文件放在这个目录下：

```yaml
wechat_connector:
  addr: 0.0.0.0:19090
  api_key: your-connector-api-key
  state_dir: /var/lib/xagent-connectors/wechat/state
```

使用配置文件后，启动命令可以保持简单：

```bash
cd /opt/xagent-connectors/wechat
sudo -u xagent-wechat ./xagent-wechat-connector
```

如果同时使用命令行参数和配置文件，命令行参数通常用于覆盖配置文件中的同名配置。生产环境建议把稳定配置放入 `config.yml`，把密钥文件权限限制在运行用户可读范围内。

## 注册为 systemd 服务

Linux 下建议把 Connector 注册为 systemd 服务。

示例 `/etc/systemd/system/xagent-wechat-connector.service`：

```ini
[Unit]
Description=xAgent WeChat Connector
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=xagent-wechat
Group=xagent-wechat
WorkingDirectory=/opt/xagent-connectors/wechat
ExecStart=/opt/xagent-connectors/wechat/xagent-wechat-connector
Restart=on-failure
RestartSec=5
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
```

启用服务：

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now xagent-wechat-connector
sudo systemctl status xagent-wechat-connector
```

查看日志：

```bash
journalctl -u xagent-wechat-connector -f
```

## 接入 xAgent

连接器服务启动后，还需要在 xAgent 控制台中接入：

1. 管理员进入 Connector 管理。
2. 添加或导入对应 Connector，并填写 xAgent 能访问到的 Connector 地址。
3. 检查连接器健康状态。
4. 按连接器要求完成登录、扫码或授权。
5. 在“我的连接”里确认当前用户是否已经完成绑定。
6. 在 Agent 会话中使用对应连接器能力。

如果连接器提供工具或 Skill，管理员还需要确认这些能力是否已经出现在 Tool、Skill 或智能体可用能力中。

微信连接器默认提供 Connector Card 入口：

```text
http://连接器地址:19090/connector-card.json
```

如果前面配置了 HTTPS 反向代理，则使用反向代理后的地址。

## 安全建议

- Connector 可能保存外部系统登录态，建议使用独立运行用户和独立数据目录。
- 不建议把 Connector 管理端口直接暴露到公网。
- 对公网入口使用 HTTPS、反向代理、防火墙和访问控制。
- 妥善保存 `--api-key` 或同类鉴权信息，不要放进会被模型读取的任务材料里。
- 连接器接入的外部系统权限仍由外部系统控制，xAgent 不替代外部系统的账号和权限体系。

## 备份与升级

当前测试版暂不支持在线升级。升级 Connector 需要停机维护：先停止对应连接器服务，完成备份后再替换新的连接器二进制文件。在线升级、自动迁移和一键回滚等能力会在后续版本中再考虑。

升级 Connector 前，建议先备份：

- Connector 状态目录，例如 `/var/lib/xagent-connectors/wechat/state`
- systemd service 文件
- 反向代理配置

当前版本的离线升级步骤通常是：

1. 停止 Connector 服务。
2. 备份状态目录和部署相关文件。
3. 替换新的 Connector 二进制文件。
4. 启动服务并查看日志。
5. 回到 xAgent 控制台检查 Connector 健康状态和用户绑定状态。

## 常见问题

### 不安装 Connector 能使用 xAgent 吗？

可以。Web 页面、模型、Skill、Tool、MCP 等能力不依赖 Connector。只有需要外部消息主动进入 xAgent，或需要特定外部系统连接时，才需要部署对应 Connector。

### Connector 和 MCP 有什么区别？

MCP 更像是 xAgent 在任务过程中按需调用的外部工具入口；Connector 更像是外部系统和 xAgent 之间的连接服务，可以主动把消息、事件和账号状态推送给 xAgent。

### Connector 必须和 xAgent 部署在同一台服务器吗？

不必须。只要网络可达、鉴权正确，Connector 可以独立部署在其他服务器上。生产环境中，分开部署更便于隔离、升级和排查。

### Connector 的数据需要备份吗？

需要。Connector 可能保存登录态、绑定状态、缓存或外部系统会话信息。升级或迁移前应备份对应状态目录。

## 相关文档

- [服务端安装](/docs/deployment/server-install)
- [连接器](/docs/user-guide/connector)
