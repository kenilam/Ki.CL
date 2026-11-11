import React from 'react';

// Components
import { AnimatedText, BubbleContent, Layout } from 'design/components';

// Partials
import { Working } from '@/views/experiments/image-agent/chat/page/conversation/working';

// Context
import { useThreadContext } from '@/views/experiments/image-agent/chat/context';

// Hooks
import { useTranslation } from 'design/hooks';

/** The step the agent is on. Until it first reports one, the reading step. */
const Activity: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const { thread } = useThreadContext();
  const text = thread?.activity ?? t('status', { context: 'reading' });

  return (
    <Layout
      alignItems='start'
      autoFlow='column'
      gap='narrow'
      justifyContent='start'
    >
      <BubbleContent is='span'>
        <Working />
        <AnimatedText
          is='span'
          key={text}
          property='blur'
          split='word'
          stagger={40}
        >
          {text}
        </AnimatedText>
      </BubbleContent>
    </Layout>
  );
};

export { Activity };
