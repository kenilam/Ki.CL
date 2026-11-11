import React, { PropsWithChildren, createContext, useContext } from 'react';

// Hooks
import { useTaxon } from './use-taxon';

// Constants
import { ROOT } from '@/views/experiments/tree-of-life/explorer/scene/taxon/constants';

// Spec
import type * as Spec from '@/views/experiments/tree-of-life/explorer/scene/taxon/spec';

type Props = PropsWithChildren<Pick<Spec.Taxon, 'nodeId'>>;

const TaxonContext = createContext<ReturnType<typeof useTaxon> | null>(null);

const Provider: React.FunctionComponent<Props> = ({ children, nodeId }) => {
  const parent = useContext(TaxonContext);
  const taxon = useTaxon(nodeId, parent ? parent.offer : ROOT);

  return (
    <TaxonContext.Provider value={taxon}>{children}</TaxonContext.Provider>
  );
};

const useTaxonContext = () => {
  const taxon = useContext(TaxonContext);

  if (!taxon) {
    throw new Error('useTaxonContext needs a Taxon around it.');
  }

  return taxon;
};

export { Provider, useTaxonContext };
