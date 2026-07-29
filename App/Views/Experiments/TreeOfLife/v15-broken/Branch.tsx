import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { Fiber } from '@/Three';

import { createTaperedTube } from './taperedTube';

type Props = {
  /** Always the ancestor end — the thicker one. */
  from: readonly [number, number, number];
  /** Always the descendant end. */
  to: readonly [number, number, number];
  fromRadius: number;
  toRadius: number;
  fromColor: string;
  toColor: string;
  /**
   * Stable per-edge seed. Must be the *child's* nodeId so the same edge
   * produces the same curve no matter which of its two ends is focused.
   */
  seed: string;
  /** 0 = ungrown, 1 = fully extended. Read per-frame, never via React. */
  progress?: () => number;
};

/**
 * An organic growth path rather than a connector: a curved, tapered tube
 * that carries the ancestor's colour into the descendant's. Growth is
 * animated by revealing ring segments along the path (setDrawRange), so
 * extending a branch never rebuilds geometry or re-renders React.
 */
const Branch: React.FunctionComponent<Props> = ({
  from,
  to,
  fromRadius,
  toRadius,
  fromColor,
  toColor,
  seed,
  progress,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const tube = useMemo(
    () =>
      createTaperedTube({
        from,
        to,
        fromRadius,
        toRadius,
        fromColor,
        toColor,
        seed,
      }),
    [
      from[0],
      from[1],
      from[2],
      to[0],
      to[1],
      to[2],
      fromRadius,
      toRadius,
      fromColor,
      toColor,
      seed,
    ]
  );

  useEffect(() => () => tube.geometry.dispose(), [tube]);

  Fiber.useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) {
      return;
    }

    const t = progress ? Math.min(1, Math.max(0, progress())) : 1;
    const steps = Math.max(1, Math.ceil(tube.steps * t));
    const count = steps * tube.indicesPerStep;
    // The render tree always runs parent → child, so growth is always from
    // the parent end. No reveal-direction flag needed.
    tube.geometry.setDrawRange(0, count);
  });

  return (
    <mesh ref={meshRef} geometry={tube.geometry}>
      {/* Matte, like the node bodies — no specular sheen on the veins. */}
      <meshLambertMaterial vertexColors side={THREE.DoubleSide} />
    </mesh>
  );
};

export default Branch;
