---
title: Server Installation
status: beta
updated: 2026-07-10
---

# Server Installation

## Who This Is For

This page is for administrators and maintainers who want to deploy xAgent on a server.

xAgent is currently distributed as a binary release and mainly supports macOS and Linux. Windows has not been tested and is not recommended for deployment trials.

## Deployment Model

xAgent is a server-side application. Users access it through the web UI or IM connectors. They do not need to install a separate agent on every personal computer.

The minimal deployment only needs the xAgent binary. The server runs the web console, API, sessions, tools, and system services.

The current version uses embedded SQLite by default. PostgreSQL, MySQL, and Redis are not required for the first deployment. Larger database options can be considered later when scale, concurrency, audit, or operations requirements increase.

## Prepare the Server

Recommended preparation:

- Operating system: Linux or macOS.
- Network: the server can access model APIs, MCP services, connector services, and external systems required by users.
- Disk: reserve enough space for user workspaces, task files, and runtime data.
- User: run xAgent with a dedicated system user instead of long-term `root`.
- Reverse proxy: xAgent does not provide built-in HTTPS. For public access, use Nginx, Caddy, or a similar reverse proxy with TLS.

Example Linux directories:

```bash
sudo mkdir -p /opt/xagent
sudo mkdir -p /var/lib/xagent
sudo useradd --system --home /var/lib/xagent --shell /usr/sbin/nologin xagent
sudo chown -R xagent:xagent /opt/xagent /var/lib/xagent
```

Adjust user creation commands for your operating system.

## Install the Binary

Binary releases are published at:

[xAgent Releases](https://github.com/coffeehc/xagent-releases/releases)

Current example version: `v0.0.1.beta`.

| System | Architecture | File |
| --- | --- | --- |
| Linux | x86_64 / amd64 | `xagent-v0.0.1.beta-linux-amd64.tar.gz` |
| Linux | arm64 / aarch64 | `xagent-v0.0.1.beta-linux-arm64.tar.gz` |
| macOS | Intel | `xagent-v0.0.1.beta-darwin-amd64.tar.gz` |
| macOS | Apple Silicon | `xagent-v0.0.1.beta-darwin-arm64.tar.gz` |

Linux amd64 example:

```bash
VERSION=v0.0.1.beta
ASSET=xagent-${VERSION}-linux-amd64.tar.gz

curl -L -O "https://github.com/coffeehc/xagent-releases/releases/download/${VERSION}/${ASSET}"
curl -L -O "https://github.com/coffeehc/xagent-releases/releases/download/${VERSION}/SHA256SUMS"
grep "  ${ASSET}$" SHA256SUMS | shasum -a 256 -c -
tar -xzf "${ASSET}"
```

Install the binary:

```bash
sudo install -m 0755 ./xagent-v0.0.1.beta-linux-amd64/xagent /opt/xagent/xagent
```

If you downloaded a different system or architecture package, replace the extracted directory name accordingly.

## Optional: config.yml

Regular installation does not require manually writing `config.yml`. If no config file exists, xAgent initializes the basic configuration and runtime directory automatically.

If you want to explicitly set the listen address, runtime data directory, or LLM timeout, create `config.yml` next to the binary:

```bash
sudo tee /opt/xagent/config.yml >/dev/null <<'YAML'
server_addr: 0.0.0.0:18888
root_dir: /var/lib/xagent/.xagent
llm:
  request_timeout_seconds: 900
YAML
sudo chown xagent:xagent /opt/xagent/config.yml
sudo chmod 0600 /opt/xagent/config.yml
```

System email settings can also be configured later from the system configuration page after entering xAgent.

Common fields:

| Field | Default | Meaning |
| --- | --- | --- |
| `server_addr` | `0.0.0.0:18888` | Web console and API listen address |
| `root_dir` | `.xagent` under the runtime user's home | Runtime data, workspaces, model config, Skills, Tools, cache, and security keys |
| `llm.request_timeout_seconds` | `900` | Default timeout for one LLM request, in seconds |
| `xagent_email` | empty | Optional system email config; can also be set later in system configuration |

Start with the config file in the binary directory:

```bash
cd /opt/xagent
sudo -u xagent ./xagent start
```

Or use an explicit config path:

```bash
sudo -u xagent /opt/xagent/xagent start --config /etc/xagent/config.yml
```

## Start the Service

```bash
cd /opt/xagent
sudo -u xagent ./xagent start
```

Then open:

```text
http://server-address:18888/
```

For public access, do not expose the xAgent port directly. Put xAgent behind a reverse proxy and configure HTTPS, firewall rules, and access control at the proxy layer.

## systemd Service

On Linux, registering xAgent as a `systemd` service is recommended.

Example `/etc/systemd/system/xagent.service`:

```ini
[Unit]
Description=xAgent server
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=xagent
Group=xagent
WorkingDirectory=/opt/xagent
ExecStart=/opt/xagent/xagent start
Restart=on-failure
RestartSec=5
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
```

Enable it:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now xagent
sudo systemctl status xagent
```

View logs:

```bash
journalctl -u xagent -f
```

## Dependencies

The core service does not require an external database. To complete real tasks, prepare external capabilities based on your use case.

Required:

| Component | Use |
| --- | --- |
| Model API or local model service | Understanding, reasoning, writing, and tool calling |
| Browser access | Users enter the web console |

Optional:

| Component | When needed |
| --- | --- |
| SMTP email | System mail, notification, or verification code |
| MCP service | Connect knowledge bases, business systems, office tools, developer tools, etc. |
| Connector service | Bring WeChat, email, enterprise systems, or third-party entry points into xAgent |
| Reverse proxy / HTTPS | Public or domain-based access |
| Local model service | Keep task data inside your own environment as much as possible |

## System Components

xAgent includes capabilities for files, tables, PDF, images, OCR, web fetching, report generation, and isolated command execution. Some capabilities depend on system components installed on the server.

After deployment, check the runtime environment page in the console.

![xAgent Runtime Environment Check](/img/manual/xagent-system-components.png)

Preinstall scripts are available in the [scripts/](https://github.com/coffeehc/xagent-docs/tree/main/scripts) directory, including [preinstall-system-components.sh](https://github.com/coffeehc/xagent-docs/blob/main/scripts/preinstall-system-components.sh):

```bash
scripts/preinstall-system-components.sh --check
scripts/preinstall-system-components.sh --required
scripts/preinstall-system-components.sh --all
```

| Option | Meaning |
| --- | --- |
| `--check` | Check current system only |
| `--required` | Install required runtime components |
| `--all` | Include optional components such as Node.js, Pandoc/XeLaTeX, and FFmpeg |
| `--dry-run` | Print commands without executing them |
| `--dev` | Install source-build tools such as Go, Node.js, and pnpm |

## Backup and Upgrade

The current beta does not support online upgrade. Upgrading requires maintenance: stop the service, back up data, replace the binary, and restart.

Back up at least:

- xAgent runtime data directory, especially workspace files and SQLite database.
- `config.yml`, if used.
- systemd service file.
- Reverse proxy configuration.

## Related Docs

- [Model Notes](/docs/deployment/model-requirements)
- [Connector Installation](/docs/deployment/connector-install)
- [Feature and Menu Overview](/docs/user-guide/menu-overview)
