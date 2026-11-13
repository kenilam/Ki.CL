import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Reason } from './reason';

// Constants
import { REASONS } from './constants';

const Reasons: React.FunctionComponent = () => {
  return (
    <List gap='narrower' listStyleType='disc'>
      {REASONS.map((reason) => {
        return <Reason reason={reason} key={reason} />;
      })}
    </List>
  );
};

export { Reasons };
