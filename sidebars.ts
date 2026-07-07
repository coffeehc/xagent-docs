import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: '开始使用',
      items: [
        'getting-started/what-is-xagent',
        'getting-started/quick-start',
        'user-guide/menu-overview',
        'getting-started/first-task',
      ],
    },
    {
      type: 'category',
      label: '使用手册',
      items: [
        'user-guide/agent-session',
        'user-guide/task',
        'user-guide/workspace',
        'user-guide/long-task',
        'user-guide/trigger',
        'user-guide/agent-management',
        'user-guide/skill',
        'user-guide/tool',
        'user-guide/connector',
        'user-guide/approval-policy',
        'user-guide/model-config',
      ],
    },
    {
      type: 'category',
      label: 'FAQ',
      items: ['faq/common'],
    },
  ],
};

export default sidebars;
