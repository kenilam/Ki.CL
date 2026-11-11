import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Way } from './way';

// Constants
import { WAYS } from './constants';

const Ways: React.FunctionComponent = () => {
  return (
    <List gap='narrow' listStyleType='disc'>
      {WAYS.map((context) => {
        return <Way context={context} key={context} />;
      })}
    </List>
  );
};

export { Ways };
