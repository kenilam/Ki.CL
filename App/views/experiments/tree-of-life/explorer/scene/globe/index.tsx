import React from 'react';

// Partials
import { Cage } from './cage';
import { Provider } from './context';

/**
 * The cage the tree grows inside, centred on the origin of life. It never takes
 * a pointer, so it can't swallow a click meant for a taxon behind it.
 */
const Globe: React.FunctionComponent = () => {
  return (
    <Provider>
      <Cage />
    </Provider>
  );
};

export { Globe };
