import React from 'react';

// Components
import { List, Spinner, Status } from '@/components';

// Routes
import { Navigate } from '@/router';

// Partials
import { Message, type MessageProps } from './message';
import { Pending } from './pending';

// Hooks
import { useFresh } from './use-fresh';
import { useStickToBottom } from './use-stick-to-bottom';
import type { ThreadState } from './use-thread';

// Styles
import './styles.scss';

// Constants
import { toLabel, toPath } from '@/views/experiments/image-agent/constants';
import { CLASS_NAME, COPY } from './constants';

type Props = Omit<ThreadState, 'accept'> &
  Pick<MessageProps, 'onChoose' | 'onRetry'> & {
    /** Choices on the last question can be picked right now. */
    choosing: boolean;
  };

/** The messages, oldest first, with the newest kept in view as they arrive. */
const Conversation: React.FunctionComponent<Props> = ({
  choosing,
  error,
  loading,
  onChoose,
  onRetry,
  thread,
}) => {
  const count = thread?.messages.length ?? 0;
  const last = thread?.messages[count - 1];
  const thinking = thread?.status === 'THINKING';

  const fresh = useFresh(thread);

  // Rewinding needs at least two messages from the person.
  const rewindable =
    (thread?.messages ?? []).filter(({ role }) => role === 'USER').length > 1;

  // The person's latest message. It changes when they send.
  const sent = [...(thread?.messages ?? [])]
    .reverse()
    .find((message) => message.role === 'USER')?.id;
  const list = useStickToBottom<HTMLElement>(sent);

  if (error) {
    return (
      <Status
        in
        headingLevel='h2'
        level='error'
        message={COPY.unreachable}
        title={COPY.unreachableTitle}
      />
    );
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
      className={CLASS_NAME}
      gap='wide'
      ref={list}
      justifyItems='stretch'
    >
      {thread.messages.map((message, index) => (
        <Message
          fresh={fresh(message.id)}
          key={message.id}
          message={message}
          onChoose={index === count - 1 && choosing ? onChoose : undefined}
          title={toLabel(thread)}
          onRetry={
            choosing && rewindable && message.role === 'USER'
              ? onRetry
              : undefined
          }
        />
      ))}
      {thinking ? (
        <Pending
          activity={thread.activity}
          since={last?.role === 'USER' ? last.at : undefined}
        />
      ) : null}
    </List>
  );
};

export { Conversation };
