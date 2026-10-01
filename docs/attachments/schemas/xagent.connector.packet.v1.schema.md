---
title: "Connector Packet JSON Schema"
description: "xAgent Connector Packet Envelope xagent.connector.packet/v1 的完整 JSON Schema。"
updated: 2026-10-01
---

<div className="alert alert--warning margin-bottom--lg" role="note">

**历史 Connector 资料**

本文保留旧版 Connector Schema 或 Profile，用于兼容性核对。原规范中的“当前”指当时的协议代际，不代表今天的 AgentPlugin 合同。排查旧连接时可逐项对照原字段和示例；新接入请从 [AgentPlugin 使用说明](/docs/user-guide/connector)开始。

</div>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "urn:xagent:schema:xagent.connector.packet:v1",
  "title": "xAgent Connector Packet Envelope v1",
  "type": "object",
  "required": [
    "schema",
    "packet_id",
    "type"
  ],
  "properties": {
    "schema": {
      "const": "xagent.connector.packet/v1"
    },
    "packet_id": {
      "type": "string",
      "minLength": 1
    },
    "request_id": {
      "type": "string"
    },
    "reply_to": {
      "type": "string"
    },
    "connector_channel_id": {
      "type": "string"
    },
    "type": {
      "type": "string",
      "minLength": 1
    },
    "time": {
      "type": "integer",
      "minimum": 0
    },
    "payload": {
      "type": "object"
    },
    "error": {
      "$ref": "#/$defs/error"
    }
  },
  "$defs": {
    "error": {
      "type": "object",
      "required": [
        "code"
      ],
      "properties": {
        "code": {
          "type": "string",
          "minLength": 1
        },
        "message": {
          "type": "string"
        }
      }
    }
  }
}
```
