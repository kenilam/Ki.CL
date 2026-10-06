import { createContext, useCallback, useContext } from 'react';

// Helper
import { GetErrorCode } from '@/helper';

import type { useSession } from './use-session';

const SessionContext = createContext<ReturnType<typeof useSession> | null>(
  null
);

function useSessionContext() {
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error('useSessionContext needs a SessionProvider above it');
  }

  return session;
}

/** The API wants the Turnstile check before it will run this. */
const isChallenge = (error: unknown) =>
  GetErrorCode(error) === 'CAPTCHA_REQUIRED';

/**
 * Wraps a request the API may refuse with CAPTCHA_REQUIRED: the check is run
 * and the request sent once more. Any other error is thrown as it was.
 */
function useChallenged() {
  // Outside a SessionProvider there is no check to run, so the request just fails.
  const challenge = useContext(SessionContext)?.challenge;

  return useCallback(
    async <T>(request: () => Promise<T>): Promise<T> => {
      try {
        return await request();
      } catch (error) {
        if (!isChallenge(error) || !(await challenge?.())) {
          throw error;
        }

        return request();
      }
    },
    [challenge]
  );
}

export { isChallenge, SessionContext, useChallenged, useSessionContext };
