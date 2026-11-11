import { useCallback, useEffect, useMemo, useState } from 'react';

// API
import {
  Kicl_ImageAgentThreadDocument,
  Kicl_ImageAgentThreadUpdatedDocument,
  useQuery,
  useSubscription,
} from 'api/provider';

// Routes
import { useLocation, useParams } from 'design/router';

// Hooks
import { useCatchUp } from './use-catch-up';

// Spec
import type { Thread } from '@/views/experiments/image-agent/chat/spec';

// Constants
import { PARAM } from '@/views/experiments/image-agent/constants';

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
 * The conversation the URL names. The query says what exists now; the
 * subscription pushes the whole thread on every change while it is open; a
 * send hands its reply in through `accept`, and the route state carries the
 * reply that started it. Whichever copy is newest is the one shown.
 */
function useThread(): ThreadState {
  const { [PARAM]: id = '' } = useParams();
  const seed = (useLocation().state as { thread?: Thread } | null)?.thread;
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
    const next = live?.imageAgentThreadUpdated;
    if (next && next.id === id) {
      setPushed((current) => newest(current, next));
    }
  }, [id, live]);

  useCatchUp(refetch);

  const accept = useCallback((thread: Thread) => {
    setPushed((current) => newest(current, thread));
  }, []);

  const queried = data?.imageAgentThread;
  const thread = pushed?.id === id ? newest(queried, pushed) : queried;

  const waiting = loading && !thread;

  return useMemo(() => {
    return { accept, error, loading: waiting, thread };
  }, [accept, error, thread, waiting]);
}

export { useThread };
