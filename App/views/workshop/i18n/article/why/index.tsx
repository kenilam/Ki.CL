import React from 'react';

// Components
import { Details, Heading, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Needs } from './needs';

const Why: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      open
      summary={
        <Heading dense is='h2' lookLike='h1'>
          {t('article.why.title')}
        </Heading>
      }
    >
      <Text is='p'>{t('article.why.rule')}</Text>
      <Text is='p'>{t('article.why.intro')}</Text>
      <Needs />
    </Details>
  );
};

export { Why };
