import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {PageMetadata} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function DocItemMetadata(): ReactNode {
  const {assets, frontMatter, metadata} = useDoc();
  const {i18n, siteConfig} = useDocusaurusContext();
  const isUntranslatedFallback =
    i18n.currentLocale !== i18n.defaultLocale &&
    metadata.source.startsWith('@site/docs/');
  const isIndexable = !metadata.unlisted && !isUntranslatedFallback;
  const localeUrl = new URL(siteConfig.baseUrl, siteConfig.url).toString();
  const pagePath = metadata.permalink.endsWith('/')
    ? metadata.permalink
    : `${metadata.permalink}/`;
  const pageUrl = new URL(pagePath, siteConfig.url).toString();
  const updated =
    typeof metadata.frontMatter.updated === 'string'
      ? metadata.frontMatter.updated
      : undefined;
  const configuredSchemaType = metadata.frontMatter.schemaType;
  const schemaType =
    configuredSchemaType === 'WebPage' ||
    configuredSchemaType === 'ContactPage' ||
    configuredSchemaType === 'CollectionPage'
      ? configuredSchemaType
      : 'TechArticle';
  const isTechArticle = schemaType === 'TechArticle';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    '@id': `${pageUrl}#${isTechArticle ? 'article' : 'webpage'}`,
    ...(isTechArticle
      ? {headline: metadata.title, mainEntityOfPage: pageUrl}
      : {name: metadata.title}),
    description: metadata.description,
    url: pageUrl,
    inLanguage: i18n.currentLocale === 'en' ? 'en-US' : 'zh-CN',
    ...(updated ? {dateModified: updated} : {}),
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${localeUrl}#website`,
      name: 'xAgent',
      url: localeUrl,
    },
    about: {
      '@type': 'SoftwareApplication',
      '@id': `${siteConfig.url}/#software`,
      name: 'xAgent',
    },
  };

  return (
    <>
      <PageMetadata
        title={metadata.title}
        description={metadata.description}
        keywords={frontMatter.keywords}
        image={assets.image ?? frontMatter.image}
      />
      {isUntranslatedFallback && !metadata.unlisted ? (
        <Head>
          <meta name="robots" content="noindex,follow" />
        </Head>
      ) : null}
      {isIndexable ? (
        <Head>
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        </Head>
      ) : null}
    </>
  );
}
