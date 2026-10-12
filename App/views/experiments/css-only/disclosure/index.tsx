import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Details, Heading, Layout, Markdown, Text } from 'design/components';

// Constants
import { SECTION } from '@/views/experiments/css-only/constants';

/** A `details` that animates to the height of what it holds. */
const Disclosure: React.FunctionComponent = () => {
  const id = useId();
  const { t } = useTranslation('css-only');

  return (
    <Layout autoFlow='row' gap='narrow'>
      <section aria-labelledby={id} className={classNames(SECTION)}>
        <Heading className='kicl-font-size-large' dense id={id} is='h2'>
          {t('title', { context: 'disclosure' })}
        </Heading>
        <Text is='p'>
          <Markdown>{t('text', { context: 'disclosure' })}</Markdown>
        </Text>
        <Details gap='narrow' summary={t('demo', { context: 'disclosure' })}>
          <Text is='p'>{t('demo', { context: 'disclosure_short' })}</Text>
          <Text is='p'>{t('demo', { context: 'disclosure_long' })}</Text>
        </Details>
      </section>
    </Layout>
  );
};

export { Disclosure };
