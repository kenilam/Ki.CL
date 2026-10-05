import { runAmr } from './amrs';
import { runArm } from './arms';
import { queues, runBelt } from './belts';
import { settle } from './cases';
import { dispatch } from './dispatch';
import { walk } from './path';
import type { World } from './types';

/** Advances the floor by `dt` seconds, acting on the last commands each robot received. */
const step = (world: World, dt: number) => {
  world.time += dt;
  world.workers.forEach((worker) => walk(worker, worker.speed * dt));
  const lines = queues(world);
  const lifted = world.cases.filter(({ holder }) => holder.kind === 'pad');

  world.belts.forEach((belt) =>
    runBelt(world, belt, dt, lines.get(belt.id), lifted)
  );
  world.arms.forEach((arm) => runArm(world, arm, dt));
  world.amrs.forEach((amr) => runAmr(world, amr, dt));
  settle(world);
  dispatch(world, dt);
};

export { step };
