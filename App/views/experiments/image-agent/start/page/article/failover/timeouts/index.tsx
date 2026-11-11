import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Timeout } from './timeout';

// Constants
import { TIMEOUTS } from './constants';

const Timeouts: React.FunctionComponent = () => {
  return (
    <List gap='narrower' listStyleType='disc'>
      {TIMEOUTS.map((context) => {
        return <Timeout context={context} key={context} />;
      })}
    </List>
  );
};

export { Timeouts };
