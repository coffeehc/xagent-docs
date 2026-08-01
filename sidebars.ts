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
          id: 'getting-started/install',
          label: label('开始安装', 'Start Installation'),
        },
        {
          type: 'doc',
          id: 'getting-started/what-is-connector',
          label: label('什么是连接器', 'What Is a Connector'),
        },
        {
          type: 'doc',
          id: 'deployment/model-requirements',
          label: label('模型说明', 'Model Notes'),
        },
        {
          type: 'doc',
          id: 'getting-started/first-task',
          label: label('第一个任务', 'First Task'),
        },
        {
          type: 'doc',
          id: 'guides/shortcut-instruction-protocol',
          label: label('快捷指令协议', 'Shortcut Instruction Protocol'),
        },
      ],
    },
    {
      type: 'category',
      label: label('使用手册', 'User Manual'),
      items: [
        {
          type: 'doc',
          id: 'manual/overview',
          label: label('手册总览', 'Manual Overview'),
        },
        {
          type: 'doc',
          id: 'manual/capabilities',
          label: label('支持的智能体功能', 'Agent Capabilities'),
        },
        {
          type: 'doc',
          id: 'getting-started/create-skill',
          label: label('创建 / 更新 Skill', 'Create / Update Skill'),
        },
        {
          type: 'doc',
          id: 'manual/workspace',
          label: label('工作台', 'Workspace'),
        },
        {
          type: 'doc',
          id: 'manual/operations',
          label: label('运行治理', 'Operations'),
        },
        {
          type: 'doc',
          id: 'manual/personal-settings',
          label: label('个人设置', 'Personal Settings'),
        },
        {
          type: 'doc',
          id: 'manual/user-management',
          label: label('用户管理', 'User Management'),
        },
        {
          type: 'doc',
          id: 'manual/analytics',
          label: label('统计分析', 'Analytics'),
        },
        {
          type: 'doc',
          id: 'manual/agent-governance',
          label: label('Agent 治理', 'Agent Governance'),
        },
        {
          type: 'doc',
          id: 'manual/system-configuration',
          label: label('系统配置', 'System Configuration'),
        },
      ],
    },
    {
      type: 'category',
      label: label('功能详解', 'Feature Guides'),
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
      label: label('场景指南', 'Scenario Guides'),
      items: [
        {
          type: 'doc',
          id: 'guides/self-hosted-ai-agent',
          label: label('私有化部署 AI Agent', 'Self-host an AI Agent'),
        },
        {
          type: 'doc',
          id: 'guides/multi-user-workspace-isolation',
          label: label('虚拟文件系统与工作区隔离', 'Virtual Filesystem Isolation'),
        },
        {
          type: 'doc',
          id: 'guides/ai-agent-dynamic-tool-discovery',
          label: label('AI Agent 动态发现能力', 'Dynamic Capability Discovery'),
        },
        {
          type: 'doc',
          id: 'guides/ai-agent-runtime-hot-switching',
          label: label('任务执行中的动态切换', 'Runtime Model and Skill Switching'),
        },
        {
          type: 'doc',
          id: 'guides/multi-agent-session-event-collaboration',
          label: label('多 Agent 会话事件协作', 'Multi-Agent Session Events'),
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
      ],
    },
    {
      type: 'category',
      label: label('技术参考', 'Technical Reference'),
      items: [
        {
          type: 'doc',
          id: 'architecture/runtime',
          label: label('Runtime 与 ProcessSandbox', 'Runtime and ProcessSandbox'),
        },
        {
          type: 'doc',
          id: 'user-guide/memory',
          label: label('长期记忆', 'Long-Term Memory'),
        },
        {
          type: 'doc',
          id: 'reference/glossary',
          label: label('术语表', 'Glossary'),
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
        {
          type: 'doc',
          id: 'attachments/xagent_connection_architecture',
          label: label('xAgent Connector 架构', 'xAgent Connector Architecture'),
        },
        {
          type: 'doc',
          id: 'attachments/xagent_connector_protocol',
          label: label('xAgent Connector 协议', 'xAgent Connector Protocol'),
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
        {
          type: 'doc',
          id: 'cooperation/idea',
          label: label('我有一个想法', 'Share an Idea'),
        },
      ],
    },
    {
      type: 'category',
      label: label('社区讨论', 'Community'),
      items: [
        {
          type: 'doc',
          id: 'community/discussions',
          label: label('参与讨论', 'Join the Discussion'),
        },
      ],
    },
    {
      type: 'doc',
      id: 'changelog',
      label: label('更新日志', 'Changelog'),
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
