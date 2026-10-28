import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Heading, Text } from 'design/components';

/** How it works: what to write, and what the agent does with it. */
const HowItWorks: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');

  return (
    <Details
      gap='narrow'
      summary={
        <Heading dense is='h3' lookLike='h1'>
          {t('article.how_it_works.title')}
        </Heading>
      }
    >
      <Text is='p'>{t('article.how_it_works.describe')}</Text>
      <Text is='p'>{t('article.how_it_works.follow_up')}</Text>
      <Text is='p'>{t('article.how_it_works.limits')}</Text>
    </Details>
  );
};

export { HowItWorks };
