import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const script = path.resolve('scripts/sync-release.mjs');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'xagent-release-test-'));
try {
  for (const version of ['0.0.22.beta', '0.1.0']) {
    for (const dir of ['src/data', 'static', 'docs/getting-started', 'i18n/en/docusaurus-plugin-content-docs/current/getting-started']) {
      fs.mkdirSync(path.join(root, dir), {recursive: true});
    }
    fs.writeFileSync(path.join(root, 'src/data/product-release.json'), JSON.stringify({version, published: '2026-10-18', url: `https://github.com/coffeehc/xagent-releases/releases/tag/v${version}`}));
    fs.writeFileSync(path.join(root, 'static/llms.txt'), 'Current Server release: v0.0.1.beta.\n');
    for (const dir of ['docs', 'i18n/en/docusaurus-plugin-content-docs/current']) {
      fs.writeFileSync(path.join(root, dir, 'changelog.md'), `## \`v${version}\` - 2026-10-18\n`);
      fs.writeFileSync(path.join(root, dir, 'getting-started/what-is-xagent.md'), `\`v${version}\`\n`);
    }
    const run = (...args) => spawnSync(process.execPath, [script, ...args], {cwd: root, encoding: 'utf8'});
    assert.notEqual(run('--check').status, 0, 'stale marker must fail');
    assert.equal(run().status, 0, 'sync supports beta and stable');
    assert.equal(run('--check').status, 0, 'synced marker passes');
    fs.appendFileSync(path.join(root, 'static/llms.txt'), `Current Server release: v${version}.\n`);
    assert.notEqual(run('--check').status, 0, 'duplicate markers must fail');
  }
  const record = path.join(root, 'src/data/product-release.json');
  fs.writeFileSync(record, JSON.stringify({version: '0.1.0.invalid', url: 'https://example.com'}));
  assert.notEqual(spawnSync(process.execPath, [script, '--check'], {cwd: root}).status, 0, 'invalid release must fail');
  console.log('Release sync regression checks passed (beta, stable, stale, duplicate, invalid).');
} finally {
  fs.rmSync(root, {recursive: true, force: true});
}
