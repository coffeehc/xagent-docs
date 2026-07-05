import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/what-is-xagent',
        'getting-started/quick-start',
        'getting-started/core-concepts',
        'getting-started/first-agent',
        'getting-started/first-task',
      ],
    },
    {
      type: 'category',
      label: 'User Guide',
      items: [
        'user-guide/agent',
        'user-guide/task',
        'user-guide/session',
        'user-guide/tool',
        'user-guide/memory',
        'user-guide/workspace',
        'user-guide/long-task',
      ],
    },
    {
      type: 'category',
      label: 'Developer Guide',
      items: [
        'developer-guide/skill',
        'developer-guide/connector',
        'developer-guide/runtime-connection',
        'developer-guide/manifest',
        'developer-guide/testing',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/overview',
        'architecture/runtime',
        'architecture/tool-system',
        'architecture/memory-system',
        'architecture/connector-system',
        'architecture/subagent',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/glossary',
        'reference/config',
        'reference/cli',
        'reference/error-codes',
      ],
    },
    {
      type: 'category',
      label: 'FAQ',
      items: ['faq/common', 'faq/codex'],
    },
    'changelog',
  ],
};

export default sidebars;
