import { Kicl_MeDocument, skipToken, useQuery } from 'api/provider';

// Session
import { useSessionContext } from '@/session';

/**
 * The signed-in user, or no one for an anonymous visitor. Every caller reads
 * the same cached `Me`, so a sign-in or sign-out anywhere updates them all.
 */
function useAccount() {
  const { live } = useSessionContext();

  // `Me` needs a session, anonymous or not.
  const { data, error, loading } = useQuery(
    Kicl_MeDocument,
    live ? {} : skipToken
  );

  const me = error ? undefined : data?.Me;

  return {
    loading: loading && !data,
    me: me?.aud === 'user' ? me : undefined,
  };
}

export { useAccount };
