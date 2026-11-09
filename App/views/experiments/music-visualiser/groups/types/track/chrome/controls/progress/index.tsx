import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Input, Layout, Text } from 'design/components';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/music-visualiser/constants';

const CLASS_NAME = `${VIEW}__chrome__progress`;

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
        <time dateTime={`PT${position}S`}>{clockOf(position)}</time>
        <Input
          aria-label={t('label', { context: 'playback_position' })}
          aria-valuetext={t('playback_position', {
            duration: clockOf(length),
            elapsed: clockOf(position),
          })}
          className={`${CLASS_NAME}__slider kicl-inline-size-full kicl-padding-none`}
          disabled={!length}
          max={length}
          min={0}
          onChange={(event) => seek(Number(event.target.value))}
          step={1}
          type='range'
          value={position}
        />
        <time dateTime={`PT${length}S`}>{clockOf(length)}</time>
      </Text>
    </Layout>
  );
};

export { Progress };
