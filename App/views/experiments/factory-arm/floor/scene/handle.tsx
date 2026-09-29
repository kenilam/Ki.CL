import React, { PropsWithChildren, useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';

// Partials
import { type Target, useDrag } from './drag';
import { useOutline } from './outline';

// Constants
import { OUTLINE } from '@/views/experiments/factory-arm/floor/constants';

type Props = PropsWithChildren<
  Target & {
    /** The disc on the floor to take hold by: its radius and where it lies. */
    radius: number;
    position?: [number, number, number];
  }
>;

/**
 * An arm or a pallet as something to take hold of: the thing itself, and an
 * unseen disc on the floor under it. Pointing at either outlines the thing,
 * and pressing on either starts a drag. An arm with an obstacle standing in
 * it is outlined red.
 */
const Handle: React.FunctionComponent<Props> = ({
  children,
  id,
  kind,
  position = [0, 0, 0],
  radius,
}) => {
  const { grab, hover, hovered } = useDrag();
  const { struck } = useHub();
  const group = useRef<THREE.Group>(null);

  // Red while an obstacle stands in the arm; otherwise dark while pointed at.
  useOutline(
    group,
    kind === 'arm' && struck[id]?.length
      ? OUTLINE.struck
      : hovered?.kind === kind && hovered.id === id && OUTLINE.chosen
  );

  const take = (event: Fiber.ThreeEvent<PointerEvent>) => {
    if (event.button === 0) {
      event.stopPropagation();
      // The view's controls listen on the same canvas: they must not start turning it.
      event.nativeEvent.stopImmediatePropagation();
      grab(kind, id);
    }
  };

  return (
    <group
      onPointerDown={take}
      onPointerOut={() => {
        document.body.style.cursor = '';
        hover(null);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        document.body.style.cursor = 'grab';
        hover({ kind, id });
      }}
      ref={group}
    >
      <mesh
        position={[position[0], position[1] + 0.005, position[2]]}
        rotation-x={-Math.PI / 2}
        userData={{ skip: true }}
      >
        <circleGeometry args={[radius, 24]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {children}
    </group>
  );
};

export { Handle };
