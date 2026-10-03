import React from 'react';

// Routes
import { Outlet } from 'design/router';

// Selector
import { Selector } from './selector';

const Contents: React.FunctionComponent = () => (
  <>
    <Outlet />
    <Selector />
  </>
);

export { Contents };
