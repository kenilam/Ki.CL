import React from 'react';

// Partials
import { Article } from './article';
import { Provider } from './context';

/** `/:track` - the track the URL names, its audio and its picture. */
const Contents: React.FunctionComponent = () => {
  return (
    <Provider>
      <Article />
    </Provider>
  );
};

export { Contents };
