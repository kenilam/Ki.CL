import React from 'react';

// Components
import { Details, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Reasons } from './reasons';

const Origin: React.FunctionComponent = () => {
  const { t } = useTranslation('architecture');

  return (
    <Details heading='h2' summary={t('article.origin.title')}>
      <Text is='p'>{t('article.origin.goal')}</Text>
      <Text is='p'>
        <Markdown>{t('article.origin.browser')}</Markdown>
      </Text>
      <Text is='p'>{t('article.origin.decision')}</Text>
      <Text is='p'>{t('article.origin.control')}</Text>
      <Reasons />
      <Text is='p'>{t('article.origin.effect_origin')}</Text>
      <Text is='p'>{t('article.origin.effect_move')}</Text>
      <Text is='p'>
        <Markdown>{t('article.origin.production')}</Markdown>
      </Text>
    </Details>
  );
};

export { Origin };
