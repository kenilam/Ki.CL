import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Beat } from './beat';

// Constants
import { BEATS } from '@/views/experiments/kinetic-light/constants';

const Beats: React.FunctionComponent = () => {
  return (
    <List gap='narrow' listStyleType='disc'>
      {BEATS.map((context) => {
        return <Beat context={context} key={context} />;
      })}
    </List>
  );
};

export { Beats };
