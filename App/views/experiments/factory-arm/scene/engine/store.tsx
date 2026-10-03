import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Engine
import {
  conduct,
  type Conductor,
} from '@/views/experiments/factory-arm/engine/conductor';
import { later } from '@/views/experiments/factory-arm/engine/planners';
import { world } from '@/views/experiments/factory-arm/engine/world';

const Context = React.createContext<{ conductor: Conductor } | null>(null);

/**
 * The engine for one run: the conductor, which keeps the cell as it
 * plans with it and the job the arm works through. Its plans are made in
 * two workers, off the page's thread: one for the plans the arm waits on,
 * one for trying refused cases again, so a slow refusal holds up neither
 * the frames nor the arm.
 */
const EngineProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { boxes, known, obstacles, write: cell } = useFactoryArmContext();

  const [planners] = useState(() => ({ arm: later(), background: later() }));
  const [conductor] = useState(() =>
    conduct({
      // It knows the obstacles the overhead camera sees; the sensors find the rest.
      world: world(
        boxes,
        obstacles.current.filter(({ id }) => known.current.has(id))
      ),
      planners,
      // Turned a quarter as it rests when its width lies along z, as it's drawn.
      resting: (own) => {
        const made = boxes.find(({ id }) => id === own.id);

        return made && Math.abs(own.size[0] - made.size[0]) > 1e-6
          ? Math.PI / 2
          : 0;
      },
    })
  );

  useEffect(
    () => () => {
      planners.arm.stop();
      planners.background.stop();
    },
    [planners]
  );

  // The panel asks before starting over while the arm works.
  useEffect(() => {
    cell.busy(conductor.busy);

    return () => cell.busy(null);
  }, [cell, conductor]);

  const value = useMemo(() => ({ conductor }), [conductor]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useEngine = () => {
  const value = useContext(Context);

  if (!value) {
    throw new Error('useEngine is used outside EngineProvider');
  }

  return value;
};

export { EngineProvider, useEngine };
