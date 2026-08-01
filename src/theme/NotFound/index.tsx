import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import OriginalNotFound from '@theme-original/NotFound';

export default function NotFound(): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,follow" />
      </Head>
      <OriginalNotFound />
    </>
  );
}
