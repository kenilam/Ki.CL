import React, { useEffect, useState } from 'react';

import { hasSession } from 'api/provider';

// Components
import { Spinner, Text } from '@/components';

// Env
import { useEnvContext } from '@/env/client';

// Constants
import { ERROR_MESSAGE, MAX_REJECTIONS } from './constants';

// Hooks
import { useExchange } from './use-exchange';
import { useTurnstile } from './use-turnstile';

/**
 * Starts an anonymous session before rendering its children, after a
 * Turnstile check when a site key is set. Only routes that write to the API
 * need one, so `KiclProvider` no longer starts a session for every visitor.
 */
const Session: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  const { env } = useEnvContext();
  const siteKey = env?.TURNSTILE_SITE_KEY || undefined;

  const [ready, setReady] = useState(() => hasSession());
  const [failed, setFailed] = useState(false);
  const [rejections, setRejections] = useState(0);

  const exchange = useExchange();
  const turnstile = useTurnstile(ready || failed ? undefined : siteKey);
  const { token, reset } = turnstile;

  useEffect(() => {
    if (ready || failed || (siteKey && !token)) {
      return;
    }

    let cancelled = false;

    exchange(token).then((outcome) => {
      if (cancelled) {
        return;
      }

      if (outcome === 'ready') {
        setReady(true);
      } else if (outcome === 'rejected' && rejections + 1 < MAX_REJECTIONS) {
        setRejections(rejections + 1);
        reset();
      } else {
        setFailed(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [exchange, failed, ready, rejections, reset, siteKey, token]);

  if (ready) {
    return children;
  }

  if (failed || turnstile.failed) {
    return <Text variant='secondary'>{ERROR_MESSAGE}</Text>;
  }

  return (
    <>
      {!turnstile.interactive && <Spinner position='inline' />}
      <div ref={turnstile.container} />
    </>
  );
};

export { Session };
