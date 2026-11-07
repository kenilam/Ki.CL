import React, { useEffect, useMemo, useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// API
import {
  Kicl_KineticLightDismissDocument,
  Kicl_KineticLightReadingUpdatedDocument,
  Kicl_KineticLightReadingsDocument,
  useMutation,
  useSubscription,
} from 'api/provider';

// Components
import { Notification } from 'design/components';

// Routes
import { useLocation } from 'design/router';

// Icons
import * as Ri from 'react-icons/ri';

// Readers
import { readSong } from '@/views/experiments/kinetic-light/read/song';

// Hooks
import { useArrange } from '@/views/experiments/kinetic-light/use-arrange';
import { useReadings } from '@/views/experiments/kinetic-light/use-readings';

// Partials
import { progressOf } from '@/views/experiments/kinetic-light/progress/message';

// Constants
import { toPath } from '@/views/experiments/kinetic-light/constants';

const AVATARS = {
  FAILED: <Ri.RiErrorWarningLine aria-hidden />,
  READING: <Ri.RiLoader4Line aria-hidden className='is-revolving' />,
  READY: <Ri.RiMusic2Line aria-hidden />,
};

const LEVELS = {
  FAILED: 'error',
  READING: 'neutral',
  READY: 'neutral',
} as const;

function useKineticLightNotifications() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { readings, running } = useReadings();
  const arrange = useArrange();
  const [failed, setFailed] = useState<string[]>([]);
  const [dismiss] = useMutation(Kicl_KineticLightDismissDocument, {
    refetchQueries: [Kicl_KineticLightReadingsDocument],
  });

  useSubscription(Kicl_KineticLightReadingUpdatedDocument, { skip: !running });

  const arranging = useMemo(
    () =>
      readings
        .filter(
          ({ arrangement, id, status }) =>
            status === 'READY' && !arrangement && !failed.includes(id)
        )
        .map(({ id }) => id),
    [failed, readings]
  );
  const shown = readings.filter(({ id }) => toPath(id) !== pathname);
  const ended = shown.filter(
    ({ id, status }) => status !== 'READING' && !arranging.includes(id)
  );
  const seen = readings.find(
    ({ id, status }) => status !== 'READING' && toPath(id) === pathname
  )?.id;

  useEffect(() => {
    if (!seen) {
      return;
    }

    void dismiss({ variables: { id: seen } });
  }, [dismiss, seen]);

  useEffect(() => {
    readings
      .filter(({ id }) => arranging.includes(id))
      .forEach((reading) => {
        const piece = readSong(reading);

        if (!piece) {
          return;
        }

        arrange(reading, piece).catch(() =>
          setFailed((ids) => [...ids, reading.id])
        );
      });
  }, [arrange, arranging, readings]);

  const clear = (id: string) => dismiss({ variables: { id } });

  const close = () => {
    ended.forEach(({ id }) => clear(id));
  };

  const notifications = shown.map((reading) => {
    const working =
      reading.status === 'READING' || arranging.includes(reading.id);
    let message = reading.failure ?? t('ready_to_play');

    if (reading.status === 'READING') {
      message = progressOf(t, reading);
    }

    if (arranging.includes(reading.id)) {
      message = t('arranging');
    }

    return (
      <Notification
        avatar={working ? AVATARS.READING : AVATARS[reading.status]}
        key={reading.id}
        level={LEVELS[reading.status]}
        onClear={working ? undefined : () => clear(reading.id)}
        onClick={
          reading.status === 'READY' && !working
            ? () => clear(reading.id)
            : undefined
        }
        title={reading.title}
        to={
          reading.status === 'READY' && !working
            ? toPath(reading.id)
            : undefined
        }
      >
        {message}
      </Notification>
    );
  });

  return { close, finished: ended.length > 0, notifications };
}

export { useKineticLightNotifications };
