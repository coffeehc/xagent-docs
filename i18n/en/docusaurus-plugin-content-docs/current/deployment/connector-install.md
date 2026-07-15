---
title: Install xAgent Connectors for WeChat and Telegram
description: Download, configure, and run xAgent Connectors for WeChat and Telegram, including default addresses, API keys, config files, and server integration.
image: /img/share/en/xagent-connectors.png
status: beta
updated: 2026-07-15
---

# Install xAgent Connectors for WeChat and Telegram

## What It Is

A Connector brings an external entry point into xAgent, such as WeChat, Telegram, email, enterprise systems, or third-party services. It can receive messages from outside xAgent and actively deliver messages or events into xAgent sessions.

If you only use the web UI, a Connector is optional. Deploy a Connector when you need external messages, IM access, enterprise system access, or third-party services to enter xAgent.

## When You Need a Connector

Deploy a Connector when you want to:

- Submit tasks remotely through WeChat, Telegram, email, or other IM tools.
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

The current release is `v0.0.3` and contains both WeChat and Telegram Connector assets.

| Connector | Linux amd64 asset | Linux arm64 asset |
| --- | --- | --- |
| WeChat | `xagent-wechat-connector-v0.0.3-linux-amd64.tar.gz` | `xagent-wechat-connector-v0.0.3-linux-arm64.tar.gz` |
| Telegram | `xagent-telegram-connector-v0.0.3-linux-amd64.tar.gz` | `xagent-telegram-connector-v0.0.3-linux-arm64.tar.gz` |

Intel macOS uses `darwin-amd64`; Apple Silicon uses `darwin-arm64`.

Linux amd64 example. Change `CONNECTOR=wechat` to `telegram` for Telegram:

```bash
VERSION=v0.0.3
CONNECTOR=wechat
ASSET=xagent-${CONNECTOR}-connector-${VERSION}-linux-amd64.tar.gz

curl -L -O "https://github.com/coffeehc/xagent-connectors/releases/download/${VERSION}/${ASSET}"
curl -L -O "https://github.com/coffeehc/xagent-connectors/releases/download/${VERSION}/SHA256SUMS"
grep "  ${ASSET}$" SHA256SUMS | shasum -a 256 -c -
tar -xzf "${ASSET}"
```

Install it:

```bash
sudo install -d -m 0755 "/opt/xagent-connectors/${CONNECTOR}"
sudo install -m 0755 "./${ASSET%.tar.gz}/xagent-${CONNECTOR}-connector" \
  "/opt/xagent-connectors/${CONNECTOR}/xagent-${CONNECTOR}-connector"
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

## Telegram Connector Options

Telegram Connector uses the Telegram Bot API. Its service configuration does not need a bot token. Each user binds their own `bot_token` and target `chat_id` in **My Connections**, and the connector keeps the token in its local state directory.

| Config | CLI option | Default | Meaning |
| --- | --- | --- | --- |
| `telegram_connector.addr` | `--addr` | `127.0.0.1:19091` | Connector HTTP listen address |
| `telegram_connector.api_key` | `--api-key` | `test-api` | Auth key used by xAgent when calling the Connector |
| `telegram_connector.state_dir` | `--state-dir` | `~/.xagent/connectors/im-telegram` | User bindings, bot tokens, and message state |
| `telegram_connector.api_base_url` | `--telegram-api-base-url` | Telegram official API endpoint | Change only for a compatible gateway |

Example:

```bash
cd /opt/xagent-connectors/telegram
sudo -u xagent-telegram ./xagent-telegram-connector \
  --addr 0.0.0.0:19091 \
  --api-key your-connector-api-key \
  --state-dir /var/lib/xagent-connectors/telegram/state
```

You can also use `config.yml`:

```yaml
telegram_connector:
  addr: 0.0.0.0:19091
  api_key: your-connector-api-key
  state_dir: /var/lib/xagent-connectors/telegram/state
```

When binding a private chat, the user must first send `/start` or another message to the bot before Telegram Bot API can read the chat.

## Connect to xAgent

After the Connector starts:

1. Enter **Connector Management** as an administrator.
2. Add the Connector and fill the address reachable by xAgent.
3. Check health status and Connector Card.
4. Complete login, QR scan, or authorization as required.
5. In **My Connections**, confirm that the current user is authenticated and connected.
6. Use the connector capability in Agent Session.

The default Connector Card endpoints are:

```text
http://connector-address:19090/connector-card.json  # WeChat
http://connector-address:19091/connector-card.json  # Telegram
```

Use the reverse-proxy HTTPS address if one is configured.

## Security Notes

- A Connector may store external system login state. Use a dedicated runtime user and data directory.
- Do not expose the Connector management port directly to the public internet.
- Use HTTPS, reverse proxy, firewall, and access control for public entry points.
- Keep `--api-key` and similar credentials out of task messages and prompts.
- External-system permissions are still controlled by the external system and the connector, not by xAgent alone.

## Related Concepts

- [Connectors](/docs/user-guide/connector)
- [Server Installation](/docs/deployment/server-install)
- [MCP vs. Connectors: What Is the Difference?](/docs/guides/mcp-vs-connector)

## Next Steps

- [Bind and manage an external account](/docs/user-guide/connector)
- [Use a Connector capability in Agent Session](/docs/user-guide/agent-session)
- [Telegram Connector source and release notes](https://github.com/coffeehc/xagent-connectors/tree/main/connectors/telegram)
