---
slug: xagent-agent-teams-field-test
title: "From a Goal to an Agent Team: An xAgent Field Test"
date: 2026-10-23
updated: 2026-10-23
description: "A real xAgent team-creation test, with screenshots of the manager, task scope, human intervention and observable results, separating configuration from execution."
authors: [xagent]
tags: [ai-agent, multi-agent, case-study]
image: /img/manual/agent-teams-20261023/02-team-created.png
---

Giving a goal to multiple Agents raises practical questions: who owns the goal, who researches, who edits, and who checks the result? Naming roles in a prompt is a start. Seeing what each role actually did is the next step.

On October 23, 2026, we created a separate demo team on the [xAgent demo site](https://xagent.51apis.com) for a small task using three product facts observed in this UI. This article keeps the real UI evidence and human interventions visible, separating team configuration, task execution and result verification.

{/* truncate */}

## Agent Teams: multiple independent executors around one goal

Agent Teams organize multiple Agents around a shared goal. “Team” describes execution roles and collaboration. This article uses a common coordinator/executor structure: one Agent coordinates, while others accept bounded work, make progress independently and return results. That is not the only possible team structure. A single user can lead an Agent team. Multi-user account administration is a separate concern.

Multi-agent Orchestration organizes this chain: how to divide the goal, who executes, which tasks depend on earlier results, when to wait, and how to review and consolidate outputs. Task Delegation is a concrete action within it, requiring a clear assignment, necessary material, constraints and a return expectation. A successful dispatch establishes only one step; execution and delivery still need verification.

This division gives research, editing and review clear responsibilities and acceptance criteria. Members can maintain independent contexts rather than placing every role's entire history into one conversation. The coordinator receives the necessary information through messages and artifact references, then consolidates it. Shared materials provide common inputs, not a single shared model context.

Dependent tasks can proceed as research followed by editing; independent tasks can use parallel orchestration. These are general design choices. This test observed the staged form and did not verify a parallel speedup.

## How xAgent maps these concepts to the product

“Virtual teams” is xAgent's product entry point for Agent Teams. The [virtual-teams guide](/docs/user-guide/virtual-teams) and [0.1.0 release notes](https://github.com/coffeehc/xagent-releases/releases/tag/v0.1.0) describe the following mapping:

| General concept | xAgent implementation | What to check |
| --- | --- | --- |
| Coordinator / executors | Dedicated manager and member session tree | Who owns the goal and who received each task |
| Roles and task delegation | Reusable role templates, manager assignments and manager-to-manager delegation | Clear responsibilities and actual task receipt |
| Context and result consolidation | Independent member sessions, replies and shared business directories | Sufficient material and agreement between replies and artifacts |
| Human involvement | Owner guidance and approval mechanisms | Whether corrections were received and actions stayed authorized |

Agent Harness is the wider system of tool calling, context management, task recovery, collaboration and human review that supports execution. Agent Teams are the part that organizes multiple executors. A role prompt alone does not guarantee completion.

This mapping describes product capabilities, not coverage by one small test. Role-template reuse, manager-to-manager delegation, archiving and recovery were not verified here. Nor does the presence of a file establish that shared-directory or artifact-reference delivery succeeded.

## A real example: research, editing and manager review

The task was deliberately small: turn three supplied UI facts into a short description. Fixed source material and no web research made it easier to check whether a member introduced unsupported claims.

### Configuration evidence: a manager exists, members are recruited as needed

The creation dialog asks for a team name and responsibilities. It explains that a dedicated manager with fixed responsibilities will be initialized, concrete goals are sent after creation, and members are recruited as needed.

We named this team “Agent Teams 文章演示 2026-10-23”. Its responsibility was to turn public product information into an accurate, concise Chinese explanation. The manager would divide the work, recruit research and editing members as needed, and review the result. Scope was limited to the supplied demo material: no other conversations, private files or business data; no external publishing, code changes, purchases or deployment; one task only.

![Actual team-creation dialog, showing the name and responsibilities fields in the Chinese UI.](/img/manual/agent-teams-20261023/01-create-team.png)

*Figure 1. The actual form before creation. The screenshot is cropped to the dialog; the UI has not been recreated.*

After creation, the team details showed “已就绪” (ready), “团队经理” (team manager) and “有效成员 1” (one active member). The goal section still said there was no goal and asked for one in the manager session. These fields established that the team and manager existed. They did not yet establish that research and editing members had joined.

![Initial team details: ready, a team manager, one active member and no concrete goal yet.](/img/manual/agent-teams-20261023/02-team-created.png)

*Figure 2. The initial team state. The team identifier is masked; other visible content is unchanged. “Ready” describes the organization, not completion of a business task.*

There was a human intervention at this stage. Initialization automatically started an initial requirements review. After approximately 2 minutes 24 seconds without a final result, the operator stopped that run before submitting the bounded task. This wait is not an end-to-end task duration and is not used to calculate efficiency gains.

### Delegation constraints: two members and a verifiable result

The concrete task used only three observations supplied from this UI test, without requesting external research. It asked for exactly two members: a researcher to extract facts and an editor to produce a description of no more than 150 Chinese characters. The manager would check for exaggeration and summarize the result. Each member was to receive at most one assignment and stop after delivery.

The requested deliverable was three facts, one short description and one evidence limitation. The task explicitly prohibited treating “ready” as task completion or inferring performance gains. At submission, “two members” was a requirement, still needing verification against actual membership and results.

![Concrete task submitted in the manager session, specifying researcher and editor roles, source material, deliverables and execution limits.](/img/manual/agent-teams-20261023/03-bounded-goal.png)

*Figure 3. The submitted task. The manager is marked as running, while the left-hand tree still shows only the manager. This screenshot alone cannot establish completed two-member collaboration.*

### Execution evidence: members receive work and hand off dependent results

During execution, the team tree gained three entries: team manager, research specialist and editing specialist. In the research specialist's session, a team assignment identified the manager as its sender and instructed the member to complete this one-off assignment and report back. That provides stronger evidence than a manager simply saying it will organize two people: the member session and its received task were visible.

![Team tree with a manager, researcher and editor; the research session contains a one-off assignment from the manager.](/img/manual/agent-teams-20261023/04-research-dispatched.png)

*Figure 4. The research assignment reached the member session and was still running when captured. Source-session and message identifiers are masked. Member existence, task receipt and task completion are separate states.*

The researcher subsequently finished and reported back. The manager received a formal report with three facts matching the supplied material before progressing to editing. The observed sequence was manager assignment → research report → editing. This is recorded as staged collaboration, not parallel research, and no speedup is calculated from it.


### Result verification: what the editor delivered

The editor session eventually showed “会话空闲” (idle). Its response stated that the task was complete and formally reported to the manager. The final Chinese description reads:

> 点击“新团队”后只需填写团队名称、团队职责。创建时初始化一位职责固定的团队经理，具体目标在创建后于经理会话中下达，成员按工作需要招募。创建后页面显示“已就绪”“团队经理”“有效成员 1”，其中“已就绪”仅为显示状态，不表示任务已完成。

An independent character-by-character count of this text gives 117 characters, including punctuation and the space in “有效成员 1”, within the 150-character limit. It covers the three supplied facts: creation fields, manager initialization and goal submission, and the initial displayed state. It also explicitly says that “ready” does not mean the task is complete.

![Idle editing specialist with its formal report and final short description; the manager and two members remain visible in the tree.](/img/manual/agent-teams-20261023/06-editor-completed.png)

*Figure 5. The editor's result is inspectable, with identifiers masked. The displayed 8 minutes 44 seconds is the duration of that editing run, not end-to-end task time or evidence of a speed advantage.*

The manager then accepted both member reports and completed delivery as conversation text. At closure, the manager was idle and the team tree retained the manager and two members without archiving. The final receipt stated one assignment per member and no recurring tasks. These are observations from this UI and receipt, not claims about other teams.

![Idle manager with the final description, evidence limitation and closing status; the team remains unarchived.](/img/manual/agent-teams-20261023/07-final-idle-summary.png)

*Figure 6. Final delivery and the retained team. A visible conversational result does not erase the execution failure, scope deviation or attachment problem along the way.*

## What the test exposed: recovery and scope control

This step also encountered a tool-argument validation error: the manager supplied an empty string for `assignment_id`. It then corrected the argument and dispatched the task without the operator manually fixing the parameter. Keeping this step in the account shows the error handling involved, rather than only the final role list.

The waiting stage later encountered a `task_wait` / `wait_ref` error, and the manager’s initial execution was marked failed, with a displayed duration of 13 minutes 11 seconds. The editor’s formal report subsequently arrived and triggered a new manager run. This was a failure-and-resumption sequence, not a single uninterrupted successful run.

![The initial manager execution is marked failed and explains an invalid wait reference, with a later member report expected to start a new run.](/img/manual/agent-teams-20261023/09-wait-failure.png)

*Figure 7. The actual waiting-stage failure, with assignment and work-record identifiers masked. The UI shows 13 minutes 11 seconds. A later report-triggered resumption does not make this failed run a success.*

The task explicitly prohibited file access and requested three facts, a short description and a limitation in the conversation. The manager nevertheless created a fallback Markdown artifact; a final-delivery file later appeared in the file panel as well. Its existence was subsequently verified in this demo session’s artifact preview, showing the demo facts, description and boundary. This exceeded the no-file-operation scope and must be recorded separately. It does not establish that any other private files were read.

![Preview of the actual Markdown artifact containing three facts, a short description and an evidence limitation.](/img/manual/agent-teams-20261023/05-scope-deviation-file.png)

*Figure 8. The fallback artifact preview, with the message identifier masked. It verifies file creation and exposes the deviation from this task's no-file-operation requirement. The character count shown is the Agent's own claim, not an independent measurement by this article.*

The manager also intended to archive after delivery. The operator therefore sent a corrective instruction: do not archive, do not write more files or create new tasks, finish delivery and remain idle. The UI first showed the guidance as queued, and it later entered the conversation. The manager ultimately confirmed cancellation of the archive step and remained idle with the team retained. This provided evidence that the correction had actually been applied.

Delivery also encountered an invalid `file_ref` attachment reference, after which the manager delivered text instead. This test therefore verified conversational result consolidation, not successful file-reference delivery.

There were two human interventions overall: stopping the initial requirements review and later correcting the task scope. The task ultimately delivered inspectable content, but this was not an intervention-free or deviation-free success. Improvements should separately address wait-reference handling, file-delivery validation, and how natural-language scope constraints are enforced before execution.

## How to tell whether orchestration worked

Keep three layers of evidence:

1. **Configuration:** Does the team exist? Who is the manager, and what are the members and responsibilities?
2. **Execution:** Was a concrete goal submitted? Which member received each assignment? What happened, and did a person need to clarify or stop the work?
3. **Results:** Do member replies, the manager's summary and actual deliverables agree? Do the sources and content meet the requirements?

This new team is recorded separately from earlier demonstrations using a main session and two child sessions; their runtime data is not combined. See the [session collaboration guide](/docs/guides/multi-agent-session-event-collaboration) for message semantics.

A configuration screenshot establishes configuration. A successful send still needs follow-through to reception and execution. Whether collaboration was useful ultimately depends on the deliverable and its acceptance criteria.

This test does not measure speed, cost or success rate relative to a single Agent. There was no control group, and a visible model label is not evidence of every model call. Shared team materials do not automatically expand access to other users or external systems. Before applying the workflow to real work, test with non-sensitive materials and set authorization and approval rules appropriate to the risk.

## Further reading

- [Try a bounded English source-to-brief task](/docs/getting-started/first-task#first-success-agent-team-brief): copy the supplied facts and prompt, inspect both member reports, and accept the actual final result. This is a separate exercise from the test above.
- [Virtual teams: managers, members and archiving](/docs/user-guide/virtual-teams)
- [How multiple Agents collaborate through session events](/docs/guides/multi-agent-session-event-collaboration)
- [Agent sessions: tasks, work records and archiving](/docs/user-guide/agent-session)
- [Approval policies](/docs/user-guide/approval-policy)
