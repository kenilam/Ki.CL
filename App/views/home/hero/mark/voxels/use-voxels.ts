import { useEffect, useMemo, useRef } from 'react';

import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

import { Fiber, THREE } from '@/three';

import { useCells } from './use-cells';
import { useInk } from './use-ink';
import { useTilt } from './use-tilt';

const useVoxels = () => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => {
    return new RoundedBoxGeometry(0.88, 0.88, 0.88, 5, 0.16);
  }, []);
  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      roughness: 0.4,
    });
  }, []);
  const arrange = useCells();
  const paint = useInk(material);
  const tilt = useTilt();

  Fiber.useFrame(({ clock }, delta) => {
    if (!mesh.current || !group.current) {
      return;
    }

    paint();
    tilt(group.current, clock.elapsedTime, delta);
    arrange(mesh.current, clock.elapsedTime, delta);
  });

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return { geometry, group, material, mesh };
};

export { useVoxels };
