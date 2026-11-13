import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Term } from './term';

// Constants
import { TERMS } from './constants';

const Terms: React.FunctionComponent = () => {
  return (
    <List gap='narrower' listStyleType='disc'>
      {TERMS.map((term) => {
        return <Term term={term} key={term} />;
      })}
    </List>
  );
};

export { Terms };
