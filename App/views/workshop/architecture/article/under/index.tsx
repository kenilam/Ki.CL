import React from 'react';

// Components
import { Details, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { State } from './state';

const Under: React.FunctionComponent = () => {
  const { t } = useTranslation('architecture');

  return (
    <Details heading='h2' summary={t('article.under.title')}>
      <Text is='p'>
        <Markdown>{t('article.under.rewrite')}</Markdown>
      </Text>
      <Text is='p'>
        <Markdown>{t('article.under.boot')}</Markdown>
      </Text>
      <State />
      <Text is='p'>
        <Markdown>{t('article.under.version')}</Markdown>
      </Text>
    </Details>
  );
};

export { Under };
