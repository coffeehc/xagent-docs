#!/usr/bin/env python3
from __future__ import annotations

import argparse
from _common import append_jsonl, next_id, read_jsonl, require_run


def main() -> None:
    parser = argparse.ArgumentParser(description='Append a claim entry to claim_map.jsonl.')
    parser.add_argument('--run', required=True)
    parser.add_argument('--section', required=True)
    parser.add_argument('--claim', required=True)
    parser.add_argument('--type', default='fact', choices=['fact', 'numeric', 'estimate', 'interpretation', 'recommendation'])
    parser.add_argument('--evidence', required=True, help='Comma-separated evidence IDs')
    parser.add_argument('--confidence', default='medium', choices=['high', 'medium', 'low'])
    parser.add_argument('--limitations', default='')
    parser.add_argument('--requires-citation', action='store_true', default=True)
    args = parser.parse_args()

    run = require_run(args.run)
    path = run / 'claim_map.jsonl'
    rows = read_jsonl(path)
    claim_id = next_id(rows, 'claim_id', 'C')

    row = {
        'claim_id': claim_id,
        'section': args.section,
        'claim': args.claim,
        'claim_type': args.type,
        'evidence_ids': [e.strip() for e in args.evidence.split(',') if e.strip()],
        'confidence': args.confidence,
        'limitations': args.limitations,
        'requires_citation': args.requires_citation,
    }
    append_jsonl(path, row)
    print(claim_id)


if __name__ == '__main__':
    main()
