import React from 'react';

// Components
import { Heading } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useScreenContext } from '@/views/experiments/home/stage/screen/context';

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { experiment } = useScreenContext();

  return (
    <Heading dense is='h2' lookLike='display'>
      {t('experiment', { context: experiment.context })}
    </Heading>
  );
};

export { Title };
