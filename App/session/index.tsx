import React from 'react';

// Components
import { Layout, Spinner } from '@/components';

// Router
import { HttpStatus } from '@/router';

// Constants
import { COPY } from './constants';

// Hooks
import { useSession } from './use-session';

/**
 * Starts an anonymous session before rendering its children, after a
 * Turnstile check when the API asks for one. Only routes that write to the
 * API need one, so `KiclProvider` doesn't start a session for every visitor.
 */
const Session: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  const { stage, turnstile } = useSession();

  if (stage === 'ready') {
    return children;
  }

  if (stage === 'rejected') {
    return <HttpStatus.Status403 message={COPY.retry} title={COPY.rejected} />;
  }

  if (stage === 'limited') {
    return <HttpStatus.Status429 message={COPY.later} title={COPY.limited} />;
  }

  if (stage === 'failed') {
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
