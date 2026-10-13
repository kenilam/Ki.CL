import { useEffect, useState } from 'react';

// Constants
import { TICK_MS } from './constants';

/** The time, kept current while the page is open. */
export function useNow(): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), TICK_MS);

    return () => window.clearInterval(timer);
  }, []);

  return now;
}
