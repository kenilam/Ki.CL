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

// Constants
import { SEED } from './scene/constants';

/**
 * `command` is where the pad should go and whether to hold; `joints` is where
 * the arm actually is, which the twin will read. `queue` holds the moves the
 * operator's clicks asked for, in order; the one running stays at its head.
 *
 * `known` holds the obstacles the sensors have found, and `found` counts each
 * time that grows, so the arm knows to check its way again. `seeing` holds
 * the sensors with something in view right now.
 *
 * These change every frame or every click, so they are refs read in the render
 * loop rather than state. `stopped` and `skipped` are state: the page shows them.
 */
/** `facing` is the heading to turn the pad to; without it the pad sits straight. */
type Command = { target: Point; grip: number; facing?: number };

/** A case to move, and where to: the belt, or the buffer pallet to wait. */
type Job = { id: string; to: 'belt' | 'buffer' };

/** The case on the pad, and the offset and turn it was picked up with. */
type Held = { id: string; offset: Point; yaw: number };

type Value = {
  alarm: () => void;
  skip: () => void;
  skipped: boolean;
  found: React.RefObject<number>;
  known: React.RefObject<Set<string>>;
  seeing: React.RefObject<Set<string>>;
  stopped: boolean;
  bodies: React.RefObject<Map<string, { body: RapierRigidBody; box: Box }>>;
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
  const bodies = useRef(new Map());
  const command = useRef<Command>({ target: forward(HOME), grip: 0 });
  const held = useRef<Held | null>(null);
  const joints = useRef<Joints>(HOME);
  const queue = useRef<Job[]>([]);
  const found = useRef(0);
  const known = useRef(new Set<string>());
  const seeing = useRef(new Set<string>());

  const [stopped, setStopped] = useState(false);
  const alarm = useCallback(() => setStopped(true), []);

  // A case given up shows a notice for a few seconds, then it clears.
  const [skipped, setSkipped] = useState(false);
  const clear = useRef<ReturnType<typeof setTimeout>>(undefined);
  const skip = useCallback(() => {
    setSkipped(true);
    clearTimeout(clear.current);
    clear.current = setTimeout(() => setSkipped(false), NOTICE);
  }, []);

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
      boxes,
      command,
      found,
      held,
      joints,
      known,
      queue,
      remove,
      seeing,
      skip,
      skipped,
      stopped,
    }),
    [alarm, boxes, remove, skip, skipped, stopped]
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
