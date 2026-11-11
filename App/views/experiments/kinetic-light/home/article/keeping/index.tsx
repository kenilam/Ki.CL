import React from 'react';

// Components
import { Details, Heading, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Kinds } from './kinds';

const Keeping: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h3' lookLike='h1'>
          {t('title', { context: 'privacy' })}
        </Heading>
      }
    >
      <Text is='p'>{t('article.keeping.intro')}</Text>
      <Kinds />
      <Text is='p'>{t('article.keeping.days')}</Text>
    </Details>
  );
};

export { Keeping };
