import React from 'react';

import classNames from 'classnames';

import { useResponsive } from 'design/hooks';

import { Canvas } from '@/three';

import { Effects, Pause, Studio, Voxels } from '@/views/mark';

import { useStage } from '@/views/stage/context';
import { Debris } from '@/views/stage/debris';
import { Drive } from '@/views/stage/drive';
import { Rig } from '@/views/stage/rig';
import { Settle } from '@/views/stage/settle';

const CLASS_NAME = 'kicl--views--stage';

const Scene: React.FunctionComponent = () => {
  const { prefersReducedMotion: still } = useResponsive();
  const { node } = useStage();

  return (
    <div
      aria-hidden
      className={classNames(
        CLASS_NAME,
        'kicl-background-color-body',
        'kicl-inset-0',
        'kicl-pointer-events-none',
        'kicl-position-fixed',
        'kicl-print-hidden'
      )}
    >
      <div
        className={classNames(
          'kicl-inline-size-full',
          'kicl-margin-inline-auto',
          'kicl-max-inline-size-columns-12'
        )}
        ref={node}
      />
      <Canvas
        camera={{ fov: 30, position: [0, 0, 19] }}
        className={classNames(
          'kicl-block-size-full',
          'kicl-inline-size-full',
          'kicl-inset-0',
          'kicl-position-absolute'
        )}
        dpr={[1, 1.25]}
        frameloop={still ? 'demand' : 'always'}
        gl={{ antialias: true }}
        shadows
      >
        <Drive>
          <Rig>
            <Studio />
            <Voxels />
          </Rig>
          <Debris />
          <Effects />
          <Pause />
          <Settle />
        </Drive>
      </Canvas>
      <div
        className={classNames(
          'kicl-inset-0',
          'kicl-position-absolute',
          'kicl-tone-clamp'
        )}
      />
    </div>
  );
};

export { Scene };
