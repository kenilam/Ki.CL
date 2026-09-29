import React, { useEffect, useMemo, useRef } from 'react';

// Three
import { Drei, Fiber, THREE } from '@/three';

// Components
import { Button } from '@/components';

// Icons
import { Ri } from '@/icons';

// Protocol
import type { Box } from '@/views/experiments/factory-arm/cell/protocol';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';
import { middle } from '@/views/experiments/factory-arm/floor/hub/obstacles';

// Partials
import { useDrag } from './drag';
import { useOutline } from './outline';

// Constants
import {
  COPY,
  DRAG,
  OUTLINE,
  STEP,
} from '@/views/experiments/factory-arm/floor/constants';

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

/** Which way each arrow key moves a chosen obstacle, as seen: `ahead` away from the viewer, `side` to their right. */
const ARROWS: Record<string, { ahead: number; side: number }> = {
  ArrowLeft: { ahead: 0, side: -1 },
  ArrowRight: { ahead: 0, side: 1 },
  ArrowUp: { ahead: 1, side: 0 },
  ArrowDown: { ahead: -1, side: 0 },
};

/**
 * Where the arrows point on the floor from where the camera looks: ahead
 * is the way it faces, snapped to the nearest axis so a step stays square
 * to the cells, and right is a quarter turn from that.
 */
const heading = (camera: THREE.Camera) => {
  const look = camera.getWorldDirection(new THREE.Vector3());
  const ahead =
    Math.abs(look.x) > Math.abs(look.z)
      ? { x: Math.sign(look.x), z: 0 }
      : { x: 0, z: Math.sign(look.z) };

  return { ahead, right: { x: -ahead.z, z: ahead.x } };
};

/**
 * The arrow keys move the chosen obstacle a step at a time over the floor,
 * the way the view faces, and with Shift held Up and Down raise and lower
 * it; R gives it a quarter turn; Delete takes it off; Escape lets it go.
 * Keys typed into a field are left to the field.
 */
const useKeys = () => {
  const { obstacles, raise, shift, turn, unblock } = useHub();
  const { select, selected } = useDrag();
  const camera = Fiber.useThree((state) => state.camera);

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
        const at = middle(found);

        event.preventDefault();

        if (event.shiftKey && arrow.ahead) {
          raise(selected, arrow.ahead * STEP);
        } else {
          const { ahead, right } = heading(camera);

          shift(selected, {
            x: at.x + (arrow.ahead * ahead.x + arrow.side * right.x) * STEP,
            z: at.z + (arrow.ahead * ahead.z + arrow.side * right.z) * STEP,
          });
        }
      } else if (event.key === 'r' || event.key === 'R') {
        event.preventDefault();
        turn(selected);
      } else if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        unblock(selected);
      } else if (event.key === 'Escape') {
        select(null);
      }
    };

    window.addEventListener('keydown', press);

    return () => window.removeEventListener('keydown', press);
  }, [camera, obstacles, raise, select, selected, shift, turn, unblock]);
};

/** The obstacles on the floor, where the hub has them. Each can be dragged elsewhere, or chosen and moved by the keys. */
const Obstacles: React.FunctionComponent = () => {
  const { obstacles } = useHub();

  useKeys();

  return obstacles.map((box) => <Obstacle box={box} key={box.id} />);
};

/**
 * One obstacle: a grey block that lights up orange for as long as a case
 * waits because of it, outlined while pointed at or chosen, red while it
 * stands in an arm, with a button over it to take it off while chosen.
 * Pressing on it starts a drag; a click chooses it.
 */
const Obstacle: React.FunctionComponent<{ box: Box }> = ({ box }) => {
  const { parked, struck, unblock } = useHub();
  const { grab, hover, hovered, select, selected } = useDrag();
  const group = useRef<THREE.Group>(null);
  const { min, max } = box;
  const size: [number, number, number] = [
    max.x - min.x,
    max.y - min.y,
    max.z - min.z,
  ];

  // Red while it stands in an arm; otherwise dark while chosen or pointed at.
  useOutline(
    group,
    Object.values(struck).some((ids) => ids.includes(box.id))
      ? OUTLINE.struck
      : (selected === box.id ||
          (hovered?.kind === 'obstacle' && hovered.id === box.id)) &&
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

      {selected === box.id && (
        <Drei.Html
          center
          position={[(min.x + max.x) / 2, max.y + 0.2, (min.z + max.z) / 2]}
        >
          <Button level='error' onClick={() => unblock(box.id)} variant='ghost'>
            <Ri.RiDeleteBinLine />
            <span className='kicl-hidden'>{COPY.panel.remove}</span>
          </Button>
        </Drei.Html>
      )}
    </group>
  );
};

export { footprint, Obstacles };
