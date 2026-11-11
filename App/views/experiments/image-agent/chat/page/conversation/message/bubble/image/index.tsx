import React from 'react';

// Components
import { Card } from 'design/components';

// Context
import { useMessageContext } from '@/views/experiments/image-agent/chat/page/conversation/message/context';

// Partials
import { Picture } from './picture';
import { Review } from './review';

/** The picture a turn drew, with its review under it. */
const Image: React.FunctionComponent = () => {
  const { message } = useMessageContext();

  if (message.kind !== 'IMAGE' || (!message.asset?.url && !message.score)) {
    return null;
  }

  return (
    <Card is='section' size='fit' variant='secondary'>
      <Picture />
      <Review />
    </Card>
  );
};

export { Image };
