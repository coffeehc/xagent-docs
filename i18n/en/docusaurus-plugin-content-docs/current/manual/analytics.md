---
title: Analytics Pages
description: Page-by-page guidance and English UI examples for xAgent Token Usage and System Monitoring.
status: beta
updated: 2026-07-27
---

# Analytics Pages

Analytics is available only to administrators and is used to review model consumption, call trends, and service health.

## Token Usage

**Menu:** Analytics > Token Usage

**Visibility:** Administrators

![xAgent Token Usage showing totals, trends, model dimensions, and user dimensions](/img/manual/v005/en/token-usage.webp)

- Review input, cached, output, and total tokens over a selected time range.
- Compare model-call and tool-call trends.
- Use model and user dimensions to locate major consumption sources.
- Treat these figures as capacity and cost signals, not billing records.

## System Monitoring

**Menu:** Analytics > System Monitoring

**Visibility:** Administrators

![xAgent System Monitoring showing resource use, runtime state, and connector health](/img/manual/v005/en/system-monitoring.webp)

- Review CPU, memory, disk, load, network, and xAgent runtime indicators.
- Check Connector health and service availability together.
- Compare the page with service logs to distinguish a brief spike from a persistent failure.
