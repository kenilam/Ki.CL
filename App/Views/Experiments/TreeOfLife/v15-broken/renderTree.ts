import { labelWithRank, type TreeNode } from '../tree';

import type { LocalGroup, SpineNode, UniverseNode } from './graphStore';
import { recede } from './palette';
import { branchRadiusForDepth, type Vec3 } from './positioning';

/**
 * The rendered set expressed as an actual tree, rooted at the outermost
 * ancestor on screen and growing outward to the focus and its children.
 *
 * Rooting it this way means a render-parent is always the taxonomic parent,
 * so every branch runs parent → child and grows from the parent end. The
 * previous flat-list model had to carry a `growFrom` flag and reason about
 * which end of an edge was "nearer the focus"; that ambiguity is gone.
 */

export type NodeRole = 'current' | 'parent' | 'child' | 'ancestor';

export type Edge = {
  from: Vec3;
  fromColor: string;
  fromRadius: number;
  toColor: string;
  toRadius: number;
  /** Stable per-edge seed — always the child's nodeId. */
  seed: string;
};

export type RenderNode = {
  key: string;
  node: TreeNode;
  position: Vec3;
  depth: number;
  color: string;
  role: NodeRole;
  recedeAmount: number;
  sizeFactor: number;
  label: string | null;
  navigable: boolean;
  /** Branch from the render parent. `null` only at the render root. */
  edge: Edge | null;
  children: RenderNode[];
};

/** Above this many children, per-node labels overlap into clutter. */
const LABEL_CHILD_LIMIT = 8;
/** Siblings that fit before they merge into a solid mass. */
const COMFORTABLE_SIBLINGS = 10;
/** The furthest ancestor must stay visible, so never recede fully. */
const MAX_SPINE_RECEDE = 0.72;
/** Only the nearest few ancestors are worth labelling. */
const SPINE_LABEL_LIMIT = 2;

function crowdingFactor(count: number): number {
  if (count <= COMFORTABLE_SIBLINGS) {
    return 1;
  }
  return Math.max(0.3, Math.sqrt(COMFORTABLE_SIBLINGS / count));
}

function makeEdge(
  parent: UniverseNode,
  child: UniverseNode,
  recedeAmount: number
): Edge {
  return {
    from: parent.position,
    fromColor: recede(parent.color, recedeAmount),
    fromRadius: branchRadiusForDepth(parent.depth, parent.node.numTips),
    toColor: recede(child.color, recedeAmount),
    toRadius: branchRadiusForDepth(child.depth, child.node.numTips),
    seed: child.node.nodeId,
  };
}

function leaf(
  entry: UniverseNode,
  role: NodeRole,
  parent: UniverseNode,
  recedeAmount: number,
  sizeFactor: number,
  label: string | null
): RenderNode {
  return {
    key: entry.node.nodeId,
    node: entry.node,
    position: entry.position,
    depth: entry.depth,
    color: entry.color,
    role,
    recedeAmount,
    sizeFactor,
    label,
    navigable: true,
    edge: makeEdge(parent, entry, recedeAmount),
    children: [],
  };
}

/**
 * Build the render tree for a focused group. Returns the outermost ancestor
 * (or the focus itself when nothing is rendered inward of it).
 */
export function buildRenderTree(group: LocalGroup): RenderNode {
  const current = group.current;
  const childSize = crowdingFactor(group.children.length);
  const showChildLabels = group.children.length <= LABEL_CHILD_LIMIT;

  // The focus, with its direct descendants hanging off it.
  const focus: RenderNode = {
    key: current.node.nodeId,
    node: current.node,
    position: current.position,
    depth: current.depth,
    color: current.color,
    role: 'current',
    recedeAmount: 0,
    sizeFactor: 1,
    label: labelWithRank(current.node, current.depth === 0),
    navigable: false,
    edge: null,
    children: group.children.map(({ node }) =>
      leaf(
        node,
        'child',
        current,
        0,
        childSize,
        showChildLabels ? labelWithRank(node.node) : null
      )
    ),
  };

  // [parent, grandparent, … root] → walk outward-in so each becomes the
  // render parent of the one before it.
  const spine: SpineNode[] = group.parent
    ? [group.parent, ...group.ancestors]
    : [];

  let inner: RenderNode = focus;
  let innerEntry: UniverseNode = current;

  spine.forEach((entry, index) => {
    const recedeAmount =
      index === 0
        ? 0
        : MAX_SPINE_RECEDE * (index / Math.max(4, group.ancestors.length));

    const contextRecede = Math.min(MAX_SPINE_RECEDE, recedeAmount + 0.15);

    const node: RenderNode = {
      key: entry.node.node.nodeId,
      node: entry.node.node,
      position: entry.node.position,
      depth: entry.node.depth,
      color: entry.node.color,
      role: index === 0 ? 'parent' : 'ancestor',
      recedeAmount,
      sizeFactor: 1,
      label:
        index === 0 || index <= SPINE_LABEL_LIMIT || entry.node.depth === 0
          ? labelWithRank(entry.node.node, entry.node.depth === 0)
          : null,
      navigable: true,
      edge: null,
      children: [
        // The lineage continues through the node we just built…
        { ...inner, edge: makeEdge(entry.node, innerEntry, recedeAmount) },
        // …alongside a sample of this ancestor's other descendants.
        ...entry.context.map((sibling) =>
          leaf(sibling, 'ancestor', entry.node, contextRecede, 0.85, null)
        ),
      ],
    };

    inner = node;
    innerEntry = entry.node;
  });

  return inner;
}

/** Every key in a tree, for diffing one render against the next. */
export function collectKeys(
  tree: RenderNode,
  into = new Set<string>()
): Set<string> {
  into.add(tree.key);
  tree.children.forEach((child) => collectKeys(child, into));
  return into;
}

/**
 * The parts of `tree` that are absent from `keep`, as a forest of maximal
 * subtrees. Each fragment's own edge still points at a surviving node, so a
 * departing branch always retracts into something that stays on screen.
 */
export function pruneToDeparting(
  tree: RenderNode,
  keep: Set<string>
): RenderNode[] {
  if (!keep.has(tree.key)) {
    return [tree];
  }
  return tree.children.flatMap((child) => pruneToDeparting(child, keep));
}

/** Total nodes in a tree — used to size the exit barrier. */
export function countNodes(tree: RenderNode): number {
  return 1 + tree.children.reduce((sum, child) => sum + countNodes(child), 0);
}
