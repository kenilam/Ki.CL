import React, { PropsWithChildren, createContext, useContext } from 'react';

// Utilities
import type { Coordinates } from '@/views/experiments/daylight/sun';

type Value = {
  /** Index into `places` of the one picked, or -1. */
  active: number;
  /** Where the globe is asked to face. A new object turns it there. */
  centre: Coordinates;
  date: Date;
  /** On a tall page, how far below the middle the drawing sits. The page's own by default. */
  drop?: number;
  /** Told where the globe faces, each time it is drawn. */
  onFace?(facing: Coordinates): void;
  /** Told which place was clicked, by its index. */
  onPick?(place: number): void;
  /** Told where the globe was left facing when a drag ends. Answers with where it should settle. */
  onDrop?(facing: Coordinates): Coordinates | void;
  places: readonly Coordinates[];
};

const OrbContext = createContext<Value | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren<Value>> = ({
  active,
  centre,
  children,
  date,
  drop,
  onDrop,
  onFace,
  onPick,
  places,
}) => {
  return (
    <OrbContext.Provider
      value={{ active, centre, date, drop, onDrop, onFace, onPick, places }}
    >
      {children}
    </OrbContext.Provider>
  );
};

const useOrbContext = () => {
  const value = useContext(OrbContext);

  if (!value) {
    throw new Error('useOrbContext needs an Orb context above it.');
  }

  return value;
};

export { Provider, useOrbContext };
