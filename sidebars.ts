import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";
const isEnglish = process.env.DOCUSAURUS_CURRENT_LOCALE === "en";
const label = (zh: string, en: string) => (isEnglish ? en : zh);
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: "category",
      label: label("了解产品", "Understand xAgent"),
      items: [
        {
          type: "doc",
          id: "manual/overview",
          label: label("文档导航", "Documentation Guide"),
        },
        {
          type: "doc",
          id: "getting-started/what-is-xagent",
          label: label("什么是 xAgent", "What Is xAgent"),
        },
        {
          type: "doc",
          id: "manual/capabilities",
          label: label("能力与文件格式", "Capabilities and File Formats"),
        },
        {
          type: "doc",
          id: "user-guide/menu-overview",
          label: label("功能导览与菜单入口", "Feature and Menu Overview"),
        },
      ],
    },
    {
      type: "category",
      label: label("安装与第一次使用", "Install and Get Started"),
      items: [
        {
          type: "doc",
          id: "getting-started/install",
          label: label("开始安装 xAgent", "Start Installing xAgent"),
        },
        {
          type: "doc",
          id: "getting-started/install-client-and-browser-extension",
          label: label(
            "安装客户端与浏览器插件",
            "Install the Desktop Client and Browser Extension",
          ),
        },
        {
          type: "doc",
          id: "getting-started/first-task",
          label: label(
            "如何使用 xAgent 完成第一个 AI Agent 任务",
            "How to Complete Your First AI Agent Task with xAgent",
          ),
        },
      ],
    },
    {
      type: "category",
      label: label("日常工作", "Everyday Work"),
      items: [
        {
          type: "doc",
          id: "manual/workspace",
          label: label("工作台页面", "Workspace Pages"),
        },
        {
          type: "doc",
          id: "user-guide/agent-session",
          label: label(
            "xAgent Agent 会话：提交任务、文件与审批",
            "xAgent Agent Sessions: Submit Tasks, Files, and Approvals",
          ),
        },
        {
          type: "doc",
          id: "user-guide/task",
          label: label(
            "xAgent 任务：目标、材料与验收标准",
            "xAgent Tasks: Goals, Materials, and Acceptance Criteria",
          ),
        },
        {
          type: "doc",
          id: "user-guide/workspace",
          label: label(
            "xAgent 工作区文件：材料、结果与下载产物",
            "xAgent Workspace Files: Materials, Results, and Downloads",
          ),
        },
        {
          type: "doc",
          id: "user-guide/file-sharing",
          label: label("文件外链分享", "Share Files with Expiring Links"),
        },
        {
          type: "doc",
          id: "manual/personal-settings",
          label: label("个人设置页面", "Personal Settings Pages"),
        },
        {
          type: "doc",
          id: "user-guide/memory",
          label: label(
            "xAgent 长期记忆：跨会话保留偏好与决策",
            "xAgent Long-Term Memory for Preferences and Decisions",
          ),
        },
        {
          type: "doc",
          id: "user-guide/shortcut-instructions",
          label: label("快捷指令", "Shortcut Instructions"),
        },
      ],
    },
    {
      type: "category",
      label: label("进阶能力", "Advanced Workflows"),
      items: [
        {
          type: "doc",
          id: "user-guide/long-task",
          label: label(
            "xAgent 长任务：持续执行与阶段性交付",
            "xAgent Long-running Tasks: Continuous Execution and Staged Delivery",
          ),
        },
        {
          type: "doc",
          id: "guides/long-running-agent-task",
          label: label("长任务执行原理", "How Long Tasks Run"),
        },
        {
          type: "doc",
          id: "guides/multi-agent-session-event-collaboration",
          label: label("多会话协作", "Multi-session Collaboration"),
        },
        {
          type: "doc",
          id: "user-guide/trigger",
          label: label(
            "xAgent 触发器：定时任务与事件自动执行",
            "xAgent Triggers: Scheduled and Event-Driven Tasks",
          ),
        },
        {
          type: "category",
          label: label("复用智能体与技能", "Reuse Agents and Skills"),
          items: [
            {
              type: "doc",
              id: "user-guide/agent-management",
              label: label(
                "xAgent AI 智能体搭建与管理：主 Agent 与子 Agent",
                "xAgent AI Agent Setup and Management: Main Agents and Sub-Agents",
              ),
            },
            {
              type: "doc",
              id: "user-guide/skill",
              label: label(
                "xAgent Skill 管理：创建、测试、发布与更新",
                "xAgent Skill Management: Create, Test, Publish, and Update",
              ),
            },
            {
              type: "doc",
              id: "getting-started/create-skill",
              label: label("创建 / 更新 Skill", "Create / Update a Skill"),
            },
            {
              type: "doc",
              id: "user-guide/tool",
              label: label(
                "xAgent Tool 管理：个人、公共、MCP 与 AgentPlugin 工具",
                "xAgent Tool Management: Personal, Public, MCP, and AgentPlugin Tools",
              ),
            },
          ],
        },
        {
          type: "category",
          label: label("接入外部能力", "Connect External Capabilities"),
          items: [
            {
              type: "doc",
              id: "getting-started/what-is-connector",
              label: label("什么是 AgentPlugin", "What Is an AgentPlugin?"),
            },
            {
              type: "doc",
              id: "user-guide/connector",
              label: label(
                "AgentPlugin：IM、数据库、SSH 与浏览器",
                "AgentPlugins for IM, Databases, SSH, and Browsers",
              ),
            },
            {
              type: "doc",
              id: "user-guide/database-connector",
              label: label(
                "Database AgentPlugin 配置：连接 MySQL 与 PostgreSQL",
                "Database AgentPlugin Configuration: Connect MySQL and PostgreSQL",
              ),
            },
            {
              type: "doc",
              id: "user-guide/ssh-connector",
              label: label(
                "SSH AgentPlugin 配置：私钥、目标与访问身份",
                "SSH AgentPlugin Configuration: Private Keys, Targets, and Access Identities",
              ),
            },
            {
              type: "doc",
              id: "user-guide/a2a",
              label: label(
                "A2A Client 与远端 Agent",
                "A2A Client and Remote Agents",
              ),
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: label("部署与治理", "Deployment and Governance"),
      items: [
        {
          type: "doc",
          id: "guides/self-hosted-ai-agent",
          label: label(
            "AI Agent 私有化部署：在自己的服务器搭建智能体平台",
            "Self-Hosted AI Agent Platform: Deploy xAgent on Your Own Server",
          ),
        },
        {
          type: "doc",
          id: "deployment/model-requirements",
          label: label("选择与验证模型", "Choose and Validate a Model"),
        },
        {
          type: "doc",
          id: "user-guide/model-config",
          label: label(
            "xAgent 模型配置：Provider、工具调用与任务路由",
            "xAgent Model Configuration: Providers, Tool Calling, and Task Routing",
          ),
        },
        {
          type: "doc",
          id: "guides/agent-approval-security",
          label: label("审批与安全边界", "Approval and Safety Boundaries"),
        },
        {
          type: "doc",
          id: "user-guide/approval-policy",
          label: label(
            "xAgent 审批策略：控制敏感工具动作",
            "xAgent Approval Policies: Controlling Sensitive Tool Actions",
          ),
        },
        {
          type: "doc",
          id: "manual/operations",
          label: label("运行治理页面", "Operations Pages"),
        },
        {
          type: "doc",
          id: "manual/user-management",
          label: label("用户管理页面", "User Management Pages"),
        },
        {
          type: "doc",
          id: "manual/analytics",
          label: label("统计分析页面", "Analytics Pages"),
        },
        {
          type: "doc",
          id: "manual/agent-governance",
          label: label("Agent 治理页面", "Agent Governance Pages"),
        },
        {
          type: "doc",
          id: "manual/system-configuration",
          label: label("系统配置页面", "System Configuration Pages"),
        },
      ],
    },
    {
      type: "category",
      label: label("排错与技术参考", "Troubleshooting and Reference"),
      items: [
        {
          type: "doc",
          id: "faq/common",
          label: label("常见问题", "Common Questions"),
        },
        {
          type: "doc",
          id: "reference/glossary",
          label: label("术语表", "Glossary"),
        },
        {
          type: "doc",
          id: "architecture/runtime",
          label: label(
            "Runtime 与 ProcessSandbox",
            "Runtime and ProcessSandbox",
          ),
        },
        {
          type: "doc",
          id: "guides/multi-user-workspace-isolation",
          label: label("工作区与进程隔离", "Workspace and Process Isolation"),
        },
        {
          type: "doc",
          id: "guides/ai-agent-dynamic-tool-discovery",
          label: label("动态能力发现", "Dynamic Capability Discovery"),
        },
        {
          type: "doc",
          id: "guides/ai-agent-runtime-hot-switching",
          label: label(
            "运行中切换模型与技能",
            "Runtime Model and Skill Switching",
          ),
        },
        {
          type: "doc",
          id: "guides/shortcut-instruction-protocol",
          label: label("快捷指令协议参考", "Shortcut Protocol Reference"),
        },
        {
          type: "doc",
          id: "user-guide/builtin-skills",
          label: label("内置 Skill 文件", "xAgent Built-in Skill Files"),
        },
        {
          type: "category",
          label: label("历史 Connector 协议", "Legacy Connector Protocols"),
          items: [
            {
              type: "doc",
              id: "attachments/xagent_connection_architecture",
              label: label(
                "xAgent Connector Architecture",
                "xAgent Connector Architecture",
              ),
            },
            {
              type: "doc",
              id: "attachments/xagent_connector_protocol",
              label: label(
                "xAgent Connector Common Protocol",
                "xAgent Connector Common Protocol",
              ),
            },
            {
              type: "doc",
              id: "attachments/profiles/xagent_device_v1",
              label: label(
                "xAgent Device Profile v1",
                "xAgent Device Profile v1",
              ),
            },
            {
              type: "doc",
              id: "attachments/profiles/xagent_im_v1",
              label: label("xAgent IM Profile v1", "xAgent IM Profile v1"),
            },
            {
              type: "doc",
              id: "attachments/profiles/xagent_im_v2",
              label: label("xAgent IM Profile v2", "xAgent IM Profile v2"),
            },
            {
              type: "doc",
              id: "attachments/schemas/xagent.connection.v2.schema",
              label: label(
                "Connection Descriptor JSON Schema",
                "Connection Descriptor JSON Schema",
              ),
            },
            {
              type: "doc",
              id: "attachments/schemas/xagent.connector.packet.v1.schema",
              label: label(
                "Connector Packet JSON Schema",
                "Connector Packet JSON Schema",
              ),
            },
            {
              type: "doc",
              id: "attachments/schemas/xagent.connector.v1.schema",
              label: label(
                "Connector Card JSON Schema",
                "Connector Card JSON Schema",
              ),
            },
          ],
        },
        { type: "doc", id: "changelog", label: label("更新日志", "Changelog") },
        {
          type: "category",
          label: label("社区与合作", "Community and Partners"),
          items: [
            {
              type: "doc",
              id: "community/discussions",
              label: label("社区讨论", "Community Discussions"),
            },
            {
              type: "doc",
              id: "cooperation/partners",
              label: label("生态合作", "Ecosystem Partners"),
            },
            {
              type: "doc",
              id: "cooperation/idea",
              label: label("我有一个想法", "Share an Idea"),
            },
          ],
        },
      ],
    },
  ],
};
export default sidebars;
