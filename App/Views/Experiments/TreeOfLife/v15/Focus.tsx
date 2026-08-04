import React, { useMemo, useRef } from 'react';
import { DepthOfField, EffectComposer } from '@react-three/postprocessing';

import THREE, { Fiber } from '@/Three';

// Anchors
import { getAnchor } from './anchors';

/**
 * Depth of field, focused on the taxon in the route.
 *
 * The other half of reading depth in a scene where nothing shrinks with
 * distance. Haze says what is *behind* the focus; this says what is in front of
 * it, by blurring anything nearer than the focal plane the way a lens does.
 * Between them the tree gains a front, a middle and a back.
 *
 * This genuinely needs a post pass. A circle of confusion is per-fragment and
 * derived from the depth buffer, so there is nothing to approximate per object
 * — anything trying would be fighting the depth buffer rather than reading it.
 * The cost is resolution-bound rather than geometry-bound, so a clade of four
 * hundred taxa costs no more than one of ten.
 *
 * Labels are untouched, being DOM rather than scene content, which is the right
 * outcome anyway: a name should stay legible even when the thing it names is
 * out of focus.
 */

/**
 * How wide the sharp band is, as a fraction of the focus distance.
 *
 * Wide enough to hold the focused taxon and its immediate neighbours — they are
 * what you came to look at, and blurring a taxon's own children would be
 * perverse.
 */
const FOCAL_BAND = 0.4;

/**
 * How far a blurred point spreads. Deliberately gentle: this is a legibility
 * cue rather than a photographic effect, and a heavy blur reads as a broken
 * render rather than as depth.
 */
const BOKEH = 2;

type Props = {
  /** The taxon in the route — the plane that stays sharp. */
  focus?: string;
};

/** The parts of the effect this drives; the class itself is not exported. */
type Adjustable = {
  worldFocusDistance: number;
  worldFocusRange: number;
};

const Focus: React.FunctionComponent<Props> = ({ focus }) => {
  const camera = Fiber.useThree((state) => state.camera);
  const target = useMemo(() => new THREE.Vector3(), []);
  const effect = useRef<Adjustable | null>(null);

  Fiber.useFrame(() => {
    const anchor = getAnchor(focus);
    const dof = effect.current;

    if (!anchor || !dof) {
      return;
    }

    /*
     * Set in world units rather than the normalised `focusDistance`.
     *
     * The normalised form is a fraction of the camera's far plane, and ours is
     * refitted every frame to enclose a tree whose extent is emergent — so the
     * same fraction would mean a different place from one frame to the next and
     * the focus would appear to drift while standing still. World units are
     * independent of the frustum.
     */
    const distance = camera.position.distanceTo(target.set(...anchor));

    dof.worldFocusDistance = distance;
    dof.worldFocusRange = distance * FOCAL_BAND;
  });

  return (
    <EffectComposer>
      {/*
        No world-unit flag needed — the `worldFocusDistance` setter does the
        conversion itself, and it is called every frame above.
      */}
      <DepthOfField ref={effect as React.Ref<never>} bokehScale={BOKEH} />
    </EffectComposer>
  );
};

export default Focus;
