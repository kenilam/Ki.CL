import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Step } from './step';

// Constants
import { STEPS } from './constants';

const Steps: React.FunctionComponent = () => {
  return (
    <List gap='narrower' is='ol' listStyleType='decimal'>
      {STEPS.map((context) => {
        return <Step context={context} key={context} />;
      })}
    </List>
  );
};

export { Steps };
