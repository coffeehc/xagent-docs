import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import OriginalBlogArchivePage from '@theme-original/BlogArchivePage';
import type {Props} from '@theme/BlogArchivePage';

export default function BlogArchivePage(props: Props): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,follow" />
      </Head>
      <OriginalBlogArchivePage {...props} />
    </>
  );
}
