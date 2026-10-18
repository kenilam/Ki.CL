import React, { useId } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Layout, Text } from 'design/components';

// Partials
import { Figure } from './figure';

// Constants
import { PERROT_1854 } from './constants';

const DrawingOrganisms: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const id = useId();

  return (
    <Layout justifyItems='start'>
      <section aria-labelledby={id}>
        <Heading id={id} is='h2' lookLike='h1'>
          {t('title', { context: 'drawing_organisms' })}
        </Heading>

        <Text is='p'>{t('article.drawing_organisms.p1')}</Text>

        <Figure
          data={PERROT_1854}
          alt={t('article.drawing_organisms.alt')}
          caption={t('article.drawing_organisms.caption')}
        />

        <Text is='p'>{t('article.drawing_organisms.p2')}</Text>
      </section>
    </Layout>
  );
};

export { DrawingOrganisms };
