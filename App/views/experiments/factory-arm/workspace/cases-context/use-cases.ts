import { useCallback, useMemo, useRef, useState } from 'react';

// Physics
import type { RapierRigidBody } from '@react-three/rapier';

// Context
import { useAppliedContext } from '@/views/experiments/factory-arm/applied-context';

// Stack
import { stack } from '@/views/experiments/factory-arm/engine/stack';

// Spec
import type { Box } from '@/views/experiments/factory-arm/engine/box';

type Body = { body: RapierRigidBody; box: Box };

/** The cases the arm moves, built from the applied setup, and their bodies. */
const useCases = () => {
  const { applied } = useAppliedContext();
  const bodies = useRef(new Map<string, Body>());
  const [boxes, setBoxes] = useState(() => stack(applied.pile, applied.stacks));

  const remove = useCallback((id: string) => {
    setBoxes((current) => current.filter((box) => box.id !== id));
  }, []);

  const write = useMemo(
    () => ({
      /** Registers a case's body, and returns what unregisters it. */
      track: (id: string, entry: Body) => {
        bodies.current.set(id, entry);

        return () => {
          bodies.current.delete(id);
        };
      },
    }),
    []
  );

  return useMemo(
    () => ({ bodies, boxes, remove, write }),
    [boxes, remove, write]
  );
};

export { useCases };
