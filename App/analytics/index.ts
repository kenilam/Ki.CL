import { useClicks } from './use-clicks';
import { usePage } from './use-page';

/*
 * Global Privacy Control is how a browser says "do not track me". It is not
 * in the DOM types yet.
 */
const optedOut = () =>
  (navigator as Navigator & { globalPrivacyControl?: boolean })
    .globalPrivacyControl === true;

/**
 * Page views, engaged time, scroll depth and clicks, sent to `/collect`. No
 * cookies and nothing stored in the browser.
 */
function useAnalytics(path: string) {
  const enabled = !optedOut();

  usePage(enabled ? path : null);
  useClicks(enabled);
}

export { useAnalytics };
