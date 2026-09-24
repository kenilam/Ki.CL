import { useCallback, useEffect, useState } from 'react';

// API
import {
  Kicl_ImageAgentThreadDocument,
  Kicl_ImageAgentThreadUpdatedDocument,
  useQuery,
  useSubscription,
} from 'api/provider';

// Spec
import type { Thread } from './spec';

export type ThreadState = {
  /** Accepts a thread from elsewhere, such as the reply to a send. */
  accept: (thread: Thread) => void;
  error: Error | undefined;
  loading: boolean;
  thread: Thread | null | undefined;
};

/** The later of two copies of the same conversation. */
function newest(a: Thread | null | undefined, b: Thread | null | undefined) {
  if (!a || (b && a.id !== b.id)) {
    return b ?? null;
  }
  if (!b) {
    return a;
  }
  return b.updatedAt >= a.updatedAt ? b : a;
}

/**
 * The conversation by id. The query says what exists now; the subscription
 * pushes the whole thread on every change while it is open; a send hands its
 * reply in through `accept`, and `seed` is the reply that started it. Whichever
 * copy is newest is the one shown.
 */
function useThread(id: string, seed?: Thread): ThreadState {
  const [pushed, setPushed] = useState<Thread | null>(seed ?? null);

  const { data, error, loading, refetch } = useQuery(
    Kicl_ImageAgentThreadDocument,
    {
      variables: { id },
      fetchPolicy: 'cache-and-network',
    }
  );

  const { data: live } = useSubscription(Kicl_ImageAgentThreadUpdatedDocument, {
    variables: { id },
  });

  useEffect(() => {
    const next = live?.ImageAgentThreadUpdated;
    if (next && next.id === id) {
      setPushed((current) => newest(current, next));
    }
  }, [id, live]);

  /*
   * A socket that drops while the phone sleeps or the network changes misses
   * every update sent in the meantime, and reconnecting does not replay them.
   * Fetch the thread again when the page is back in view or back online.
   */
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

  const accept = useCallback((thread: Thread) => {
    setPushed((current) => newest(current, thread));
  }, []);

  const queried = data?.ImageAgentThread;
  const thread = pushed?.id === id ? newest(queried, pushed) : queried;

  return { accept, error, loading: loading && !thread, thread };
}

export { useThread };
