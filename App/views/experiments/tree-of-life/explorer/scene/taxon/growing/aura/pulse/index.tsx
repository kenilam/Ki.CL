import React from 'react';

import { THREE, Drei } from '@/three';

// Hooks
import { usePulse } from './use-pulse';

// Textures
import {
  halo,
  ring,
} from '@/views/experiments/tree-of-life/explorer/scene/taxon/growing/aura/textures';

/**
 * Emphasis for the taxon being looked at and the origin of life. Billboarded,
 * so the rings stay circular from any angle, and opted out of raycasting, so
 * they never take a click meant for a taxon behind them.
 */
const Pulse: React.FunctionComponent = () => {
  const { haloRef, ringA, ringB, tint, variant } = usePulse();

  // Neither occludes the tree nor is occluded by it.
  const surface = (texture: THREE.Texture) => (
    <meshBasicMaterial
      color={tint}
      map={texture}
      transparent
      opacity={0}
      depthWrite={false}
      side={THREE.DoubleSide}
      toneMapped={false}
    />
  );

  return (
    <Drei.Billboard>
      {variant === 'origin' ? (
        <mesh ref={haloRef} raycast={() => null}>
          <planeGeometry args={[2, 2]} />
          {surface(halo())}
        </mesh>
      ) : null}

      <mesh ref={ringA} raycast={() => null}>
        <planeGeometry args={[2, 2]} />
        {surface(ring())}
      </mesh>

      {variant === 'active' ? (
        <mesh ref={ringB} raycast={() => null}>
          <planeGeometry args={[2, 2]} />
          {surface(ring())}
        </mesh>
      ) : null}
    </Drei.Billboard>
  );
};

export { Pulse };
