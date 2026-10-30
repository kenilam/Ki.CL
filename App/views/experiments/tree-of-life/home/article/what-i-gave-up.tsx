import React, { useId } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Layout, Markdown, Text } from 'design/components';

// Constants
import {
  ROOT_NODE_ID,
  toPath,
} from '@/views/experiments/tree-of-life/constants';

const WhatIGaveUp: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const id = useId();

  const links = { current: toPath(ROOT_NODE_ID) };

  return (
    <Layout justifyItems='start'>
      <section aria-labelledby={id} className='kicl-max-inline-size-columns-8'>
        <Heading id={id} is='h2' lookLike='h1'>
          {t('title', { context: 'what_i_gave_up' })}
        </Heading>

        <Text is='p'>{t('article.what_i_gave_up.one_taxon')}</Text>

        <Text is='p'>{t('article.what_i_gave_up.p2')}</Text>

        <Text is='p'>
          <Markdown>{t('article.what_i_gave_up.p3', links)}</Markdown>
        </Text>
      </section>
    </Layout>
  );
};

export { WhatIGaveUp };
