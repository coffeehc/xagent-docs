---
title: Skill Management
description: Understand public and personal xAgent Skills and the workflow for creating, importing, testing, updating, and publishing reusable capabilities.
status: stable
updated: 2026-07-11
---

# Skill Management

## What It Is

A Skill is a reusable work method. It helps xAgent handle recurring tasks with stable steps, input expectations, output formats, and boundaries.

Skill Management is where users view, create, import, publish, and maintain Skills.

## Public and Personal Skills

xAgent currently has two main visibility scopes:

| Scope | Visible to | Best for |
| --- | --- | --- |
| Personal Skill | Current user | Personal workflows, private requirements, experimental drafts, or sensitive business context |
| Public Skill | All users | Stable, general, reusable work methods that are safe for everyone to see |

xAgent does not provide complex access control for public Skills. If a Skill has special requirements, customer-specific workflow, private account information, or content other users should not see, keep it in the personal Skill library.

## Recommended Release Flow

Skill publication should start from personal use:

1. Create or import a Skill as a draft.
2. Review and test the draft with real but low-risk tasks.
3. Publish it to your personal Skill library.
4. Use it in your own tasks until it is stable.
5. Remove sensitive information and make sure it is general enough.
6. Submit it for public library review.
7. After administrator approval, it enters the public Skill library.

This flow prevents incomplete, private, or unsafe Skills from becoming visible to every user too early.

## What Users Can Do

Ordinary users can:

- Browse public Skills.
- Create or import personal Skills.
- Use personal Skills in Agent Session.
- Update personal Skills based on task results.
- Submit stable personal Skills for public review.

Advanced users can tune Skills during real tasks to get better results, then keep the useful version for future reuse.

## What Administrators Should Check

Before approving a Skill into the public library, administrators should check:

- Whether the Skill is useful for multiple users.
- Whether it contains private paths, account names, customer data, API keys, or temporary information.
- Whether it asks xAgent to perform risky actions without confirmation.
- Whether required Tools, MCP, or Connectors are actually available.
- Whether the output format and completion criteria are clear.

## Current Built-in Skills

As of July 7, 2026, the current version includes about 49 built-in Skills covering reports, research, writing, compliance, finance, customer support, project management, productivity, and Skill creation. The number may change during later review and iteration.

The repository also includes a copy of selected built-in Skill files. They are currently simple beta-stage examples prepared for testing and community improvement. Contributions are welcome, but Skills involving third-party MCP-specific behavior should be handled carefully.

## Common Questions

### Should every repeated task become a Skill?

Not immediately. First run it in Agent Session. If the workflow repeats and the result format becomes stable, then turn it into a Skill.

### Can I update a published Skill?

Yes. Updates should be drafted and tested first. For public Skills, follow the review process again when necessary.

### Can other users see my personal Skills?

No. Personal Skills are scoped to the current user.

### Can public Skills contain private business instructions?

They should not. Public Skills are visible to all users and should be general, safe, and reusable.

## Related Docs

- [Create / Update Skill](/docs/getting-started/create-skill)
- [Agent Session](/docs/user-guide/agent-session)
- [Tool Management](/docs/user-guide/tool)
- [Built-in Skill Files](/docs/user-guide/builtin-skills)
