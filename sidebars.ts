import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const isEnglish = process.env.DOCUSAURUS_CURRENT_LOCALE === 'en';
const label = (zh: string, en: string) => (isEnglish ? en : zh);

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: label('开始使用', 'Getting Started'),
      items: [
        {
          type: 'doc',
          id: 'getting-started/what-is-xagent',
          label: label('什么是 xAgent', 'What is xAgent'),
        },
        {
          type: 'doc',
          id: 'user-guide/menu-overview',
          label: label('功能导览与菜单入口', 'Feature and Menu Overview'),
        },
        {
          type: 'doc',
          id: 'getting-started/first-task',
          label: label('第一个任务', 'First Task'),
        },
        {
          type: 'doc',
          id: 'getting-started/create-skill',
          label: label('创建 / 更新 Skill', 'Create / Update Skill'),
        },
      ],
    },
    {
      type: 'category',
      label: label('部署安装', 'Deployment'),
      items: [
        {
          type: 'doc',
          id: 'deployment/server-install',
          label: label('服务端安装', 'Server Installation'),
        },
        {
          type: 'doc',
          id: 'deployment/model-requirements',
          label: label('模型说明', 'Model Notes'),
        },
        {
          type: 'doc',
          id: 'deployment/connector-install',
          label: label('Connector 安装', 'Connector Installation'),
        },
      ],
    },
    {
      type: 'category',
      label: label('场景指南', 'Scenario Guides'),
      items: [
        {
          type: 'doc',
          id: 'guides/self-hosted-ai-agent',
          label: label('私有化部署 AI Agent', 'Self-host an AI Agent'),
        },
        {
          type: 'doc',
          id: 'guides/agent-approval-security',
          label: label('AI Agent 审批与安全控制', 'AI Agent Approval and Safety'),
        },
        {
          type: 'doc',
          id: 'guides/long-running-agent-task',
          label: label('AI Agent 如何执行长任务', 'How AI Agents Run Long Tasks'),
        },
        {
          type: 'doc',
          id: 'guides/mcp-vs-connector',
          label: label('MCP 与连接器的区别', 'MCP vs. Connectors'),
        },
      ],
    },
    {
      type: 'category',
      label: label('使用手册', 'User Manual'),
      items: [
        {
          type: 'doc',
          id: 'user-guide/agent-session',
          label: label('Agent 会话', 'Agent Session'),
        },
        {
          type: 'doc',
          id: 'user-guide/shortcut-instructions',
          label: label('快捷指令', 'Shortcut Instructions'),
        },
        {
          type: 'doc',
          id: 'user-guide/task',
          label: label('任务', 'Tasks'),
        },
        {
          type: 'doc',
          id: 'user-guide/workspace',
          label: label('工作区文件', 'Workspace Files'),
        },
        {
          type: 'doc',
          id: 'user-guide/long-task',
          label: label('长任务', 'Long-running Tasks'),
        },
        {
          type: 'doc',
          id: 'user-guide/trigger',
          label: label('触发器管理', 'Triggers'),
        },
        {
          type: 'doc',
          id: 'user-guide/agent-management',
          label: label('智能体管理', 'Agent Management'),
        },
        {
          type: 'doc',
          id: 'user-guide/skill',
          label: label('Skill 管理', 'Skill Management'),
        },
        {
          type: 'doc',
          id: 'user-guide/tool',
          label: label('Tool 管理', 'Tool Management'),
        },
        {
          type: 'doc',
          id: 'user-guide/connector',
          label: label('连接器', 'Connectors'),
        },
        {
          type: 'doc',
          id: 'user-guide/approval-policy',
          label: label('审批策略', 'Approval Policies'),
        },
        {
          type: 'doc',
          id: 'user-guide/model-config',
          label: label('模型配置', 'Model Configuration'),
        },
      ],
    },
    {
      type: 'category',
      label: label('附件', 'Attachments'),
      items: [
        {
          type: 'doc',
          id: 'user-guide/builtin-skills',
          label: label('内置 Skill 文件', 'Built-in Skill Files'),
        },
      ],
    },
    {
      type: 'category',
      label: label('生态合作', 'Ecosystem Partners'),
      items: [
        {
          type: 'doc',
          id: 'cooperation/partners',
          label: label('合作方向', 'Partnership Areas'),
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
          label: label('常见问题', 'Common Questions'),
        },
      ],
    },
  ],
};

export default sidebars;
