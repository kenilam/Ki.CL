import { useCallback, useMemo, useRef, useState } from 'react';

/** How long the notice for a case given up stays up, in milliseconds. */
const NOTICE = 4000;

/** What the page shows about the arm: whether it has stopped, and the case it last gave up on. */
const useNotices = () => {
  const [stopped, setStopped] = useState(false);

  const alarm = useCallback(() => {
    setStopped(true);
  }, []);

  /** Clears the stop, once the arm has a way on again. */
  const calm = useCallback(() => {
    setStopped(false);
  }, []);

  // A case given up shows a notice for a few seconds, then it clears.
  const [skipped, setSkipped] = useState<string | null>(null);
  const clear = useRef<ReturnType<typeof setTimeout>>(undefined);

  /** Shows the notice that a case has no clear path, over that case. */
  const skip = useCallback((id: string) => {
    setSkipped(id);
    clearTimeout(clear.current);
    clear.current = setTimeout(() => setSkipped(null), NOTICE);
  }, []);

  return useMemo(
    () => ({ alarm, calm, skip, skipped, stopped }),
    [alarm, calm, skip, skipped, stopped]
  );
};

export { useNotices };
