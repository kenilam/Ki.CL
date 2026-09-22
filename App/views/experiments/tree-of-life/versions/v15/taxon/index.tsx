import React, { useMemo } from 'react';

// Context
import { useTreeOfLifeContext } from '@/views/experiments/tree-of-life/context';

// Growing
import { Growing } from './growing';

// Spec
import * as Spec from './spec';

/**
 * One taxon: the branch that reaches it, and the body at that branch's tip.
 *
 * Identified by `nodeId` alone - the taxon itself is looked up from the
 * context, so a caller never carries node data around and a taxon can never
 * be drawn from a stale copy of it. Everything else it needs is derived from
 * that id: where its tip lands, the colour it settles on, the silhouette of
 * its body. Ancestors and descendants are somebody else's problem; this draws
 * one segment.
 *
 * Timing is a spring, not a hand-run clock. `play` is the only control: the
 * spring settles out to the tip on `enter` and back into `start` on `exit`,
 * holds untouched while it is undefined, and `onRest` reports arrival or
 * departure. Nothing here counts milliseconds or predicts when a neighbour
 * will be finished.
 */

const Taxon: React.FunctionComponent<Spec.Props> = (props) => {
  const { find } = useTreeOfLifeContext();

  const taxon = useMemo(() => find(props.nodeId), [find, props.nodeId]);

  // The subtree in hand does not reach this node - nothing to draw yet.
  if (!taxon) {
    return null;
  }

  return <Growing {...props} taxon={taxon} />;
};

export { Taxon };
