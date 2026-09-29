// Hub
import type {
  Capacity,
  Target,
} from '@/views/experiments/factory-arm/cell/hub';

// Grid
import { type Hex, SIDES } from '@/views/experiments/factory-arm/cell/grid/hex';
import { slot } from '@/views/experiments/factory-arm/cell/grid/layout';

// Station
import type { Case } from '@/views/experiments/factory-arm/cell/station/spec';

// Partials
import type { Simulation } from './simulations';

type Vector = [number, number, number];

/**
 * The floor as it stands, as a simulation to play again after a change to
 * where things are: the board's pallets with the cases now on them, and
 * each arm's own pallets, with what it has stacked there, as pallets too.
 * `cases` are each station's, in its frame; `extras` each station's own
 * pallets, on its slots.
 */
const standing = ({
  active,
  capacities,
  cases,
  extras,
  stations,
  targets,
}: {
  active: Simulation;
  capacities: Record<string, Capacity>;
  cases: (arm: string) => Case[];
  extras: Record<string, Vector[]>;
  stations: { arm: string; hex: Hex }[];
  targets: Target[];
}): Simulation => {
  /** The cases a station has standing on the slot at `[x, , z]`, relative to it. */
  const on = (arm: string, [x, , z]: Vector) =>
    cases(arm)
      .filter(
        (one) => Math.abs(one.at.x - x) < 0.75 && Math.abs(one.at.z - z) < 0.75
      )
      .map((one) => ({
        ...one,
        at: { x: one.at.x - x, y: one.at.y, z: one.at.z - z },
      }));

  return {
    ...active,
    pallets: [
      ...targets.map(({ at, cases: kept, claimed, id, queue, to }) => ({
        at,
        cases: claimed ? on(claimed, slot(at.slot)) : kept,
        id,
        queue,
        to,
      })),
      ...stations.flatMap(({ arm, hex }) =>
        (extras[arm] ?? []).flatMap((position, count) => {
          const side = SIDES.find(
            (each) =>
              Math.hypot(
                slot(each)[0] - position[0],
                slot(each)[2] - position[2]
              ) < 1e-6
          );

          const cases = on(arm, position);

          return side === undefined || !cases.length
            ? []
            : [
                {
                  id: `${arm}-stacked-${count + 1}`,
                  at: { parent: hex, slot: side },
                  to: hex,
                  queue: [],
                  cases,
                },
              ];
        })
      ),
    ],
    capacities,
  };
};

export { standing };
