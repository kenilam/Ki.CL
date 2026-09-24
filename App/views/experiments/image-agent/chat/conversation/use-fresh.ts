import { useEffect, useState } from 'react';

// Spec
import type { Thread } from './spec';

/**
 * Whether a message arrived while the page was open. Messages already there
 * when the thread first loaded show in full; later ones animate in.
 */
function useFresh(thread: Thread | null | undefined) {
  const [loaded, setLoaded] = useState<ReadonlySet<string> | null>(null);

  useEffect(() => {
    setLoaded(null);
  }, [thread?.id]);

  useEffect(() => {
    if (thread && !loaded) {
      setLoaded(new Set(thread.messages.map(({ id }) => id)));
    }
  }, [loaded, thread]);

  return (id: string) => Boolean(loaded) && !loaded?.has(id);
}

export { useFresh };
