// Components
import type { StatusProps } from 'design/components';

// Constants
import { CLASS_NAME as CONVERSATION } from '@/views/experiments/image-agent/chat/page/conversation/constants';

const CLASS_NAME = `${CONVERSATION}__message`;

/** Turns that did not end in a picture, and how each is shown. */
const NOTICES: {
  [kind in string]?: Pick<StatusProps, 'level'> & {
    context: 'failure' | 'refusal';
  };
} = {
  FAILURE: { context: 'failure', level: 'error' },
  REFUSAL: { context: 'refusal', level: 'warning' },
};

export { CLASS_NAME, NOTICES };
