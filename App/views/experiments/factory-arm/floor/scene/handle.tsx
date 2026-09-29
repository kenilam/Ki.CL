import React, { PropsWithChildren, useEffect, useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Partials
import { type Target, useDrag } from './drag';

type Props = PropsWithChildren<
  Target & {
    /** The disc on the floor to take hold by: its radius and where it lies. */
    radius: number;
    position?: [number, number, number];
  }
>;

/** How far an outline stands off the thing it outlines, in metres. */
const EDGE = 0.02;

const OUTLINE = new THREE.MeshBasicMaterial({
  color: '#111111',
  side: THREE.BackSide,
});

/**
 * An arm or a pallet as something to take hold of: the thing itself, and an
 * unseen disc on the floor under it. Pointing at either outlines the thing,
 * and pressing on either starts a drag.
 */
const Handle: React.FunctionComponent<Props> = ({
  children,
  id,
  kind,
  position = [0, 0, 0],
  radius,
}) => {
  const { grab, hover, hovered } = useDrag();
  const group = useRef<THREE.Group>(null);
  const on = hovered?.kind === kind && hovered.id === id;

  // While pointed at: a back-faced copy of every mesh, a little bigger, shows round its edges.
  useEffect(() => {
    if (!on || !group.current) {
      return;
    }

    const hulls: THREE.Mesh[] = [];

    group.current.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        !child.userData.handle &&
        !child.userData.hull
      ) {
        const geometry = child.geometry as THREE.BufferGeometry;

        geometry.computeBoundingBox();

        const size = geometry.boundingBox!.getSize(new THREE.Vector3());
        const hull = new THREE.Mesh(geometry, OUTLINE);

        hull.userData.hull = true;
        hull.scale.set(
          (size.x + 2 * EDGE) / (size.x || 1),
          (size.y + 2 * EDGE) / (size.y || 1),
          (size.z + 2 * EDGE) / (size.z || 1)
        );
        child.add(hull);
        hulls.push(hull);
      }
    });

    return () => hulls.forEach((hull) => hull.removeFromParent());
  }, [on]);

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
        userData={{ handle: true }}
      >
        <circleGeometry args={[radius, 24]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {children}
    </group>
  );
};

export { Handle };
