# Verification, blockers and publication ledger

Review date: 2026-10-23, Asia/Shanghai. Keep concise conclusions here; remote task data, raw session logs and newly captured test screenshots are not exported to the local machine.

## Product exercise

- Created a separate `First success 2026-10-23` team on the instance explicitly supplied in this chat. The user was already signed in. Manager, Researcher and Editor each displayed `Qwen3.8-27B`; provider/billing identity and per-call routing were not independently established.
- Inputs were the three fixed facts F1–F3 now included in the first-task guide. Researcher received the actual assignment and its three-row report reached the manager. The manager assigned editing after that report. Editor's report and the manager's final brief were inspected.
- The brief preserved all three source facts and [F1]/[F2]/[F3]. Its body was 31 whitespace-delimited tokens including citation markers, independently counted from the visible text; below the 90-word criterion. It included the required separate limitation sentence.
- The first final brief was English but the acceptance checklist was Chinese. A narrow follow-up requested English formatting of the existing results without new assignments; the final brief and three-item checklist were then English. Manager ended idle. This is supervised first success, not first-try perfection.
- Two interventions: stop automatic initialization; request the English checklist. No server restart, pause/resume recovery test, clean installation, new model configuration, Memory write/recall, MCP external call or A2A round trip was tested.
- The exact deployed Server build was not established from the inspected UI. Public v0.1.1 metadata and local source SHAs are separately documented in the capability matrix; none is substituted for this missing runtime fact.
- No total duration, dollar cost, comparative success rate or speedup is reported. UI usage is rounded, session-specific and includes initialization; it does not supply complete case billing attribution.
- Evidence remains in the remote team/session history. This is one operator exercise, not an acquired user or retention measurement.

## Public entry checks

Direct HTTP requests on Oct 23 returned 200 with English titles/H1s for the homepage, field-test article, installation, first-task, model-configuration, virtual-teams, Memory and A2A pages. No response bodies were saved locally.

The live homepage title was “xAgent: An Agentic platform for ongoing work.” It contained the current public v0.1.1 marker; v0.1.0 also appeared in other content, so a text match for an older version alone is not a mismatch. A web-reader snapshot initially showed an older home and failed on the article; live HTTP corrected that observation. Availability, source structure and actual runtime acceptance are separate evidence.

A later generic HTTP client received 403 for the article. A normal Chrome visit then displayed the complete current English article, including both interventions, member reports, eight screenshot controls and the failed-reference/scope-deviation account. Do not infer continuous availability or a missing article from either one client result.

The public [v0.1.1 LICENSE](https://github.com/coffeehc/xagent-releases/releases/download/v0.1.1/LICENSE) was read directly: proprietary. Release metadata also says `license=proprietary`. GitHub release API confirmed non-draft/non-prerelease publication on Oct 23 local time. No priority-invention claim is made.

## Conversion blockers and treatment

| ID | Finding | Treatment and current state |
| --- | --- | --- |
| B1 | Current live Memory wording still says experimental, contrary to the owner's current feature status | Corrected local homepage, README, authoring rule, machine-readable entry and bilingual current guide/introduction/glossary/manual links. Default service registration checked in source. Push/deploy and live recheck still pending |
| B2 | Existing first-task article lacked the complete small English team path and explicit initialization/capacity/cost/recovery checks | Added a copyable bounded prompt, acceptance and failure guidance to the existing bilingual page; linked from the existing bilingual field test. New anchor is not yet public |
| B3 | A public-demo URL is not proof an anonymous visitor can start a task | No claim of frictionless public access. Guide offers an existing authorized instance or administrator-led installation. Anonymous sign-in-to-success was not verified; no account created |
| B4 | Automatic initialization runs before a concrete goal; the inspected application UI was Chinese, and the manager's first checklist was Chinese | Actual exercise completed after two interventions. The English guide maps key Chinese UI labels and documents initialization stop/English-delivery correction. Full English application localization was not verified; do not advertise it. No runtime code/config changed |
| B5 | A2A guide said Enterprise capacity was required while current FAQ says one Free connection | Checked `a2aclientservice/remote_agent.go:134` and `licenseservice/service.go:40`: the actual gate uses current entitlements, with one Free connection. Corrected both guides locally; public deployment pending. A2A is not required for first success |
| B6 | No campaign funnel baseline or runtime build fingerprint obtained | No installation-to-success, conversion, retention, billing or release-wide reliability claims. Measurement and exact version remain explicit gaps |

## Existing screenshot packet — not new-run captures

These are already-committed, published first-party screenshots from the separate field test. Preserve captions, masking and the fact that the UI/task are Chinese. Do not relabel them as the new English exercise.

| Existing asset under `static/img/manual/agent-teams-20261023/` | Use | Evidence limit |
| --- | --- | --- |
| [02-team-created.png](../../../static/img/manual/agent-teams-20261023/02-team-created.png) | Configuration and dedicated manager | Ready is not task completion |
| [04-research-dispatched.png](../../../static/img/manual/agent-teams-20261023/04-research-dispatched.png) | Actual member tree and received assignment | Receipt is not accepted output |
| [06-editor-completed.png](../../../static/img/manual/agent-teams-20261023/06-editor-completed.png) | Inspectable editing result | Does not prove autonomous completion |
| [07-final-idle-summary.png](../../../static/img/manual/agent-teams-20261023/07-final-idle-summary.png) | Manager result and final idle state | Belongs to the original supervised case |
| [09-wait-failure.png](../../../static/img/manual/agent-teams-20261023/09-wait-failure.png) | Failed reference and recovery discussion | Do not crop away the error |
| [05-scope-deviation-file.png](../../../static/img/manual/agent-teams-20261023/05-scope-deviation-file.png) | An unwanted file operation and actual preview | Acknowledge the deviation; not proof of access to private files |

## Publication ledger

Blank/unknown metrics mean unmeasured, not zero. Exact original publication timestamps were not obtained where noted. Account identity is used only to verify the already-public source, not to infer permission to post.

| ID | Channel / audience | Content version | Link | Publication time | Authorization/status | Feedback / next step |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | Official English site / evaluators | Existing Agent Teams field test | [Article](https://xagent.xiagaogao.com/en/blog/xagent-agent-teams-field-test/) | Page date Oct 23; exact deployment time unknown | Pre-existing; HTTP 200 verified | Contains process, screenshots, failure and limitations; local next-step link awaits deployment |
| P2 | r/xAgent / Agent users | Existing manually published Agent Teams post | [Public permalink](https://www.reddit.com/r/xAgent/comments/1xd7pzk/xagent_agent_teams_from_a_single_assistant_to/) | Oct 23 as observed; exact timestamp not captured | Existing user publication; anonymous body verified; not posted by this task | No feedback metrics collected; no duplicate post or reply |
| P3 | r/xAgent / users needing first success | Draft A v1 | No new publication | Not published | Awaiting explicit reply authorization and website deployment | Use only as a substantive follow-up on P2 |
| P4 | r/AI_Agents / builders | Draft B v1 | [Candidate display thread](https://www.reddit.com/r/AI_Agents/comments/1x5v32d/weekly_thread_project_display/) | Not published by this task | Rules/placement checked; account eligibility and posting authorization pending | Recheck featured thread and participation before one comment |
| P5 | r/automation / troubleshooting | Draft C v1 | No suitable discussion selected | Not published | Hold: relevant recipient/thread, participation and authorization missing | Do not place a generic link comment |
| P6 | Own community / newcomers | Description/sidebar proposal | [Community](https://www.reddit.com/r/xAgent/) | Not applied | Awaiting current moderator/account-change authorization | Replace old deployment-first emphasis only after approval |
| P7 | Technical blog readers | Adaptation requirements only | No publication | Not published | Hashnode access and publication authority unverified; DEV/HN campaign routes held/excluded | Do not treat canonical support as automated publishing permission |

## Local validation

| Check | Result | Scope and limit |
| --- | --- | --- |
| `npm run validate:release` | Passed; public Server release `v0.1.1` matches `llms.txt` and both documentation locales. | Also runs automatically as `prebuild`; the standalone check and build hook both passed. |
| `npm run validate:docs` | Passed: 59 Chinese pages, 59 English pages, `llms.txt` links, 17 Chinese and 17 English blog posts, and 5 Chinese and 5 English insights posts. | Static repository validation; it does not establish live deployment behavior. |
| `npm run typecheck` | Passed (`tsc`). | Static type check only. |
| `npm run build` | Passed for `zh-CN` and `en`; generated `build/` and `build/en/`. | Builds the full current working tree, including pre-existing untracked blog and image files outside this task. This is not a clean, task-only production artifact or deployment acceptance. |
| `git diff --check` | Passed. | Whitespace/conflict-marker check only. |
| `npm run validate:site` | Passed after correcting the stale Memory-label assertion: 280 HTML pages, 170 sitemap URLs, and 110 noindex pages. | The first run exposed that the validator required the superseded experimental label; the updated check now asserts the default-enabled wording and rejects the old label. |

The published xAgent links were also checked live: 23 URLs returned HTTP 200, canonical targets matched, and four existing article anchors were present. Anchors for the new First Task guide are not yet deployed and remain a publication dependency.

No external publication or deployment was performed. The build and checks validate the current local tree, not public visibility or production behavior.
