import React, { useId } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Layout, Markdown, Text } from 'design/components';

const WhereItStarted: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const id = useId();

  return (
    <Layout justifyItems='start'>
      <section aria-labelledby={id}>
        <Heading id={id} is='h2' lookLike='h1'>
          {t('title', { context: 'where_it_started' })}
        </Heading>

        <Text className='kicl-max-inline-size-columns-8' is='p'>
          <Markdown>{t('article.where_it_started.p1')}</Markdown>
        </Text>

        <Text className='kicl-max-inline-size-columns-8' is='p'>
          {t('article.where_it_started.p2')}
        </Text>
      </section>
    </Layout>
  );
};

export { WhereItStarted };
