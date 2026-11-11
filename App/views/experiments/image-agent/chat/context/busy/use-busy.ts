// API
import { Kicl_ImageAgentAllowanceDocument, useQuery } from 'api/provider';

// Context
import { useThreadContext } from '@/views/experiments/image-agent/chat/context/thread';

// Hooks
import { useCooldown } from './use-cooldown';

/** A turn is running, or the API would still turn a message away as too soon. */
const useBusy = (): boolean => {
  const { thread } = useThreadContext();
  const { data } = useQuery(Kicl_ImageAgentAllowanceDocument);
  const cooling = useCooldown(data?.imageAgentAllowance.nextAllowedAt);

  return (Boolean(thread) && thread?.status !== 'IDLE') || cooling;
};

export { useBusy };
