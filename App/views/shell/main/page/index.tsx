import React from 'react';

// Session
import { Session } from '@/session';

// Context
import { PasswordChangeProvider } from '@/views/context';

// Partials
import { Outlet } from './outlet';

/** Every request to the API is counted per session, so every page has one. */
const Page: React.FunctionComponent = () => {
  return (
    <Session>
      <PasswordChangeProvider>
        <Outlet />
      </PasswordChangeProvider>
    </Session>
  );
};

export { Page };
