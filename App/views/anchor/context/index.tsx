import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
} from 'react';

const AnchorContext =
  createContext<React.RefObject<HTMLHeadingElement | null> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const anchor = useRef<HTMLHeadingElement>(null);

  return (
    <AnchorContext.Provider value={anchor}>{children}</AnchorContext.Provider>
  );
};

const useAnchor = () => {
  return useContext(AnchorContext);
};

export { Provider, useAnchor };
