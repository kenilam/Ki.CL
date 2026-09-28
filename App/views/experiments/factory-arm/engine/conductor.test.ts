import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

// Kinematics
import {
  forward,
  HOME,
} from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Obstacles
import { OBSTACLES } from '@/views/experiments/factory-arm/scene/obstacles/constants';
import type { Solid } from '@/views/experiments/factory-arm/scene/obstacles/spec';

// Stack
import { stack } from '@/views/experiments/factory-arm/scene/pallet/stack';

// Partials
import { conduct, type Event, type Planner } from './conductor';
import { now } from './planners';
import { type Plan, plan } from './planner';
import { extent, world } from './world';

const standard = (obstacles: Solid[] = OBSTACLES) =>
  world(stack({ layers: 4, seed: 7 }), obstacles);

/** The top case at the front of the stack. */
const front = (state: ReturnType<typeof standard>) =>
  Object.values(state.cases).reduce((a, b) =>
    b.at.y > a.at.y + 0.01 ||
    (Math.abs(b.at.y - a.at.y) < 0.01 && b.at.z > a.at.z)
      ? b
      : a
  );

/** A case in the bottom layer, at the front. */
const buried = (state: ReturnType<typeof standard>) =>
  Object.values(state.cases)
    .filter(({ id }) => id.startsWith('0-'))
    .reduce((a, b) => (b.at.z > a.at.z ? b : a));

/**
 * A conductor driving an arm that goes where it's told each frame, and what
 * it said. `planner` defaults to planning on the spot.
 */
const cell = (state = standard(), planner: Planner = now) => {
  const conductor = conduct({
    world: state,
    planners: { arm: planner, background: planner },
    resting: () => 0,
  });
  const events: Event[] = [];
  let pad = forward(HOME);
  let facing = 0;
  let clock = 0;

  const run = (frames: number, until?: () => boolean) => {
    for (let index = 0; index < frames && !until?.(); index++) {
      clock += 1000 / 60;

      const command = conductor.frame({
        pad,
        facing,
        delta: 1 / 60,
        now: clock,
        moved: -Infinity,
      });

      pad = command.target;
      facing = command.facing;
      events.push(...conductor.flush());
    }
  };

  const notes = () =>
    events.flatMap((event) => (event.type === 'note' ? [event.text] : []));

  return { conductor, events, notes, pad: () => pad, run };
};

/** A planner that answers only when told to, as a worker does, some frames later. */
const deferred = () => {
  const queue: (() => void)[] = [];

  const planner: Planner = {
    plan: (request, done) =>
      queue.push(() => now.plan(request, (plan: Plan) => done(plan))),
  };

  return { planner, answer: () => queue.splice(0).forEach((reply) => reply()) };
};

describe('conductor', () => {
  test('a case asked for goes to the belt, picked and set down', () => {
    const state = standard();
    const target = front(state).id;
    const { conductor, notes, run } = cell(state);

    conductor.ask(target);
    run(6000, () => !conductor.busy());

    assert.equal(conductor.state.world.cases[target], undefined);
    assert.ok(conductor.state.riders.has(target) || !conductor.busy());
    assert.ok(notes().some((text) => text.startsWith(`Picked case ${target}`)));
    assert.ok(
      notes().some((text) => text === `Set case ${target} down on the belt`)
    );
  });

  test('the arm holds still while a plan it waits for is being made', () => {
    const state = standard();
    const { answer, planner } = deferred();
    const { conductor, pad, run } = cell(state, planner);
    const start = pad();

    conductor.ask(front(state).id);
    run(30);

    assert.deepEqual(pad(), start);
    assert.equal(conductor.state.job, null);

    answer();
    run(30);

    assert.ok(conductor.state.job);
    assert.notDeepEqual(pad(), start);
  });

  test('a case asked for mid-job leaves the move under way as it was', () => {
    const state = standard();
    const { conductor, run } = cell(state);

    conductor.ask(buried(state).id);
    run(200);

    const job = conductor.state.job;

    assert.ok(job && job.move === 0 && job.step > 0);

    const under = job.moves[0];

    conductor.ask(front(conductor.state.world).id);
    run(1);

    assert.equal(conductor.state.job?.moves[0], under);
  });

  test('a refused case waits red, and the next one goes', () => {
    const state = standard();
    const target = front(state);
    const box = extent(target);
    const beam: Solid = {
      id: 'beam',
      min: { x: box.min.x, y: box.max.y + 0.02, z: box.min.z },
      max: { x: box.max.x, y: box.max.y + 0.17, z: box.max.z },
    };
    const blocked = { ...state, obstacles: [beam] };
    // A case the beam doesn't stop.
    const other = Object.values(state.cases).find(
      ({ id }) =>
        id !== target.id && 'moves' in plan(blocked, id, forward(HOME))
    );

    assert.ok(other);

    const { conductor, events, notes, run } = cell(blocked);

    conductor.ask(target.id);
    conductor.ask(other.id);
    run(6000, () => !conductor.busy());

    assert.deepEqual(conductor.state.parked.get(target.id), ['beam']);
    assert.ok(
      events.some(
        (event) => event.type === 'refuse' && event.target === target.id
      )
    );
    assert.equal(
      conductor.state.world.cases[other.id],
      undefined,
      notes().join('\n')
    );
  });

  test('an obstacle put across the way under way makes the arm hold and plan again', () => {
    const state = standard();
    const target = front(state);
    const { answer, planner } = deferred();
    const { conductor, pad, run } = cell(state, planner);

    conductor.ask(target.id);
    run(1);
    answer();
    run(20);

    const box = extent(target);
    const onIt: Solid = {
      id: 'moved',
      min: { x: box.min.x, y: box.max.y + 0.3, z: box.min.z },
      max: { x: box.max.x, y: box.max.y + 0.45, z: box.max.z },
    };
    const before = pad();

    conductor.sense([...OBSTACLES, onIt], true);
    run(10);

    assert.deepEqual(pad(), before);

    answer();
    run(1);

    assert.equal(conductor.state.job, null);
    assert.deepEqual(conductor.state.parked.get(target.id), ['moved']);
  });

  test('an obstacle moved clear of the way under way changes nothing', () => {
    const state = standard();
    const { conductor, run } = cell(state);

    conductor.ask(front(state).id);
    run(20);

    const job = conductor.state.job;
    const far: Solid = {
      id: 'far',
      min: { x: -3, y: 0, z: -3 },
      max: { x: -2.9, y: 1, z: -2.9 },
    };

    conductor.sense([...OBSTACLES, far], true);
    run(1);

    assert.equal(conductor.state.job?.moves, job?.moves);
  });
});
