import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import {
  Heading,
  Layout,
  Markdown,
  Segmented,
  SegmentedItem,
  Text,
} from 'design/components';

// Constants
import { SECTION } from '@/views/experiments/css-only/constants';

const OPTIONS = ['grid', 'list', 'table'] as const;

/** Radio buttons whose highlight slides to the one that is checked. */
const Marker: React.FunctionComponent = () => {
  const id = useId();
  const { t } = useTranslation('css-only');

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='start'>
      <section aria-labelledby={id} className={classNames(SECTION)}>
        <Heading className='kicl-font-size-large' dense id={id} is='h2'>
          {t('title', { context: 'marker' })}
        </Heading>
        <Text is='p'>
          <Markdown>{t('text', { context: 'marker' })}</Markdown>
        </Text>
        <Segmented
          aria-label={t('demo', { context: 'marker' })}
          defaultValue={OPTIONS[0]}
        >
          {OPTIONS.map((option) => (
            <SegmentedItem key={option} value={option}>
              {t('option', { context: option })}
            </SegmentedItem>
          ))}
        </Segmented>
      </section>
    </Layout>
  );
};

export { Marker };
