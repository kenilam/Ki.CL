import { useCallback } from 'react';

// API
import {
  Kicl_ImageAgentRetryDocument,
  Kicl_ImageAgentSendDocument,
  useMutation,
} from 'api/provider';

// Spec
import type { Thread } from './conversation/spec';

type Options = {
  onSent: (thread: Thread) => void;
  threadId: string;
};

/**
 * Reply in a conversation, or run a failed turn again. The composer, the
 * choices on a question and the retry on a failure all use this, so they
 * show the same error and wait on the same request. Each resolves to
 * whether the agent accepted it.
 */
function useChat({ onSent, threadId }: Options) {
  const [mutate, sent] = useMutation(Kicl_ImageAgentSendDocument);
  const [again, retried] = useMutation(Kicl_ImageAgentRetryDocument);

  const send = useCallback(
    async (text: string) => {
      try {
        const { data } = await mutate({ variables: { text, threadId } });
        if (!data?.ImageAgentSend) {
          return false;
        }
        onSent(data.ImageAgentSend);
        return true;
      } catch {
        // Surfaced through `error`.
        return false;
      }
    },
    [mutate, onSent, threadId]
  );

  /** Go back to one of the person's messages and ask it again. */
  const retry = useCallback(
    async (messageId: string) => {
      try {
        const { data } = await again({ variables: { messageId, threadId } });
        if (!data?.ImageAgentRetry) {
          return false;
        }
        onSent(data.ImageAgentRetry);
        return true;
      } catch {
        // Surfaced through `error`.
        return false;
      }
    },
    [again, onSent, threadId]
  );

  return {
    error: retried.error ?? sent.error,
    loading: sent.loading || retried.loading,
    retry,
    send,
  };
}

export { useChat };
