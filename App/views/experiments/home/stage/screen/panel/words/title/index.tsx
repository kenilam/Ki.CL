import React from 'react';

// Libraries
import classNames from 'classnames';

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
    <Heading
      dense
      className={classNames('kicl-font-size-huge', 'kicl-line-height-narrower')}
      is='h2'
    >
      {t('experiment', { context: experiment.context })}
    </Heading>
  );
};

export { Title };
