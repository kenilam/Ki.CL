import React, { useMemo, useRef } from 'react';

import THREE, { Fiber } from '@/Three';

// Anchors
import { reach } from './anchors';

// Constants
import { GLOBE_MARGIN, ORIGIN } from './constants';

// Zoom
import { getZoom } from './zoom';

/**
 * The cage the tree grows inside, centred on the origin of life.
 *
 * It follows the tree rather than standing at a fixed size: a globe drawn to
 * its final radius from the first frame makes the opening moments look like
 * a speck in an empty room, and gives no sense that anything is filling it.
 * Sizing it to how far the lineage has actually reached turns it into a
 * reading of progress — the tree pushes the boundary outward as it grows, and
 * it draws back in when a new route starts over.
 *
 * It is tilted off vertical and turns very slowly, the way a planet does —
 * enough to keep the wireframe from reading as a flat backdrop, slow enough
 * that it never competes with the tree for attention. Growth is anchored to
 * the centre rather than to the cage, so turning it moves only the cage.
 *
 * The geometry is a unit sphere and only the scale and rotation move, so
 * following costs nothing per frame and never rebuilds a buffer.
 *
 * Decorative only — it never takes a pointer, so it can sit in front of the
 * tree without swallowing clicks meant for a taxon behind it.
 */

/** How quickly the cage catches up, per second. */
const EASE = 1.4;

/** Earth's axial tilt, for no better reason than that it looks right. */
const AXIAL_TILT = (23.44 * Math.PI) / 180;

/** Radians per second — one turn takes a little over five minutes. */
const SPIN = 0.005;

/** How opaque the wireframe is when the view is close in. */
const OPACITY = 0.28;

/**
 * Where in the pull-back the cage starts giving way, and where it is gone.
 *
 * Close in it is scenery, and useful: something for the tree to sit inside. All
 * the way out it is the loudest thing on screen — the camera ends up within it,
 * so a sphere sized to enclose the tree becomes a mesh laid over the whole
 * frame, competing with the lineage the pull-back exists to show. Fading it out
 * over the last stretch hands the frame back.
 */
const FADE_FROM = 0.55;
const FADE_TO = 0.95;

/*
 * Deliberately a local copy rather than shared with `Taxon/Aura`: that folder
 * is self-contained, and a two-line media query is a smaller cost than a
 * dependency running the other way.
 */
function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
  );
}

type Props = {
  /** Clearance kept beyond the furthest taxon. */
  margin?: number;
};

const Globe: React.FunctionComponent<Props> = ({ margin = GLOBE_MARGIN }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const reduced = useMemo(prefersReducedMotion, []);

  Fiber.useFrame((_, delta) => {
    const mesh = meshRef.current;

    if (!mesh) {
      return;
    }

    if (!reduced) {
      // Local Y, inside the tilted group — so it turns about its own axis
      // rather than the world's, which is what makes the tilt read.
      mesh.rotation.y += delta * SPIN;
    }

    /*
     * Read from the placed taxa each frame rather than taken as a prop: the
     * tree is drawn by a recursion that nothing above it measures, so the only
     * thing that knows how far it got is the set of tips it published. That
     * also means the cage follows a route change for free — anchors leave as
     * their taxa unmount, and the extent falls with them.
     */
    const target = reach() * margin;

    // Exponential ease, framerate-independent: the cage trails the growth
    // rather than snapping between radii as each link lands.
    const current = mesh.scale.x;

    mesh.scale.setScalar(
      current + (target - current) * Math.min(1, delta * EASE)
    );

    /*
     * Fade out as the view pulls back. Read straight off the zoom rather than
     * eased on its own clock, so it stays part of the one motion — the cage
     * thins as the lineage stands up, not a beat afterwards.
     */
    const material = materialRef.current;
    const faded = Math.min(
      Math.max((getZoom() - FADE_FROM) / (FADE_TO - FADE_FROM), 0),
      1
    );

    if (material) {
      material.opacity = OPACITY * (1 - faded);
    }

    // Nothing to draw before the tree has any extent at all, or once the cage
    // has faded out entirely — an invisible mesh should not cost a draw call.
    mesh.visible = mesh.scale.x > 0.5 && faded < 1;
  });

  return (
    <group position={ORIGIN} rotation={[0, 0, AXIAL_TILT]}>
      <mesh ref={meshRef} scale={0} raycast={() => null}>
        <sphereGeometry args={[1, 32, 20]} />
        <meshBasicMaterial
          ref={materialRef}
          color='#b9cbc2'
          wireframe
          transparent
          opacity={OPACITY}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default Globe;
