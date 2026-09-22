import { createContext, useContext } from 'react';

type AnchorNavContextValue = {
  active: string;
};

const AnchorNavContext = createContext<AnchorNavContextValue>({
  active: '',
});

const useAnchorNav = () => useContext(AnchorNavContext);

export { AnchorNavContext, useAnchorNav };
