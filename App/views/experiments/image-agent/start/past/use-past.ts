// API
import { Kicl_ImageAgentThreadsDocument, useQuery } from 'api/provider';

/** How many past conversations to list. */
const LIMIT = 20;

/**
 * The person's conversations with no turn running, most recent first. Fetched
 * again on every mount, so one that just finished shows up. Skips conversations
 * with no message from the person left in them, which happens when their only
 * message was refused.
 */
function usePast() {
  const { data } = useQuery(Kicl_ImageAgentThreadsDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { limit: LIMIT },
  });

  return (data?.ImageAgentThreads ?? []).filter(
    ({ messages, status }) =>
      status === 'IDLE' && messages.some(({ role }) => role === 'USER')
  );
}

export { usePast };
