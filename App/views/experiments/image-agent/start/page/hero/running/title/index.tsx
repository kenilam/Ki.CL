import React from 'react';

// Components
import { Heading, Layout, Spinner } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { RUNNING_ID } from '@/views/experiments/image-agent/start/constants';

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');

  return (
    <Layout autoFlow='column' gap='narrow'>
      <Heading id={RUNNING_ID} is='h2' dense>
        <Spinner position='inline' />
        {t('title', { context: 'running' })}
      </Heading>
    </Layout>
  );
};

export { Title };
