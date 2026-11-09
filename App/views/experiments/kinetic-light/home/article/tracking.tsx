import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Heading, Text } from 'design/components';

const Tracking: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h3' lookLike='h1'>
          {t('article.tracking.title')}
        </Heading>
      }
    >
      <Text is='p'>{t('article.tracking.session')}</Text>
      <Text is='p'>{t('article.tracking.allowance')}</Text>
    </Details>
  );
};

export { Tracking };
