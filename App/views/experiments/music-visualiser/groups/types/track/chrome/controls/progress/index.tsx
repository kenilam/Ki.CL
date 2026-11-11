import React from 'react';

// Components
import { Layout, RangeInput, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

const clockOf = (seconds: number): string =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

const Progress: React.FunctionComponent = () => {
  const {
    control: { duration, elapsed, seek },
  } = useTrackContext();
  const { t } = useTranslation();
  const length = Math.floor(duration);
  const position = Math.min(length, Math.floor(elapsed));

  return (
    <Layout
      alignItems='center'
      autoFlow='column'
      frames='max-content--auto--max-content'
      gap='narrow'
    >
      <Text dense is='p' variant='secondary'>
        <Text dateTime={`PT${position}S`} is='time'>
          {clockOf(position)}
        </Text>
        <RangeInput
          aria-label={t('label', { context: 'playback_position' })}
          aria-valuetext={t('playback_position', {
            duration: clockOf(length),
            elapsed: clockOf(position),
          })}
          disabled={!length}
          max={length}
          min={0}
          onChange={(event) => seek(Number(event.target.value))}
          step={1}
          value={position}
        />
        <Text dateTime={`PT${length}S`} is='time'>
          {clockOf(length)}
        </Text>
      </Text>
    </Layout>
  );
};

export { Progress };
