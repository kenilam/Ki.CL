import React, { useEffect, useMemo, useState } from 'react';

// Libraries
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

// Env
import { useEnvContext } from '@/env/client';

// Brains
import type { Mode, Status } from 'arm/brains';

// Partials
import { Loop } from './loop';
import { Panel } from './panel';
import { Scene } from './scene';
import { View } from './view';

// Metrics
import { metrics } from './metrics';

// World
import { DEFAULT, layout, type Floor as Size } from './world';

// Constants
import { CAMERA, TWINNED } from './constants';

const Floor: React.FunctionComponent = () => {
  const [size, setSize] = useState<Size>(DEFAULT);
  const world = useMemo(() => layout(size), [size]);
  const [gauges] = useState(metrics);
  const [mode, setMode] = useState<Mode>('classic');
  const [status, setStatus] = useState<Status | null>(null);
  const path = useEnvContext().env?.KICL_ARM_LINK || undefined;
  const twinned = useMemo(
    () =>
      path && mode === 'physical'
        ? world.arms.slice(0, TWINNED).map(({ id }) => id)
        : [],
    [mode, path, world]
  );

  useEffect(() => {
    if (status) {
      gauges.status(status);
    }
  }, [gauges, status]);

  return (
    <>
      <Canvas camera={{ fov: CAMERA.fov }} shadows>
        <Loop
          gauges={gauges}
          onStatus={setStatus}
          path={path}
          twinned={twinned}
          world={world}
        />
        {/* A new floor is a new scene: nothing carries over from the last one. */}
        <Scene
          key={world.arms.length + ':' + world.amrs.length}
          twinned={twinned}
          world={world}
        />
        <OrbitControls makeDefault maxPolarAngle={Math.PI / 2.2} />
        <View world={world} />
      </Canvas>
      <Panel
        gauges={gauges}
        mode={mode}
        onModeChange={setMode}
        onSizeChange={setSize}
        path={path}
        size={size}
        status={status}
        twinned={twinned}
        world={world}
      />
    </>
  );
};

export { Floor };
