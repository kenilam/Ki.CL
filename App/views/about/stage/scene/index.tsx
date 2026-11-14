import React from 'react';

import classNames from 'classnames';

import { useResponsive } from 'design/hooks';

import { Canvas } from '@/three';

import { Effects, Pause, Studio, Voxels } from '@/views/mark';

import { useStage } from '@/views/about/stage/context';
import { Debris } from '@/views/about/stage/debris';
import { Drive } from '@/views/about/stage/drive';
import { Rig } from '@/views/about/stage/rig';
import { Settle } from '@/views/about/stage/settle';

import { CLASS_NAME as ABOUT } from '@/views/about/constants';

const CLASS_NAME = `${ABOUT}__stage`;

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
        'kicl-position-fixed'
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
