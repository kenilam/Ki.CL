import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Bubble as Origin } from 'design/components';

// Context
import { useMessageContext } from '@/views/experiments/image-agent/chat/page/conversation/message/context';

// Partials
import { Body } from './body';
import { Choices } from './choices';
import { Image } from './image';
import { Notice } from './notice';
import { Role } from './role';

// Constants
import { CLASS_NAME } from '@/views/experiments/image-agent/chat/page/conversation/message/constants';

/**
 * The person's message is a bubble at the end of the line, the agent's is
 * plain text, and a refused or failed turn is a notice.
 */
const Bubble: React.FunctionComponent = () => {
  const { message } = useMessageContext();

  const mine = message.role === 'USER';

  return (
    <Origin
      is='li'
      className={classNames(
        CLASS_NAME,
        `${CLASS_NAME}--${message.role.toLowerCase()}`,
        // Each message slides in from its own side as it scrolls into view.
        {
          'kicl-margin-inline-start-auto': mine,
          'kicl-scroll-reveal-end': mine,
          'kicl-scroll-reveal-start': !mine,
        }
      )}
      variant={mine ? 'ghost' : 'tertiary'}
    >
      <Role />
      <Notice />
      <Body />
      <Choices />
      <Image />
    </Origin>
  );
};

export { Bubble };
