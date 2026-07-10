import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const githubUrl = 'https://github.com/coffeehc/xagent-docs';
const currentLocale = process.env.DOCUSAURUS_CURRENT_LOCALE ?? 'zh-CN';
const isEnglish = currentLocale === 'en';

const config: Config = {
  title: isEnglish ? 'xAgent User Manual' : 'xAgent 使用手册',
  tagline: isEnglish
    ? 'A multi-user AI work portal for teams and companies.'
    : '面向团队与公司的多用户智能工作门户。',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://xagent-docs.pages.dev',
  baseUrl: '/',
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
        },
        blog: false,
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
