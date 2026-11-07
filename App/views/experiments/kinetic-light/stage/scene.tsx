import React, { useLayoutEffect, useMemo, useRef } from 'react';

// Libraries
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import type { BloomEffect } from 'postprocessing';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useStageContext } from '@/views/experiments/kinetic-light/stage/context';

// Partials
import { Highway } from './highway';
import { Notes } from './notes';
import { Particles } from './particles';
import { Ripples } from './ripples';

// Stage
import { createHits } from './hits';
import { DEPTH, toCamera, toSpan } from './layout';
import { readPalette } from './palette';

const FOG_FROM = 0.4;

const Scene: React.FunctionComponent = () => {
  const { piece, settings } = useStageContext();
  const { camera, gl, size } = Fiber.useThree();
  const palette = useMemo(() => readPalette(gl.domElement), [gl]);
  const span = useMemo(() => toSpan(piece.notes), [piece]);
  const hits = useMemo(() => createHits(), []);
  const bloom = useRef<BloomEffect>(null);
  const reducedMotion = useMemo(
    () => matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const rig = useMemo(
    () =>
      toCamera(
        span,
        size.width / Math.max(1, size.height),
        (camera as THREE.PerspectiveCamera).fov
      ),
    [camera, size.height, size.width, span]
  );

  useLayoutEffect(() => {
    camera.position.set(...rig.position);
    camera.lookAt(...rig.target);
  }, [camera, rig]);

  Fiber.useFrame(() => {
    if (bloom.current) {
      bloom.current.intensity = settings.current.glow;
    }
  });

  return (
    <>
      <color attach='background' args={[palette.paper]} />
      <fog
        attach='fog'
        args={[
          palette.paper,
          rig.distance + DEPTH * FOG_FROM,
          rig.distance + DEPTH,
        ]}
      />
      <Highway palette={palette} span={span} />
      <Notes hits={hits} palette={palette} span={span} />
      {reducedMotion ? null : <Ripples hits={hits} />}
      {reducedMotion ? null : <Particles hits={hits} />}
      <EffectComposer>
        <Bloom
          intensity={settings.current.glow}
          luminanceThreshold={0.6}
          mipmapBlur
          ref={bloom}
        />
      </EffectComposer>
    </>
  );
};

export { Scene };
