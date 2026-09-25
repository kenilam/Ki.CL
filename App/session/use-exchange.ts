import { useCallback } from 'react';

import { CombinedGraphQLErrors } from '@apollo/client';

import {
  getApiKey,
  hasSession,
  Kicl_ExchangeTokenDocument,
  useMutation,
} from 'api/provider';

import { TOKEN_HEADER } from './constants';

type Outcome = 'ready' | 'rejected' | 'limited' | 'failed';

const INTROSPECTION_BODY = JSON.stringify({
  operationName: 'IntrospectionQuery',
  query: '{ __typename }',
});

async function ensureApiKeyCookie(): Promise<void> {
  if (getApiKey()) {
    return;
  }

  await fetch('/graphql', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: INTROSPECTION_BODY,
  });
}

/** The outcomes the API names with an error code. */
const CODES: Record<string, Outcome> = {
  CAPTCHA_REQUIRED: 'rejected',
  TOO_MANY_REQUESTS: 'limited',
};

function outcomeOf(error: unknown): Outcome | undefined {
  if (!CombinedGraphQLErrors.is(error)) {
    return undefined;
  }

  const codes = error.errors.map(({ extensions }) => String(extensions?.code));

  return codes.map((code) => CODES[code]).find(Boolean);
}

/**
 * Starts an anonymous session, sending the Turnstile token when there is one.
 * Without one, a visitor with a refresh token still gets their session back.
 */
function useExchange() {
  const [exchangeToken] = useMutation(Kicl_ExchangeTokenDocument);

  return useCallback(
    async (token: string | null): Promise<Outcome> => {
      try {
        await ensureApiKeyCookie();

        const apiKey = getApiKey();
        await exchangeToken({
          context: {
            headers: {
              ...(apiKey ? { 'x-api-key': apiKey } : {}),
              ...(token ? { [TOKEN_HEADER]: token } : {}),
            },
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
