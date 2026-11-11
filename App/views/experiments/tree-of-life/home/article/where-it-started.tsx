import React, { useId } from 'react';

// Components
import { Heading, Layout, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const WhereItStarted: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const id = useId();

  return (
    <Layout justifyItems='start'>
      <section aria-labelledby={id} className='kicl-max-inline-size-columns-8'>
        <Heading id={id} is='h2' lookLike='h1'>
          {t('title', { context: 'where_it_started' })}
        </Heading>

        <Text is='p'>
          <Markdown>{t('article.where_it_started.p1')}</Markdown>
        </Text>

        <Text is='p'>{t('article.where_it_started.p2')}</Text>
      </section>
    </Layout>
  );
};

export { WhereItStarted };
