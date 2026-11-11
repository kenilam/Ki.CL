import { useCallback } from 'react';

// API
import {
  Kicl_NotificationsDocument,
  Kicl_ImageAgentSendDocument,
  useMutation,
} from 'api/provider';

// Routes
import { useNavigate } from 'design/router';

// Session
import { isChallenge, useChallenged } from '@/session';

// Constants
import { toPath } from '@/views/experiments/image-agent/constants';

/**
 * Starts a conversation, then opens it. The reply goes along in the route state
 * so the chat can show it before its own query returns.
 */
function useStart() {
  const navigate = useNavigate();
  // A new turn starts, which the notifications at the root watch for.
  const [mutate, { error, loading }] = useMutation(
    Kicl_ImageAgentSendDocument,
    { refetchQueries: [Kicl_NotificationsDocument] }
  );
  const challenged = useChallenged();

  const send = useCallback(
    async (text: string) => {
      try {
        const { data } = await challenged(() =>
          mutate({ variables: { text, threadId: null } })
        );
        const thread = data?.imageAgentSend;
        if (!thread) {
          return false;
        }
        navigate(toPath(thread.id), { state: { thread } });
        return true;
      } catch {
        // Surfaced through `error`.
        return false;
      }
    },
    [challenged, mutate, navigate]
  );

  // A check the session gate is running is not an error to show.
  return { error: isChallenge(error) ? undefined : error, loading, send };
}

export { useStart };
