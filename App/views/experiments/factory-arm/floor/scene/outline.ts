import { type RefObject, useEffect } from 'react';

// Three
import { THREE } from '@/three';

/** How far an outline stands off the thing it outlines, in metres. */
const EDGE = 0.02;

const OUTLINE = new THREE.MeshBasicMaterial({
  color: '#111111',
  side: THREE.BackSide,
});

/**
 * Outlines everything under `group` while `on`: a back-faced copy of every
 * mesh, a little bigger, shows round its edges. Meshes marked `skip` in
 * their user data are left alone.
 */
const useOutline = (group: RefObject<THREE.Group | null>, on: boolean) =>
  useEffect(() => {
    if (!on || !group.current) {
      return;
    }

    const hulls: THREE.Mesh[] = [];

    group.current.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        !child.userData.skip &&
        !child.userData.hull
      ) {
        const geometry = child.geometry as THREE.BufferGeometry;

        geometry.computeBoundingBox();

        const size = geometry.boundingBox!.getSize(new THREE.Vector3());
        const hull = new THREE.Mesh(geometry, OUTLINE);

        hull.userData.hull = true;
        hull.scale.set(
          (size.x + 2 * EDGE) / (size.x || 1),
          (size.y + 2 * EDGE) / (size.y || 1),
          (size.z + 2 * EDGE) / (size.z || 1)
        );
        child.add(hull);
        hulls.push(hull);
      }
    });

    return () => hulls.forEach((hull) => hull.removeFromParent());
  }, [group, on]);

export { useOutline };
