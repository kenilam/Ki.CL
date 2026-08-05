/**
 * Rendering engine — Bezier branches (layer 2)
 * THREE.CubicBezierCurve3 → tapered TubeGeometry
 */
import React, { useLayoutEffect, useMemo } from 'react';

import THREE from '@/Three';

import type { LayoutBranch } from './layoutEngine';

type Props = {
  branch: LayoutBranch;
};

const Branch: React.FunctionComponent<Props> = ({ branch }) => {
  const geometry = useMemo(() => {
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(...branch.start),
      new THREE.Vector3(...branch.control1),
      new THREE.Vector3(...branch.control2),
      new THREE.Vector3(...branch.end)
    );

    const tubularSegments = 32;
    const radialSegments = 7;
    const geo = new THREE.TubeGeometry(
      curve,
      tubularSegments,
      1,
      radialSegments,
      false
    );

    const start = branch.startWidth;
    const end = branch.endWidth;
    const vertsPerRing = radialSegments + 1;
    const rings = tubularSegments + 1;
    const position = geo.attributes.position as THREE.BufferAttribute;
    const center = new THREE.Vector3();

    for (let ring = 0; ring < rings; ring += 1) {
      const t = ring / Math.max(rings - 1, 1);
      const radius = start + (end - start) * t ** 1.55;
      curve.getPoint(t, center);

      for (let j = 0; j < vertsPerRing; j += 1) {
        const idx = ring * vertsPerRing + j;
        if (idx >= position.count) {
          continue;
        }

        const dx = position.getX(idx) - center.x;
        const dy = position.getY(idx) - center.y;
        const dz = position.getZ(idx) - center.z;
        const len = Math.hypot(dx, dy, dz) || 1;

        position.setXYZ(
          idx,
          center.x + (dx / len) * radius,
          center.y + (dy / len) * radius,
          center.z + (dz / len) * radius
        );
      }
    }

    position.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, [branch]);

  useLayoutEffect(
    () => () => {
      geometry.dispose();
    },
    [geometry]
  );

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={branch.color}
        roughness={0.66}
        metalness={0.03}
        transparent
        opacity={0.97}
      />
    </mesh>
  );
};

type BranchesProps = {
  branches: LayoutBranch[];
};

const Branches: React.FunctionComponent<BranchesProps> = ({ branches }) => (
  <group>
    {branches.map((branch) => (
      <Branch key={branch.id} branch={branch} />
    ))}
  </group>
);

export default Branches;
