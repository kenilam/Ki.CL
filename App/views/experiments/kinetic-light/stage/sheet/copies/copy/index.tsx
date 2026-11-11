import React from 'react';

// Three
import { THREE } from '@/three';

// Context
import { useSheetContext } from '@/views/experiments/kinetic-light/stage/sheet/context';

// Stage
import { SCALE } from '@/views/experiments/kinetic-light/stage/playhead';

// Hooks
import { useCopy } from './use-copy';

// Constants
import type { ROUNDS } from '@/views/experiments/kinetic-light/stage/sheet/copies/constants';

const LIFT = 0.002;

type Props = { round: (typeof ROUNDS)[number] };

const Copy: React.FunctionComponent<Props> = ({ round }) => {
  const { geometry, palette } = useSheetContext();
  const copy = useCopy(round);

  return (
    <mesh
      geometry={geometry}
      position-y={LIFT}
      ref={copy}
      rotation-x={Math.PI / 2}
      scale={SCALE}
    >
      <meshBasicMaterial
        color={palette.ink}
        side={THREE.DoubleSide}
        toneMapped={false}
        transparent
      />
    </mesh>
  );
};

export { Copy };
