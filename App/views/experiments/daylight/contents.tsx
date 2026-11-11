import React from 'react';

// Partials
import { Article } from './article';
import { Provider } from './context';

/** The Earth as an ink drawing, lit by where the sun is now. */
const Daylight: React.FunctionComponent = () => {
  return (
    <Provider>
      <Article />
    </Provider>
  );
};

export { Daylight };
