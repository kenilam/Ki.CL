import { useEffect } from 'react';

/*
 * A socket that drops while the phone sleeps or the network changes misses
 * every update sent in the meantime, and reconnecting does not replay them.
 * Fetch the thread again when the page is back in view or back online.
 */
function useCatchUp(refetch: () => unknown) {
  useEffect(() => {
    const catchUp = () => {
      if (document.visibilityState === 'visible') {
        void refetch();
      }
    };
    document.addEventListener('visibilitychange', catchUp);
    window.addEventListener('online', catchUp);
    return () => {
      document.removeEventListener('visibilitychange', catchUp);
      window.removeEventListener('online', catchUp);
    };
  }, [refetch]);
}

export { useCatchUp };
