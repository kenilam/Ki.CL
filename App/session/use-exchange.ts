import { useCallback } from 'react';

import { CombinedGraphQLErrors } from '@apollo/client';

import {
  getApiKey,
  hasSession,
  Kicl_ExchangeTokenDocument,
  useMutation,
} from 'api/provider';

import { TOKEN_HEADER } from './constants';

type Outcome = 'ready' | 'rejected' | 'failed';

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

function isCaptchaRequired(error: unknown): boolean {
  return (
    CombinedGraphQLErrors.is(error) &&
    error.errors.some(
      ({ extensions }) => extensions?.code === 'CAPTCHA_REQUIRED'
    )
  );
}

/** Starts an anonymous session, sending the Turnstile token when there is one. */
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
        if (isCaptchaRequired(error)) {
          return 'rejected';
        }

        console.error('Session: bootstrap failed', error);
        return 'failed';
      }
    },
    [exchangeToken]
  );
}

export { useExchange };
