---
title: What Is a Connector?
description: A plain-language explanation of the problem Connectors solve, what they do, and how they differ from MCP.
status: beta
updated: 2026-07-29
---

# What Is a Connector?

## What problem does it solve?

Most companies already have CRM, ERP, OA, customer service, knowledge base, and other internal systems. Each system already has employee accounts, data permissions, and operating rules. The difficult part of adding AI is usually not getting it to answer a question. It is solving these integration problems:

- The company should not need to rebuild every internal system just to connect it to xAgent.
- xAgent should not use one shared system account with excessive permissions.
- Employees should keep using their existing accounts and permissions. What an employee can see or do before connecting should remain the same afterward.
- xAgent must not only read information. With user approval, it must also be able to send replies, files, or operation results back to the original system.

**A Connector solves these problems.** It uses the internal system's existing sign-in, authorization, and interface mechanisms, without requiring changes to its existing business logic. After a user connects their account, xAgent works with that user's existing identity and permissions. It does not invent broader access.

In other words, the Connector mounts the user's identity and permissions from the original system into xAgent. It does not give xAgent a separate shared account with broader access.

The connection is two-way rather than read-only. Messages, files, and data can enter xAgent from the internal system, while approved replies, files, and operations can return through the same Connector.

## What is a Connector?

Think of a Connector as a two-way path between xAgent and an existing enterprise system:

```text
Enterprise system (existing account and permissions)  <->  Connector  <->  xAgent
```

A Connector does more than forward data. Depending on the internal system, it can handle account sign-in, maintain the connection, receive messages and files, write results back, and tell xAgent which capabilities are available.

Capabilities vary by Connector. One may connect a CRM or knowledge base, while another connects a messaging system such as WeChat or Feishu. One may use a QR code while another uses browser authorization. Check the Connector page for the capabilities actually available.

## What can it do?

A Connector can usually help you:

- Connect or bind your existing account in an enterprise system.
- Let xAgent read data and use capabilities within that account's existing permissions.
- Deliver messages, files, data, and events from the enterprise system to xAgent.
- Send xAgent replies, files, or approved operation results back to the original system.
- Let xAgent use additional capabilities provided by the Connector.
- Show whether the connection is healthy so expired authorization or disconnections are easier to spot.

For example, suppose an employee can only view the customers assigned to them in a CRM. After connecting their own CRM account, they can ask xAgent to find and organize those customer records, but they do not gain access to customers assigned to other employees. After approval, the same Connector can write an update back to the CRM.

## How is it different from MCP?

In plain language:

- **A Connector is like a doorway.** External accounts, messages, and events can enter xAgent through it, and results can go back out through it.
- **MCP is like a toolbox.** While xAgent is already working on a task, it can pick the external tool it needs to look something up or perform an operation.

| Comparison | Connector | MCP |
| --- | --- | --- |
| Mainly connects | A user's account, permissions, messages, and events in an existing system | Tools and services that xAgent can call |
| Usually starts with | An external message or event can start a task | xAgent calls it when a task needs it |
| Main problem it solves | Preserves the user's existing identity and permissions while enabling two-way communication | Gives a task an external capability it can call when needed |
| Common example | Use an employee's CRM permissions to read records and write an approved update back | xAgent calls a tool that searches a knowledge base |

A quick way to decide is to ask:

- "Do I want to connect each user's existing account and permissions to xAgent, with both read and write-back support?" You probably need a Connector.
- "Do I want xAgent to call an external tool while doing a task?" You probably need MCP.

## They can work together

Connectors and MCP are not mutually exclusive. They often handle different parts of the same task. For example:

1. An employee asks xAgent to analyze the customers assigned to them.
2. The CRM Connector uses that employee's account and permissions to read the customer records.
3. xAgent uses MCP to call market data or another analysis tool.
4. xAgent prepares customer follow-up recommendations.
5. After the employee approves them, the CRM Connector writes the follow-up records back to the CRM.

In this flow, the Connector answers "whose identity is xAgent using, and which enterprise data may it read or write?" MCP answers "which external tools should xAgent use while doing the work?"

## When should you choose a Connector?

Start with a Connector when you want to:

- Connect an existing business system to xAgent without rebuilding its business logic.
- Let each user keep using their own account and permissions from the original system.
- Read data from the original system and write approved results back to it.
- Start xAgent work when a message or event arrives from the original system.

If xAgent only needs to query or operate an external service while working on a task, start by considering MCP.

## How to get started

1. An administrator adds and configures an available Connector under **Connectors**.
2. A user opens **My Connections** and follows the page instructions to scan a code, authorize access, or bind an account.
3. Once connected, the user can start work from the external system or use the Connector's capabilities in an xAgent session.

A successful connection does not grant unlimited access. The Connector still uses the external account's existing permissions, and sensitive actions such as sending messages or changing data may require user approval.

Do not paste passwords, access tokens, or verification codes into a session. Use the authorization flow provided on the Connector page.

## Learn more

- [Using Connectors](/docs/user-guide/connector)
- [Approval Policies](/docs/user-guide/approval-policy)
- [xAgent Connector Architecture (Attachment)](/docs/attachments/xagent_connection_architecture)
- [xAgent Connector Protocol (Attachment)](/docs/attachments/xagent_connector_protocol)
