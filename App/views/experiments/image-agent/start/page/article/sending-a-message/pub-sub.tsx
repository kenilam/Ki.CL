import React from 'react';

// Components
import { Heading, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const PubSub: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');

  return (
    <>
      <Heading is='h4' lookLike='h2'>
        {t('article.sending.title', { context: 'pub_sub' })}
      </Heading>
      <Text is='p'>{t('article.sending.pub_sub')}</Text>
      <Text is='p'>{t('article.sending.broker')}</Text>
    </>
  );
};

export { PubSub };
