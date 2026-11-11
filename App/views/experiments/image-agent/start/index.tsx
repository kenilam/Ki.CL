import React from 'react';

// Partials
import { Page } from './page';
import { Provider } from './context';

/** `/experiments/image-agent`: a framed hero, then the article. */
const Start: React.FunctionComponent = () => {
  return (
    <Provider>
      <Page />
    </Provider>
  );
};

export { Start };
