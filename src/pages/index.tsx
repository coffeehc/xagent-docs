import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './index.module.css';

type Card = {
  title: string;
  description: string;
  to?: string;
};

const homeContent = {
  'zh-CN': {
    layoutTitle: 'xAgent 使用手册',
    layoutDescription: '面向团队与公司的多用户智能工作门户。',
    kicker: 'xAgent 使用手册 · v0.0.1.beta',
    title: '面向任务完成的多用户智能工作门户',
    subtitle:
      'xAgent 当前处于 v0.0.1.beta 测试版阶段，部署在服务器端，团队通过 Web 或连接器访问。管理员准备模型、Skill、工具、外部连接和安全策略后，用户只需要说明目标、提供材料、确认关键动作并查看结果，显著降低使用智能体完成工作的门槛。',
    entriesLabel: '核心定位',
    capabilityEyebrow: '能力概览',
    capabilityTitle: '先把能力组织起来，再让用户直接使用',
    guideEyebrow: '使用入口',
    guideTitle: '从这些页面开始',
    roadmapEyebrow: '后续计划',
    roadmapTitle: '根据真实使用反馈继续演进',
    highlightCards: [
      {
        title: '为任务完成而生',
        description: 'xAgent 不是陪聊产品，而是围绕目标、材料、工具、产物和确认动作推进工作。',
      },
      {
        title: '服务端部署',
        description: '一个二进制文件运行在服务器端，用户通过 Web 或 IM 连接器访问，任务执行不依赖个人电脑在线。',
      },
      {
        title: '能力可扩展',
        description: '通过 Skill、Tool、MCP 和连接器扩展任务能力，外部系统也可以主动把消息推给 xAgent。',
      },
      {
        title: '安全边界清晰',
        description: '工作区按用户隔离，密钥使用占位符，敏感动作由审批策略控制。',
      },
    ] satisfies Card[],
    capabilityCards: [
      {
        title: 'Skill 与 Tool',
        description: '内置 Skill 覆盖报告、研究、写作、合规、财务、客服、项目管理等场景；Tool 覆盖文件、表格、PDF、网页、邮件、触发器等动作。',
        to: '/docs/getting-started/what-is-xagent#skill-与-tool',
      },
      {
        title: '动态加载能力',
        description: '会话默认具备发现和加载 Skill、Tool 的能力，按需补齐上下文，避免一次性加载全部能力。',
        to: '/docs/getting-started/what-is-xagent#动态能力',
      },
      {
        title: '连接器',
        description: '连接器用于接入微信、邮件、企业系统或第三方服务，并能主动向 xAgent 投递消息和事件。',
        to: '/docs/getting-started/what-is-xagent#连接器',
      },
      {
        title: '会话事件总线',
        description: '外部接口、触发器、连接器和会话都可以发起事件，经队列投递到目标智能体会话。',
        to: '/docs/getting-started/what-is-xagent#会话事件总线与会话间通讯',
      },
      {
        title: '安全治理',
        description: '工作区按用户隔离，密钥使用占位符，敏感动作可由审批策略控制，外部连接和会话通讯都有边界。',
        to: '/docs/getting-started/what-is-xagent#安全治理',
      },
      {
        title: '自定义智能体',
        description: '可以按任务场景创建专用入口，组合 Skill、Tool、连接器和审批策略，沉淀团队自己的工作助手。',
        to: '/docs/getting-started/what-is-xagent#如何实现别的智能体功能',
      },
      {
        title: '任务微调',
        description: '任务执行过程中可以调整目标、提示词、Skill、Tool 和模型，让当前任务尽量达到最佳状态。',
        to: '/docs/getting-started/what-is-xagent#任务微调',
      },
      {
        title: '私有化部署',
        description: '暂无官方 SaaS 计划，推荐部署在自己的服务器和数据环境中；配合本地模型可提高数据私有化程度。',
        to: '/docs/getting-started/what-is-xagent#发布定位',
      },
    ] satisfies Card[],
    guideCards: [
      {
        title: '什么是 xAgent',
        description: '了解产品定位、服务端部署、动态能力、安全边界和后续计划。',
        to: '/docs/getting-started/what-is-xagent',
      },
      {
        title: '功能导览与菜单入口',
        description: '按使用路径和控制台菜单，了解每个页面能做什么、什么时候打开。',
        to: '/docs/user-guide/menu-overview',
      },
      {
        title: 'Agent 会话',
        description: '提交任务、上传材料、查看过程、确认动作，并持续修正结果。',
        to: '/docs/user-guide/agent-session',
      },
      {
        title: 'Skill 与工具',
        description: '了解如何复用任务方法，以及工具如何完成读取、生成、发送和查询等动作。',
        to: '/docs/user-guide/skill',
      },
    ] satisfies Card[],
    roadmapItems: [
      '基于项目的智能体 Team 功能',
      '小脑能力：摘要、路由、意图预理解、OCR、向量化',
      '记忆体强化升级',
      '知识库开发',
      '根据社区反馈持续调整',
    ],
  },
  en: {
    layoutTitle: 'xAgent User Manual',
    layoutDescription: 'A multi-user AI work portal for teams and companies.',
    kicker: 'xAgent User Manual · v0.0.1.beta',
    title: 'A Multi-User AI Work Portal Built for Task Completion',
    subtitle:
      'xAgent is currently in beta as v0.0.1.beta. It runs on a server and is accessed through the web UI or connectors. Admins prepare models, Skills, Tools, external connections, and safety rules; users describe goals, provide materials, confirm sensitive actions, and review results.',
    entriesLabel: 'Positioning',
    capabilityEyebrow: 'Capabilities',
    capabilityTitle: 'Organize capabilities first, then let users work directly',
    guideEyebrow: 'Start Here',
    guideTitle: 'Core pages',
    roadmapEyebrow: 'Roadmap',
    roadmapTitle: 'Evolving with real user feedback',
    highlightCards: [
      {
        title: 'Built for task completion',
        description: 'xAgent is not a casual chat companion. It works around goals, materials, tools, outputs, and confirmations.',
      },
      {
        title: 'Server-side deployment',
        description: 'One binary runs on the server. Users access it through the web UI or IM connectors, and tasks do not depend on a personal computer staying online.',
      },
      {
        title: 'Extensible capabilities',
        description: 'Skills, Tools, MCP, and connectors extend what xAgent can do. External systems can also push messages into xAgent.',
      },
      {
        title: 'Clear safety boundaries',
        description: 'Workspaces are isolated by user, keys use placeholders, and sensitive actions can be controlled by approval rules.',
      },
    ] satisfies Card[],
    capabilityCards: [
      {
        title: 'Skills and Tools',
        description: 'Skills capture reusable task methods. Tools perform concrete actions such as file processing, web fetching, report creation, messaging, and triggers.',
        to: '/docs/getting-started/what-is-xagent#skills-and-tools',
      },
      {
        title: 'Connectors and MCP',
        description: 'Connectors bring external messages and systems into xAgent. MCP exposes callable external capabilities for task execution.',
        to: '/docs/getting-started/what-is-xagent#connectors',
      },
      {
        title: 'Safety model',
        description: 'xAgent focuses on workspace isolation, key placeholders, approval rules, connector boundaries, and no cross-user session communication.',
        to: '/docs/getting-started/what-is-xagent#safety-governance',
      },
      {
        title: 'User model',
        description: 'The current user model is flat. External business data permissions should remain with the systems that own that data.',
        to: '/docs/getting-started/what-is-xagent#user-model',
      },
      {
        title: 'Built-in Skill files',
        description: 'Selected built-in Skill files are available for community review and pull requests.',
        to: '/docs/user-guide/builtin-skills',
      },
      {
        title: 'Release positioning',
        description: 'The current free binary is for evaluation, deployment trials, task workflow validation, and community feedback.',
        to: '/docs/getting-started/what-is-xagent#release-positioning',
      },
    ] satisfies Card[],
    guideCards: [
      {
        title: 'What is xAgent',
        description: 'Read the English overview of positioning, deployment, Skills, connectors, safety, and roadmap.',
        to: '/docs/getting-started/what-is-xagent',
      },
      {
        title: 'Built-in Skill Files',
        description: 'Review the editable built-in Skill file copies and contribution boundaries.',
        to: '/docs/user-guide/builtin-skills',
      },
      {
        title: 'Agent Session',
        description: 'Chinese fallback page for task submission, files, execution process, approvals, and result refinement.',
        to: '/docs/user-guide/agent-session',
      },
      {
        title: 'Menu Overview',
        description: 'Chinese fallback page for the current menu and feature entry points.',
        to: '/docs/user-guide/menu-overview',
      },
    ] satisfies Card[],
    roadmapItems: [
      'Project-based agent team features',
      'A small brain model for summaries, routing, intent pre-understanding, OCR, vectorization, and stability monitoring',
      'Stronger memory capabilities',
      'Knowledge base support',
      'Ecosystem integrations such as video generation frameworks and Feishu',
      'More adjustments based on community feedback',
    ],
  },
};

export default function Home(): ReactNode {
  const {i18n} = useDocusaurusContext();
  const content =
    homeContent[i18n.currentLocale as keyof typeof homeContent] ??
    homeContent['zh-CN'];

  return (
    <Layout
      title={content.layoutTitle}
      description={content.layoutDescription}>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.kicker}>{content.kicker}</p>
            <Heading as="h1" className={styles.title}>
              {content.title}
            </Heading>
            <p className={styles.subtitle}>
              {content.subtitle}
            </p>
          </div>
        </section>

        <section className={styles.entries} aria-label={content.entriesLabel}>
          <div className={styles.entryGrid}>
            {content.highlightCards.map((card) => (
              <article className={styles.entryCard} key={card.title}>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="capabilities-title">
          <div className={styles.sectionInner}>
            <p className={styles.eyebrow}>{content.capabilityEyebrow}</p>
            <Heading as="h2" id="capabilities-title" className={styles.sectionTitle}>
              {content.capabilityTitle}
            </Heading>
            <div className={styles.capabilityGrid}>
              {content.capabilityCards.map((card) => (
                <Link className={styles.capabilityCard} to={card.to} key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="guides-title">
          <div className={styles.sectionInner}>
            <p className={styles.eyebrow}>{content.guideEyebrow}</p>
            <Heading as="h2" id="guides-title" className={styles.sectionTitle}>
              {content.guideTitle}
            </Heading>
            <div className={styles.guideGrid}>
              {content.guideCards.map((card) => (
                <Link className={styles.guideCard} to={card.to} key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="roadmap-title">
          <div className={styles.sectionInner}>
            <p className={styles.eyebrow}>{content.roadmapEyebrow}</p>
            <Heading as="h2" id="roadmap-title" className={styles.sectionTitle}>
              {content.roadmapTitle}
            </Heading>
            <ul className={styles.roadmapList}>
              {content.roadmapItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}
