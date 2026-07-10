---
title: 服务端安装
status: beta
updated: 2026-07-07
---

# 服务端安装

## 适用对象

本文适合准备把 xAgent 部署到服务器上的管理员和维护者。

xAgent 当前以二进制文件方式发布，主要支持 macOS 和 Linux。Windows 下目前没有测试环境，也没有经过测试，不建议用于部署体验。

## 部署方式

xAgent 是服务端程序。用户通过 Web 页面或 IM Connector 访问，不需要在每台个人电脑上安装独立智能体。

最小部署只需要 xAgent 二进制文件。它负责运行 Web 控制台、API、会话、工具和系统服务。

当前版本默认使用内置 SQLite 数据库，不要求额外安装 PostgreSQL、MySQL 或 Redis。后续如团队规模、并发、审计或运维要求提高，可以再考虑升级到更大型的数据库方案。

## 准备服务器

建议准备一台长期在线的服务器或工作站：

- 操作系统：Linux 或 macOS。
- 网络：服务器可以访问模型 API、MCP 服务、Connector 服务以及用户需要访问的外部系统。
- 磁盘：准备足够空间，用于保存用户工作区、任务文件和运行数据。
- 权限：使用独立系统用户运行 xAgent，并确保运行用户具备写入运行数据的权限，避免直接使用 `root` 长期运行。
- 反向代理：xAgent 当前不自带 HTTPS 支持。出于安全考虑，如果需要公网访问，强烈建议在 xAgent 前面放 Nginx、Caddy 或同类反向代理工具，并由反向代理负责 HTTPS。

示例目录：

```bash
sudo mkdir -p /opt/xagent
sudo mkdir -p /var/lib/xagent
sudo useradd --system --home /var/lib/xagent --shell /usr/sbin/nologin xagent
sudo chown -R xagent:xagent /opt/xagent /var/lib/xagent
```

不同系统的创建用户命令可能不同，按实际环境调整即可。

## 安装二进制文件

当前测试版二进制发布在：

[xAgent Releases](https://github.com/coffeehc/xagent-releases/releases)

当前版本示例使用 `v0.0.2.beta`。请按服务器系统和 CPU 架构选择对应文件：

| 系统 | 架构 | 文件 |
| --- | --- | --- |
| Linux | x86_64 / amd64 | `xagent-v0.0.2.beta-linux-amd64.tar.gz` |
| Linux | arm64 / aarch64 | `xagent-v0.0.2.beta-linux-arm64.tar.gz` |
| macOS | Intel | `xagent-v0.0.2.beta-darwin-amd64.tar.gz` |
| macOS | Apple Silicon | `xagent-v0.0.2.beta-darwin-arm64.tar.gz` |

Linux amd64 示例：

```bash
VERSION=v0.0.2.beta
ASSET=xagent-${VERSION}-linux-amd64.tar.gz

curl -L -O "https://github.com/coffeehc/xagent-releases/releases/download/${VERSION}/${ASSET}"
curl -L -O "https://github.com/coffeehc/xagent-releases/releases/download/${VERSION}/SHA256SUMS"
grep "  ${ASSET}$" SHA256SUMS | shasum -a 256 -c -
tar -xzf "${ASSET}"
```

macOS Apple Silicon 示例：

```bash
VERSION=v0.0.2.beta
ASSET=xagent-${VERSION}-darwin-arm64.tar.gz

curl -L -O "https://github.com/coffeehc/xagent-releases/releases/download/${VERSION}/${ASSET}"
curl -L -O "https://github.com/coffeehc/xagent-releases/releases/download/${VERSION}/SHA256SUMS"
grep "  ${ASSET}$" SHA256SUMS | shasum -a 256 -c -
tar -xzf "${ASSET}"
```

解压后，把发布包中的 xAgent 二进制文件放到固定目录，例如：

```bash
sudo install -m 0755 ./xagent-v0.0.2.beta-linux-amd64/xagent /opt/xagent/xagent
```

如果你下载的是其他系统或架构的包，请把上面路径中的目录名替换为实际解压出来的目录。

## 可选：使用 config.yml

常规安装不需要手工编写配置文件。xAgent 启动时如果找不到配置文件，会自动初始化基础配置文件和运行目录。

如果你希望明确指定监听地址、运行数据目录或 LLM 请求超时，可以在二进制文件同目录下创建 `config.yml`。系统邮件配置也可以写在这里，也可以进入 xAgent 后在系统配置页面设置。

```bash
sudo tee /opt/xagent/config.yml >/dev/null <<'YAML'
server_addr: 0.0.0.0:18888
root_dir: /var/lib/xagent/.xagent
llm:
  request_timeout_seconds: 900
# 如果不需要系统邮件，可以不写 xagent_email。
# xagent_email:
#   address: notify@example.com
#   smtp_host: smtp.example.com
#   smtp_tls_mode: starttls
#   password: your-smtp-password
YAML
sudo chown xagent:xagent /opt/xagent/config.yml
sudo chmod 0600 /opt/xagent/config.yml
```

常用配置项：

| 配置项 | 默认值 | 说明 |
| --- | --- | --- |
| `server_addr` | `0.0.0.0:18888` | xAgent Web 控制台和 API 的监听地址 |
| `root_dir` | 运行用户 Home 下的 `.xagent` | 保存运行数据、用户工作区、模型配置、Skill、Tool 缓存和安全密钥等数据 |
| `llm.request_timeout_seconds` | `900` | 单次 LLM 请求默认超时时间，单位秒 |
| `xagent_email` | 空 | 系统发信邮箱配置，不需要系统邮件时可以不写；也可以进入系统后在系统配置中设置 |

如果 `config.yml` 放在二进制文件同目录，正常启动即可读取：

```bash
cd /opt/xagent
sudo -u xagent ./xagent start
```

如果你希望把配置文件放到其他位置，可以用 `--config` 或 `-c` 指定：

```bash
sudo -u xagent /opt/xagent/xagent start --config /etc/xagent/config.yml
```

使用独立配置路径时，建议把 `root_dir` 写成绝对路径，避免相对路径随配置文件位置变化。

## 启动服务

在服务器上直接启动：

```bash
cd /opt/xagent
sudo -u xagent ./xagent start
```

如果不写 `start`，当前程序也会默认进入启动流程。文档中保留 `start` 是为了让命令语义更清晰。

启动后访问：

```text
http://服务器地址:18888/
```

如果使用反向代理和 HTTPS，则访问你配置的域名。

第一次启动后，xAgent 会自动准备基础运行文件和目录。

出于安全考虑，不建议把 xAgent 监听端口直接暴露到公网。xAgent 当前不自带 HTTPS 支持，公网访问应通过 Nginx、Caddy 或其他反向代理工具代理，并在代理层配置 TLS 证书、防火墙和访问控制。

## 注册为 systemd 服务

Linux 下建议注册为 systemd 服务，方便开机启动、后台运行和日志管理。

示例 `/etc/systemd/system/xagent.service`：

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

如果配置文件放在 `/etc/xagent/config.yml` 这类独立路径，可以把 `ExecStart` 改成：

```ini
ExecStart=/opt/xagent/xagent start --config /etc/xagent/config.yml
```

启用服务：

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now xagent
sudo systemctl status xagent
```

查看日志：

```bash
journalctl -u xagent -f
```

## 依赖组件

xAgent 的核心服务不依赖外部数据库，最小部署只需要二进制文件和必要的写入权限。但要真正完成任务，还需要根据使用场景准备外部能力。

### 必需能力

| 组件 | 用途 | 说明 |
| --- | --- | --- |
| 模型 API 或本地模型服务 | 让 Agent 能理解、推理、写作和调用工具 | 初次部署后需要在模型配置页面接入至少一个可用模型 |
| 浏览器访问入口 | 用户进入 Web 控制台 | 内网可直接访问端口，公网建议 HTTPS 反向代理 |

### 可选能力

| 组件 | 用途 | 什么时候需要 |
| --- | --- | --- |
| SMTP 邮箱 | 系统邮件发送 | 需要邮件通知、验证码或系统邮件时配置 |
| MCP 服务 | 扩展外部工具能力 | 需要连接知识库、业务系统、办公工具、研发工具等外部能力时配置 |
| Connector 服务 | 接入微信、邮件、企业系统或第三方入口 | 希望外部消息主动进入 xAgent 时配置 |
| 反向代理 / HTTPS | 安全访问 Web 控制台 | 需要公网访问或域名访问时配置 |
| 本地模型服务 | 提高数据私有化程度 | 希望任务数据尽量留在自有环境时配置 |

### 相关系统组件

xAgent 内置了文件、表格、PDF、图片、OCR、网页抓取、报告生成和隔离命令执行等能力。部分能力依赖服务器上的系统组件。部署后建议先在控制台的运行环境页面检查组件状态，再用真实任务测试。

![xAgent 运行环境检测](/img/manual/xagent-system-components.png)

当前运行环境检测会覆盖下面几类组件：

| 范围 | 组件 |
| --- | --- |
| 基础运行 | Python 运行环境、Node.js 运行环境、CLI 隔离执行环境 |
| 文档与文件 | 文档转 Markdown、文件类型识别、PDF 文本与元信息抽取 |
| PDF 处理 | PDF 按页渲染、Office 解析与 PDF 生成、HTML/CSS 生成 PDF、PDF 校验/拆分/修复、PDF/PostScript 处理 |
| 图片与 OCR | 图片压缩/转码、OCR PDF、OCR 引擎、字体与中文渲染 |
| 可选扩展 | Markdown/复杂排版导出、FFmpeg 音视频处理 |

仓库 [scripts/](https://github.com/coffeehc/xagent-docs/tree/main/scripts) 目录下提供了预安装脚本 [preinstall-system-components.sh](https://github.com/coffeehc/xagent-docs/blob/main/scripts/preinstall-system-components.sh)，可以用于检测或安装这些系统组件：

```bash
scripts/preinstall-system-components.sh --check
scripts/preinstall-system-components.sh --required
scripts/preinstall-system-components.sh --all
```

参数说明：

| 参数 | 作用 |
| --- | --- |
| `--check` | 只检测当前系统，不安装组件 |
| `--required` | 安装 xAgent 运行所需的必需组件，默认模式 |
| `--all` | 在必需组件基础上，包含 Node.js、Pandoc/XeLaTeX、FFmpeg 等可选组件 |
| `--dry-run` | 只打印安装命令，不实际执行 |
| `--dev` | 安装源码构建相关工具，例如 Go、Node.js、pnpm |
| `--no-update` | Linux 下跳过包索引更新 |

脚本会根据系统自动选择 macOS 或 Linux 安装脚本：

- macOS：需要先安装 Homebrew。
- Linux：支持 `apt-get`、`dnf`、`yum`、`pacman`、`zypper`、`apk` 等常见包管理器。

如果某类能力检测失败，先进入运行环境页面重新检测，或执行 [preinstall-system-components.sh](https://github.com/coffeehc/xagent-docs/blob/main/scripts/preinstall-system-components.sh) 的 `--check` 查看缺失项，再补齐对应系统组件或调整服务器安全策略。

## 首次启动后检查

完成部署后，建议按下面顺序检查：

1. 打开 Web 页面，确认可以访问 xAgent 控制台。
2. 登录管理员账号。
3. 进入模型配置，添加并测试至少一个可用模型。
4. 创建或进入 Agent 会话，发送一个简单任务。
5. 上传一个小文件，确认工作区读写正常。
6. 如需 MCP 或 Connector，先单独测试连接，再交给会话使用。

## 备份与升级

当前测试版暂不支持在线升级。升级需要停机维护：先停止 xAgent 服务，完成备份后再替换新的二进制文件。在线升级、自动迁移和一键回滚等能力会在后续版本中再考虑。

升级二进制前，建议先备份：

- xAgent 运行数据
- config.yml
- 反向代理配置
- systemd service 文件

当前版本的离线升级步骤通常是：

1. 停止 xAgent 服务。
2. 备份数据目录和部署相关文件。
3. 替换新的 xAgent 二进制文件。
4. 启动服务并查看日志。
5. 登录控制台，检查模型、会话、工作区和常用工具是否正常。

## 常见问题

### 是否必须安装数据库？

不需要。当前版本默认使用内置 SQLite 数据库，适合团队自部署和测试版体验。

### 可以直接暴露 18888 端口到公网吗？

不建议。xAgent 当前不自带 HTTPS 支持，公网访问强烈建议使用 Nginx、Caddy 或同类反向代理工具，并配合 TLS 证书、防火墙、安全组和访问控制策略。

### 为什么建议用 systemd？

xAgent 是服务端程序，通常需要长期运行。systemd 可以负责开机启动、失败重启、日志收集和进程管理，适合 Linux 服务器部署。

### macOS 可以部署吗？

可以用于体验或小规模部署，但长期团队使用更建议部署在 Linux 服务器上。

### Windows 可以部署吗？

当前没有 Windows 测试环境，也没有经过测试，不建议尝试。

## 相关文档

- [什么是 xAgent](/docs/getting-started/what-is-xagent)
- [模型说明](/docs/deployment/model-requirements)
- [Connector 安装](/docs/deployment/connector-install)
- [模型配置](/docs/user-guide/model-config)
- [连接器](/docs/user-guide/connector)
