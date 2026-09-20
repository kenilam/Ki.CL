import React from 'react';

// Routes
import { Route } from '@/Router';

// Constants
import { TRACK_PATTERN } from '@/Views/Experiments/MusicVisualiser/constants';

/**
 * `/:group/:type/:trackId` - one piece. The leaf renders nothing of its
 * own: the shell above reads the full path and plays what it names, and an
 * id the station cannot resolve is its business too, answered with a
 * fallback and a message rather than a redirect, so the link a listener
 * followed stays in the address bar.
 */
export default <Route path={TRACK_PATTERN} element={null} />;
