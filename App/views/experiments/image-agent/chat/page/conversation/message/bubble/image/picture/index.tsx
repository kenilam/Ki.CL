import React from 'react';

// Partials
import { Figure } from './figure';
import { Provider } from './context';

// Styles
import './styles.scss';

/**
 * A square preview; pressing it opens the whole picture in a dialog, headed
 * with the conversation's title.
 */
const Picture: React.FunctionComponent = () => {
  return (
    <Provider>
      <Figure />
    </Provider>
  );
};

export { Picture };
