import { useEffect, useMemo, useRef } from 'react';

import { THREE, Fiber } from '@/three';

// Anchors
import { reach } from '@/views/experiments/tree-of-life/explorer/scene/anchors';

// Constants
import { GLOBE_MARGIN } from '@/views/experiments/tree-of-life/explorer/constants';
import {
  BLUR_SHARE,
  BLUR_SHELLS,
  BLUR_SPREAD,
  EASE,
  FADE_FROM,
  FADE_TO,
  MIN_OPACITY,
  OPACITY,
  SPIN,
} from '@/views/experiments/tree-of-life/explorer/scene/globe/constants';

// Motion
import { prefersReducedMotion } from '@/views/experiments/tree-of-life/explorer/scene/prefers-reduced-motion';

// Zoom
import { getZoom } from '@/views/experiments/tree-of-life/explorer/scene/zoom';

/**
 * Sizes the cage to how far the tree has reached, turns it, and fades it as the
 * view pulls back. Only scale, rotation and opacity move, so no buffer is
 * rebuilt.
 */
const useCage = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const shellMeshes = useRef(new Map<number, THREE.Mesh>());
  const shellMaterials = useRef(new Map<number, THREE.MeshBasicMaterial>());
  const reduced = useMemo(prefersReducedMotion, []);

  // One geometry for the crisp cage and both shells; they differ only in scale.
  const geometry = useMemo(() => new THREE.SphereGeometry(1, 32, 20), []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  Fiber.useFrame((_, delta) => {
    const mesh = meshRef.current;

    if (!mesh) {
      return;
    }

    if (!reduced) {
      // Local Y, inside the tilted group, so the tilt reads.
      mesh.rotation.y += delta * SPIN;
    }

    // Anchors leave as their taxa unmount, so the cage follows a route change.
    const target = reach() * GLOBE_MARGIN;

    const current = mesh.scale.x;

    mesh.scale.setScalar(
      current + (target - current) * Math.min(1, delta * EASE)
    );

    const material = materialRef.current;
    const faded = Math.min(
      Math.max((getZoom() - FADE_FROM) / (FADE_TO - FADE_FROM), 0),
      1
    );

    const ink = OPACITY + (MIN_OPACITY - OPACITY) * faded;
    const share = BLUR_SHARE * faded;

    if (material) {
      material.opacity = ink * (1 - share * BLUR_SHELLS.length);
    }

    mesh.visible = mesh.scale.x > 0.5;

    BLUR_SHELLS.forEach((side) => {
      const shell = shellMeshes.current.get(side);
      const shellMaterial = shellMaterials.current.get(side);

      if (!shell || !shellMaterial) {
        return;
      }

      shell.visible = mesh.visible && faded > 0.01;

      if (!shell.visible) {
        return;
      }

      shell.rotation.y = mesh.rotation.y;
      shell.scale.setScalar(mesh.scale.x * (1 + side * BLUR_SPREAD * faded));
      shellMaterial.opacity = ink * share;
    });
  });

  return useMemo(() => {
    return { geometry, materialRef, meshRef, shellMaterials, shellMeshes };
  }, [geometry]);
};

export { useCage };
