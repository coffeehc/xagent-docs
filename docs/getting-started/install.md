---
title: 开始安装 xAgent
description: 从服务器运行安装脚本到完成首次系统初始化，按步骤安装并验证 xAgent v0.0.6.beta。
image: /img/getting-started/v005/install-terminal.webp
status: beta
updated: 2026-08-01
---

# 开始安装 xAgent

本页适合第一次部署 xAgent 的管理员。它从安装命令开始，带你完成首次打开 Web 控制台时自动进入的系统初始化流程。需要了解服务器准备和私有化部署边界时，请继续阅读[私有化部署 AI Agent](/docs/guides/self-hosted-ai-agent)。

## 安装前确认

开始前确认：

**操作系统建议**：xAgent 当前支持 Linux（AMD64/ARM64）和 macOS。对于需要长期稳定运行、开机自启并尽量减少停机的服务端部署，建议优先选择 Debian Linux，并使用 systemd 管理服务。macOS 是 xAgent 的主要开发环境，因此开发、测试和个人部署支持也很好。Windows 暂不建议部署，主要因为当前对 xAgent 所需的沙箱能力支持不足，无法为受控脚本执行提供与 Linux/macOS 等价的安全、可控运行保障。

- Linux 使用 AMD64 或 ARM64，且当前账号具有 `root` 或 `sudo` 权限；macOS 也可以使用用户级安装。
- 服务器能够访问 `downloads.xagent.xiagaogao.com`、模型 API，以及之后准备接入的外部系统。
- 有足够磁盘保存版本化二进制、运行数据、工作区文件和 Runtime Assets。
- 如果准备通过公网访问，先规划 HTTPS 反向代理、防火墙和访问控制。xAgent 本身不终止 TLS。
- 如果是升级已有环境，先备份配置、数据库、工作区和 Connector 状态。

## 第一步：运行安装器

Linux 和 macOS 使用同一个安装命令：

```bash
curl -fsSL https://downloads.xagent.xiagaogao.com/scripts/install.sh | bash
```

安装器会自动检测操作系统和 CPU 架构，下载并校验对应的安装包，安装或升级 xAgent，并在 Linux 上创建、启用和启动 `xagent-server` systemd 服务。

![Linux 安装器输出：检测环境、安装 xAgent 并询问 Connector](/img/getting-started/v005/install-terminal.webp)

图中可以看到完整的交互顺序：先安装 xAgent，再询问是否安装 Connector；选择 Connector 后，安装器会继续下载、校验、注册服务，并打印接入地址和 API Key。API Key 不要发布到文档、截图或公共日志中。

如果暂时只使用 Web，可以在询问 Connector 时选择 `N`。需要无人值守安装时，可以参考：

```bash
curl -fsSL https://downloads.xagent.xiagaogao.com/scripts/install.sh \
  | bash -s -- --yes --no-connectors
```

## 第二步：确认安装结果

安装命令结束后，先确认版本：

```bash
xagent version
```

当前目标版本应为 `0.0.6.beta`。安装命令保持不变，安装器会读取当前发布目录。Linux 还可以检查服务状态：

```bash
sudo systemctl status xagent-server
journalctl -u xagent-server -f
```

安装器成功启动后，默认 Web 地址为：

```text
http://服务器地址:18888/
```

不要把 `18888` 直接暴露到公网。生产环境应通过 Nginx、Caddy 或其他反向代理提供 HTTPS，并限制访问来源。

## 第三步：打开系统初始化

安装并启动成功后，第一次打开 Web 地址时，xAgent 会自动进入“系统初始化”页面，不需要额外寻找设置入口。页面会按顺序显示以下步骤，完成当前步骤后自动进入下一步：

1. 配置数据目录。
2. 初始化管理员。
3. 设置默认模型。
4. 准备 Runtime Assets。
5. 检查基础运行组件。
6. 完成设置并进入工作台。

![xAgent 中文系统初始化页面](/img/getting-started/v005/system-setup-zh.webp)

## 第四步：配置数据目录

数据目录用于保存 xAgent 数据库、工作区和 Runtime Assets。Linux 生产环境默认使用：

```text
/opt/xagent/data
```

请填写绝对路径，并确认运行 xAgent 的账号拥有读写权限。数据目录需要持久化保存，不要放在临时目录、容器临时层或会被自动清理的位置。

点击“保存并继续”后，系统会保存目录配置并进入管理员初始化。

## 第五步：初始化管理员

系统会要求创建第一个管理员登录名和密码。这个账号用于登录控制台、配置模型、管理用户、设置审批策略和维护 Connector。

![xAgent 中文初始化管理员页面](/img/getting-started/v005/system-setup-admin-zh.webp)

建议：

- 使用专用管理员邮箱或账号，不要复用普通用户密码。
- 使用足够长且唯一的密码，并通过密码管理器保存。
- 不要把管理员凭据写入会话、工作区文件或截图。

创建成功后，xAgent 会自动登录并进入模型配置步骤。

## 第六步：设置默认模型

填写默认模型的连接信息，并点击“测试并保存”。只有模型连接测试通过后，初始化流程才会进入下一步。

![xAgent 中文默认模型设置页面](/img/getting-started/v005/system-setup-model-zh.webp)

页面中的主要字段包括：

- **模型名**：在 xAgent 中显示的名称，例如 `Qwen3.6-27B`。
- **Provider 类型**：选择模型服务协议，例如 OpenAI Chat Completions。
- **真实模型名**：发送给模型服务的实际模型 ID，例如 `qwen3.6-27b`。
- **Base URL**：模型服务的兼容 API 地址，按服务要求填写 `/v1` 等路径。
- **API Key**：模型服务的认证密钥，保存后不要写入文档、截图或公共日志。
- **模型能力**：按模型实际能力选择 Chat、流式、工具调用、视觉、音频和文件。
- **高级选项**：需要时再配置超时和其他请求参数。

模型连接测试只说明服务可访问，后续仍建议执行一个真实任务验证工具调用、文件处理和输出保存。模型字段说明见[模型配置](/docs/user-guide/model-config)。

## 第七步：准备 Runtime Assets

Runtime Assets 是 xAgent 管理的任务运行依赖，供文件处理、本地工具和其他受控执行使用。初始化页面会自动下载、校验并安装这些依赖组件，不需要管理员手工把 Python、Node.js 或其他工具装进宿主环境。

![xAgent 中文 Runtime Assets 安装步骤](/img/getting-started/v005/system-setup-runtime-zh.webp)

当页面显示“Runtime Assets 尚未就绪”时，点击“下载并安装”。安装器会从下载站获取对应的运行依赖，完成校验和安装；按钮所在步骤显示“已完成”后，初始化流程才会继续。

等待该步骤变为已完成后再继续。下载或安装失败时，应先查看服务日志和下载连通性，不要绕过初始化流程。

## 第八步：检查基础运行组件

基础运行组件负责文档解析、命令隔离和其他本地执行能力。xAgent 会自动安装并测试这些组件；测试通过后，管理员还应进入“Agent 治理 > 执行环境”，确认 Runtime Assets 和 ProcessSandbox 均可用。

如果组件检查失败：

1. 记录页面上的错误信息。
2. 查看 `xagent-server` 服务日志。
3. 确认服务器可以访问下载站，且内核支持 Linux 所需的沙箱能力。
4. 修复后重新执行检查，不要直接启用不受控的宿主执行。

## 第九步：完成初始化

确认数据目录、管理员、模型、Runtime Assets 和基础运行组件均已完成后，点击“完成设置”。系统会进入工作台，之后普通用户可以通过 Web 或已接入的 Connector 使用 xAgent。

![xAgent 中文完成初始化并进入仪表板](/img/getting-started/v005/system-setup-finish-zh.webp)

最后一步会汇总前面已经完成的项目。确认每一项都显示“已完成”后，点击“完成并进入仪表板”，系统才会结束一次性初始化并正式进入工作台。

首次进入工作台后，建议立即完成一次最小验收：

```text
请回复“安装检查通过”，并说明当前会话是否可以正常调用模型。
```

如果模型、会话和回复均正常，再上传一个非敏感的小文件，验证工作区文件读取和结果保存。

## 进入系统后的仪表板

完成初始化后，系统会进入 xAgent 仪表板。这里可以查看 Token 使用情况、模型和工具调用次数，以及当前会话状态；后续可以从仪表板进入 Agent 会话、工作区文件和治理配置。

![xAgent 中文仪表板](/img/getting-started/v005/dashboard-after-setup-zh.webp)

## Connector 是可选项

Connector 不影响 Web 控制台的基本使用。安装器已经安装 Connector 时，打开“Connector 管理”，填写安装器输出的地址和 API Key；没有安装时，可以稍后按照[连接器使用手册](/docs/user-guide/connector)完成接入。

## 下一步

- [完成第一个任务](/docs/getting-started/first-task)
- [Agent 会话](/docs/user-guide/agent-session)
- [模型配置](/docs/user-guide/model-config)
- [私有化部署 AI Agent](/docs/guides/self-hosted-ai-agent)
