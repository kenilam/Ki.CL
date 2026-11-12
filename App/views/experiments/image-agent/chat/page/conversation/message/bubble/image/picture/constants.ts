import { CLASS_NAME as MESSAGE } from '@/views/experiments/image-agent/chat/page/conversation/message/constants';

const CLASS_NAME = `${MESSAGE}__picture`;

const toFullId = (id: string) => {
  return `${CLASS_NAME}__full--${id}`;
};

export { CLASS_NAME, toFullId };
