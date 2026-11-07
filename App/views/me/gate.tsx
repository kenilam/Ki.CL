import React from 'react';

// Routes
import { Navigate, Outlet } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Views
import { useAccount } from '@/views/account/use-account';
import { PAGES } from '@/views/routes';

/** The routes inside need a signed-in user. Anyone else is sent home. */
const Gate: React.FunctionComponent = () => {
  const { loading, me } = useAccount();

  if (loading) {
    return <Spinner />;
  }

  if (!me) {
    return <Navigate replace to={PAGES.home} />;
  }

  return <Outlet />;
};

export { Gate };
