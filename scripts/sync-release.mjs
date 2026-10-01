import fs from 'node:fs';

// Update this one record when a public Server release is verified. Historical
// release notes are not rewritten. The homepage imports the same record.
const release = JSON.parse(fs.readFileSync('src/data/product-release.json', 'utf8'));
if (!/^\d+\.\d+\.\d+\.beta$/.test(release.version) ||
    release.url !== `https://github.com/coffeehc/xagent-releases/releases/tag/v${release.version}`) {
  throw new Error('Invalid canonical public Server release record');
}
const file = 'static/llms.txt';
const original = fs.readFileSync(file, 'utf8');
const pattern = /Current Server release: v\d+\.\d+\.\d+\.beta\./g;
if ([...original.matchAll(pattern)].length !== 1) {
  throw new Error('llms.txt must have exactly one current Server release marker');
}
const expected = original.replace(pattern, `Current Server release: v${release.version}.`);
if (process.argv.includes('--check')) {
  if (original !== expected) {
    throw new Error('llms.txt release is stale. Run npm run sync:release');
  }
} else if (original !== expected) {
  fs.writeFileSync(file, expected);
}
for (const localeRoot of ['docs', 'i18n/en/docusaurus-plugin-content-docs/current']) {
  const changelog = fs.readFileSync(`${localeRoot}/changelog.md`, 'utf8');
  const latest = changelog.match(/^## `v([^`]+)` - (\d{4}-\d{2}-\d{2})/m);
  if (latest?.[1] !== release.version || latest?.[2] !== release.published) {
    throw new Error(`${localeRoot}/changelog.md: latest public release differs from the canonical record`);
  }
  const introduction = fs.readFileSync(`${localeRoot}/getting-started/what-is-xagent.md`, 'utf8');
  if (!introduction.includes(`\`v${release.version}\``)) {
    throw new Error(`${localeRoot}: product introduction is missing the public release`);
  }
}
console.log(`Verified public Server release v${release.version} across llms.txt and both documentation locales.`);
