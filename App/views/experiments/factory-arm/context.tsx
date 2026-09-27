import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

// Physics
import type { RapierRigidBody } from '@react-three/rapier';

// Kinematics
import { HOME, forward, type Joints, type Point } from './scene/arm/kinematics';

// Stack
import { stack } from './scene/pallet/stack';

// Spec
import type { Box } from './scene/boxes/spec';
import type { Solid } from './scene/obstacles/spec';

// Obstacles
import { OBSTACLES } from './scene/obstacles/constants';
import { vision } from './scene/sensors/vision';

// Constants
import { SEED } from './scene/constants';

/**
 * `command` is where the pad should go and whether to hold; `joints` is where
 * the arm actually is, which the twin will read. `queue` holds the moves the
 * operator's clicks asked for, in order; the one running stays at its head.
 *
 * `obstacles` are where the obstacles stand now; the operator can move them.
 * `known` holds the ones the overhead camera sees and the sensors have
 * found, and `found` counts each time that changes, so the arm knows to check its way again.
 * `parked` holds the clicked cases whose moves were given up on, for the arm
 * to try again once the cell changes. `seeing` holds
 * the sensors with something in view right now, and `obstructing` when each
 * obstacle, or case, last stood in the way of a move. `struck` is a case the
 * carried case has just hit, for the arm to stop and plan again.
 *
 * These change every frame or every click, so they are refs read in the render
 * loop rather than state. `stopped` and `skipped` are state: the page shows them.
 *
 * The refs are written only through `write`, whose functions are made here
 * beside them. Components read the refs; the React Compiler can't tell a ref
 * from context is a ref, so it rejects assigning to one there.
 */

/** `facing` is the heading to turn the pad to; without it the pad sits straight. */
type Command = { target: Point; grip: number; facing?: number };

/**
 * A case to move, and where to: the belt, or the buffer pallet out of the
 * way. `chain` is the case whose click asked for it, so the moves one click
 * asked for can be called off together.
 */
type Job = { id: string; to: 'belt' | 'buffer'; chain: string };

/** The case on the pad, and the offset and turn it was picked up with. */
type Held = { id: string; offset: Point; yaw: number };

type Body = { body: RapierRigidBody; box: Box };

type Write = {
  command: (next: Command) => void;
  held: (next: Held | null) => void;
  joints: (next: Joints) => void;
  /** Adds obstacles to what's known; `found` goes up once if any are new. */
  learn: (ids: string[]) => void;
  /**
   * Moves an obstacle by `by`. The arm is told where it now stands, and
   * checks its way again, so it never moves into one the operator placed.
   */
  move: (id: string, by: Point) => void;
  /** Holds a clicked case given up on, to try again once the cell changes. */
  park: (chain: string) => void;
  unpark: (chain: string) => void;
  /** Marks obstacles as in the way of a move, as of now. */
  obstruct: (ids: string[]) => void;
  /** Records a case the carried case struck, or clears the record. */
  strike: (id: string | null) => void;
  seeing: (next: Set<string>) => void;
  /** Registers a case's body, and returns what unregisters it. */
  track: (id: string, entry: Body) => () => void;
};

type Value = {
  alarm: () => void;
  /** Clears the stop, once the arm has a way on again. */
  calm: () => void;
  write: Write;
  /** Shows the notice that a case has no clear path, over that case. */
  skip: (id: string) => void;
  /** The case the notice is about while it shows. */
  skipped: string | null;
  found: React.RefObject<number>;
  known: React.RefObject<Set<string>>;
  /** The operator's last move of an obstacle: which, which way, and when. */
  moving: React.RefObject<{ id: string; by: Point; at: number } | null>;
  parked: React.RefObject<Set<string>>;
  obstacles: React.RefObject<Solid[]>;
  /** The obstacle the arrow keys move, if any. */
  selected: string | null;
  select: (id: string | null) => void;
  obstructing: React.RefObject<Map<string, number>>;
  struck: React.RefObject<string | null>;
  seeing: React.RefObject<Set<string>>;
  stopped: boolean;
  bodies: React.RefObject<Map<string, Body>>;
  boxes: Box[];
  command: React.RefObject<Command>;
  held: React.RefObject<Held | null>;
  joints: React.RefObject<Joints>;
  queue: React.RefObject<Job[]>;
  remove: (id: string) => void;
};

/** How long the notice for a case given up stays up, in milliseconds. */
const NOTICE = 4000;

const Context = React.createContext<Value | null>(null);

const FactoryArmProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const bodies = useRef(new Map<string, Body>());
  const command = useRef<Command>({ target: forward(HOME), grip: 0 });
  const held = useRef<Held | null>(null);
  const joints = useRef<Joints>(HOME);
  const queue = useRef<Job[]>([]);
  const found = useRef(0);
  const obstacles = useRef(OBSTACLES);
  const moving = useRef<{ id: string; by: Point; at: number } | null>(null);
  const parked = useRef(new Set<string>());
  // What the overhead camera sees is known before the arm moves.
  const known = useRef(new Set(vision(OBSTACLES)));
  const obstructing = useRef(new Map<string, number>());
  const struck = useRef<string | null>(null);
  const seeing = useRef(new Set<string>());

  const [selected, select] = useState<string | null>(null);

  const [stopped, setStopped] = useState(false);
  const alarm = useCallback(() => setStopped(true), []);
  const calm = useCallback(() => setStopped(false), []);

  // A case given up shows a notice for a few seconds, then it clears.
  const [skipped, setSkipped] = useState<string | null>(null);
  const clear = useRef<ReturnType<typeof setTimeout>>(undefined);
  const skip = useCallback((id: string) => {
    setSkipped(id);
    clearTimeout(clear.current);
    clear.current = setTimeout(() => setSkipped(null), NOTICE);
  }, []);

  const write = useMemo<Write>(
    () => ({
      command: (next) => {
        command.current = next;
      },
      held: (next) => {
        held.current = next;
      },
      joints: (next) => {
        joints.current = next;
      },
      learn: (ids) => {
        const fresh = ids.filter((id) => !known.current.has(id));

        fresh.forEach((id) => known.current.add(id));

        if (fresh.length) {
          found.current += 1;
        }
      },
      move: (id, by) => {
        const shift = ({ x, y, z }: Point) => ({
          x: x + by.x,
          y: y + by.y,
          z: z + by.z,
        });

        obstacles.current = obstacles.current.map((solid) =>
          solid.id === id
            ? { id, min: shift(solid.min), max: shift(solid.max) }
            : solid
        );

        // The operator placed it, so the arm knows where it now stands.
        known.current.add(id);
        found.current += 1;
        moving.current = { id, by, at: performance.now() };
      },
      park: (chain) => {
        parked.current.add(chain);
      },
      unpark: (chain) => {
        parked.current.delete(chain);
      },
      obstruct: (ids) => {
        ids.forEach((id) => obstructing.current.set(id, performance.now()));
      },
      strike: (id) => {
        struck.current = id;

        if (id) {
          obstructing.current.set(id, performance.now());
        }
      },
      seeing: (next) => {
        seeing.current = next;
      },
      track: (id, entry) => {
        bodies.current.set(id, entry);

        return () => {
          bodies.current.delete(id);
        };
      },
    }),
    []
  );

  const [boxes, setBoxes] = useState(() => stack(SEED));

  const remove = useCallback(
    (id: string) =>
      setBoxes((current) => current.filter((box) => box.id !== id)),
    []
  );

  const value = useMemo(
    () => ({
      alarm,
      bodies,
      calm,
      boxes,
      command,
      found,
      held,
      joints,
      known,
      moving,
      obstacles,
      parked,
      obstructing,
      queue,
      remove,
      seeing,
      select,
      selected,
      skip,
      skipped,
      stopped,
      struck,
      write,
    }),
    [alarm, boxes, calm, remove, selected, skip, skipped, stopped, write]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useFactoryArmContext = () => {
  const value = useContext(Context);

  if (!value) {
    throw new Error('useFactoryArmContext is used outside FactoryArmProvider');
  }

  return value;
};

export { FactoryArmProvider, useFactoryArmContext };
export type { Command, Held, Job };
