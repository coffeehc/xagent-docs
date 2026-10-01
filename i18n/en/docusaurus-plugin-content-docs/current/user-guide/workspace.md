---
title: "xAgent Workspace Files: Materials, Results, and Downloads"
description: "Learn how xAgent Workspaces save, isolate, and manage task materials, generated files, intermediate results, and downloadable outputs."
status: stable
updated: 2026-10-01
---

# xAgent Workspace Files: Materials, Results, and Downloads

Workspace Files supports the full path from uploading and referencing materials to checking, downloading, or reusing results. Confirm that a file belongs to the current task before checking its contents and delivery format.

## From Materials to Delivery {/* #from-materials-to-delivery */}

1. [Upload a File](#upload-a-file), wait for completion, and describe the required scope.
2. [Reference a File](#reference-a-file) using its visible name or readable path.
3. [View Results](#view-results) and confirm the file mentioned in the Session was saved.
4. [Preview and Download](#preview-and-download), checking content, charts, text, and sensitive information.
5. To make further changes, [reuse the existing output](#reuse-existing-outputs) and specify the new goal.

Upload acceptance, model reading, and UI preview have different boundaries. Office text extraction is not original-layout rendering, and a scanned PDF preview does not establish extractable text. See [Supported Agent Capabilities](/docs/manual/capabilities) for formats and limits.

## Who This Is For {/* #who-this-is-for */}

This page is for users who need to upload files, view outputs, preview reports, or reuse task materials.

## What It Is {/* #what-it-is */}

The workspace is where xAgent saves task materials and results. Files you upload, generated Markdown, CSV files, HTML reports, and intermediate results will usually appear in Workspace Files.

xAgent isolates files by user and task scope. When an external command runs, an Execution Lease creates the minimum file view and ProcessSandbox mounts only paths authorized for that task. In everyday use, focus on the files visible on the page.

In `v0.0.20.beta`, files created by process Tools are committed to the Workspace correctly and Session drafts remain visible inside the sandbox. Access remains limited to the task's authorized scope.

## When to Use It {/* #when-to-use-it */}

Use the workspace when you need to:

- Let a task read files, spreadsheets, PDFs, documents, or images.
- Generate a downloadable file.
- Preview an HTML report or another output.
- Reuse existing materials in a later session.
- Confirm whether a result has been saved.

## Basic Usage {/* #basic-usage */}

### Upload a File {/* #upload-a-file */}

1. Upload the file from **Agent Session** or a workspace-related entry point.
2. Wait for the upload to finish.
3. State which file should be processed in the task.
4. When there are many files, state the scope and priority.

Example:

```text
Please read the three PDFs I just uploaded. Only organize content related to the procurement process, then output a summary and original evidence.
```

### Reference a File {/* #reference-a-file */}

When referencing a file, use the file name or path visible on the page. For example:

```text
Please process customer_feedback.xlsx in the workspace and identify the five problem categories that appear most often.
```

Do not use a local desktop path or an internal server path. xAgent can only process files in the current workspace and authorized scope.

### View Results {/* #view-results */}

When a task is complete, read the session reply first. If it says a file was generated, open Workspace Files to find it.

Common result types include:

| File type | Common use |
| --- | --- |
| Markdown | Summaries, checklists, meeting notes, and lightweight reports |
| CSV / Excel | Table results, structured data, and statistical details |
| HTML | Fully formatted reports with styling or charts |
| PDF | Reports that need a fixed layout or external delivery |
| Images | Charts, screenshots, and visual outputs |

### Preview and Download {/* #preview-and-download */}

Preview HTML, Markdown, or image results first to confirm their content. Download them only when they need to be forwarded, archived, or processed further.

When an administrator enables public file links, you can [create an expiring share](/docs/user-guide/file-sharing) from previews, Session files, or Workspace file menus. Sharing is disabled by default; visitors see a dynamically watermarked preview and original downloads require separate permission.

When previewing, check:

- Whether the title and content are correct.
- Whether tables and charts are complete.
- Whether Chinese text renders correctly.
- Whether it contains sensitive information that should not be public.
- Whether the file belongs to the current task rather than an older result.

### Reuse Existing Outputs {/* #reuse-existing-outputs */}

Workspace files can be used as material for the next task. For example:

```text
Based on the summary.md file that was just generated, create a five-minute briefing outline for management.
```

When filenames are similar, state the name clearly to avoid using the wrong material.

## File Safety {/* #file-safety */}

Keep the following in mind:

- Do not upload sensitive files that should not enter the system.
- Before external delivery, check whether a report contains personal information, keys, internal addresses, or customer data.
- Deletion, overwriting, and sending may require approval.
- Use stable filenames and directories for materials that need long-term use.
- Temporary files may not be suitable as formal deliverables.

## Continue Reading {/* #continue-reading */}

- [How xAgent Isolates Multi-user Workspaces and Task Processes](/docs/guides/multi-user-workspace-isolation)
- [Agent Session](/docs/user-guide/agent-session)
- [Tasks](/docs/user-guide/task)
- [Tool Management](/docs/user-guide/tool)
- [Approval Policies](/docs/user-guide/approval-policy)
- [Share Files with Expiring Links](/docs/user-guide/file-sharing)

## Next Steps {/* #next-steps */}

- [Upload and process files in Agent Session](/docs/user-guide/agent-session)
- [Describe a file-processing task](/docs/user-guide/task)
- [Install a Connector before sending external results](/docs/user-guide/connector)
