import { useCallback, useMemo, useRef, useState } from 'react';

import { useKicl_TreeOfLifeSubtreeLazyQuery } from 'api/provider';

import { labelFor, type TreeNode } from '../tree';

import { inheritColor, ROOT_COLOR } from './palette';
import {
  ORIGIN,
  positionFor,
  sortSiblings,
  type SiblingInfo,
  type Vec3,
} from './positioning';

/**
 * Persistent, session-lifetime universe of every node discovered so far —
 * a flat graph with parent pointers, superset of whatever's actually
 * rendered. Grows via a ref (not React state) so ingestion doesn't force a
 * re-render; `version` is bumped after each ingest for consumers that do
 * need to react.
 */

export type RawTreeOfLifeNode = {
  nodeId: string;
  ottId?: number | null;
  name?: string | null;
  rank?: string | null;
  numTips?: number | null;
  assetId?: string | null;
  description?: string | null;
  visualStatus?: string | null;
  visualScore?: { overall: number; taxonMatch: number; pass: boolean } | null;
  asset?: { id: string; url: string; generator?: string | null } | null;
  descendants?: readonly RawTreeOfLifeNode[] | null;
  ancestor?: RawTreeOfLifeNode | null;
};

export type UniverseNode = {
  node: TreeNode;
  parentId: string | null;
  /** `null` = children not yet fetched; `[]` = confirmed leaf/known-empty. */
  childIds: string[] | null;
  position: Vec3;
  /** Unit direction from the sphere centre; `null` for the root itself. */
  direction: Vec3 | null;
  depth: number;
  /** Inherited from the parent's colour — see palette.inheritColor. */
  color: string;
};

/** An ancestor on the spine, plus a sample of its other descendants. */
export type SpineNode = {
  node: UniverseNode;
  /**
   * A few of this ancestor's *other* children — the lineage child is drawn
   * anyway as the next link in the spine, so it is excluded here. Sampled
   * evenly across the sorted sibling set rather than taken from the front,
   * so a clade with hundreds of children still reads as a representative
   * spread instead of an arbitrary corner of it.
   */
  context: UniverseNode[];
};

export type LocalGroup = {
  currentId: string;
  current: UniverseNode;
  parent: SpineNode | null;
  children: Array<{ id: string; node: UniverseNode }>;
  /**
   * The spine inward from the grandparent to the root, each entry carrying
   * its own small sample of descendants for context.
   */
  ancestors: SpineNode[];
};

/** Descendants rendered per ancestor, counting the lineage child itself. */
const CONTEXT_PER_ANCESTOR = 4;
/**
 * How far up the spine context descendants are drawn. Deliberately matched to
 * the camera's framed-ancestor count: applying it to the whole lineage put
 * ~100 extra nodes on a deep taxon, and because deep shells crowd near the
 * sphere surface they piled into one blob that read as abandoned geometry.
 * Beyond this the spine stays a bare thread back to the root.
 */
const CONTEXT_ANCESTOR_LIMIT = 5;

/** Must match Codegen/generateOperations.ts's TREE_OF_LIFE_ANCESTOR_DEPTH. */
const ANCESTOR_CHAIN_DEPTH = 12;
/** Guard against pathological/unexpected recursion in the ancestor walk. */
const MAX_ANCESTOR_WALK_HOPS = 6;

function toFlatTreeNode(raw: RawTreeOfLifeNode): TreeNode {
  return {
    nodeId: raw.nodeId,
    ottId: raw.ottId ?? null,
    name: raw.name ?? null,
    rank: raw.rank ?? null,
    numTips: raw.numTips ?? null,
    assetId: raw.assetId ?? null,
    description: raw.description ?? null,
    visualStatus: raw.visualStatus ?? null,
    visualScore: raw.visualScore ?? null,
    asset: raw.asset ?? null,
    descendants: null,
    children: null,
  };
}

function siblingInfo(raw: RawTreeOfLifeNode): SiblingInfo {
  return {
    nodeId: raw.nodeId,
    ottId: raw.ottId ?? null,
    numTips: raw.numTips ?? null,
  };
}

function collectAncestorChain(raw: RawTreeOfLifeNode): RawTreeOfLifeNode[] {
  const chain: RawTreeOfLifeNode[] = [raw];
  let cur = raw.ancestor;
  while (cur) {
    chain.push(cur);
    cur = cur.ancestor;
  }
  return chain;
}

type Grounding =
  | {
      grounded: true;
      groundIndex: number;
      position: Vec3;
      direction: Vec3 | null;
      depth: number;
      color: string;
    }
  | { grounded: false; deepestNodeId: string };

/**
 * The topmost item in `chain` grounds the walk when either its `ancestor`
 * was genuinely absent (the true OTOL root — chain didn't need the full
 * selection depth), or it's already positioned in the universe from a prior
 * fetch. Otherwise we don't yet know where this lineage sits — the caller
 * re-queries rooted at that deepest node and tries again.
 */
function resolveGrounding(
  chain: readonly RawTreeOfLifeNode[],
  universe: Map<string, UniverseNode>
): Grounding {
  const last = chain[chain.length - 1]!;
  const hitSelectionLimit = chain.length === ANCESTOR_CHAIN_DEPTH + 1;

  if (!hitSelectionLimit) {
    // Genuine OTOL root — the sphere's centre.
    return {
      grounded: true,
      groundIndex: chain.length - 1,
      position: ORIGIN,
      direction: null,
      depth: 0,
      color: ROOT_COLOR,
    };
  }

  const known = universe.get(last.nodeId);
  if (known) {
    return {
      grounded: true,
      groundIndex: chain.length - 1,
      position: known.position,
      direction: known.direction,
      depth: known.depth,
      color: known.color,
    };
  }

  return { grounded: false, deepestNodeId: last.nodeId };
}

function upsert(
  universe: Map<string, UniverseNode>,
  raw: RawTreeOfLifeNode,
  position: Vec3,
  direction: Vec3 | null,
  depth: number,
  parentId: string | null,
  color: string
): UniverseNode {
  const existing = universe.get(raw.nodeId);
  const entry: UniverseNode = {
    node: toFlatTreeNode(raw),
    /*
     * Never downgrade a known parent to null. The topmost node of each
     * fetched chain has no parent *within that chain*, but on a multi-hop
     * walk it is also the overlap point with the chain above — re-upserting
     * it would sever the lineage there, which is why a deep node's spine
     * stopped short of the root. A node's parent never changes, so keeping
     * whichever one we already know is always correct.
     */
    parentId: parentId ?? existing?.parentId ?? null,
    childIds: existing?.childIds ?? null,
    position,
    direction,
    depth,
    color,
  };
  universe.set(raw.nodeId, entry);
  return entry;
}

/** Positions (or re-confirms) every child of `parentEntry`, then records its childIds. */
function ingestChildrenOf(
  universe: Map<string, UniverseNode>,
  parentId: string,
  parentEntry: UniverseNode,
  kidsRaw: readonly RawTreeOfLifeNode[]
): void {
  const sorted = sortSiblings(kidsRaw.map(siblingInfo));
  const byId = new Map(kidsRaw.map((k) => [k.nodeId, k] as const));

  sorted.forEach((sib) => {
    const raw = byId.get(sib.nodeId)!;
    const existing = universe.get(raw.nodeId);
    if (existing) {
      // Never recompute a stable position/colour — only refresh fields/parent.
      upsert(
        universe,
        raw,
        existing.position,
        existing.direction,
        existing.depth,
        parentId,
        existing.color
      );
      return;
    }
    const depth = parentEntry.depth + 1;
    const result = positionFor({
      nodeId: raw.nodeId,
      depth,
      parentDirection: parentEntry.direction,
      siblings: sorted,
    });
    upsert(
      universe,
      raw,
      result.position,
      result.direction,
      depth,
      parentId,
      inheritColor(parentEntry.color, raw.nodeId, depth)
    );
  });

  parentEntry.childIds = sorted.map((s) => s.nodeId);
}

function ingestGroundedChain(
  universe: Map<string, UniverseNode>,
  chain: readonly RawTreeOfLifeNode[],
  ground: Extract<Grounding, { grounded: true }>
): void {
  const groundRaw = chain[ground.groundIndex]!;
  let entry = upsert(
    universe,
    groundRaw,
    ground.position,
    ground.direction,
    ground.depth,
    ground.groundIndex + 1 < chain.length
      ? chain[ground.groundIndex + 1]!.nodeId
      : null,
    ground.color
  );

  // Walk back down the chain toward the originally-queried node, positioning
  // each level's sibling set (available from the level above's `descendants`).
  for (let i = ground.groundIndex - 1; i >= 0; i -= 1) {
    const raw = chain[i]!;
    const parentRaw = chain[i + 1]!;
    const siblingsRaw = parentRaw.descendants ?? [raw];
    ingestChildrenOf(universe, parentRaw.nodeId, entry, siblingsRaw);
    entry = universe.get(raw.nodeId)!;
  }

  // Finally, the originally-queried node's own children.
  const selfRaw = chain[0]!;
  ingestChildrenOf(universe, selfRaw.nodeId, entry, selfRaw.descendants ?? []);
}

/**
 * Pick a representative handful of an ancestor's children, excluding the one
 * the lineage continues through (already drawn as the next spine link).
 * Sampled at evenly spaced positions across the deterministically sorted
 * sibling list, so the choice is stable and spans the whole clade instead of
 * showing only its first few members.
 */
function sampleContext(
  universe: Map<string, UniverseNode>,
  ancestor: UniverseNode,
  lineageChildId: string
): UniverseNode[] {
  const siblings = (ancestor.childIds ?? []).filter(
    (id) => id !== lineageChildId
  );
  if (!siblings.length) {
    return [];
  }

  // The lineage child occupies one of the slots.
  const slots = Math.min(CONTEXT_PER_ANCESTOR - 1, siblings.length);
  const picked: UniverseNode[] = [];
  const used = new Set<string>();

  for (let i = 0; i < slots; i += 1) {
    const index = Math.min(
      siblings.length - 1,
      Math.floor(((i + 0.5) / slots) * siblings.length)
    );
    const id = siblings[index]!;
    if (used.has(id)) {
      continue;
    }
    used.add(id);
    const node = universe.get(id);
    if (node) {
      picked.push(node);
    }
  }

  return picked;
}

export type EnsureResult = { ready: true; rootId: string } | { ready: false };

export function useTreeUniverse() {
  const universeRef = useRef<Map<string, UniverseNode>>(new Map());
  const [version, setVersion] = useState(0);
  const bump = useCallback(() => setVersion((v) => v + 1), []);

  const [fetchSubtree] = useKicl_TreeOfLifeSubtreeLazyQuery({
    fetchPolicy: 'network-only',
  });

  /**
   * Ensures `nodeId` (or the default root when `null`), its parent, and its
   * direct children are all positioned in the universe. Walks the ancestor
   * chain (re-querying rooted at the deepest still-unknown ancestor) for the
   * rare case where a fresh/deep-linked node's lineage outruns the single
   * query's fixed ancestor depth.
   */
  const ensureLocalGroup = useCallback(
    async (nodeId: string | null): Promise<EnsureResult> => {
      let targetNodeId = nodeId;
      /*
       * Each hop reaches ANCESTOR_CHAIN_DEPTH levels rootward. A lineage
       * deeper than that needs several, and they only become positionable
       * once the *rootmost* one is grounded — so keep every chain and ingest
       * them root-outward afterwards. Ingesting just the grounded hop would
       * leave the node we were actually asked for absent from the universe.
       */
      const chains: RawTreeOfLifeNode[][] = [];

      for (let hop = 0; hop < MAX_ANCESTOR_WALK_HOPS; hop += 1) {
        const { data } = await fetchSubtree({
          variables: targetNodeId
            ? { nodeId: targetNodeId, heightLimit: 1 }
            : { heightLimit: 1 },
        });

        const raw = data?.TreeOfLifeSubtree as
          | RawTreeOfLifeNode
          | null
          | undefined;
        if (!raw) {
          return { ready: false };
        }

        const chain = collectAncestorChain(raw);
        chains.push(chain);

        const ground = resolveGrounding(chain, universeRef.current);
        if (!ground.grounded) {
          targetNodeId = ground.deepestNodeId;
          continue;
        }

        // Rootmost chain first, then back out toward the requested node —
        // each chain's top is grounded by the one ingested before it.
        ingestGroundedChain(universeRef.current, chain, ground);
        for (let i = chains.length - 2; i >= 0; i -= 1) {
          const pending = chains[i]!;
          const pendingGround = resolveGrounding(pending, universeRef.current);
          if (!pendingGround.grounded) {
            // Should not happen: the level above was just ingested.
            return { ready: false };
          }
          ingestGroundedChain(universeRef.current, pending, pendingGround);
        }

        bump();
        return { ready: true, rootId: chains[0]![0]!.nodeId };
      }

      return { ready: false };
    },
    [fetchSubtree, bump]
  );

  const getLocalGroup = useCallback(
    (nodeId: string): LocalGroup | null => {
      const universe = universeRef.current;
      const current = universe.get(nodeId);
      if (!current) {
        return null;
      }
      const children = (current.childIds ?? [])
        .map((id) => {
          const node = universe.get(id);
          return node ? { id, node } : null;
        })
        .filter(
          (entry): entry is { id: string; node: UniverseNode } => entry != null
        );

      // Walk parent pointers inward to the root: [parent, grandparent, … root].
      const lineage: UniverseNode[] = [];
      const seen = new Set<string>([nodeId]);
      let cursor = current.parentId
        ? (universe.get(current.parentId) ?? null)
        : null;
      while (cursor && !seen.has(cursor.node.nodeId)) {
        seen.add(cursor.node.nodeId);
        lineage.push(cursor);
        cursor = cursor.parentId
          ? (universe.get(cursor.parentId) ?? null)
          : null;
      }

      // Each spine entry carries a sample of its other children, so an
      // ancestor reads as a branching point rather than a bare waypoint.
      const spine: SpineNode[] = lineage.map((node, index) => {
        const lineageChildId =
          index === 0 ? nodeId : lineage[index - 1]!.node.nodeId;
        return {
          node,
          context:
            index < CONTEXT_ANCESTOR_LIMIT
              ? sampleContext(universe, node, lineageChildId)
              : [],
        };
      });

      return {
        currentId: nodeId,
        current,
        parent: spine[0] ?? null,
        children,
        ancestors: spine.slice(1),
      };
    },
    // `version` is the recompute trigger — ingestion mutates the ref in place.
    [version]
  );

  /**
   * Every named node discovered this session — the whole universe, not just
   * what's currently rendered, so search can reach anywhere already seen.
   */
  const namedNodes = useMemo(() => {
    const out: Array<{ id: string; label: string }> = [];
    universeRef.current.forEach((entry, id) => {
      const label = labelFor(entry.node);
      if (label) {
        out.push({ id, label });
      }
    });
    return out.sort((a, b) => a.label.localeCompare(b.label));
    // `version` is the recompute trigger — ingestion mutates the ref in place.
  }, [version]);

  /**
   * Fold freshly-generated studio fields (asset / description / status) back
   * into an already-positioned node. Never touches position or edges.
   */
  const mergeNodeFields = useCallback(
    (subtree: TreeNode) => {
      const entry = universeRef.current.get(subtree.nodeId);
      if (!entry) {
        return;
      }
      entry.node = {
        ...entry.node,
        name: subtree.name ?? entry.node.name,
        rank: subtree.rank ?? entry.node.rank,
        assetId: subtree.assetId ?? entry.node.assetId,
        asset: subtree.asset ?? entry.node.asset,
        description: subtree.description ?? entry.node.description,
        visualStatus: subtree.visualStatus ?? entry.node.visualStatus,
        visualScore: subtree.visualScore ?? entry.node.visualScore,
      };
      bump();
    },
    [bump]
  );

  return {
    ensureLocalGroup,
    getLocalGroup,
    mergeNodeFields,
    namedNodes,
    version,
  };
}
