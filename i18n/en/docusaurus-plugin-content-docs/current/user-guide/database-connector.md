---
title: "Database Connector Configuration: Connect MySQL and PostgreSQL"
description: Install the xAgent Database Connector, add MySQL and PostgreSQL resources from the management page, connect users, and troubleshoot failures.
image: /img/user-guide/connectors/database-management-zh.webp
status: beta
updated: 2026-08-29
---

# Database Connector Configuration: Connect MySQL and PostgreSQL

Administrators configure database addresses in the Database Connector. Users then connect with their own database accounts. Database addresses and sign-in credentials stay inside the Connector Server and are not sent to the model as Tool arguments.

The current public release is `0.0.6`. It supports MySQL and PostgreSQL.

## Install

Rerun the installer on the xAgent host and select only the Database Connector:

```bash
curl -fsSL https://downloads.xagent.xiagaogao.com/scripts/install.sh \
  | bash -s -- --yes --connectors database
```

The installer preserves existing configuration and prints the Connector address and API Key when it finishes.

| Item | Linux | macOS |
| --- | --- | --- |
| Configuration | `/opt/xagent/connectors/database/config.yml` | `~/.local/share/xagent/connectors/database/config.yml` |
| State directory | `/opt/xagent/connectors/database/state` | `~/.local/share/xagent/connectors/database/state` |
| Executable | `/usr/local/bin/xagent-database-connector` | `~/.local/bin/xagent-database-connector` |

Linux creates and starts the `xagent-database-connector` systemd service. On macOS, start it with the command printed by the installer:

```bash
cd ~/.local/share/xagent/connectors/database
~/.local/bin/xagent-database-connector start --config ./config.yml
```

## Register It in xAgent

As an administrator, open **Console > Connectors** and select **Add Connector**.

| Field | Value |
| --- | --- |
| Connector address | A same-host installation normally uses `http://127.0.0.1:19094`; for separate hosts, use an address reachable by xAgent Server |
| API Key | The API Key printed by the installer, matching `database_connector.api_key` |

The Connector should show **Online** with protocol `4.3`. Database Connector `0.0.4` and later display a separate management action. If it is missing, upgrade the Connector and confirm that the API Key is not empty.

Only xAgent Server needs access to port `19094`; do not expose it directly to the public internet.

## Add a Database

Use the management action on the Database Connector row to open the database resource page.

![Database Connector database resource list](/img/user-guide/connectors/database-management-zh.webp)

Select **Add Database**:

![Database Connector add-database dialog](/img/user-guide/connectors/database-add-resource-zh.webp)

| Field | What to enter |
| --- | --- |
| Resource ID | A stable, unique value such as `business_mysql`; it becomes the `resource_key` and `database_id` |
| Display name | The name users see under **My connections** |
| Type | `MySQL` or `PostgreSQL` |
| Database name | The actual database name inside the target instance |
| Host | The database address reachable by the Connector Server |
| Port | The actual service port; common defaults are `3306` for MySQL and `5432` for PostgreSQL |
| Purpose | A short description of the database; do not include usernames, passwords, or other credentials |

Saving applies immediately and does not require a restart:

- New resources appear in the user resource list.
- Changing a display name or purpose does not rebuild existing connections.
- Changing the host, port, database name, or type reconnects the target.
- Deleting a resource closes its connections and removes the user credentials stored for it by the Connector Server.

## Connect a User

After the administrator adds a resource, the user opens **My connections**, selects the Database Connector and resource, and enters their own database username and password.

One user can connect several databases. Connecting the same resource again replaces the previous credentials. Native database permissions decide whether SQL can run; the Connector does not elevate permissions.

Start with a read-only check:

```text
List my connected databases, then read the schema of the business database. Do not change any data.
```

The Database Connector provides `db_list`, `db_getinfo`, and `db_execute_sql`. Use least-privilege database accounts in production. For read-only access, use a database-native read-only account or role.

User credentials are stored in `state_dir/credentials.json`. The directory mode is `0700` and the file mode is `0600`. There is currently no application-layer encryption, so place the state directory on an encrypted disk or controlled volume in production.

## Edit `config.yml` Directly

The management page changes only `database_connector.databases`. Edit `config.yml` for the listen address, API Key, state directory, and query limits:

```yaml
database_connector:
  addr: 127.0.0.1:19094
  api_key: replace-with-a-long-random-system-api-key
  state_dir: /opt/xagent/connectors/database/state
  query_timeout_seconds: 30
  max_rows: 500
  max_result_bytes: 1048576
  databases:
    - id: business_mysql
      display_name: Business Database
      description: Core business data
      database_name: business
      host: 10.0.0.10
      port: 3306
      type: mysql
```

The Connector does not watch manual file changes. Restart it after editing `config.yml` directly:

```bash
sudo systemctl restart xagent-database-connector
sudo systemctl status xagent-database-connector
```

## Common Problems

| Symptom | Fix |
| --- | --- |
| Connector is offline | Check the service, the `19094` listener, network access, and the API Key |
| Management action is missing | Upgrade to `0.0.4` or later and confirm the Connector started from a configuration file with a non-empty API Key |
| New resource is absent from **My connections** | Confirm the save succeeded and the Connector is online, then refresh the Connector Card and user page |
| User authentication fails | From the Connector Server, check database networking, the database name, username, and password |
| SQL is rejected | Use the permission or SQL error returned by the database, then adjust the database account or statement |
| Manual configuration change has no effect | Restart the Connector; only resources saved through the management page apply immediately |

Linux logs:

```bash
journalctl -u xagent-database-connector -f
```

## Related Documentation

- [Connector overview](/docs/user-guide/connector)
- [SSH Connector configuration](/docs/user-guide/ssh-connector)
- [Install xAgent](/docs/getting-started/install)
- [Tool management](/docs/user-guide/tool)
- [Approval policies](/docs/user-guide/approval-policy)
