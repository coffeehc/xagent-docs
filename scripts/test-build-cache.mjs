import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

// Regression for Docusaurus 3.10.2: a client cache hit must not strand the
// server MDX loader's cross-compiler promise. Run from the repository root.
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
function run(script) {
  const result = spawnSync(npm, ['run', script], {stdio: 'inherit'});
  if (result.error) throw result.error;
  assert.equal(result.status, 0, `${script} failed (${result.signal ?? result.status})`);
}
run('build');
const cacheRoot = path.resolve('node_modules/.cache/webpack');
const caches = fs.readdirSync(cacheRoot);
const serverCaches = caches.filter((name) => name.startsWith('server-production-'));
assert(serverCaches.length > 0, 'Expected server caches after the warm-up build');
for (const name of serverCaches) {
  const clientCache = name.replace(/^server-/, 'client-');
  assert(fs.existsSync(path.join(cacheRoot, clientCache)), `Missing warm ${clientCache}`);
  // Delete only reproducible generated server caches, never source or assets.
  fs.rmSync(path.join(cacheRoot, name), {recursive: true});
}
console.log(`Rebuilding with ${serverCaches.length} cold server caches and warm client caches.`);
run('build');
run('validate:site');
console.log('Asymmetric client/server build-cache regression passed.');
