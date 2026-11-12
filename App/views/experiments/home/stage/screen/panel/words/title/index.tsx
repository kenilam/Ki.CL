import React from 'react';

// Components
import { Heading } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useScreenContext } from '@/views/experiments/home/stage/screen/context';

// Previews
import { TREE_OF_LIFE_TITLE_CLASS_NAME } from '@/views/experiments/previews';

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { experiment } = useScreenContext();

  return (
    <Heading
      className={
        experiment.plate === 'tree-of-life'
          ? TREE_OF_LIFE_TITLE_CLASS_NAME
          : undefined
      }
      dense
      is='h2'
      lookLike='display'
    >
      {t('experiment', { context: experiment.context })}
    </Heading>
  );
};

export { Title };
