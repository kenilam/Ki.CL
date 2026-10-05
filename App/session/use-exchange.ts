import { useCallback } from 'react';

import {
  hasSession,
  Kicl_ExchangeTokenDocument,
  useMutation,
} from 'api/provider';

// Helper
import { GetErrorCode } from '@/helper';

import { TOKEN_HEADER } from './constants';

type Outcome = 'ready' | 'rejected' | 'limited' | 'failed';

/** The outcomes the API names with an error code. */
const CODES: Record<string, Outcome> = {
  CAPTCHA_REQUIRED: 'rejected',
  TOO_MANY_REQUESTS: 'limited',
};

const outcomeOf = (error: unknown): Outcome | undefined =>
  CODES[GetErrorCode(error) ?? ''];

/**
 * Starts an anonymous session, sending the Turnstile token when there is one.
 * Without one, a visitor with a refresh token still gets their session back.
 */
function useExchange() {
  const [exchangeToken] = useMutation(Kicl_ExchangeTokenDocument);

  return useCallback(
    async (token: string | null): Promise<Outcome> => {
      try {
        await exchangeToken({
          context: {
            headers: token ? { [TOKEN_HEADER]: token } : {},
          },
        });

        if (hasSession()) {
          return 'ready';
        }

        console.error('Session: anonymous session was not established');
        return 'failed';
      } catch (error) {
        const outcome = outcomeOf(error);

        if (outcome) {
          return outcome;
        }

        console.error('Session: bootstrap failed', error);
        return 'failed';
      }
    },
    [exchangeToken]
  );
}

export { useExchange };
