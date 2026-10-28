import React, { useId } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Layout, Markdown, Text } from 'design/components';

// Partials
import { Figure } from './figure';

// Constants
import {
  ROOT_NODE_ID,
  toPath,
} from '@/views/experiments/tree-of-life/constants';
import { V14 } from './constants';

const FifteenAttempts: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const id = useId();

  // Every link in the copy, by the name the strings use for it.
  const links = { current: toPath(ROOT_NODE_ID) };

  return (
    <Layout justifyItems='start'>
      <section aria-labelledby={id}>
        <Heading id={id} is='h2' lookLike='h1'>
          {t('title', { context: 'fifteen_attempts' })}
        </Heading>

        <Text is='p'>{t('article.fifteen_attempts.webgl')}</Text>

        <Text is='p'>{t('article.fifteen_attempts.html')}</Text>

        <Figure
          data={V14}
          alt={t('article.fifteen_attempts.alt')}
          caption={t('article.fifteen_attempts.caption_map')}
        />

        <Text is='p'>
          <Markdown>{t('article.fifteen_attempts.widest', links)}</Markdown>
        </Text>
      </section>
    </Layout>
  );
};

export { FifteenAttempts };
