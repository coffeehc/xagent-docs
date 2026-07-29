---
title: Connector Packet JSON Schema
description: Complete JSON Schema for the xAgent Connector Packet Envelope xagent.connector.packet/v1.
updated: 2026-07-29
---

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
