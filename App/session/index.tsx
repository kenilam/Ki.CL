import React from 'react';

// Status
import { Status403, Status429, Status500, Status503 } from 'design/status';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useSessionContext } from './context';

// Partials
import { Challenge } from './challenge';
import { Starting } from './starting';

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
  const { live, stage } = useSessionContext();

  const { t } = useTranslation();

  const statuses: Partial<Record<typeof stage, React.ReactElement>> = {
    rejected: (
      <Status403
        message={t('session', { context: 'retry' })}
        title={t('session', { context: 'rejected' })}
      />
    ),
    limited: (
      <Status429
        message={t('session', { context: 'later' })}
        title={t('session', { context: 'limited' })}
      />
    ),
    blocked: (
      <Status403
        message={t('session', { context: 'cookies' })}
        title={t('session', { context: 'blocked' })}
      />
    ),
    unavailable: (
      <Status503
        message={t('session', { context: 'soon' })}
        title={t('session', { context: 'down' })}
      />
    ),
    failed: (
      <Status500
        message={t('session', { context: 'retry' })}
        title={t('session', { context: 'failed' })}
      />
    ),
  };

  const status = statuses[stage];

  if (status) {
    return status;
  }

  if (!live) {
    return <Starting />;
  }

  return (
    <>
      {children}
      <Challenge />
    </>
  );
};

export { Session };
export { SessionProvider, useChallenged, useSessionContext } from './context';
export { isChallenge } from './is-challenge';
export { useEnded } from './use-ended';
export { useSignOut } from './use-sign-out';
