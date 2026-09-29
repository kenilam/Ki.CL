import React from 'react';

// Three
import type { Fiber } from '@/three';

// Partials
import { type Dragging, useDrag } from './drag';

type Props = {
  kind: Dragging['kind'];
  id: string;
  radius: number;
  position?: [number, number, number];
};

/** An unseen disc on the floor to take hold of an arm or a pallet by, to drag it elsewhere. */
const Handle: React.FunctionComponent<Props> = ({
  id,
  kind,
  position = [0, 0, 0],
  radius,
}) => {
  const { grab } = useDrag();

  const take = (event: Fiber.ThreeEvent<PointerEvent>) => {
    if (event.button === 0) {
      event.stopPropagation();
      // The view's controls listen on the same canvas: they must not start turning it.
      event.nativeEvent.stopImmediatePropagation();
      grab(kind, id);
    }
  };

  return (
    <mesh
      onPointerDown={take}
      onPointerOut={() => (document.body.style.cursor = '')}
      onPointerOver={(event) => {
        event.stopPropagation();
        document.body.style.cursor = 'grab';
      }}
      position={[position[0], position[1] + 0.005, position[2]]}
      rotation-x={-Math.PI / 2}
    >
      <circleGeometry args={[radius, 24]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
};

export { Handle };
