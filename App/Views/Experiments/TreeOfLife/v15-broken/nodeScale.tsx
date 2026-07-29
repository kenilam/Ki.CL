import React, { createContext, useContext, useMemo } from 'react';
import * as THREE from 'three';

import { Fiber } from '@/Three';

/**
 * clamp(4rem, 5vw, 6rem) in px — replicated in JS because node size is set on
 * the mesh in world units, not through CSS.
 */
export function clampNodeDiameterPx(): number {
  const rootFontSizePx =
    typeof window !== 'undefined'
      ? parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
      : 16;
  const viewportWidthPx =
    typeof window !== 'undefined' ? window.innerWidth : 1280;

  const min = 4 * rootFontSizePx;
  const max = 6 * rootFontSizePx;
  const preferred = 0.05 * viewportWidthPx;

  return Math.min(Math.max(preferred, min), max);
}

/**
 * Node bodies are sized in *world* units, calibrated so that at the framing
 * a route lands on they measure clamp(4rem, 5vw, 6rem) on screen.
 *
 * They used to be recomputed every frame to hold that pixel size at any
 * zoom, but branches are world-space geometry: dollying in grew the veins
 * while the bodies stayed put, so nodes read as tiny beads threaded onto
 * giant tubes. Fixing the size in world units keeps the whole structure in
 * proportion at every zoom level, and still hits the intended size on
 * arrival — which is the framing the sizing rule was really describing.
 */

const NodeWorldSizeContext = createContext(1);

export function useNodeWorldSize(): number {
  return useContext(NodeWorldSizeContext);
}

type Props = {
  /** Bounding radius of the local group — what the camera frames on arrival. */
  radius: number;
  children: React.ReactNode;
};

export function nodeWorldDiameter(
  camera: THREE.Camera,
  viewportHeight: number,
  radius: number
): number {
  const perspective = camera as THREE.PerspectiveCamera;
  const verticalFov = (perspective.fov * Math.PI) / 180;
  const horizontalFov =
    2 * Math.atan(Math.tan(verticalFov / 2) * perspective.aspect);
  // Same fit the CameraRig uses, so the calibration matches the landing view.
  const fitDistance = Math.max(
    radius / Math.tan(verticalFov / 2),
    radius / Math.tan(horizontalFov / 2)
  );

  return (
    (clampNodeDiameterPx() * 2 * fitDistance * Math.tan(verticalFov / 2)) /
    Math.max(1, viewportHeight)
  );
}

export const NodeScaleProvider: React.FunctionComponent<Props> = ({
  radius,
  children,
}) => {
  const camera = Fiber.useThree((state) => state.camera);
  const size = Fiber.useThree((state) => state.size);

  const value = useMemo(
    () => nodeWorldDiameter(camera, size.height, radius),
    [camera, size.height, size.width, radius]
  );

  return (
    <NodeWorldSizeContext.Provider value={value}>
      {children}
    </NodeWorldSizeContext.Provider>
  );
};
