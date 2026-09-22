import React, { useEffect } from 'react';

// Routes
import { Outlet, ScrollRestoration, useLocation } from '@/router';

// Widgets
import { GlobalHeader, useGlobalHeaderContext } from '@/widgets';

// Components
import { Layout } from '@/components';

// Hooks
import { SCROLL_DIRECTIONS, useScrollDirection } from '@/hooks';

// Constants
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
      <GlobalHeader />
      <Layout
        alignContent='start'
        alignItems='start'
        gap='none'
        justifyContent='stretch'
        justifyItems='center'
      >
        <main className='kicl--view'>
          <Outlet />
        </main>
      </Layout>
    </>
  );
};

export { Contents };
