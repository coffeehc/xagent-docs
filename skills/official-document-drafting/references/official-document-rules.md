# Official Document Rules

## Anti-Fabrication

- Do not fabricate facts, data, dates, locations, organizations, identities, meeting conclusions, policy bases, document numbers, legal clauses, or news sources.
- Do not turn speculation, common-sense completion, or experience-based judgment into confirmed fact.
- If user material is incomplete, use placeholders such as `[主送单位]`, `[发文单位]`, `[日期]`, `[事项名称]`, `[联系人]`, `[联系电话]`, and `[待核实]`.
- For `当前`, `最新`, `今日`, `近日`, and similar time-sensitive wording, use only dates and sources explicitly provided by the user or verified in the current task. If no date or source is available, mark it as pending verification.
- If materials conflict or leave gaps, use conservative wording and mark the points that need further verification.
- Truthfulness is more important than literary completeness.

## Human Review

Documents that may be formally issued, reported externally, create rights or obligations, involve policy sensitivity, legal sensitivity, secrecy, privacy, or public communication must be reviewed by authorized personnel before use.

The draft may be useful as a working version, but this Skill does not make the text legally valid or officially approved.

## Workflow

1. Determine whether the target is a legal official document or a common formal material.
2. Determine writing direction: upward, downward, horizontal, public release, meeting record, or internal reporting.
3. Determine core facts: issuing body, recipient, subject, date, source material, decision basis, action owner, deadline, and review status.
4. Select the document type and structure from `references/document-types.md`.
5. Draft within the available facts. Keep placeholders for missing required fields.
6. Check type, structure, facts, title, hierarchy, attachments, signature, date, punctuation, numbers, and names.
7. If Word output is requested, hand off Markdown as the source artifact; XAgent tool/runtime decides path and conversion.

## Routing Rules

- Requesting higher-level approval: use `请示`.
- Replying to a lower-level request: use `批复`.
- Deploying or arranging work: use `通知`.
- Giving principle-level guidance: use `意见`.
- Making an important decision, action, reward, punishment, or adjustment: use `决定`.
- Publicly announcing important matters: use `公告` or `通告`, only if the issuing subject and matter fit.
- Reporting work or status upward: use `报告`.
- Horizontal consultation, inquiry, request, or reply: use `函`.
- Recording meeting consensus and decisions: use `纪要`.
- Summarizing current news, risk, or topical information: use `简报` or `专报`.

Avoid common mistakes:

- Do not write a `报告` as a hidden approval request.
- Do not write a `请示` as a report.
- Do not write a `函` as a notice.
- Do not use `议案`, `命令（令）`, `公告`, or `公报` unless the subject and procedure clearly match.

## Style

- Keep wording formal, accurate, concise, and executable.
- State purpose, basis, task, requirement, owner, and deadline where the material supports them.
- Avoid casual, promotional, slogan-like, vague, or empty wording.
- Prefer action-oriented verbs such as `开展`, `落实`, `报送`, `组织实施`, `严格执行`.
- Avoid vague words such as `尽快`, `适当`, `比较好` unless the user provided that wording.
- Titles usually follow `关于 + 事项 + 文种` and should make the document type obvious.
- Avoid multiple unrelated matters in one title.
- Use full names first, then define abbreviations in parentheses if needed.
- When citing policy files, meetings, or prior correspondence, write the full title and identifier if provided; otherwise use placeholders.

## Heading And Body Structure

- Use `一、`, `（一）`, `1.`, `（1）` as the default hierarchy.
- Do not mix heading systems at the same level.
- For documents under about 10 pages, usually keep to level 1 and level 2 headings.
- Do not hang headings without substantive content.
- Each section should answer its job:
  - background: why this is written;
  - progress: what has been done;
  - issue: what is blocked or risky;
  - recommendation/requirement: what happens next, by whom, and by when.
- `一是`, `二是`, `三是` can be used as in-paragraph formal connectors, but should not replace the formal heading hierarchy.

## Attachments, Images, And Notes

- Long plans, tables, lists, rules, rosters, and detailed procedures should usually be summarized in the body and carried by attachments.
- Images, flowcharts, screenshots, and photos in ordinary official documents should usually appear as attachments, figures, or tables, not as unframed body content.
- Image attachments should include number, title, explanation, source, date, and scope where relevant.
- Do not invent attachment names or counts.
- Contact notes should be preserved for document types that usually need them when the user provides contact information; otherwise keep placeholders when needed by the type.
- Use colophon or distribution fields only when the selected document type, user template, or local style requires them.

## Layout Guidance

Markdown is the working source. It should preserve clear structure rather than simulate exact page layout with fragile whitespace.

For Word-ready drafts:

- A4 official-document layout is the baseline.
- Title is usually centered and uses a title font in final Word rendering.
- Body uses formal Chinese document paragraph style, usually with first-line indent.
- Signature and date are usually placed at the end, with date written as Chinese year-month-day.
- Page numbers, fonts, red-head layout, seal-over-date, and full colophon are final typesetting concerns, not facts to fabricate in Markdown.
- Final external official layout must be checked against the user's organization template.

## XAgent Artifact Boundary

- If the user asks to save a draft and provides no path, use the current XAgent session artifact/workspace conventions. Do not write to a hardcoded home directory.
- Suggested file names may use `YYYYMMDD-标题-vNN.md`, but the actual path is owned by the runtime.
- If Word output is requested, first create a verified Markdown source. Do not call external exporters directly from this Skill.
- Any script, shell, Python, curl, font install, or document conversion must be performed only through explicit XAgent tools and permissions.
