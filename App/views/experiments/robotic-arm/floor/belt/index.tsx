import React, { useMemo, useRef } from 'react';

// Libraries
import { useFrame } from '@react-three/fiber';
import {
  Color,
  DataTexture,
  NearestFilter,
  RepeatWrapping,
  SRGBColorSpace,
  type MeshStandardMaterial,
} from 'three';

// World
import { BELT_TOP, type Belt as Plant } from '../world';

// Constants
import { COLOURS } from '../constants';

/** Length of one stripe on the surface, in metres. */
const PITCH = 0.25;

/** Two pixels, one per stripe colour, repeated down the belt. */
const stripes = (length: number) => {
  const [a, b] = [COLOURS.belt, COLOURS.stripe].map((hex) =>
    new Color(hex).toArray().map((channel) => Math.round(channel * 255))
  );
  const texture = new DataTexture(new Uint8Array([...a, 255, ...b, 255]), 1, 2);

  texture.colorSpace = SRGBColorSpace;
  texture.magFilter = NearestFilter;
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(1, length / (PITCH * 2));
  texture.needsUpdate = true;

  return texture;
};

/**
 * A belt segment of any `length`, starting at its `start` and running along
 * its heading. Segments chain by starting one where the last ends.
 */
const Belt: React.FunctionComponent<{ belt: Plant }> = ({ belt }) => {
  const surface = useMemo(() => stripes(belt.length), [belt.length]);
  const material = useRef<MeshStandardMaterial>(null);

  useFrame((_, delta) => {
    material.current?.map?.offset.setY(
      material.current.map.offset.y - (belt.speed * delta) / (PITCH * 2)
    );
  });

  return (
    <group position={[belt.start.x, 0, belt.start.z]} rotation-y={belt.heading}>
      <mesh
        castShadow
        position={[0, (BELT_TOP - 0.02) / 2, belt.length / 2]}
        receiveShadow
      >
        <boxGeometry args={[belt.width + 0.1, BELT_TOP - 0.02, belt.length]} />
        <meshStandardMaterial color={COLOURS.frame} />
      </mesh>
      <mesh
        position={[0, BELT_TOP - 0.01, belt.length / 2]}
        receiveShadow
        rotation-x={-Math.PI / 2}
      >
        <planeGeometry args={[belt.width, belt.length]} />
        <meshStandardMaterial map={surface} ref={material} />
      </mesh>
    </group>
  );
};

export { Belt };
