import React, { PropsWithChildren, createContext, useContext } from 'react';

// Hooks
import { useValue } from './use-value';

const MakerContext = createContext<ReturnType<typeof useValue> | null>(null);

// The forms and the footer's button are in different parts of the sheet, so the picked color, the request and the swatch being made are kept here.
const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const value = useValue();

  return (
    <MakerContext.Provider value={value}>{children}</MakerContext.Provider>
  );
};

const useMaker = () => {
  const value = useContext(MakerContext);

  if (!value) {
    throw new Error('useMaker needs a Maker context above it.');
  }

  return value;
};

export { Provider, useMaker };
export type { Mode, PickValues } from './use-value';
