import React from 'react';

// Context
import { PasswordChangeProvider } from '@/views/context';

// Partials
import { Outlet } from './outlet';

const Page: React.FunctionComponent = () => {
  return (
    <PasswordChangeProvider>
      <Outlet />
    </PasswordChangeProvider>
  );
};

export { Page };
