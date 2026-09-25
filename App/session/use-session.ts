import { useEffect, useState } from 'react';

import { hasSession } from 'api/provider';

// Env
import { useEnvContext } from '@/env/client';

// Constants
import { MAX_REJECTIONS } from './constants';

// Hooks
import { useExchange } from './use-exchange';
import { useTurnstile } from './use-turnstile';

type Stage =
  'probe' | 'challenge' | Awaited<ReturnType<ReturnType<typeof useExchange>>>;

/**
 * Where the gate is. It tries without a token first, so a visitor whose
 * session lapsed at midnight gets it back from their refresh token without a
 * check. Only a `rejected` probe shows the widget.
 */
function useSession() {
  const { env, loading } = useEnvContext();
  const siteKey = env?.TURNSTILE_SITE_KEY || undefined;

  const [stage, setStage] = useState<Stage>(() =>
    hasSession() ? 'ready' : 'probe'
  );
  const [rejections, setRejections] = useState(0);

  const exchange = useExchange();
  const turnstile = useTurnstile(stage === 'challenge' ? siteKey : undefined);
  const { token, reset } = turnstile;

  useEffect(() => {
    if (stage !== 'probe') {
      return;
    }

    let cancelled = false;

    exchange(null).then((outcome) => {
      if (!cancelled) {
        setStage(outcome === 'rejected' ? 'challenge' : outcome);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [exchange, stage]);

  useEffect(() => {
    if (stage !== 'challenge' || !token) {
      return;
    }

    let cancelled = false;

    exchange(token).then((outcome) => {
      if (cancelled) {
        return;
      }

      if (outcome === 'rejected' && rejections + 1 < MAX_REJECTIONS) {
        setRejections(rejections + 1);
        reset();
      } else {
        setStage(outcome);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [exchange, rejections, reset, stage, token]);

  /*
   * The API wants a check but there is no site key, because `/env` failed or
   * it isn't set. That's our fault, not the visitor's, so it isn't a 403.
   */
  const unconfigured = stage === 'challenge' && !loading && !siteKey;

  return {
    stage: unconfigured || turnstile.failed ? 'failed' : stage,
    turnstile,
  };
}

export { useSession };
