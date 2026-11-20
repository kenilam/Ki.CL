import React from 'react';

// Routes
import { Outlet, Route } from 'design/router';

// Views
import { Home } from './home';
import { Card } from './card';

// Constants
import { PATH } from './constants';

const Swatch = (
  <Route path={PATH} element={<Outlet />}>
    {Home}
    {Card}
  </Route>
);

export { PATH, Swatch };
