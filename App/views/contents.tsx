import React, { useEffect } from 'react';

// Routes
import { Outlet, ScrollRestoration, useLocation } from '@/router';

// Widgets
import { GlobalHeader, useGlobalHeaderContext } from '@/widgets';

// Session
import { Session } from '@/session';

// Components
import { Layout } from '@/components';

// Hooks
import { SCROLL_DIRECTIONS, useScrollDirection } from '@/hooks';

// Partials
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
    <>
      <ScrollRestoration />
      <SkipLink />
      <GlobalHeader />
      <Layout
        alignContent='start'
        alignItems='start'
        gap='none'
        justifyContent='stretch'
        justifyItems='center'
      >
        <main
          className='kicl--view kicl-inline-size-full'
          id={MAIN_ID}
          tabIndex={-1}
        >
          {/* Every request to the API is counted per session, so every page has one. */}
          <Session>
            <Outlet />
          </Session>
        </main>
      </Layout>
    </>
  );
};

export { Contents };
