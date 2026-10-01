---
title: "User Management Pages"
description: "Page-by-page guidance and English UI examples for xAgent User Accounts and User Groups."
status: beta
updated: 2026-10-01
---

# User Management Pages

> Version scope: current-field and behavior corrections below were checked against source `43d2698` on 2026-10-01. Older public binaries may differ; verify your installed version before following a changed UI or operation.

User Management is in the separate `/admin` console and is available only to administrators. It maintains account state, roles, and group membership. Non-administrators opening the admin entry are redirected to the user app.

> Version note: The retained `v005` illustrations include the former feature-level / simple-and-advanced-mode field. The current user editor no longer provides that field, and user menus no longer hide features based on it. Do not look for that switch using the old image.

## User Accounts {/* #user-accounts */}

**Menu:** Admin console &gt; Users &gt; User accounts (`/admin/users/accounts`)

**Visibility:** Administrators

![xAgent User Accounts showing status, role, feature level, groups, and actions](/img/manual/v005/en/user-accounts.webp)

- Create a user with a login name, display name, initial password, and role.
- Enable or disable accounts and assign user or administrator roles.
- Distinguish roles from feature entry points: `user` uses the user app, while `admin` can also enter the admin console. There is no current simple/advanced-mode menu switch.
- Change group membership, reset passwords, or delete unused accounts.

Recommended sequence: create the account, confirm its role and groups, then verify its user-app access. Prefer disabling for a temporary access restriction. Before resetting a password or deleting an account, verify the identity and confirmation details to avoid acting on a similarly named user.

## User Groups {/* #user-groups */}

**Menu:** Admin console &gt; Users &gt; User groups (`/admin/users/groups`)

**Visibility:** Administrators

![xAgent User Groups showing group type, description, and actions](/img/manual/v005/en/user-groups.webp)

- Review built-in and custom groups.
- Create or edit a group’s name and description; maintain membership in the user-account editor.
- Built-in groups carry stable permission meaning and should not be repurposed as temporary labels.
- Built-in groups have no delete action; custom groups can be deleted after their impact is checked.
