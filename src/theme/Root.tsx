import {useEffect} from 'react';
import type {ReactNode} from 'react';
import type {Props} from '@theme/Root';

import {ImageLightboxProvider} from '@site/src/components/ImageLightbox';

const releaseRepositoryPath = '/coffeehc/xagent-releases';
const contactEmail = 'data@yaoankeji.com';
const installerScriptFragment =
  'downloads.xagent.xiagaogao.com/scripts/install.sh';
const installerCopyLabels = new Set([
  'Copy install command',
  'Install command copied',
  '复制安装命令',
  '安装命令已复制',
]);

type AnalyticsWindow = Window & {
  gtag?: (
    command: 'event',
    eventName: string,
    parameters: Record<string, string>,
  ) => void;
};

function sendAnalyticsEvent(
  eventName: string,
  parameters: Record<string, string>,
): void {
  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.gtag?.('event', eventName, {
    page_path: window.location.pathname,
    site_locale: document.documentElement.lang || 'unknown',
    ...parameters,
  });
}

export default function Root({children}: Props): ReactNode {
  useEffect(() => {
    function handleClick(event: MouseEvent): void {
      if (!(event.target instanceof Element)) {
        return;
      }

      const anchor = event.target.closest('a[href]');
      if (anchor instanceof HTMLAnchorElement) {
        const href = anchor.getAttribute('href') ?? '';
        const normalizedHref = href.toLowerCase();

        if (normalizedHref.startsWith('mailto:')) {
          const emailAddress = normalizedHref
            .slice('mailto:'.length)
            .split('?')[0];

          if (emailAddress === contactEmail) {
            sendAnalyticsEvent('contact_email_click', {
              link_url: anchor.href,
            });
            return;
          }
        }

        const url = new URL(anchor.href);
        const isReleaseRepository =
          url.hostname === 'github.com' &&
          (url.pathname === releaseRepositoryPath ||
            url.pathname.startsWith(`${releaseRepositoryPath}/`));

        if (isReleaseRepository) {
          sendAnalyticsEvent('visit_release_repository', {
            link_url: url.href,
            link_path: url.pathname,
          });
          return;
        }
      }

      const button = event.target.closest('button');
      if (!(button instanceof HTMLButtonElement)) {
        return;
      }

      const copyLabel = button.getAttribute('aria-label') ?? '';
      const codeBlock = button.closest('.theme-code-block');
      const isInstallerCopy =
        installerCopyLabels.has(copyLabel) ||
        codeBlock?.textContent?.includes(installerScriptFragment);

      if (isInstallerCopy) {
        sendAnalyticsEvent('copy_install_command', {
          install_source: codeBlock ? 'documentation' : 'homepage',
        });
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return <ImageLightboxProvider>{children}</ImageLightboxProvider>;
}
