import React, { PropsWithChildren, createContext, useContext } from 'react';

// Hooks
import { useLineage } from './use-lineage';

// Spec
import type * as Spec from '@/views/experiments/tree-of-life/spec';

const LineageContext = createContext<Pick<
  Spec.Context,
  'chains' | 'focus' | 'rooted'
> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const lineage = useLineage();

  return (
    <LineageContext.Provider value={lineage}>
      {children}
    </LineageContext.Provider>
  );
};

const useLineageContext = () => {
  const lineage = useContext(LineageContext);

  if (!lineage) {
    throw new Error(
      'useLineageContext needs the tree of life route around it.'
    );
  }

  return lineage;
};

export { Provider, useLineageContext };
