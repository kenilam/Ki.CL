import React, { useId } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Layout, Text } from 'design/components';

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
