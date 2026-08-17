import { getKiclClient, gql } from 'api/provider';

/**
 * Walk a node's lineage rootward, through the cache rather than through one
 * response.
 *
 * A single `TreeOfLifeSubtree` nests `ancestor` only as deep as codegen fixed
 * it (twelve levels), so reading the chain off `data` stops wherever the query
 * stopped - which for a deep lineage is nowhere near the root. The normalised
 * cache has no such limit: it accumulates `ancestor` links from every response
 * ever written, so walking it can pass straight through the seam where one
 * response ended and another began.
 */

const LINEAGE = gql`
  fragment TreeOfLifeNodeLineage on TreeOfLifeNode {
    nodeId
    ancestor {
      nodeId
    }
  }
`;

type Lineage = {
  nodeId: string;
  ancestor?: { nodeId: string } | null;
};

export type Chain = {
  /** `[nodeId, ancestor, …]`, as far rootward as the cache can currently reach. */
  ids: string[];
  /**
   * Whether the walk ended at the origin of life or merely ran out of cache.
   *
   * The difference is in the payload and worth keeping: the root carries
   * `ancestor: null` explicitly, while a node whose lineage simply has not
   * been fetched has no `ancestor` field at all. Collapsing the two would let
   * a truncated chain pass for a complete one.
   */
  complete: boolean;
};

export default function chain(nodeId: string | null | undefined): Chain {
  if (!nodeId) {
    return { ids: [], complete: false };
  }

  const { cache } = getKiclClient();
  const ids: string[] = [];
  const seen = new Set<string>();

  let current: string | undefined = nodeId;

  while (current && !seen.has(current)) {
    seen.add(current);
    ids.push(current);

    const node: Lineage | null = cache.readFragment<Lineage>({
      id: cache.identify({ __typename: 'TreeOfLifeNode', nodeId: current }),
      fragment: LINEAGE,
      returnPartialData: true,
    });

    if (!node || node.ancestor === undefined) {
      // Nothing cached about what sits above this node - not the root, just
      // the end of what has been loaded.
      return { ids, complete: false };
    }

    if (node.ancestor === null) {
      return { ids, complete: true };
    }

    current = node.ancestor.nodeId;
  }

  return { ids, complete: false };
}
