import React, { useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Hooks
import { useResponsive } from 'design/hooks';

// Context
import { useStageContext } from '@/views/experiments/kinetic-light/stage/context';

// Hooks
import { useFraming } from './use-framing';

// Shots
import { follow } from './follow';
import { shotAt, toRig } from './shots';

const SETTLE = 1.2;
const ZOOM_AT_REST = 10;

const POSITION = new THREE.Vector3();
const TARGET = new THREE.Vector3();

const Camera: React.FunctionComponent = () => {
  const { clock, playhead, settings } = useStageContext();
  const { camera, size } = Fiber.useThree();
  const { cuts, staves } = useFraming();
  const { prefersReducedMotion: still } = useResponsive();
  const offset = useRef<{
    position: THREE.Vector3;
    target: THREE.Vector3;
  } | null>(null);

  Fiber.useFrame((_, delta) => {
    const now = clock();
    const { fov } = camera as THREE.PerspectiveCamera;
    const rig = toRig(shotAt(now, playhead, cuts, still), {
      aspect: size.width / Math.max(1, size.height),
      depth: staves.depth,
      fov,
      distance: Math.sqrt(ZOOM_AT_REST / settings.zoom),
    });

    POSITION.set(...rig.position);
    TARGET.set(...rig.target);

    if (!offset.current) {
      offset.current = { position: POSITION.clone(), target: TARGET.clone() };
    }

    const ease = 1 - Math.exp(-SETTLE * delta);
    const { position, target } = offset.current;
    const x = follow(playhead, now);

    position.lerp(POSITION, ease);
    target.lerp(TARGET, ease);
    camera.position.set(x + position.x, position.y, staves.center + position.z);
    camera.lookAt(x + target.x, target.y, staves.center + target.z);
  });

  return null;
};

export { Camera };
