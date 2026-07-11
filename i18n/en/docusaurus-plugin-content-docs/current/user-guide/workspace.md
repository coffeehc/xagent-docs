---
title: xAgent Workspace Files
description: Learn how xAgent Workspaces save, isolate, and manage task materials, generated files, intermediate results, and downloadable outputs.
status: stable
updated: 2026-07-11
---

# xAgent Workspace Files

## Who This Is For

This page is for users who need to upload files, view outputs, preview reports, or reuse task materials.

## What It Is

The workspace is where xAgent saves task materials and results. Files you upload, generated Markdown, CSV files, HTML reports, and intermediate results will usually appear in Workspace Files.

xAgent isolates files by user and task scope. In everyday use, focus on the files visible on the page.

## When to Use It

Use the workspace when you need to:

- Let a task read files, spreadsheets, PDFs, documents, or images.
- Generate a downloadable file.
- Preview an HTML report or another output.
- Reuse existing materials in a later session.
- Confirm whether a result has been saved.

## Basic Usage

### Upload a File

1. Upload the file from **Agent Session** or a workspace-related entry point.
2. Wait for the upload to finish.
3. State which file should be processed in the task.
4. When there are many files, state the scope and priority.

Example:

```text
Please read the three PDFs I just uploaded. Only organize content related to the procurement process, then output a summary and original evidence.
```

### Reference a File

When referencing a file, use the file name or path visible on the page. For example:

```text
Please process customer_feedback.xlsx in the workspace and identify the five problem categories that appear most often.
```

Do not use a local desktop path or an internal server path. xAgent can only process files in the current workspace and authorized scope.

### View Results

When a task is complete, read the session reply first. If it says a file was generated, open Workspace Files to find it.

Common result types include:

| File type | Common use |
| --- | --- |
| Markdown | Summaries, checklists, meeting notes, and lightweight reports |
| CSV / Excel | Table results, structured data, and statistical details |
| HTML | Fully formatted reports with styling or charts |
| PDF | Reports that need a fixed layout or external delivery |
| Images | Charts, screenshots, and visual outputs |

### Preview and Download

Preview HTML, Markdown, or image results first to confirm their content. Download them only when they need to be forwarded, archived, or processed further.

When previewing, check:

- Whether the title and content are correct.
- Whether tables and charts are complete.
- Whether Chinese text renders correctly.
- Whether it contains sensitive information that should not be public.
- Whether the file belongs to the current task rather than an older result.

### Reuse Existing Outputs

Workspace files can be used as material for the next task. For example:

```text
Based on the summary.md file that was just generated, create a five-minute briefing outline for management.
```

When filenames are similar, state the name clearly to avoid using the wrong material.

## File Safety

Keep the following in mind:

- Do not upload sensitive files that should not enter the system.
- Before external delivery, check whether a report contains personal information, keys, internal addresses, or customer data.
- Deletion, overwriting, and sending may require approval.
- Use stable filenames and directories for materials that need long-term use.
- Temporary files may not be suitable as formal deliverables.

## Common Questions

### Is the workspace the same as any local directory on my computer?

No. A workspace has explicit visibility and permission boundaries. Users can only see files in their authorized scope.

### Are uploaded files processed automatically?

Not necessarily. Uploading only provides the material. You still need to say “read this file” or “analyze this spreadsheet” in a task.

### Why can I not find a generated file?

The task may have only returned the result in the session without saving a file. Ask it to “save the result as a Markdown file,” for example.

### Can I send a workspace file to an external system?

Yes, but it usually needs a Tool, a connection, and approval. Check that the content is appropriate before sending it.

## Continue Reading

- [Agent Session](/docs/user-guide/agent-session)
- [Tasks](/docs/user-guide/task)
- [Tool Management](/docs/user-guide/tool)
- [Approval Policies](/docs/user-guide/approval-policy)
