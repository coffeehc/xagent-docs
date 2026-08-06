import type {KeyboardEvent, MouseEvent, ReactNode} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import OriginalMDXImg from '@theme-original/MDXComponents/Img';
import type {Props} from '@theme/MDXComponents/Img';

import {useImageLightbox} from '@site/src/components/ImageLightbox';

import styles from './styles.module.css';

export default function MDXImg(props: Props): ReactNode {
  const {openImage} = useImageLightbox();
  const {i18n} = useDocusaurusContext();
  const alt = props.alt ?? '';
  const zoomLabel = i18n.currentLocale === 'en' ? 'Enlarge image' : '放大图片';

  function openCurrentImage(image: HTMLImageElement): void {
    openImage(
      {
        alt,
        src: image.currentSrc || image.src,
      },
      image,
    );
  }

  function handleClick(event: MouseEvent<HTMLImageElement>): void {
    props.onClick?.(event);
    if (event.defaultPrevented) {
      return;
    }

    event.preventDefault();
    openCurrentImage(event.currentTarget);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLImageElement>): void {
    props.onKeyDown?.(event);
    if (event.defaultPrevented || !['Enter', ' '].includes(event.key)) {
      return;
    }

    event.preventDefault();
    openCurrentImage(event.currentTarget);
  }

  return (
    <OriginalMDXImg
      {...props}
      className={clsx(props.className, styles.zoomableImage)}
      role={props.role ?? 'button'}
      tabIndex={props.tabIndex ?? 0}
      aria-label={props['aria-label'] ?? `${zoomLabel}: ${alt}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    />
  );
}
