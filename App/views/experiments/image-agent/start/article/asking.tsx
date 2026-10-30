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
        <Heading dense is='h3' lookLike='h1'>
          {t('article.asking.title')}
        </Heading>
      }
    >
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.asking.enough')}
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.asking.needs')}
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.asking.answers')}
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.asking.cap')}
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.asking.brief')}
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.asking.pipeline')}
      </Text>
    </Details>
  );
};

export { Asking };
