// API
import { Kicl_ImageAgentAllowanceDocument, useQuery } from 'api/provider';

// Context
import { useBusyContext } from '@/views/experiments/image-agent/chat/context/busy';
import { useSenderContext } from '@/views/experiments/image-agent/chat/context/sender';

/** Choices on the last question can be picked right now. */
const useChoosing = (): boolean => {
  const busy = useBusyContext();
  const { loading } = useSenderContext();
  const { data } = useQuery(Kicl_ImageAgentAllowanceDocument);
  const spent = data?.imageAgentAllowance.remaining === 0;

  return !busy && !spent && !loading;
};

export { useChoosing };
