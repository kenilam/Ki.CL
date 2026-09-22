import React from 'react';

// Routes
import { Outlet, Route } from '@/Router';

// Constants
import { PLAY } from '@/Views/Experiments/MusicVisualiser/constants';

/**
 * `/play` - renders nothing of its own. The track reads it with `useMatch`
 * and sounds while it matches.
 */
const Play = <Route path={PLAY} element={<Outlet />} />;

export { Play };
