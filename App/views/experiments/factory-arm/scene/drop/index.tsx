import React, { useEffect, useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Obstacles
import { useRoom } from '@/views/experiments/factory-arm/scene/obstacles/room';
import {
  SHAPES,
  SHAPE_TYPE,
  type Shape,
} from '@/views/experiments/factory-arm/scene/obstacles/constants';

/** Where a shape asked for from the panel goes, if there's room: in front, by the belt. */
const OPEN = { x: 1, z: 1.2 };

/** How far out, in metres, the search for room around a spot goes, and in what steps. */
const RINGS = [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6];
const TURNS = 12;

const FLOOR = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

/**
 * Puts shapes from the panel on the stage: one dropped on the canvas where
 * it was dropped, one clicked in the panel in front by the belt. Either goes
 * to the nearest spot with room for it, and is selected so the operator can
 * move it straight away.
 */
const Drop: React.FunctionComponent = () => {
  const { asked, select, write } = useFactoryArmContext();
  const { clear, near } = useRoom();
  const { camera, gl } = Fiber.useThree();
  const count = useRef(0);

  const put = (shape: Shape, at: { x: number; z: number }) => {
    const { base, size } = SHAPES[shape];
    const [width, height, depth] = size;
    const id = `${shape}-${(count.current += 1)}`;

    for (const ring of RINGS) {
      for (let turn = 0; turn < (ring ? TURNS : 1); turn++) {
        const angle = (turn / TURNS) * Math.PI * 2;
        const x = at.x + Math.cos(angle) * ring;
        const z = at.z + Math.sin(angle) * ring;
        const solid = {
          id,
          min: { x: x - width / 2, y: base, z: z - depth / 2 },
          max: { x: x + width / 2, y: base + height, z: z + depth / 2 },
        };

        if (clear(solid) && !near(solid)) {
          write.place(solid);
          select(id);

          return;
        }
      }
    }
  };

  Fiber.useFrame(() => {
    for (
      let shape = asked.current.shift();
      shape;
      shape = asked.current.shift()
    ) {
      put(shape, OPEN);
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;

    const over = (event: DragEvent) => {
      if (event.dataTransfer?.types.includes(SHAPE_TYPE)) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
      }
    };

    const drop = (event: DragEvent) => {
      const shape = event.dataTransfer?.getData(SHAPE_TYPE) as Shape;

      if (!(shape in SHAPES)) {
        return;
      }

      event.preventDefault();

      // Where on the floor the pointer was.
      const { left, top, width, height } = canvas.getBoundingClientRect();
      const pointer = new THREE.Vector2(
        ((event.clientX - left) / width) * 2 - 1,
        -((event.clientY - top) / height) * 2 + 1
      );
      const ray = new THREE.Raycaster();
      const at = new THREE.Vector3();

      ray.setFromCamera(pointer, camera);

      if (ray.ray.intersectPlane(FLOOR, at)) {
        put(shape, at);
      }
    };

    canvas.addEventListener('dragover', over);
    canvas.addEventListener('drop', drop);

    return () => {
      canvas.removeEventListener('dragover', over);
      canvas.removeEventListener('drop', drop);
    };
  });

  return null;
};

export { Drop };
