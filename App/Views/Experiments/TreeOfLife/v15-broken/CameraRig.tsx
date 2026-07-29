import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type CameraControlsImpl from 'camera-controls';

import { Drei, Fiber } from '@/Three';

import type { LocalGroup } from './graphStore';
import { SPHERE_RADIUS } from './positioning';

type Props = {
  group: LocalGroup;
};

/** Breathing room around the bounding radius. */
const FIT_PADDING = 1.45;
/** How far in the user may zoom, relative to the fit distance. */
const MIN_DISTANCE_RATIO = 0.02;

/**
 * Radius of the focused node's immediate neighbourhood. This is *not* what
 * the camera frames — it calibrates node body size, so bodies stay in
 * proportion to their own surroundings rather than to the whole sphere.
 */
export function localGroupRadius(group: LocalGroup): number {
  const center = new THREE.Vector3(...group.current.position);
  const members = [
    ...(group.parent ? [group.parent.node] : []),
    ...group.children.map((child) => child.node),
  ];

  let radius = 0;
  members.forEach((member) => {
    radius = Math.max(
      radius,
      center.distanceTo(new THREE.Vector3(...member.position))
    );
  });

  // A childless, parentless node still needs a sane frame.
  return Math.max(radius, 2) * FIT_PADDING;
}

/** How many ancestors the landing framing takes in, parent counting as one. */
const FRAMED_ANCESTORS = 5;

/**
 * What the camera actually frames: the focused node's neighbourhood plus the
 * nearest few ancestors. Deliberately *not* all the way to the root — on a
 * deep lineage that meant viewing a hundred-unit span to read a five-unit
 * cluster, leaving the focus an unreadable speck. The rest of the tree is
 * reachable by dragging and zooming instead.
 */
export function framingRadius(group: LocalGroup): number {
  const center = new THREE.Vector3(...group.current.position);

  const spine = [
    ...(group.parent ? [group.parent] : []),
    ...group.ancestors,
  ].slice(0, FRAMED_ANCESTORS);

  const members = [
    ...spine.map((entry) => entry.node),
    ...spine.flatMap((entry) => entry.context),
    ...group.children.map((child) => child.node),
  ];

  let radius = 0;
  members.forEach((member) => {
    radius = Math.max(
      radius,
      center.distanceTo(new THREE.Vector3(...member.position))
    );
  });

  return Math.max(radius, 2) * FIT_PADDING;
}

const CameraRig: React.FunctionComponent<Props> = ({ group }) => {
  const controlsRef = useRef<CameraControlsImpl | null>(null);
  const camera = Fiber.useThree((state) => state.camera);
  const size = Fiber.useThree((state) => state.size);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) {
      return;
    }

    const target = new THREE.Vector3(...group.current.position);
    const radius = framingRadius(group);

    const perspective = camera as THREE.PerspectiveCamera;
    const verticalFov = (perspective.fov * Math.PI) / 180;
    const horizontalFov =
      2 * Math.atan(Math.tan(verticalFov / 2) * perspective.aspect);
    // Fit on whichever axis is tighter, so nothing spills off a narrow viewport.
    const fitDistance = Math.max(
      radius / Math.tan(verticalFov / 2),
      radius / Math.tan(horizontalFov / 2)
    );

    /*
     * The landing framing is a starting point, not a cage: zoom out far
     * enough to take in the whole sphere so the root and any ancestor can be
     * found by hand, and keep a wide zoom-in range for inspecting a cluster.
     */
    controls.maxDistance = SPHERE_RADIUS * 3.2;
    controls.minDistance = Math.min(fitDistance * MIN_DISTANCE_RATIO, 0.5);

    controls.setLookAt(
      target.x,
      target.y,
      target.z + fitDistance,
      target.x,
      target.y,
      target.z,
      true
    );
  }, [group, camera, size.width, size.height]);

  return (
    <Drei.CameraControls
      ref={controlsRef}
      makeDefault
      // Zooming toward the pointer makes hunting for an ancestor far less
      // fiddly than zooming toward the frame centre.
      dollyToCursor
    />
  );
};

export default CameraRig;
