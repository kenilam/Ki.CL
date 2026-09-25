// Kinematics
import type { Point } from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Spec
import type { Box } from '@/views/experiments/factory-arm/scene/boxes/spec';

// Cell
import type { Bodies } from '@/views/experiments/factory-arm/scene/grasp/cell';

// Slab
import {
  slab,
  type Slab,
} from '@/views/experiments/factory-arm/scene/grasp/slab';

// Partials
import { contact } from './contact';
import { before, type Option, options } from './options';

// Constants
import { EDGES } from './constants';

/** How many of the best places for this case are played forward. */
const TRIED = 12;

/**
 * Plays the cases still to come onto the load, each at its own best place,
 * and scores how it went: how many fit, then how tightly, then how low.
 */
const rollout = (first: Option, upcoming: Box[], loaded: Slab[]) => {
  const load = [...loaded, first.slab];
  let fitted = 1;
  let touching = contact(first.slab, loaded);

  for (const box of upcoming) {
    const [best] = options(box, load);

    if (best) {
      touching += contact(best.slab, load);
      load.push(best.slab);
      fitted += 1;
    }
  }

  return [-fitted, -touching, Math.max(...load.map((each) => each.top))];
};

/**
 * The best place on the buffer pallet for a case, and the heading to set it
 * at; or nothing when there is no safe place.
 *
 * `upcoming` are the cases the queue will send to the buffer after this one,
 * in order. The best few places for this case are each played forward with
 * them, and the one that lets the most of them fit - then packs tightest,
 * then stays lowest - wins. Placing one case well on its own can leave no
 * room for the next; this looks at the whole load the click asked for.
 */
const spot = (
  box: Box,
  bodies: Bodies,
  upcoming: Box[] = []
): { point: Point; facing: number } | null => {
  const loaded: Slab[] = [];

  bodies.forEach(({ body, box: other }) => {
    const { x, z } = body.translation();

    if (x > EDGES.x[0] && x < EDGES.x[1] && z > EDGES.z[0] && z < EDGES.z[1]) {
      loaded.push(slab(body, other));
    }
  });

  const choices = options(box, loaded);
  const floor = choices.filter((each) => each.rank[0] === choices[0]?.rank[0]);
  const stacked = choices.filter((each) => !floor.includes(each));

  // The best on the lowest level, and a few stacked ones in case a column
  // leaves more room for what follows.
  const tried = [...floor.slice(0, TRIED), ...stacked.slice(0, TRIED / 3)];

  let best: { option: Option; score: number[] } | null = null;

  for (const option of tried) {
    const score = upcoming.length ? rollout(option, upcoming, loaded) : [];

    if (!best || before(score, best.score)) {
      best = { option, score };
    }
  }

  if (!best) {
    return null;
  }

  const { slab: chosen, facing } = best.option;

  return {
    point: {
      x: (chosen.x[0] + chosen.x[1]) / 2,
      y: chosen.bottom,
      z: (chosen.z[0] + chosen.z[1]) / 2,
    },
    facing,
  };
};

export { spot };
