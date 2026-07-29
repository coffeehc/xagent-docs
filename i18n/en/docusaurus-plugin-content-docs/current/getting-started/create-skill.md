---
title: Create / Update a Skill
description: Learn how to create, test, publish, and continuously update an xAgent Skill through Skill Management or an Agent Session, including personal and public Skill workflows.
image: /img/share/en/xagent-shared-skills.png
status: beta
updated: 2026-07-29
---

# Create / Update a Skill

## What It Is

A Skill is a reusable work method. After fixed steps, input requirements, output formats, and important notes are saved as a Skill, xAgent does not need the entire process explained again whenever it handles a similar task.

The goal of creating or updating a Skill is not to write code. It is to describe recurring work clearly and keep refining it through real use so xAgent can reuse it reliably.

## When to Create a Skill

Create a Skill for work that:

- Repeats daily, weekly, or frequently.
- Uses similar materials, steps, and output formats each time.
- Needs multiple people to follow the same standard.
- Should preserve personal experience for future reuse.
- Should be continuously optimized, tested, and published with xAgent.

For a one-off task, describe the requirement directly in an Agent Session. A Skill is not always necessary.

## When to Update a Skill

A published Skill may still need adjustment during use. Update it when:

- Its output format is unstable and needs additional fields, ordering, or examples.
- Its execution steps are unclear and the model often drifts.
- The business process changes and requires new rules, constraints, or confirmation actions.
- New Tool, MCP, or Connector capabilities should be used correctly by the Skill.
- User feedback reveals poorly handled cases that need boundaries or counterexamples.

## Prepare Before Creating

Before creating or updating a Skill, prepare the following:

| Item | Description |
| --- | --- |
| Skill name | Let users immediately understand which task it handles |
| Usage scenario | Explain when to use it and when it is not appropriate |
| Required user input | Files, links, written instructions, target objects, or other materials |
| Processing steps | Explain in order what xAgent should do |
| Output format | Report, table, checklist, email draft, Markdown, or another format |
| Actions requiring confirmation | Sending messages, deleting files, or submitting to external systems must be confirmed first |
| Quality standard | Define what counts as complete and which problems require rework |

Do not put account passwords, API keys, verification codes, customer-private data, temporary file paths, or one-time information in a Skill.

## Creation Entry Points

### Option 1: Create or Import in Skill Management

Use this option when the Skill content is already prepared or you want to import an existing Skill file.

1. Open **Skill Management** from the left menu.
2. Click **Add Skill**.
3. Enter the name, description, usage scenario, and detailed work method.
4. Save it, then check the details page for clarity.
5. Return to an Agent Session and test it with a real task.
6. Continue editing based on the test result.

You can also import an existing Skill file in Skill Management and adapt it to how the current team works.

### Option 2: Describe the Skill in the Main Session

Use this option when you know what you want but have not organized it into a Skill document.

For example, say this in the main Agent Session:

```text
I want to create a Skill for contract review.
It should check payment, delivery, breach, confidentiality, and dispute resolution clauses, then output a risk list and revision suggestions.
```

Based on the simple request, the main Session automatically creates an Agent Session for building the Skill. In that Session, xAgent asks for more details such as the usage scenario, input materials, output format, risk boundaries, and confirmation actions.

After the requirements are clear, xAgent helps generate a Skill draft. You review the draft and confirm that it meets expectations before publishing it. After publication, you can keep optimizing the Skill in the same Session based on test results.

The model assists throughout the build process. Because creating a Skill requires understanding the task, abstracting the workflow, checking boundaries, and organizing a reusable method, use a model with stronger reasoning capability.

### Option 3: Create a Dedicated Skill-building Session

If you already know that you want to build a Skill, you can create a dedicated Session through an Agent.

The flow in a Skill-building Session is similar to one created automatically by the main Session:

1. xAgent first learns the Skill requirements.
2. You add task background, material types, output requirements, and constraints.
3. xAgent generates a Skill draft.
4. You confirm it or request changes.
5. Publish the Skill after confirmation.
6. Continue optimizing it in the current Session after publication, or create a new Session for another iteration.

This option suits more complex Skills that will be used long term, shared by multiple people, require a stable output format, or need continuous improvement.

## Update a Skill

To update a Skill, use the main Session or a dedicated Skill-update Session to identify the Skill and describe the desired result.

Example:

```text
I want to update the "Contract Review" Skill.
Its payment-clause checks are not detailed enough. Add checks for payment milestones, invoice requirements, overdue liability, and acceptance conditions.
```

After you enter the Skill-update sub-session, xAgent automatically copies the corresponding Skill into the current Session directory and uses that copy as the draft. Later changes apply to the draft and do not directly overwrite the original Skill.

The update flow is usually:

1. Describe the name or purpose of the Skill to update.
2. xAgent finds and copies the Skill into the Session directory as the update draft.
3. Describe the goal, problem, or new requirement.
4. xAgent updates the Skill content based on the draft.
5. Review the draft and decide whether more changes are needed.
6. Publish the update after confirmation.

Use a model with stronger reasoning capability for Skill updates as well. An insufficient model can significantly reduce the Skill's logic, boundary decisions, step organization, and long-term maintainability.

## A Simple Template

Use the following structure:

```text
Name:
Used for:
User must provide:
Processing steps:
Output format:
Actions requiring confirmation:
Things not to do:
Completion criteria:
Example task:
```

## Test a Skill

After creating or updating a Skill, test it with a real but low-risk task:

1. Prepare a representative material.
2. Explicitly ask an Agent Session to use the Skill.
3. Check whether the output matches expectations.
4. If the steps are unstable, return to the Skill-building or update Session and add constraints, examples, or quality standards.
5. If the Skill is too complex, split it into smaller Skills.

## Publish and Maintain

The recommended publication flow starts with personal use before entering the public library:

1. Create or import the Skill as a draft.
2. After confirming the draft is usable, publish it to the personal library as the current user's personal Skill.
3. Use and test the personal Skill in your own real tasks.
4. After confirming that it is stable, general, and free of sensitive information, submit it for public library review.
5. It enters the public library for all users only after administrator approval.

Public Skills are visible to every user, and xAgent currently does not apply complex access restrictions to them. A public Skill should serve multiple users and must not contain personal habits, temporary paths, private account information, customer-specific workflows, or content that should not be visible to others. Keep Skills with special requirements in the personal Skill library.

When you submit a Skill for public library review, the system copies a snapshot of the current published personal Skill. Later edits to the personal Skill do not automatically change the submitted review content. Update the Skill promptly if output quality declines or an external system or business process changes.

Publication is not the end of a Skill's lifecycle. Continue describing problems, adding test cases, and requesting changes in the original Skill-building Session so xAgent can help optimize it. You can also create a new Session for another round of adjustment, testing, and publication.

## Related Docs

- [Skill Management](/docs/user-guide/skill)
- [Agent Sessions](/docs/user-guide/agent-session)
- [Built-in Skill Files](/docs/user-guide/builtin-skills)
- [Tool Management](/docs/user-guide/tool)
