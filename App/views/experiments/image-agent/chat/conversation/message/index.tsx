import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Bubble, Card, Layout, Text } from '@/components';

// Partials
import { Choices } from './choices';
import { isNotice, Notice } from './notice';
import { Picture } from './picture';
import { Retry } from './retry';
import { Review } from './review';
import { MessageText } from './text';

// Constants
import {
  CLASS_NAME as CONVERSATION,
  COPY as CONVERSATION_COPY,
} from '@/views/experiments/image-agent/chat/conversation/constants';

// Spec
import type { Message as MessageType } from '@/views/experiments/image-agent/chat/conversation/spec';

const CLASS_NAME = `${CONVERSATION}__message`;

type Props = {
  /** Arrived after the page loaded, so the agent's text animates in. */
  fresh?: boolean;
  message: MessageType;
  /** Only set while the choices can be picked (last message, agent idle). */
  onChoose?: (text: string) => unknown;
  /**
   * Only on the person's messages, and only while nothing is running. Asks this
   * message again.
   */
  onRetry?: (messageId: string) => unknown;
};

/**
 * One turn. The person's message is a bubble at the end of the line, the
 * agent's is plain text, and a refused or failed turn is a notice.
 */
const Message = React.forwardRef<HTMLElement, Props>(
  ({ fresh, message, onChoose, onRetry }, ref) => {
    const mine = message.role === 'USER';
    const busy = message.kind === 'PROGRESS';
    const notice = isNotice(message.kind);

    return (
      <Bubble
        is='li'
        align={mine ? 'end' : 'start'}
        className={classNames(
          CLASS_NAME,
          `${CLASS_NAME}--${message.role.toLowerCase()}`,
          // Each message slides in from its own side as it scrolls into view.
          mine ? 'kicl-scroll-reveal-end' : 'kicl-scroll-reveal-start'
        )}
        ref={ref}
        variant={mine ? 'secondary' : 'ghost'}
      >
        <Text is='span' className='kicl-hidden'>
          {mine ? CONVERSATION_COPY.you : CONVERSATION_COPY.agent}
        </Text>

        <Notice kind={message.kind} text={message.text} />

        {message.text && !notice ? (
          <Layout
            alignItems='center'
            autoFlow='column'
            gap='narrowest'
            justifyContent='end'
          >
            <div>
              {onRetry ? <Retry onRetry={() => onRetry(message.id)} /> : null}
              <MessageText
                busy={busy}
                reveal={Boolean(fresh) && !mine}
                text={message.text}
              />
            </div>
          </Layout>
        ) : null}

        {onChoose && message.choices.length ? (
          <Choices choices={message.choices} onChoose={onChoose} />
        ) : null}

        {message.kind === 'IMAGE' ? (
          <Layout gap='narrow'>
            <Card variant='ghost'>
              {message.asset?.url ? <Picture url={message.asset.url} /> : null}
              {message.score ? <Review score={message.score} /> : null}
            </Card>
          </Layout>
        ) : null}
      </Bubble>
    );
  }
);

Message.displayName = 'Message';

export { CLASS_NAME, Message, type Props as MessageProps };
