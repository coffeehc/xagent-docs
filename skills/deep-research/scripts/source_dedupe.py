#!/usr/bin/env python3
from __future__ import annotations

import argparse
from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode
from _common import read_jsonl, require_run

TRACKING_PREFIXES = ('utm_',)
TRACKING_KEYS = {'fbclid', 'gclid', 'mc_cid', 'mc_eid'}


def normalize_url(url: str | None) -> str | None:
    if not url:
        return None
    parts = urlsplit(url.strip())
    scheme = parts.scheme.lower() or 'https'
    netloc = parts.netloc.lower().removeprefix('www.')
    path = parts.path.rstrip('/') or '/'
    query_items = []
    for k, v in parse_qsl(parts.query, keep_blank_values=True):
        lk = k.lower()
        if lk in TRACKING_KEYS or any(lk.startswith(p) for p in TRACKING_PREFIXES):
            continue
        query_items.append((k, v))
    query = urlencode(query_items)
    return urlunsplit((scheme, netloc, path, query, ''))


def main() -> None:
    parser = argparse.ArgumentParser(description='Find likely duplicate sources by normalized URL.')
    parser.add_argument('--run', required=True)
    args = parser.parse_args()

    run = require_run(args.run)
    rows = read_jsonl(run / 'source_registry.jsonl')
    seen = {}
    duplicates = []
    for row in rows:
        norm = normalize_url(row.get('url'))
        if not norm:
            continue
        if norm in seen:
            duplicates.append((seen[norm], row.get('source_id'), norm))
        else:
            seen[norm] = row.get('source_id')

    if not duplicates:
        print('No duplicate URLs found.')
        return
    for first, second, url in duplicates:
        print(f'{second} duplicates {first}: {url}')


if __name__ == '__main__':
    main()
