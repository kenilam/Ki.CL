import React from 'react';

// Routes
import { Outlet } from '@/router';

/** Renders the child routes. Each page sets its own width. */
const ImageAgent: React.FunctionComponent = () => <Outlet />;

export { ImageAgent };
