import React, { useEffect } from 'react';

import { Kicl_MeDocument, useQuery } from 'api/provider';

// Routes
import { Outlet } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Partials
import { SignIn } from './sign-in';

// Constants
import { SESSION_ENDED } from './constants';

/**
 * The portfolio pieces are shared with a small audience on purpose - the gate
 * rides the platform's existing credential flow (SignIn mutation + session
 * cookies) rather than inventing a second one.
 *
 * It asks the server rather than reading the `aud` cookie: a session signed
 * out or revoked elsewhere keeps its cookies until they expire.
 */
const Contents: React.FunctionComponent = () => {
  const { data, error, loading, refetch } = useQuery(Kicl_MeDocument, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    const ended = () => void refetch().catch(() => undefined);

    addEventListener(SESSION_ENDED, ended);

    return () => removeEventListener(SESSION_ENDED, ended);
  }, [refetch]);

  if (loading && !data) {
    return <Spinner />;
  }

  if (error || data?.Me?.aud !== 'user') {
    return <SignIn onSignedIn={() => void refetch()} />;
  }

  return <Outlet />;
};

export { Contents };
