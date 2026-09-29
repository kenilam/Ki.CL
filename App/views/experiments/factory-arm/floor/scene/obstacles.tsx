import React, { useEffect, useMemo, useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Protocol
import type { Box } from '@/views/experiments/factory-arm/cell/protocol';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';
import { middle } from '@/views/experiments/factory-arm/floor/hub/obstacles';

// Partials
import { useDrag } from './drag';
import { useOutline } from './outline';

// Constants
import { DRAG, STEP } from '@/views/experiments/factory-arm/floor/constants';

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

/** Which way each arrow key moves a chosen obstacle, on the floor. */
const ARROWS: Record<string, { x: number; z: number }> = {
  ArrowLeft: { x: -1, z: 0 },
  ArrowRight: { x: 1, z: 0 },
  ArrowUp: { x: 0, z: -1 },
  ArrowDown: { x: 0, z: 1 },
};

/**
 * The arrow keys move the chosen obstacle a step at a time, further with
 * Shift held; Delete takes it off; Escape lets it go. Keys typed into a
 * field are left to the field.
 */
const useKeys = () => {
  const { obstacles, shift, unblock } = useHub();
  const { select, selected } = useDrag();

  // Taken off the floor by other means: no longer chosen.
  useEffect(() => {
    if (selected && !obstacles.some(({ id }) => id === selected)) {
      select(null);
    }
  }, [obstacles, select, selected]);

  useEffect(() => {
    if (!selected) {
      return;
    }

    const press = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (target?.matches('input, textarea, select, [contenteditable]')) {
        return;
      }

      const found = obstacles.find(({ id }) => id === selected);
      const arrow = ARROWS[event.key];

      if (found && arrow) {
        const step = event.shiftKey ? STEP.large : STEP.small;
        const at = middle(found);

        event.preventDefault();
        shift(selected, { x: at.x + arrow.x * step, z: at.z + arrow.z * step });
      } else if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        unblock(selected);
      } else if (event.key === 'Escape') {
        select(null);
      }
    };

    window.addEventListener('keydown', press);

    return () => window.removeEventListener('keydown', press);
  }, [obstacles, select, selected, shift, unblock]);
};

/** The obstacles on the floor, where the hub has them. Each can be dragged elsewhere, or chosen and moved by the keys. */
const Obstacles: React.FunctionComponent = () => {
  const { obstacles } = useHub();

  useKeys();

  return obstacles.map((box) => <Obstacle box={box} key={box.id} />);
};

/**
 * One obstacle: a grey block that lights up orange for as long as a case
 * waits because of it, outlined while pointed at or chosen. Pressing on it
 * starts a drag; a click chooses it.
 */
const Obstacle: React.FunctionComponent<{ box: Box }> = ({ box }) => {
  const { parked } = useHub();
  const { grab, hover, hovered, select, selected } = useDrag();
  const group = useRef<THREE.Group>(null);
  const { min, max } = box;
  const size: [number, number, number] = [
    max.x - min.x,
    max.y - min.y,
    max.z - min.z,
  ];

  useOutline(
    group,
    selected === box.id ||
      (hovered?.kind === 'obstacle' && hovered.id === box.id)
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
      select(selected === box.id ? null : box.id);
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
    </group>
  );
};

export { footprint, Obstacles };
