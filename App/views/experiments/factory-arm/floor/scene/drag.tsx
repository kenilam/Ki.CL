import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// Grid
import {
  childCentre,
  type Child,
} from '@/views/experiments/factory-arm/cell/grid/child';
import {
  at as cellAt,
  centre,
  type Hex,
  index,
  SIDES,
} from '@/views/experiments/factory-arm/cell/grid/hex';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';

/** What is being dragged, whether it's new to the floor, and where on the floor it would land. */
type Dragging =
  | { kind: 'arm'; id: string; fresh: boolean; hex: Hex; allowed: boolean }
  | {
      kind: 'pallet';
      id: string;
      fresh: boolean;
      at: Child;
      allowed: boolean;
    };

type Value = {
  dragging: Dragging | null;
  /** Starts dragging an arm or a pallet; `fresh` for one not on the floor yet, to be set down. */
  grab: (kind: Dragging['kind'], id: string, fresh?: boolean) => void;
  /** The pointer is over `point` on the floor: where the thing would land, if anywhere. */
  over: (point: { x: number; z: number }) => void;
  /** Lets go: moves the thing if it may land there. */
  drop: () => void;
};

/** How near a slot's centre a dragged pallet must be to land on it, in metres. */
const SNAP = 1;

const Context = React.createContext<Value | null>(null);

/**
 * Dragging on the floor: an arm to another hex, a pallet to another slot.
 * The scene shows where it would land and whether it may, and the hub
 * moves it on release. Turning the view is off while something is held.
 */
const DragProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { add, move, placeable, relocate, standable, stations } = useHub();
  const [dragging, setDragging] = useState<Dragging | null>(null);
  // What is held, as of now: read on drop, where the state may be a render behind.
  const held = useRef<Dragging | null>(null);

  const hold = useCallback((next: Dragging | null) => {
    held.current = next;
    setDragging(next);
  }, []);

  const grab = useCallback<Value['grab']>(
    (kind, id, fresh = false) =>
      hold(
        kind === 'arm'
          ? { kind, id, fresh, hex: { q: 0, r: 0 }, allowed: false }
          : {
              kind,
              id,
              fresh,
              at: { parent: { q: 0, r: 0 }, slot: 0 },
              allowed: false,
            }
      ),
    [hold]
  );

  const over = useCallback<Value['over']>(
    (point) => {
      const current = held.current;

      if (!current) {
        return;
      }

      if (current.kind === 'arm') {
        const hex = cellAt(point);

        if (index(hex) !== index(current.hex)) {
          hold({ ...current, hex, allowed: standable(current.id, hex) });
        }

        return;
      }

      // The nearest slot of any arm, if one is near enough.
      let nearest: { at: Child; distance: number } | null = null;

      stations.forEach(({ hex }) =>
        SIDES.forEach((slot) => {
          const at = { parent: hex, slot };
          const where = childCentre(at);
          const distance = Math.hypot(where.x - point.x, where.z - point.z);

          if (distance < SNAP && (!nearest || distance < nearest.distance)) {
            nearest = { at, distance };
          }
        })
      );

      const found: Child = nearest
        ? (nearest as { at: Child }).at
        : { parent: cellAt(point), slot: 0 };

      if (
        index(found.parent) !== index(current.at.parent) ||
        found.slot !== current.at.slot
      ) {
        hold({
          ...current,
          at: found,
          allowed: !!nearest && placeable(current.id, found),
        });
      }
    },
    [hold, placeable, stations, standable]
  );

  // Moves the thing if it may land where it is, then lets go. Outside any state update, so it runs once.
  const drop = useCallback(() => {
    const current = held.current;

    hold(null);

    if (current?.allowed) {
      if (current.fresh) {
        add(
          current.kind === 'arm' ? { arm: current.hex } : { pallet: current.at }
        );
      } else if (current.kind === 'arm') {
        relocate(current.id, current.hex);
      } else {
        move(current.id, current.at);
      }
    }
  }, [add, hold, move, relocate]);

  // Escape puts down whatever is held, where it was.
  useEffect(() => {
    const cancel = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        hold(null);
      }
    };

    window.addEventListener('keydown', cancel);

    return () => window.removeEventListener('keydown', cancel);
  }, [hold]);

  // Let go anywhere, even off the floor, and the drag ends. Always on: a quick gesture ends before a render.
  useEffect(() => {
    window.addEventListener('pointerup', drop);

    return () => window.removeEventListener('pointerup', drop);
  }, [drop]);

  const value = useMemo(
    () => ({ dragging, grab, over, drop }),
    [dragging, grab, over, drop]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useDrag = () => {
  const value = useContext(Context);

  if (!value) {
    throw new Error('useDrag is used outside DragProvider');
  }

  return value;
};

/** Where a drag would land, on the floor. */
const landing = (dragging: Dragging) =>
  dragging.kind === 'arm' ? centre(dragging.hex) : childCentre(dragging.at);

export { DragProvider, landing, useDrag };
export type { Dragging };
