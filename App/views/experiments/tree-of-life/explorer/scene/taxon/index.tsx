import React, { useMemo } from 'react';

// Context
import { useSubtreeContext } from '@/views/experiments/tree-of-life/subtree-context';

// Partials
import { Provider } from './context';
import { Growing } from './growing';

// Spec
import type * as Spec from './spec';

type Props = Pick<Spec.Taxon, 'nodeId'>;

/**
 * One taxon: the branch that reaches it, and the body at its tip. The node is
 * looked up from the cache by id, so it is never drawn from a stale copy.
 */
const Taxon: React.FunctionComponent<Props> = ({ nodeId }) => {
  const { find } = useSubtreeContext();

  const taxon = useMemo(() => {
    return find(nodeId);
  }, [find, nodeId]);

  // The subtree in hand does not reach this node - nothing to draw yet.
  if (!taxon) {
    return null;
  }

  return (
    <Provider nodeId={nodeId}>
      <Growing />
    </Provider>
  );
};

export { Taxon };
