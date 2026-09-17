---
title: Share Files with Expiring Links
description: Create administrator-governed file links, inspect watermarked previews, download permissions, and access records.
status: beta
updated: 2026-09-17
---

# Share Files with Expiring Links

Since `v0.0.19.beta`, users can share managed files they are allowed to access. **Public file links are disabled by default**; an administrator must first enable a policy under **Storage Management > File Sharing**. Visitors do not need to sign in, so do not share material that should remain private.

## Administrator Setup

Administrators choose whether sharing is disabled, limited to xAgent-generated outputs, or allowed for all managed user files. They can set default and maximum expiry, whether original downloads are available, and the public base URL. Users can create links after the policy is saved; restricting the policy may invalidate existing links. Use an HTTPS reverse proxy with a reachable public domain rather than an internal service address.

## Create and Manage a Link

1. Find the file in its preview, Session files, or **Workspace > Workspace Files**, then select the share action.
2. Choose an expiry and, if allowed by policy, whether visitors may download the original. Permanent links are not available.
3. Copy the link and verify the preview in a signed-out browser before sharing it.
4. In **Workspace > File Shares**, inspect per-file link, visit, and download totals. Open details to inspect individual links and visits; revoke links no longer needed.

Visitors see a dynamically watermarked preview. Original downloads are available only when both the individual link and the administrator policy allow them; the original file is not watermarked. Expired, revoked, policy-blocked, and unavailable-file links no longer grant access.

## Security Boundaries

- Anyone with the link can pass it on; a public link is not login-based authorization.
- Watermarks and access logs aid traceability but cannot prevent photography or redistribution.
- Administrators set the maximum share scope and download ability; users cannot exceed that policy.
- Check the share details for aggregate counts and individual access records.

Related: [Workspace Files](/docs/user-guide/workspace) · [System Configuration](/docs/manual/system-configuration) · [Changelog](/docs/changelog)
