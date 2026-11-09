import React, { useMemo, useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useStageContext } from '@/views/experiments/kinetic-light/stage/context';

// Stage
import {
  readPalette,
  shade,
} from '@/views/experiments/kinetic-light/stage/palette';
import {
  roundOf,
  type Playhead,
} from '@/views/experiments/kinetic-light/stage/playhead';

// Paths
import {
  stoppedAt,
  type Track,
} from '@/views/experiments/kinetic-light/stage/balls/path';

// Constants
import {
  CORE,
  GLOW,
  RADIUS,
  SPREAD,
  WHITE,
} from '@/views/experiments/kinetic-light/stage/balls/ball/constants';

type Props = { place: number; playhead: Playhead; track: Track };

const MATRIX = new THREE.Matrix4();
const COLOR = new THREE.Color();

const Stops: React.FunctionComponent<Props> = ({ place, playhead, track }) => {
  const { clock, settings } = useStageContext();
  const { gl } = Fiber.useThree();
  const palette = useMemo(() => readPalette(gl.domElement), [gl]);
  const dots =
    useRef<THREE.InstancedMesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>>(
      null
    );

  Fiber.useFrame(() => {
    if (!dots.current) {
      return;
    }

    const now = clock();
    const round = roundOf(now, playhead);
    const placed = [
      ...(round > 0
        ? track.stops.map((stop) => ({ round: round - 1, stop }))
        : []),
      ...track.stops
        .slice(0, stoppedAt(track, playhead, now))
        .map((stop) => ({ round, stop })),
    ];

    placed.forEach(({ round: at, stop: { x, z } }, index) =>
      dots.current?.setMatrixAt(
        index,
        MATRIX.makeTranslation(x + at * playhead.width, RADIUS, z)
      )
    );
    dots.current.count = placed.length;
    dots.current.instanceMatrix.needsUpdate = true;
    dots.current.material.color
      .copy(shade(palette, settings.hue + place * SPREAD, COLOR))
      .lerp(WHITE, CORE)
      .multiplyScalar(GLOW);
  });

  if (!track.stops.length) {
    return null;
  }

  return (
    <instancedMesh
      args={[undefined, undefined, track.stops.length * 2]}
      frustumCulled={false}
      ref={dots}
    >
      <sphereGeometry args={[RADIUS, 24, 16]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
};

export { Stops };
