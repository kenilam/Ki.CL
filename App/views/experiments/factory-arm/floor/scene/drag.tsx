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

// Protocol
import type { Box } from '@/views/experiments/factory-arm/cell/protocol';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';
import {
  box as shaped,
  middle,
  moved,
  rest,
  type Shape,
} from '@/views/experiments/factory-arm/floor/hub/obstacles';

/** What is being dragged, whether it's new to the floor, and where on the floor it would land. */
type Dragging =
  | { kind: 'arm'; id: string; fresh: boolean; hex: Hex; allowed: boolean }
  | {
      kind: 'pallet';
      id: string;
      fresh: boolean;
      at: Child;
      allowed: boolean;
    }
  | {
      kind: 'obstacle';
      id: string;
      fresh: boolean;
      box: Box;
      allowed: boolean;
    };

/** Where a click on the floor would put something: an arm on an empty hex, a pallet on a slot of an arm's. */
type Pointing = Extract<Dragging, { kind: 'arm' | 'pallet' }>;

/** An arm, a pallet or an obstacle the pointer is over. */
type Target = { kind: Dragging['kind']; id: string };

type Value = {
  dragging: Dragging | null;
  /** What a click would add where the pointer is, while nothing is held. */
  pointing: Pointing | null;
  /** Adds what the pointer is over, if it may go there. */
  tap: () => void;
  hovered: Target | null;
  hover: (target: Target | null) => void;
  /** The obstacle chosen by a click, which the arrow keys move and Delete takes off. */
  selected: string | null;
  select: (obstacle: string | null) => void;
  /** Starts dragging an arm, a pallet or an obstacle; `fresh` for one not on the floor yet, to be set down, of `shape` for an obstacle. */
  grab: (
    kind: Dragging['kind'],
    id: string,
    fresh?: boolean,
    shape?: Shape
  ) => void;
  /** The pointer is over `point` on the floor: where the thing would land, if anywhere. */
  over: (point: { x: number; z: number }) => void;
  /** Lets go: moves the thing if it may land there. */
  drop: () => void;
};

/** How near a slot's centre a dragged pallet must be to land on it, in metres. */
const SNAP = 1;

const Context = React.createContext<Value | null>(null);

/**
 * Dragging on the floor: an arm to another hex, a pallet to another slot,
 * an obstacle anywhere. The scene shows where it would land and whether it
 * may, and the hub moves it on release. Turning the view is off while
 * something is held. With nothing held, the pointer aims at where a click
 * would add an arm or a pallet, and the scene shows that too.
 */
const DragProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const {
    add,
    blockable,
    coming,
    lines,
    move,
    obstacles,
    placeable,
    relocate,
    shift,
    standable,
    stations,
  } = useHub();
  const [dragging, setDragging] = useState<Dragging | null>(null);
  const [pointing, setPointing] = useState<Pointing | null>(null);
  const [hovered, setHovered] = useState<Target | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  // What is held, as of now: read on drop, where the state may be a render behind.
  const held = useRef<Dragging | null>(null);
  // What a click would add, as of now: read on the click, where the state may be a render behind.
  const aimed = useRef<Pointing | null>(null);

  const aim = useCallback((next: Pointing | null) => {
    aimed.current = next;
    setPointing(next);
  }, []);

  const hold = useCallback((next: Dragging | null) => {
    held.current = next;
    setDragging(next);
  }, []);

  const grab = useCallback<Value['grab']>(
    (kind, id, fresh = false, shape = 'pillar') => {
      aim(null);

      if (kind === 'arm') {
        hold({ kind, id, fresh, hex: { q: 0, r: 0 }, allowed: false });
      } else if (kind === 'pallet') {
        hold({
          kind,
          id,
          fresh,
          at: { parent: { q: 0, r: 0 }, slot: 0 },
          allowed: false,
        });
      } else {
        // A new one is made of its shape; one on the floor keeps its own box.
        const box =
          obstacles.find((one) => one.id === id) ??
          shaped(id, shape, { x: 0, z: 0 });

        hold({ kind, id, fresh, box, allowed: false });
      }
    },
    [aim, hold, obstacles]
  );

  /** The nearest slot of any arm to `point`, if one is near enough. */
  const slotNear = useCallback(
    (point: { x: number; z: number }) => {
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

      return nearest ? (nearest as { at: Child }).at : null;
    },
    [stations]
  );

  const over = useCallback<Value['over']>(
    (point) => {
      const current = held.current;

      // Nothing held: an empty hex would take an arm, a slot of an arm's hex a pallet.
      if (!current) {
        const hex = cellAt(point);
        const taken = stations.some((one) => index(one.hex) === index(hex));
        const at = taken ? slotNear(point) : null;
        const next: Pointing | null = !taken
          ? {
              kind: 'arm',
              id: coming.arm,
              fresh: true,
              hex,
              allowed: standable(coming.arm, hex),
            }
          : at
            ? {
                kind: 'pallet',
                id: coming.pallet,
                fresh: true,
                at,
                allowed: placeable(coming.pallet, at),
              }
            : null;
        const was = aimed.current;
        const same =
          was?.kind === next?.kind &&
          (was?.kind === 'arm' && next?.kind === 'arm'
            ? index(was.hex) === index(next.hex)
            : was?.kind === 'pallet' &&
              next?.kind === 'pallet' &&
              index(was.at.parent) === index(next.at.parent) &&
              was.at.slot === next.at.slot);

        if (!same) {
          aim(next);
        }

        return;
      }

      if (current.kind === 'arm') {
        const hex = cellAt(point);

        if (index(hex) !== index(current.hex)) {
          hold({ ...current, hex, allowed: standable(current.id, hex) });
        }

        return;
      }

      // An obstacle goes wherever the pointer is; nothing to snap to.
      if (current.kind === 'obstacle') {
        const was = middle(current.box);

        if (Math.hypot(was.x - point.x, was.z - point.z) > 1e-3) {
          const box = rest(moved(current.box, point), lines);

          hold({ ...current, box, allowed: blockable(box) });
        }

        return;
      }

      const nearest = slotNear(point);
      const found: Child = nearest ?? { parent: cellAt(point), slot: 0 };

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
    [
      aim,
      blockable,
      coming,
      hold,
      lines,
      placeable,
      slotNear,
      stations,
      standable,
    ]
  );

  // Adds what the pointer is over. The floor is built again for it, so what was aimed at is gone.
  const tap = useCallback(() => {
    const current = aimed.current;

    aim(null);

    if (current?.allowed) {
      add(
        current.kind === 'arm' ? { arm: current.hex } : { pallet: current.at }
      );
    }
  }, [add, aim]);

  // Moves the thing if it may land where it is, then lets go. Outside any state update, so it runs once.
  const drop = useCallback(() => {
    const current = held.current;

    hold(null);

    if (current?.allowed) {
      if (current.fresh) {
        add(
          current.kind === 'arm'
            ? { arm: current.hex }
            : current.kind === 'pallet'
              ? { pallet: current.at }
              : { obstacle: current.box }
        );
      } else if (current.kind === 'arm') {
        relocate(current.id, current.hex);
      } else if (current.kind === 'pallet') {
        move(current.id, current.at);
      } else {
        shift(current.id, middle(current.box));
      }
    }
  }, [add, hold, move, relocate, shift]);

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
    () => ({
      dragging,
      drop,
      grab,
      hover: setHovered,
      hovered,
      over,
      pointing,
      select: setSelected,
      selected,
      tap,
    }),
    [dragging, drop, grab, hovered, over, pointing, selected, tap]
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
  dragging.kind === 'arm'
    ? centre(dragging.hex)
    : dragging.kind === 'pallet'
      ? childCentre(dragging.at)
      : middle(dragging.box);

export { DragProvider, landing, useDrag };
export type { Dragging, Pointing, Target };
