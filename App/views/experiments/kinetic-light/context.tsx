import React, { PropsWithChildren, useContext } from 'react';

// Hooks
import type { useSongs } from './songs/use-songs';
import type { useGenerate } from './use-generate';

type Value = ReturnType<typeof useSongs> & {
  generate: ReturnType<typeof useGenerate>;
};

const Context = React.createContext<Value | null>(null);

const KineticLightProvider: React.FunctionComponent<
  PropsWithChildren<Value>
> = ({ children, examples, generate, songs }) => (
  <Context.Provider value={{ examples, generate, songs }}>
    {children}
  </Context.Provider>
);

const useKineticLightContext = (): Value => {
  const value = useContext(Context);

  if (!value) {
    throw new Error(
      'useKineticLightContext needs a KineticLightProvider above it.'
    );
  }

  return value;
};

export { KineticLightProvider, useKineticLightContext };
