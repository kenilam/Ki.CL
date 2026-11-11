import { useCallback, useMemo } from 'react';

// API
import {
  Kicl_NotificationsDocument,
  Kicl_ImageAgentRetryDocument,
  Kicl_ImageAgentSendDocument,
  useMutation,
} from 'api/provider';

// Routes
import { useParams } from 'design/router';

// Session
import { isChallenge, useChallenged } from '@/session';

// Context
import { useThreadContext } from '@/views/experiments/image-agent/chat/context/thread';

// Constants
import { PARAM } from '@/views/experiments/image-agent/constants';

/**
 * Reply in a conversation, or run a failed turn again. The composer, the
 * choices on a question and the retry on a failure all use this, so they
 * show the same error and wait on the same request. Each resolves to
 * whether the agent accepted it.
 */
function useChat() {
  const { accept: onSent } = useThreadContext();
  const { [PARAM]: threadId = '' } = useParams();
  // A new turn starts, which the notifications at the root watch for.
  const [mutate, sent] = useMutation(Kicl_ImageAgentSendDocument, {
    refetchQueries: [Kicl_NotificationsDocument],
  });
  const [again, retried] = useMutation(Kicl_ImageAgentRetryDocument, {
    refetchQueries: [Kicl_NotificationsDocument],
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

  const shown = isChallenge(error) ? undefined : error;
  const loading = sent.loading || retried.loading;

  return useMemo(() => {
    return { error: shown, loading, retry, send };
  }, [loading, retry, send, shown]);
}

export { useChat };
