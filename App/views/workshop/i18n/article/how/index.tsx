import React from 'react';

// Components
import { Details, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Overview } from './overview';
import { Parts } from './parts';

const How: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details heading='h2' summary={t('article.how.title')}>
      <Text is='p'>
        <Markdown>{t('article.how.browser')}</Markdown>
      </Text>
      <Text is='p'>
        <Markdown>{t('article.how.select')}</Markdown>
      </Text>
      <Text is='p'>{t('article.how.parts')}</Text>
      <Parts />
      <Overview />
      <Text is='p'>{t('article.how.startup')}</Text>
      <Text is='p'>{t('article.how.source')}</Text>
    </Details>
  );
};

export { How };
