import React from 'react';

// Components
import { Layout, RangeInput, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useSongContext } from '@/views/experiments/kinetic-light/song/context';
import { settingsOf } from '@/views/experiments/kinetic-light/song/settings';
import type { Settings } from '@/views/experiments/kinetic-light/stage/settings';

// Hooks
import { useSave } from '@/views/experiments/kinetic-light/song/player/use-save';

type Props = { name: keyof Settings };

const RANGES: Record<
  keyof Settings,
  { max: number; min: number; step: number }
> = {
  glow: { max: 3, min: 0, step: 0.1 },
  hue: { max: 1, min: 0, step: 0.01 },
  zoom: { max: 20, min: 3, step: 0.5 },
};

const Range: React.FunctionComponent<Props> = ({ name }) => {
  const save = useSave();
  const { song } = useSongContext();
  const { t } = useTranslation('kinetic-light');
  const values = settingsOf(song?.arrangement);

  return (
    <Layout autoFlow='row' gap='none'>
      <label>
        <Text is='span' dense>
          {t('label', { context: name })}
        </Text>
        <RangeInput
          defaultValue={values[name]}
          max={RANGES[name].max}
          min={RANGES[name].min}
          onChange={(event) => save(name, Number(event.target.value))}
          step={RANGES[name].step}
        />
      </label>
    </Layout>
  );
};

export { Range };
