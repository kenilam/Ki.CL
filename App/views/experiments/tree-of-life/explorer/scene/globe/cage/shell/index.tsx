import React from 'react';

// Context
import { useGlobeContext } from '@/views/experiments/tree-of-life/explorer/scene/globe/context';

// Constants
import type { BLUR_SHELLS } from '@/views/experiments/tree-of-life/explorer/scene/globe/constants';

// Helpers
import { tokenColor } from '@/helper';

type Props = { side: (typeof BLUR_SHELLS)[number] };

const Shell: React.FunctionComponent<Props> = ({ side }) => {
  const { geometry, shellMaterials, shellMeshes } = useGlobeContext();

  return (
    <mesh
      ref={(node) => {
        if (node) {
          shellMeshes.current.set(side, node);

          return;
        }

        shellMeshes.current.delete(side);
      }}
      scale={0}
      visible={false}
      raycast={() => null}
      geometry={geometry}
    >
      <meshBasicMaterial
        ref={(node) => {
          if (node) {
            shellMaterials.current.set(side, node);

            return;
          }

          shellMaterials.current.delete(side);
        }}
        color={tokenColor('black-100')}
        wireframe
        transparent
        fog={false}
        opacity={0}
        depthWrite={false}
      />
    </mesh>
  );
};

export { Shell };
