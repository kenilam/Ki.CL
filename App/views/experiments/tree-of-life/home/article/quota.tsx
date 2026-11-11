import React, { useId } from 'react';

// Components
import { Heading, Layout, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Quota: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const id = useId();

  return (
    <Layout justifyItems='start'>
      <section aria-labelledby={id} className='kicl-max-inline-size-columns-8'>
        <Heading id={id} is='h2' lookLike='h1'>
          {t('title', { context: 'quota' })}
        </Heading>

        <Text is='p'>{t('article.quota.p1')}</Text>

        <Text is='p'>{t('article.quota.p2')}</Text>

        <Text is='p'>{t('article.quota.p3')}</Text>
      </section>
    </Layout>
  );
};

export { Quota };
