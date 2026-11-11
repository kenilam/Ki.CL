import React from 'react';

// Components
import { AnimatedText, BubbleContent, Layout, Text } from 'design/components';

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
      <BubbleContent is='span'>
        {message.kind === 'PROGRESS' ? <Working /> : null}
        {reveal ? (
          <AnimatedText
            is='span'
            key={message.text}
            property='blur'
            split='word'
            stagger={40}
          >
            {message.text}
          </AnimatedText>
        ) : (
          <Text is='span'>{message.text}</Text>
        )}
      </BubbleContent>
    </Layout>
  );
};

export { Words };
