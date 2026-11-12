import React from 'react';

// Components
import { Details, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Figure } from './figure';

// Constants
import { ORIGINAL_VISION } from './constants';

const ThePicture: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');

  return (
    <Details heading='h3' summary={t('title', { context: 'the_picture' })}>
      <Text is='p'>{t('article.the_picture.p1')}</Text>
      <Text is='p'>{t('article.the_picture.p2')}</Text>
      <Figure
        data={ORIGINAL_VISION}
        alt={t('article.the_picture.alt')}
        caption={t('article.the_picture.caption')}
      />
    </Details>
  );
};

export { ThePicture };
