# Homepage Image Originals

This directory stores the original full-resolution v0.0.5 homepage screenshots
before the responsive-image optimization performed on 2026-07-30.

These files are intentionally outside `static/`, so Docusaurus does not include
the backup copies in the deployed site. Published variants live under
`static/img/home/v005/` at 720, 1040, and 1600 pixels wide.

The published WebP files were generated with:

```text
cwebp -q 82 -m 6 -mt -sharp_yuv -resize <width> 0
```
