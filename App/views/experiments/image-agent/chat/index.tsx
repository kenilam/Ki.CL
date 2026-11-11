import React from 'react';

// Partials
import { Page } from './page';
import { Provider } from './context';
import { Reply } from './reply';

const Chat: React.FunctionComponent = () => {
  return (
    <Provider>
      <Page />
      <Reply />
    </Provider>
  );
};

export { Chat };
