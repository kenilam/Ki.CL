import React, { useMemo, useRef } from 'react';

// Libraries
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import type { BloomEffect } from 'postprocessing';

// Three
import { Fiber } from '@/three';

// Context
import { useStageContext } from '@/views/experiments/kinetic-light/stage/context';

// Partials
import { Balls } from './balls';
import { Camera } from './camera';
import { Sheet } from './sheet';

// Stage
import { readPalette } from './palette';

const FOG_NEAR = 10;
const FOG_FAR = 45;
const BLOOM_PER_GLOW = 0.3;

const Scene: React.FunctionComponent = () => {
  const { settings } = useStageContext();
  const { gl } = Fiber.useThree();
  const palette = useMemo(() => readPalette(gl.domElement), [gl]);
  const bloom = useRef<BloomEffect>(null);

  Fiber.useFrame(() => {
    if (bloom.current) {
      bloom.current.intensity = settings.glow * BLOOM_PER_GLOW;
    }
  });

  return (
    <>
      <color attach='background' args={[palette.paper]} />
      <fog attach='fog' args={[palette.paper, FOG_NEAR, FOG_FAR]} />
      <Camera />
      <Sheet />
      <Balls />
      <EffectComposer>
        <Bloom
          intensity={settings.glow * BLOOM_PER_GLOW}
          luminanceThreshold={0.6}
          mipmapBlur
          ref={bloom}
        />
      </EffectComposer>
    </>
  );
};

export { Scene };
