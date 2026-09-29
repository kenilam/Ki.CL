import React from 'react';

// Three
import type { Fiber } from '@/three';

// Partials
import { useDrag } from './drag';

const SIZE = 40;

/** The floor under every cell. While something is dragged, it says where the pointer is, and takes the drop. */
const Ground: React.FunctionComponent = () => {
  const { drop, over } = useDrag();

  // Not gated on what is held: a quick gesture ends before React has drawn it held.
  const track = (event: Fiber.ThreeEvent<PointerEvent>) =>
    over({ x: event.point.x, z: event.point.z });

  return (
    <mesh
      onPointerMove={track}
      onPointerUp={drop}
      receiveShadow
      rotation-x={-Math.PI / 2}
    >
      <planeGeometry args={[SIZE, SIZE]} />
      <meshStandardMaterial color='#e9e6df' />
    </mesh>
  );
};

export { Ground };
