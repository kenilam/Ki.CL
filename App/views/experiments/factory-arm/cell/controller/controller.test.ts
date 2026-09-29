import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

// Protocol
import type { Instruction, Plan, Point, Report } from '../protocol';

// Partials
import { create } from './controller';

// Constants
import { REST } from '../model/constants';
import { ACCEL, SPEED, TICK } from './constants';

const ARM = 'arm-1';

/** A plan for the test arm, revision and holding by default the first one. */
const planned = (
  instructions: Instruction[],
  over: Partial<Plan> = {}
): Plan => ({
  arm: ARM,
  revision: 1,
  holding: null,
  known: [],
  instructions,
  ...over,
});

const move = (at: Point, facing = 0): Instruction => ({
  do: 'move',
  to: { at, facing },
  ease: 'swing',
});

/** Ticks until the arm goes idle or `seconds` pass, collecting every report. */
const run = (
  controller: ReturnType<typeof create>,
  seconds = 10,
  between: (at: number) => void = () => {}
) => {
  const reports: Report[] = [];

  for (let at = 0; at < seconds; at += TICK) {
    controller.tick(TICK);
    between(at);
    reports.push(...controller.drain());

    if (controller.telemetry().state !== 'running') {
      break;
    }
  }

  return reports;
};

const kinds = (reports: Report[]) => reports.map(({ type }) => type);

const far = (a: { x: number; y: number; z: number }, b: typeof a) =>
  Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);

describe('a plan', () => {
  test('runs its moves in order and reports each', () => {
    const controller = create({ arm: ARM });
    const target = { x: 0.8, y: 0.9, z: 1.4 };

    controller.command({
      type: 'load',
      arm: ARM,
      plan: planned([move({ x: 0.2, y: 1.8, z: 1 }), move(target)]),
    });

    const reports = run(controller);

    assert.deepEqual(kinds(reports), [
      'loaded',
      'progress',
      'progress',
      'done',
    ]);
    assert.ok(far(controller.telemetry().pad.at, target) < 0.01);
    assert.equal(controller.telemetry().state, 'idle');
  });

  test('is refused when stale, misaddressed or wrong about the pad', () => {
    const controller = create({ arm: ARM });

    controller.command({ type: 'load', arm: ARM, plan: planned([]) });
    controller.command({
      type: 'load',
      arm: ARM,
      plan: planned([], { revision: 1 }),
    });
    controller.command({
      type: 'load',
      arm: ARM,
      plan: planned([], { revision: 2, arm: 'arm-2' }),
    });
    controller.command({
      type: 'load',
      arm: ARM,
      plan: planned([], { revision: 3, holding: 'c1' }),
    });

    const rejected = controller
      .drain()
      .filter(({ type }) => type === 'rejected');

    assert.equal(rejected.length, 3);
  });

  test('picks and places, and the arm remembers what it holds', () => {
    const controller = create({ arm: ARM });

    controller.command({
      type: 'load',
      arm: ARM,
      plan: planned([
        { do: 'pick', case: 'c1' },
        { do: 'wait', seconds: 0.1 },
      ]),
    });
    run(controller);
    assert.equal(controller.telemetry().holding, 'c1');

    controller.command({
      type: 'load',
      arm: ARM,
      plan: planned([{ do: 'place', case: 'c1' }], {
        revision: 2,
        holding: 'c1',
      }),
    });
    run(controller);
    assert.equal(controller.telemetry().holding, null);
  });
});

describe('a newer plan', () => {
  test('retargets a move under way', () => {
    const controller = create({ arm: ARM });
    const first = { x: 1.2, y: 1.2, z: 1.2 };
    const second = { x: -0.8, y: 1.4, z: 1.4 };

    controller.command({
      type: 'load',
      arm: ARM,
      plan: planned([move(first)]),
    });
    controller.drain();
    run(controller, 0.3);
    controller.command({
      type: 'load',
      arm: ARM,
      plan: planned([move(second)], { revision: 2 }),
    });

    const reports = run(controller);

    assert.ok(far(controller.telemetry().pad.at, second) < 0.01);
    assert.equal(reports.filter(({ type }) => type === 'done').length, 1);
    assert.equal(controller.telemetry().revision, 2);
  });

  test('waits for a grip to finish before taking over', () => {
    const controller = create({ arm: ARM });

    controller.command({
      type: 'load',
      arm: ARM,
      plan: planned([{ do: 'pick', case: 'c1' }, move({ x: 1, y: 1.5, z: 1 })]),
    });
    run(controller, 0.05);
    controller.command({
      type: 'load',
      arm: ARM,
      plan: planned([{ do: 'wait', seconds: 0.01 }], {
        revision: 2,
        holding: null,
      }),
    });

    const reports = run(controller);

    assert.equal(controller.telemetry().holding, 'c1');
    assert.deepEqual(kinds(reports), [
      'progress',
      'loaded',
      'progress',
      'done',
    ]);
  });
});

describe('the sensors', () => {
  test('hold the arm at a box the plan did not know, until a plan knows it', () => {
    const controller = create({ arm: ARM });
    const beam = {
      id: 'beam',
      min: { x: -0.2, y: 1.3, z: 1.9 },
      max: { x: 0.2, y: 1.5, z: 2.1 },
    };

    controller.feed([beam]);
    controller.command({
      type: 'load',
      arm: ARM,
      plan: planned([move({ x: 0, y: 1.4, z: 2.4 })]),
    });

    const held = run(controller).find((report) => report.type === 'held');

    assert.ok(held);
    assert.deepEqual(held.seen, ['beam']);
    assert.equal(controller.telemetry().state, 'held');
    assert.ok(far(controller.telemetry().pad.at, beam.min) > 0.05);

    controller.command({
      type: 'load',
      arm: ARM,
      plan: planned([move({ x: 0, y: 1.9, z: 1 })], {
        revision: 2,
        known: ['beam'],
      }),
    });

    assert.deepEqual(kinds(run(controller)), ['loaded', 'progress', 'done']);
  });
});

describe('the stop', () => {
  test('refuses plans until reset, and keeps hold of the case', () => {
    const controller = create({ arm: ARM });

    controller.command({
      type: 'load',
      arm: ARM,
      plan: planned([{ do: 'pick', case: 'c1' }]),
    });
    run(controller);
    controller.command({ type: 'stop', arm: ARM });
    controller.command({
      type: 'load',
      arm: ARM,
      plan: planned([], { revision: 2, holding: 'c1' }),
    });
    controller.command({ type: 'reset', arm: ARM });
    controller.command({
      type: 'load',
      arm: ARM,
      plan: planned([], { revision: 3, holding: 'c1' }),
    });

    assert.deepEqual(kinds(controller.drain()), [
      'stopped',
      'rejected',
      'reset',
      'loaded',
      'done',
    ]);
    assert.equal(controller.telemetry().holding, 'c1');
  });
});

describe('the motors', () => {
  test('never turn faster than their caps or change speed faster than they may', () => {
    const controller = create({ arm: ARM });
    let previous = controller.telemetry().joints;
    let before = previous;

    controller.command({
      type: 'load',
      arm: ARM,
      plan: planned([move({ x: 1.5, y: 0.3, z: -0.5 }, 1), move(REST)]),
    });

    run(controller, 10, () => {
      const { joints } = controller.telemetry();

      for (const name of ['shoulder', 'elbow', 'wrist', 'yaw'] as const) {
        const speed = name === 'yaw' ? SPEED.yaw : SPEED.joint;
        const accel = name === 'yaw' ? ACCEL.yaw : ACCEL.joint;
        const now = (joints[name] - previous[name]) / TICK;
        const then = (previous[name] - before[name]) / TICK;

        assert.ok(Math.abs(now) <= speed + 1e-6, `${name} at ${now} rad/s`);
        assert.ok(
          Math.abs(now - then) <= accel * TICK + 1e-6,
          `${name} changed by ${now - then}`
        );
      }

      before = previous;
      previous = joints;
    });

    assert.equal(controller.telemetry().state, 'idle');
  });
});
