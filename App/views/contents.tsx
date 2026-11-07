import React, { Suspense } from 'react';

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
import { Language } from './language';
import { PasswordChangeProvider } from './me/password/context';
import { Navigation } from './navigation';
import { SkipLink } from './skip-link';

// Constants
import { MAIN_ID } from './constants';
import { PATH as HOME_PATH } from './home';

// Kept out of the first load: it brings in a part of each experiment.
const Notifications = React.lazy(async () => {
  const { Notifications } = await import('./notifications');

  return { default: Notifications };
});

const Contents: React.FunctionComponent = () => {
  const { pathname } = useLocation();

  const isHome = pathname.replace('/', '') === HOME_PATH;

  return (
    <SessionProvider>
      <ScrollRestoration />
      <SkipLink />
      <GlobalHeader after={<Language />} hidden={isHome}>
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
            <PasswordChangeProvider>
              <Outlet />
              {/* Here, not in a menu or a page: any page's button opens them, with the menus closed. */}
              <SignOut />
              <Contact />
              <Suspense fallback={null}>
                <Notifications />
              </Suspense>
            </PasswordChangeProvider>
          </Session>
        </main>
      </Layout>
    </SessionProvider>
  );
};

export { Contents };
