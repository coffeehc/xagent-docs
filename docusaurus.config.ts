import {themes as prismThemes} from 'prism-react-renderer';
import path from 'node:path';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const githubUrl = 'https://github.com/coffeehc/xagent-docs';
const siteUrl = 'https://xagent.xiagaogao.com';
const zhDescription =
  'xAgent 是面向任务完成、可私有化部署的多用户 AI Agent 工作门户，支持 Skill、Tool、MCP、连接器、工作区隔离和安全治理。';
const enDescription =
  'xAgent is a task-first, self-hosted multi-user AI agent platform with Skills, Tools, MCP, connectors, workspace isolation, and safety governance.';
const zhKeywords =
  'xAgent, AI Agent 平台, 多用户 AI Agent, 私有化部署 AI Agent, 智能体工作门户, 团队智能体, Skill, Tool, MCP, Connector, 长任务智能体';
const enKeywords =
  'xAgent, multi-user AI agent portal, self-hosted AI agent platform, task-oriented AI agent, AI agent skills, AI tools, MCP, connectors, private AI deployment';
const currentLocale = process.env.DOCUSAURUS_CURRENT_LOCALE ?? 'zh-CN';
const isEnglish = currentLocale === 'en';
const localeSiteUrl = isEnglish ? `${siteUrl}/en` : siteUrl;
const siteDescription = isEnglish ? enDescription : zhDescription;
const siteKeywords = isEnglish ? enKeywords : zhKeywords;

const config: Config = {
  title: 'xAgent',
  tagline: siteDescription,
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: siteUrl,
  baseUrl: '/',
  trailingSlash: true,
  organizationName: 'coffeehc',
  projectName: 'xagent-docs',

  clientModules: ['./src/clientModules/analytics.ts'],

  onBrokenLinks: 'throw',
  markdown: {
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
        blog: false,
        sitemap: {
          ignorePatterns: [
            '/search/**',
            '/en/search/**',
          ],
          lastmod: 'date',
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
        indexBlog: false,
        language: ['zh', 'en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: '/docs',
      },
    ],
  ],

  themeConfig: {
    image: 'img/xagent-og.png',
    metadata: [
      {
        name: 'description',
        content: siteDescription,
      },
      {
        name: 'keywords',
        content: siteKeywords,
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
      {
        name: 'twitter:title',
        content: isEnglish
          ? 'xAgent: Self-Hosted Multi-User AI Agent Platform'
          : 'xAgent：可私有化部署的多用户 AI Agent 工作门户',
      },
      {
        name: 'twitter:description',
        content: siteDescription,
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
          href: `${localeSiteUrl}/docs/getting-started/what-is-xagent/`,
          position: 'left',
          label: '使用手册',
          target: '_self',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: githubUrl,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: '功能导览与菜单入口',
              href: `${localeSiteUrl}/docs/user-guide/menu-overview/`,
              target: '_self',
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
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'GitHub',
              href: githubUrl,
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
