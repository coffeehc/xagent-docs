---
slug: xagent-27b-int4-android-packet-capture
title: "我只开了 WLAN 调试，xAgent 用 27B 量化模型搭好了抓包环境"
date: 2026-08-29
description: 我只打开手机 WLAN 调试并接入同一网络，运行 Qwen3.8-27B AWQ INT4 的 xAgent 完成了 Android 设备探测、mitmproxy 与 Frida 部署、代理打通和真实流量验证。
authors: [xagent]
tags: [ai-agent, case-study, quantized-model, android, security-testing]
image: /img/blog/xagent-27b-int4-android-packet-capture/environment-ready-zh.webp
---

我本来只是想试试，给 xAgent 一台测试服务器和一部手机，它能不能把手机流量接到服务器上。

最后它把 mitmproxy 和 Frida 装好了，ADB 和代理链路也通了，还真的从日志里验证了哪些流量能解密、哪些不能。整个过程用的是 **Qwen3.8-27B AWQ INT4**，一个 27B、4bit 量化模型。

这篇文章就按事情发生的顺序记下来。测试服务器和手机都是我自己的测试设备，所有抓包和调试也都发生在授权环境里。

{/* truncate */}

## 我只做了两件事

整个过程中，我实际只做了两件事：

1. 打开手机的 WLAN 调试。
2. 把测试服务器和手机接入同一个网络。

做完以后，我就只和 xAgent 对话了。我没有登录服务器安装工具，也没有自己拼 ADB、代理或 Frida 命令。

## 工具真的装起来了

xAgent 先查出手机型号、Android 版本、无线 ADB 地址和配对状态，然后开始连接服务器和手机。后面做的事情基本都能从截图里对上：

- 服务器上部署了 `mitmproxy 11.0.2`。
- 服务器和手机上分别准备了 `Frida 17.17.0`。
- 无线 ADB、反向端口映射、Android 全局代理和服务器网络规则全部接通。
- 抓包日志开始持续写入，设备连接信息也保存下来，后面的会话还能继续用。

![xAgent 完成 Android 测试设备探测、mitmproxy 与 Frida 部署以及代理链路验证](/img/blog/xagent-27b-int4-android-packet-capture/environment-ready-zh.webp)

*第一轮完成时，工具版本、部署位置、代理链路和日志位置都已经列清楚了。*

看到进程启动、端口开始监听，我已经觉得不错。但这些只能说明命令跑通了，还不能说明手机流量真的被抓到了。

## 后面这次验证更关键

xAgent 接着去读 mitmproxy 的真实日志。日志里的结果很快分成了三种：

- 手机浏览器主页的 HTTPS 请求返回 `200 OK`，内容可以解密，说明用户 CA 已被浏览器或 WebView 信任。
- 浏览器自身的部分后台组件返回 `certificate unknown`，说明它们没有采用同一条用户证书信任链。
- 其他原生 App 的 HTTPS 连接只能看到 TLS 握手，无法直接看到请求内容。

![xAgent 根据 mitmproxy 真实日志区分浏览器、WebView 与原生 App 的证书信任结果](/img/blog/xagent-27b-int4-android-packet-capture/traffic-validation-zh.webp)

*第二轮的结论来自 mitmproxy 日志，不是根据工具进程状态猜的。*

它最后把当前能力说得很清楚：普通 HTTP、浏览器和部分 WebView 可以看到明文；不信任用户证书的原生 App 只能看到连接和 TLS 握手；再往下就要针对具体 App 分析，或者先解决 Root 和系统证书问题。代理侧的上游证书处理和持续日志也顺手补好了。

## Android 的边界很快就出现了

这台手机没有 Root。Android 7 及之后，应用默认不会自动信任用户安装的 CA；应用是否接受用户证书，取决于它自己的网络安全配置、使用的网络栈以及是否启用了证书固定等机制。

所以浏览器能解密，不等于所有 App 都能解密。xAgent 没有把这件事说成配置失败，也没有告诉我已经“全抓通了”。它直接停在了这台设备当时真实能做到的位置。

这点我很在意。工具装上去不难，难的是跑完以后还能看着结果承认边界。

## 27B INT4 跑到了这里

这次用的不是规模最大的闭源模型，就是 Qwen3.8-27B AWQ INT4。模型负责看懂任务和决定下一步，xAgent 把服务器、终端、设备连接、执行结果和前面的状态持续交给它。命令失败了就换办法，日志出来了就接着判断，不需要每轮从头解释。

抓包验证结束后，我又让它研究这台手机能不能 Root。它查了芯片、Bootloader、系统版本和区域，列出可走的路线，也把不能远程处理的部分讲清楚了：后面至少需要一次 USB 物理接入，解锁可能清空数据、影响保修，也有变砖风险。

![xAgent 在长会话中继续评估 Android 设备 Root 路线，并明确物理操作与风险边界](/img/blog/xagent-27b-int4-android-packet-capture/long-session-root-assessment-zh.webp)

*截图顶部是当时的会话数据：当前上下文 `123k / 160k tokens`，整个会话累计约 `35.97M tokens`、缓存命中约 `23.32M tokens`，工具调用 `612` 次。这不是单次抓包任务的独立消耗。*

这些数字不代表 token 越多越好。它真正说明的是，这已经不是三五轮对话：前面堆了大量工具结果，当前上下文也到了 123k，模型还在跟着同一个设备和同一个目标往下走。

一个案例当然不能当 benchmark，也不能推出所有 27B 模型都能做到同样的事。但至少这一次，27B 4bit 模型没有停在“告诉我怎么做”，它确实把事情推进到了可以验证的结果。

## 后面多写案例，少列功能

xAgent 的主体现在基本稳定了。后面我更想记录它在真实环境里做成了什么、卡在了哪里，而不是继续写一长串功能清单。

这篇就作为“xAgent 实战案例”的第一篇。以后的案例也按这个方式写：我给了什么，xAgent 做了什么，最后怎么确认，以及哪些地方它做不了。

准备自己的模型环境可以参考 [AI Agent 模型要求](/docs/deployment/model-requirements/)，第一次验证多步骤任务可以从 [使用 xAgent 完成第一个任务](/docs/getting-started/first-task/) 开始。
