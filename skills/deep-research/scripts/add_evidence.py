#!/usr/bin/env python3
from __future__ import annotations

import argparse
from _common import append_jsonl, next_id, read_jsonl, require_run, utc_now


def main() -> None:
    parser = argparse.ArgumentParser(description='Append an evidence entry to evidence_ledger.jsonl.')
    parser.add_argument('--run', required=True)
    parser.add_argument('--source-id', required=True)
    parser.add_argument('--questions', default='')
    parser.add_argument('--claim-supported', required=True)
    parser.add_argument('--summary', required=True)
    parser.add_argument('--quote')
    parser.add_argument('--location', required=True)
    parser.add_argument('--data-value')
    parser.add_argument('--data-unit')
    parser.add_argument('--date-context')
    parser.add_argument('--published-date')
    parser.add_argument('--strength', default='moderate', choices=['strong', 'moderate', 'weak'])
    parser.add_argument('--relevance', default='high', choices=['high', 'medium', 'low'])
    parser.add_argument('--limitations', default='')
    parser.add_argument('--notes', default='')
    args = parser.parse_args()

    run = require_run(args.run)
    path = run / 'evidence_ledger.jsonl'
    rows = read_jsonl(path)
    evidence_id = next_id(rows, 'evidence_id', 'E')

    row = {
        'evidence_id': evidence_id,
        'source_id': args.source_id,
        'sub_questions': [q.strip() for q in args.questions.split(',') if q.strip()],
        'claim_supported': args.claim_supported,
        'evidence_summary': args.summary,
        'exact_quote': args.quote,
        'location': args.location,
        'data_value': args.data_value,
        'data_unit': args.data_unit,
        'date_context': args.date_context,
        'published_date': args.published_date,
        'accessed_date': utc_now()[:10],
        'strength': args.strength,
        'relevance': args.relevance,
        'limitations': args.limitations,
        'notes': args.notes,
    }
    append_jsonl(path, row)
    print(evidence_id)


if __name__ == '__main__':
    main()
