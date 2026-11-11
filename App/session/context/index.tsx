import React, { createContext, useCallback, useContext } from 'react';

// Hooks
import { isChallenge } from '@/session/is-challenge';
import { useSession } from '@/session/use-session';

const SessionContext = createContext<ReturnType<typeof useSession> | null>(
  null
);

/**
 * Starts an anonymous session, after a Turnstile check when the API asks for
 * one. It sits at the root route, around the header as well as the page: the
 * API counts every request per session, and the header asks who is signed in.
 */
const SessionProvider: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  const session = useSession();

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

function useSessionContext() {
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error('useSessionContext needs a SessionProvider above it');
  }

  return session;
}

/**
 * Wraps a request the API may refuse with CAPTCHA_REQUIRED: the check is run
 * and the request sent once more. Any other error is thrown as it was.
 */
function useChallenged() {
  // Outside a SessionProvider there is no check to run, so the request just fails.
  const challenge = useContext(SessionContext)?.challenge;

  return useCallback(
    async <T,>(request: () => Promise<T>): Promise<T> => {
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

export { SessionProvider, useChallenged, useSessionContext };
