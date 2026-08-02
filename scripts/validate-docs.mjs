import fs from 'node:fs';
import path from 'node:path';

const chineseRoot = 'docs';
const englishRoot = 'i18n/en/docusaurus-plugin-content-docs/current';
const translatedPostCollections = [
  {
    label: 'blog',
    chineseRoot: 'blog',
    englishRoot: 'i18n/en/docusaurus-plugin-content-blog',
    compareStructure: true,
  },
  {
    label: 'insights',
    chineseRoot: 'insights',
    englishRoot: 'i18n/en/docusaurus-plugin-content-blog-insights',
    compareStructure: false,
  },
];

function listMarkdownFiles(root) {
  if (!fs.existsSync(root)) {
    return [];
  }
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

function getFrontMatter(content) {
  return content.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? '';
}

function getFrontMatterString(content, field) {
  const value = getFrontMatter(content).match(
    new RegExp(`^${field}:\\s*(.+)$`, 'm'),
  )?.[1];
  if (!value) {
    return undefined;
  }
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function validateFrontMatter(filePath, content, errors) {
  ['title', 'description'].forEach((field) => {
    if (!getFrontMatterString(content, field)) {
      errors.push(`${filePath}: missing ${field} front matter`);
    }
  });
  getFrontMatter(content)
    .split('\n')
    .filter((line) => /^[A-Za-z_][\w-]*:\s+/.test(line))
    .forEach((line) => {
      const value = line.slice(line.indexOf(':') + 1).trim();
      if (!value.startsWith('"') && !value.startsWith("'")) {
        if (/\s#/.test(value)) {
          errors.push(
            `${filePath}: quote front matter values containing a # character`,
          );
        }
        if (/:\s/.test(value)) {
          errors.push(
            `${filePath}: quote front matter values containing a colon followed by whitespace`,
          );
        }
      }
    });
  const image = getFrontMatterString(content, 'image');
  if (image?.startsWith('/')) {
    const imagePath = path.join('static', image.slice(1));
    if (!fs.existsSync(imagePath)) {
      errors.push(`${filePath}: missing front matter image ${image}`);
    }
  }
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
    validateFrontMatter(relativePath, chineseContent, errors);
    validateFrontMatter(relativePath, englishContent, errors);
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

const translatedPostCounts = translatedPostCollections.map((collection) => {
  const chineseFiles = listMarkdownFiles(collection.chineseRoot)
    .map((filePath) => path.relative(collection.chineseRoot, filePath))
    .sort();
  const englishFiles = listMarkdownFiles(collection.englishRoot)
    .map((filePath) => path.relative(collection.englishRoot, filePath))
    .sort();

  chineseFiles
    .filter((relativePath) => !englishFiles.includes(relativePath))
    .forEach((relativePath) =>
      errors.push(`${collection.label}/${relativePath}: missing English post`),
    );
  englishFiles
    .filter((relativePath) => !chineseFiles.includes(relativePath))
    .forEach((relativePath) =>
      errors.push(`${collection.label}/${relativePath}: missing Chinese post`),
    );

  chineseFiles
    .filter((relativePath) => englishFiles.includes(relativePath))
    .forEach((relativePath) => {
      const chinesePath = path.join(collection.chineseRoot, relativePath);
      const englishPath = path.join(collection.englishRoot, relativePath);
      const chineseContent = fs.readFileSync(chinesePath, 'utf8');
      const englishContent = fs.readFileSync(englishPath, 'utf8');
      validateFrontMatter(chinesePath, chineseContent, errors);
      validateFrontMatter(englishPath, englishContent, errors);
      if (
        collection.compareStructure &&
        JSON.stringify(getStructure(chineseContent)) !==
          JSON.stringify(getStructure(englishContent))
      ) {
        errors.push(
          `${collection.label}/${relativePath}: Chinese and English structures differ`,
        );
      }
    });

  return {
    label: collection.label,
    chinese: chineseFiles.length,
    english: englishFiles.length,
  };
});

const hardcodedEnglishLinks = [
  englishRoot,
  ...translatedPostCollections.map((collection) => collection.englishRoot),
]
  .flatMap(listMarkdownFiles)
  .filter((filePath) => fs.readFileSync(filePath, 'utf8').includes('/en/docs/'));
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
    translatedPostCounts
      .map(
        (count) =>
          `Validated ${count.chinese} Chinese and ${count.english} English ${count.label} posts.`,
      )
      .join(' '),
  );
}
