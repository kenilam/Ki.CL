import React, { useMemo } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Three
import { Canvas } from '@/three';

// Readers
import { lengthOf } from '@/views/experiments/kinetic-light/read/piece';

// Song
import { clock, playing } from '@/views/experiments/kinetic-light/song/clock';
import { settingsOf } from '@/views/experiments/kinetic-light/song/settings';
import { useSong } from '@/views/experiments/kinetic-light/song/use-song';

// Stage
import { StageContext } from '@/views/experiments/kinetic-light/stage/context';
import { ease, unwrap } from '@/views/experiments/kinetic-light/stage/playhead';
import { Scene } from '@/views/experiments/kinetic-light/stage/scene';
import { useSheet } from '@/views/experiments/kinetic-light/stage/use-sheet';

// Styles
import '@/views/experiments/kinetic-light/stage/styles.scss';

// Constants
import {
  END_HOLD_SECONDS,
  REPLAY_LEAD_SECONDS,
  CLASS_NAME as VIEW,
} from '@/views/experiments/kinetic-light/constants';

const CLASS_NAME = `${VIEW}__stage`;

const Stage: React.FunctionComponent = () => {
  const { piece, score, song } = useSong();
  const { t } = useTranslation('kinetic-light');
  const arrangement = song?.arrangement;
  const settings = useMemo(() => settingsOf(arrangement), [arrangement]);
  const sections = useMemo(
    () => arrangement?.sections.map(({ from }) => from) ?? [],
    [arrangement]
  );
  const sheet = useSheet(score, piece);
  const timing = useMemo(
    () => ({
      descent: REPLAY_LEAD_SECONDS,
      hold: END_HOLD_SECONDS,
      length: piece ? lengthOf(piece) : 0,
    }),
    [piece]
  );
  const looped = useMemo(() => ease(unwrap(clock, timing), playing), [timing]);

  if (!piece || !sheet) {
    return null;
  }

  return (
    <StageContext.Provider
      value={{ clock: looped, sections, settings, sheet, timing }}
    >
      <Canvas
        aria-label={t('scene', { title: piece.title })}
        camera={{ far: 400, fov: 50, near: 0.05 }}
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
