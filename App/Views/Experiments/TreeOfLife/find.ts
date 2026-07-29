import { getKiclClient, gql } from 'api/provider';

import type { TaxonNode } from './Spec';

/**
 * Read one node out of the cache.
 *
 * Not out of `data`: a single `TreeOfLifeSubtree` nests only as deep as
 * codegen fixed it, so anything further along a lineage than that simply is
 * not in the response — and a consumer asking for it would be told the node
 * does not exist, when in fact it is sitting in the cache from an earlier
 * fetch. The normalised store has no such horizon, and it accumulates, so
 * reading through it is both wider and always current.
 *
 * The selection is deliberately shallow — the edges are ids, not nested
 * nodes. Callers walk by asking again, which keeps every read O(1) instead of
 * dragging a subtree along with it.
 */
const NODE = gql`
  fragment TreeOfLifeNodeShape on TreeOfLifeNode {
    nodeId
    name
    rank
    numTips
    ancestor {
      nodeId
    }
    descendants {
      nodeId
    }
  }
`;

export default function find(nodeId: string): TaxonNode | null {
  if (!nodeId) {
    return null;
  }

  const { cache } = getKiclClient();

  return cache.readFragment<TaxonNode>({
    id: cache.identify({ __typename: 'TreeOfLifeNode', nodeId }),
    fragment: NODE,
    // A node can be known without every field having been fetched — most
    // often `descendants`, on a node reached as somebody's ancestor. That is
    // missing data, not an absent node.
    returnPartialData: true,
  });
}
