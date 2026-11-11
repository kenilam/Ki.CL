// Context
import {
  useChoosingContext,
  useThreadContext,
} from '@/views/experiments/image-agent/chat/context';
import { useMessageContext } from '@/views/experiments/image-agent/chat/page/conversation/message/context';

/** Only on the last message, while the agent is idle. */
const useShown = (): boolean => {
  const choosing = useChoosingContext();
  const { thread } = useThreadContext();
  const { message } = useMessageContext();
  const last = thread?.messages.at(-1)?.id === message.id;

  return choosing && last && message.choices.length > 0;
};

export { useShown };
