import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Input } from '@/components';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/music-visualiser/constants';

const CLASS_NAME = `${VIEW}__chrome__volume`;

const COPY = {
  volume: 'Volume',
};

/** The volume slider, remembered between visits. */
const Volume: React.FunctionComponent = () => {
  const { control } = useTrackContext();

  return (
    <Input
      aria-label={COPY.volume}
      className={classNames(CLASS_NAME, 'kicl-inline-size-md')}
      max={1}
      min={0}
      onChange={(event) => control.setValue(Number(event.target.value))}
      step={0.01}
      type='range'
      value={control.value}
    />
  );
};

export { Volume };
