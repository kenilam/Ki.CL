import { useCallback, useState } from 'react';

import {
  Kicl_PasswordChangeCompleteDocument,
  Kicl_PasswordChangeDocument,
  Kicl_PasswordChangeRequestDocument,
  Kicl_PasswordChangeUpdatedDocument,
  useMutation,
  useQuery,
  useSubscription,
} from 'api/provider';

// Schema
import type { PasswordValues } from './schema';

type Stage =
  'loading' | 'idle' | 'waiting' | 'saving' | 'done' | 'expired' | 'failed';

/**
 * A password change confirmed by email. `start` has the API check the
 * current password, keep the new one and send the link, then a subscription
 * waits for the link to be opened.
 *
 * Nothing about the request is kept in the page. On load it asks the API for
 * one that is still open, so a reload carries on waiting.
 */
function usePasswordChange() {
  // What this page did since it loaded. Until then, the API's answer decides.
  const [local, setLocal] = useState<{ id: string; stage: Stage }>();

  const { data, loading } = useQuery(Kicl_PasswordChangeDocument, {
    fetchPolicy: 'network-only',
  });

  const open = data?.PasswordChange;
  const id = local?.id ?? open?.id ?? '';
  const stage =
    local?.stage ?? (loading ? 'loading' : open ? 'waiting' : 'idle');

  const [request] = useMutation(Kicl_PasswordChangeRequestDocument);
  const [complete] = useMutation(Kicl_PasswordChangeCompleteDocument);

  /** Rejects with the API's error, for the form to show. */
  const start = useCallback(
    async (values: PasswordValues) => {
      const { data } = await request({
        variables: { PasswordChangeRequest: values },
      });

      if (data) {
        setLocal({ id: data.PasswordChangeRequest.id, stage: 'waiting' });
      }
    },
    [request]
  );

  const finish = useCallback(async () => {
    setLocal({ id, stage: 'saving' });

    try {
      await complete({ variables: { PasswordChangeComplete: { id } } });
      setLocal({ id, stage: 'done' });
    } catch {
      setLocal({ id, stage: 'failed' });
    }
  }, [complete, id]);

  // Only open while waiting, so the API stops watching once this has its answer.
  useSubscription(Kicl_PasswordChangeUpdatedDocument, {
    onData: ({ data: { data } }) => {
      const status = data?.PasswordChangeUpdated.status;

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
