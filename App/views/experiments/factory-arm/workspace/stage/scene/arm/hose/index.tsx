import React, { useMemo } from 'react';

// Three
import { THREE } from '@/three';

// Materials
import { MATERIAL } from '@/views/experiments/factory-arm/workspace/stage/scene/materials';

// Constants
import { LINK, SIDE } from '@/views/experiments/factory-arm/engine/arm';

/** Where each link's hose runs, in that link's frame. */
const HOSES = {
  fore: [
    [0, 0.15, -0.26],
    [0, 0.24, LINK.fore * 0.2],
    [0, 0.18, LINK.fore * 0.65],
    [0.03, 0.1, LINK.fore - 0.03],
  ],
  upper: [
    [SIDE + 0.09, -0.11, -0.04],
    [SIDE + 0.13, -0.15, LINK.upper * 0.35],
    [SIDE + 0.11, -0.14, LINK.upper * 0.75],
    [SIDE + 0.04, -0.09, LINK.upper - 0.03],
  ],
} satisfies Record<string, [number, number, number][]>;

type Props = { link: keyof typeof HOSES };

/**
 * A cable hose laid along one link. Each hose stays within its link, so it
 * moves with it and never has to stretch across a joint.
 */
const Hose: React.FunctionComponent<Props> = ({ link }) => {
  const geometry = useMemo(
    () =>
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(
          HOSES[link].map((point) => new THREE.Vector3(...point))
        ),
        48,
        0.028,
        10
      ),
    [link]
  );

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={geometry}
      material={MATERIAL.hose}
    />
  );
};

export { Hose };
