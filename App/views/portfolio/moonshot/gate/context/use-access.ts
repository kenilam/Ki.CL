import { useEffect } from 'react';

import { Kicl_MeDocument, useQuery } from 'api/provider';

// Constants
import { PATH } from '@/views/portfolio/moonshot/constants';
import { SESSION_ENDED } from '@/views/portfolio/moonshot/gate/constants';

/**
 * The portfolio pieces are shared with a small audience on purpose - the gate
 * rides the platform's existing credential flow (SignIn mutation + session
 * cookies) rather than inventing a second one. Each piece has its own list of
 * users (`portfolio-access`), so signing in for one doesn't open the others.
 *
 * It asks the server rather than reading the `aud` cookie: a session signed
 * out or revoked elsewhere keeps its cookies until they expire.
 */
const useAccess = () => {
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

  const me = error ? undefined : data?.me;
  const signedIn = me?.aud === 'user';
  const allowed = Boolean(
    signedIn &&
    me.portfolios.some((portfolio) => {
      return portfolio.path === PATH;
    })
  );

  return { allowed, loading: loading && !data, signedIn };
};

export { useAccess };
