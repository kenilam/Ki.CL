import React, { useRef } from 'react';

// Three
import { Fiber } from '@/three';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';
import { useSetup } from '@/views/experiments/factory-arm/setup';

// Kinematics
import {
  bearing,
  forward,
} from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Arm geometry
import { collides } from '@/views/experiments/factory-arm/engine/body';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/scene/obstacles/spec';

// Partials
import { useEngine } from './store';

/** How close the arm comes to an obstacle it doesn't know of before it feels it, in metres. */
const FEEL = 0.01;

/**
 * Drives the arm from the conductor each frame, and tells the cell what
 * happened: steps for the log, cases refused, obstacles to light.
 *
 * The conductor plans against what the arm knows of the cell: what the
 * overhead camera saw, and what the sensors have found since. An obstacle
 * neither saw, the arm feels as it touches it, as a torque sensor would, and
 * knows from then on.
 */
const Runner: React.FunctionComponent = () => {
  const { alarm, calm, found, joints, known, moving, obstacles, skip, write } =
    useFactoryArmContext();
  const { note } = useSetup();
  const { conductor } = useEngine();

  // The obstacles and what was known of them, as the conductor was last told.
  const told = useRef<{
    obstacles: Solid[];
    found: number;
    known: Set<string>;
  } | null>(null);

  Fiber.useFrame((_, delta) => {
    const held = conductor.state.holding?.own;
    const felt = obstacles.current.filter(
      (solid) =>
        !known.current.has(solid.id) &&
        collides(
          joints.current,
          held && {
            size: held.size,
            yaw: 0,
            offset: { x: 0, y: -held.size[1] / 2, z: 0 },
          },
          [solid],
          FEEL
        )
    );

    if (felt.length) {
      write.learn(felt.map(({ id }) => id));
      note(`Felt ${felt.map(({ id }) => id).join(', ')}`, 'warning');
    }

    // The operator moved one, or the arm came to know of one.
    if (
      told.current?.obstacles !== obstacles.current ||
      told.current.found !== found.current
    ) {
      const before = told.current;
      const seen = obstacles.current.filter(
        ({ id }) => !before?.known.has(id) && known.current.has(id)
      );

      // What the sensors saw for the first time; an obstacle the operator moved or added is known already.
      if (before && seen.length && !felt.length) {
        note(`Sensors found ${seen.map(({ id }) => id).join(', ')}`, 'info');
      }

      conductor.sense(
        obstacles.current.filter(({ id }) => known.current.has(id)),
        !!before && before.obstacles !== obstacles.current
      );
      told.current = {
        obstacles: obstacles.current,
        found: found.current,
        known: new Set(known.current),
      };
    }

    write.command(
      conductor.frame({
        pad: forward(joints.current),
        facing: bearing(joints.current),
        delta,
        now: performance.now(),
        moved: moving.current?.at ?? -Infinity,
      })
    );

    conductor.flush().forEach((event) => {
      if (event.type === 'note') {
        note(event.text, event.level);
      } else if (event.type === 'refuse') {
        // It waits red, with what's in its way lit, till the cell changes.
        write.park(event.target, event.across);
        write.obstruct(event.across);
        skip(event.target);
      } else if (event.type === 'unpark') {
        write.unpark(event.target);
      } else if (event.type === 'alarm') {
        alarm();
      } else {
        calm();
      }
    });
  });

  return null;
};

export { Runner };
