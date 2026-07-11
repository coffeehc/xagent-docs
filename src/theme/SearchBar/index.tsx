import React, {lazy, Suspense, useState, type ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './styles.module.css';

const loadOriginalSearchBar = () => import('@theme-original/SearchBar');
const OriginalSearchBar = lazy(loadOriginalSearchBar);

export default function SearchBar(): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const label = currentLocale === 'en' ? 'Search' : '搜索';
  const ariaLabel = currentLocale === 'en' ? 'Search documentation' : '搜索文档';

  const preload = () => {
    void loadOriginalSearchBar();
  };

  if (isOpen) {
    return (
      <Suspense
        fallback={
          <button className={styles.searchTrigger} disabled type="button">
            {label}
          </button>
        }>
        <OriginalSearchBar />
      </Suspense>
    );
  }

  return (
    <button
      aria-label={ariaLabel}
      className={styles.searchTrigger}
      onClick={() => setIsOpen(true)}
      onFocus={preload}
      onPointerEnter={preload}
      type="button">
      {label}
    </button>
  );
}
