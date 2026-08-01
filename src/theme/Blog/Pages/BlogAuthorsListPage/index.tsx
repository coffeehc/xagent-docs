import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import OriginalBlogAuthorsListPage from '@theme-original/Blog/Pages/BlogAuthorsListPage';
import type {Props} from '@theme/Blog/Pages/BlogAuthorsListPage';

export default function BlogAuthorsListPage(props: Props): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,follow" />
      </Head>
      <OriginalBlogAuthorsListPage {...props} />
    </>
  );
}
