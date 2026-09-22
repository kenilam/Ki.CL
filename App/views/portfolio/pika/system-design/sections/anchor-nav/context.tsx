import { createContext, useContext } from 'react';

type AnchorNavContextValue = {
  active: string;
  go: (id: string) => void;
};

const AnchorNavContext = createContext<AnchorNavContextValue>({
  active: '',
  go: () => undefined,
});

const useAnchorNav = () => useContext(AnchorNavContext);

export { AnchorNavContext, useAnchorNav };
