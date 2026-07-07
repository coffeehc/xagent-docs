# Document Understanding Rules

## Reading Modes

Choose the smallest mode that answers the task.

- Gist: identify what the document is, what it argues, who it is for, and what matters.
- Targeted extraction: pull only requested fields, passages, dates, decisions, requirements, risks, or entities.
- Structure map: identify headings, sections, tables, appendices, page/slide flow, and metadata.
- Requirement mining: find obligations, constraints, acceptance criteria, dependencies, and non-goals.
- Comparison: compare versions, documents, options, policies, or sections on the same dimensions.
- Coverage check: verify whether required topics or facts are present and where.
- Handoff context: prepare document-grounded facts for writing, research, planning, data, or code work.

## Source Inventory

Track enough source context to audit the answer:

- document name, path, attachment, URL, pasted block, or artifact reference;
- file type and language;
- date, version, author, owner, or source system when visible;
- inspected scope: whole document, pages, slides, sections, tables, or excerpts;
- unreadable or missing parts.

Do not imply full-document coverage when only excerpts were inspected.

## Extraction Discipline

For each load-bearing item, preserve:

- original label or heading;
- nearby caveat or condition;
- date, unit, owner, or definition when present;
- whether it is direct document content or interpretation.

Do not normalize away legal, financial, policy, technical, or operational qualifiers. If wording is ambiguous, keep the ambiguity visible.

## Summarization Discipline

Summaries should compress without changing meaning.

- Keep decisions, obligations, risks, requirements, names, numbers, dates, definitions, and constraints.
- Remove repetition, examples, and low-value background only when they are not needed for the user task.
- Separate key facts from interpretation and recommendations.
- Mark missing evidence rather than inventing a smooth story.

## Table And Figure Handling

When tables or figures matter:

- state what table/figure was inspected;
- preserve headers, units, denominators, and row/column meaning;
- distinguish table text from calculated analysis;
- do not compute derived metrics unless the task requires it and the needed data is present;
- hand off to `data-visual-report-builder` when computation or statistical interpretation becomes central.

## Comparison Workflow

For comparing documents:

1. Establish shared comparison dimensions.
2. Align equivalent sections, versions, dates, or source owners.
3. Identify additions, deletions, contradictions, stronger/weaker evidence, and changed commitments.
4. Preserve document-specific caveats.
5. Mark differences that may be caused by scope, version, or missing context.

## Coverage Checks

When checking whether content exists:

- list required topics or fields;
- mark found, partially found, not found, or not inspected;
- cite the section/page/heading when found;
- do not treat absence in an excerpt as absence in the whole document.

## Handoff Rules

Before handing off to another Skill, provide:

- document-grounded facts;
- source references or locations;
- limitations and missing sections;
- interpretations that need confirmation;
- the user goal that the next Skill should serve.
