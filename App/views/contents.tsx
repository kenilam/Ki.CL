import React from 'react';

// Session
import { Session, SessionProvider } from '@/session';

// Partials
import { Shell } from './shell';

const Contents: React.FunctionComponent = () => {
  return (
    <SessionProvider>
      <Session>
        <Shell />
      </Session>
    </SessionProvider>
  );
};

export { Contents };
