import {themes as prismThemes} from 'prism-react-renderer';
import path from 'node:path';
import fs from 'node:fs';
import {load} from 'cheerio';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const siteUrl = 'https://xagent.xiagaogao.com';
const zhDescription =
  'xAgent 是可私有化部署的多用户 AI Agent 工作门户，能够理解任务变化，按需准备 Skill、Tool 与长期记忆，并通过项目化会话、连接器、隔离工作区和安全治理持续完成任务。';
const enDescription =
  'xAgent is a self-hosted multi-user AI agent platform that adapts Skills, Tools, and memory to each task across projects, connectors, and governed workspaces.';
const currentLocale = process.env.DOCUSAURUS_CURRENT_LOCALE ?? 'zh-CN';
const isEnglish = currentLocale === 'en';
const localeSiteUrl = isEnglish ? `${siteUrl}/en` : siteUrl;
const siteDescription = isEnglish ? enDescription : zhDescription;

const config: Config = {
  title: 'xAgent',
  tagline: siteDescription,
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
    experimental_vcs: 'disabled',
    faster: {
      rspackBundler: false,
      rspackPersistentCache: false,
    },
  },

  url: siteUrl,
  baseUrl: '/',
  trailingSlash: true,
  organizationName: 'coffeehc',
  projectName: 'xagent-docs',

  onBrokenLinks: 'throw',
  markdown: {
    parseFrontMatter: async (params) => {
      const result = await params.defaultParseFrontMatter(params);
      const updated = result.frontMatter.updated;
      const updatedDate =
        updated instanceof Date
          ? updated.toISOString().slice(0, 10)
          : typeof updated === 'string'
            ? updated
            : undefined;
      if (!updatedDate || result.frontMatter.last_update) {
        return result;
      }
      return {
        ...result,
        // Keep timestamps deterministic when the deployment uses a shallow clone.
        frontMatter: {
          ...result.frontMatter,
          last_update: {date: updatedDate},
        },
      };
    },
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN', 'en'],
    localeConfigs: {
      'zh-CN': {
        label: '中文',
        htmlLang: 'zh-CN',
      },
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          showLastUpdateTime: true,
        },
        blog: {
          blogTitle: 'Blog',
          blogDescription: isEnglish
            ? 'Product updates, practical lessons, and release notes from xAgent.'
            : 'xAgent 的产品进展、实践记录与版本说明。',
          showReadingTime: true,
          showLastUpdateTime: true,
        },
        gtag: {
          trackingID: 'G-P1WT74PKR0',
        },
        sitemap: {
          ignorePatterns: [
            '/search/**',
            '/en/search/**',
            '/blog/archive/**',
            '/en/blog/archive/**',
            '/blog/authors/**',
            '/en/blog/authors/**',
            '/blog/tags/**',
            '/en/blog/tags/**',
          ],
          lastmod: 'date',
          async createSitemapItems(params) {
            const items = await params.defaultCreateSitemapItems(params);
            return items.map((item) => {
              if (item.lastmod) return item;
              // Read only dates emitted from explicit content metadata. Never
              // use build time or filesystem mtime to imply fresh content.
              const route = new URL(item.url).pathname;
              const htmlPath = path.join(process.cwd(), 'build', route, 'index.html');
              if (!fs.existsSync(htmlPath)) return item;
              const $ = load(fs.readFileSync(htmlPath, 'utf8'));
              for (const element of $('script[type="application/ld+json"]').toArray()) {
                const data = JSON.parse($(element).html() ?? '');
                const entries = data['@graph'] ?? (Array.isArray(data) ? data : [data]);
                const page = entries.find((entry: Record<string, unknown>) =>
                  ['WebPage', 'Blog'].includes(String(entry['@type'])) &&
                  [entry.url, entry.mainEntityOfPage].some((url) =>
                    typeof url === 'string' && url.replace(/\/$/, '') === item.url.replace(/\/$/, ''),
                  ),
                );
                if (page?.dateModified) return {...item, lastmod: page.dateModified};
              }
              return item;
            });
          },
          changefreq: null,
          priority: null,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'insights',
        path: './insights',
        routeBasePath: 'insights',
        blogTitle: isEnglish ? 'Insights' : '行业观察',
        blogDescription: isEnglish
          ? 'Practical perspectives on AI agents, deployment, governance, and the evolving ecosystem.'
          : '围绕 AI Agent、部署、治理与生态变化的实践观察。',
        showReadingTime: true,
        showLastUpdateTime: true,
      },
    ],
    function noPrefetchLinks() {
      return {
        name: 'no-prefetch-links',
        configureWebpack() {
          return {
            resolve: {
              alias: {
                '@docusaurus/Link': path.resolve(
                  process.cwd(),
                  'src/components/NoPrefetchLink.tsx',
                ),
              },
            },
          };
        },
      };
    },
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        language: ['zh', 'en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: '/docs',
      },
    ],
  ],

  themeConfig: {
    image: isEnglish
      ? 'img/share/en/xagent-overview.png'
      : 'img/share/zh/xagent-overview.png',
    metadata: [
      {
        name: 'description',
        content: siteDescription,
      },
      {
        property: 'og:site_name',
        content: 'xAgent',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'xAgent',
      logo: {
        alt: 'xAgent Logo',
        src: 'img/xagent-navbar-logo.png',
        width: 32,
        height: 32,
      },
      items: [
  {
    "to": "/#demo-title",
    "activeBaseRegex": "^/(en/)?$",
    "position": "left",
    "label": "产品体验",
    "target": "_self"
  },
  {
    "to": "/docs/manual/overview/",
    "activeBasePath": "/docs/",
    "position": "left",
    "label": "使用手册"
  },
  {
    "label": "更多资源",
    "position": "left",
    "items": [
      {
        "label": "产品介绍",
        "href": `${localeSiteUrl}/docs/getting-started/what-is-xagent/`,
        "target": "_self"
      },
      {
        "label": "更新日志",
        "href": `${localeSiteUrl}/docs/changelog/`,
        "target": "_self"
      },
      {
        "label": "Blog",
        "href": `${localeSiteUrl}/blog/`,
        "target": "_self"
      },
      {
        "label": "行业观察",
        "href": `${localeSiteUrl}/insights/`,
        "target": "_self"
      },
      {
        "label": "社区讨论",
        "href": `${localeSiteUrl}/docs/community/discussions/`,
        "target": "_self"
      }
    ]
  },
  {
    "to": "/docs/getting-started/install/",
    "position": "right",
    "label": "开始使用"
  },
  {
    "type": "localeDropdown",
    "position": "right",
    "dropdownItemsBefore": [],
    "dropdownItemsAfter": []
  },
  {
    "href": "https://github.com/coffeehc/xagent-releases",
    "label": "GitHub",
    "position": "right"
  }
],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: '使用手册',
              to: '/docs/manual/overview/',
            },
            {
              label: '开始安装',
              to: '/docs/getting-started/install/',
            },
            {
              label: '什么是 xAgent',
              href: `${localeSiteUrl}/docs/getting-started/what-is-xagent/`,
              target: '_self',
            },
            {
              label: '生态合作',
              href: `${localeSiteUrl}/docs/cooperation/partners/`,
              target: '_self',
            },
            {
              label: 'Blog',
              href: `${localeSiteUrl}/blog/`,
              target: '_self',
            },
            {
              label: '行业观察',
              href: `${localeSiteUrl}/insights/`,
              target: '_self',
            },
          ],
        },
        {
          title: '交流',
          items: [
            {
              label: 'Reddit · r/xAgent',
              href: 'https://www.reddit.com/r/xAgent/',
            },
            {
              label: '社区讨论',
              href: `${localeSiteUrl}/docs/community/discussions/`,
              target: '_self',
            },
            {
              label: '我有一个想法',
              to: '/docs/cooperation/idea/',
            },
            {
              label: '联系我们',
              href: 'mailto:xagent@xiagaogao.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} xAgent contributors.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
