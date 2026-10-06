import React, { useEffect } from 'react';

// Libraries
import classNames from 'classnames';

// Routes
import { Outlet, ScrollRestoration, useLocation } from 'design/router';

// Widgets
import { GlobalHeader, useGlobalHeaderContext } from 'design/widgets';

// Session
import { Session, SessionProvider } from '@/session';

// Components
import { Layout } from 'design/components';

// Hooks
import { SCROLL_DIRECTIONS, useScrollDirection } from '@/hooks';

// Partials
import { Navigation } from './navigation';
import { SkipLink } from './skip-link';

// Constants
import { MAIN_ID } from './constants';
import { PATH as HOME_PATH } from './home';

const Contents: React.FunctionComponent = () => {
  const { showHeader } = useGlobalHeaderContext();

  const { pathname } = useLocation();

  const { direction, isAtStart } = useScrollDirection();

  const isHome = pathname.replace('/', '') === HOME_PATH;

  const show = !isHome && (isAtStart || direction === SCROLL_DIRECTIONS.up);

  useEffect(() => {
    showHeader(show);
  }, [show, showHeader]);

  return (
    <SessionProvider>
      <ScrollRestoration />
      <SkipLink />
      <GlobalHeader>
        <Navigation />
      </GlobalHeader>
      <Layout
        alignContent='start'
        alignItems='start'
        gap='none'
        justifyContent='stretch'
        justifyItems='center'
      >
        <main
          className={classNames(
            'kicl--view',
            'kicl-inline-size-full',
            'kicl-min-block-size-screen'
          )}
          id={MAIN_ID}
          tabIndex={-1}
        >
          {/* Every request to the API is counted per session, so every page has one. */}
          <Session>
            <Outlet />
          </Session>
        </main>
      </Layout>
    </SessionProvider>
  );
};

export { Contents };
