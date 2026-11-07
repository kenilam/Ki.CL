import React, { useEffect, useMemo, useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useStageContext } from '@/views/experiments/kinetic-light/stage/context';

// Stage
import type { Hits } from '@/views/experiments/kinetic-light/stage/hits';
import {
  LANE,
  NOTE_HEIGHT,
  firstAt,
  toBox,
  toShade,
  toWindow,
  toX,
  type Span,
} from '@/views/experiments/kinetic-light/stage/layout';
import {
  shade,
  type Palette,
} from '@/views/experiments/kinetic-light/stage/palette';

type Props = {
  hits: Hits;
  palette: Palette;
  span: Span;
};

const BASE = 1;
const FLASH = 3;
const FADED = 0.35;
const STALE_SECONDS = 0.25;
const ROUNDS = 3;

const WIDTH = LANE * 0.8;
const BODY = new THREE.CylinderGeometry(0.5, 0.5, 1, 16, 1, true).rotateX(
  Math.PI / 2
);
const CAP = new THREE.SphereGeometry(0.5, 16, 8);
const FLAT = new THREE.Quaternion();
const POSITION = new THREE.Vector3();
const SCALE = new THREE.Vector3();
const MATRIX = new THREE.Matrix4();
const COLOR = new THREE.Color();

const Notes: React.FunctionComponent<Props> = ({ hits, palette, span }) => {
  const { clock, length, piece, settings } = useStageContext();
  const { notes } = piece;
  const bodies = useRef<THREE.InstancedMesh>(null);
  const caps = useRef<THREE.InstancedMesh>(null);
  const next = useRef(0);
  const last = useRef(Number.NEGATIVE_INFINITY);
  const looped = useRef(false);
  const longest = useMemo(
    () => Math.max(0, ...notes.map(({ duration }) => duration)),
    [notes]
  );

  useEffect(() => {
    next.current = 0;
    last.current = Number.NEGATIVE_INFINITY;
    looped.current = false;
  }, [notes]);

  Fiber.useFrame(() => {
    const tubes = bodies.current;
    const ends = caps.current;

    if (!tubes || !ends) {
      return;
    }

    const now = clock();
    const { hue, speed } = settings;

    if (now < last.current) {
      next.current = firstAt(notes, now);
    }

    if (last.current - now > length / 2) {
      looped.current = true;
    }

    while (next.current < notes.length && notes[next.current].time <= now) {
      const note = notes[next.current];

      if (now - note.time < STALE_SECONDS) {
        hits.emit({
          color: shade(
            palette,
            toShade(note.pitch, span) + hue,
            new THREE.Color()
          ),
          velocity: note.velocity,
          x: toX(note.pitch, span),
        });
      }

      next.current += 1;
    }

    last.current = now;

    const rounds = looped.current
      ? [now + length, now, now - length]
      : [now, now - length];
    let count = 0;

    for (const local of rounds) {
      const [from, to] = toWindow(local, speed);

      for (
        let index = firstAt(notes, from - longest);
        index < notes.length && notes[index].time < to;
        index += 1
      ) {
        const note = notes[index];
        const end = note.time + note.duration;

        if (end < from) {
          continue;
        }

        const { length, z } = toBox(note, local, speed);
        const x = toX(note.pitch, span);
        const cap = Math.min(WIDTH, length);
        let brightness = BASE;

        if (note.time <= local && local < end) {
          brightness = FLASH;
        }

        if (end <= local) {
          brightness = FADED;
        }

        shade(palette, toShade(note.pitch, span) + hue, COLOR).multiplyScalar(
          brightness
        );

        MATRIX.compose(
          POSITION.set(x, NOTE_HEIGHT / 2, z),
          FLAT,
          SCALE.set(WIDTH, NOTE_HEIGHT, length - cap)
        );
        tubes.setMatrixAt(count, MATRIX);
        tubes.setColorAt(count, COLOR);

        SCALE.set(WIDTH, NOTE_HEIGHT, cap);
        MATRIX.compose(
          POSITION.set(x, NOTE_HEIGHT / 2, z + (length - cap) / 2),
          FLAT,
          SCALE
        );
        ends.setMatrixAt(count * 2, MATRIX);
        ends.setColorAt(count * 2, COLOR);
        MATRIX.compose(
          POSITION.set(x, NOTE_HEIGHT / 2, z - (length - cap) / 2),
          FLAT,
          SCALE
        );
        ends.setMatrixAt(count * 2 + 1, MATRIX);
        ends.setColorAt(count * 2 + 1, COLOR);
        count += 1;
      }
    }

    tubes.count = count;
    ends.count = count * 2;

    [tubes, ends].forEach((instances) => {
      instances.instanceMatrix.needsUpdate = true;

      if (instances.instanceColor) {
        instances.instanceColor.needsUpdate = true;
      }
    });
  });

  return (
    <>
      <instancedMesh
        args={[BODY, undefined, Math.max(1, notes.length * ROUNDS)]}
        frustumCulled={false}
        ref={bodies}
      >
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <instancedMesh
        args={[CAP, undefined, Math.max(1, notes.length * ROUNDS * 2)]}
        frustumCulled={false}
        ref={caps}
      >
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </>
  );
};

export { Notes };
