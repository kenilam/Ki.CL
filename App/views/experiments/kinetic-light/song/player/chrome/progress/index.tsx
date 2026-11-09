import React, { useEffect, useMemo, useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Input, Layout, Text } from 'design/components';

// Readers
import { lengthOf } from '@/views/experiments/kinetic-light/read/piece';

// Song
import { clock } from '@/views/experiments/kinetic-light/song/clock';

// Context
import { usePlayerContext } from '@/views/experiments/kinetic-light/song/player/context';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/kinetic-light/constants';

const CLASS_NAME = `${VIEW}__player__progress`;

const TICK_MS = 250;

const clockOf = (seconds: number): string =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

const Progress: React.FunctionComponent = () => {
  const { piece, transport } = usePlayerContext();
  const { t } = useTranslation();
  const { seek, status } = transport;
  const length = useMemo(() => Math.floor(lengthOf(piece)), [piece]);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const read = () =>
      setElapsed(Math.min(length, Math.max(0, Math.floor(clock()))));

    read();

    if (status !== 'playing') {
      return;
    }

    const timer = window.setInterval(read, TICK_MS);

    return () => window.clearInterval(timer);
  }, [length, status]);

  return (
    <Layout
      alignItems='center'
      autoFlow='column'
      frames='max-content--auto--max-content'
      gap='narrow'
    >
      <Text dense is='p' variant='secondary'>
        <time dateTime={`PT${elapsed}S`}>{clockOf(elapsed)}</time>
        <Input
          aria-label={t('label', { context: 'playback_position' })}
          aria-valuetext={t('playback_position', {
            duration: clockOf(length),
            elapsed: clockOf(elapsed),
          })}
          className={`${CLASS_NAME}__slider kicl-inline-size-full kicl-padding-none`}
          disabled={status === 'idle' || status === 'loading'}
          max={length}
          min={0}
          onChange={(event) => {
            const seconds = Number(event.target.value);

            seek(seconds);
            setElapsed(seconds);
          }}
          step={1}
          type='range'
          value={elapsed}
        />
        <time dateTime={`PT${length}S`}>{clockOf(length)}</time>
      </Text>
    </Layout>
  );
};

export { Progress };
