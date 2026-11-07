import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Routes
import { useLocation } from 'design/router';

// Components
import { Notification } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Context
import { usePasswordChangeContext } from './context';

// Constants
import { PAGE_PATH } from './constants';

const AVATARS = {
  done: <Ri.RiShieldCheckLine aria-hidden />,
  expired: <Ri.RiTimeLine aria-hidden />,
  failed: <Ri.RiErrorWarningLine aria-hidden />,
};

const LEVELS = {
  done: 'confirm',
  expired: 'warning',
  failed: 'error',
} as const;

function usePasswordChangeNotifications() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { reset, stage } = usePasswordChangeContext();

  // The page says how it ended itself.
  const ended =
    pathname !== PAGE_PATH &&
    (stage === 'done' || stage === 'expired' || stage === 'failed')
      ? stage
      : null;

  const close = () => {
    if (!ended) {
      return;
    }

    reset();
  };

  // Opening the page to try again is not clearing it: the page shows what happened.
  const notifications = ended
    ? [
        <Notification
          avatar={AVATARS[ended]}
          key='password-change'
          level={LEVELS[ended]}
          onClear={reset}
          title={t('change_password')}
          to={ended === 'done' ? undefined : PAGE_PATH}
        >
          {t('password_change', { context: ended })}
        </Notification>,
      ]
    : [];

  return { close, finished: Boolean(ended), notifications };
}

export { usePasswordChangeNotifications };
