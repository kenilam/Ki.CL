import React, { useMemo, useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Protocol
import type { Box } from 'arm/protocol';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';

// Partials
import { useDrag } from './drag';
import { useOutline } from './outline';
import { Remove } from './remove';

// Constants
import { DRAG, OUTLINE } from '@/views/experiments/factory-arm/floor/constants';

const GREY = new THREE.Color('#8f9398');
const GLOW = new THREE.Color('#f07d1a');
const DARK = new THREE.Color('#000000');

/** A box's footprint on the floor, closed, at height `lift`. */
const footprint = ({ min, max }: Box, lift = 0.003) =>
  [
    [min.x, min.z],
    [max.x, min.z],
    [max.x, max.z],
    [min.x, max.z],
    [min.x, min.z],
  ].map(([x, z]) => [x, lift, z] as [number, number, number]);

/** The obstacles on the floor, where the hub has them. Each can be dragged elsewhere, or chosen and moved by the keys. */
const Obstacles: React.FunctionComponent = () => {
  const { obstacles } = useHub();

  return obstacles.map((box) => <Obstacle box={box} key={box.id} />);
};

/**
 * One obstacle: a grey block that lights up orange for as long as a case
 * waits because of it, outlined while pointed at or chosen, red while it
 * stands in an arm or on a belt, with a button over it to take it off
 * while chosen. Pressing on it starts a drag; a click chooses it.
 */
const Obstacle: React.FunctionComponent<{ box: Box }> = ({ box }) => {
  const { blocking, parked, struck } = useHub();
  const { grab, hover, hovered, select, selected } = useDrag();
  const group = useRef<THREE.Group>(null);
  const { min, max } = box;
  const size: [number, number, number] = [
    max.x - min.x,
    max.y - min.y,
    max.z - min.z,
  ];
  const chosen = selected?.kind === 'obstacle' && selected.id === box.id;

  // Red while it stands in an arm or on a belt; otherwise dark while chosen or pointed at.
  useOutline(
    group,
    blocking.includes(box.id) ||
      Object.values(struck).some((ids) => ids.includes(box.id))
      ? OUTLINE.struck
      : (chosen || (hovered?.kind === 'obstacle' && hovered.id === box.id)) &&
          OUTLINE.chosen,
    box
  );

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: GREY,
        emissive: DARK,
        roughness: 0.6,
      }),
    []
  );

  Fiber.useFrame(() => {
    const waited = [...parked.current.values()].some((across) =>
      across.includes(box.id)
    );

    material.emissive.copy(waited ? GLOW : DARK);
  });

  const take = (event: Fiber.ThreeEvent<PointerEvent>) => {
    if (event.button === 0) {
      event.stopPropagation();
      // The view's controls listen on the same canvas: they must not start turning it.
      event.nativeEvent.stopImmediatePropagation();
      grab('obstacle', box.id);
    }
  };

  // A drag that ends on it isn't a click on it.
  const pick = (event: Fiber.ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    if (event.delta <= DRAG) {
      select(chosen ? null : { kind: 'obstacle', id: box.id });
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
        hover({ kind: 'obstacle', id: box.id });
      }}
      ref={group}
    >
      <mesh
        castShadow
        material={material}
        position={[
          (min.x + max.x) / 2,
          (min.y + max.y) / 2,
          (min.z + max.z) / 2,
        ]}
        receiveShadow
      >
        <boxGeometry args={size} />
      </mesh>

      {chosen && (
        <Remove
          id={box.id}
          kind='obstacle'
          position={[(min.x + max.x) / 2, max.y + 0.2, (min.z + max.z) / 2]}
        />
      )}
    </group>
  );
};

export { footprint, Obstacles };
