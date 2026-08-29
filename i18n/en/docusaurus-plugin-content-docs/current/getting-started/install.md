---
title: Start Installing xAgent
description: Install and verify xAgent v0.0.13.beta from the server installer through the first system setup flow.
image: /img/getting-started/v005/install-terminal.webp
status: beta
updated: 2026-08-29
---

# Start Installing xAgent

This page is for administrators installing xAgent for the first time. It starts with the installer command and walks through the system setup that opens automatically when you first visit the Web console. For server preparation and self-hosting boundaries, continue to [Self-host an AI Agent](/docs/guides/self-hosted-ai-agent).

## Before You Start

Confirm that:

**Operating system recommendation:** xAgent currently supports Linux (AMD64/ARM64) and macOS. For server deployments that need stable long-running operation, automatic startup, and minimal downtime, Debian Linux is recommended, with systemd managing the service. macOS is xAgent's primary development environment, so development, testing, and personal deployment support are also strong. Windows is not recommended for deployment for now because its current sandbox support is not sufficient to provide safe and controllable execution of xAgent-managed scripts equivalent to Linux or macOS.

- Linux uses AMD64 or ARM64 and the current account has `root` or `sudo` access. macOS also supports a user-level installation.
- The host can reach `downloads.xagent.xiagaogao.com`, your model API, and any external systems you plan to connect later.
- There is enough disk space for versioned binaries, runtime data, workspace files, and Runtime Assets.
- If the service will be public, plan HTTPS through a reverse proxy, firewall rules, and access control. xAgent does not terminate TLS itself.
- If this is an upgrade, back up the configuration, database, workspace, and Connector state first.

## Step 1: Run the Installer

Linux and macOS use the same installer command:

```bash
curl -fsSL https://downloads.xagent.xiagaogao.com/scripts/install.sh | bash
```

The installer detects the operating system and CPU architecture, downloads and verifies the matching package, installs or upgrades xAgent, and creates, enables, and starts the `xagent-server` systemd service on Linux.

![Linux installer output showing environment detection, xAgent installation, and Connector prompts](/img/getting-started/v005/install-terminal.webp)

The image shows the complete interaction order: xAgent is installed first, then the installer asks whether to install Connectors. After a Connector is selected, it downloads and verifies the package, registers the service, and prints the connection address and API Key. Never publish API Keys in documentation, screenshots, or public logs.

If you only need the Web console for now, answer `N` when the installer asks about Connectors. For unattended installation, use:

```bash
curl -fsSL https://downloads.xagent.xiagaogao.com/scripts/install.sh \
  | bash -s -- --yes --no-connectors
```

## Step 2: Verify the Installation

After the installer exits, confirm the version:

```bash
xagent version
```

The target version is `0.0.13.beta`. The installer command is unchanged and reads the current release catalog. On Linux, also check the service:

```bash
sudo systemctl status xagent-server
journalctl -u xagent-server -f
```

After a successful start, the default Web address is:

```text
http://server-address:18888/
```

Do not expose port `18888` directly to the public internet. Use Nginx, Caddy, or another reverse proxy for HTTPS and restrict the allowed sources.

## Step 3: Open System Setup

After the service starts, the first visit to the Web address automatically opens the **System setup** page. You do not need to find another settings entry. The page shows these steps in order and advances automatically after each step is completed:

1. Configure the data directory.
2. Initialize the administrator.
3. Set the default model.
4. Prepare Runtime Assets.
5. Check runtime components.
6. Finish setup and enter the workspace.

![xAgent English system setup page](/img/getting-started/v005/system-setup-en.webp)

## Step 4: Configure the Data Directory

The data directory stores the xAgent database, workspaces, and Runtime Assets. Linux production installations default to:

```text
/opt/xagent/data
```

Use an absolute path and make sure the xAgent runtime account can read and write it. This directory must be persistent. Do not place it in a temporary directory, a container temporary layer, or a location that is cleaned automatically.

Select **Save and continue** to persist the directory and move to administrator initialization.

## Step 5: Initialize the Administrator

Create the first administrator login name and password. This account is used to sign in, configure models, manage users, set approval policies, and maintain Connectors.

![xAgent English administrator initialization page](/img/getting-started/v005/system-setup-admin-en.webp)

Recommendations:

- Use a dedicated administrator account instead of reusing a normal user password.
- Use a long, unique password and store it in a password manager.
- Never put administrator credentials in sessions, workspace files, or screenshots.

After the account is created, xAgent signs you in automatically and moves to model configuration.

## Step 6: Set the Default Model

Enter the default model connection information and select **Test and save**. The setup flow moves to the next step only after the model connection test passes.

![xAgent English default model setup page](/img/getting-started/v005/system-setup-model-en.webp)

The main fields are:

- **Model name**: The name shown in xAgent, such as `Qwen3.6-27B`.
- **Provider type**: The model service protocol, such as OpenAI Chat Completions.
- **Real model name**: The actual model ID sent to the model service, such as `qwen3.6-27b`.
- **Base URL**: The compatible API address, including a path such as `/v1` when required by the service.
- **API Key**: The model service credential. Do not put it in documentation, screenshots, or public logs after saving it.
- **Model capabilities**: Select chat, image generation, tool calls, vision, audio, and files according to the model's actual capabilities. Image generation is currently available only for OpenAI-compatible configurations that support it.
- **Advanced options**: Configure timeout and other request parameters only when needed.

The connectivity test only proves that the service is reachable. Run a real task afterward to verify tool calls, file processing, and saved outputs. See [Model Configuration](/docs/user-guide/model-config) for field details.

## Step 7: Prepare Runtime Assets

Runtime Assets are managed task dependencies used by file processing, local tools, and other controlled execution. The setup page automatically downloads, verifies, and installs these dependencies. You do not need to install Python, Node.js, or other tools into the host environment by hand.

![xAgent English Runtime Assets installation step](/img/getting-started/v005/system-setup-runtime-en.webp)

When the page shows that Runtime Assets are not ready, select **Download and install**. xAgent downloads the matching runtime dependencies from the download site, verifies them, and installs them. The setup flow continues after this step changes to **Completed**.

Wait for this step to complete before continuing. If the download or installation fails, check the service logs and download connectivity instead of bypassing the setup flow.

## Step 8: Check Runtime Components

Runtime components provide document processing, command isolation, and other local execution capabilities. xAgent installs and tests these components automatically. After the test passes, open **Agent governance > Execution environment** and confirm that Runtime Assets and ProcessSandbox are available.

If the check fails:

1. Record the error shown on the page.
2. Check the `xagent-server` service logs.
3. Confirm that the host can reach the download site and that the kernel supports the sandbox features required by Linux.
4. Run the check again after fixing the cause. Do not enable unrestricted host execution as a workaround.

## Step 9: Finish Setup

When the data directory, administrator, model, Runtime Assets, and runtime components are complete, select **Finish setup**. xAgent enters the workspace, and users can access it through the Web UI or installed Connectors.

![xAgent English finish setup step](/img/getting-started/v005/system-setup-finish-en.webp)

The final step summarizes the completed items. Confirm that every item shows **Completed**, then select **Finish and open dashboard** to end the one-time setup and enter the workspace.

Run a minimal acceptance check immediately after entering the workspace:

```text
Reply with “installation check passed” and tell me whether this session can call the configured model.
```

If the model, session, and reply work, upload a small non-sensitive file to verify workspace reading and result saving.

## The Dashboard After Setup

After setup is complete, xAgent opens the dashboard. It shows token usage, model and tool call counts, and the current session state. From here, you can continue to Agent sessions, workspace files, and governance settings.

![xAgent English dashboard](/img/getting-started/v005/dashboard-after-setup-en.webp)

## Connectors Are Optional

Connectors are not required for basic Web console access. If the installer installed a Connector, open **Connectors** and enter the address and API Key printed by the installer. If you skipped Connectors, complete the connection flow later with the [Connector user guide](/docs/user-guide/connector). For Database and SSH, see [Database Connector Setup](/docs/user-guide/database-connector) and [SSH Connector Setup](/docs/user-guide/ssh-connector).

## Next Steps

- [Install the Desktop Client and Browser Extension](/docs/getting-started/install-client-and-browser-extension)
- [Complete Your First Task](/docs/getting-started/first-task)
- [Agent Session](/docs/user-guide/agent-session)
- [Model Configuration](/docs/user-guide/model-config)
- [Self-host an AI Agent](/docs/guides/self-hosted-ai-agent)
