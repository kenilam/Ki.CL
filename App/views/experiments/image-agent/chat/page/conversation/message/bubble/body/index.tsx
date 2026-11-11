import React from 'react';

// Components
import { Layout } from 'design/components';

// Partials
import { Retry } from './retry';
import { Words } from './words';

// Context
import { useMessageContext } from '@/views/experiments/image-agent/chat/page/conversation/message/context';

// Constants
import { NOTICES } from '@/views/experiments/image-agent/chat/page/conversation/message/constants';

/** The turn's text, unless the turn is a notice. */
const Body: React.FunctionComponent = () => {
  const { message } = useMessageContext();

  if (!message.text || NOTICES[message.kind]) {
    return null;
  }

  return (
    <Layout
      alignItems='center'
      autoFlow='column'
      gap='narrowest'
      justifyContent='end'
    >
      {/* Puts the retry button beside the text, outside its bubble. */}
      <p>
        <Retry />
        <Words />
      </p>
    </Layout>
  );
};

export { Body };
