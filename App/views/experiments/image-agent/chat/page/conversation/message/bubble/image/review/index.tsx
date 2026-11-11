import React from 'react';

// Components
import { Card, Details } from 'design/components';

// Partials
import { Scores } from './scores';
import { Suggestions } from './suggestions';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useMessageContext } from '@/views/experiments/image-agent/chat/page/conversation/message/context';

// Constants
import { CLASS_NAME as MESSAGE } from '@/views/experiments/image-agent/chat/page/conversation/message/constants';

const CLASS_NAME = `${MESSAGE}__review`;

/** The vision model's score: one summary line, the breakdown in a disclosure. */
const Review: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const { message } = useMessageContext();

  if (!message.score) {
    return null;
  }

  return (
    <Card className='kicl-contain-inline-size' is='section'>
      <Details
        className={CLASS_NAME}
        summary={t('scored', {
          context: message.score.pass ? 'pass' : 'fail',
          overall: message.score.overall,
        })}
      >
        <Scores />
        <Suggestions />
      </Details>
    </Card>
  );
};

export { Review };
