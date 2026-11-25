import { useCallback } from 'react';

import { hasSession } from 'api/client';

import { SESSION_PATH, TOKEN_HEADER } from './constants';

type Outcome = 'ready' | 'rejected' | 'limited' | 'blocked' | 'failed';

/**
 * The outcomes the API names with an error code. `UNAUTHORIZED` means a
 * signed-in session ended and its cookies were cleared, so the visitor starts
 * an anonymous one through the challenge.
 */
const CODES: Record<string, Outcome> = {
  CAPTCHA_REQUIRED: 'rejected',
  UNAUTHORIZED: 'rejected',
  TOO_MANY_REQUESTS: 'limited',
};

async function codeOf(response: Response): Promise<string> {
  try {
    const body: { code?: string } = await response.json();

    return body.code ?? '';
  } catch {
    return '';
  }
}

/** Asks the gateway for a session with a Turnstile token. A live session is kept as it is. */
function useExchange() {
  return useCallback(async (token: string): Promise<Outcome> => {
    try {
      const response = await fetch(SESSION_PATH, {
        method: 'POST',
        credentials: 'include',
        headers: { [TOKEN_HEADER]: token },
      });

      if (!response.ok) {
        return CODES[await codeOf(response)] ?? 'failed';
      }

      return hasSession() ? 'ready' : 'blocked';
    } catch (error) {
      console.error('Session: bootstrap failed', error);
      return 'failed';
    }
  }, []);
}

export { useExchange };
