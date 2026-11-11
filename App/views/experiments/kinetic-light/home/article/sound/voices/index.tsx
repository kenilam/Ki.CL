import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Voice } from './voice';

// Constants
import { VOICES } from '@/views/experiments/kinetic-light/constants';

const Voices: React.FunctionComponent = () => {
  return (
    <List gap='narrow' listStyleType='disc'>
      {VOICES.map((context) => {
        return <Voice context={context} key={context} />;
      })}
    </List>
  );
};

export { Voices };
