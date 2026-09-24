import { useEffect } from 'react';

import { enqueue, flush } from './queue';

/** Shorter visits are a StrictMode remount or a pass-through redirect. */
const MIN_ENGAGED_MS = 500;

let previousPath: string | undefined;

/**
 * One page view per path, with the time the page was visible and how far down
 * it was read, in quarters. Both are sent whenever the tab is hidden, since
 * that may be the last chance, and again when the route changes. A page can
 * send several `duration` rows to add up and several `scroll` rows to take the
 * largest of.
 */
function usePage(path: string | null) {
  useEffect(() => {
    if (path === null) {
      return;
    }

    if (previousPath !== path) {
      enqueue({
        type: 'pageview',
        path,
        referrer: previousPath ?? (document.referrer || undefined),
      });

      previousPath = path;
    }

    let engaged = 0;
    let since: number | null =
      document.visibilityState === 'visible' ? performance.now() : null;
    let depth = 0;

    const measure = () => {
      const { scrollHeight } = document.documentElement;
      const seen = (window.scrollY + window.innerHeight) / scrollHeight;

      depth = Math.max(depth, Math.min(4, Math.floor(seen * 4)) * 25);
    };

    const report = () => {
      if (since !== null) {
        engaged += performance.now() - since;
        since = null;
      }

      if (engaged >= MIN_ENGAGED_MS) {
        enqueue({ type: 'duration', path, value: engaged });
        engaged = 0;
      }

      if (depth) {
        enqueue({ type: 'scroll', path, value: depth });
      }

      flush();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        report();

        return;
      }

      since = performance.now();
    };

    measure();

    window.addEventListener('scroll', measure, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('scroll', measure);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      report();
    };
  }, [path]);
}

export { usePage };
