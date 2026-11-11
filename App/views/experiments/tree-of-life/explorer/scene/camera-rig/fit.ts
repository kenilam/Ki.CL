import { THREE } from '@/three';

// Anchors
import { reach } from '@/views/experiments/tree-of-life/explorer/scene/anchors';

// Constants
import { GLOBE_MARGIN } from '@/views/experiments/tree-of-life/explorer/constants';
import { DEPTH_RATIO, FRUSTUM_MARGIN, MIN_RADIUS } from './constants';

/**
 * How far back the camera has to stand for a sphere of `radius` to sit inside
 * the viewport with `marginPx` to spare on every side. The margin is in
 * pixels, so the outer taxa stay the same distance from the edge however deep
 * the lineage.
 */
function distanceToFit(
  radius: number,
  camera: THREE.PerspectiveCamera,
  size: { width: number; height: number },
  marginPx: number
): number {
  const verticalFov = (camera.fov * Math.PI) / 180;
  const horizontalFov =
    2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);

  const halfHeight = size.height / 2;
  const halfWidth = size.width / 2;

  // Never let the margin eat the whole viewport on a very small window.
  const usableHeight = Math.max(halfHeight - marginPx, halfHeight * 0.2);
  const usableWidth = Math.max(halfWidth - marginPx, halfWidth * 0.2);

  const angleV = Math.atan(
    Math.tan(verticalFov / 2) * (usableHeight / halfHeight)
  );
  const angleH = Math.atan(
    Math.tan(horizontalFov / 2) * (usableWidth / halfWidth)
  );

  return Math.max(radius / Math.tan(angleV), radius / Math.tan(angleH));
}

/**
 * Keep the view frustum around the scene. The tree's extent depends on how
 * deep the lineage runs, so no fixed `far` fits them all: past it, the globe's
 * far half is clipped away.
 */
function fitFrustum(camera: THREE.PerspectiveCamera): void {
  const extent = Math.max(reach() * GLOBE_MARGIN, MIN_RADIUS);
  const far = (camera.position.length() + extent) * FRUSTUM_MARGIN;

  if (Math.abs(far - camera.far) / camera.far < 0.01) {
    return;
  }

  camera.far = far;
  camera.near = Math.max(0.1, far / DEPTH_RATIO);
  camera.updateProjectionMatrix();
}

export { distanceToFit, fitFrustum };
