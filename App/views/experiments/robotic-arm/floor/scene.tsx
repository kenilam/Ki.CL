import React, { useEffect, useMemo, useRef } from 'react';

// Libraries
import type { DirectionalLight } from 'three';

// Grid
import { toPoint } from 'arm/grid';

// Partials
import { Amrs } from './amr';
import { Arm } from './arm';
import { Belt } from './belt';
import { Cases } from './cases';
import { Ground } from './ground';
import { Obstacles } from './obstacles';
import { Pallet } from './pallet';
import { Workers } from './workers';

// World
import type { World } from './world';

/** Everything drawn on the floor, with the sun's shadows sized to it. */
const Scene: React.FunctionComponent<{ twinned: string[]; world: World }> = ({
  twinned,
  world,
}) => {
  const cells = useMemo(() => world.arms.map(({ cell }) => cell), [world]);
  const middle = toPoint(world.ground.centre);
  const reach = world.ground.radius * 1.6;
  const sun = useRef<DirectionalLight>(null);

  // A light's target is not in the scene, so it is moved and updated by hand.
  useEffect(() => {
    sun.current?.target.position.set(middle.x, 0, middle.z);
    sun.current?.target.updateMatrixWorld();
  }, [middle.x, middle.z]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        castShadow
        intensity={1.6}
        position={[middle.x + 6, 14, middle.z + 8]}
        shadow-camera-bottom={-reach}
        shadow-camera-left={-reach}
        shadow-camera-right={reach}
        shadow-camera-top={reach}
        ref={sun}
        shadow-mapSize={[2048, 2048]}
      />
      <Ground cells={cells} ground={world.ground} />
      {world.belts.map((belt) => (
        <Belt key={belt.id} belt={belt} />
      ))}
      {world.pallets.map((pallet) => (
        <Pallet key={pallet.id} pallet={pallet} />
      ))}
      {world.arms.map((arm) => (
        <Arm key={arm.id} arm={arm} twinned={twinned.includes(arm.id)} />
      ))}
      <Cases world={world} />
      <Obstacles obstacles={world.obstacles} />
      <Workers workers={world.workers} />
      <Amrs amrs={world.amrs} />
    </>
  );
};

export { Scene };
