type OutboundDestinationType =
  | 'connector_repository'
  | 'documentation_repository'
  | 'release_download_intent';

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      parameters: Record<string, string>,
    ) => void;
  }
}

let isTrackingInitialized = false;

function getDestinationType(url: URL): OutboundDestinationType | undefined {
  if (url.hostname !== 'github.com') {
    return undefined;
  }

  if (url.pathname.startsWith('/coffeehc/xagent-releases/releases')) {
    return 'release_download_intent';
  }

  if (url.pathname.startsWith('/coffeehc/xagent-connectors')) {
    return 'connector_repository';
  }

  if (url.pathname.startsWith('/coffeehc/xagent-docs')) {
    return 'documentation_repository';
  }

  return undefined;
}

function trackOutboundClick(event: MouseEvent): void {
  if (event.defaultPrevented) {
    return;
  }

  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const link = target.closest<HTMLAnchorElement>('a[href]');
  if (!link) {
    return;
  }

  const destinationType = getDestinationType(new URL(link.href));
  if (!destinationType) {
    return;
  }

  window.gtag?.('event', 'xagent_outbound_click', {
    destination_type: destinationType,
    link_text: link.textContent?.trim() || link.href,
    link_url: link.href,
  });
}

export function onRouteDidUpdate(): void {
  if (isTrackingInitialized) {
    return;
  }

  isTrackingInitialized = true;
  document.addEventListener('click', trackOutboundClick);
}
