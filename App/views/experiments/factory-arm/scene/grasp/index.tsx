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
import { highest, occupied, onPallet, solidsOf } from './cell';
import { carry, pick, place } from './hold';
import { touching } from './pad';
import { CLEARANCE, along, belt, plan, speed, type Step } from './plan';
import type { Carried } from './route/body';
import { type Origin, retreat, verify } from './route/steer';
import { hopeless, onward, resume, start } from './start';

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

/** How far the arm lifts a case straight up after it strikes something, in metres. */
const RECOIL = 0.1;

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
 * round. With no way round, a case bound for the buffer goes to the belt
 * instead; failing that, a held case goes back to where it was picked up; with
 * no way back either, the arm stops and the light turns red.
 * With nothing held, it gives the case up.
 */
const Grasp: React.FunctionComponent = () => {
  const {
    alarm,
    bodies,
    found,
    held,
    joints,
    known,
    queue,
    skip,
    struck,
    write,
  } = useFactoryArmContext();
  const { rapier } = useRapier();

  const job = useRef<Job | undefined>(undefined);
  const steps = useRef<Step[]>([]);

  // Where the current straight-line move started, and how far along it is.
  const leg = useRef<{ from: Point; travelled: number } | null>(null);

  // Where the held case came from, and whether the arm is taking it back.
  const origin = useRef<Origin | null>(null);
  const backing = useRef(false);

  // Whether a case bound for the buffer has been sent to the belt instead.
  const redirected = useRef(false);

  // The move last checked, against how many finds; and ways round in a row.
  const checked = useRef<{ step: Step; found: number } | null>(null);
  const rounds = useRef(0);
  const halted = useRef(false);

  /** The obstacles found so far. */
  const solids = () => OBSTACLES.filter(({ id }) => known.current.has(id));

  /** The other cases, as solids for the free moves. */
  const cases = () =>
    solidsOf(
      bodies.current,
      [held.current?.id, job.current?.id].filter((id) => id !== undefined)
    );

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

  /**
   * Gives up on the job: marks what was in the way, tells the operator, and
   * calls off the rest of the moves its click asked for, which needed it.
   */
  const giveUp = (given: Job | undefined, across: string[] = []) => {
    const chain = given?.chain;

    write.obstruct(across);

    if (given) {
      skip(given.id);
    }
    // In place, from the back: the job running stays at the head.
    for (let index = queue.current.length - 1; index >= 0; index -= 1) {
      const other = queue.current[index];

      if (other.chain === chain && other !== job.current) {
        queue.current.splice(index, 1);
      }
    }
  };

  const act = (step: Step, pad: Point) => {
    const id = job.current?.id;
    const entry = id ? bodies.current.get(id) : undefined;
    const holding = held.current && bodies.current.get(held.current.id);

    if (step.action === 'pick') {
      /*
       * Checked again now the pad is on the case, with whatever the sensors
       * found on the way over: don't pick it up with no way on for it, or
       * with a lift later in its chain now known to be blocked.
       */
      const chain = queue.current.filter(
        ({ chain: other }) => other === job.current?.chain
      );
      const across = hopeless(chain, bodies.current, solids());
      const next =
        job.current && !across.length
          ? onward(
              job.current,
              bodies.current,
              queue.current,
              solids(),
              joints.current
            )
          : null;

      if (!next || !('steps' in next)) {
        steps.current = steps.current.slice(0, 2);
        giveUp(job.current, next ? next.across : across);
      } else if (id && entry && touching(pad, entry.body, entry.box)) {
        steps.current = [step, ...next.steps];
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

    // Lifted clear after a hit: plan the rest again with the cases where they
    // are now, or take the case back, or stop.
    if (step.action === 'recover') {
      const rest =
        job.current &&
        resume(
          job.current,
          bodies.current,
          queue.current,
          solids(),
          joints.current
        );
      const back =
        rest && 'steps' in rest
          ? null
          : origin.current &&
            retreat(joints.current, origin.current, carried(), [
              ...solids(),
              ...cases(),
            ]);

      if (rest && 'steps' in rest) {
        steps.current = [step, ...rest.steps];
      } else if (back) {
        backing.current = true;
        steps.current = [step, ...back];
      } else {
        halted.current = true;
        alarm();
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

    const verdict = verify(head, joints.current, carried(), solids(), cases());

    if (verdict.kind !== 'go') {
      write.obstruct(verdict.across);
    }

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

    // A buffer place that turned out blocked: take the case to the belt instead.
    const size = held.current && bodies.current.get(held.current.id)?.box.size;

    if (size && job.current?.to === 'buffer' && !redirected.current) {
      redirected.current = true;
      rounds.current = 0;
      steps.current = plan(
        forward(joints.current),
        0,
        size,
        highest(bodies.current),
        belt(size)
      ).slice(3);
      leg.current = null;
      checked.current = null;

      return;
    }

    const back =
      held.current && !backing.current && origin.current
        ? retreat(joints.current, origin.current, carried(), [
            ...solids(),
            ...cases(),
          ])
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
      giveUp(job.current);
    }
  };

  Fiber.useFrame((_, delta) => {
    const pad = forward(joints.current);
    const holding = held.current && bodies.current.get(held.current.id);

    if (holding && held.current) {
      carry(holding.body, held.current, pad, bearing(joints.current));
    }

    /*
     * The carried case struck another: stop the move, lift straight up clear
     * of it, and plan again once there, by when the struck case has settled.
     */
    if (struck.current) {
      write.strike(null);

      if (held.current) {
        const facing = bearing(joints.current);
        const clear = { ...pad, y: pad.y + RECOIL };

        steps.current = [
          { target: clear, facing, ease: 'leave' },
          { target: clear, facing, action: 'recover' },
        ];
        leg.current = null;
        checked.current = null;
        rounds.current = 0;
      }
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

      // A chain with a lift that can't be made is called off before it starts.
      const across = next
        ? hopeless(
            queue.current.filter(({ chain }) => chain === next.chain),
            bodies.current,
            solids()
          )
        : [];
      const planned =
        next && !across.length
          ? start(next, bodies.current, queue.current, solids(), joints.current)
          : null;

      if (next && planned && 'steps' in planned) {
        job.current = next;
        steps.current = planned.steps;
        origin.current = null;
        backing.current = false;
        redirected.current = false;
        rounds.current = 0;
      } else if (next) {
        queue.current.shift();

        // Gone already, as a case sent on to the belt is, needs no word.
        if (across.length || planned || onPallet(next.id, bodies.current)) {
          giveUp(next, [
            ...across,
            ...(planned && 'across' in planned ? planned.across : []),
          ]);
        }
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
