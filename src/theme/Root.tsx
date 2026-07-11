import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import {useLocation} from '@docusaurus/router';

import {untranslatedEnglishRoutes} from '../seoRoutes';

type RootProps = {
  children: ReactNode;
};

const untranslatedEnglishRouteSet = new Set<string>(
  untranslatedEnglishRoutes,
);

export default function Root({children}: RootProps): ReactNode {
  const {pathname} = useLocation();
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const shouldPreventIndexing = untranslatedEnglishRouteSet.has(normalizedPath);

  return (
    <>
      {shouldPreventIndexing && (
        <Head>
          <meta name="robots" content="noindex, follow" />
        </Head>
      )}
      {children}
    </>
  );
}
