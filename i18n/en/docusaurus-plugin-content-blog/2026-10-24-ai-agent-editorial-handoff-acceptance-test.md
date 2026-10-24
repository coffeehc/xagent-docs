---
slug: ai-agent-editorial-handoff-acceptance-test
title: "How to Coordinate AI Agents: Handoffs and Acceptance in an English Writing Test"
date: 2026-10-24
description: "A real xAgent Writer–Reviewer test: separate sessions handed off a 70-word draft, corrected its count, and still passed unsupported claims. Inspect the evidence and acceptance criteria."
authors: [xagent]
tags: [ai-agent, multi-agent, case-study]
image: /img/manual/editorial-qa-20261024/final-report.jpg
---

**To coordinate AI agents, give each role a bounded assignment, inspect the actual handoff, and check the final result against criteria that do not depend on the agents' own verdict.** In this English editorial test, xAgent delegated work to separate Writer and Reviewer sessions and delivered a final report. The Reviewer corrected the word-count breakdown, but approved factual expansions that the supplied facts did not support.

That distinction is the point of this case: the coordination completed; the strict factual acceptance check did not pass.

![xAgent final English report with the manager Idle, Writer and Reviewer in the sidebar, a 5/5 completed plan, and the system's PASS verdict.](/img/manual/editorial-qa-20261024/final-report.jpg)

*The final screen shows an actual terminal result. PASS is xAgent's verdict, not an independently validated factual-quality pass. The mostly English interface retains the Chinese default manager name. The screenshot is an unchanged browser capture.*

{/* truncate */}

## Evidence at a glance

| Check | Observation |
| --- | --- |
| Task | One synthetic product note, 60–80 words, using only three supplied facts |
| Environment | The logged-in personal settings page displayed Enterprise · v0.1.1; the model selector showed Qwen3.8-27B. These are UI observations, not binary-hash or backend-build verification. |
| Roles | Manager, a separate Writer session, and a separate Reviewer session, with visible assignment and report messages |
| Delivered body | 70 whitespace-delimited words, excluding the heading |
| Counting | Reviewer corrected the per-sentence counts to 21 / 23 / 8 / 18; a deterministic recount outside xAgent confirmed them |
| Factual acceptance | xAgent returned PASS; our strict supplied-facts-only check found unsupported expansions |
| End state | Manager Idle, plan 5/5 Done, final English report, and a visible 7.5 KB attachment |
| Timing | Input and final-report message timestamps differ by 26 minutes 40 seconds; not a speed benchmark |

This is a new English factual-constraint test, separate from the [earlier Agent Teams field test](/blog/xagent-agent-teams-field-test). We did not reuse that test's results or interventions. This run asks whether a completed editorial handoff also satisfies a narrow content contract.

## Experiment setup: a small task with an explicit contract

On October 24, 2026, we created an **Editorial QA Demo** team in a test account. The input described a fictional product, so there was no live customer data to verify or publish:

- Harbor Notes is a desktop note-taking app.
- Version 0.3 adds offline keyword search.
- The beta opens on November 12, 2026.

No price, security guarantees, performance benchmark, mobile support, or integrations were supplied. One Writer was to deliver 60–80 words; one Reviewer was to check every factual claim and the count. The manager was to report the result and stop, without another draft or a review iteration.

The exact task submitted was:

```text
Please respond and name any newly recruited specialists in English. Run exactly one bounded editorial demo using only the synthetic facts below. Assign one Writer to draft 60–80 words, then one independent Reviewer to check every factual claim and the word count. Do not revise or iterate: report the draft, reviewer findings, actual role/session evidence, and final PASS or FAIL; then stop. If real delegation is unavailable, say so instead of pretending. Do not browse, send external messages, execute code, install anything, change configuration, or use real data. Synthetic facts: The fictional product is Harbor Notes, a desktop note-taking app. Version 0.3 adds offline keyword search. The beta opens on November 12, 2026. No price, security guarantees, performance benchmark, mobile support, or integrations have been specified. Reviewer must flag any invented claims. End with a short list of what was NOT tested.
```

The deterministic recount described in this article was performed outside xAgent after observing the output. It was not a code-execution step assigned to the tested team.

## What actually happened

### Initialization stopped; a new task followed

Creating the team automatically started an initialization run. After roughly a minute, the operator selected **Stop current run**. The interface acknowledged the stop and reached **Idle** in approximately six seconds. The concrete English task was then submitted in the same manager session.

This checks UI-level cancellation and the ability to start a new task afterward. No process crash or server restart was introduced, so this is not evidence of crash recovery, checkpoint resumption, or cancellation of every possible child tool.

After submitting the concrete task, the operator sent no further task prompt, factual correction, or rescue instruction. The remaining observation consisted of reading sessions and capturing screenshots. The default manager name and the auto-generated initialization message remained Chinese, despite the mostly English interface and English task.

### The Writer received a real assignment

The team exposed distinct manager, Writer, and Reviewer sessions. In the Writer session, a **Team assignment** message identified the source manager and repeated the synthetic facts and constraints.

![The Writer session receives a Team assignment containing the original synthetic facts and the 60–80 word requirement.](/img/manual/editorial-qa-20261024/writer-task.jpg)

*The visible assignment establishes a handoff to a separate session. Separate sessions do not establish statistical independence between model errors.*

The Writer's delivered body was:

> Harbor Notes is a desktop note-taking app built for people who think, plan, and capture ideas entirely on their own desktop. Version 0.3 adds offline keyword search, so your entire library can be searched from anywhere, even when you have no connection at all. The public beta opens on November 12, 2026. If your notes live off the grid, you will find them faster here, without ever leaving your desk.

The body above is reproduced verbatim. Its heading was excluded from the requested count. The Writer said it had internally corrected an earlier, shorter draft before sending this version. We observed one delivered draft and one Reviewer report; that does not prove there was no internal revision.

### The Reviewer corrected one problem and missed another

The Writer reported a total of 70 words, with sentence counts of **24 / 21 / 9 / 16**. The manager's preliminary recount was **21 / 22 / 8 / 19**. Both add up to 70, but neither breakdown matches the actual sentences.

![Writer report in the manager session, showing the delivered text and the incorrect self-reported sentence counts.](/img/manual/editorial-qa-20261024/writer-draft.jpg)

*The total alone concealed the counting errors: the Writer's sentence breakdown is incorrect even though its sum is 70.*

The Reviewer returned **21 / 23 / 8 / 18**, which the manager later adopted. Splitting the exact body on whitespace independently confirms 70 words and those four counts. Hyphenated terms such as “note-taking” remain one whitespace-delimited word under this rule.

However, the Reviewer also returned **PASS**, reporting zero invented claims. It treated “public beta,” “entire library,” and “faster” as supported restatement or marketing rhetoric.

![Reviewer report declaring PASS and zero invented claims, followed by its list of items not tested.](/img/manual/editorial-qa-20261024/reviewer-verdict.jpg)

*This is the actual Reviewer verdict. The article's factual acceptance assessment below differs from it; the screenshot has not been rewritten to match our conclusion.*

## Why the factual acceptance check did not pass

The task allowed only the supplied synthetic facts. Plausibility is a weaker standard than support from those facts:

| Draft wording | What the input established | Acceptance assessment |
| --- | --- | --- |
| “The public beta” | A beta opening date | Public access was not specified. |
| “your entire library can be searched” | Offline keyword search in v0.3 | Search coverage across the entire library was not specified. |
| “you will find them faster” | A new search feature, with no performance benchmark | Faster note retrieval was not established. Calling it rhetoric does not satisfy the strict input-only rule. |

These examples are enough to fail the strict factual criterion, even though the word-count criterion passed. They are not claims that Harbor Notes has contrary capabilities: it is fictional, and the issue is unsupported expansion beyond its brief.

The review report had another small defect: it labeled a quoted prefix containing 12 whitespace-delimited units as the first 10. That does not change the correctly checked full-body count, but it reinforces the need to inspect a review rather than accepting its label.

**A review is also model output and needs independent acceptance criteria.** This run showed useful error correction in counting alongside an overly permissive factual review. One sample cannot isolate the cause to the model, prompt, role design, or runtime, and it cannot estimate a model's overall accuracy.

## Completion, timing, and what remains untested

Member reports arrived in the manager session and were followed by renewed manager activity. The observed sequence was Writer first, Reviewer afterward, then manager closeout. It was not a parallel-speedup test.

The site's displayed clock records these milestones:

| Event | Displayed time |
| --- | --- |
| Concrete task submitted | 05:40:35 |
| Writer assignment | 05:44:03 |
| Writer report arrived | 05:48:23 |
| Reviewer assignment | 05:53:32 |
| Reviewer report arrived | 05:57:16 |
| Final chat report | 06:07:15 |

The first and last message timestamps differ by **26 minutes 40 seconds**. Those timestamps may represent message creation rather than exact generation completion. The browser's displayed clock differed from the observer's clock; we do not infer a time zone or convert these values. The final screen's **7m 33s** is a displayed run duration, not the duration of the whole task.

At the final observation the manager was **Idle**, the plan showed **5/5 completed / Done**, and the English report and a **7.5 KB attachment** were visible. These establish an observed workflow end state, not the factual correctness of the draft or independent validation of the attachment's contents and download behavior.

The test did not measure production reliability, repeated-run success rate, cost, ROI, concurrency scaling, backend restart recovery, permission enforcement, or security guarantees. There was no fault injection or external delivery. The test account and synthetic materials do not establish protection of real-user data. No additional human instruction was sent during the concrete task, but the setup intervention remains part of the record; this is not a general claim of unattended reliability.

## Reproduce the checks, not the PASS label

To try a comparable task on an instance you are authorized to use:

1. Start with the [first-task guide](/docs/getting-started/first-task#first-success-agent-team-brief) to check model availability, capacity, and costs. That guide uses a different bounded practice task.
2. Create a separate test team with synthetic materials. Specify the Writer's output and the Reviewer's exact acceptance criteria before submitting the goal. The [Virtual Teams guide](/docs/user-guide/virtual-teams) explains the operating steps.
3. Inspect actual assignments and replies in both member sessions. Do not substitute a manager's promise to delegate for handoff evidence.
4. Preserve the single delivered body before evaluating it. Count with a stated deterministic rule outside the agent workflow, and map each factual claim to an explicit input fact.
5. Keep separate results for delivery, word count, and factual support. Record interventions and unsupported claims even if the final system message says PASS. Stop at the agreed scope rather than iterating until the result looks successful.

For this sample, the useful outcome is concrete: separate sessions handed off work, the Reviewer corrected the count breakdown, and the factual gate still needed an independent check. Those are three different findings, and a usable acceptance process should preserve all three.
