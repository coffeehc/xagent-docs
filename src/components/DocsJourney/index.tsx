import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

type JourneyCopy = readonly [title: string, description: string, action: string];
type JourneyPath = {zh: JourneyCopy; en: JourneyCopy; route: string};

const paths: JourneyPath[] = [
  {
    zh: ['先了解它能做什么', '产品定位、能力范围和菜单入口', '了解 xAgent'],
    en: ['Understand the product', 'Product scope, capabilities, and where to find them', 'Explore xAgent'],
    route: '/docs/getting-started/what-is-xagent/',
  },
  {
    zh: ['完成第一次使用', '已有账号直接做任务；管理员先安装', '做第一个任务'],
    en: ['Complete your first task', 'Already have an account? Start here; admins install first', 'Try a first task'],
    route: '/docs/getting-started/first-task/',
  },
  {
    zh: ['处理日常工作', '提交材料、继续任务、检查并保存产物', '打开工作台指南'],
    en: ['Get everyday work done', 'Provide inputs, continue work, and check saved results', 'Open the workspace guide'],
    route: '/docs/manual/workspace/',
  },
  {
    zh: ['让任务走得更远', '长任务、会话协作、触发器与能力扩展', '了解会话协作'],
    en: ['Build on your workflow', 'Long tasks, session handoffs, triggers, and extensions', 'Learn session collaboration'],
    route: '/docs/guides/multi-agent-session-event-collaboration/',
  },
  {
    zh: ['部署与管理', '模型、用户、审批边界和运行依赖', '查看部署路径'],
    en: ['Deploy and administer', 'Models, users, approval boundaries, and runtime dependencies', 'Follow the deployment path'],
    route: '/docs/guides/self-hosted-ai-agent/',
  },
  {
    zh: ['定位问题', '从现象查原因，再深入协议与技术参考', '查常见问题'],
    en: ['Find the cause of a problem', 'Start with the symptom, then go deeper into reference material', 'Find an answer'],
    route: '/docs/faq/common/',
  },
];

export default function DocsJourney() {
  const {i18n} = useDocusaurusContext();
  const language = i18n.currentLocale === 'en' ? 'en' : 'zh';

  return (
    <nav className={styles.journey} aria-label={language === 'en' ? 'Choose a reading path' : '选择阅读路径'}>
      {paths.map((path, index) => {
        const [title, description, action] = path[language];
        return (
          <Link className={styles.path} to={path.route} key={path.route}>
            <span className={styles.number} aria-hidden="true">0{index + 1}</span>
            <strong>{title}</strong>
            <span className={styles.description}>{description}</span>
            <span className={styles.action}>{action}</span>
          </Link>
        );
      })}
    </nav>
  );
}
