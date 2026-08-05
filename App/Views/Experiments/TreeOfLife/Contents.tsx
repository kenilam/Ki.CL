import React, { useEffect, useState } from 'react';

import {
  hasSession,
  getApiKey,
  useMutation,
  Kicl_ExchangeTokenDocument,
} from 'api/provider';

import { Outlet } from '@/Router';

import { Spinner, Text } from '@/Components';

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

/**
 * An anonymous session, established once for every version beneath it.
 *
 * It used to sit inside the live view, so the archived versions reached the API
 * with whatever session a previous visit happened to leave behind — which
 * worked right up until somebody opened one first.
 */
const TreeOfLife: React.FunctionComponent = () => {
  const [sessionReady, setSessionReady] = useState(() => hasSession());
  const [bootstrapError, setBootstrapError] = useState<string | null>(null);
  const [exchangeToken] = useMutation(Kicl_ExchangeTokenDocument);

  useEffect(() => {
    if (sessionReady) {
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        await ensureApiKeyCookie();

        const apiKey = getApiKey();
        await exchangeToken({
          context: apiKey ? { headers: { 'x-api-key': apiKey } } : undefined,
        });

        if (!cancelled) {
          setSessionReady(hasSession());
          if (!hasSession()) {
            setBootstrapError('Unable to establish an anonymous session');
          }
        }
      } catch (error) {
        if (!cancelled) {
          setBootstrapError(
            error instanceof Error ? error.message : 'Session bootstrap failed'
          );
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionReady, exchangeToken]);

  if (bootstrapError) {
    return <Text variant='secondary'>{bootstrapError}</Text>;
  }

  if (!sessionReady) {
    return <Spinner position='inline' />;
  }

  return <Outlet />;
};

export default TreeOfLife;
