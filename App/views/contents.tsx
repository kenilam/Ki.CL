import React from 'react';

// Session
import { SessionProvider } from '@/session';

// Partials
import { Shell } from './shell';

const Contents: React.FunctionComponent = () => {
  return (
    <SessionProvider>
      <Shell />
    </SessionProvider>
  );
};

export { Contents };
