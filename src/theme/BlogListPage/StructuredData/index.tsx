import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import {useBlogListPageStructuredData} from '@docusaurus/plugin-content-blog/client';
import type {Props} from '@theme/BlogListPage/StructuredData';
import {getBlogContentDate} from '@site/src/utils/blogContentDate';

export default function BlogListPageStructuredData(props: Props): ReactNode {
  const structuredData = useBlogListPageStructuredData(props);
  const dateModified = getBlogContentDate(props.items);
  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify({...structuredData, ...(dateModified ? {dateModified} : {})})}
      </script>
    </Head>
  );
}
