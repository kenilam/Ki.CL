import { useCallback } from 'react';

import { Kicl_SignOutDocument, useMutation } from 'api/provider';

import { useEnded } from './use-ended';

/** Signs the user out without a page load. */
function useSignOut() {
  const ended = useEnded();
  const [signOut] = useMutation(Kicl_SignOutDocument);

  return useCallback(async () => {
    await signOut();
    await ended();
  }, [ended, signOut]);
}

export { useSignOut };
