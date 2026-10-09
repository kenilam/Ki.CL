import React from 'react';

// Libraries
import classNames from 'classnames';

// Routes
import { Outlet, ScrollRestoration, useLocation } from 'design/router';

// Widgets
import { GlobalHeader } from 'design/widgets';

// Session
import { Session, SessionProvider } from '@/session';

// Components
import { Layout } from 'design/components';

// Partials
import { SignOut } from './account/sign-out';
import { Contact } from './contact';
import { Navigation } from './navigation';
import { SkipLink } from './skip-link';

// Constants
import { MAIN_ID } from './constants';
import { PATH as HOME_PATH } from './home';

const Contents: React.FunctionComponent = () => {
  const { pathname } = useLocation();

  const isHome = pathname.replace('/', '') === HOME_PATH;

  return (
    <SessionProvider>
      <ScrollRestoration />
      <SkipLink />
      <GlobalHeader hidden={isHome}>
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
            {/* Here, not in a menu or a page: any page's button opens them, with the menus closed. */}
            <SignOut />
            <Contact />
          </Session>
        </main>
      </Layout>
    </SessionProvider>
  );
};

export { Contents };
