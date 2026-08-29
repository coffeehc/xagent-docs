---
title: Install the Desktop Client and Browser Extension
description: Install the xAgent desktop client and Browser Runtime extension from the public download site, then connect them to an existing xAgent server.
status: beta
updated: 2026-08-29
---

# Install the Desktop Client and Browser Extension

The xAgent server includes the Web console. The desktop client and browser extension are optional access points. Use the desktop client when you want xAgent in a dedicated window. Use the Browser Runtime extension when an Agent needs to read or operate the current browser under xAgent approval policies.

Before continuing, complete the [server installation and setup](/docs/getting-started/install). You will need the server address and an xAgent username and password. Use a valid HTTPS address for a remote server, and do not expose the administration port directly to the public internet.

## Current Packages

The [public release catalog](https://downloads.xagent.xiagaogao.com/versions.json) records the current client version. The [browser extension version pointer](https://downloads.xagent.xiagaogao.com/browser-extension/latest.json) records the current extension version. The links below match the public releases available on August 29, 2026.

### Desktop Client 0.0.2

| System | Architecture | Download |
| --- | --- | --- |
| macOS | Apple Silicon (ARM64) | [Download DMG (recommended)](https://downloads.xagent.xiagaogao.com/xagent-client/0.0.2/xagent-client-v0.0.2-darwin-arm64.dmg) · [Download ZIP](https://downloads.xagent.xiagaogao.com/xagent-client/0.0.2/xagent-client-v0.0.2-darwin-arm64.zip) |
| Windows | x64 (AMD64) | [Download ZIP](https://downloads.xagent.xiagaogao.com/xagent-client/0.0.2/xagent-client-v0.0.2-windows-amd64.zip) |
| Windows | ARM64 | [Download ZIP](https://downloads.xagent.xiagaogao.com/xagent-client/0.0.2/xagent-client-v0.0.2-windows-arm64.zip) |

See the [client release manifest](https://downloads.xagent.xiagaogao.com/xagent-client/0.0.2/release.json) and [SHA256SUMS](https://downloads.xagent.xiagaogao.com/xagent-client/0.0.2/SHA256SUMS) for the ZIP and Windows portable package filenames and checksums. The macOS DMG checksum is listed in the installation steps below. There is currently no Intel Mac or Linux desktop client package.

### Browser Runtime 0.1.0

| Browser | Package | Purpose |
| --- | --- | --- |
| Chrome | [Download ZIP](https://downloads.xagent.xiagaogao.com/browser-extension/0.1.0/xagent-browser-extension-v0.1.0-chrome.zip) | Extract and install with **Load unpacked** |
| Safari | [Download developer conversion package](https://downloads.xagent.xiagaogao.com/browser-extension/0.1.0/xagent-browser-extension-v0.1.0-safari.zip) | Convert and sign with Xcode; this is not a directly installable Safari app |

See the [browser extension release manifest](https://downloads.xagent.xiagaogao.com/browser-extension/0.1.0/release.json) and [SHA256SUMS](https://downloads.xagent.xiagaogao.com/browser-extension/0.1.0/SHA256SUMS) for the complete filenames and checksums.

## Install the Desktop Client

### macOS Apple Silicon

1. Download the macOS ARM64 DMG.
2. Verify the downloaded file:

   ```bash
   shasum -a 256 ~/Downloads/xagent-client-v0.0.2-darwin-arm64.dmg
   ```

   The result must be:

   ```text
   a9424fba0cbfa609c532fd93cd8ad3a7e71e7bc6c822fab430f7ed143b34106f
   ```

3. Open the DMG and drag `xagent-client.app` to the **Applications** folder shown in the disk image.
4. Eject the disk image, then open `xagent-client.app` from **Applications**.

If you cannot use the DMG, download the ZIP instead. Its SHA-256 is `5838a9cb718f5fbc77984ed841016c770f0d3ade47b919115336b8232a440f9b`. Extract it and move `xagent-client.app` to **Applications**.

### Windows

1. Open **Settings > System > About** and confirm whether the device is x64 or ARM64, then download the matching ZIP.
2. Verify the file in PowerShell:

   ```powershell
   Get-FileHash "$HOME\Downloads\xagent-client-v0.0.2-windows-amd64.zip" -Algorithm SHA256
   ```

   The x64 package SHA-256 must be:

   ```text
   3f91edf3b23c4383f49468e3416a21ac0304954f53d3507a6ec677d7531e1f6e
   ```

   The ARM64 package SHA-256 must be:

   ```text
   698ca82addcef97b751089f448c1aed3fdcdbb11d8ad372f9304362585296fd2
   ```

3. Extract the ZIP, place `xagent-client.exe` in a permanent directory, and run it. The current client is portable and does not use an installer.

### Connect to the xAgent Server

When the client opens, enter:

- **Server address**: The root address of the deployed xAgent server, such as `https://xagent.example.com`. Do not add an `/api` path.
- **Username and password**: The same account used to sign in to the Web console.

After authentication, the client opens its workspace. The client reads the public release catalog and displays an in-app update action when a newer compatible version is available.

## Install Chrome Browser Runtime

1. Download the Chrome ZIP and verify its SHA-256:

   ```bash
   shasum -a 256 ~/Downloads/xagent-browser-extension-v0.1.0-chrome.zip
   ```

   The result must be:

   ```text
   68d5f12b4838e743b9eb49345581611602a73c30f26185ee5c9af5d5e703cb1a
   ```

   On Windows, use `Get-FileHash` for the same check.

2. Extract the ZIP into a permanent directory. Do not delete or move this directory after loading the extension.
3. Open `chrome://extensions` in Chrome.
4. Turn on **Developer mode**.
5. Select **Load unpacked**, then choose the extracted directory that contains `manifest.json`.
6. Select the **xAgent Browser Runtime** toolbar icon to open its side panel.
7. Enter the xAgent server address, username, password, and a device name, then select **Connect to xAgent**.

When the status changes to **Connected**, xAgent creates or restores the Browser Connector Channel for this browser instance. The password is used only to obtain an access token and is not stored by the extension.

### Verify the Browser Connection

Open a normal webpage that contains no sensitive information, then send this message from the Browser Runtime panel:

```text
List the titles of the browser tabs that are currently open. Do not modify any page.
```

If xAgent shows an approval request, inspect the Tool name, target tab, and resource scope before approving it. Returning the tab titles without changing the page verifies the extension, Browser Channel, and read-only Tool path.

### Chrome Permissions

The Chrome package uses Manifest V3 and requests webpage access, tabs, scripting, side panel, storage, and `debugger` permissions. The `debugger` permission enables Chrome DevTools Protocol features. Navigation, clicks, text entry, drag-and-drop, and debugger attachment remain subject to xAgent approval policies. Download the package only from the xAgent download domain, and inspect the resource scope before approving an operation.

A locally loaded Chrome extension does not receive store updates. When a new version is released, download the new ZIP, extract it over the permanent extension directory, and select **Reload** for the extension on `chrome://extensions`.

## Safari Developer Installation

The Safari ZIP in R2 is WebExtension source, not a signed Safari app. Use it only when Xcode is available and you can complete code signing yourself:

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

In Xcode, select your signing team, build and run the generated macOS app, then enable Browser Runtime in Safari extension settings. Chrome is currently the recommended package for general users.

## Troubleshooting

### The client or extension cannot connect

Open the xAgent server address in a browser on the same device and confirm that the network, HTTPS certificate, and account credentials work. Enter only the site root as the server address, without `/api`. Do not use the server's `127.0.0.1` address from another device.

### Chrome reports an invalid extension directory

Select the extracted directory that directly contains `manifest.json`, not the ZIP file or its parent directory. Keep that directory after the extension loads.

### The extension is connected, but some page operations are unavailable

Chrome internal pages, extension pages, and other browser-restricted pages cannot be controlled by normal webpage Tools. Actions that modify a page or attach the debugger may also be waiting for approval. Review the request on the xAgent **Approvals** page instead of weakening the global policy.

## Next Steps

- [Complete Your First Task](/docs/getting-started/first-task)
- [Browser Automation Approval and Safety](/docs/guides/agent-approval-security)
- [Connector User Guide](/docs/user-guide/connector)
