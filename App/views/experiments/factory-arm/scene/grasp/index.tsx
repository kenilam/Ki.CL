import React, { useRef } from 'react';

// Physics
import { useRapier } from '@react-three/rapier';

// Three
import { Fiber } from '@/three';

// Context
import {
  type Job,
  useFactoryArmContext,
} from '@/views/experiments/factory-arm/context';

// Kinematics
import {
  bearing,
  forward,
  solve,
  type Joints,
  type Point,
} from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Obstacles
import { OBSTACLES } from '@/views/experiments/factory-arm/scene/obstacles/constants';

// Partials
import { occupied } from './cell';
import { carry, pick, place } from './hold';
import { touching } from './pad';
import { CLEARANCE, along, speed, type Step } from './plan';
import type { Carried } from './route/body';
import { type Origin, retreat, verify } from './route/steer';
import { start } from './start';

/*
 * How close the pad must get to a waypoint to count as there, in metres,
 * measured to the nearest point the arm can reach so an unreachable one ends.
 */
const ARRIVED = 0.01;

/** Radians the roll may still be off by once the pad counts as turned. */
const TURNED = 0.01;

/**
 * Ways round found in a row without reaching any waypoint before the way
 * counts as blocked. A way round that keeps changing isn't getting anywhere.
 */
const ROUNDS = 4;

const arrived = (joints: Joints, step: Step) => {
  const goal = solve(step.target, 0, step.facing);
  const pad = forward(joints);
  const end = forward(goal);

  return (
    Math.hypot(pad.x - end.x, pad.y - end.y, pad.z - end.z) < ARRIVED &&
    Math.abs(goal.roll - joints.roll) < TURNED
  );
};

/**
 * Works through the queue of clicked cases, one at a time: plans the moves
 * for the next case, sends the pad to each waypoint in turn, and acts on
 * arrival. The held case follows the pad, turning with the arm.
 *
 * Before each move, and again whenever the sensors find something new, the
 * move is checked against every obstacle found so far. A blocked move goes
 * round. With no way round and a case held, the arm takes it back to where it
 * was picked up; with no way back either, it stops and the light turns red.
 * With nothing held, it gives the case up.
 */
const Grasp: React.FunctionComponent = () => {
  const { alarm, bodies, found, held, joints, known, queue, skip, write } =
    useFactoryArmContext();
  const { rapier } = useRapier();

  const job = useRef<Job | undefined>(undefined);
  const steps = useRef<Step[]>([]);

  // Where the current straight-line move started, and how far along it is.
  const leg = useRef<{ from: Point; travelled: number } | null>(null);

  // Where the held case came from, and whether the arm is taking it back.
  const origin = useRef<Origin | null>(null);
  const backing = useRef(false);

  // The move last checked, against how many finds; and ways round in a row.
  const checked = useRef<{ step: Step; found: number } | null>(null);
  const rounds = useRef(0);
  const halted = useRef(false);

  const carried = (): Carried | undefined => {
    const entry = held.current && bodies.current.get(held.current.id);

    return held.current && entry
      ? {
          size: entry.box.size,
          yaw: held.current.yaw,
          offset: held.current.offset,
        }
      : undefined;
  };

  const act = (step: Step, pad: Point) => {
    const id = job.current?.id;
    const entry = id ? bodies.current.get(id) : undefined;
    const holding = held.current && bodies.current.get(held.current.id);

    if (step.action === 'pick') {
      if (id && entry && touching(pad, entry.body, entry.box)) {
        write.held(pick(rapier, id, entry.body, pad, bearing(joints.current)));
        origin.current = {
          top: step.target,
          facing: step.facing,
          lift: entry.box.size[1] + CLEARANCE,
        };
      } else {
        // The case moved or went; lift clear and give up on it.
        steps.current = steps.current.slice(0, 2);
      }
    }

    if (step.action === 'place' && holding) {
      place(rapier, holding.body);
      write.held(null);
    }

    return (
      step.action !== 'clear' || !occupied(bodies.current, held.current?.id)
    );
  };

  /** Checks the next move if it or what's known has changed, and acts on it. */
  const steer = () => {
    const [head] = steps.current;

    if (
      !head ||
      (checked.current?.step === head &&
        checked.current.found === found.current)
    ) {
      return;
    }

    const solids = OBSTACLES.filter(({ id }) => known.current.has(id));
    const verdict = verify(head, joints.current, carried(), solids);

    if (verdict.kind === 'go') {
      checked.current = { step: head, found: found.current };

      return;
    }

    if (verdict.kind === 'round' && rounds.current < ROUNDS) {
      rounds.current += 1;
      steps.current.splice(0, 1, ...verdict.steps);
      leg.current = null;
      checked.current = { step: steps.current[0], found: found.current };

      return;
    }

    const back =
      held.current && !backing.current && origin.current
        ? retreat(joints.current, origin.current, carried(), solids)
        : null;

    if (back) {
      backing.current = true;
      rounds.current = 0;
      steps.current = back;
      leg.current = null;
      checked.current = { step: back[0], found: found.current };
    } else if (held.current) {
      halted.current = true;
      alarm();
    } else {
      steps.current = [];
      leg.current = null;
      skip();
    }
  };

  Fiber.useFrame((_, delta) => {
    const pad = forward(joints.current);
    const holding = held.current && bodies.current.get(held.current.id);

    if (holding && held.current) {
      carry(holding.body, held.current, pad, bearing(joints.current));
    }

    // Stopped: hold still where it is, case and all.
    if (halted.current) {
      write.command({
        target: pad,
        grip: held.current ? 1 : 0,
        facing: bearing(joints.current),
      });

      return;
    }

    if (!steps.current.length) {
      // The finished case leaves the queue only now, so it can't be requeued mid-move.
      if (job.current) {
        queue.current.shift();
        job.current = undefined;
      }

      const [next] = queue.current;
      const planned = next && start(next, bodies.current, queue.current);

      if (next && planned) {
        job.current = next;
        steps.current = planned;
        origin.current = null;
        backing.current = false;
        rounds.current = 0;
      } else if (next) {
        queue.current.shift();
      }
    }

    steer();

    const [step] = steps.current;

    if (!step || halted.current) {
      return;
    }

    if (step.ease && !leg.current) {
      leg.current = { from: pad, travelled: 0 };
    }

    if (leg.current) {
      const { from, travelled } = leg.current;
      const length = Math.hypot(
        step.target.x - from.x,
        step.target.y - from.y,
        step.target.z - from.z
      );

      leg.current.travelled +=
        speed(step.ease, travelled, length - travelled) * Math.min(delta, 0.1);
    }

    write.command({
      target: leg.current
        ? along(leg.current.from, step.target, leg.current.travelled)
        : step.target,
      grip: held.current ? 1 : 0,
      facing: step.facing,
    });

    if (arrived(joints.current, step) && act(step, pad)) {
      steps.current.shift();
      leg.current = null;
      rounds.current = 0;
    }
  });

  return null;
};

export { Grasp };
