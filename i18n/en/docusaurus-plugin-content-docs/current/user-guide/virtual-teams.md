---
title: "Virtual Teams: Managers, Members, and Archiving"
description: "Virtual Teams: Managers, Members, and Archiving"
status: stable
updated: 2026-10-19
---

# Virtual Teams: Managers, Members, and Archiving

Version scope: Server `v0.1.0`, following the [official release notes](https://github.com/coffeehc/xagent-releases/releases/tag/v0.1.0). Earlier screenshots elsewhere in this manual do not show this interface.

## Start a team {/* #start-team */}

1. Create a virtual team and initialize its dedicated manager.
2. Give the manager a goal, materials, boundaries, and acceptance criteria. Use role templates where appropriate and inspect the member Session tree.
3. Follow member chats and task results; use the owner guidance entry when clarification or a decision is needed. Managers can delegate to other managers, but delegation does not establish completion.
4. Review deliverables in the shared business directory and verify file references and previews before accepting the result.

Shared team materials do not grant access to unrelated users or external systems. Existing account permissions and approval rules still apply. WorkGroup configuration, Session execution, and remote A2A are distinct layers.

## Archive, restore, and continue {/* #archive-restore */}

Disbanding a team archives it as a whole and retains member relationships. Read archived material in read-only mode. Restoring the team and continuing execution use explicit entry points; do not assume restore resumes work automatically. Check the original goal and outstanding actions before continuing.

Long-unused Sessions can also be archived automatically. Use the ordinary, team, plugin, and archived navigation scopes to locate a Session that disappeared from the active list. This release note does not specify a universal inactivity threshold, so check the installed deployment rather than assuming one.

## Verify after upgrading {/* #verify-upgrade */}

With non-sensitive test data, check team creation, manager initialization, a member task, a shared output, archive/read-only review, restore, and explicit continuation. Verify behavior in your deployment; the release's build and integrity checks are not a complete business acceptance test.

See [Session operations](/docs/user-guide/agent-session), [collaboration semantics](/docs/guides/multi-agent-session-event-collaboration), and [approval policies](/docs/user-guide/approval-policy).
