import { useEffect, useMemo } from 'react';

// Three
import { THREE } from '@/three';

// Shapes
import { roundedRect } from './rounded-rect';

type Size = {
  depth: number;
  height: number;
  hole?: { height: number; radius: number; width: number };
  radius: number;
  width: number;
};

const usePlate = ({ depth, height, hole, radius, width }: Size) => {
  const geometry = useMemo(() => {
    const shape = roundedRect(new THREE.Shape(), width, height, radius);

    if (hole) {
      shape.holes.push(
        roundedRect(new THREE.Path(), hole.width, hole.height, hole.radius)
      );
    }

    const plate = new THREE.ExtrudeGeometry(shape, {
      bevelEnabled: true,
      bevelSegments: 8,
      bevelSize: depth * 0.45,
      bevelThickness: depth * 0.45,
      curveSegments: 32,
      depth: depth * 0.1,
    });

    plate.center();

    return plate;
  }, [depth, height, hole, radius, width]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return geometry;
};

export { usePlate };
