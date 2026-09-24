import React from 'react';

// Components
import { Bubble, Text } from '@/components';

// Partials
import { MessageText } from '@/views/experiments/image-agent/chat/conversation/message/text';

// Hooks
import { useElapsed } from './use-elapsed';

// Constants
import { CLASS_NAME as CONVERSATION } from '@/views/experiments/image-agent/chat/conversation/constants';

const CLASS_NAME = `${CONVERSATION}__pending`;

const COPY = {
  reading: 'Reading your message.',
  elapsed: (seconds: number) => `${seconds}s`,
};

/** Seconds before the elapsed time shows. */
const SHOW_ELAPSED_AFTER = 3;

type Props = {
  /**
   * The step the agent reports. Null until the first report, which shows the
   * reading step.
   */
  activity: string | null | undefined;
  /** When the person's message was sent, to count the wait from. */
  since: string | undefined;
};

/**
 * Shown until the agent replies: the step it is on, animated in as each one
 * starts, and the seconds elapsed.
 */
const Pending = React.forwardRef<HTMLElement, Props>(
  ({ activity, since }, ref) => {
    const seconds = useElapsed(since);

    return (
      <Bubble
        is='li'
        className={`${CLASS_NAME} kicl-scroll-reveal-start`}
        ref={ref}
        variant='ghost'
      >
        <MessageText busy reveal text={activity ?? COPY.reading} />
        {seconds >= SHOW_ELAPSED_AFTER ? (
          <Text
            aria-hidden
            dense
            is='span'
            className='kicl-font-family-mono kicl-font-size-smaller kicl-color-grey-dark'
          >
            {COPY.elapsed(seconds)}
          </Text>
        ) : null}
      </Bubble>
    );
  }
);

Pending.displayName = 'Pending';

export { Pending };
