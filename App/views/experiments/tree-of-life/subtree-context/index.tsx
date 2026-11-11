import React, { PropsWithChildren, createContext, useContext } from 'react';

// Hooks
import { useSubtree } from './use-subtree';

const SubtreeContext = createContext<ReturnType<typeof useSubtree> | null>(
  null
);

/**
 * Mounted by the `tree-of-life` route itself, so it sits above every node
 * route: navigating from one node to another changes the value but does not
 * remount the provider, and the Apollo cache it reads through outlives the
 * move.
 */
const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const subtree = useSubtree();

  return (
    <SubtreeContext.Provider value={subtree}>
      {children}
    </SubtreeContext.Provider>
  );
};

const useSubtreeContext = () => {
  const subtree = useContext(SubtreeContext);

  if (!subtree) {
    throw new Error(
      'useSubtreeContext needs the tree of life route around it.'
    );
  }

  return subtree;
};

export { Provider, useSubtreeContext };
