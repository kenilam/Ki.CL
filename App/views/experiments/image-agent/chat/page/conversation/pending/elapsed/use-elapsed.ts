import { useEffect, useState } from 'react';

/** Whole seconds since `since`, counting up once a second while mounted. */
function useElapsed(since: string | number | Date | undefined): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (since === undefined) {
    return 0;
  }

  return Math.max(0, Math.floor((now - new Date(since).getTime()) / 1000));
}

export { useElapsed };
