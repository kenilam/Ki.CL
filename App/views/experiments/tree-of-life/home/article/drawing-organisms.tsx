import React from 'react';

// Components
import { Details, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Figure } from './figure';

// Constants
import { PERROT_1854 } from './constants';

const DrawingOrganisms: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');

  return (
    <Details
      heading='h3'
      summary={t('title', { context: 'drawing_organisms' })}
    >
      <Text is='p'>{t('article.drawing_organisms.p1')}</Text>
      <Figure
        data={PERROT_1854}
        alt={t('article.drawing_organisms.alt')}
        caption={t('article.drawing_organisms.caption')}
      />
      <Text is='p'>{t('article.drawing_organisms.p2')}</Text>
    </Details>
  );
};

export { DrawingOrganisms };
