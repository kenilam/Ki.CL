import { useEffect, useState } from 'react';

/** Seconds without the pointer moving before the chrome fades. */
const IDLE_SECONDS = 4;

const EVENTS = ['pointermove', 'pointerdown', 'keydown', 'touchstart'];

/**
 * Whether the listener has been still for a few seconds. Only counts while
 * `active`: while a track loads, or has not started, the chrome stays up.
 */
export function useIdle(active: boolean): boolean {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if (!active) {
      setIdle(false);

      return;
    }

    let timer = 0;

    const arm = () => {
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdle(true), IDLE_SECONDS * 1000);
    };

    EVENTS.forEach((event) => window.addEventListener(event, arm));
    arm();

    return () => {
      window.clearTimeout(timer);
      EVENTS.forEach((event) => window.removeEventListener(event, arm));
    };
  }, [active]);

  return idle;
}
