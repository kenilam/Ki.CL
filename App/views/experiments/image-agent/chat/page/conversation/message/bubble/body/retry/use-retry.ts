// Context
import {
  useChoosingContext,
  useSenderContext,
  useThreadContext,
} from '@/views/experiments/image-agent/chat/context';
import { useMessageContext } from '@/views/experiments/image-agent/chat/page/conversation/message/context';

/**
 * Beside each of the person's messages while nothing is running, once there
 * are two of them. Asks that message again.
 */
const useRetry = () => {
  const choosing = useChoosingContext();
  const { retry } = useSenderContext();
  const { thread } = useThreadContext();
  const { message } = useMessageContext();

  // Rewinding needs at least two messages from the person.
  const rewindable =
    (thread?.messages ?? []).filter((each) => {
      return each.role === 'USER';
    }).length > 1;

  return {
    again: () => {
      void retry(message.id);
    },
    shown: choosing && rewindable && message.role === 'USER',
  };
};

export { useRetry };
