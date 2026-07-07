#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
from datetime import datetime, timezone
from pathlib import Path


def slugify(s: str) -> str:
    s = re.sub(r'[^\w\u4e00-\u9fff-]+', '-', s.strip().lower())
    s = re.sub(r'-+', '-', s).strip('-')
    return s[:60] or 'research'


def main() -> None:
    parser = argparse.ArgumentParser(description='Initialize a deep research run directory.')
    parser.add_argument('--root', default='research_runs')
    parser.add_argument('--title', required=True)
    parser.add_argument('--depth', default='standard', choices=['quick', 'standard', 'deep', 'exhaustive'])
    args = parser.parse_args()

    now = datetime.now(timezone.utc)
    run_id = f"{now.strftime('%Y%m%dT%H%M%SZ')}-{slugify(args.title)}"
    root = Path(args.root)
    run = root / run_id
    run.mkdir(parents=True, exist_ok=False)
    (run / 'downloads').mkdir()
    (run / 'parsed').mkdir()
    (run / 'notes').mkdir()

    state = {
        'run_id': run_id,
        'title': args.title,
        'created_at': now.isoformat(),
        'updated_at': now.isoformat(),
        'phase': 'brief',
        'depth': args.depth,
        'status': 'active',
        'notes': ''
    }
    (run / 'state.json').write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding='utf-8')

    templates = {
        'brief.md': '# Research Brief\n\n## Research Question\n\n## Intended Audience\n\n## Decision Context\n\n## Scope\n\n## Exclusions\n\n## Geography\n\n## Time Window\n\n## Depth\n\n' + args.depth + '\n\n## Source Constraints\n\n## Output Requirements\n\n## Success Criteria\n\n## Assumptions\n',
        'plan.md': '# Research Plan\n\n## Research Type\n\n## Depth Level\n\n' + args.depth + '\n\n## Verifiable Checklist\n\n| ID | Sub-question | Why it matters | Required evidence | Priority | Status |\n|---|---|---|---|---|---|\n\n## Search Rounds\n\n| Round | Goal | Query angles | Expected sources | Exit criteria |\n|---|---|---|---|---|\n',
        'gap_matrix.md': '# Gap Matrix\n\n| Sub-question | Current answer | Evidence IDs | Confidence | Gaps | Next action |\n|---|---|---|---|---|---|\n',
        'contradiction_log.md': '# Contradiction Log\n\n| Conflict ID | Topic | Evidence A | Evidence B | Difference | Likely reason | Resolution | Confidence |\n|---|---|---|---|---|---|---|---|\n',
        'draft.md': '# Draft\n',
        'audit_report.md': '# Audit Report\n',
        'final_report.md': '# Final Report\n'
    }
    for name, content in templates.items():
        (run / name).write_text(content, encoding='utf-8')

    for name in ['query_log.jsonl', 'source_registry.jsonl', 'download_registry.jsonl', 'parse_registry.jsonl', 'evidence_ledger.jsonl', 'claim_map.jsonl']:
        (run / name).write_text('', encoding='utf-8')

    print(run)


if __name__ == '__main__':
    main()
