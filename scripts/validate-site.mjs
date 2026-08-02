import fs from 'node:fs';
import path from 'node:path';
import {load} from 'cheerio';

const buildRoot = path.resolve('build');
const siteOrigin = 'https://xagent.xiagaogao.com';
const googleAnalyticsTrackingID = 'G-0J5ERRHMSE';
const googleAnalyticsScript =
  `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsTrackingID}`;
const errors = [];

function listFiles(root, predicate) {
  return fs
    .readdirSync(root, {withFileTypes: true})
    .flatMap((entry) => {
      const filePath = path.join(root, entry.name);
      return entry.isDirectory()
        ? listFiles(filePath, predicate)
        : predicate(filePath)
          ? [filePath]
          : [];
    });
}

function routeForFile(filePath) {
  const relativePath = path
    .relative(buildRoot, filePath)
    .split(path.sep)
    .join('/');
  if (relativePath === 'index.html') {
    return '/';
  }
  if (relativePath.endsWith('/index.html')) {
    return `/${relativePath.slice(0, -'index.html'.length)}`;
  }
  return `/${relativePath}`;
}

function normalizeRoute(route) {
  if (route === '/') {
    return route;
  }
  return route.endsWith('/') ? route : `${route}/`;
}

function localRoute(url, baseRoute = '/') {
  try {
    const parsed = new URL(url, `${siteOrigin}${baseRoute}`);
    return parsed.origin === siteOrigin
      ? normalizeRoute(decodeURIComponent(parsed.pathname))
      : undefined;
  } catch {
    return undefined;
  }
}

function addGroupedValue(groups, key, route) {
  const routes = groups.get(key) ?? [];
  groups.set(key, [...routes, route]);
}

if (!fs.existsSync(buildRoot)) {
  console.error('build/: missing build output; run npm run build first.');
  process.exit(1);
}

const htmlFiles = listFiles(
  buildRoot,
  (filePath) => path.basename(filePath) === 'index.html' || filePath.endsWith('404.html'),
).sort();
const pages = new Map();

htmlFiles.forEach((filePath) => {
  const route = routeForFile(filePath);
  const html = fs.readFileSync(filePath, 'utf8');
  const $ = load(html);
  const robots = ($('meta[name="robots"]').attr('content') ?? '')
    .toLowerCase()
    .split(',')
    .map((value) => value.trim());
  const noindex = robots.includes('noindex');
  const main = $('main').first();
  const visible = (main.length > 0 ? main : $('body')).clone();
  visible.find('script, style, code, pre, nav, footer, aside').remove();

  pages.set(route, {
    $,
    canonical: $('link[rel="canonical"]').attr('href') ?? '',
    description: $('meta[name="description"]').attr('content') ?? '',
    filePath,
    h1: $('h1')
      .map((_, element) => $(element).text().replace(/\s+/g, ' ').trim())
      .get(),
    ids: new Set(
      $('[id]')
        .map((_, element) => $(element).attr('id'))
        .get(),
    ),
    lang: $('html').attr('lang') ?? '',
    noindex,
    route,
    text: visible.text().replace(/\s+/g, ' ').trim(),
    title: $('title').text().replace(/\s+/g, ' ').trim(),
  });
});

const sitemapEntries = ['build/sitemap.xml', 'build/en/sitemap.xml'].flatMap(
  (sitemapPath) => {
    const xml = fs.readFileSync(path.resolve(sitemapPath), 'utf8');
    const $ = load(xml, {xmlMode: true});
    return $('url')
      .map((_, element) => ({
        lastmod: $(element).find('lastmod').text(),
        loc: $(element).find('loc').text(),
      }))
      .get();
  },
);
const sitemapRoutes = sitemapEntries.map(({loc}) => localRoute(loc));
const sitemapSet = new Set(sitemapRoutes);

if (sitemapRoutes.some((route) => !route)) {
  errors.push('sitemap: contains a URL outside the configured site origin');
}
if (sitemapSet.size !== sitemapRoutes.length) {
  errors.push('sitemap: contains duplicate URLs');
}

const titleGroups = new Map();
const descriptionGroups = new Map();

pages.forEach((page) => {
  const isNotFound = page.route.endsWith('404.html');
  const isIndexable = !page.noindex && !isNotFound;
  const locale = page.route.startsWith('/en/') ? 'en' : 'zh-CN';

  if (isNotFound && !page.noindex) {
    errors.push(`${page.route}: the generated 404 page must be noindex`);
  }
  if (!isNotFound) {
    const expectedCanonical = `${siteOrigin}${page.route}`;
    if (page.canonical !== expectedCanonical) {
      errors.push(
        `${page.route}: canonical must be ${expectedCanonical}, got ${page.canonical || 'missing'}`,
      );
    }
  }
  if (isIndexable && !sitemapSet.has(page.route)) {
    errors.push(`${page.route}: indexable page is missing from sitemap`);
  }
  if (page.noindex && sitemapSet.has(page.route)) {
    errors.push(`${page.route}: noindex page must not be in sitemap`);
  }
  if (isIndexable && page.h1.length !== 1) {
    errors.push(
      `${page.route}: expected one visible H1, found ${page.h1.length}`,
    );
  }
  if (isIndexable && !page.title) {
    errors.push(`${page.route}: missing title`);
  }
  if (isIndexable && !page.description) {
    errors.push(`${page.route}: missing description`);
  }
  if (page.$('meta[name="keywords"]').length > 0) {
    errors.push(`${page.route}: meta keywords are not allowed`);
  }
  if (page.$(`script[src="${googleAnalyticsScript}"]`).length !== 1) {
    errors.push(`${page.route}: missing Google Analytics loader`);
  }
  const hasGoogleAnalyticsConfig = page
    .$(`script:not([src])`)
    .toArray()
    .some((element) =>
      (page.$(element).html() ?? '').includes(googleAnalyticsTrackingID),
    );
  if (!hasGoogleAnalyticsConfig) {
    errors.push(`${page.route}: missing Google Analytics configuration`);
  }
  if (locale === 'en' && !page.lang.toLowerCase().startsWith('en')) {
    errors.push(`${page.route}: expected an English html lang value`);
  }
  if (locale === 'zh-CN' && !page.lang.toLowerCase().startsWith('zh')) {
    errors.push(`${page.route}: expected a Chinese html lang value`);
  }
  if (isIndexable) {
    addGroupedValue(titleGroups, `${locale}|${page.title}`, page.route);
    addGroupedValue(
      descriptionGroups,
      `${locale}|${page.description}`,
      page.route,
    );
  }

  if (locale === 'en' && !isNotFound) {
    const hanCount = (page.text.match(/[\p{Script=Han}]/gu) ?? []).length;
    const latinCount = (page.text.match(/[A-Za-z]/g) ?? []).length;
    if (hanCount > Math.max(20, latinCount * 0.1)) {
      errors.push(
        `${page.route}: English page contains too much Chinese text (${hanCount} Han characters)`,
      );
    }
  }

  page.$('img').each((_, element) => {
    const image = page.$(element);
    const source = image.attr('src') ?? '';
    if (!image.is('[alt]') || image.attr('alt') === '') {
      errors.push(`${page.route}: informative image has an empty alt (${source})`);
    }
    const imageRoute = localRoute(source, page.route);
    if (imageRoute) {
      const imagePath = path.join(buildRoot, imageRoute.slice(1, -1));
      if (!fs.existsSync(imagePath)) {
        errors.push(`${page.route}: missing image ${source}`);
      }
    }
  });

  ['meta[property="og:image"]', 'meta[name="twitter:image"]'].forEach(
    (selector) => {
      const imageUrl = page.$(selector).attr('content');
      const imageRoute = imageUrl ? localRoute(imageUrl, page.route) : undefined;
      if (imageRoute) {
        const imagePath = path.join(buildRoot, imageRoute.slice(1, -1));
        if (!fs.existsSync(imagePath)) {
          errors.push(`${page.route}: missing metadata image ${imageUrl}`);
        }
      }
    },
  );

  const alternates = page.$('link[rel="alternate"][hreflang]');
  if (isIndexable) {
    const alternateLanguages = new Set(
      alternates
        .map((_, element) => page.$(element).attr('hreflang'))
        .get(),
    );
    ['zh-CN', 'en-US', 'x-default'].forEach((language) => {
      if (!alternateLanguages.has(language)) {
        errors.push(`${page.route}: missing ${language} hreflang`);
      }
    });
  }
  if (!isNotFound) alternates.each((_, element) => {
    const href = page.$(element).attr('href') ?? '';
    const targetRoute = localRoute(href, page.route);
    const targetPage = targetRoute ? pages.get(targetRoute) : undefined;
    if (!targetPage) {
      errors.push(`${page.route}: hreflang target does not exist (${href})`);
      return;
    }
    const reciprocal = targetPage
      .$(`link[rel="alternate"][hreflang]`)
      .toArray()
      .some((target) => {
        const targetHref = targetPage.$(target).attr('href') ?? '';
        return localRoute(targetHref, targetPage.route) === page.route;
      });
    if (!reciprocal) {
      errors.push(`${page.route}: hreflang target is not reciprocal (${href})`);
    }
  });

  page.$('script[type="application/ld+json"]').each((_, element) => {
    let structuredData;
    try {
      structuredData = JSON.parse(page.$(element).html() ?? '');
    } catch (error) {
      errors.push(`${page.route}: invalid JSON-LD (${error.message})`);
      return;
    }
    const entries = Array.isArray(structuredData)
      ? structuredData
      : structuredData['@graph'] ?? [structuredData];
    entries.forEach((entry) => {
      if (
        entry.description &&
        page.description &&
        entry.description !== page.description
      ) {
        errors.push(`${page.route}: JSON-LD description differs from metadata`);
      }
      if (entry['@type'] === 'BlogPosting') {
        ['author', 'datePublished', 'headline', 'image', 'mainEntityOfPage'].forEach(
          (property) => {
            if (!entry[property]) {
              errors.push(
                `${page.route}: BlogPosting is missing ${property}`,
              );
            }
          },
        );
      }
      if (entry['@type'] === 'TechArticle') {
        ['dateModified', 'headline', 'mainEntityOfPage'].forEach((property) => {
          if (!entry[property]) {
            errors.push(`${page.route}: TechArticle is missing ${property}`);
          }
        });
      }
    });
  });

  if (!isNotFound) {
    page.$('a[href]').each((_, element) => {
      const link = page.$(element);
      const href = link.attr('href') ?? '';
      if (!href || href === '#') {
        return;
      }
      let parsed;
      try {
        parsed = new URL(href, `${siteOrigin}${page.route}`);
      } catch {
        errors.push(`${page.route}: invalid link ${href}`);
        return;
      }
      if (parsed.origin !== siteOrigin) {
        return;
      }
      const targetRoute = normalizeRoute(decodeURIComponent(parsed.pathname));
      const targetPage = pages.get(targetRoute);
      const targetPath = path.join(buildRoot, decodeURIComponent(parsed.pathname));
      if (!targetPage && !fs.existsSync(targetPath)) {
        errors.push(`${page.route}: broken internal link ${href}`);
        return;
      }
      if (parsed.hash && targetPage) {
        const fragment = decodeURIComponent(parsed.hash.slice(1));
        if (fragment && !targetPage.ids.has(fragment)) {
          errors.push(`${page.route}: broken anchor ${href}`);
        }
      }
    });
  }
});

[...titleGroups.entries(), ...descriptionGroups.entries()].forEach(
  ([key, routes]) => {
    if (routes.length > 1) {
      errors.push(`duplicate metadata "${key}": ${routes.join(', ')}`);
    }
  },
);

sitemapSet.forEach((route) => {
  if (route && !pages.has(route)) {
    errors.push(`sitemap: missing generated page for ${route}`);
  }
});

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  const noindexCount = [...pages.values()].filter((page) => page.noindex).length;
  console.log(
    `Validated ${pages.size} HTML pages, ${sitemapSet.size} sitemap URLs, and ${noindexCount} noindex pages.`,
  );
}
