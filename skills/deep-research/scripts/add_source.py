#!/usr/bin/env python3
from __future__ import annotations

import argparse
from _common import append_jsonl, next_id, read_jsonl, require_run, utc_now


def main() -> None:
    parser = argparse.ArgumentParser(description='Append a source entry to source_registry.jsonl.')
    parser.add_argument('--run', required=True)
    parser.add_argument('--title', required=True)
    parser.add_argument('--url')
    parser.add_argument('--local-path')
    parser.add_argument('--source-type', default='unknown', choices=['official', 'paper', 'filing', 'standard', 'data', 'media', 'blog', 'forum', 'vendor', 'unknown'])
    parser.add_argument('--tier', type=int, default=3, choices=[1, 2, 3, 4])
    parser.add_argument('--status', default='candidate', choices=['candidate', 'approved', 'rejected', 'needs_review'])
    parser.add_argument('--organization')
    parser.add_argument('--author')
    parser.add_argument('--published-date')
    parser.add_argument('--updated-date')
    parser.add_argument('--questions', default='')
    parser.add_argument('--quality-notes', default='')
    parser.add_argument('--bias-risk', default='unknown', choices=['low', 'medium', 'high', 'unknown'])
    parser.add_argument('--reason', default='')
    args = parser.parse_args()

    run = require_run(args.run)
    path = run / 'source_registry.jsonl'
    rows = read_jsonl(path)
    source_id = next_id(rows, 'source_id', 'S')

    row = {
        'source_id': source_id,
        'status': args.status,
        'title': args.title,
        'url': args.url,
        'local_path': args.local_path,
        'source_type': args.source_type,
        'tier': args.tier,
        'organization': args.organization,
        'author': args.author,
        'published_date': args.published_date,
        'updated_date': args.updated_date,
        'accessed_date': utc_now()[:10],
        'relevant_questions': [q.strip() for q in args.questions.split(',') if q.strip()],
        'quality_notes': args.quality_notes,
        'bias_risk': args.bias_risk,
        'reason': args.reason,
    }
    append_jsonl(path, row)
    print(source_id)


if __name__ == '__main__':
    main()
