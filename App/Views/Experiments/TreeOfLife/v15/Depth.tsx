import React, { useEffect, useMemo } from 'react';

import THREE, { Fiber } from '@/Three';

// Anchors
import { getAnchor } from './anchors';

/**
 * Aerial perspective: taxa further away lose their colour to the air.
 *
 * Distance in a scene this uniform is genuinely hard to read — every taxon is
 * the same handful of pixels wherever it sits, because the framing distance is
 * derived from the taxon's own branch length, so nothing gets smaller with
 * depth the way it would in a normal perspective view. Size carries no
 * information, which leaves a flat mat of dots.
 *
 * Colour can carry it instead. This is what the eye already uses outdoors —
 * distant hills go pale and blue because there is air in the way — so shifting
 * far taxa toward a cool tone reads as depth without anything having to move.
 *
 * Done with fog rather than by tinting each material: fog is a per-fragment
 * blend the renderer already applies, so it costs nothing extra and cannot
 * drift out of step with what is actually being drawn.
 */

/**
 * Where the air starts and where it has fully taken over, as multiples of the
 * distance from the camera to the taxon in the route.
 *
 * Anchored on the focus rather than fixed in world units, because the scene's
 * scale is emergent — a deep lineage runs several times further out than a
 * shallow one — so a fixed range would swallow the whole tree at one depth and
 * do nothing at another. Tied to the focus it always means the same thing: the
 * taxon you are looking at is clear, and everything behind it recedes.
 */
const NEAR_AT = 0.78;
const FAR_AT = 2.1;

/**
 * The colour distance fades toward — a cool, desaturated blue, a little above
 * the page's own near-black so it reads as haze rather than as an unlit gap.
 */
const AIR = '#1b2733';

type Props = {
  /** The taxon in the route, which stays clear while everything else recedes. */
  focus?: string;
};

const Depth: React.FunctionComponent<Props> = ({ focus }) => {
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

    /*
     * Measured to the focus each frame rather than set once: zooming changes
     * how far back the camera stands, and the haze has to follow it or pulling
     * out would bury the whole lineage in air.
     */
    const distance = camera.position.distanceTo(target.set(...anchor));

    fog.near = distance * NEAR_AT;
    fog.far = distance * FAR_AT;
  });

  return null;
};

export default Depth;
