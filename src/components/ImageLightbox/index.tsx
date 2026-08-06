import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './styles.module.css';

export type LightboxImage = {
  alt: string;
  src: string;
};

type ImageLightboxContextValue = {
  openImage: (image: LightboxImage, trigger?: HTMLElement) => void;
};

type ImageLightboxProviderProps = {
  children: ReactNode;
};

const ImageLightboxContext = createContext<ImageLightboxContextValue | null>(
  null,
);

/** Returns the shared image preview controller for the current site page. */
export function useImageLightbox(): ImageLightboxContextValue {
  const context = useContext(ImageLightboxContext);
  if (!context) {
    throw new Error('useImageLightbox must be used within ImageLightboxProvider');
  }
  return context;
}

/** Owns the single full-screen image preview shared by the entire site. */
export function ImageLightboxProvider({
  children,
}: ImageLightboxProviderProps): ReactNode {
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const {i18n} = useDocusaurusContext();
  const isEnglish = i18n.currentLocale === 'en';

  const closeImage = useCallback(() => {
    setActiveImage(null);
  }, []);

  const openImage = useCallback(
    (image: LightboxImage, trigger?: HTMLElement) => {
      triggerRef.current = trigger ?? null;
      setActiveImage(image);
    },
    [],
  );

  useEffect(() => {
    if (!activeImage) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        closeImage();
        return;
      }

      if (event.key === 'Tab') {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    }

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      if (trigger?.isConnected) {
        trigger.focus();
      }
    };
  }, [activeImage, closeImage]);

  const contextValue = useMemo(
    () => ({openImage}),
    [openImage],
  );

  return (
    <ImageLightboxContext.Provider value={contextValue}>
      {children}
      {activeImage ? (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeImage();
            }
          }}>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            aria-label={isEnglish ? 'Close enlarged image' : '关闭放大图片'}
            title={isEnglish ? 'Close' : '关闭'}
            onClick={closeImage}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <img
            className={styles.previewImage}
            src={activeImage.src}
            alt={activeImage.alt}
          />
        </div>
      ) : null}
    </ImageLightboxContext.Provider>
  );
}
