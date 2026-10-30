import React, { useId } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Layout, Text } from 'design/components';

// Partials
import { Figure } from './figure';

// Constants
import { ORIGINAL_VISION } from './constants';

const ThePicture: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const id = useId();

  return (
    <Layout justifyItems='start'>
      <section aria-labelledby={id}>
        <Heading id={id} is='h2' lookLike='h1'>
          {t('title', { context: 'the_picture' })}
        </Heading>

        <Text className='kicl-max-inline-size-columns-8' is='p'>
          {t('article.the_picture.p1')}
        </Text>

        <Text className='kicl-max-inline-size-columns-8' is='p'>
          {t('article.the_picture.p2')}
        </Text>

        <Figure
          data={ORIGINAL_VISION}
          alt={t('article.the_picture.alt')}
          caption={t('article.the_picture.caption')}
        />
      </section>
    </Layout>
  );
};

export { ThePicture };
