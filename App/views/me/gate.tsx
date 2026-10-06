import React from 'react';

// Routes
import { Navigate, Outlet } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Views
import { useAccount } from '@/views/account/use-account';
import { PATH as HOME_PATH } from '@/views/home';

/** The routes inside need a signed-in user. Anyone else is sent home. */
const Gate: React.FunctionComponent = () => {
  const { loading, me } = useAccount();

  if (loading) {
    return <Spinner />;
  }

  if (!me) {
    return <Navigate replace to={`/${HOME_PATH}`} />;
  }

  return <Outlet />;
};

export { Gate };
