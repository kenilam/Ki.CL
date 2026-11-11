import { useMemo, useRef } from 'react';

import { THREE, Fiber } from '@/three';

// Constants
import { BODY_AT } from '@/views/experiments/tree-of-life/explorer/scene/taxon/constants';

// Hooks
import type { useGrowth } from './use-growth';
import type { useShape } from './use-shape';

type Props = Pick<
  ReturnType<typeof useShape>,
  'bodyRadius' | 'branch' | 'tip'
> &
  Pick<ReturnType<typeof useGrowth>, 'grown'> & {
    endWidth: number;
  };

/**
 * Applies the spring to the scene graph each frame. Only the branch's draw
 * range moves, so growing never rebuilds a buffer or re-renders React, and the
 * body rides the drawn tip instead of waiting at the destination.
 */
const useDraw = ({ bodyRadius, branch, endWidth, grown, tip }: Props) => {
  const branchRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const auraRef = useRef<THREE.Group>(null);

  Fiber.useFrame(() => {
    const branchMesh = branchRef.current;
    const bodyMesh = bodyRef.current;
    const value = Math.min(1, Math.max(0, grown.get()));

    if (branchMesh && branch) {
      branchMesh.visible = value > 0;
      branchMesh.geometry.setDrawRange(
        0,
        Math.round(branch.steps * value) * branch.indicesPerStep
      );
    }

    if (bodyMesh) {
      bodyMesh.visible = value > 0;

      if (branch) {
        branch.curve.getPointAt(value, bodyMesh.position);
      } else {
        bodyMesh.position.set(tip.x, tip.y, tip.z);
      }

      const emerged = Math.max(0, (value - BODY_AT) / (1 - BODY_AT));

      bodyMesh.scale.setScalar(
        endWidth / 2 + (bodyRadius - endWidth / 2) * emerged
      );

      auraRef.current?.position.copy(bodyMesh.position);
    }
  });

  return useMemo(() => {
    return { aura: auraRef, body: bodyRef, branch: branchRef };
  }, []);
};

export { useDraw };
