import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Bubble } from 'design/components';

// Partials
import { Activity } from './activity';
import { Elapsed } from './elapsed';

// Constants
import { CLASS_NAME as CONVERSATION } from '@/views/experiments/image-agent/chat/page/conversation/constants';

const CLASS_NAME = `${CONVERSATION}__pending`;

/**
 * Shown until the agent replies: the step it is on, animated in as each one
 * starts, and the seconds elapsed since the person's message was sent.
 */
const Pending: React.FunctionComponent = () => {
  return (
    <Bubble
      is='li'
      className={classNames(CLASS_NAME, 'kicl-scroll-reveal-start')}
      variant='tertiary'
    >
      <Activity />
      <Elapsed />
    </Bubble>
  );
};

export { Pending };
