import React from 'react';

// Components
import { List as Origin } from 'design/components';

// Partials
import { Experiment } from './experiment';

// Views
import { EXPERIMENTS } from '@/views/routes';

const List: React.FunctionComponent = () => {
  return (
    <Origin gap='narrow' justifyItems='end'>
      {/* Newest first. */}
      {EXPERIMENTS.toReversed().map(({ to }) => {
        return <Experiment key={to} to={to} />;
      })}
    </Origin>
  );
};

export { List };
