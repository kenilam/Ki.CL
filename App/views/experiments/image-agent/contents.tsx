import React from 'react';

// Routes
import { Outlet } from 'design/router';

/** Renders the child routes. Each page sets its own width. */
const ImageAgent: React.FunctionComponent = () => <Outlet />;

export { ImageAgent };
