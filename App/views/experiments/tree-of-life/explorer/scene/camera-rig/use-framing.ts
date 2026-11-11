import { useMemo } from 'react';

import { THREE, Fiber } from '@/three';

// Context
import { useSubtreeContext } from '@/views/experiments/tree-of-life/subtree-context';
import { useLineageContext } from '@/views/experiments/tree-of-life/lineage-context';

// Anchors
import { getAnchor } from '@/views/experiments/tree-of-life/explorer/scene/anchors';

// Zoom
import {
  setSettled,
  setZoom,
} from '@/views/experiments/tree-of-life/explorer/scene/zoom';

// Constants
import {
  SETTLE_FRAMES,
  TRAVEL_EASE,
  VIEW_MARGIN_REM,
  ZOOM_EASE,
} from './constants';

// Parts
import { compose } from './compose';
import { fitFrustum } from './fit';
import { reframe } from './reframe';
import { useOffset } from './use-offset';
import type { Rig } from './use-rig';

/** Frames the taxon the route is on, then flies and zooms on one parameter each. */
const useFraming = (rig: Rig) => {
  const { find } = useSubtreeContext();
  const { chains, focus } = useLineageContext();
  const offsetPx = useOffset();
  const camera = Fiber.useThree((state) => state.camera);
  const size = Fiber.useThree((state) => state.size);

  const nodeId = focus;

  /*
   * What the camera stands back from: the ancestor, or for the origin, which
   * has none, its own first descendant.
   */
  const ancestorId =
    chains[1] ?? (focus ? find(focus)?.descendants?.[0]?.nodeId : undefined);

  // `getComputedStyle` forces a layout read, so only when the viewport moves.
  const marginPx = useMemo(
    () =>
      parseFloat(getComputedStyle(document.documentElement).fontSize) *
      VIEW_MARGIN_REM,
    [size.width, size.height]
  );

  Fiber.useFrame((state, delta) => {
    const { framed, held, travel, wanted, zoom } = rig;
    const perspective = camera as THREE.PerspectiveCamera;
    const anchor = getAnchor(nodeId);

    fitFrustum(perspective);

    // Close the gate as soon as the route moves, so the new clade waits for the camera.
    if (framed.current !== nodeId) {
      setSettled(false);
    }

    if (framed.current !== nodeId && nodeId && anchor) {
      reframe({
        ...rig,
        ancestorId,
        anchor,
        chains,
        elapsed: state.clock.elapsedTime,
        nodeId,
        offsetPx,
        perspective,
        size,
      });
    }

    if (framed.current === null || !anchor) {
      return;
    }

    // Snapped once the remainder is below a pixel, or the blend runs forever.
    travel.current +=
      (1 - travel.current) * (1 - Math.exp(-TRAVEL_EASE * delta));

    if (travel.current > 0.999) {
      travel.current = 1;
    }

    // Held back until the camera stops, so heavy clades don't mount mid-flight.
    held.current += 1;

    setSettled(travel.current === 1 && held.current >= SETTLE_FRAMES);

    zoom.current +=
      (wanted.current - zoom.current) * (1 - Math.exp(-ZOOM_EASE * delta));

    setZoom(zoom.current);

    compose({ ...rig, anchor, marginPx, perspective, size });
  });
};

export { useFraming };
