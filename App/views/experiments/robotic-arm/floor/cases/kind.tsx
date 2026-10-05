import React, { useMemo, useRef } from 'react';

// Libraries
import { useFrame } from '@react-three/fiber';
import { Object3D, type InstancedMesh } from 'three';

// World
import { MAX_CASES, type CaseKind, type World } from '@/views/experiments/robotic-arm/floor/world';

// Constants
import { COLOURS } from '@/views/experiments/robotic-arm/floor/constants';

/** Unit shapes, scaled per case to its size. */
const GEOMETRY: Record<CaseKind, React.ReactElement> = {
  box: <boxGeometry />,
  crate: <boxGeometry />,
  tub: <cylinderGeometry args={[0.5, 0.42, 1, 4, 1, false, Math.PI / 4]} />,
  cylinder: <cylinderGeometry args={[0.5, 0.5, 1, 20]} />,
};

type Props = { kind: CaseKind; world: World };

/** All cases of one kind, as one instanced mesh written every frame. */
const Kind: React.FunctionComponent<Props> = ({ kind, world }) => {
  const mesh = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  useFrame(() => {
    if (!mesh.current) {
      return;
    }

    let count = 0;

    world.cases.forEach(({ kind: of, heading, position, size }) => {
      if (of !== kind) {
        return;
      }

      dummy.position.set(position.x, position.y, position.z);
      dummy.rotation.set(0, heading, 0);
      dummy.scale.set(...size);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(count, dummy.matrix);
      count += 1;
    });

    mesh.current.count = count;
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      args={[undefined, undefined, MAX_CASES]}
      castShadow
      frustumCulled={false}
      ref={mesh}
    >
      {GEOMETRY[kind]}
      <meshStandardMaterial color={COLOURS.cases[kind]} />
    </instancedMesh>
  );
};

export { Kind };
