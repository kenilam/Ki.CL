import { useEffect, useMemo, useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useStageContext } from '@/views/experiments/kinetic-light/stage/context';

// Stage
import {
  readPalette,
  shade,
} from '@/views/experiments/kinetic-light/stage/palette';
import { hoverAt } from '@/views/experiments/kinetic-light/stage/playhead';

// Paths
import {
  positionAt,
  segmentStart,
  sinceLanding,
  type Track,
} from '@/views/experiments/kinetic-light/stage/balls/path';

// Ribbon
import { createGlow, createRibbon, createTube, writeRibbon } from './ribbon';

// Constants
import {
  CORE,
  DRIFT,
  DRIFT_SECONDS,
  FLASH,
  FLASH_SECONDS,
  GLOW,
  HALO,
  HALO_GLOW,
  MIRROR_GLOW,
  MIRROR_WIDTH,
  PAUSE_LIFT,
  PAUSE_SETTLE,
  PAUSE_SPEED,
  PAUSE_SWAY,
  RADIUS,
  SPREAD,
  STREAK_GLOW,
  STREAK_LENGTH,
  STREAK_WIDTH,
  TRAIL_GLOW,
  TRAIL_SECONDS,
  TRAIL_WIDTH,
  WHITE,
} from './constants';

type Props = { place: number; track: Track };

type Tube = THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>;

const SAMPLES = Array.from({ length: 96 }, () => new THREE.Vector3());
const SWAY = new THREE.Vector3();
const COLOR = new THREE.Color();
const MIRRORED_EYE = new THREE.Vector3();

const useBall = ({ place, track }: Props) => {
  const { clock, playhead, settings } = useStageContext();
  const { gl } = Fiber.useThree();
  const palette = useMemo(() => readPalette(gl.domElement), [gl]);
  const ribbon = useMemo(() => createRibbon(SAMPLES.length), []);
  const reflection = useMemo(() => createRibbon(SAMPLES.length), []);
  const tube = useMemo(() => createTube(TRAIL_GLOW), []);
  const mirrored = useMemo(() => createTube(MIRROR_GLOW, 1), []);
  const glow = useMemo(() => createGlow(), []);
  const sphere =
    useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>>(null);
  const halo = useRef<THREE.Sprite>(null);
  const streak = useRef<THREE.Sprite>(null);
  const trail = useRef<Tube>(null);
  const moved = useRef<{ at: number; time: number }[]>([]);
  const paused = useRef({ time: Number.NaN, weight: 0 });
  const mirror = useRef<Tube>(null);

  useEffect(
    () => () => {
      ribbon.dispose();
      reflection.dispose();
      tube.dispose();
      mirrored.dispose();
      glow.dispose();
    },
    [glow, mirrored, reflection, ribbon, tube]
  );

  Fiber.useFrame(({ camera, clock: frames }, delta) => {
    if (
      !sphere.current ||
      !halo.current ||
      !streak.current ||
      !trail.current ||
      !mirror.current
    ) {
      return;
    }

    const now = clock();
    const history = moved.current;
    const pause = paused.current;

    const stopped = delta > 0 && (now - pause.time) / delta < PAUSE_SPEED;

    pause.time = now;
    pause.weight +=
      ((stopped ? 1 : 0) - pause.weight) *
      (1 - Math.exp(-delta * PAUSE_SETTLE));

    const rest = pause.weight;

    if (history.length && now < history[history.length - 1].time) {
      history.length = 0;
    }

    history.push({ at: frames.elapsedTime, time: now });

    while (
      history.length > 1 &&
      frames.elapsedTime - history[0].at > TRAIL_SECONDS
    ) {
      history.shift();
    }

    const span = Math.min(TRAIL_SECONDS, Math.max(0, now - history[0].time));
    const flash = Math.exp(-sinceLanding(track, playhead, now) / FLASH_SECONDS);
    const start = segmentStart(track, playhead, now);
    const [head] = SAMPLES;
    const seen = positionAt(track, playhead, now, head);
    const turn = (frames.elapsedTime / DRIFT_SECONDS + place) * Math.PI * 2;

    shade(palette, settings.hue + place * SPREAD, COLOR);
    SWAY.set(
      Math.sin(turn) * DRIFT.x,
      Math.sin(turn * 1.3) * DRIFT.y,
      Math.cos(turn * 0.7) * DRIFT.z
    );

    SAMPLES.forEach((sample, index) => {
      const at = Math.max(start, now - (index / (SAMPLES.length - 1)) * span);

      if (index) {
        positionAt(track, playhead, at, sample);
      }

      const hover = hoverAt(at, playhead);

      sample.addScaledVector(SWAY, Math.max(hover, rest * PAUSE_SWAY));
      sample.y += RADIUS + PAUSE_LIFT * rest * (1 - hover);
    });

    sphere.current.visible = seen > 0;
    sphere.current.position.copy(head);
    sphere.current.scale.setScalar(seen);
    sphere.current.material.color
      .copy(COLOR)
      .lerp(WHITE, CORE)
      .multiplyScalar(GLOW + flash * FLASH);

    halo.current.position.copy(head);
    halo.current.scale.setScalar(HALO * (1 + flash / 2) * seen);
    halo.current.material.color.copy(COLOR).multiplyScalar(HALO_GLOW + flash);

    streak.current.position.set(head.x, -head.y, head.z);
    streak.current.scale.set(STREAK_WIDTH, STREAK_LENGTH + head.y, 1);
    streak.current.material.color
      .copy(COLOR)
      .multiplyScalar(((STREAK_GLOW + flash / 2) * seen) / (1 + head.y * 2));

    trail.current.material.uniforms.color.value.copy(COLOR);
    trail.current.material.uniforms.strength.value = TRAIL_GLOW * seen;
    mirror.current.material.uniforms.color.value.copy(COLOR);
    mirror.current.material.uniforms.strength.value = MIRROR_GLOW * seen;
    writeRibbon(trail.current.geometry, SAMPLES, camera.position, TRAIL_WIDTH);
    writeRibbon(
      mirror.current.geometry,
      SAMPLES,
      MIRRORED_EYE.copy(camera.position).setY(-camera.position.y),
      MIRROR_WIDTH
    );
  });

  return {
    glow,
    halo,
    mirror,
    mirrored,
    reflection,
    ribbon,
    sphere,
    streak,
    trail,
    tube,
  };
};

export { useBall };
