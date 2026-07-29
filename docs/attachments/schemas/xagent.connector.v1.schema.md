---
title: Connector Card JSON Schema
description: xAgent Connector Card xagent.connector/v1 的完整 JSON Schema。
---

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "urn:xagent:schema:xagent.connector:v1",
  "title": "xAgent Connector Card v1",
  "type": "object",
  "required": [
    "schema",
    "protocol_version",
    "build",
    "connector_card_id",
    "connector",
    "supports"
  ],
  "properties": {
    "schema": {
      "const": "xagent.connector/v1"
    },
    "protocol_version": {
      "const": "3.0"
    },
    "build": {
      "$ref": "#/$defs/build"
    },
    "connector_card_id": {
      "type": "string",
      "minLength": 1
    },
    "connector": {
      "$ref": "#/$defs/connector"
    },
    "supports": {
      "$ref": "#/$defs/supports"
    },
    "tools": {
      "type": "array",
      "items": {
        "$ref": "#/$defs/tool"
      }
    },
    "auth_flows": {
      "type": "array",
      "items": {
        "$ref": "#/$defs/authFlow"
      }
    },
    "ui": {
      "$ref": "#/$defs/ui"
    },
    "security": {
      "$ref": "#/$defs/security"
    }
  },
  "$defs": {
    "nonEmptyString": {
      "type": "string",
      "minLength": 1
    },
    "targetType": {
      "enum": [
        "im",
        "email",
        "calendar",
        "ticket",
        "device"
      ]
    },
    "build": {
      "type": "object",
      "required": [
        "build_time"
      ],
      "properties": {
        "version": {
          "type": "string"
        },
        "git_tag": {
          "type": "string"
        },
        "git_rev": {
          "type": "string"
        },
        "build_time": {
          "type": "string"
        }
      }
    },
    "connector": {
      "type": "object",
      "required": [
        "name",
        "version"
      ],
      "properties": {
        "name": {
          "$ref": "#/$defs/nonEmptyString"
        },
        "version": {
          "$ref": "#/$defs/nonEmptyString"
        },
        "vendor": {
          "type": "string"
        },
        "description": {
          "type": "string"
        }
      }
    },
    "supports": {
      "type": "object",
      "required": [
        "target_types",
        "profiles"
      ],
      "properties": {
        "user_channel_mode": {
          "enum": [
            "single",
            "multiple"
          ]
        },
        "target_types": {
          "type": "array",
          "minItems": 1,
          "uniqueItems": true,
          "items": {
            "$ref": "#/$defs/targetType"
          }
        },
        "targets": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/target"
          }
        },
        "profiles": {
          "type": "array",
          "minItems": 1,
          "uniqueItems": true,
          "items": {
            "$ref": "#/$defs/nonEmptyString"
          }
        }
      }
    },
    "target": {
      "type": "object",
      "required": [
        "target_type",
        "provider",
        "label"
      ],
      "properties": {
        "target_type": {
          "$ref": "#/$defs/targetType"
        },
        "provider": {
          "$ref": "#/$defs/nonEmptyString"
        },
        "label": {
          "$ref": "#/$defs/nonEmptyString"
        },
        "description": {
          "type": "string"
        }
      }
    },
    "tool": {
      "type": "object",
      "required": [
        "tool_id",
        "input_schema"
      ],
      "properties": {
        "tool_id": {
          "type": "string",
          "minLength": 1,
          "maxLength": 256,
          "pattern": "^[A-Za-z0-9_.-]+$"
        },
        "profile": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "related_skill_ids": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/nonEmptyString"
          }
        },
        "input_schema": {
          "$ref": "#/$defs/toolInputSchema"
        },
        "output_schema": {
          "type": "object"
        }
      }
    },
    "toolInputSchema": {
      "type": "object",
      "required": [
        "type",
        "properties",
        "required"
      ],
      "properties": {
        "type": {
          "const": "object"
        },
        "properties": {
          "type": "object",
          "required": [
            "connector_channel_id"
          ],
          "properties": {
            "connector_channel_id": {
              "type": "object",
              "required": [
                "type"
              ],
              "properties": {
                "type": {
                  "const": "string"
                }
              }
            }
          }
        },
        "required": {
          "type": "array",
          "uniqueItems": true,
          "items": {
            "type": "string"
          },
          "contains": {
            "const": "connector_channel_id"
          }
        }
      }
    },
    "authFlow": {
      "type": "object",
      "required": [
        "id",
        "type"
      ],
      "properties": {
        "id": {
          "$ref": "#/$defs/nonEmptyString"
        },
        "target_type": {
          "$ref": "#/$defs/targetType"
        },
        "type": {
          "enum": [
            "qr_login",
            "form"
          ]
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "fields": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/authField"
          }
        },
        "config_schema": {
          "type": "object"
        },
        "ui_schema": {
          "type": "object"
        }
      }
    },
    "authField": {
      "type": "object",
      "required": [
        "name",
        "label",
        "input_type"
      ],
      "properties": {
        "name": {
          "$ref": "#/$defs/nonEmptyString"
        },
        "label": {
          "$ref": "#/$defs/nonEmptyString"
        },
        "input_type": {
          "enum": [
            "text",
            "password"
          ]
        },
        "required": {
          "type": "boolean"
        },
        "placeholder": {
          "type": "string"
        },
        "help_text": {
          "type": "string"
        },
        "secret": {
          "type": "boolean"
        },
        "default_value": {
          "type": "string"
        }
      }
    },
    "ui": {
      "type": "object",
      "properties": {
        "login_flow": {
          "type": "object",
          "properties": {
            "flow_id": {
              "type": "string"
            },
            "steps": {
              "type": "array",
              "items": {
                "type": "object",
                "required": [
                  "type"
                ],
                "properties": {
                  "type": {
                    "type": "string"
                  },
                  "request_type": {
                    "type": "string"
                  },
                  "response_type": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      }
    },
    "security": {
      "type": "object",
      "properties": {
        "trust_level": {
          "enum": [
            "unknown",
            "builtin",
            "verified",
            "third_party",
            "local"
          ]
        },
        "api_key_required": {
          "type": "boolean"
        },
        "requires_signature": {
          "type": "boolean"
        },
        "data_classes": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    }
  }
}
```
