import React, { useEffect, useRef } from 'react';

// Routes
import { useLocation } from '@/router';

// Widgets
import { GlobalHeaderProvider } from '@/widgets';

// Hooks
import { useResponsive } from '@/hooks';

// Partials
import { Contents } from './contents';

// Constants
import { MAIN_ID } from './constants';

const Element: React.FunctionComponent = () => {
  useResponsive();

  const location = useLocation();

  const isFirstRoute = useRef(true);

  useEffect(() => {
    const root = document.querySelector('body');

    if (!root) {
      return;
    }

    const routes = (location.pathname.replace('/', '') || 'home').split('/');

    root.dataset.routes = routes.join('.');

    document.title = `Ki.CL | ${routes.join(' | ')}`;
  });

  /** A route change replaces the page without a load, so focus moves to the new content, the way a page load would. */
  useEffect(() => {
    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      return;
    }

    document.getElementById(MAIN_ID)?.focus({ preventScroll: true });
  }, [location.pathname]);

  return (
    <GlobalHeaderProvider show={false}>
      <Contents />
    </GlobalHeaderProvider>
  );
};

export { Element };
