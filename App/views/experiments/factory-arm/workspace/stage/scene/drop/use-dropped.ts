import { useEffect } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Obstacles
import {
  SHAPES,
  SHAPE_TYPE,
  type Shape,
} from '@/views/experiments/factory-arm/engine/obstacles';

// Partials
import type { usePut } from './use-put';

const FLOOR = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

/** Puts a shape dropped on the canvas where it was dropped, if there's room. */
const useDropped = (put: ReturnType<typeof usePut>) => {
  const { camera, gl } = Fiber.useThree();

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
};

export { useDropped };
