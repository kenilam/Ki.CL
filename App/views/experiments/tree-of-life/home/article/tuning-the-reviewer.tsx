import React, { useId } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Layout, Markdown, Text } from 'design/components';

const TuningTheReviewer: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const id = useId();

  return (
    <Layout justifyItems='start'>
      <section aria-labelledby={id}>
        <Heading id={id} is='h2' lookLike='h1'>
          {t('title', { context: 'tuning_the_reviewer' })}
        </Heading>

        <Text className='kicl-max-inline-size-columns-8' is='p'>
          <Markdown>{t('article.tuning_the_reviewer.p1')}</Markdown>
        </Text>

        <Text className='kicl-max-inline-size-columns-8' is='p'>
          {t('article.tuning_the_reviewer.p2')}
        </Text>

        <Text className='kicl-max-inline-size-columns-8' is='p'>
          <Markdown>{t('article.tuning_the_reviewer.p3')}</Markdown>
        </Text>

        <Text className='kicl-max-inline-size-columns-8' is='p'>
          {t('article.tuning_the_reviewer.p4')}
        </Text>
      </section>
    </Layout>
  );
};

export { TuningTheReviewer };
