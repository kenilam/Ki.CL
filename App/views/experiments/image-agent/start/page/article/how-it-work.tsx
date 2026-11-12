import React from 'react';

// Components
import { Details, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

/** How it works: what to write, and what the agent does with it. */
const HowItWorks: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');

  return (
    <Details heading='h3' summary={t('article.how_it_works.title')}>
      <Text is='p'>{t('article.how_it_works.describe')}</Text>
      <Text is='p'>{t('article.how_it_works.follow_up')}</Text>
      <Text is='p'>{t('article.how_it_works.limits')}</Text>
    </Details>
  );
};

export { HowItWorks };
