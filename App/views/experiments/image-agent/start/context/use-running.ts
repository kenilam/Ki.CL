// API
import { Kicl_ImageAgentAllowanceDocument, useQuery } from 'api/provider';

/**
 * Whether a turn is running in one of the person's conversations. While one
 * is, a new conversation is refused. Each running thread in the list follows
 * its own updates and fetches this again when its turn ends.
 */
function useRunning() {
  const { data } = useQuery(Kicl_ImageAgentAllowanceDocument, {
    fetchPolicy: 'cache-and-network',
  });

  return data?.imageAgentAllowance.busy ?? false;
}

export { useRunning };
