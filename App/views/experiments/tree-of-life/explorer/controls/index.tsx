import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Animation } from './animation';
import { Loading } from './loading';

// Constants
import { CLASS_NAME } from '@/views/experiments/tree-of-life/explorer/constants';

const Controls: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');

  return (
    <Layout
      className={classNames(
        `${CLASS_NAME}__chrome`,
        'kicl-position-fixed',
        'kicl-z-index-floating',
        'kicl-inset-block-start',
        'kicl-inset-inline-end'
      )}
      alignItems='center'
      autoFlow='column'
      justifyContent='end'
      gap='narrower'
    >
      <section aria-label={t('label', { context: 'animation' })}>
        <Loading />
        <Animation />
      </section>
    </Layout>
  );
};

export { Controls };
