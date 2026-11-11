import React, { PropsWithChildren, createContext, useContext } from 'react';

// Partials
import { usePresets } from './use-presets';

const PresetsContext = createContext<ReturnType<typeof usePresets> | null>(
  null
);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const presets = usePresets();

  return (
    <PresetsContext.Provider value={presets}>
      {children}
    </PresetsContext.Provider>
  );
};

const usePresetsContext = () => {
  const presets = useContext(PresetsContext);

  if (!presets) {
    throw new Error('usePresetsContext needs the presets Provider around it.');
  }

  return presets;
};

export { Provider, usePresetsContext };
