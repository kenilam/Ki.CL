import React, { useId } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Layout, Markdown, Text } from 'design/components';

const TheBackend: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const id = useId();

  return (
    <Layout justifyItems='start'>
      <section aria-labelledby={id}>
        <Heading id={id} is='h2' lookLike='h1'>
          {t('title', { context: 'the_backend' })}
        </Heading>

        <Text className='kicl-max-inline-size-columns-8' is='p'>
          {t('article.the_backend.p1')}
        </Text>

        <Text className='kicl-max-inline-size-columns-8' is='p'>
          <Markdown>{t('article.the_backend.p2')}</Markdown>
        </Text>

        <Text className='kicl-max-inline-size-columns-8' is='p'>
          {t('article.the_backend.p3')}
        </Text>
      </section>
    </Layout>
  );
};

export { TheBackend };
