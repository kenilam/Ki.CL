import { useEffect, useMemo, useRef } from 'react';

import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

import { useResponsive } from 'design/hooks';

import { Fiber, THREE } from '@/three';

import { useInk } from '@/views/mark';

import { scroll } from '@/views/about/stage/scroll';

import { usePieces } from './use-pieces';

import { CAMERA, TALL } from './constants';

const useDebris = () => {
  const { prefersReducedMotion: still } = useResponsive();
  const mesh = useRef<THREE.InstancedMesh>(null);
  const travelled = useRef<number | null>(null);
  const pieces = usePieces();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const geometry = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 4, 0.18), []);
  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      roughness: 0.4,
    });
  }, []);
  const paint = useInk(material);

  Fiber.useFrame(({ clock, viewport }, delta) => {
    const { current } = mesh;

    if (!current) {
      return;
    }

    const past = still ? 0 : scroll().past;
    const amount = travelled.current === null ? 1 : 1 - Math.exp(-delta * 4);

    const travel = (travelled.current ?? past) * (1 - amount) + past * amount;

    travelled.current = travel;
    paint();

    pieces.forEach((piece, index) => {
      const rate = 0.25 + piece.depth * 1.1;
      const screen = (viewport.height * (CAMERA - piece.z)) / CAMERA;
      const y = piece.y + travel * screen * rate;
      const turn = still ? piece.spin : piece.spin + clock.elapsedTime * 0.2;

      dummy.position.set(
        piece.x,
        (((y % TALL) + TALL) % TALL) - TALL / 2,
        piece.z
      );
      dummy.rotation.set(turn, turn * 0.7, 0);
      dummy.scale.setScalar(piece.size);
      dummy.updateMatrix();
      current.setMatrixAt(index, dummy.matrix);
    });

    current.instanceMatrix.needsUpdate = true;
  });

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return { geometry, material, mesh };
};

export { useDebris };
