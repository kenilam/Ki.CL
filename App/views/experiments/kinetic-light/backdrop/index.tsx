import React, { useMemo } from 'react';

// Libraries
import classNames from 'classnames';

// Three
import { Canvas } from '@/three';

// Readers
import { readNotesScore } from '@/views/experiments/kinetic-light/read/score';

// Stage
import { StageContext } from '@/views/experiments/kinetic-light/stage/context';
import { Scene } from '@/views/experiments/kinetic-light/stage/scene';
import { DEFAULT_SETTINGS } from '@/views/experiments/kinetic-light/stage/settings';
import { useSheet } from '@/views/experiments/kinetic-light/stage/use-sheet';

// Styles
import '@/views/experiments/kinetic-light/stage/styles.scss';

// Partials
import { Lens } from './lens';

// Constants
import {
  END_HOLD_SECONDS,
  REPLAY_LEAD_SECONDS,
  CLASS_NAME as VIEW,
} from '@/views/experiments/kinetic-light/constants';
import { LENGTH, PIECE, START } from './interstellar';

const CLASS_NAME = `${VIEW}__backdrop`;

const SCORE = readNotesScore(PIECE);

const TIMING = {
  descent: REPLAY_LEAD_SECONDS,
  hold: END_HOLD_SECONDS,
  length: LENGTH,
};

const Backdrop: React.FunctionComponent = () => {
  const still = useMemo(() => {
    return matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
  const clock = useMemo(() => {
    let began: number | null = null;

    return () => {
      if (still) {
        return START;
      }

      began ??= performance.now();

      return START + (performance.now() - began) / 1000;
    };
  }, [still]);
  const sheet = useSheet(SCORE, PIECE);

  if (!sheet) {
    return null;
  }

  return (
    <StageContext.Provider
      value={{
        clock,
        sections: [],
        settings: DEFAULT_SETTINGS,
        sheet,
        timing: TIMING,
      }}
    >
      <Canvas
        aria-hidden
        camera={{ far: 400, fov: 50, near: 0.05 }}
        className={classNames(
          CLASS_NAME,
          'kicl-block-size-full',
          'kicl-inline-size-full',
          'kicl-inset-0',
          'kicl-pointer-events-none',
          'kicl-position-absolute'
        )}
        dpr={[1, 2]}
        frameloop={still ? 'demand' : 'always'}
        gl={{ antialias: true }}
      >
        <Lens />
        <Scene />
      </Canvas>
    </StageContext.Provider>
  );
};

export { Backdrop };
