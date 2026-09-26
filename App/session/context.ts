import { createContext, useCallback, useContext } from 'react';

// Helper
import { GetErrorCode } from '@/helper';

/** Resolves once the session is ready again, or false when it will not be. */
type Challenge = () => Promise<boolean>;

/** Outside a Session there is no check to run, so the request just fails. */
const SessionContext = createContext<Challenge>(() => Promise.resolve(false));

/** The API wants the Turnstile check before it will run this. */
const isChallenge = (error: unknown) =>
  GetErrorCode(error) === 'CAPTCHA_REQUIRED';

/**
 * Wraps a request the API may refuse with CAPTCHA_REQUIRED: the check is run
 * and the request sent once more. Any other error is thrown as it was.
 */
function useChallenged() {
  const challenge = useContext(SessionContext);

  return useCallback(
    async <T>(request: () => Promise<T>): Promise<T> => {
      try {
        return await request();
      } catch (error) {
        if (!isChallenge(error) || !(await challenge())) {
          throw error;
        }

        return request();
      }
    },
    [challenge]
  );
}

export { isChallenge, SessionContext, useChallenged };
