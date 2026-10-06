import React, { useId } from 'react';

// Components
import { Dialog, Heading, Layout, Spinner, Text } from 'design/components';

// Status
import { Status403, Status429, Status500 } from 'design/status';

// Constants
import { COPY } from './constants';

// Context
import { SessionContext, useSessionContext } from './context';

// Hooks
import { useSession } from './use-session';

/**
 * Starts an anonymous session, after a Turnstile check when the API asks for
 * one. It sits at the root route, around the header as well as the page: the
 * API counts every request per session, and the header asks who is signed in.
 */
const SessionProvider: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  const session = useSession();

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

/**
 * Renders its children once the session is ready.
 *
 * A session renewed later, for a check a request asked for or after a
 * sign-out, is renewed over them, so what they were doing is still there
 * when it is ready again. Only the check itself shows, in a dialog.
 */
const Session: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  const { live, resuming, stage, turnstile } = useSessionContext();

  const titleId = useId();
  const messageId = useId();

  if (stage === 'rejected') {
    return <Status403 message={COPY.retry} title={COPY.rejected} />;
  }

  if (stage === 'limited') {
    return <Status429 message={COPY.later} title={COPY.limited} />;
  }

  if (stage === 'failed') {
    return <Status500 message={COPY.retry} title={COPY.failed} />;
  }

  if (live) {
    return (
      <>
        {children}
        {resuming && (
          <Dialog
            aria-describedby={messageId}
            aria-labelledby={titleId}
            closable={false}
            open={stage === 'challenge'}
            role='alertdialog'
          >
            <Layout
              alignContent='center'
              alignItems='center'
              justifyContent='center'
              justifyItems='center'
            >
              <section className='kicl-padding-block-end-wide'>
                <Heading dense id={titleId}>
                  {COPY.checking}
                </Heading>
                <Text className='kicl-font-size-small' id={messageId} is='p'>
                  {turnstile.interactive ? COPY.interact : COPY.wait}
                </Text>
                <Spinner in={!turnstile.interactive} position='inline' />
                <div ref={turnstile.container} />
              </section>
            </Layout>
          </Dialog>
        )}
      </>
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

export { Session, SessionProvider };
export { isChallenge, useChallenged, useSessionContext } from './context';
export { useEnded } from './use-ended';
export { useSignOut } from './use-sign-out';
