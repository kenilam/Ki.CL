import React, { useEffect, useState } from 'react';

import { hasSession } from 'api/provider';

// Components
import { Layout, Spinner } from '@/components';

// Router
import { HttpStatus } from '@/router';

// Env
import { useEnvContext } from '@/env/client';

// Constants
import { COPY, MAX_REJECTIONS } from './constants';

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
  const [failure, setFailure] = useState<'rejected' | 'failed' | null>(null);
  const [rejections, setRejections] = useState(0);

  const exchange = useExchange();
  const turnstile = useTurnstile(ready || failure ? undefined : siteKey);
  const { token, reset } = turnstile;

  useEffect(() => {
    if (ready || failure || (siteKey && !token)) {
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
        setFailure(outcome);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [exchange, failure, ready, rejections, reset, siteKey, token]);

  if (ready) {
    return children;
  }

  if (failure === 'rejected') {
    return <HttpStatus.Status403 message={COPY.retry} title={COPY.rejected} />;
  }

  if (failure || turnstile.failed) {
    return <HttpStatus.Status500 message={COPY.retry} title={COPY.failed} />;
  }

  return (
    <>
      {!turnstile.interactive && <Spinner in />}
      <Layout
        alignContent='center'
        justifyContent='center'
        justifyItems='center'
        fullScreen
      >
        <div ref={turnstile.container} />
      </Layout>
    </>
  );
};

export { Session };
