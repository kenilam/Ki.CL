import React, { useMemo } from 'react';

import THREE, { Drei } from '@/Three';

import type { LayoutBranch, Vec3 } from './layoutEngine';

type BranchProps = {
  branch: LayoutBranch;
};

/** Thin Bezier strokes - matches the reference vein-like line weight. */
const Branch: React.FunctionComponent<BranchProps> = ({ branch }) => {
  const points = useMemo(() => {
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(...branch.start),
      new THREE.Vector3(...branch.control1),
      new THREE.Vector3(...branch.control2),
      new THREE.Vector3(...branch.end)
    );
    return curve.getPoints(24).map((p): Vec3 => [p.x, p.y, p.z]);
  }, [branch.start, branch.control1, branch.control2, branch.end]);

  return (
    <Drei.Line
      points={points}
      color={branch.color}
      lineWidth={branch.lineWidth}
      transparent
      opacity={0.92}
    />
  );
};

const Branches: React.FunctionComponent<{ branches: LayoutBranch[] }> = ({
  branches,
}) => (
  <group>
    {branches.map((branch) => (
      <Branch key={branch.id} branch={branch} />
    ))}
  </group>
);

export default Branches;
