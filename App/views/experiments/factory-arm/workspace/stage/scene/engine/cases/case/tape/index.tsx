import React from 'react';

// Three
import { THREE } from '@/three';

// Context
import { useCasesContext } from '@/views/experiments/factory-arm/workspace/cases-context';

// Spec
import type { Box } from '@/views/experiments/factory-arm/engine/box';

// Helpers
import { tokenColor } from '@/helper';

const TAPE = 0.06;
const MATERIAL = new THREE.MeshStandardMaterial({
  color: tokenColor('orange-600'),
  roughness: 0.5,
});

type Props = Pick<Box, 'id'>;

const Tape: React.FunctionComponent<Props> = ({ id }) => {
  const { boxes } = useCasesContext();
  const [width, height] = boxes.find((box) => {
    return box.id === id;
  })!.size;

  return (
    <mesh
      castShadow
      material={MATERIAL}
      position-y={height / 2 + 0.001}
      receiveShadow
    >
      <boxGeometry args={[width + 0.002, 0.002, TAPE]} />
    </mesh>
  );
};

export { Tape };
