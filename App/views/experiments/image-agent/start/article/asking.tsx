import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Heading, Text } from 'design/components';

/** Asking before drawing: what a picture needs, and the cap on questions. */
const Asking: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');

  return (
    <Details
      gap='narrow'
      summary={
        <Heading className='kicl-font-size-large' dense is='h3'>
          {t('article.asking.title')}
        </Heading>
      }
    >
      <Text is='p'>{t('article.asking.enough')}</Text>
      <Text is='p'>{t('article.asking.answers')}</Text>
      <Text is='p'>{t('article.asking.cap')}</Text>
      <Text is='p'>{t('article.asking.brief')}</Text>
    </Details>
  );
};

export { Asking };
