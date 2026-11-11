import React from 'react';

// Partials
import { Panel } from './panel';
import { Provider } from './context';

/** The taxon's plate, drawn on request. */
const TaxonVisual: React.FunctionComponent = () => {
  return (
    <Provider>
      <Panel />
    </Provider>
  );
};

export { TaxonVisual };
