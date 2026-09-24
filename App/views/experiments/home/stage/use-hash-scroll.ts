import { useEffect } from 'react';

/**
 * Jumps to the panel named in the hash on first load. The router scrolls to
 * a hash after each navigation, but on a fresh load this view is still
 * behind Suspense then, so the target does not exist yet.
 */
const useHashScroll = () => {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));

    if (!id) {
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
  }, []);
};

export { useHashScroll };
