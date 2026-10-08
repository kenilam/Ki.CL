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

type Props = {
  /** The piece's path segment, as stored in Ki.CL-back's `portfolio`. */
  path: string;
};

/**
 * The portfolio pieces are shared with a small audience on purpose - the gate
 * rides the platform's existing credential flow (SignIn mutation + session
 * cookies) rather than inventing a second one. Each piece has its own list of
 * users (`portfolio-access`), so signing in for one doesn't open the others.
 *
 * It asks the server rather than reading the `aud` cookie: a session signed
 * out or revoked elsewhere keeps its cookies until they expire.
 */
const Contents: React.FunctionComponent<Props> = ({ path }) => {
  const { data, error, loading, refetch } = useQuery(Kicl_MeDocument, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    const ended = async () => {
      try {
        await refetch();
      } catch {
        // The query's `error` is set, which shows the sign-in.
      }
    };

    addEventListener(SESSION_ENDED, ended);

    return () => removeEventListener(SESSION_ENDED, ended);
  }, [refetch]);

  if (loading && !data) {
    return <Spinner />;
  }

  const me = error ? undefined : data?.Me;
  const signedIn = me?.aud === 'user';
  const allowed = Boolean(
    signedIn && me.Portfolios.some((portfolio) => portfolio.Path === path)
  );

  if (!allowed) {
    return <SignIn denied={signedIn} onSignedIn={() => void refetch()} />;
  }

  return <Outlet />;
};

export { Contents };
