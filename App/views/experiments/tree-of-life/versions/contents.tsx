import React from 'react';

// Routes
import { Outlet } from '@/router';

// Selector
import { Selector } from './selector';

const Contents: React.FunctionComponent = () => (
  <>
    <Outlet />
    <Selector />
  </>
);

export { Contents };
