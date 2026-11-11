import React from 'react';

// Components
import { Details, Heading, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

/** Asking before drawing: what a picture needs, and the cap on questions. */
const Asking: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h3' lookLike='h1'>
          {t('article.asking.title')}
        </Heading>
      }
    >
      <Text is='p'>{t('article.asking.enough')}</Text>
      <Text is='p'>{t('article.asking.needs')}</Text>
      <Text is='p'>{t('article.asking.answers')}</Text>
      <Text is='p'>{t('article.asking.cap')}</Text>
      <Text is='p'>{t('article.asking.brief')}</Text>
      <Text is='p'>{t('article.asking.pipeline')}</Text>
    </Details>
  );
};

export { Asking };
