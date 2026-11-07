import React, { useMemo } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Three
import { Canvas } from '@/three';

// Readers
import { lengthOf } from '@/views/experiments/kinetic-light/read/piece';

// Song
import { clock } from '@/views/experiments/kinetic-light/song/clock';
import { settingsOf } from '@/views/experiments/kinetic-light/song/settings';
import { useSong } from '@/views/experiments/kinetic-light/song/use-song';

// Stage
import { StageContext } from '@/views/experiments/kinetic-light/stage/context';
import { Scene } from '@/views/experiments/kinetic-light/stage/scene';

// Styles
import '@/views/experiments/kinetic-light/stage/styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/kinetic-light/constants';

const CLASS_NAME = `${VIEW}__stage`;

const Stage: React.FunctionComponent = () => {
  const { piece, song } = useSong();
  const { t } = useTranslation('kinetic-light');
  const arrangement = song?.arrangement;
  const settings = useMemo(() => settingsOf(arrangement), [arrangement]);
  const length = useMemo(() => (piece ? lengthOf(piece) : 0), [piece]);

  if (!piece) {
    return null;
  }

  return (
    <StageContext.Provider value={{ clock, length, piece, settings }}>
      <Canvas
        aria-label={t('scene', { title: piece.title })}
        camera={{ far: 200, fov: 65, near: 0.1 }}
        className={classNames(
          CLASS_NAME,
          'kicl-block-size-full',
          'kicl-inline-size-full',
          'kicl-inset-0',
          'kicl-position-absolute'
        )}
        dpr={[1, 2]}
        gl={{ antialias: true }}
        role='img'
      >
        <Scene />
      </Canvas>
    </StageContext.Provider>
  );
};

export { Stage };
