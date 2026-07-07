from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, Iterable, List


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def read_jsonl(path: Path) -> List[Dict[str, Any]]:
    if not path.exists():
        return []
    rows = []
    with path.open('r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            rows.append(json.loads(line))
    return rows


def append_jsonl(path: Path, row: Dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('a', encoding='utf-8') as f:
        f.write(json.dumps(row, ensure_ascii=False, sort_keys=True) + '\n')


def next_id(existing: Iterable[Dict[str, Any]], key: str, prefix: str) -> str:
    max_n = 0
    pat = re.compile(rf'^{re.escape(prefix)}(\d+)$')
    for row in existing:
        value = str(row.get(key, ''))
        m = pat.match(value)
        if m:
            max_n = max(max_n, int(m.group(1)))
    return f'{prefix}{max_n + 1:04d}'


def require_run(path: str) -> Path:
    run = Path(path)
    if not run.exists() or not run.is_dir():
        raise SystemExit(f'Research run directory not found: {run}')
    return run
