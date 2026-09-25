import { CLASS_NAME as CHAT } from '@/views/experiments/image-agent/chat/constants';

const CLASS_NAME = `${CHAT}__conversation`;

const COPY = {
  agent: 'Agent',
  unreachable:
    'Could not reach the conversation. Check your connection and reload.',
  unreachableTitle: 'Connection problem',
  limited: 'Too many requests for now. Try again later.',
  limitedTitle: 'Slow down',
  you: 'You',
};

export { CLASS_NAME, COPY };
