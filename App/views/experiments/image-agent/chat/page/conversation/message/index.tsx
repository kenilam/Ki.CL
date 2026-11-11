import React from 'react';

// Partials
import { Bubble } from './bubble';
import { Provider } from './context';

// Spec
import type { Message as MessageType } from '@/views/experiments/image-agent/chat/spec';

type Props = Pick<MessageType, 'id'>;

/** One turn. */
const Message: React.FunctionComponent<Props> = ({ id }) => {
  return (
    <Provider id={id}>
      <Bubble />
    </Provider>
  );
};

export { Message };
