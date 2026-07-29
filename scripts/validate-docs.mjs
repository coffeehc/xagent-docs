import fs from 'node:fs';
import path from 'node:path';

const chineseRoot = 'docs';
const englishRoot = 'i18n/en/docusaurus-plugin-content-docs/current';

function listMarkdownFiles(root) {
  return fs
    .readdirSync(root, {withFileTypes: true})
    .flatMap((entry) => {
      const filePath = path.join(root, entry.name);
      return entry.isDirectory() ? listMarkdownFiles(filePath) : [filePath];
    })
    .filter((filePath) => /\.mdx?$/.test(filePath));
}

function stripFrontMatter(content) {
  return content.replace(/^---\n[\s\S]*?\n---\n/, '');
}

function extractCodeBlocks(content) {
  return [
    ...stripFrontMatter(content).matchAll(
      /^```([^\n]*)\n([\s\S]*?)^```\s*$/gm,
    ),
  ].map((match) => ({language: match[1].trim(), body: match[2]}));
}

function getStructure(content) {
  const body = stripFrontMatter(content);
  const lines = body.split('\n');
  return {
    headings: lines.filter((line) => /^#{1,6}\s/.test(line)).length,
    codeBlocks: extractCodeBlocks(content).map((block) => block.language),
    images: lines.filter((line) => /!\[[^\]]*\]\([^)]+\)/.test(line)).length,
    tableRows: lines.filter((line) => /^\|/.test(line)).length,
    internalDocLinks: [...body.matchAll(/\]\(\/docs\/[^)]+\)/g)].length,
  };
}

function getJsonShape(value) {
  if (Array.isArray(value)) {
    return ['array', value.length, ...value.map(getJsonShape)];
  }
  if (value && typeof value === 'object') {
    return [
      'object',
      ...Object.keys(value)
        .sort()
        .map((key) => [key, getJsonShape(value[key])]),
    ];
  }
  return typeof value;
}

function validateJsonBlocks(relativePath, chineseContent, englishContent, errors) {
  const chineseBlocks = extractCodeBlocks(chineseContent);
  const englishBlocks = extractCodeBlocks(englishContent);
  chineseBlocks.forEach((chineseBlock, index) => {
    const englishBlock = englishBlocks[index];
    if (!englishBlock || !/^json\b/.test(chineseBlock.language)) {
      return;
    }
    try {
      const chineseShape = getJsonShape(JSON.parse(chineseBlock.body));
      const englishShape = getJsonShape(JSON.parse(englishBlock.body));
      if (JSON.stringify(chineseShape) !== JSON.stringify(englishShape)) {
        errors.push(`${relativePath}: JSON block ${index + 1} has a different shape`);
      }
    } catch (error) {
      errors.push(`${relativePath}: JSON block ${index + 1} is invalid: ${error.message}`);
    }
  });
}

function validateLlmsLinks(errors) {
  const content = fs.readFileSync('static/llms.txt', 'utf8');
  const links = [
    ...content.matchAll(
      /https:\/\/xagent\.xiagaogao\.com\/(en\/)?docs\/([^?#)]+)\/?/g,
    ),
  ];
  links.forEach((match) => {
    const root = match[1] ? englishRoot : chineseRoot;
    const route = match[2].replace(/\/$/, '');
    const candidates = [
      path.join(root, `${route}.md`),
      path.join(root, `${route}.mdx`),
      path.join(root, route, 'index.md'),
      path.join(root, route, 'index.mdx'),
    ];
    if (!candidates.some((candidate) => fs.existsSync(candidate))) {
      errors.push(`static/llms.txt: missing source for ${match[0]}`);
    }
  });
}

const chineseFiles = listMarkdownFiles(chineseRoot)
  .map((filePath) => path.relative(chineseRoot, filePath))
  .sort();
const englishFiles = listMarkdownFiles(englishRoot)
  .map((filePath) => path.relative(englishRoot, filePath))
  .sort();
const errors = [];

chineseFiles
  .filter((relativePath) => !englishFiles.includes(relativePath))
  .forEach((relativePath) => errors.push(`${relativePath}: missing English page`));
englishFiles
  .filter((relativePath) => !chineseFiles.includes(relativePath))
  .forEach((relativePath) => errors.push(`${relativePath}: missing Chinese page`));

chineseFiles
  .filter((relativePath) => englishFiles.includes(relativePath))
  .forEach((relativePath) => {
    const chineseContent = fs.readFileSync(
      path.join(chineseRoot, relativePath),
      'utf8',
    );
    const englishContent = fs.readFileSync(
      path.join(englishRoot, relativePath),
      'utf8',
    );
    if (!/^updated:\s+\d{4}-\d{2}-\d{2}$/m.test(chineseContent)) {
      errors.push(`${relativePath}: Chinese page is missing an updated date`);
    }
    if (!/^updated:\s+\d{4}-\d{2}-\d{2}$/m.test(englishContent)) {
      errors.push(`${relativePath}: English page is missing an updated date`);
    }
    const chineseStructure = getStructure(chineseContent);
    const englishStructure = getStructure(englishContent);
    if (JSON.stringify(chineseStructure) !== JSON.stringify(englishStructure)) {
      errors.push(`${relativePath}: Chinese and English structures differ`);
    }
    validateJsonBlocks(relativePath, chineseContent, englishContent, errors);
  });

const hardcodedEnglishLinks = listMarkdownFiles(englishRoot).filter((filePath) =>
  fs.readFileSync(filePath, 'utf8').includes('/en/docs/'),
);
hardcodedEnglishLinks.forEach((filePath) =>
  errors.push(`${filePath}: use /docs/ links and let Docusaurus add the locale`),
);
validateLlmsLinks(errors);

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${chineseFiles.length} Chinese pages, ${englishFiles.length} English pages, and llms.txt links.`,
  );
}
