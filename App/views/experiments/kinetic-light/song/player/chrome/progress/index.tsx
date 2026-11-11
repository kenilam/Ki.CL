import React from 'react';

// Components
import { Layout, RangeInput, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useProgress } from './use-progress';

const clockOf = (seconds: number): string =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

const Progress: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { elapsed, length, move, status } = useProgress();

  return (
    <Layout
      alignItems='center'
      autoFlow='column'
      frames='max-content--auto--max-content'
      gap='narrow'
    >
      <Text dense is='p' variant='secondary'>
        <time dateTime={`PT${elapsed}S`}>{clockOf(elapsed)}</time>
        <RangeInput
          aria-label={t('label', { context: 'playback_position' })}
          aria-valuetext={t('playback_position', {
            duration: clockOf(length),
            elapsed: clockOf(elapsed),
          })}
          disabled={status === 'idle' || status === 'loading'}
          max={length}
          min={0}
          onChange={(event) => {
            move(Number(event.target.value));
          }}
          step={1}
          value={elapsed}
        />
        <time dateTime={`PT${length}S`}>{clockOf(length)}</time>
      </Text>
    </Layout>
  );
};

export { Progress };
