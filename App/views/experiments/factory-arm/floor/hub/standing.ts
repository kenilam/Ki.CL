// Hub
import type { Capacity, Target } from 'arm/hub';

// Grid
import { type Hex, SIDES } from 'arm/grid/hex';
import { slot } from 'arm/grid/layout';

// Station
import type { Case } from 'arm/station/spec';

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
      ...targets.map(({ at, cases: kept, claimed, id, queue, to }) => {
        const cases = claimed ? on(claimed, slot(at.slot)) : kept;

        // Only what is still on it can be queued: the rest has gone.
        return {
          at,
          cases,
          id,
          queue: queue.filter((one) =>
            cases.some(({ id: own }) => own === one)
          ),
          to,
        };
      }),
      ...stations.flatMap(({ arm, hex }) => {
        // Numbered past any stacked pallet of this arm's already on the board, so no two share an id.
        const numbered = new RegExp(`^${arm}-stacked-(\\d+)$`);
        const from = Math.max(
          0,
          ...targets.map(({ id }) => Number(id.match(numbered)?.[1] ?? 0))
        );

        return (extras[arm] ?? []).flatMap((position, count) => {
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
                  id: `${arm}-stacked-${from + count + 1}`,
                  at: { parent: hex, slot: side },
                  to: hex,
                  queue: [],
                  cases,
                },
              ];
        });
      }),
    ],
    capacities,
  };
};

export { standing };
