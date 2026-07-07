# Scripts

这些脚本是轻量辅助脚本，便于 xagent 维护研究运行目录。它们不依赖第三方包。

## init_research_run.py

创建研究运行目录和基础文件。

```bash
python scripts/init_research_run.py --root research_runs --title "研究企业级向量数据库市场" --depth standard
```

## add_source.py

追加来源到 `source_registry.jsonl`。

```bash
python scripts/add_source.py --run research_runs/<run_id> --title "Example" --url "https://example.com" --source-type official --tier 1 --status approved
```

## add_evidence.py

追加证据到 `evidence_ledger.jsonl`。

```bash
python scripts/add_evidence.py --run research_runs/<run_id> --source-id S0001 --claim-supported "..." --summary "..." --location "section 1" --strength strong --relevance high
```

## add_claim.py

追加 claim 到 `claim_map.jsonl`。

```bash
python scripts/add_claim.py --run research_runs/<run_id> --claim "..." --section "Key Findings" --type fact --evidence E0001,E0002 --confidence high
```

## audit_research.py

执行基础结构审计。

```bash
python scripts/audit_research.py --run research_runs/<run_id> --depth standard
```
