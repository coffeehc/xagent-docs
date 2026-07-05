import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const entryCards = [
  {
    title: '快速开始',
    description: '了解本地运行、文档结构和第一阶段推荐阅读路径。',
    to: '/docs/getting-started/quick-start',
  },
  {
    title: '核心概念',
    description: '梳理 xAgent 的基础术语、能力模型和上下文边界。',
    to: '/docs/getting-started/core-concepts',
  },
  {
    title: '扩展开发',
    description: '查看 Skill、Connector、运行环境和声明文件的开发入口。',
    to: '/docs/developer-guide/skill',
  },
  {
    title: '常见问题',
    description: '记录使用、维护和 Codex 辅助写作中的常见约束。',
    to: '/docs/faq/common',
  },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="xAgent Documentation"
      description="构建、部署、使用和扩展 xAgent 的官方文档中心。">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <Heading as="h1" className={styles.title}>
              xAgent Documentation
            </Heading>
            <p className={styles.subtitle}>
              构建、部署、使用和扩展 xAgent 的官方文档中心。
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/docs/getting-started/quick-start">
                开始阅读
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/reference/glossary">
                查看术语表
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
      </main>
    </Layout>
  );
}
