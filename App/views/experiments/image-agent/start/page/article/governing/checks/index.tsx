import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Check } from './check';

// Constants
import { CHECKS } from './constants';

const Checks: React.FunctionComponent = () => {
  return (
    <List gap='narrower' is='ol' listStyleType='decimal'>
      {CHECKS.map((context) => {
        return <Check context={context} key={context} />;
      })}
    </List>
  );
};

export { Checks };
