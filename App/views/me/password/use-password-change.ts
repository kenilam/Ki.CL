import { useCallback, useState } from 'react';

import {
  Kicl_NotificationsDocument,
  Kicl_PasswordChangeCompleteDocument,
  Kicl_PasswordChangeDocument,
  Kicl_PasswordChangeRequestDocument,
  Kicl_PasswordChangeUpdatedDocument,
  skipToken,
  useMutation,
  useQuery,
  useSubscription,
} from 'api/provider';

// Routes
import { useLocation } from 'design/router';

// Schema
import type { PasswordValues } from './schema';

// Constants
import { PAGE_PATH } from './constants';

type Stage =
  'loading' | 'idle' | 'waiting' | 'saving' | 'done' | 'expired' | 'failed';

/**
 * A password change confirmed by email. `start` has the API check the
 * current password, keep the new one and send the link, then a subscription
 * waits for the link to be opened.
 *
 * It runs at the root, so the wait carries on after the page is left. Only the
 * tab that had the page open waits: the link opens the site in another tab,
 * and if both completed the change, one of them would fail. On the page it
 * asks the API for a request that is still open, so a reload there carries on.
 */
function usePasswordChange() {
  const here = useLocation().pathname === PAGE_PATH;

  // What this tab did since it opened the page. Until then, the API's answer decides.
  const [local, setLocal] = useState<{ id: string; stage: Stage }>();

  const { data, loading } = useQuery(
    Kicl_PasswordChangeDocument,
    here ? { fetchPolicy: 'network-only' } : skipToken
  );

  const open = here ? data?.passwordChange : undefined;
  const id = local?.id ?? open?.id ?? '';
  const stage =
    local?.stage ?? (loading ? 'loading' : open ? 'waiting' : 'idle');
  const busy = stage === 'waiting' || stage === 'saving';

  // Kept once the page has found it, so leaving the page doesn't end the wait.
  if (open && !local) {
    setLocal({ id: open.id, stage: 'waiting' });
  }

  // Leaving the page after it showed how the change ended puts the form back for next time.
  const [wasHere, setWasHere] = useState(here);

  if (wasHere !== here) {
    setWasHere(here);

    if (wasHere && !busy) {
      setLocal(undefined);
    }
  }

  const [request] = useMutation(Kicl_PasswordChangeRequestDocument, {
    refetchQueries: [Kicl_NotificationsDocument],
  });
  const [complete] = useMutation(Kicl_PasswordChangeCompleteDocument, {
    refetchQueries: [Kicl_NotificationsDocument],
  });

  /** Rejects with the API's error, for the form to show. */
  const start = useCallback(
    async (values: PasswordValues) => {
      const { data } = await request({
        variables: { passwordChangeRequest: values },
      });

      if (data) {
        setLocal({ id: data.passwordChangeRequest.id, stage: 'waiting' });
      }
    },
    [request]
  );

  const finish = useCallback(async () => {
    setLocal({ id, stage: 'saving' });

    try {
      await complete({ variables: { passwordChangeComplete: { id } } });
      setLocal({ id, stage: 'done' });
    } catch {
      setLocal({ id, stage: 'failed' });
    }
  }, [complete, id]);

  // Only open while waiting, so the API stops watching once this has its answer.
  useSubscription(Kicl_PasswordChangeUpdatedDocument, {
    onData: ({ data: { data } }) => {
      const status = data?.passwordChangeUpdated.status;

      if (status === 'CONFIRMED') {
        void finish();
      }

      if (status === 'EXPIRED') {
        setLocal({ id, stage: 'expired' });
      }
    },
    onError: () => setLocal({ id, stage: 'failed' }),
    skip: stage !== 'waiting',
    variables: { id },
  });

  const reset = useCallback(() => setLocal({ id: '', stage: 'idle' }), []);

  return { reset, stage, start };
}

export { usePasswordChange };
