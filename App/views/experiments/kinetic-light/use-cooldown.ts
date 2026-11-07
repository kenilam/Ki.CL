import { useEffect, useState } from 'react';

function useCooldown(nextAllowedAt: string | null | undefined) {
  const until = nextAllowedAt ? Date.parse(nextAllowedAt) : 0;
  const [, setTick] = useState(0);

  useEffect(() => {
    if (until <= Date.now()) {
      return;
    }

    const timer = setInterval(() => {
      setTick((tick) => tick + 1);

      if (until <= Date.now()) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [until]);

  return Math.max(0, Math.ceil((until - Date.now()) / 1000));
}

export { useCooldown };
