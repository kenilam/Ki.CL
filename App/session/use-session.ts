import { useCallback, useEffect, useRef, useState } from 'react';

import { hasSession } from 'api/client';

// Env
import { useEnvContext } from '@/env/client';

// Constants
import { MAX_REJECTIONS } from './constants';

// Hooks
import { useExchange } from './use-exchange';
import { useTurnstile } from './use-turnstile';

type Stage = 'challenge' | Awaited<ReturnType<ReturnType<typeof useExchange>>>;

/**
 * Where the gate is. A visitor without a session goes straight to the widget,
 * since the gateway answers a request without one with CAPTCHA_REQUIRED.
 *
 * A session that ends later, through a sign-out or a refused renewal, calls
 * `restart`, and a request that answers CAPTCHA_REQUIRED calls `challenge`.
 * Both show the widget over the page, which stays up while it runs.
 */
function useSession() {
  const { env, loading } = useEnvContext();
  const siteKey = env?.TURNSTILE_SITE_KEY || undefined;

  const [stage, setStage] = useState<Stage>(() =>
    hasSession() ? 'ready' : 'challenge'
  );
  const [rejections, setRejections] = useState(0);
  const [resuming, setResuming] = useState(false);
  const waiting = useRef<((ready: boolean) => void)[]>([]);

  const exchange = useExchange();
  const turnstile = useTurnstile(stage === 'challenge' ? siteKey : undefined);
  const { token, reset } = turnstile;

  const challenge = useCallback(
    () =>
      new Promise<boolean>((resolve) => {
        waiting.current.push(resolve);
        setResuming(true);
        setRejections(0);
        setStage((current) => (current === 'ready' ? 'challenge' : current));
      }),
    []
  );

  /*
   * Starts a new session over the page. Signing out clears the cookies, so
   * the visitor needs a new anonymous session.
   */
  const restart = useCallback(
    () =>
      new Promise<boolean>((resolve) => {
        waiting.current.push(resolve);
        setResuming(true);
        setRejections(0);
        setStage('challenge');
      }),
    []
  );

  useEffect(() => {
    if (stage === 'challenge') {
      return;
    }

    setResuming(false);

    for (const resolve of waiting.current.splice(0)) {
      resolve(stage === 'ready');
    }
  }, [stage]);

  useEffect(() => {
    if (stage !== 'challenge' || !token) {
      return;
    }

    let cancelled = false;

    const challenge = async () => {
      const outcome = await exchange(token);

      if (cancelled) {
        return;
      }

      if (outcome === 'rejected' && rejections + 1 < MAX_REJECTIONS) {
        setRejections(rejections + 1);
        reset();
      } else {
        setStage(outcome);
      }
    };

    void challenge();

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
    challenge,
    /** The page is up: the session is ready, or being renewed over it. */
    live: stage === 'ready' || resuming,
    restart,
    resuming,
    stage: unconfigured || turnstile.failed ? 'failed' : stage,
    turnstile,
  };
}

export { useSession };
