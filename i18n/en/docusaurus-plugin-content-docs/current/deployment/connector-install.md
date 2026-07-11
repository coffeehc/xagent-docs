---
title: Connector Installation
description: Learn how to download, configure, and run an xAgent Connector, including its address, API key, config file, and server connection workflow.
status: beta
updated: 2026-07-11
---

# Connector Installation

## What It Is

A Connector brings an external entry point into xAgent, such as WeChat, email, enterprise systems, or third-party services. It can receive messages from outside xAgent and actively deliver messages or events into xAgent sessions.

If you only use the web UI, a Connector is optional. Deploy a Connector when you need external messages, IM access, enterprise system access, or third-party services to enter xAgent.

## When You Need a Connector

Deploy a Connector when you want to:

- Submit tasks remotely through WeChat, email, or other IM tools.
- Let external-system messages enter xAgent sessions automatically.
- Wrap enterprise systems or third-party services into a governed xAgent entry point.
- Combine external capabilities with Skills to build reusable business scenarios.

## Before Installation

Check that:

- xAgent server is already reachable.
- The Connector server can access the external system it connects to.
- Required accounts, authorization methods, or API credentials are ready.
- HTTPS and reverse proxy are prepared if public callback or external access is needed.
- You know which Connector address and API key xAgent should use.

## Binary Installation

Connector binaries are published at:

[xAgent Connectors Releases](https://github.com/coffeehc/xagent-connectors/releases)

Current WeChat Connector example version: `v0.0.1`.

| System | Architecture | File |
| --- | --- | --- |
| Linux | x86_64 / amd64 | `xagent-wechat-connector-v0.0.1-linux-amd64.tar.gz` |
| Linux | arm64 / aarch64 | `xagent-wechat-connector-v0.0.1-linux-arm64.tar.gz` |
| macOS | Intel | `xagent-wechat-connector-v0.0.1-darwin-amd64.tar.gz` |
| macOS | Apple Silicon | `xagent-wechat-connector-v0.0.1-darwin-arm64.tar.gz` |

Linux amd64 example:

```bash
VERSION=v0.0.1
ASSET=xagent-wechat-connector-${VERSION}-linux-amd64.tar.gz

curl -L -O "https://github.com/coffeehc/xagent-connectors/releases/download/${VERSION}/${ASSET}"
curl -L -O "https://github.com/coffeehc/xagent-connectors/releases/download/${VERSION}/SHA256SUMS"
grep "  ${ASSET}$" SHA256SUMS | shasum -a 256 -c -
tar -xzf "${ASSET}"
```

Install it:

```bash
sudo mkdir -p /opt/xagent-connectors/wechat
sudo mkdir -p /var/lib/xagent-connectors/wechat
sudo useradd --system --home /var/lib/xagent-connectors/wechat --shell /usr/sbin/nologin xagent-wechat
sudo chown -R xagent-wechat:xagent-wechat /opt/xagent-connectors/wechat /var/lib/xagent-connectors/wechat
sudo install -m 0755 ./xagent-wechat-connector-v0.0.1-linux-amd64/xagent-wechat-connector /opt/xagent-connectors/wechat/xagent-wechat-connector
```

## WeChat Connector Options

Common current options:

| Config | CLI option | Default | Meaning |
| --- | --- | --- | --- |
| `wechat_connector.addr` | `--addr` | `127.0.0.1:19090` | Connector HTTP listen address |
| `wechat_connector.api_key` | `--api-key` | `test-api` | Auth key used by xAgent when calling the Connector |
| `wechat_connector.state_dir` | `--state-dir` | `~/.xagent/connectors/im.wechat` | Login state, binding state, pending messages, and media cache |

The current version no longer uses a `base_url` startup parameter. If xAgent needs to access the Connector through another host or public domain, configure reverse proxy and HTTPS, then fill that reachable Connector address in the xAgent console.

Example:

```bash
cd /opt/xagent-connectors/wechat
sudo -u xagent-wechat ./xagent-wechat-connector \
  --addr 0.0.0.0:19090 \
  --api-key your-connector-api-key \
  --state-dir /var/lib/xagent-connectors/wechat/state
```

## config.yml

You can also use `config.yml` in the Connector working directory:

```yaml
wechat_connector:
  addr: 0.0.0.0:19090
  api_key: your-connector-api-key
  state_dir: /var/lib/xagent-connectors/wechat/state
```

Then start simply:

```bash
cd /opt/xagent-connectors/wechat
sudo -u xagent-wechat ./xagent-wechat-connector
```

In production, set a real API key and restrict file permissions for the config file.

## systemd Service

Example `/etc/systemd/system/xagent-wechat-connector.service`:

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

Enable it:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now xagent-wechat-connector
sudo systemctl status xagent-wechat-connector
```

View logs:

```bash
journalctl -u xagent-wechat-connector -f
```

## Connect to xAgent

After the Connector starts:

1. Enter **Connector Management** as an administrator.
2. Add the Connector and fill the address reachable by xAgent.
3. Check health status and Connector Card.
4. Complete login, QR scan, or authorization as required.
5. In **My Connections**, confirm that the current user is authenticated and connected.
6. Use the connector capability in Agent Session.

The WeChat Connector provides a Connector Card endpoint:

```text
http://connector-address:19090/connector-card.json
```

Use the reverse-proxy HTTPS address if one is configured.

## Security Notes

- A Connector may store external system login state. Use a dedicated runtime user and data directory.
- Do not expose the Connector management port directly to the public internet.
- Use HTTPS, reverse proxy, firewall, and access control for public entry points.
- Keep `--api-key` and similar credentials out of task messages and prompts.
- External-system permissions are still controlled by the external system and the connector, not by xAgent alone.

## Related Docs

- [Connectors](/docs/user-guide/connector)
- [Server Installation](/docs/deployment/server-install)
- [xAgent Connectors](https://github.com/coffeehc/xagent-connectors)
