import React from 'react';

// Components
import { Animation, List } from 'design/components';

// Partials
import { Choice } from './choice';

// Hooks
import { useShown } from './use-shown';

// Context
import { useMessageContext } from '@/views/experiments/image-agent/chat/page/conversation/message/context';

// Constants
import { CLASS_NAME as MESSAGE } from '@/views/experiments/image-agent/chat/page/conversation/message/constants';

const CLASS_NAME = `${MESSAGE}__choices`;

/**
 * Replies to a question the person can pick instead of typing. Only on the
 * last message, while the agent is idle.
 */
const Choices: React.FunctionComponent = () => {
  const shown = useShown();
  const { message } = useMessageContext();

  if (!shown) {
    return null;
  }

  return (
    <Animation property='slide-from-top'>
      <List is='ul' className={CLASS_NAME} display='flex' gap='narrower' wrap>
        {message.choices.map((choice) => {
          return <Choice choice={choice} key={choice} />;
        })}
      </List>
    </Animation>
  );
};

export { Choices };
