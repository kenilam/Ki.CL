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

  const { data, error, loading } = useQuery(Kicl_ImageAgentThreadDocument, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  const { data: live } = useSubscription(Kicl_ImageAgentThreadUpdatedDocument, {
    variables: { id },
  });

  useEffect(() => {
    const next = live?.ImageAgentThreadUpdated;
    if (next && next.id === id) {
      setPushed((current) => newest(current, next));
    }
  }, [id, live]);

  const accept = useCallback((thread: Thread) => {
    setPushed((current) => newest(current, thread));
  }, []);

  const queried = data?.ImageAgentThread;
  const thread = pushed?.id === id ? newest(queried, pushed) : queried;

  return { accept, error, loading: loading && !thread, thread };
}

export { useThread };
