import React from 'react';

// Components
import { Heading, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Separate: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');

  return (
    <>
      <Heading is='h4' lookLike='h2'>
        {t('article.sending.title', { context: 'separate' })}
      </Heading>
      <Text is='p'>{t('article.sending.one_turn')}</Text>
      <Text is='p'>
        <Markdown>{t('article.sending.same_write')}</Markdown>
      </Text>
      <Text is='p'>
        <Markdown>{t('article.sending.idle')}</Markdown>
      </Text>
      <Text is='p'>{t('article.sending.streams')}</Text>
    </>
  );
};

export { Separate };
