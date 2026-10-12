import React, { useId } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Layout, Markdown, Text } from 'design/components';

// Partials
import { Figure } from './figure';

// Constants
import { toVersionPath } from '@/views/experiments/tree-of-life/versions/constants';
import { VERSION } from '@/views/experiments/tree-of-life/versions/v15/constants';
import { V14 } from './constants';

const FifteenAttempts: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const id = useId();

  // Every link in the copy, by the name the strings use for it.
  const links = {
    current: toVersionPath({ version: VERSION }),
    v1: toVersionPath({ version: '1' }),
    v8: toVersionPath({ version: '8' }),
    v9: toVersionPath({ version: '9' }),
    v13: toVersionPath({ version: '13' }),
    v14: toVersionPath({ version: '14' }),
    version: VERSION,
  };

  return (
    <Layout justifyItems='start'>
      <section aria-labelledby={id}>
        <Heading id={id} is='h2' className='kicl-font-size-large'>
          {t('title', { context: 'fifteen_attempts' })}
        </Heading>

        <Text is='p'>
          <Markdown>{t('article.fifteen_attempts.p1', links)}</Markdown>
        </Text>

        <Text is='p'>
          <Markdown>{t('article.fifteen_attempts.p2', links)}</Markdown>
        </Text>

        <Figure
          data={V14}
          alt={t('article.fifteen_attempts.alt')}
          caption={t('article.fifteen_attempts.caption', links)}
        />

        <Text is='p'>
          <Markdown>{t('article.fifteen_attempts.p3', links)}</Markdown>
        </Text>
      </section>
    </Layout>
  );
};

export { FifteenAttempts };
