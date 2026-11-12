import React from 'react';

// Partials
import { Page } from './page';
import { Provider } from './context';

// Styles
import './styles.scss';

/** One version of the resume, as a page and as the document it prints to. */
const Resume: React.FunctionComponent = () => {
  return (
    <Provider>
      <Page />
    </Provider>
  );
};

export { Resume };
