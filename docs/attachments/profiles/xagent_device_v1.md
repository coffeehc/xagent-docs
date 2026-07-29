---
title: xAgent Device Profile v1
description: xAgent Device Profile v1 的设备绑定、能力声明、操作边界和媒体结果交付规范。
---

# xAgent Device Profile v1

本文档定义 `xagent.device.v1` 的设备绑定、能力声明和设备操作边界。
公共连接、认证、工具、媒体和错误协议见
[xAgent Connector Common Protocol](../xagent_connector_protocol.md)。

## 1. 定位

`xagent.device.v1` 表示 Connector Channel 绑定到可观察或操作的设备。

Profile 负责：

- 设备目标的标准声明。
- channel 与设备绑定关系的外部语义。
- 观察类和操作类工具的安全边界。
- 设备截图等媒体结果的交付约束。

Profile 不规定 ADB、厂商云 API、局域网协议或其他具体设备协议，也不要求所有 Device Connector 提供相同工具。

## 2. Profile 声明

Connector Card 必须声明 `device` target type 和 `xagent.device.v1`：

```json
{
  "supports": {
    "target_types": ["device"],
    "targets": [
      {
        "target_type": "device",
        "provider": "adb",
        "label": "Android 设备"
      }
    ],
    "profiles": ["xagent.device.v1"]
  }
}
```

认证或绑定完成后，Connection Descriptor 的 `connection.target_type` 必须是 `device`，并在 `connection.profiles` 声明 `xagent.device.v1`。

## 3. 设备绑定

必须遵守：

- Connector 通过 `connector_channel_id` 定位当前绑定设备。
- 设备序列号、网络地址、平台账号等事实由 Connector 管理，不能要求 Agent 自由填写以绕过 channel 绑定。
- Descriptor 必须反映设备当前是否已绑定、在线和可用。
- 设备解绑、离线或权限变化后，Connector 必须回正 Descriptor 和工具可用状态。
- 多 channel 是否允许共享设备由 Connector 定义，但必须保证并发和副作用语义明确。

设备租约、断线保护时间和抢占策略属于实现建议；实现者应在 Connector 文档中说明。

## 4. 工具分类

Device Connector 可以声明：

- 观察类工具，例如状态、截图、传感器或可访问 UI 读取。
- 操作类工具，例如点击、输入、启动应用或发送设备指令。
- 文件或媒体类工具，例如获取截图或上传待处理文件。

必须遵守：

- 工具只能操作当前 channel 已绑定且当前可用的设备。
- 工具必须在 Card 中真实存在，并在 Descriptor 中声明当前可用状态。
- 操作类工具必须校验参数范围和目标系统权限。
- 不得把系统 API key、设备密钥或平台 token 暴露给 Agent。
- 有副作用操作必须具备明确的重复调用语义；不能把网络重试隐式解释为再次执行。

## 5. 并发与状态

Profile 不强制内部锁、队列或 worker 实现。

建议：

- 同一设备的有副作用操作按 channel 串行执行。
- 观察类操作可以在设备协议安全时并发。
- Connector 重启后恢复绑定时先验证设备仍可访问，再把状态投影为 connected。
- 设备离线、命令超时和权限拒绝使用不同稳定错误 code。
- 长耗时操作可以使用主协议的 `tool.progress.push`，最终仍以 `tool.invoke.ack` 收束。

## 6. 设备文件

截图、录屏或设备文件不得直接放入 WebSocket payload、工具参数或 base64 字段。

Connector 应通过 Transfer Plane 返回 `file_ref` 和可下载 URL。文件缓存 TTL、容量和清理周期由实现决定，但必须有限，并应在实现文档中说明。

## 7. 安全

- Connector 必须限制可执行的设备动作，不能把任意 shell 或未约束命令默认暴露为模型工具。
- 涉及隐私、支付、账号、安全设置等高风险操作时，Connector 可以要求额外授权或拒绝执行。
- 日志不能记录设备密钥、完整认证材料或敏感输入正文。
- Connector 不得依赖 xAgent 内部用户表、Session 或 Agent 状态做设备路由。

## 8. 一致性检查

- Card 和 Descriptor 是否正确声明 `device` 与 `xagent.device.v1`？
- 所有工具是否只操作 channel 绑定设备？
- 离线和权限变化是否会回正 Descriptor？
- 有副作用工具是否定义了重复调用行为？
- 媒体是否通过 Transfer Plane 交付？
- 租约、并发、TTL 和容量等实现策略是否已在 Connector 文档中说明？
