import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const entryCards = [
  {
    title: '认识 xAgent',
    description: '了解 xAgent 的定位、适用场景，以及它和普通聊天工具的区别。',
    to: '/docs/getting-started/what-is-xagent',
  },
  {
    title: '功能导览',
    description: '按实际入口了解首页、提交任务、查看文件和自动执行。',
    to: '/docs/getting-started/quick-start',
  },
  {
    title: '菜单说明',
    description: '对照左侧菜单，确认每个页面能做什么、什么时候打开。',
    to: '/docs/user-guide/menu-overview',
  },
  {
    title: '工具与扩展',
    description: '通过工具、技能、外部连接和触发器扩展任务能力。',
    to: '/docs/user-guide/tool',
  },
];

const capabilityCards = [
  {
    title: '提交任务',
    description: '在 Agent会话 中说明目标、上传材料、确认动作，并持续补充要求。',
  },
  {
    title: '查看产物',
    description: '在工作区文件中预览、下载和继续引用报告、表格、网页等结果。',
  },
  {
    title: '复用方法',
    description: '管理员准备通用技能，进阶用户把高频流程保存成自己的技能。',
  },
  {
    title: '接入外部系统',
    description: '通过外部连接、工具和触发器处理邮件、消息、企业系统和定时任务。',
  },
];

const startSteps = [
  {
    title: '先看功能导览',
    description: '快速了解 xAgent 适合做什么，以及普通用户和管理员各自从哪里开始。',
    to: '/docs/getting-started/quick-start',
  },
  {
    title: '对照菜单找入口',
    description: '不需要先理解术语，直接按左侧菜单确认页面用途和常见操作。',
    to: '/docs/user-guide/menu-overview',
  },
  {
    title: '提交第一个任务',
    description: '用一句明确的目标开始，补充材料、格式和期望结果。',
    to: '/docs/getting-started/first-task',
  },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="xAgent 使用手册"
      description="面向家庭、小团队和小公司的多用户智能体门户。">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <Heading as="h1" className={styles.title}>
              xAgent 使用手册
            </Heading>
            <p className={styles.subtitle}>
              xAgent 是给家庭、小团队和小公司使用的智能工作门户。管理员准备好常用能力后，用户只需要进入网页、说明要做什么、上传材料并查看结果。
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/docs/getting-started/quick-start">
                查看功能导览
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/user-guide/menu-overview">
                查看菜单说明
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.entries} aria-label="文档入口">
          <div className={styles.entryGrid}>
            {entryCards.map((card) => (
              <Link className={styles.entryCard} to={card.to} key={card.title}>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="capabilities-title">
          <div className={styles.sectionInner}>
            <p className={styles.eyebrow}>核心能力</p>
            <Heading as="h2" id="capabilities-title" className={styles.sectionTitle}>
              一套入口，覆盖日常智能工作
            </Heading>
            <div className={styles.capabilityGrid}>
              {capabilityCards.map((card) => (
                <article className={styles.capabilityCard} key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="start-title">
          <div className={styles.sectionInner}>
            <p className={styles.eyebrow}>上手路径</p>
            <Heading as="h2" id="start-title" className={styles.sectionTitle}>
              第一次阅读时按这个顺序来
            </Heading>
            <div className={styles.pathList}>
              {startSteps.map((step, index) => (
                <Link className={styles.pathStep} to={step.to} key={step.title}>
                  <span className={styles.stepMark}>{index + 1}</span>
                  <span>
                    <strong>{step.title}</strong>
                    <span>{step.description}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
