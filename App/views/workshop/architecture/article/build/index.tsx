import React from 'react';

// Components
import { Details, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Entry } from './entry';
import { Files } from './files';

const Build: React.FunctionComponent = () => {
  const { t } = useTranslation('architecture');

  return (
    <Details heading='h2' summary={t('article.build.title')}>
      <Text is='p'>{t('article.build.intro')}</Text>
      <Files />
      <Text is='p'>
        <Markdown>{t('article.build.compressed')}</Markdown>
      </Text>
      <Entry />
    </Details>
  );
};

export { Build };
