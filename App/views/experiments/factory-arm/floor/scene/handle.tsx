import React, { PropsWithChildren, useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';

// Partials
import { type Target, useDrag } from './drag';
import { useOutline } from './outline';
import { Remove } from './remove';

// Constants
import { DRAG, OUTLINE } from '@/views/experiments/factory-arm/floor/constants';

type Props = PropsWithChildren<
  Target & {
    /** The disc on the floor to take hold by: its radius and where it lies. */
    radius: number;
    position?: [number, number, number];
    /** How high over the disc the button to take it off floats while chosen. */
    top: number;
  }
>;

/**
 * An arm or a pallet as something to take hold of: the thing itself, and an
 * unseen disc on the floor under it. Pointing at either outlines the thing,
 * pressing on either starts a drag, and a click chooses it, which keeps the
 * outline and floats a button over it to take it off. An arm with an
 * obstacle standing in it is outlined red.
 */
const Handle: React.FunctionComponent<Props> = ({
  children,
  id,
  kind,
  position = [0, 0, 0],
  radius,
  top,
}) => {
  const { grab, hover, hovered, select, selected } = useDrag();
  const { struck } = useHub();
  const group = useRef<THREE.Group>(null);
  const chosen = selected?.kind === kind && selected.id === id;

  useOutline(
    group,
    kind === 'arm' && struck[id]?.length
      ? OUTLINE.struck
      : (chosen || (hovered?.kind === kind && hovered.id === id)) &&
          OUTLINE.chosen
  );

  const take = (event: Fiber.ThreeEvent<PointerEvent>) => {
    if (event.button === 0) {
      event.stopPropagation();
      // The view's controls listen on the same canvas: they must not start turning it.
      event.nativeEvent.stopImmediatePropagation();
      grab(kind, id);
    }
  };

  // A drag that ends on it isn't a click on it.
  const pick = (event: Fiber.ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    if (event.delta <= DRAG) {
      select(chosen ? null : { kind, id });
    }
  };

  return (
    <group
      onClick={pick}
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

      {chosen && (
        <Remove
          id={id}
          kind={kind}
          position={[position[0], position[1] + top, position[2]]}
        />
      )}
    </group>
  );
};

export { Handle };
