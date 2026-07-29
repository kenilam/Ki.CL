import React, { useEffect } from 'react';

// Routes
import Router, {
  ErrorElement,
  HttpStatus,
  Outlet,
  Route,
  ScrollRestoration,
  useLocation,
} from '@/Router';

// Widgets
import { GlobalHeader, GlobalHeaderProvider } from '@/Widgets';

// Components
import { Layout } from '@/Components';

// Hooks
import { useResponsive } from '@/Hooks';

// Views
import Experiments from './Experiments';
import Home from './Home';

// Styles
import './Styles.scss';

const Contents: React.FunctionComponent = () => {
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
      </Route>
    </Router>
  );
};

export default Views;
