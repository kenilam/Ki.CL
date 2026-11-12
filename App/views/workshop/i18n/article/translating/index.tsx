import React from 'react';

// Components
import { Details, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Limits } from './limits';
import { Paragraphs } from './paragraphs';
import { Tokens } from './tokens';

const Translating: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details heading='h2' summary={t('article.translating.title')}>
      <Text is='p'>
        <Markdown>{t('article.translating.job')}</Markdown>
      </Text>
      <Text is='p'>
        <Markdown>{t('article.translating.prompt')}</Markdown>
      </Text>
      <Text is='p'>{t('article.translating.tokens')}</Text>
      <Tokens />
      <Paragraphs />
      <Text is='p'>
        <Markdown>{t('article.translating.providers')}</Markdown>
      </Text>
      <Limits />
    </Details>
  );
};

export { Translating };
