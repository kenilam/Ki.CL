import { useCallback } from 'react';

// API
import {
  Kicl_ImageAgentNotificationsDocument,
  Kicl_ImageAgentRetryDocument,
  Kicl_ImageAgentSendDocument,
  useMutation,
} from 'api/provider';

// Session
import { isChallenge, useChallenged } from '@/session';

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
  // A new turn starts, which the notifications at the root watch for.
  const [mutate, sent] = useMutation(Kicl_ImageAgentSendDocument, {
    refetchQueries: [Kicl_ImageAgentNotificationsDocument],
  });
  const [again, retried] = useMutation(Kicl_ImageAgentRetryDocument, {
    refetchQueries: [Kicl_ImageAgentNotificationsDocument],
  });
  const challenged = useChallenged();

  const send = useCallback(
    async (text: string) => {
      try {
        const { data } = await challenged(() =>
          mutate({ variables: { text, threadId } })
        );
        if (!data?.imageAgentSend) {
          return false;
        }
        onSent(data.imageAgentSend);
        return true;
      } catch {
        // Surfaced through `error`.
        return false;
      }
    },
    [challenged, mutate, onSent, threadId]
  );

  /** Go back to one of the person's messages and ask it again. */
  const retry = useCallback(
    async (messageId: string) => {
      try {
        const { data } = await challenged(() =>
          again({ variables: { messageId, threadId } })
        );
        if (!data?.imageAgentRetry) {
          return false;
        }
        onSent(data.imageAgentRetry);
        return true;
      } catch {
        // Surfaced through `error`.
        return false;
      }
    },
    [again, challenged, onSent, threadId]
  );

  // A check the session gate is running is not an error to show.
  const error = retried.error ?? sent.error;

  return {
    error: isChallenge(error) ? undefined : error,
    loading: sent.loading || retried.loading,
    retry,
    send,
  };
}

export { useChat };
