import React from 'react';

// World
import type { Obstacle } from '../world';

// Constants
import { COLOURS } from '../constants';

/** Walls, pillars and posts. They stand still, so they render once. */
const Obstacles: React.FunctionComponent<{ obstacles: Obstacle[] }> = ({
  obstacles,
}) => (
  <>
    {obstacles.map(({ heading, id, kind, position, size: [w, h, d] }) => (
      <mesh
        castShadow
        key={id}
        position={[position.x, h / 2, position.z]}
        receiveShadow
        rotation-y={heading}
      >
        {kind === 'wall' ? (
          <boxGeometry args={[w, h, d]} />
        ) : (
          <cylinderGeometry args={[w / 2, w / 2, h, 20]} />
        )}
        <meshStandardMaterial color={COLOURS[kind]} />
      </mesh>
    ))}
  </>
);

export { Obstacles };
