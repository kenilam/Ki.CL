import React from 'react';

// Routes
import { Outlet } from 'design/router';

/** Renders the routes beneath. Each one sets its own width. */
const MusicVisualiser: React.FunctionComponent = () => <Outlet />;

export { MusicVisualiser };
