---
slug: xagent-27b-int4-android-packet-capture
title: "A 27B 4-Bit Model Built an Android Packet-Capture Environment Through xAgent"
date: 2026-08-29
description: A Qwen3.8-27B AWQ INT4 model used xAgent to inspect an Android test device, deploy mitmproxy and Frida, connect the proxy path, and validate real traffic. The case shows how an Agent Harness can turn a quantized model into an engineering agent that acts continuously and verifies results.
authors: [xagent]
tags: [ai-agent, case-study, quantized-model, android, security-testing]
image: /img/blog/xagent-27b-int4-android-packet-capture/environment-ready-zh.webp
---

The most important part of this case is not that "AI can set up packet capture."

What surprised me was the model behind the entire process: **Qwen3.8-27B AWQ INT4**. A 27B model quantized to 4 bits used xAgent to inspect a server and an Android phone, deploy the required tools, connect the device, establish the proxy path, and validate real traffic.

This was not a prepared demo. Both the test server and phone were real devices. The task encountered real constraints, including Android's user-CA trust boundary, failed TLS handshakes from native apps, and the limits of working with a device that was not rooted.

{/* truncate */}

## I Only Did Two Things

I gave xAgent access to a test server and an OPPO phone. The goal was to build an environment for analyzing the phone's network traffic.

I performed only two actions during the process:

1. Enabled wireless debugging on the phone.
2. Connected the test server and phone to the same network.

Everything else was driven through natural-language interaction with xAgent. I did not manually sign in to the server to install tools, nor did I assemble the ADB, proxy, or Frida commands myself.

This case used a test server and device under my control. Packet capture, debugging, and security analysis should only be performed in an explicitly authorized environment.

## What xAgent Actually Completed

xAgent first inspected the phone model, Android version, wireless ADB endpoint, and pairing state, then established the connection between the server and the phone. Once that connection was verified, it prepared the full toolchain:

- Created an isolated environment on the server and deployed `mitmproxy 11.0.2`.
- Prepared `Frida 17.17.0` on both the server and Android device.
- Installed supporting utilities required for network and proxy checks on the device.
- Connected the path with wireless ADB, reverse port forwarding, the Android global proxy, and server-side network rules.
- Started persistent logging and verified that device traffic actually reached the proxy server.
- Preserved reusable device connection information for later Sessions.

![xAgent completes Android test-device inspection, mitmproxy and Frida deployment, and proxy-path validation](/img/blog/xagent-27b-int4-android-packet-capture/environment-ready-zh.webp)

*At the end of the first stage, xAgent reported tool versions, deployment locations, the proxy path, validation results, and the limits of a non-rooted device. The product interface in this real case is shown in Chinese.*

If the task had stopped here, it could still have been little more than a demonstration in which every command happened to exit successfully. A running process, a listening port, and a successful tool response do not prove that real phone traffic was recorded and decrypted correctly.

## The Verification That Mattered

xAgent continued by reading real mitmproxy logs and testing different types of phone traffic.

The result was not a simple pass or fail:

- The phone browser's main HTTPS request returned `200 OK` and could be decrypted, showing that the browser or WebView trusted the user CA.
- Some background components used by the browser returned `certificate unknown`, showing that they did not use the same user-certificate trust path.
- HTTPS connections from other native apps exposed only the TLS handshake, not the request content.

![xAgent distinguishes browser, WebView, and native-app certificate trust from real mitmproxy logs](/img/blog/xagent-27b-int4-android-packet-capture/traffic-validation-zh.webp)

*The second stage did not misreport platform-limited traffic as a configuration failure. It classified the actual packet-capture capability from the logs. The product interface in this real case is shown in Chinese.*

xAgent ultimately divided the result into three levels. Plain HTTP and traffic from browsers or WebViews that trust the user certificate could be read in plaintext. Native apps that do not trust user certificates exposed only the connection and TLS handshake. System-level certificates, full traffic mirroring, or deeper process inspection would require root access or analysis targeted at a specific app.

It also hardened upstream-certificate handling on the proxy and kept continuous logs. In other words, the task did not end when the tools were installed. It ended after real requests produced an explainable result.

## The Android Boundary Was Part of the Result

The phone was not rooted. Since Android 7, apps do not automatically trust user-installed CAs by default. Whether an app accepts a user certificate depends on its network security configuration, networking stack, and mechanisms such as certificate pinning.

A certificate working in a browser or some WebViews therefore does not mean every native app can be decrypted. The inability to see some HTTPS plaintext on a non-rooted device is not a failed toolchain, and it should not be presented as complete interception.

That distinction matters. A useful Agent should not always produce a success claim. It should use evidence to separate what is complete, what is constrained by the platform, and what conditions are required for the next step.

## Why This Is Really a 27B INT4 Story

The result would still be useful if it came from the largest proprietary model, but it would not be as striking.

A 27B model quantized to 4 bits keeps model size and inference cost relatively manageable. Yet it did not stop at explaining how to install mitmproxy or generating an operations guide. Inside xAgent, it turned an open-ended goal into a continuous engineering process:

- **An environment for action:** the model could use authorized servers, terminals, and device connections instead of only producing text.
- **State continuity:** device information, completed steps, and current constraints could inform later decisions rather than being rediscovered every turn.
- **Execution feedback:** command results, process status, and real proxy logs returned to the context so the model could adjust its next action.
- **Goal-level control:** the objective was not to call a tool once, but to establish a packet-capture path that could be verified.
- **Explicit boundaries:** permissions, device state, and Android platform rules determined which actions were valid; a plausible paragraph could not replace those facts.

After validating packet capture, I asked xAgent to continue investigating whether the device could be rooted. It first confirmed the chipset, bootloader state, system version, and region, then separated the official unlock path from other technical routes. It also stated the constraints plainly: the next stage required at least one physical USB connection, unlocking could erase all data and affect warranty coverage, and an unsuccessful attempt could leave the device unusable. It did not present a step that could not be completed remotely as something it could "automate away."

![xAgent continues evaluating Android root options in a long Session while identifying physical actions and risk boundaries](/img/blog/xagent-27b-int4-android-packet-capture/long-session-root-assessment-zh.webp)

*The page shows a current context of `123k / 160k tokens`. Across the full Session, it records approximately `35.97M tokens` processed, about `23.32M cached tokens`, and `612` tool calls. These are cumulative Session statistics, not the isolated cost of the packet-capture task.*

The value of these numbers is not that using more tokens is inherently better. They show that the result was not produced by a few fortunate turns. After extensive tool feedback and context progression, the 27B INT4 model could still use the current device facts, identify the missing physical condition, and recommend a next step consistent with the actual risk boundary.

That is the value of an Agent Harness. The model understands the task, reasons about it, and chooses actions. xAgent organizes tools, state, permissions, long-running work, and execution feedback into a path that can keep moving toward the goal.

One case is not a general benchmark, and it does not prove that every 27B model can reliably complete every complex task. The outcome still depends on the model, context length, tool-calling quality, runtime environment, permission boundaries, and task complexity. But this case does provide concrete evidence that, inside the right Agent system, a quantized model can perform engineering work far beyond ordinary chat.

## From Product Building to Real Cases

xAgent's core product is now largely stable. The next priority is not another list of abstractions or features. It is to put xAgent into more real environments and document what it completes, where it fails, and how it continues from actual results.

This article is also the beginning of the "xAgent in Practice" series. Future cases will preserve the full task context, the actions the user actually performed, the actions xAgent performed, the final validation, and the real constraints encountered along the way.

The important change is not that xAgent can call one more tool. It is this:

> When a 27B AWQ INT4 model enters xAgent with tools, state, and a validation loop, it stops being only a model that answers questions and starts becoming an engineering Agent that can complete work in a real environment.

See [AI Agent Model Requirements](/docs/deployment/model-requirements/) to prepare a model environment, or start with [Complete Your First Task with xAgent](/docs/getting-started/first-task/) to validate a multi-step workflow.
