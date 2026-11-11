import { useCallback, useEffect, useState } from 'react';

// Context
import { useThreadContext } from '@/views/experiments/image-agent/chat/context/thread';

/**
 * Whether a message arrived while the page was open. Messages already there
 * when the thread first loaded show in full; later ones animate in.
 */
function useFresh() {
  const { thread } = useThreadContext();
  const [loaded, setLoaded] = useState<ReadonlySet<string> | null>(null);

  useEffect(() => {
    setLoaded(null);
  }, [thread?.id]);

  useEffect(() => {
    if (thread && !loaded) {
      setLoaded(new Set(thread.messages.map(({ id }) => id)));
    }
  }, [loaded, thread]);

  return useCallback(
    (id: string) => {
      return Boolean(loaded) && !loaded?.has(id);
    },
    [loaded]
  );
}

export { useFresh };
