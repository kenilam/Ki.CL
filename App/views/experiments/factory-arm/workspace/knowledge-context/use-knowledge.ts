import { useMemo, useRef } from 'react';

// Context
import { useAppliedContext } from '@/views/experiments/factory-arm/applied-context';

// Obstacles
import { vision } from '@/views/experiments/factory-arm/engine/vision';

/**
 * What the arm knows of the obstacles. `known` holds the ones the overhead
 * camera sees and the sensors have found, and `found` counts each time that
 * changes, so the arm knows to check its way again. `parked` holds the
 * clicked cases whose moves were given up on, each with the obstacles that
 * were in the way, for the arm to try again once the cell changes. `seeing`
 * holds the sensors with something in view right now, and `obstructing` when
 * each obstacle last stood in the way of a move.
 */
const useKnowledge = () => {
  const { applied } = useAppliedContext();
  const found = useRef(0);
  // What the overhead camera sees is known before the arm moves.
  const known = useRef(new Set(vision(applied.obstacles)));
  const parked = useRef(new Map<string, string[]>());
  const obstructing = useRef(new Map<string, number>());
  const seeing = useRef(new Set<string>());

  const write = useMemo(
    () => ({
      /** Adds obstacles to what's known; `found` goes up once if any are new. */
      learn: (ids: string[]) => {
        const fresh = ids.filter((id) => !known.current.has(id));

        fresh.forEach((id) => known.current.add(id));

        if (fresh.length) {
          found.current += 1;
        }
      },
      /** Holds a clicked case given up on, and what was in its way, to try again once the cell changes. */
      park: (chain: string, across: string[]) => {
        parked.current.set(chain, across);
      },
      unpark: (chain: string) => {
        parked.current.delete(chain);
      },
      /** Marks obstacles as in the way of a move, as of now. */
      obstruct: (ids: string[]) => {
        ids.forEach((id) => obstructing.current.set(id, performance.now()));
      },
      seeing: (next: Set<string>) => {
        seeing.current = next;
      },
      /** The operator placed it, so the arm knows where it now stands, and checks its way again. */
      placed: (id: string) => {
        known.current.add(id);
        found.current += 1;
      },
      /** The operator took it away, so the arm checks its way again. */
      removed: (id: string) => {
        known.current.delete(id);
        found.current += 1;
      },
    }),
    []
  );

  return useMemo(
    () => ({ found, known, obstructing, parked, seeing, write }),
    [write]
  );
};

export { useKnowledge };
