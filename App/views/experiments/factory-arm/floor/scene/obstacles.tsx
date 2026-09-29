import React, { useMemo } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Protocol
import type { Box } from '@/views/experiments/factory-arm/cell/protocol';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';

// Partials
import { useDrag } from './drag';

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

/** The obstacles on the floor, where the hub has them. Each can be dragged elsewhere. */
const Obstacles: React.FunctionComponent = () => {
  const { obstacles } = useHub();

  return obstacles.map((box) => <Obstacle box={box} key={box.id} />);
};

/**
 * One obstacle: a grey block that lights up orange for as long as a case
 * waits because of it. Taking hold of it starts a drag.
 */
const Obstacle: React.FunctionComponent<{ box: Box }> = ({ box }) => {
  const { parked } = useHub();
  const { grab } = useDrag();
  const { min, max } = box;
  const size: [number, number, number] = [
    max.x - min.x,
    max.y - min.y,
    max.z - min.z,
  ];

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

  return (
    <mesh
      castShadow
      material={material}
      onPointerDown={take}
      onPointerOut={() => (document.body.style.cursor = '')}
      onPointerOver={(event) => {
        event.stopPropagation();
        document.body.style.cursor = 'grab';
      }}
      position={[(min.x + max.x) / 2, (min.y + max.y) / 2, (min.z + max.z) / 2]}
      receiveShadow
    >
      <boxGeometry args={size} />
    </mesh>
  );
};

export { footprint, Obstacles };
