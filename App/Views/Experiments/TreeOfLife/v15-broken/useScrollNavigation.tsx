import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { Fiber } from '@/Three';

/**
 * Wheel/trackpad navigation. When the pointer is dwelling near a navigable
 * node, scrolling accumulates intent toward that node and — once committed —
 * hands off to the same "ease the camera, then navigate" primitive a click
 * uses, so both inputs are behaviourally identical by construction. Away
 * from any node the event falls through to the controls' normal dolly zoom.
 *
 * Must be called from a component inside the r3f Canvas.
 */

/** Screen-space radius (px) within which a node captures the wheel. */
const CAPTURE_RADIUS_PX = 90;
/** Accumulated |deltaY| needed to commit to navigating. */
const COMMIT_THRESHOLD = 220;
/** Intent decays if the user pauses, so a stray flick never navigates. */
const DECAY_PER_MS = 0.5;

export type ScrollTarget = {
  nodeId: string;
  position: readonly [number, number, number];
};

export function useScrollNavigation(
  targets: readonly ScrollTarget[],
  onCommit: (nodeId: string) => void
) {
  const camera = Fiber.useThree((state) => state.camera);
  const gl = Fiber.useThree((state) => state.gl);
  const size = Fiber.useThree((state) => state.size);

  // Keep the live values off the effect's dependency list so the listeners
  // attach once instead of on every frame-driven re-render.
  const targetsRef = useRef(targets);
  const commitRef = useRef(onCommit);
  targetsRef.current = targets;
  commitRef.current = onCommit;

  const intentRef = useRef<{
    nodeId: string;
    amount: number;
    at: number;
  } | null>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const element = gl.domElement;
    const projected = new THREE.Vector3();

    const onPointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const nearestTarget = (): ScrollTarget | null => {
      const pointer = pointerRef.current;
      if (!pointer) {
        return null;
      }

      let best: ScrollTarget | null = null;
      let bestDistance = CAPTURE_RADIUS_PX;

      targetsRef.current.forEach((target) => {
        projected.set(...(target.position as [number, number, number]));
        projected.project(camera);
        if (projected.z > 1) {
          // Behind the camera — not a candidate.
          return;
        }
        const screenX = ((projected.x + 1) / 2) * size.width;
        const screenY = ((1 - projected.y) / 2) * size.height;
        const distance = Math.hypot(screenX - pointer.x, screenY - pointer.y);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = target;
        }
      });

      return best;
    };

    const onWheel = (event: WheelEvent) => {
      const target = nearestTarget();
      if (!target) {
        intentRef.current = null;
        return;
      }

      // Consume it: this gesture is navigation, not zoom.
      event.preventDefault();
      event.stopPropagation();

      const now = performance.now();
      const previous = intentRef.current;
      const decayed =
        previous && previous.nodeId === target.nodeId
          ? Math.max(0, previous.amount - (now - previous.at) * DECAY_PER_MS)
          : 0;

      const amount = decayed + Math.abs(event.deltaY);

      if (amount >= COMMIT_THRESHOLD) {
        intentRef.current = null;
        commitRef.current(target.nodeId);
        return;
      }

      intentRef.current = { nodeId: target.nodeId, amount, at: now };
    };

    // Non-passive: capturing the gesture requires preventDefault.
    element.addEventListener('wheel', onWheel, { passive: false });
    element.addEventListener('pointermove', onPointerMove);

    return () => {
      element.removeEventListener('wheel', onWheel);
      element.removeEventListener('pointermove', onPointerMove);
    };
  }, [camera, gl, size.width, size.height]);
}

/** Renders nothing; exists so the hook can live inside the Canvas tree. */
export function ScrollNavigation({
  targets,
  onCommit,
}: {
  targets: readonly ScrollTarget[];
  onCommit: (nodeId: string) => void;
}) {
  useScrollNavigation(targets, onCommit);
  return null;
}
