import React, { useEffect } from 'react';

// Routes
import {
  Router,
  ErrorElement,
  HttpStatus,
  Outlet,
  Route,
  ScrollRestoration,
  useLocation,
} from '@/router';

// Widgets
import {
  GlobalHeader,
  GlobalHeaderProvider,
  useGlobalHeaderContext,
} from '@/widgets';

// Components
import { Layout } from '@/components';

// Hooks
import { SCROLL_DIRECTIONS, useResponsive, useScrollDirection } from '@/hooks';

// Views
import { Experiments } from './experiments';
import { Home, PATH as HOME_PATH } from './home';
import { Portfolio } from './portfolio';

// Styles
import './styles.scss';

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

const Element: React.FunctionComponent = () => {
  useResponsive();

  const location = useLocation();

  useEffect(() => {
    const root = document.querySelector('body');

    if (!root) {
      return;
    }

    const routes = (location.pathname.replace('/', '') || 'home').split('/');

    root.dataset.routes = routes.join('.');

    document.title = `Ki.CL | ${routes.join(' | ')}`;
  });

  return (
    <GlobalHeaderProvider show={false}>
      <Contents />
    </GlobalHeaderProvider>
  );
};

const Views: React.FunctionComponent = () => {
  return (
    <Router>
      <Route path='/' errorElement={<ErrorElement />} element={<Element />}>
        <Route path='*' element={<HttpStatus.Status404 />} />
        {Experiments}
        {Home}
        {Portfolio}
      </Route>
    </Router>
  );
};

export { Views };
