import React from 'react';

// Components
import { CardFooter, List, Text } from 'design/components';

// Partials
import { Suggestion } from './suggestion';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useMessageContext } from '@/views/experiments/image-agent/chat/page/conversation/message/context';

const Suggestions: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const { score } = useMessageContext().message;

  if (!score?.suggestions.length) {
    return null;
  }

  return (
    <CardFooter>
      <section>
        <Text is='p' dense>
          {t('title', { context: 'suggestions' })}
        </Text>
        <List gap='narrowest'>
          {score.suggestions.map((suggestion) => {
            return <Suggestion key={suggestion} suggestion={suggestion} />;
          })}
        </List>
      </section>
    </CardFooter>
  );
};

export { Suggestions };
