import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout, Skeleton } from 'design/components';

// Hooks
import { useCard } from '@/views/experiments/swatch/use-card';

// Partials
import { Play } from './play';
import { Sound } from './sound';

const Controls: React.FunctionComponent = () => {
  if (useCard() === undefined) {
    return (
      <Skeleton
        className={classNames('kicl-border-radius-full', 'kicl-inline-size-xs')}
      />
    );
  }

  return (
    <Layout
      alignItems='center'
      autoFlow='column'
      gap='narrower'
      justifyContent='start'
    >
      <div role='group'>
        <Play />
        <Sound />
      </div>
    </Layout>
  );
};

export { Controls };
