import {useState} from 'react';
import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import {useImageLightbox} from '@site/src/components/ImageLightbox';

import styles from './index.module.css';

const siteUrl = 'https://xagent.xiagaogao.com';
const installerUrl =
  'https://downloads.xagent.xiagaogao.com/scripts/install.sh';
const installerCommand = `curl -fsSL ${installerUrl} | bash`;
const heroImageSizes =
  '(max-width: 760px) calc(100vw - 2rem), (max-width: 1088px) calc(100vw - 3rem), 1040px';
const featureImageSizes =
  '(max-width: 760px) calc(100vw - 2rem), (max-width: 996px) calc(60vw - 2rem), 740px';

function responsiveImageSrcSet(source: string): string {
  const base = source.slice(0, -'.webp'.length);
  return `${base}-720.webp 720w, ${base}-768.webp 768w, ${base}-1040.webp 1040w, ${source} 1600w`;
}

type Card = {
  title: string;
  description: string;
  to?: string;
};

type FeatureStory = Card & {
  image?: string;
  imageAlt?: string;
  visual?: 'installer';
};

type SlideHeadingProps = {
  eyebrow: string;
  id: string;
  index: number;
  title: string;
};

function SlideHeading({eyebrow, id, index, title}: SlideHeadingProps) {
  return (
    <header className={styles.slideHeading}>
      <span className={styles.slideIndex} aria-hidden="true">
        {String(index).padStart(2, '0')}
      </span>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <Heading as="h2" id={id} className={styles.sectionTitle}>
          {title}
        </Heading>
      </div>
    </header>
  );
}

const homeContent = {
  'zh-CN': {
    layoutTitle: 'xAgent：可私有化部署的多用户 AI Agent 工作门户',
    layoutDescription:
      'xAgent 是可私有化部署的多用户 AI Agent 工作门户，能够理解任务变化，按需准备 Skill、Tool 与长期记忆，并通过项目化会话、连接器、隔离工作区和安全治理持续完成任务。',
    kicker: 'xAgent 产品介绍 · v0.0.11.beta',
    title: '可私有化部署的多用户 AI Agent 工作门户',
    subtitle:
      'xAgent 是企业统一的 AI 工作平台。服务端部署，快速接入现有系统，权限与成本集中管控、操作全程审计；员工打开网页或手机，即可使用 AI 完成工作。实现企业可管、员工好用。',
    primaryAction: '开始部署',
    secondaryAction: '打开使用手册',
    learnAction: '了解 xAgent',
    showcaseLabel: 'xAgent 中文控制台界面',
    showcaseImage: '/img/home/v005/xagent-dashboard-zh.webp',
    showcaseAlt: 'xAgent 中文控制台仪表板',
    showcaseWidth: 1600,
    showcaseHeight: 991,
    zoomImageLabel: '点击放大图片',
    featureAction: '查看功能详情',
    featureVisualAlts: [
      'xAgent 中文 Agent 会话界面',
      'xAgent 中文智能体管理界面',
      'xAgent 中文会话创建执行计划并加载 deep-research Skill 的运行界面',
      'xAgent 中文连接器管理界面',
      'xAgent 中文审批策略界面',
    ],
    installerVisualTitle: '自动安装与升级流程',
    installerSteps: ['检测系统与架构', '校验版本与文件', '安装或升级服务', '启动并检查状态'],
    entriesLabel: '核心定位',
    capabilityEyebrow: '能力概览',
    capabilityTitle: '先把能力组织起来，再让用户直接使用',
    guideEyebrow: '使用入口',
    guideTitle: '从这些页面开始',
    workflowEyebrow: '运行方式',
    workflowTitle: '从目标到结果',
    workflowSteps: [
      {
        title: '提交目标与材料',
        description: '说明要完成什么，并上传任务需要处理的文件。',
      },
      {
        title: '理解任务并准备能力',
        description: 'xAgent 判断目标是否延续，并按需准备合适的 Skill、Tool 与长期记忆。',
      },
      {
        title: '执行并确认关键动作',
        description: '任务在服务端持续执行，遇到敏感动作时请求用户审批。',
      },
      {
        title: '交付并保存结果',
        description: '回复任务结论，并将生成的文件保存到用户工作区。',
      },
    ],
    exampleLabel: '任务示例',
    exampleText:
      '上传会议记录 → 提取决策与待办 → 生成 Markdown 或 CSV → 保存到工作区',
    roadmapEyebrow: '后续计划',
    roadmapTitle: '根据真实使用反馈继续演进',
    highlightCards: [
      {
        title: '为任务完成而生',
        description: 'xAgent 不是陪聊产品，而是围绕目标、材料、工具、产物和确认动作推进工作。',
      },
      {
        title: '服务端部署',
        description: '使用自动安装脚本完成版本检测、校验、安装或升级；任务在服务器端运行，不依赖个人电脑持续在线。',
      },
      {
        title: '能力可扩展',
        description: '通过 Skill、Tool、MCP 和连接器扩展任务能力，外部系统也可以主动把消息推给 xAgent。',
      },
      {
        title: '安全边界清晰',
        description: '工作区按用户隔离，命令由 ProcessSandbox 执行，密钥使用占位符，敏感动作由审批策略控制。',
      },
    ] satisfies Card[],
    agentFeature: {
      title: '智能体，既能直接使用，也能持续沉淀',
      description:
        '管理员可以预先准备面向不同场景的智能体，用户直接选择使用；也可以从已有会话中提炼目标、提示词、Skill 和 Tool，沉淀为可复用的智能体入口。',
      to: '/docs/user-guide/agent-management',
    } satisfies Card,
    capabilityCards: [
      {
        title: 'Skill 与 Tool',
        description: '内置 Skill 覆盖报告、研究、写作、合规、财务、客服、项目管理等场景；Tool 覆盖文件、表格、PDF、网页、图片生成、邮件和触发器等动作。',
        to: '/docs/manual/capabilities',
      },
      {
        title: '动态加载能力',
        description: '会话默认具备发现和加载 Skill、Tool 的能力，按需补齐上下文，避免一次性加载全部能力。',
        to: '/docs/guides/ai-agent-dynamic-tool-discovery',
      },
      {
        title: '连接器',
        description: '微信、Telegram 与飞书连接器支持双向消息和文件；Database 与 SSH Connector 提供受管的数据库和远程主机能力，浏览器也可以作为受控连接入口。',
        to: '/docs/user-guide/connector',
      },
      {
        title: '会话事件总线',
        description: '外部接口、触发器、连接器和会话都可以发起事件，经队列投递到目标智能体会话。',
        to: '/docs/guides/multi-agent-session-event-collaboration',
      },
      {
        title: '安全治理',
        description: '工作区和命令执行使用分层隔离，密钥使用占位符，敏感动作可由审批策略控制，外部连接和会话通讯都有边界。',
        to: '/docs/guides/agent-approval-security',
      },
      {
        title: '自定义智能体',
        description: '可以按任务场景创建专用入口，组合 Skill、Tool、连接器和审批策略，沉淀团队自己的工作助手。',
        to: '/docs/user-guide/agent-management',
      },
      {
        title: '任务微调',
        description: '任务执行过程中可以调整目标、提示词、Skill、Tool 和模型，让当前任务尽量达到最佳状态。',
        to: '/docs/user-guide/agent-session#高级设置与任务微调',
      },
      {
        title: '私有化部署',
        description: '当前测试版支持 5 个用户免费使用，暂无官方 SaaS 计划；推荐部署在自己的服务器和数据环境中。',
        to: '/docs/guides/self-hosted-ai-agent',
      },
    ] satisfies Card[],
    guideCards: [
      {
        title: '什么是 xAgent',
        description: '了解产品定位、服务端部署、动态能力、安全边界和后续计划。',
        to: '/docs/getting-started/what-is-xagent',
      },
      {
        title: '使用手册',
        description: '按当前控制台菜单逐页查看用途、可见范围、常用操作和中文界面图例。',
        to: '/docs/manual/overview',
      },
      {
        title: 'Agent 会话',
        description: '提交任务、上传材料、查看过程、确认动作，并持续修正结果。',
        to: '/docs/user-guide/agent-session',
      },
      {
        title: '智能体功能与文档处理',
        description: '查看 50 个内置 Skill 能完成的任务，以及图片、PDF、Office、表格和代码文件的处理边界。',
        to: '/docs/manual/capabilities',
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
    layoutTitle: 'xAgent: Self-Hosted Multi-User AI Agent Platform',
    layoutDescription:
      'xAgent is a self-hosted multi-user AI agent platform that adapts Skills, Tools, and memory to each task across projects, connectors, and governed workspaces.',
    kicker: 'xAgent Product Overview · v0.0.11.beta',
    title: 'A Task-First, Self-Hosted Multi-User AI Agent Platform',
    subtitle:
      'xAgent is the unified AI work platform for the enterprise. Deploy on your own servers, connect existing systems quickly, centralize access and cost controls, and audit every action. Employees can get work done with AI from the web or mobile app, giving enterprises control and employees an effortless experience.',
    primaryAction: 'Start Deployment',
    secondaryAction: 'Open User Manual',
    learnAction: 'Learn About xAgent',
    showcaseLabel: 'xAgent English console interface',
    showcaseImage: '/img/home/v005/xagent-dashboard-en.webp',
    showcaseAlt: 'xAgent English console dashboard',
    showcaseWidth: 1600,
    showcaseHeight: 994,
    zoomImageLabel: 'Click to enlarge image',
    featureAction: 'Explore this feature',
    featureVisualAlts: [
      'xAgent English agent session interface',
      'xAgent English Agent management interface',
      'xAgent English session creating a plan and loading the deep-research Skill',
      'xAgent English connector management interface',
      'xAgent English approval policy interface',
    ],
    installerVisualTitle: 'Automated install and upgrade flow',
    installerSteps: ['Detect system and architecture', 'Verify version and files', 'Install or upgrade service', 'Start and check status'],
    entriesLabel: 'Positioning',
    capabilityEyebrow: 'Capabilities',
    capabilityTitle: 'Organize capabilities first, then let users work directly',
    guideEyebrow: 'Start Here',
    guideTitle: 'Core pages',
    workflowEyebrow: 'How It Works',
    workflowTitle: 'From goal to result',
    workflowSteps: [
      {
        title: 'Provide a goal and materials',
        description: 'Describe the work to complete and upload the files it needs.',
      },
      {
        title: 'Understand the task and prepare capabilities',
        description: 'xAgent checks whether the goal continues, then prepares the relevant Skills, Tools, and long-term memory.',
      },
      {
        title: 'Run and confirm key actions',
        description: 'The task continues on the server and requests approval for sensitive actions.',
      },
      {
        title: 'Deliver and save results',
        description: 'xAgent returns the outcome and saves generated files in the user workspace.',
      },
    ],
    exampleLabel: 'Example task',
    exampleText:
      'Upload meeting notes → extract decisions and action items → create Markdown or CSV → save to the workspace',
    roadmapEyebrow: 'Roadmap',
    roadmapTitle: 'Evolving with real user feedback',
    highlightCards: [
      {
        title: 'Built for task completion',
        description: 'xAgent is not a casual chat companion. It works around goals, materials, tools, outputs, and confirmations.',
      },
      {
        title: 'Server-side deployment',
        description: 'The installer detects, verifies, installs, or upgrades xAgent. Tasks run on the server and do not depend on a personal computer staying online.',
      },
      {
        title: 'Extensible capabilities',
        description: 'Skills, Tools, MCP, and connectors extend what xAgent can do. External systems can also push messages into xAgent.',
      },
      {
        title: 'Clear safety boundaries',
        description: 'Workspaces are isolated by user, commands run through ProcessSandbox, keys use placeholders, and sensitive actions can be controlled by approval rules.',
      },
    ] satisfies Card[],
    agentFeature: {
      title: 'Agents you can use now and refine over time',
      description:
        'Admins can prepare Agents for different scenarios so users can select them directly. Effective goals, prompts, Skills, and Tools from an existing session can also be distilled into a reusable Agent entry point.',
      to: '/docs/user-guide/agent-management',
    } satisfies Card,
    capabilityCards: [
      {
        title: 'Skills and Tools',
        description: 'Skills capture reusable task methods. Tools perform concrete actions such as file processing, web fetching, image generation, report creation, messaging, and triggers.',
        to: '/docs/manual/capabilities',
      },
      {
        title: 'Connectors and MCP',
        description: 'WeChat, Telegram, and Feishu Connectors provide bidirectional messages and files. Database and SSH Connectors expose governed database and remote-host capabilities, while Browser provides another controlled entry point.',
        to: '/docs/user-guide/connector',
      },
      {
        title: 'Safety model',
        description: 'xAgent combines workspace isolation, ProcessSandbox execution, key placeholders, approval rules, connector boundaries, and no cross-user session communication.',
        to: '/docs/guides/agent-approval-security',
      },
      {
        title: 'User model',
        description: 'The current user model is flat. External business data permissions should remain with the systems that own that data.',
        to: '/docs/getting-started/what-is-xagent#what-it-does-not-replace',
      },
      {
        title: 'Built-in Skill files',
        description: 'Selected built-in Skill files are available for community review and improvement proposals.',
        to: '/docs/user-guide/builtin-skills',
      },
      {
        title: 'Release positioning',
        description: 'The current beta is free for up to five users and is intended for evaluation, deployment trials, and task workflow validation.',
        to: '/docs/getting-started/what-is-xagent#the-short-version',
      },
    ] satisfies Card[],
    guideCards: [
      {
        title: 'What is xAgent',
        description: 'Read the English overview of positioning, deployment, Skills, connectors, safety, and roadmap.',
        to: '/docs/getting-started/what-is-xagent',
      },
      {
        title: 'User Manual',
        description: 'Walk through every console page with visibility notes, common actions, and English UI examples.',
        to: '/docs/manual/overview',
      },
      {
        title: 'Agent Session',
        description: 'Submit tasks, upload files, inspect execution, confirm actions, and refine results.',
        to: '/docs/user-guide/agent-session',
      },
      {
        title: 'Agent Capabilities',
        description: 'Explore 50 built-in Skills and the current boundaries for images, PDF, Office, spreadsheet, and source files.',
        to: '/docs/manual/capabilities',
      },
    ] satisfies Card[],
    roadmapItems: [
      'Project-based agent team features',
      'A small brain model for summaries, routing, intent pre-understanding, OCR, vectorization, and stability monitoring',
      'Stronger memory capabilities',
      'Knowledge base support',
      'Ecosystem integrations such as video generation frameworks and additional enterprise messaging systems',
      'More adjustments based on community feedback',
    ],
  },
};

export default function Home(): ReactNode {
  const [copiedInstaller, setCopiedInstaller] = useState(false);
  const {openImage} = useImageLightbox();
  const {i18n} = useDocusaurusContext();
  const content =
    homeContent[i18n.currentLocale as keyof typeof homeContent] ??
    homeContent['zh-CN'];
  const isEnglish = i18n.currentLocale === 'en';
  const localeUrl = isEnglish ? `${siteUrl}/en/` : `${siteUrl}/`;
  const localHref = (path: string) => (isEnglish ? `/en${path}` : path);
  const manualLocale = isEnglish ? 'en' : 'zh';
  const connectorCard = content.capabilityCards[isEnglish ? 1 : 2];
  const featureStories: FeatureStory[] = [
    {
      ...content.highlightCards[0],
      to: '/docs/user-guide/agent-session',
      image: `/img/home/v005/xagent-task-session-${manualLocale === 'zh' ? 'zh' : 'en'}.webp`,
      imageAlt: content.featureVisualAlts[0],
    },
    {
      ...content.highlightCards[1],
      to: '/docs/getting-started/install',
      visual: 'installer',
    },
    {
      ...content.agentFeature,
      image: `/img/home/v005/xagent-agent-management-${manualLocale}.webp`,
      imageAlt: content.featureVisualAlts[1],
    },
    {
      ...content.capabilityCards[0],
      to: '/docs/manual/capabilities',
      image: `/img/insights/ai-agent-tools-vs-skills/plan-and-skill-load${
        isEnglish ? '-en' : ''
      }.webp`,
      imageAlt: content.featureVisualAlts[2],
    },
    {
      ...connectorCard,
      to: '/docs/user-guide/connector',
      image: `/img/home/v005/xagent-connectors-${manualLocale}.webp`,
      imageAlt: content.featureVisualAlts[3],
    },
    {
      ...content.highlightCards[3],
      to: '/docs/guides/agent-approval-security',
      image: `/img/home/v005/xagent-security-policy-${manualLocale}.webp`,
      imageAlt: content.featureVisualAlts[4],
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${localeUrl}#website`,
        name: 'xAgent',
        alternateName: isEnglish
          ? 'xAgent Self-Hosted Multi-User AI Agent Platform'
          : 'xAgent 多用户 AI Agent 工作门户',
        url: localeUrl,
        description: content.layoutDescription,
        inLanguage: isEnglish ? 'en-US' : 'zh-CN',
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${siteUrl}/#software`,
        name: 'xAgent',
        alternateName: isEnglish
          ? 'xAgent Task-First AI Agent Platform'
          : 'xAgent 面向任务完成的 AI Agent 平台',
        url: localeUrl,
        image: `${siteUrl}/img/share/${isEnglish ? 'en' : 'zh'}/xagent-overview.png`,
        description: content.layoutDescription,
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: isEnglish
          ? 'Self-hosted multi-user AI agent platform'
          : '可私有化部署的多用户 AI Agent 平台',
        operatingSystem: 'Linux, macOS',
        softwareVersion: '0.0.11.beta',
        downloadUrl: installerUrl,
        releaseNotes: `${localeUrl}docs/changelog/`,
        softwareHelp: {
          '@type': 'WebPage',
          url: `${localeUrl}docs/manual/overview/`,
        },
        sameAs: 'https://github.com/coffeehc/xagent-releases',
        inLanguage: isEnglish ? 'en-US' : 'zh-CN',
        featureList: isEnglish
          ? [
              'Self-hosted server deployment',
              'Multi-user workspace isolation',
              'ProcessSandbox command isolation',
              'Automated installation and upgrades',
              'Reusable Agent entry points',
              'Shared Skills and Tools',
              'MCP and Connector extensions',
              'Long-running tasks and session events',
              'Approval and secret safety governance',
            ]
          : [
              '服务端私有化部署',
              '多用户工作区隔离',
              'ProcessSandbox 命令隔离',
              '自动安装与升级',
              '可复用的智能体入口',
              '共享 Skill 与 Tool',
              'MCP 与连接器扩展',
              '长任务与会话事件',
              '审批与密钥安全治理',
            ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: installerUrl,
          description: isEnglish
            ? 'Free beta for up to five users'
            : '5 个用户内免费使用的测试版',
        },
      },
    ],
  };

  return (
    <Layout
      title={content.layoutTitle}
      description={content.layoutDescription}>
      <Head>
        <title>{content.layoutTitle}</title>
        <meta property="og:title" content={content.layoutTitle} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroMeta}>
              <p className={styles.kicker}>{content.kicker}</p>
              <span className={styles.coverIndex} aria-hidden="true">00</span>
            </div>
            <div className={styles.heroCopy}>
              <Heading as="h1" className={styles.title}>
                {content.title}
              </Heading>
              <p className={styles.subtitle}>{content.subtitle}</p>
              <div className={styles.heroActions}>
                <a
                  className={styles.primaryAction}
                  href={localHref('/docs/getting-started/install')}>
                  {content.primaryAction}
                </a>
                <a
                  className={styles.secondaryAction}
                  href={localHref('/docs/manual/overview')}>
                  {content.secondaryAction}
                </a>
                <a
                  className={styles.learnAction}
                  href={localHref('/docs/getting-started/what-is-xagent')}>
                  {content.learnAction}
                </a>
              </div>
            </div>
            <div className={styles.heroMedia} aria-label={content.showcaseLabel}>
              <button
                type="button"
                className={styles.imageButton}
                aria-label={`${content.zoomImageLabel}: ${content.showcaseAlt}`}
                onClick={(event) =>
                  openImage(
                    {
                      src: content.showcaseImage,
                      alt: content.showcaseAlt,
                    },
                    event.currentTarget,
                  )
                }>
                <img
                  src={content.showcaseImage}
                  srcSet={responsiveImageSrcSet(content.showcaseImage)}
                  sizes={heroImageSizes}
                  alt={content.showcaseAlt}
                  width={content.showcaseWidth}
                  height={content.showcaseHeight}
                  decoding="async"
                  fetchPriority="high"
                />
              </button>
            </div>
          </div>
        </section>

        <div className={styles.featureDeck} aria-label={content.entriesLabel}>
          {featureStories.map((story, index) => (
            <section
              className={`${styles.featureSlide} ${index % 2 === 1 ? styles.featureSlideReverse : ''}`}
              key={story.title}>
              <div className={styles.featureInner}>
                <div className={styles.featureCopy}>
                  <span className={styles.featureIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Heading as="h2">{story.title}</Heading>
                  <p>{story.description}</p>
                  <a href={localHref(story.to!)}>{content.featureAction}</a>
                </div>
                <div
                  className={`${styles.featureVisual} ${story.visual === 'installer' ? styles.installerFeatureVisual : ''}`}>
                  {story.visual === 'installer' ? (
                    <div
                      className={styles.installerVisual}
                      role="img"
                      aria-label={content.installerVisualTitle}>
                      <div className={styles.installerHeader}>
                        <span aria-hidden="true" />
                        <strong>{content.installerVisualTitle}</strong>
                      </div>
                      <div className={styles.installerCommand}>
                        <code>{installerCommand}</code>
                        <button
                          type="button"
                          className={styles.copyButton}
                          aria-label={
                            copiedInstaller
                              ? isEnglish
                                ? 'Install command copied'
                                : '安装命令已复制'
                              : isEnglish
                                ? 'Copy install command'
                                : '复制安装命令'
                          }
                          title={
                            copiedInstaller
                              ? isEnglish
                                ? 'Copied'
                                : '已复制'
                              : isEnglish
                                ? 'Copy command'
                                : '复制命令'
                          }
                          onClick={() => {
                            void navigator.clipboard
                              .writeText(installerCommand)
                              .then(() => {
                                setCopiedInstaller(true);
                                window.setTimeout(
                                  () => setCopiedInstaller(false),
                                  1800,
                                );
                              });
                          }}>
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <rect x="9" y="9" width="10" height="10" rx="1.5" />
                            <path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
                          </svg>
                        </button>
                      </div>
                      <ol>
                        {content.installerSteps.map((step, stepIndex) => (
                          <li key={step}>
                            <span>{String(stepIndex + 1).padStart(2, '0')}</span>
                            <strong>{step}</strong>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className={styles.imageButton}
                      aria-label={`${content.zoomImageLabel}: ${story.imageAlt}`}
                      onClick={(event) =>
                        openImage(
                          {
                            src: story.image!,
                            alt: story.imageAlt!,
                          },
                          event.currentTarget,
                        )
                      }>
                      <img
                        src={story.image}
                        srcSet={responsiveImageSrcSet(story.image!)}
                        sizes={featureImageSizes}
                        alt={story.imageAlt}
                        width="1600"
                        height="1000"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className={styles.deckSection} aria-labelledby="capabilities-title">
          <div className={styles.sectionInner}>
            <SlideHeading
              eyebrow={content.capabilityEyebrow}
              id="capabilities-title"
              index={7}
              title={content.capabilityTitle}
            />
            <div className={styles.capabilityIndex}>
              {content.capabilityCards.map((card, index) => (
                <a
                  className={styles.capabilityItem}
                  href={localHref(card.to!)}
                  key={card.title}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.deckSection} ${styles.deckSectionMuted}`} aria-labelledby="workflow-title">
          <div className={styles.sectionInner}>
            <SlideHeading
              eyebrow={content.workflowEyebrow}
              id="workflow-title"
              index={8}
              title={content.workflowTitle}
            />
            <div className={styles.workflowLayout}>
              <p className={styles.workflowExample}>
                <strong>{content.exampleLabel}</strong>
                <span>{content.exampleText}</span>
              </p>
              <ol className={styles.workflowList}>
                {content.workflowSteps.map((step, index) => (
                  <li key={step.title}>
                    <span className={styles.workflowNumber}>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className={styles.deckSection} aria-labelledby="guides-title">
          <div className={styles.sectionInner}>
            <SlideHeading
              eyebrow={content.guideEyebrow}
              id="guides-title"
              index={9}
              title={content.guideTitle}
            />
            <div className={styles.guideList}>
              {content.guideCards.map((card, index) => (
                <a
                  className={styles.guideItem}
                  href={localHref(card.to!)}
                  key={card.title}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.deckSection} ${styles.roadmapSection}`} aria-labelledby="roadmap-title">
          <div className={styles.sectionInner}>
            <SlideHeading
              eyebrow={content.roadmapEyebrow}
              id="roadmap-title"
              index={10}
              title={content.roadmapTitle}
            />
            <div className={styles.roadmapLayout}>
              <ul className={styles.roadmapList}>
                {content.roadmapItems.map((item, index) => (
                  <li key={item}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.roadmapActions}>
                <a
                  className={styles.primaryAction}
                  href={localHref('/docs/getting-started/install')}>
                  {content.primaryAction}
                </a>
                <a
                  className={styles.learnAction}
                  href={localHref('/docs/getting-started/what-is-xagent')}>
                  {content.learnAction}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
