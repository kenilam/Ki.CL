import React, { useEffect } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// API
import {
  Kicl_ImageAgentDismissDocument,
  Kicl_ImageAgentNotificationsDocument,
  Kicl_ImageAgentThreadUpdatedDocument,
  useMutation,
  useQuery,
  useSubscription,
} from 'api/provider';

// Routes
import { useLocation } from 'design/router';

// Components
import { Notification } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Constants
import { toLabel, toPath } from '@/views/experiments/image-agent/constants';

const AVATARS = {
  FAILURE: <Ri.RiErrorWarningLine aria-hidden />,
  IMAGE: <Ri.RiImageLine aria-hidden />,
  PROGRESS: <Ri.RiLoader4Line aria-hidden className='is-revolving' />,
  QUESTION: <Ri.RiQuestionLine aria-hidden />,
  REFUSAL: <Ri.RiErrorWarningLine aria-hidden />,
  TEXT: <Ri.RiChat3Line aria-hidden />,
};

const LEVELS = {
  FAILURE: 'error',
  IMAGE: 'neutral',
  PROGRESS: 'neutral',
  QUESTION: 'neutral',
  REFUSAL: 'warning',
  TEXT: 'neutral',
} as const;

function useImageAgentNotifications() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const { data } = useQuery(Kicl_ImageAgentNotificationsDocument, {
    fetchPolicy: 'cache-and-network',
  });
  const [dismiss] = useMutation(Kicl_ImageAgentDismissDocument, {
    refetchQueries: [Kicl_ImageAgentNotificationsDocument],
  });

  const threads = data?.imageAgentNotifications ?? [];
  const running = threads.find(({ status }) => status !== 'IDLE');

  // One turn runs at a time, so one conversation is watched.
  useSubscription(Kicl_ImageAgentThreadUpdatedDocument, {
    skip: !running,
    variables: { id: running?.id ?? '' },
  });

  // The conversation on screen shows its own reply, so it isn't announced.
  const shown = threads.filter(({ id }) => toPath(id) !== pathname);
  const seen = threads.find(
    ({ id, status }) => status === 'IDLE' && toPath(id) === pathname
  )?.id;

  useEffect(() => {
    if (!seen) {
      return;
    }

    void dismiss({ variables: { id: seen } });
  }, [dismiss, seen]);

  const clear = (id: string) => dismiss({ variables: { id } });

  const ended = shown.filter(({ status }) => status === 'IDLE');

  const close = () => {
    ended.forEach(({ id }) => clear(id));
  };

  const notifications = shown.map((thread) => {
    const last = thread.messages.at(-1);

    if (thread.status !== 'IDLE') {
      return (
        <Notification
          avatar={AVATARS.PROGRESS}
          key={thread.id}
          title={toLabel(thread)}
          to={toPath(thread.id)}
        >
          {thread.activity ??
            (last?.kind === 'PROGRESS' ? last.text : null) ??
            t('status', { context: 'running' })}
        </Notification>
      );
    }

    const kind = last?.kind ?? 'TEXT';

    return (
      <Notification
        avatar={AVATARS[kind]}
        key={thread.id}
        level={LEVELS[kind]}
        onClear={() => clear(thread.id)}
        onClick={() => clear(thread.id)}
        title={toLabel(thread)}
        to={toPath(thread.id)}
      >
        {kind === 'IMAGE' ? t('picture_ready') : (last?.text ?? undefined)}
      </Notification>
    );
  });

  return { close, finished: ended.length > 0, notifications };
}

export { useImageAgentNotifications };
