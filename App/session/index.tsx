import React from 'react';

// Components
import { Dialog, Layout, Spinner } from '@/components';

// Router
import { HttpStatus } from '@/router';

// Constants
import { COPY } from './constants';

// Context
import { SessionContext } from './context';

// Hooks
import { useSession } from './use-session';

/**
 * Starts an anonymous session before rendering its children, after a
 * Turnstile check when the API asks for one. It sits at the root route: the
 * API counts every request per session, so every page needs one.
 *
 * A check asked for later, by a request the children made, runs in a dialog
 * over them, so what they were doing is still there when it passes.
 */
const Session: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  const { challenge, resuming, stage, turnstile } = useSession();

  if (stage === 'rejected') {
    return <HttpStatus.Status403 message={COPY.retry} title={COPY.rejected} />;
  }

  if (stage === 'limited') {
    return <HttpStatus.Status429 message={COPY.later} title={COPY.limited} />;
  }

  if (stage === 'failed') {
    return <HttpStatus.Status500 message={COPY.retry} title={COPY.failed} />;
  }

  if (stage === 'ready') {
    return (
      <SessionContext.Provider value={challenge}>
        {children}
      </SessionContext.Provider>
    );
  }

  if (resuming) {
    return (
      <SessionContext.Provider value={challenge}>
        {children}
        <Dialog closable={false} dense open title={COPY.checking}>
          {!turnstile.interactive && <Spinner in position='inline' />}
          <div ref={turnstile.container} />
        </Dialog>
      </SessionContext.Provider>
    );
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
export { isChallenge, useChallenged } from './context';
