import React, { useMemo, useRef } from 'react';

// Libraries
import classNames from 'classnames';

// Three
import { Canvas } from '@/three';

// Context
import { DEFAULT_SETTINGS } from '@/views/experiments/kinetic-light/player/context';
import {
  StageContext,
  type Settings,
} from '@/views/experiments/kinetic-light/stage/context';

// Partials
import { Scene } from '@/views/experiments/kinetic-light/stage/scene';

// Styles
import '@/views/experiments/kinetic-light/stage/styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/kinetic-light/constants';
import { LENGTH, PIECE, START } from './interstellar';

const CLASS_NAME = `${VIEW}__backdrop`;

const Backdrop: React.FunctionComponent = () => {
  const settings = useRef<Settings>({ ...DEFAULT_SETTINGS });
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

      return (START + (performance.now() - began) / 1000) % LENGTH;
    };
  }, [still]);

  return (
    <StageContext.Provider
      value={{ clock, length: LENGTH, piece: PIECE, settings }}
    >
      <Canvas
        aria-hidden
        camera={{ far: 200, fov: 65, near: 0.1 }}
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
        <Scene />
      </Canvas>
    </StageContext.Provider>
  );
};

export { Backdrop };
