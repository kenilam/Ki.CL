import { type RefObject, useEffect } from 'react';

// Three
import { THREE } from '@/three';

/** How far an outline stands off the thing it outlines, in metres. */
const EDGE = 0.02;

/** One material per colour, shared by every outline of that colour. */
const MATERIALS = new Map<string, THREE.MeshBasicMaterial>();

const material = (color: string) => {
  const found = MATERIALS.get(color);

  if (found) {
    return found;
  }

  const made = new THREE.MeshBasicMaterial({ color, side: THREE.BackSide });

  MATERIALS.set(color, made);

  return made;
};

/**
 * Outlines everything under `group` while `on`: a back-faced copy of every
 * mesh, a little bigger, shows round its edges. Meshes marked `skip` in
 * their user data are left alone. The copies are made again whenever
 * `shape` changes, for meshes whose geometry is replaced. `on` is the
 * colour to draw in, or false for none.
 */
const useOutline = (
  group: RefObject<THREE.Group | null>,
  on: string | false,
  shape?: unknown
) =>
  useEffect(() => {
    if (!on || !group.current) {
      return;
    }

    const paint = material(on);

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
        const hull = new THREE.Mesh(geometry, paint);

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
  }, [group, on, shape]);

export { useOutline };
