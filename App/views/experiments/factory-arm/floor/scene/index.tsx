import React, { useState } from 'react';

// Three
import { Drei, Fiber } from '@/three';

// Grid
import { centre, index } from '@/views/experiments/factory-arm/cell/grid/hex';

// Context
import {
  type Simulation,
  useHub,
} from '@/views/experiments/factory-arm/floor/hub';

// Partials
import { Camera } from './camera';
import { useDrag } from './drag';
import { Ghost } from './ghost';
import { Ground } from './ground';
import { Line } from './line';
import { Loose } from './loose';
import { Obstacles } from './obstacles';
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

/** The floor: the lines, the stations in their cells, what rides the lines, the obstacles, and where a drag would land. */
const Floor: React.FunctionComponent = () => {
  const { active, lines, run, stations } = useHub();

  return (
    <>
      {/* Framed once per simulation: an arm added or moved doesn't move the view. */}
      <View cells={active.cells} key={active.id} />

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
        <Obstacles />
      </group>
    </>
  );
};

/**
 * The camera, what it turns about and the lights, framed on the middle of
 * `cells` as they were when the simulation began. Drag to turn round the
 * floor, right-drag to pan, scroll or pinch to zoom; not while something
 * is held.
 */
const View: React.FunctionComponent<{ cells: Simulation['cells'] }> = ({
  cells,
}) => {
  const { dragging } = useDrag();
  const [at] = useState(() => middle(cells.map(({ hex }) => centre(hex))));

  return (
    <>
      <Camera at={at} />

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
    </>
  );
};

export { Scene };
