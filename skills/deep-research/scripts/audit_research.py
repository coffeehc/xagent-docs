#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from collections import Counter
from pathlib import Path
from _common import read_jsonl, require_run, utc_now

THRESHOLDS = {
    'quick': {'sources': 5, 'evidence': 8, 'domains': 3, 'tier12_share': 0.50},
    'standard': {'sources': 12, 'evidence': 25, 'domains': 5, 'tier12_share': 0.60},
    'deep': {'sources': 25, 'evidence': 60, 'domains': 8, 'tier12_share': 0.65},
    'exhaustive': {'sources': 50, 'evidence': 120, 'domains': 12, 'tier12_share': 0.70},
}


def domain_of(url: str | None) -> str | None:
    if not url:
        return None
    s = url.split('://', 1)[-1]
    return s.split('/', 1)[0].lower().removeprefix('www.')


def check(name: str, passed: bool, severity: str, notes: str = '') -> dict:
    return {'name': name, 'passed': passed, 'severity': severity, 'notes': notes}


def main() -> None:
    parser = argparse.ArgumentParser(description='Audit a deep research run directory.')
    parser.add_argument('--run', required=True)
    parser.add_argument('--depth', default='standard', choices=list(THRESHOLDS))
    args = parser.parse_args()

    run = require_run(args.run)
    sources = read_jsonl(run / 'source_registry.jsonl')
    evidence = read_jsonl(run / 'evidence_ledger.jsonl')
    claims = read_jsonl(run / 'claim_map.jsonl')

    approved_sources = [s for s in sources if s.get('status') == 'approved']
    tiers = Counter(s.get('tier') for s in approved_sources)
    domains = {domain_of(s.get('url')) for s in approved_sources if domain_of(s.get('url'))}
    tier12_count = tiers.get(1, 0) + tiers.get(2, 0)
    tier12_share = tier12_count / len(approved_sources) if approved_sources else 0
    th = THRESHOLDS[args.depth]

    evidence_ids = {e.get('evidence_id') for e in evidence}
    source_ids = {s.get('source_id') for s in sources}
    approved_source_ids = {s.get('source_id') for s in approved_sources}

    claim_without_evidence = [c for c in claims if not c.get('evidence_ids')]
    claim_bad_evidence = [c for c in claims if any(eid not in evidence_ids for eid in c.get('evidence_ids', []))]
    evidence_bad_source = [e for e in evidence if e.get('source_id') not in source_ids]
    evidence_unapproved_source = [e for e in evidence if e.get('source_id') not in approved_source_ids]

    checks = [
        check('brief.md exists', (run / 'brief.md').exists(), 'critical'),
        check('plan.md exists', (run / 'plan.md').exists(), 'critical'),
        check('source_registry.jsonl exists', (run / 'source_registry.jsonl').exists(), 'critical'),
        check('evidence_ledger.jsonl exists', (run / 'evidence_ledger.jsonl').exists(), 'critical'),
        check('claim_map.jsonl exists', (run / 'claim_map.jsonl').exists(), 'critical'),
        check('minimum approved sources', len(approved_sources) >= th['sources'], 'warning', f"{len(approved_sources)} / {th['sources']}"),
        check('minimum evidence items', len(evidence) >= th['evidence'], 'warning', f"{len(evidence)} / {th['evidence']}"),
        check('minimum unique domains', len(domains) >= th['domains'], 'warning', f"{len(domains)} / {th['domains']}"),
        check('tier 1/2 source share', tier12_share >= th['tier12_share'], 'warning', f"{tier12_share:.0%} / {th['tier12_share']:.0%}"),
        check('claims have evidence IDs', len(claim_without_evidence) == 0, 'critical', f"{len(claim_without_evidence)} unsupported claims"),
        check('claim evidence IDs exist', len(claim_bad_evidence) == 0, 'critical', f"{len(claim_bad_evidence)} claims refer to missing evidence"),
        check('evidence source IDs exist', len(evidence_bad_source) == 0, 'critical', f"{len(evidence_bad_source)} evidence entries refer to missing sources"),
        check('evidence uses approved sources', len(evidence_unapproved_source) == 0, 'warning', f"{len(evidence_unapproved_source)} evidence entries use non-approved sources"),
        check('contradiction_log.md exists', (run / 'contradiction_log.md').exists(), 'warning'),
        check('gap_matrix.md exists', (run / 'gap_matrix.md').exists(), 'warning'),
    ]

    failed_critical = [c for c in checks if not c['passed'] and c['severity'] == 'critical']
    failed_warning = [c for c in checks if not c['passed'] and c['severity'] == 'warning']
    status = 'fail' if failed_critical else ('warn' if failed_warning else 'pass')

    result = {
        'status': status,
        'run': str(run),
        'depth': args.depth,
        'generated_at': utc_now(),
        'stats': {
            'sources_total': len(sources),
            'sources_approved': len(approved_sources),
            'evidence_total': len(evidence),
            'claims_total': len(claims),
            'unique_domains': len(domains),
            'tier_distribution': dict(tiers),
            'tier12_share': tier12_share,
        },
        'checks': checks,
    }

    md = ['# Audit Report', '', f"Status: **{status.upper()}**", '', '## Stats', '']
    for k, v in result['stats'].items():
        md.append(f'- {k}: {v}')
    md.extend(['', '## Checks', '', '| Check | Status | Severity | Notes |', '|---|---|---|---|'])
    for c in checks:
        md.append(f"| {c['name']} | {'PASS' if c['passed'] else 'FAIL'} | {c['severity']} | {c.get('notes', '')} |")
    md.append('')

    (run / 'audit_report.md').write_text('\n'.join(md), encoding='utf-8')
    (run / 'audit_report.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
