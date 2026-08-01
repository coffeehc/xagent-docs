import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import OriginalBlogTagsListPage from '@theme-original/BlogTagsListPage';
import type {Props} from '@theme/BlogTagsListPage';

export default function BlogTagsListPage(props: Props): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,follow" />
      </Head>
      <OriginalBlogTagsListPage {...props} />
    </>
  );
}
