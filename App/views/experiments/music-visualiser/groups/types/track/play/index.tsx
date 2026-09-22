import React from 'react';

// Routes
import { Outlet, Route } from '@/router';

// Constants
import { PLAY } from '@/views/experiments/music-visualiser/constants';

/**
 * `/play` - renders nothing of its own. The track reads it with `useMatch`
 * and sounds while it matches.
 */
const Play = <Route path={PLAY} element={<Outlet />} />;

export { Play };
