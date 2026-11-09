import React, { useMemo, useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useStageContext } from '@/views/experiments/kinetic-light/stage/context';

// Stage
import {
  SCALE,
  playheadAt,
  toPlayhead,
  type Playhead,
  widthOf,
} from '@/views/experiments/kinetic-light/stage/playhead';

// Shots
import { shotAt, toRig } from './shots';

const SETTLE = 1.2;
const FOLLOW_SECONDS = 0.75;
const FOLLOW_SAMPLES = 7;
const BARS_PER_SHOT = 8;
const ZOOM_AT_REST = 10;

const POSITION = new THREE.Vector3();
const TARGET = new THREE.Vector3();

const follow = (playhead: Playhead, time: number): number => {
  let sum = 0;

  for (let sample = 0; sample < FOLLOW_SAMPLES; sample += 1) {
    sum += playheadAt(
      playhead,
      time + FOLLOW_SECONDS * ((sample / (FOLLOW_SAMPLES - 1)) * 2 - 1)
    );
  }

  return sum / FOLLOW_SAMPLES;
};

const Camera: React.FunctionComponent = () => {
  const { clock, sections, settings, sheet, timing } = useStageContext();
  const { camera, size } = Fiber.useThree();
  const playhead = useMemo(
    () => toPlayhead(sheet.heads, timing, widthOf(sheet)),
    [sheet, timing]
  );
  const still = useMemo(
    () => matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );
  const staves = useMemo(() => {
    const top = Math.min(...sheet.staves.map(({ top }) => top));
    const bottom = Math.max(...sheet.staves.map(({ bottom }) => bottom));

    return {
      center: ((top + bottom) / 2) * SCALE,
      depth: (bottom - top) * SCALE,
    };
  }, [sheet]);
  const cuts = useMemo(() => {
    const firsts = sections.length
      ? sections
      : sheet.bars
          .map((_, index) => index + 1)
          .filter((bar) => (bar - 1) % BARS_PER_SHOT === 0);

    return firsts
      .map((bar) => sheet.bars[bar - 1]?.time)
      .filter((time) => time !== undefined)
      .sort((a, b) => a - b);
  }, [sections, sheet]);
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
