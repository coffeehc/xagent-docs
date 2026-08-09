---
title: 安装客户端与浏览器插件
description: 从 xAgent 下载站安装桌面客户端和 Browser Runtime 浏览器插件，并连接到已有的 xAgent 服务。
status: beta
updated: 2026-08-10
---

# 安装客户端与浏览器插件

xAgent 服务端提供 Web 控制台，桌面客户端和浏览器插件都是按需安装的入口。桌面客户端适合在独立窗口中使用 xAgent；Browser Runtime 插件则把当前浏览器连接到 xAgent，让 Agent 在审批规则约束下读取或操作网页。

开始前，请先完成[服务端安装与初始化](/docs/getting-started/install)，并准备好服务地址、用户名和密码。远程服务建议使用有效的 HTTPS 地址，不要把管理端口直接暴露到公网。

## 当前安装包

下载站的[公开版本目录](https://downloads.xagent.xiagaogao.com/versions.json)记录当前客户端版本，[浏览器插件版本指针](https://downloads.xagent.xiagaogao.com/browser-extension/latest.json)记录当前插件版本。以下链接对应 2026 年 8 月 10 日的公开版本。

### 桌面客户端 0.0.1

| 系统 | 架构 | 下载 |
| --- | --- | --- |
| macOS | Apple Silicon (ARM64) | [下载 DMG（推荐）](https://downloads.xagent.xiagaogao.com/xagent-client/0.0.1/xagent-client-v0.0.1-darwin-arm64.dmg) · [下载 ZIP](https://downloads.xagent.xiagaogao.com/xagent-client/0.0.1/xagent-client-v0.0.1-darwin-arm64.zip) |
| Windows | x64 (AMD64) | [下载 ZIP](https://downloads.xagent.xiagaogao.com/xagent-client/0.0.1/xagent-client-v0.0.1-windows-amd64.zip) |
| Windows | ARM64 | [下载 ZIP](https://downloads.xagent.xiagaogao.com/xagent-client/0.0.1/xagent-client-v0.0.1-windows-arm64.zip) |

ZIP 安装包和 Windows 便携包的文件名及校验值见[客户端发布清单](https://downloads.xagent.xiagaogao.com/xagent-client/0.0.1/release.json)与 [SHA256SUMS](https://downloads.xagent.xiagaogao.com/xagent-client/0.0.1/SHA256SUMS)。macOS DMG 的校验值见下方安装步骤。当前没有 Intel Mac 或 Linux 桌面客户端安装包。

### Browser Runtime 0.1.0

| 浏览器 | 安装包 | 用途 |
| --- | --- | --- |
| Chrome | [下载 ZIP](https://downloads.xagent.xiagaogao.com/browser-extension/0.1.0/xagent-browser-extension-v0.1.0-chrome.zip) | 解压后通过“加载已解压的扩展程序”安装 |
| Safari | [下载开发者转换包](https://downloads.xagent.xiagaogao.com/browser-extension/0.1.0/xagent-browser-extension-v0.1.0-safari.zip) | 供开发者使用 Xcode 转换和签名，不是可直接安装的 Safari App |

完整的文件名和校验值见[浏览器插件发布清单](https://downloads.xagent.xiagaogao.com/browser-extension/0.1.0/release.json)与 [SHA256SUMS](https://downloads.xagent.xiagaogao.com/browser-extension/0.1.0/SHA256SUMS)。

## 安装桌面客户端

### macOS Apple Silicon

1. 下载 macOS ARM64 DMG。
2. 校验下载文件：

   ```bash
   shasum -a 256 ~/Downloads/xagent-client-v0.0.1-darwin-arm64.dmg
   ```

   输出应为：

   ```text
   9f9688915be08a8bad4064e7d7570592afb52eaac0ebc5c8a418176256d41b61
   ```

3. 双击打开 DMG，将 `xagent-client.app` 拖到映像中的“应用程序”文件夹。
4. 推出磁盘映像，再从“应用程序”目录打开 `xagent-client.app`。

如果不能使用 DMG，也可以下载 ZIP。ZIP 的 SHA-256 为 `dc8f0eb0c598655241a4381d0767815181ffbdfc8d9c353311125dc3ed941eac`；解压后将 `xagent-client.app` 移到“应用程序”目录。

### Windows

1. 在“设置 > 系统 > 系统信息”中确认设备是 x64 还是 ARM64，然后下载对应 ZIP。
2. 在 PowerShell 中校验文件：

   ```powershell
   Get-FileHash "$HOME\Downloads\xagent-client-v0.0.1-windows-amd64.zip" -Algorithm SHA256
   ```

   x64 包的 SHA-256 应为：

   ```text
   a7d2c96b60bcbb16a227140ee5455af2d17dc809220870f95293dfca630de284
   ```

   ARM64 包的 SHA-256 应为：

   ```text
   330a077b1aa2f94ea117b0abf7649c42d0c1f3290512f197f5d8fac5dafba2e1
   ```

3. 解压 ZIP，将 `xagent-client.exe` 放到一个固定目录后运行。当前客户端是便携版，不需要安装程序。

### 连接 xAgent 服务

客户端打开后，填写：

- **服务地址**：已经部署好的 xAgent 地址，例如 `https://xagent.example.com`。不要附加 `/api` 路径。
- **用户名和密码**：与 Web 控制台相同的登录账号。

登录成功后会进入客户端工作台。客户端会读取公开版本目录；检测到新版本时，可以按照应用内提示完成下载、校验和更新。

## 安装 Chrome Browser Runtime

1. 下载 Chrome ZIP，并校验 SHA-256：

   ```bash
   shasum -a 256 ~/Downloads/xagent-browser-extension-v0.1.0-chrome.zip
   ```

   输出应为：

   ```text
   68d5f12b4838e743b9eb49345581611602a73c30f26185ee5c9af5d5e703cb1a
   ```

   Windows 可以使用 `Get-FileHash` 完成同样的校验。

2. 将 ZIP 解压到一个固定目录。后续不要删除或移动这个目录。
3. 在 Chrome 打开 `chrome://extensions`。
4. 开启右上角的“开发者模式”。
5. 点击“加载已解压的扩展程序”，选择包含 `manifest.json` 的解压目录。
6. 点击工具栏中的 **xAgent Browser Runtime** 图标，打开 Side Panel。
7. 填写 xAgent 服务地址、用户名、密码和设备名称，然后点击“连接 xAgent”。

状态显示“已连接”后，xAgent 会为当前浏览器实例创建或恢复 Browser Connector Channel。密码只用于换取访问令牌，不写入浏览器存储。

### 验证浏览器连接

打开一个不包含敏感信息的普通网页，在 Browser Runtime 面板中发送：

```text
请列出当前浏览器已打开的标签页标题，不要修改任何页面。
```

如果系统显示审批请求，请先检查工具名称、目标标签页和操作范围，再决定是否批准。能返回标签页标题且页面没有被修改，说明插件、Browser Channel 和只读工具链均已连通。

### Chrome 权限说明

Chrome 包使用 Manifest V3，并申请网页访问、标签页、脚本注入、侧边栏、存储和 `debugger` 权限。`debugger` 权限用于 Chrome DevTools Protocol 能力；导航、点击、输入、拖放和调试连接等写操作仍受 xAgent 审批策略约束。只从 xAgent 下载站获取安装包，并在批准操作前检查实际资源范围。

本地加载的 Chrome 扩展不会通过商店自动更新。新版本发布后，请下载新 ZIP，解压到原目录并在 `chrome://extensions` 中点击该扩展的“重新加载”。

## Safari 开发者安装

R2 中的 Safari ZIP 是 WebExtension 源包，不是已经签名的 Safari App。仅在本机具备 Xcode、并且你可以自行完成签名时使用：

```bash
unzip xagent-browser-extension-v0.1.0-safari.zip -d xagent-browser-runtime-safari
xcrun safari-web-extension-converter \
  --macos-only \
  --copy-resources \
  --no-open \
  --no-prompt \
  --project-location xagent-browser-runtime-safari-project \
  xagent-browser-runtime-safari
```

随后在 Xcode 中选择自己的签名团队，构建并运行生成的 macOS App，再到 Safari 的扩展设置中启用 Browser Runtime。普通用户目前应优先使用 Chrome 包。

## 常见问题

### 客户端或插件无法连接服务

先在同一台设备的浏览器中打开 xAgent 服务地址，确认网络、HTTPS 证书和登录账号正常。服务地址只填写站点根地址，不要附加 `/api`。远程访问不要使用服务端的 `127.0.0.1` 地址。

### Chrome 提示扩展目录无效

确认选择的是解压后直接包含 `manifest.json` 的目录，而不是 ZIP 文件或它的上级目录。扩展加载成功后应保留该目录。

### 插件已连接，但某些页面操作不可用

Chrome 内置页面、扩展页面以及浏览器限制访问的页面不能由普通网页工具控制。需要写入页面或连接调试器的操作还可能等待审批；请到 xAgent 的“审批”页面检查请求，不要通过放宽全局策略绕过审批。

## 下一步

- [完成第一个任务](/docs/getting-started/first-task)
- [浏览器自动化的审批与安全控制](/docs/guides/agent-approval-security)
- [连接器使用手册](/docs/user-guide/connector)
