import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import OriginalSearchPage from '@theme-original/SearchPage';

export default function SearchPage(): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <OriginalSearchPage />
    </>
  );
}
