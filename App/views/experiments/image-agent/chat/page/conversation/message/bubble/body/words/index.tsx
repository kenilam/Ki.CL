import React from 'react';

// Components
import { Animated, BubbleContent, Layout } from 'design/components';

// Partials
import { Working } from '@/views/experiments/image-agent/chat/page/conversation/working';

// Context
import { useFreshContext } from '@/views/experiments/image-agent/chat/context';
import { useMessageContext } from '@/views/experiments/image-agent/chat/page/conversation/message/context';

/** The text of a turn, animated in word by word when it arrived while the page was open. */
const Words: React.FunctionComponent = () => {
  const fresh = useFreshContext();
  const { message } = useMessageContext();
  const reveal = fresh(message.id) && message.role !== 'USER';

  return (
    <Layout
      alignItems='start'
      autoFlow='column'
      gap='narrow'
      justifyContent='start'
    >
      <BubbleContent>
        {message.kind === 'PROGRESS' ? <Working /> : null}
        {reveal ? (
          <Animated.Text
            is='span'
            key={message.text}
            property='blur'
            split='word'
            stagger={40}
          >
            {message.text}
          </Animated.Text>
        ) : (
          message.text
        )}
      </BubbleContent>
    </Layout>
  );
};

export { Words };
