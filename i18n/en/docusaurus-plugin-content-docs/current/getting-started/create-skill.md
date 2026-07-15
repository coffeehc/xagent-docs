---
title: Create / Update Skill
description: Learn how to create, test, publish, and continuously improve xAgent Skills through Skill Management or an agent-assisted session.
image: /img/share/en/xagent-shared-skills.png
status: beta
updated: 2026-07-11
---

# Create / Update Skill

## What It Is

A Skill is a reusable work method. It records stable steps, input requirements, output format, and important constraints, so xAgent does not need to be told the same process from scratch every time.

Creating or updating a Skill is not mainly a programming task. The goal is to describe a recurring job clearly, test it in real use, and keep improving it until xAgent can reuse it reliably.

## When to Create a Skill

Create a Skill when:

- The work repeats daily, weekly, or frequently.
- Similar materials, steps, and output formats appear each time.
- Multiple users should follow the same standard.
- Personal experience should be turned into a reusable method.
- You want xAgent to help test, optimize, and publish the method later.

For one-off work, use Agent Session directly. A Skill is most valuable when the work is repeated.

## When to Update a Skill

Update a Skill when:

- The output format is unstable or missing fields.
- The steps are unclear and the model often drifts.
- The business process has changed.
- New Tool, MCP, or connector capabilities should be used.
- User feedback shows that some cases are not handled well.

## Prepare Before Creating

Before creating or updating a Skill, prepare these items:

| Item | Meaning |
| --- | --- |
| Skill name | A clear name that tells users what it handles |
| Usage scenario | When to use it, and when not to use it |
| User inputs | Files, links, text, target objects, or other materials |
| Steps | What xAgent should do, in order |
| Output format | Report, table, checklist, email draft, Markdown, or other format |
| Confirmation actions | Actions that must be confirmed before execution |
| Quality standard | What counts as done, and what should be reworked |

Do not put passwords, API keys, verification codes, customer-private data, temporary local paths, or one-time information into a Skill.

## Ways to Create

### Create or Import in Skill Management

Use this when you already have Skill content or want to import an existing Skill file.

1. Open **Skill Management**.
2. Click **Add Skill**.
3. Fill in the name, description, scenario, and work method.
4. Save it and review the details.
5. Return to Agent Session and test it with a real task.
6. Continue editing based on test results.

### Describe the Skill in the Main Session

Use this when you know what you want but have not written the Skill document.

Example:

```text
I want to create a Skill for contract review.
It should check payment, delivery, breach, confidentiality, and dispute clauses, then output a risk list and revision suggestions.
```

The main session can create a dedicated Skill-building sub-session. In that session, xAgent will ask about the scenario, input material, output format, risk boundaries, and confirmation actions. After the draft is generated, you confirm it before publishing.

Skill creation requires abstraction, reasoning, and boundary checking. Use a stronger model when possible.

### Create a Dedicated Skill-building Session

You can also directly create a session for building a Skill. The flow is similar:

1. xAgent learns the Skill requirements.
2. You provide background, material type, output requirements, and constraints.
3. xAgent generates a draft.
4. You review or request changes.
5. After confirmation, publish the Skill.
6. Keep optimizing it in the same session or a new session.

## Updating a Skill

To update a Skill, describe which Skill should be updated and what should change:

```text
I want to update the "Contract Review" Skill.
Its payment-clause checks are not detailed enough. Please add payment milestones, invoice requirements, overdue liability, and acceptance conditions.
```

In an update sub-session, xAgent copies the target Skill into the session directory and treats that copy as the draft. Changes are made against the draft, not directly against the original Skill.

The usual flow is:

1. Describe the Skill name or purpose.
2. xAgent finds and copies the Skill as an update draft.
3. Describe the desired changes.
4. xAgent updates the draft.
5. Review the draft and request more changes if needed.
6. Confirm and publish the update.

Updating Skills also benefits from a stronger reasoning model. A weak model can reduce the logical quality, boundary clarity, and long-term maintainability of a Skill.

## Publish and Maintain

The recommended release flow starts from personal use:

1. Create or import the Skill and form a draft.
2. After the draft is usable, publish it to the personal Skill library.
3. Use and test the personal Skill in real tasks.
4. When it is stable, general, and free of sensitive information, submit it for public library review.
5. After administrator approval, it becomes a public Skill visible to all users.

xAgent does not provide complex access control for public Skills. Public Skills should be general and safe for all users to see. If a Skill contains special requirements, private workflows, customer-specific details, or information other users should not see, keep it in the personal Skill library.

Publishing is not the end. You can keep improving the Skill in the original build/update session, or create a new session for another round of testing and publishing.

## Related Docs

- [Skill Management](/docs/user-guide/skill)
- [Agent Session](/docs/user-guide/agent-session)
- [Built-in Skill Files](/docs/user-guide/builtin-skills)
- [Tool Management](/docs/user-guide/tool)
