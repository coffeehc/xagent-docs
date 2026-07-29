---
title: xAgent Device Profile v1
description: Device binding, capability declarations, operation boundaries, and media result delivery for xAgent Device Profile v1.
updated: 2026-07-29
---

# xAgent Device Profile v1

This document defines device binding, capability declarations, and device-operation boundaries for `xagent.device.v1`.
For the common connection, authentication, Tool, media, and error protocols, see the
[xAgent Connector Common Protocol](../xagent_connector_protocol.md).

## 1. Purpose

`xagent.device.v1` represents a Connector Channel bound to a device that can be observed or controlled.

The Profile defines:

- Standard declarations for device targets.
- The external semantics of the binding between a channel and a device.
- Safety boundaries for observation and control Tools.
- Delivery constraints for media results such as device screenshots.

The Profile does not prescribe ADB, a vendor cloud API, a LAN protocol, or any other device-specific protocol. It also does not require every Device Connector to expose the same Tools.

## 2. Profile Declaration

The Connector Card must declare the `device` target type and `xagent.device.v1`:

```json
{
  "supports": {
    "target_types": ["device"],
    "targets": [
      {
        "target_type": "device",
        "provider": "adb",
        "label": "Android Device"
      }
    ],
    "profiles": ["xagent.device.v1"]
  }
}
```

After authentication or binding completes, `connection.target_type` in the Connection Descriptor must be `device`, and `connection.profiles` must include `xagent.device.v1`.

## 3. Device Binding

Implementations must follow these rules:

- The Connector locates the currently bound device through `connector_channel_id`.
- The Connector owns facts such as the device serial number, network address, and platform account. It must not ask the Agent to supply these values freely to bypass the channel binding.
- The Descriptor must reflect whether the device is currently bound, online, and available.
- After the device is unbound, goes offline, or loses permission, the Connector must correct the Descriptor and Tool availability state.
- The Connector decides whether multiple channels may share a device, but concurrency and side-effect semantics must be explicit.

Device leases, disconnect grace periods, and preemption policy are implementation guidance. Implementers should document them for their Connector.

## 4. Tool Categories

A Device Connector can declare:

- Observation Tools, such as status, screenshots, sensors, or accessible UI reads.
- Control Tools, such as taps, text input, application launch, or device commands.
- File or media Tools, such as retrieving a screenshot or uploading a file for processing.

Implementations must follow these rules:

- A Tool can operate only on the currently available device bound to the current channel.
- A Tool must exist in the Card and be marked with its current availability in the Descriptor.
- A control Tool must validate parameter ranges and target-system permissions.
- System API keys, device keys, and platform tokens must not be exposed to the Agent.
- A side-effecting operation must define explicit repeated-call behavior. A network retry must not be interpreted implicitly as permission to execute the operation again.

## 5. Concurrency and State

The Profile does not require a particular internal lock, queue, or worker implementation.

Recommendations:

- Serialize side-effecting operations on the same device by channel.
- Observation operations can run concurrently when the device protocol supports it safely.
- When restoring a binding after a Connector restart, verify that the device remains accessible before projecting the state as `connected`.
- Use different stable error codes for an offline device, a command timeout, and permission denial.
- A long-running operation can use `tool.progress.push` from the common protocol, but must still finish with `tool.invoke.ack`.

## 6. Device Files

Screenshots, recordings, and device files must not be placed directly in a WebSocket payload, Tool argument, or base64 field.

The Connector should return a `file_ref` and downloadable URL through the Transfer Plane. File-cache TTL, capacity, and cleanup interval are implementation choices, but each must be finite and should be documented.

## 7. Security

- The Connector must restrict executable device actions. It must not expose an arbitrary shell or unconstrained commands as model Tools by default.
- For high-risk operations involving privacy, payment, accounts, or security settings, the Connector can require additional authorization or refuse execution.
- Logs must not contain device keys, complete authentication material, or sensitive input content.
- The Connector must not depend on xAgent's internal user table, Session state, or Agent state for device routing.

## 8. Conformance Checklist

- Do the Card and Descriptor correctly declare `device` and `xagent.device.v1`?
- Does every Tool operate only on the device bound to the channel?
- Do offline and permission changes correct the Descriptor?
- Does every side-effecting Tool define repeated-call behavior?
- Is media delivered through the Transfer Plane?
- Are lease, concurrency, TTL, capacity, and other implementation policies documented for the Connector?
