import React from 'react';

// Three
import { Drei, Fiber } from '@/three';

// Grid
import { centre, index } from '@/views/experiments/factory-arm/cell/grid/hex';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';

// Partials
import { Camera } from './camera';
import { useDrag } from './drag';
import { Ghost } from './ghost';
import { Ground } from './ground';
import { Line } from './line';
import { Loose } from './loose';
import { Riders } from './riders';
import { Station } from './station';

/** The middle of the floor, for the camera to turn about. */
const middle = (points: { x: number; z: number }[]) => ({
  x: points.reduce((sum, { x }) => sum + x, 0) / Math.max(1, points.length),
  z: points.reduce((sum, { z }) => sum + z, 0) / Math.max(1, points.length),
});

const Scene: React.FunctionComponent = () => (
  <Fiber.Canvas
    dpr={[1, 2]}
    gl={{ antialias: true, alpha: true }}
    shadows='variance'
  >
    <Floor />
  </Fiber.Canvas>
);

/** The floor: the lines, the stations in their cells, what rides the lines, and where a drag would land. */
const Floor: React.FunctionComponent = () => {
  const { lines, run, stations } = useHub();
  const { dragging } = useDrag();
  const at = middle(stations.map(({ hex }) => centre(hex)));

  return (
    <>
      <Camera at={at} />

      {/* Drag to turn round the floor, right-drag to pan, scroll or pinch to zoom; not while something is held. */}
      <Drei.OrbitControls
        dampingFactor={0.08}
        enableDamping
        enabled={!dragging}
        maxDistance={30}
        maxPolarAngle={Math.PI / 2 - 0.05}
        minDistance={3}
        target={[at.x, 0.5, at.z]}
      />

      <ambientLight intensity={0.45} />
      <hemisphereLight args={['#ffffff', '#d8d2c4', 0.6]} />
      <directionalLight
        castShadow
        intensity={1.6}
        position={[at.x + 6, 12, at.z + 8]}
        shadow-bias={-0.0004}
        shadow-blurSamples={16}
        shadow-camera-bottom={-12}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-mapSize={[2048, 2048]}
        shadow-normalBias={0.02}
        shadow-radius={8}
      />
      <directionalLight position={[-5, 3, -4]} intensity={0.4} />

      <Ground />
      <Ghost />
      {/* A new run mounts its stations afresh, so nothing of the last floor lingers. */}
      <group key={run}>
        {lines.map((line) => (
          <group key={line.id}>
            <Line line={line} />
            <Riders line={line} />
          </group>
        ))}
        {stations.map((station) => (
          <Station key={index(station.hex)} station={station} />
        ))}
        <Loose />
      </group>
    </>
  );
};

export { Scene };
