import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { List, Spinner } from 'design/components';

// Routes
import { Navigate } from 'design/router';

// Partials
import { Failure } from './failure';
import { Message } from './message';
import { Pending } from './pending';

// Hooks
import { useConversation } from './use-conversation';

// Constants
import { toPath } from '@/views/experiments/image-agent/constants';
import { CLASS_NAME } from './constants';

/** The messages, oldest first, with the newest kept in view as they arrive. */
const Conversation: React.FunctionComponent = () => {
  const { error, list, loading, thread } = useConversation();

  if (error) {
    return <Failure />;
  }

  if (!thread) {
    if (loading) {
      return <Spinner in position='inline' />;
    }
    // Someone else's thread, or deleted. Go back to the start.
    return <Navigate replace to={toPath()} />;
  }

  return (
    <List
      is='ol'
      alignContent='start'
      className={classNames(CLASS_NAME, 'kicl-padding-block-end-widest')}
      gap='wide'
      ref={list}
      justifyItems='stretch'
    >
      {thread.messages.map((message) => {
        return <Message id={message.id} key={message.id} />;
      })}
      {thread.status === 'THINKING' ? <Pending /> : null}
    </List>
  );
};

export { Conversation };
