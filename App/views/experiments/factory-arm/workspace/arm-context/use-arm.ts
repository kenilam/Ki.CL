import { useMemo, useRef } from 'react';

// Kinematics
import {
  HOME,
  forward,
  type Joints,
  type Point,
} from '@/views/experiments/factory-arm/engine/kinematics';

/** `facing` is the heading to turn the pad to; without it the pad sits straight. */
type Command = { target: Point; grip: number; facing?: number };

/**
 * The arm. `command` is where the pad should go and whether to hold;
 * `joints` is where the arm actually is, which the twin will read. They
 * change every frame, so they are refs read in the render loop, written only
 * through `write`: the React Compiler can't tell a ref from context is a
 * ref, so it rejects assigning to one there.
 */
const useArm = () => {
  const command = useRef<Command>({ target: forward(HOME), grip: 0 });
  const joints = useRef<Joints>(HOME);
  const working = useRef<(() => boolean) | null>(null);

  const write = useMemo(
    () => ({
      command: (next: Command) => {
        command.current = next;
      },
      joints: (next: Joints) => {
        joints.current = next;
      },
      /** Tells whether the arm is working, for an engine that keeps its own jobs. */
      busy: (check: (() => boolean) | null) => {
        working.current = check;
      },
    }),
    []
  );

  return useMemo(() => ({ command, joints, working, write }), [write]);
};

export { useArm };
