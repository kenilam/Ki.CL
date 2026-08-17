/**
 * Tree layout engine (layer 1)
 *
 * Pure D3-hierarchy cluster → polar positions + cubic Bezier branch specs.
 * No Three.js here - the render layer consumes this output.
 */
import { hierarchy, cluster, type HierarchyPointNode } from 'd3-hierarchy';

import type { TreeNode } from '@/Views/Experiments/TreeOfLife/tree';
import {
  colorForName,
  labelFor,
  paletteColor,
} from '@/Views/Experiments/TreeOfLife/tree';

export type Vec3 = [number, number, number];

export type LayoutNode = {
  id: string;
  node: TreeNode;
  position: Vec3;
  /** Angle in radians (0 = up) */
  angle: number;
  radius: number;
  depth: number;
  color: string;
  expandable: boolean;
  showLabel: boolean;
  fontSize: number;
  isOrigin: boolean;
  isTip: boolean;
};

export type LayoutBranch = {
  id: string;
  /** CubicBezierCurve3: start, control1, control2, end */
  start: Vec3;
  control1: Vec3;
  control2: Vec3;
  end: Vec3;
  color: string;
  startWidth: number;
  endWidth: number;
};

export type LayoutResult = {
  nodes: LayoutNode[];
  branches: LayoutBranch[];
  height: number;
  tipCount: number;
};

const MAX_CHILDREN = 14;
/** Upward fan span (radians) passed to d3.cluster as the x-extent. */
const FAN_SPAN = Math.PI * 1.12;
const OUTER_RADIUS = 15;
const HEIGHT_LIMIT_DEFAULT = 3;

function prune(node: TreeNode): TreeNode {
  if (!node.children?.length) {
    return { ...node, children: null };
  }

  const sorted = [...node.children].sort(
    (a, b) => (b.numTips ?? 0) - (a.numTips ?? 0)
  );

  return {
    ...node,
    children: sorted.slice(0, MAX_CHILDREN).map(prune),
  };
}

function polarToCart(angle: number, radius: number): Vec3 {
  // d3 cluster x is angle; map 0 → +Y (upward fan like the poster).
  return [Math.sin(angle) * radius, Math.cos(angle) * radius, 0];
}

function resolveColor(point: HierarchyPointNode<TreeNode>): string {
  let current: HierarchyPointNode<TreeNode> | null = point;
  while (current) {
    const named = colorForName(current.data.name);
    if (named) {
      return named;
    }
    current = current.parent;
  }

  let tip: HierarchyPointNode<TreeNode> | null = point;
  while (tip?.parent && tip.parent.depth > 0) {
    tip = tip.parent;
  }
  const siblings = tip?.parent?.children ?? [];
  const index = siblings.findIndex((c) => c.data.nodeId === tip?.data.nodeId);
  return paletteColor(Math.max(0, index));
}

function shouldLabel(
  point: HierarchyPointNode<TreeNode>,
  expandable: boolean
): boolean {
  if (point.depth === 0) {
    return true;
  }
  if (!labelFor(point.data)) {
    return false;
  }
  if (point.depth <= 2) {
    return true;
  }
  if ((point.data.numTips ?? 0) >= 15000 && point.depth <= 4) {
    return true;
  }
  return expandable && point.depth <= 3;
}

function branchWidths(parentTips: number, childTips: number, depth: number) {
  const start = Math.max(
    0.045,
    Math.min(0.38, Math.log10(parentTips + 10) * 0.065 - depth * 0.01)
  );
  const end = Math.max(
    0.012,
    Math.min(start * 0.48, Math.log10(childTips + 10) * 0.028)
  );
  return { startWidth: start, endWidth: end };
}

/**
 * Cubic controls for organic phylogenetic branches:
 * soft polar elbow (arc at parent radius → radial out) → smooth Bezier.
 */
function bezierControls(
  parentAngle: number,
  parentRadius: number,
  childAngle: number,
  childRadius: number
): { control1: Vec3; control2: Vec3 } {
  const angleDelta = childAngle - parentAngle;
  // Stronger bend when the angular step is large (coral-like sweeps).
  const bulge =
    Math.abs(angleDelta) * parentRadius * 0.35 +
    (childRadius - parentRadius) * 0.2;

  const midAngle = parentAngle + angleDelta * 0.55;
  const control1 = polarToCart(
    parentAngle + angleDelta * 0.25,
    parentRadius + (childRadius - parentRadius) * 0.2 + bulge * 0.4
  );
  const control2 = polarToCart(
    midAngle,
    parentRadius + (childRadius - parentRadius) * 0.65 + bulge * 0.15
  );

  return { control1, control2 };
}

/**
 * D3 cluster layout → polar coordinates → Bezier branch specs.
 *
 * @example
 * const root = d3.hierarchy(data);
 * const layout = d3.cluster().size([FAN_SPAN, OUTER_RADIUS]);
 * layout(root);
 * // node.x = angle, node.y = radius
 */
export function computeTreeLayout(data: TreeNode): LayoutResult {
  const pruned = prune(data);
  const root = hierarchy(pruned, (d) => d.children ?? undefined);

  const layout = cluster<TreeNode>()
    .size([FAN_SPAN, OUTER_RADIUS])
    .separation((a, b) => (a.parent === b.parent ? 1 : 1.15));

  const points = layout(root);

  // Center the fan on +Y (cluster uses [0, FAN_SPAN]; shift by -FAN_SPAN/2).
  const angleOffset = -FAN_SPAN / 2;

  const nodes: LayoutNode[] = [];
  const branches: LayoutBranch[] = [];

  points.each((point) => {
    const angle = point.x + angleOffset;
    const radius = point.y;
    const position = polarToCart(angle, radius);
    const tips = point.data.numTips ?? 0;
    const isTip = !point.children?.length;
    const expandable = isTip && tips > 1;
    const color = resolveColor(point);
    const isOrigin = point.depth === 0;

    nodes.push({
      id: point.data.nodeId,
      node: point.data,
      position,
      angle,
      radius,
      depth: point.depth,
      color,
      expandable,
      showLabel: shouldLabel(point, expandable),
      fontSize: isOrigin ? 0.34 : point.depth <= 2 ? 0.15 : 0.11,
      isOrigin,
      isTip,
    });

    if (!point.parent) {
      return;
    }

    const parentAngle = point.parent.x + angleOffset;
    const parentRadius = point.parent.y;
    const start = polarToCart(parentAngle, parentRadius);
    const end = position;
    const { control1, control2 } = bezierControls(
      parentAngle,
      parentRadius,
      angle,
      radius
    );
    const parentTips = point.parent.data.numTips ?? 1;
    const { startWidth, endWidth } = branchWidths(
      parentTips,
      tips,
      point.depth
    );

    branches.push({
      id: `${point.parent.data.nodeId}->${point.data.nodeId}`,
      start,
      control1,
      control2,
      end,
      color,
      startWidth,
      endWidth,
    });
  });

  return {
    nodes,
    branches,
    height: OUTER_RADIUS,
    tipCount: points.leaves().length,
  };
}

export { HEIGHT_LIMIT_DEFAULT };
