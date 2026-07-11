import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import {untranslatedEnglishRoutes} from './src/seoRoutes';

const githubUrl = 'https://github.com/coffeehc/xagent-docs';
const siteUrl = 'https://xagent.xiagaogao.com';
const zhDescription =
  'xAgent 是面向任务完成的多用户智能体工作门户，支持服务端部署、Skill、Tool、MCP、连接器、工作区隔离和私有化使用。';
const enDescription =
  'xAgent is a task-first multi-user AI agent portal for server-side deployment, Skills, Tools, MCP, connectors, workspace isolation, and private use.';
const zhKeywords =
  'xAgent, 多用户智能体, 智能体工作门户, AI Agent, 私有化部署, 企业智能体基座, Skill, Tool, MCP, Connector, 长任务智能体';
const enKeywords =
  'xAgent, multi-user AI agent portal, self-hosted AI agent platform, task-oriented AI agent, AI agent skills, AI tools, MCP, connectors, private AI deployment';
const currentLocale = process.env.DOCUSAURUS_CURRENT_LOCALE ?? 'zh-CN';
const isEnglish = currentLocale === 'en';
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

  scripts: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-0J5ERRHMSE',
      async: true,
    },
  ],
  headTags: [
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-0J5ERRHMSE');
`,
    },
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement('script');
  hm.src = 'https://hm.baidu.com/hm.js?67e03b6132c917adc66312376aaba4f8';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(hm, s);
})();
`,
    },
  ],

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
            ...untranslatedEnglishRoutes,
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
          ? 'xAgent - Task-first Multi-user AI Agent Portal'
          : 'xAgent - 面向任务完成的多用户智能体工作门户',
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
        src: 'img/xagent-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: '使用手册',
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
              to: '/docs/user-guide/menu-overview',
            },
            {
              label: '什么是 xAgent',
              to: '/docs/getting-started/what-is-xagent',
            },
            {
              label: '生态合作',
              to: '/docs/cooperation/partners',
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
