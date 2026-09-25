import React, { useMemo } from 'react';

// Three
import { THREE } from '@/three';

// Materials
import { MATERIAL } from './materials';

type Props = { points: [number, number, number][] };

/**
 * A cable hose laid along one link. Each hose stays within its link, so it
 * moves with it and never has to stretch across a joint.
 */
const Hose: React.FunctionComponent<Props> = ({ points }) => {
  const geometry = useMemo(
    () =>
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(
          points.map((point) => new THREE.Vector3(...point))
        ),
        48,
        0.028,
        10
      ),
    [points]
  );

  return <mesh geometry={geometry} material={MATERIAL.hose} />;
};

export { Hose };
