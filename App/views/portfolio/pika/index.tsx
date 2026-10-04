import React from 'react';

// Routes
import { Navigate, Outlet, Route } from 'design/router';

// Views
import { Gate } from '@/views/portfolio/gate';
import { SystemDesign } from './system-design';

// Constants
import { PATH } from './constants';

/*
 * The index redirect stays outside the gate on purpose - /portfolio/pika
 * itself has nothing to protect, it only bounces to its parent.
 */
const Pika = (
  <Route path={PATH} element={<Outlet />}>
    <Route index element={<Navigate replace to='system-design' />} />
    <Route element={<Gate path={PATH} />}>{SystemDesign}</Route>
  </Route>
);

export { PATH, Pika };
