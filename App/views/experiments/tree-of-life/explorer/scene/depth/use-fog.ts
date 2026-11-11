import { useEffect, useMemo } from 'react';

import { THREE, Fiber } from '@/three';

// Context
import { useLineageContext } from '@/views/experiments/tree-of-life/lineage-context';

// Anchors
import { getAnchor } from '@/views/experiments/tree-of-life/explorer/scene/anchors';

// Helpers
import { tokenColor } from '@/helper';

/**
 * Where the haze starts and where it has taken over, as multiples of the
 * camera's distance to the focus. The scene's scale depends on how deep the
 * lineage runs, so a range in world units would fit only one depth.
 */
const NEAR_AT = 0.78;
const FAR_AT = 2.1;

/** A little above the page's near-black, so it reads as haze rather than a gap. */
const AIR = tokenColor('black-400');

const useFog = () => {
  const { focus } = useLineageContext();
  const scene = Fiber.useThree((state) => state.scene);
  const camera = Fiber.useThree((state) => state.camera);

  const fog = useMemo(() => new THREE.Fog(AIR, 1, 2), []);
  const target = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    scene.fog = fog;

    return () => {
      scene.fog = null;
    };
  }, [scene, fog]);

  Fiber.useFrame(() => {
    const anchor = getAnchor(focus);

    if (!anchor) {
      return;
    }

    // Each frame, since zooming changes how far back the camera stands.
    const distance = camera.position.distanceTo(target.set(...anchor));

    fog.near = distance * NEAR_AT;
    fog.far = distance * FAR_AT;
  });
};

export { useFog };
