import React, { useEffect, useRef } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Routes
import { useLocation } from 'design/router';

// Analytics
import { useAnalytics } from '@/analytics';

// Widgets
import { GlobalHeaderProvider } from 'design/widgets';

// Hooks
import { useResponsive } from 'design/hooks';

// Partials
import { Contents } from './contents';

// Constants
import { MAIN_ID } from './constants';

const Element: React.FunctionComponent = () => {
  useResponsive();

  const location = useLocation();

  useAnalytics(location.pathname);

  const { t } = useTranslation();

  const lastPathname = useRef(location.pathname);

  useEffect(() => {
    const root = document.querySelector('body');

    if (!root) {
      return;
    }

    const routes = (location.pathname.replace('/', '') || 'home').split('/');

    root.dataset.routes = routes.join('.');

    document.title = t('document_title', { routes: routes.join(' | ') });
    /*
     * Once per route, not on every render. Printing changes the media queries
     * `useResponsive` listens to, and the render that follows used to put the
     * route's title back over the one a page had set for its print.
     */
  }, [location.pathname, t]);

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
  }, [location.pathname, t]);

  return (
    <GlobalHeaderProvider>
      <Contents />
    </GlobalHeaderProvider>
  );
};

export { Element };
