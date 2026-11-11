import React from 'react';

// Routes
import { Outlet } from 'design/router';

// Context
import { Provider } from './context';

const Contents: React.FunctionComponent = () => {
  return (
    <Provider>
      <Outlet />
    </Provider>
  );
};

export { Contents };
