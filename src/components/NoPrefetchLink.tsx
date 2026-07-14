import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ReactNode,
} from 'react';
import {Link as RouterLink, NavLink} from 'react-router-dom';
import {applyTrailingSlash} from '@docusaurus/utils-common';
import type {Props} from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function NoPrefetchLink(
  {
    isNavLink,
    to,
    href,
    activeClassName,
    isActive,
    autoAddBaseUrl = true,
    'data-noBrokenLinkCheck': noBrokenLinkCheck,
    ...props
  }: Props,
  forwardedRef: React.ForwardedRef<HTMLAnchorElement>,
): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const {baseUrl, trailingSlash} = siteConfig;
  const router = siteConfig.future.experimental_router;
  const brokenLinks = useBrokenLinks();
  const innerRef = useRef<HTMLAnchorElement | null>(null);
  useImperativeHandle(forwardedRef, () => innerRef.current as HTMLAnchorElement);

  const targetLinkUnprefixed = to || href;
  const isInternal = isInternalUrl(targetLinkUnprefixed);
  const targetLinkWithoutPathnameProtocol = targetLinkUnprefixed?.replace(
    'pathname://',
    '',
  );
  const baseUrlTarget = useBaseUrl(targetLinkWithoutPathnameProtocol);
  let targetLink =
    autoAddBaseUrl && targetLinkWithoutPathnameProtocol?.startsWith('/')
      ? baseUrlTarget
      : targetLinkWithoutPathnameProtocol;

  if (targetLink && isInternal) {
    targetLink = applyTrailingSlash(targetLink, {baseUrl, trailingSlash});
  }

  const isAnchorLink = targetLink?.startsWith('#') ?? false;
  const hasInternalTarget = !props.target || props.target === '_self';
  const isRegularHtmlLink =
    !targetLink ||
    !isInternal ||
    !hasInternalTarget ||
    (isAnchorLink && router !== 'hash');

  if (!noBrokenLinkCheck && (isAnchorLink || !isRegularHtmlLink)) {
    brokenLinks.collectLink(targetLink);
  }
  if (props.id) {
    brokenLinks.collectAnchor(props.id);
  }

  if (isRegularHtmlLink) {
    return (
      <a
        ref={innerRef}
        href={targetLink}
        {...(targetLinkUnprefixed &&
          !isInternal &&
          !props.target && {rel: 'noopener noreferrer', target: '_blank'})}
        {...props}
      />
    );
  }

  const LinkComponent = isNavLink ? NavLink : RouterLink;
  return (
    <LinkComponent
      {...props}
      innerRef={(element) => {
        innerRef.current = element;
      }}
      to={targetLink!}
      {...(isNavLink && {activeClassName, isActive})}
    />
  );
}

export default forwardRef<HTMLAnchorElement, Props>(NoPrefetchLink);
