import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Partials
import { log as kept } from './store';

// Spec
import type { Entry, Step } from '@/views/experiments/factory-arm/spec';

/** How many steps the log keeps, across runs and visits; the oldest go first. */
const LIMIT = 1000;

/** Every step the cell took, across runs, and kept in this browser across visits. */
const useLog = () => {
  // Earlier visits' runs come back from this browser; this visit's carry on from them.
  const [log, setLog] = useState<Entry[]>(kept.read);
  const counted = useRef(Math.max(0, ...log.map(({ id }) => id)));
  // The run a step belongs to, read as it's logged rather than when `note` was made.
  const current = useRef(
    log.length ? Math.max(...log.map(({ run }) => run)) + 1 : 0
  );

  useEffect(() => kept.write(log), [log]);

  /** Logs a step; `start` marks the one that started its run. */
  const note = useCallback(
    (step: Step, level?: Entry['level'], start?: boolean) => {
      counted.current += 1;

      const entry = {
        at: Date.now(),
        id: counted.current,
        level,
        note: step,
        run: current.current,
        start,
      };

      setLog((current) => [entry, ...current].slice(0, LIMIT));
    },
    []
  );

  /** Starts the next run in the log with the step that started it. */
  const begin = useCallback(
    (step: Step) => {
      current.current += 1;
      note(step, 'info', true);
    },
    [note]
  );

  const clearLog = useCallback(() => {
    setLog([]);
  }, []);

  return useMemo(
    () => ({ begin, clearLog, log, note }),
    [begin, clearLog, log, note]
  );
};

export { useLog };
