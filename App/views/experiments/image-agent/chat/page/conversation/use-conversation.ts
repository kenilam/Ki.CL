// Context
import { useThreadContext } from '@/views/experiments/image-agent/chat/context';

// Hooks
import { useStickToBottom } from './use-stick-to-bottom';

const useConversation = () => {
  const { error, loading, thread } = useThreadContext();

  // The person's latest message. It changes when they send.
  const sent = [...(thread?.messages ?? [])]
    .reverse()
    .find((message) => message.role === 'USER')?.id;
  const list = useStickToBottom<HTMLElement>(sent);

  return { error, list, loading, thread };
};

export { useConversation };
