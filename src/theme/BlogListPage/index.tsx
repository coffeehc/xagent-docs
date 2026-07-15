import Head from '@docusaurus/Head';
import OriginalBlogListPage from '@theme-original/BlogListPage';
import type {Props} from '@theme/BlogListPage';

export default function BlogListPage(props: Props) {
  return (
    <>
      {props.items.length === 0 && (
        <Head>
          <meta name="robots" content="noindex,follow" />
        </Head>
      )}
      <OriginalBlogListPage {...props} />
    </>
  );
}
