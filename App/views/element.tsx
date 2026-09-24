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

  const lastPathname = useRef(location.pathname);

  useEffect(() => {
    const root = document.querySelector('body');

    if (!root) {
      return;
    }

    const routes = (location.pathname.replace('/', '') || 'home').split('/');

    root.dataset.routes = routes.join('.');

    document.title = `Ki.CL | ${routes.join(' | ')}`;
  });

  /**
   * A route change replaces the page without a load, so focus moves to the new
   * content, the way a page load would. Compared with the last path rather than
   * a first-run flag: StrictMode runs this twice on mount, and a flag would be
   * spent on the first run and focus the page on the second.
   */
  useEffect(() => {
    if (lastPathname.current === location.pathname) {
      return;
    }
    lastPathname.current = location.pathname;

    document.getElementById(MAIN_ID)?.focus({ preventScroll: true });
  }, [location.pathname]);

  return (
    <GlobalHeaderProvider show={false}>
      <Contents />
    </GlobalHeaderProvider>
  );
};

export { Element };
