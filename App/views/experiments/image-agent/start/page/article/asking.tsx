import React from 'react';

// Components
import { Details, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

/** Asking before drawing: what a picture needs, and the cap on questions. */
const Asking: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');

  return (
    <Details heading='h3' summary={t('article.asking.title')}>
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
