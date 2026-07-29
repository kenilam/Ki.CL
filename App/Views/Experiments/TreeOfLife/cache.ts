import { getKiclClient, gql } from 'api/provider';
import type { Kicl_TreeOfLifeSubtreesLazyQueryHookResult } from 'api/provider';

const TYPENAME = 'TreeOfLifeNode';

/** Same arguments the lazy query is executed with. */
export type SubtreesProps = Parameters<
  Kicl_TreeOfLifeSubtreesLazyQueryHookResult[0]
>;

/**
 * Just the edges. Read against the normalised store this resolves to whatever
 * the cache already knows, whichever query put it there.
 */
const NODE_LINKS = gql`
  fragment TreeOfLifeNodeLinks on TreeOfLifeNode {
    nodeId
    ancestor {
      nodeId
    }
    descendants {
      nodeId
    }
  }
`;

type NodeLinks = {
  nodeId: string;
  ancestor?: { nodeId: string } | null;
  descendants?: readonly { nodeId: string }[] | null;
};

type Cache = ReturnType<typeof getKiclClient>['cache'];

const identify = (cache: Cache, nodeId: string) =>
  cache.identify({ __typename: TYPENAME, nodeId });

function readLinks(cache: Cache, nodeId: string): NodeLinks | null {
  return cache.readFragment<NodeLinks>({
    id: identify(cache, nodeId),
    fragment: NODE_LINKS,
    // A node cached at the edge of a selection has no `descendants` key yet.
    // That is missing data, not absent children — without this the read would
    // return null and the walk would stop at exactly the frontier it exists
    // to extend.
    returnPartialData: true,
  });
}

/** Ensure `childNodeId` is listed under `parentNodeId`, keeping what is there. */
function link(cache: Cache, parentNodeId: string, childNodeId: string): void {
  cache.modify({
    id: identify(cache, parentNodeId),
    fields: {
      descendants(existing = [], { readField, toReference }) {
        const present = (existing as unknown[]).some(
          (ref) => readField<string>('nodeId', ref as never) === childNodeId
        );

        if (present) {
          return existing;
        }

        const ref = toReference({ __typename: TYPENAME, nodeId: childNodeId });

        return ref ? [...(existing as unknown[]), ref] : existing;
      },
    },
  });
}

/**
 * Stitch whatever a lazy `TreeOfLifeSubtrees` call just brought in into the one
 * tree the cache holds.
 *
 * Takes the arguments the fetch was made with rather than its result: the ids
 * are already known at the call site, and Apollo has by then written the
 * response into the normalised store, so the nodes can be read back from the
 * cache instead of threaded through. That also means this sees the union of
 * everything ever fetched, not just the last response.
 *
 * `TreeOfLifeNode` is normalised on `nodeId`, so a node fetched on its own is
 * already the same entity the tree references — the only thing that can be
 * missing is the link from its ancestor down to it. Following each requested
 * id up its lineage and adding that link is therefore the whole job.
 *
 * In practice this is a safeguard rather than a fixup: `descendants` resolves
 * to a complete child list server-side, and every ancestor in a response
 * carries the child on its own path, so Apollo's write already leaves the
 * links consistent. It earns its place only if a response ever delivers a
 * partial child list — measured against this API it adds nothing.
 *
 * Runs in one `cache.batch`, so however many entities it touches the cache
 * commits once and broadcasts once.
 */
export function appendSubtrees(...props: SubtreesProps): void {
  const variables = props[0]?.variables;
  const roots = [...(variables?.nodeIds ?? [])];

  if (!roots.length) {
    return;
  }

  getKiclClient().cache.batch({
    update(cache) {
      const seen = new Set<string>();

      /*
       * Rootward along the lineage only.
       *
       * Deliberately does not walk outward. Descending would read a node's
       * children out of its own `descendants` and then link them back into
       * it — already true by construction, so every one of those writes is a
       * no-op, and following each ancestor's other children turns a stitch
       * into a full traversal of everything cached so far.
       */
      roots.forEach((nodeId) => {
        let current: string | undefined = nodeId;

        while (current && !seen.has(current)) {
          seen.add(current);

          const ancestorNodeId: string | undefined = readLinks(cache, current)
            ?.ancestor?.nodeId;

          if (!ancestorNodeId) {
            return;
          }

          link(cache, ancestorNodeId, current);

          current = ancestorNodeId;
        }
      });
    },
  });
}
