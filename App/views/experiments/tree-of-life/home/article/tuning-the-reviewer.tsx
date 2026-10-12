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
        <Heading id={id} is='h2' className='kicl-font-size-large'>
          {t('title', { context: 'tuning_the_reviewer' })}
        </Heading>

        <Text is='p'>
          <Markdown>{t('article.tuning_the_reviewer.p1')}</Markdown>
        </Text>

        <Text is='p'>{t('article.tuning_the_reviewer.p2')}</Text>

        <Text is='p'>
          <Markdown>{t('article.tuning_the_reviewer.p3')}</Markdown>
        </Text>

        <Text is='p'>{t('article.tuning_the_reviewer.p4')}</Text>
      </section>
    </Layout>
  );
};

export { TuningTheReviewer };
