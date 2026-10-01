import React, { useMemo, useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Station
import type { Case as Spec } from 'arm/station/spec';

// Constants
import { DRAG } from '@/views/experiments/factory-arm/floor/constants';

const TAPE = 0.06;
const CARDBOARD = '#c69a64';
const TAPE_MATERIAL = new THREE.MeshStandardMaterial({
  color: '#a97c47',
  roughness: 0.5,
});

/** Glows over the cardboard: green for a case queued, red for one refused for now. */
const GLOW = {
  none: new THREE.Color('#000000'),
  queued: new THREE.Color('#2fd065'),
  stuck: new THREE.Color('#e5322d'),
};

/** Where a case is drawn this frame: its centre and its heading. */
type Pose = { at: { x: number; y: number; z: number }; yaw: number };

type Props = {
  own: Spec;
  /** Where it is now, in its group's frame; read every frame. */
  pose: () => Pose | null;
  /** How it glows now. */
  glow: () => keyof typeof GLOW;
  onClick?: () => void;
};

/** One case, placed where its station says each frame. */
const Case: React.FunctionComponent<Props> = ({ glow, onClick, own, pose }) => {
  const visual = useRef<THREE.Group>(null);
  const [width, height] = own.size;

  const cardboard = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: CARDBOARD,
        emissive: GLOW.none,
        emissiveIntensity: 0.55,
        roughness: 0.9,
      }),
    []
  );

  Fiber.useFrame(() => {
    const now = pose();

    if (now && visual.current) {
      visual.current.visible = true;
      visual.current.position.set(now.at.x, now.at.y, now.at.z);
      visual.current.rotation.set(0, now.yaw, 0);
    } else if (visual.current) {
      visual.current.visible = false;
    }

    cardboard.emissive.copy(GLOW[glow()]);
  });

  const select = (event: Fiber.ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    // A drag to turn the view that ends on a case isn't a click on it.
    if (event.delta <= DRAG) {
      onClick?.();
    }
  };

  return (
    <group
      onClick={select}
      onPointerOut={() => (document.body.style.cursor = '')}
      onPointerOver={(event) => {
        event.stopPropagation();
        document.body.style.cursor = onClick ? 'pointer' : 'default';
      }}
      ref={visual}
    >
      <mesh castShadow material={cardboard} receiveShadow>
        <boxGeometry args={own.size} />
      </mesh>
      <mesh
        castShadow
        material={TAPE_MATERIAL}
        position-y={height / 2 + 0.001}
        receiveShadow
      >
        <boxGeometry args={[width + 0.002, 0.002, TAPE]} />
      </mesh>
    </group>
  );
};

export { Case };
export type { Pose };
