import { useEffect } from 'react';

// API
import { Kicl_ImageAgentAllowanceDocument, useQuery } from 'api/provider';

/** How often to check again while a turn is running. */
const POLL_MS = 3000;

/**
 * Whether a turn is running in one of the person's conversations. While one
 * is, a new conversation is refused, so this keeps checking until it ends.
 * The running list and the composer's allowance read the same query and
 * update with it.
 */
function useRunning() {
  const { data, startPolling, stopPolling } = useQuery(
    Kicl_ImageAgentAllowanceDocument,
    { fetchPolicy: 'cache-and-network' }
  );
  const busy = data?.imageAgentAllowance.busy ?? false;

  useEffect(() => {
    if (!busy) {
      return undefined;
    }
    startPolling(POLL_MS);
    return stopPolling;
  }, [busy, startPolling, stopPolling]);

  return busy;
}

export { useRunning };
