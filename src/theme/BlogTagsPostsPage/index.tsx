import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import OriginalBlogTagsPostsPage from '@theme-original/BlogTagsPostsPage';
import type {Props} from '@theme/BlogTagsPostsPage';

export default function BlogTagsPostsPage(props: Props): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,follow" />
      </Head>
      <OriginalBlogTagsPostsPage {...props} />
    </>
  );
}
