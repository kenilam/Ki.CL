import React from 'react';

// Components
import { List } from 'design/components';

// Context
import { useMessageContext } from '@/views/experiments/image-agent/chat/page/conversation/message/context';

// Partials
import { Row } from './row';

// Constants
import { ROWS } from './constants';

const Scores: React.FunctionComponent = () => {
  const { score } = useMessageContext().message;

  if (!score) {
    return null;
  }

  return (
    <List gap='narrower' className='kicl-inline-size-md'>
      {ROWS.map(({ key }) => {
        return <Row key={key} score={key} />;
      })}
    </List>
  );
};

export { Scores };
