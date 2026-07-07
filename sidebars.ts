import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: '开始使用',
      items: [
        {
          type: 'doc',
          id: 'getting-started/what-is-xagent',
          label: '什么是 xAgent',
        },
        {
          type: 'doc',
          id: 'user-guide/menu-overview',
          label: '功能导览与菜单入口',
        },
        {
          type: 'doc',
          id: 'getting-started/first-task',
          label: '第一个任务',
        },
      ],
    },
    {
      type: 'category',
      label: '使用手册',
      items: [
        {
          type: 'doc',
          id: 'user-guide/agent-session',
          label: 'Agent 会话',
        },
        {
          type: 'doc',
          id: 'user-guide/task',
          label: '任务',
        },
        {
          type: 'doc',
          id: 'user-guide/workspace',
          label: '工作区文件',
        },
        {
          type: 'doc',
          id: 'user-guide/long-task',
          label: '长任务',
        },
        {
          type: 'doc',
          id: 'user-guide/trigger',
          label: '触发器管理',
        },
        {
          type: 'doc',
          id: 'user-guide/agent-management',
          label: '智能体管理',
        },
        {
          type: 'doc',
          id: 'user-guide/skill',
          label: 'Skill 管理',
        },
        {
          type: 'doc',
          id: 'user-guide/tool',
          label: 'Tool 管理',
        },
        {
          type: 'doc',
          id: 'user-guide/connector',
          label: '连接器',
        },
        {
          type: 'doc',
          id: 'user-guide/approval-policy',
          label: '审批策略',
        },
        {
          type: 'doc',
          id: 'user-guide/model-config',
          label: '模型配置',
        },
      ],
    },
    {
      type: 'category',
      label: '附件',
      items: [
        {
          type: 'doc',
          id: 'user-guide/builtin-skills',
          label: '内置 Skill 文件',
        },
      ],
    },
    {
      type: 'category',
      label: '生态合作',
      items: [
        {
          type: 'doc',
          id: 'cooperation/partners',
          label: '合作方向',
        },
      ],
    },
    {
      type: 'category',
      label: 'FAQ',
      items: [
        {
          type: 'doc',
          id: 'faq/common',
          label: '常见问题',
        },
      ],
    },
  ],
};

export default sidebars;
