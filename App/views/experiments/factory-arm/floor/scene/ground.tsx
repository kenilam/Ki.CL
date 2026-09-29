import React from 'react';

// Three
import type { Fiber } from '@/three';

// Partials
import { useDrag } from './drag';

// Constants
import { DRAG } from '@/views/experiments/factory-arm/floor/constants';

const SIZE = 40;

/**
 * The floor under every cell. It says where the pointer is: where a drag
 * would land while something is held, or where a double click would add
 * an arm or a pallet. It takes the drop, and the double click.
 */
const Ground: React.FunctionComponent = () => {
  const { drop, over, tap } = useDrag();

  // Not gated on what is held: a quick gesture ends before React has drawn it held.
  const track = (event: Fiber.ThreeEvent<PointerEvent>) =>
    over({ x: event.point.x, z: event.point.z });

  // A drag to turn the view that ends on the floor isn't a click on it.
  const click = (event: Fiber.ThreeEvent<MouseEvent>) => {
    if (event.delta <= DRAG) {
      tap();
    }
  };

  return (
    <mesh
      onDoubleClick={click}
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
