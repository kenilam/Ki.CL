import { useCallback } from 'react';

import { useApolloClient } from 'api/provider';

import { useSessionContext } from './context';

/**
 * For after the API cleared the cookies, on a sign-out or a deleted account.
 * An anonymous session is started in their place, and then every query on
 * the page is asked again for the visitor it now is. No page load.
 */
function useEnded() {
  const client = useApolloClient();
  const { restart } = useSessionContext();

  return useCallback(async () => {
    await restart();

    // A query the visitor can no longer run fails here and shows that itself.
    await client.resetStore().catch(() => undefined);
  }, [client, restart]);
}

export { useEnded };
