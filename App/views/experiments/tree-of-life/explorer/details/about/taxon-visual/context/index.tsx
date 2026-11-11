import React, { PropsWithChildren, createContext, useContext } from 'react';

// Hooks
import { useTaxonVisual } from '@/views/experiments/tree-of-life/explorer/details/about/taxon-visual/use-taxon-visual';

const TaxonVisualContext = createContext<ReturnType<
  typeof useTaxonVisual
> | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const taxonVisual = useTaxonVisual();

  return (
    <TaxonVisualContext.Provider value={taxonVisual}>
      {children}
    </TaxonVisualContext.Provider>
  );
};

const useTaxonVisualContext = () => {
  const taxonVisual = useContext(TaxonVisualContext);

  if (!taxonVisual) {
    throw new Error('useTaxonVisualContext needs a TaxonVisual above it.');
  }

  return taxonVisual;
};

export { Provider, useTaxonVisualContext };
