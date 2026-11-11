import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Part } from './part';

// Constants
import { PARTS } from './constants';

const Parts: React.FunctionComponent = () => {
  return (
    <List gap='narrower' is='ol' listStyleType='decimal'>
      {PARTS.map((part) => {
        return <Part part={part} key={part} />;
      })}
    </List>
  );
};

export { Parts };
