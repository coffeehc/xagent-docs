import {type ReactNode} from 'react';
import clsx from 'clsx';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import BlogListPaginator from '@theme/BlogListPaginator';
import BlogPostItems from '@theme/BlogPostItems';
import SearchMetadata from '@theme/SearchMetadata';
import type {Props} from '@theme/BlogListPage';
import {getBlogContentDate} from '@site/src/utils/blogContentDate';

function getBlogListDescription(metadata: Props['metadata'], locale: string): string {
  if (metadata.page <= 1) return metadata.blogDescription;
  const suffix = locale === 'en' ? `Page ${metadata.page}.` : `第 ${metadata.page} 页。`;
  return `${metadata.blogDescription} ${suffix}`;
}

function BlogListPageMetadata({metadata, items}: Props): ReactNode {
  const {
    siteConfig: {title: siteTitle},
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink, page} = metadata;
  const pageLabel = currentLocale === 'en' ? `Page ${page}` : `第 ${page} 页`;
  const baseTitle = permalink === '/' ? siteTitle : blogTitle;
  const title = page > 1 ? `${baseTitle} · ${pageLabel}` : baseTitle;
  const description = getBlogListDescription(metadata, currentLocale);

  return (
    <>
      <PageMetadata title={title} description={description} />
      <SearchMetadata tag="blog_posts_list" />
      {items.length === 0 && (
        <Head>
          <meta name="robots" content="noindex,follow" />
        </Head>
      )}
    </>
  );
}

function BlogListPageContent({metadata, items, sidebar}: Props): ReactNode {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const dateModified = getBlogContentDate(items);
  return (
    <BlogLayout sidebar={sidebar}>
      <header className="margin-bottom--lg">
        <h1>{metadata.blogTitle}</h1>
        <p>{metadata.blogDescription}</p>
        {dateModified && <p className="text--secondary">
          {currentLocale === 'en' ? 'Content updated: ' : '内容更新：'}
          <time dateTime={dateModified}>{dateModified}</time>
        </p>}
      </header>
      <BlogPostItems items={items} />
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
}

export default function BlogListPage(props: Props): ReactNode {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const structuredMetadata = {
    ...props.metadata,
    blogDescription: getBlogListDescription(props.metadata, currentLocale),
  };
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} metadata={structuredMetadata} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
