import React from 'react';

// Components
import { Layout } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Examples } from './examples';
import { Yours } from './yours';

const Songs: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');

  return (
    <Layout autoFlow='row' gap='normal'>
      <nav aria-label={t('label', { context: 'songs' })}>
        <Yours />
        <Examples />
      </nav>
    </Layout>
  );
};

export { Songs };
