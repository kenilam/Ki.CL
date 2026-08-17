/**
 * v10 layout - poster-style upward fan (2D)
 *
 * d3.cluster → polar fan with origin at the bottom and tips along an arc above.
 * Matches classic Tree of Life poster geometry (not a full sphere / disc).
 */
import { hierarchy, cluster, type HierarchyPointNode } from 'd3-hierarchy';

import type { TreeNode } from '@/Views/Experiments/TreeOfLife/tree';
import {
  colorForName,
  labelFor,
  paletteColor,
  ROOT_OTT_ID,
} from '@/Views/Experiments/TreeOfLife/tree';

export type Vec2 = [number, number];

export type LayoutNode = {
  id: string;
  node: TreeNode;
  position: Vec2;
  depth: number;
  color: string;
  expandable: boolean;
  showLabel: boolean;
  fontSize: number;
  isOrigin: boolean;
  isTip: boolean;
  markerRadius: number;
};

export type LayoutBranch = {
  id: string;
  start: Vec2;
  control1: Vec2;
  control2: Vec2;
  end: Vec2;
  color: string;
  strokeWidth: number;
};

export type LayoutResult = {
  nodes: LayoutNode[];
  branches: LayoutBranch[];
  /** Fan outer radius in layout units. */
  fanRadius: number;
};

export type ViewportSize = {
  width: number;
  height: number;
};

const MAX_CHILDREN = 16;
const HEIGHT_LIMIT_DEFAULT = 3;
/** Upward fan span - classic poster mushroom / coral silhouette. */
const FAN_SPAN = Math.PI * 1.05;

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

/** Angle 0 = straight up; SVG y grows downward so we negate Y. */
function polarToSvg(angle: number, radius: number): Vec2 {
  return [Math.sin(angle) * radius, -Math.cos(angle) * radius];
}

function isAbsoluteOrigin(node: TreeNode): boolean {
  return node.ottId === ROOT_OTT_ID || node.nodeId === `ott${ROOT_OTT_ID}`;
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

function bezierControls(
  parentAngle: number,
  parentRadius: number,
  childAngle: number,
  childRadius: number
): { control1: Vec2; control2: Vec2 } {
  const angleDelta = childAngle - parentAngle;
  const bulge =
    Math.abs(angleDelta) * parentRadius * 0.35 +
    (childRadius - parentRadius) * 0.2;

  const midAngle = parentAngle + angleDelta * 0.55;
  const control1 = polarToSvg(
    parentAngle + angleDelta * 0.25,
    parentRadius + (childRadius - parentRadius) * 0.2 + bulge * 0.4
  );
  const control2 = polarToSvg(
    midAngle,
    parentRadius + (childRadius - parentRadius) * 0.65 + bulge * 0.15
  );

  return { control1, control2 };
}

export function computePosterLayout(
  data: TreeNode,
  viewport: ViewportSize
): LayoutResult {
  const fanRadius = Math.max(
    220,
    Math.min(viewport.width * 0.48, viewport.height * 0.72)
  );

  const pruned = prune(data);
  const root = hierarchy(pruned, (d) => d.children ?? undefined);

  const layout = cluster<TreeNode>()
    .size([FAN_SPAN, fanRadius])
    .separation((a, b) => (a.parent === b.parent ? 1 : 1.2));

  const points = layout(root);
  const angleOffset = -FAN_SPAN / 2;
  const markerScale = Math.max(3.5, fanRadius * 0.012);

  const nodes: LayoutNode[] = [];
  const branches: LayoutBranch[] = [];

  points.each((point) => {
    const angle = point.x + angleOffset;
    const radius = point.y;
    const position = polarToSvg(angle, radius);
    const tips = point.data.numTips ?? 0;
    const isTip = !point.children?.length;
    const isOrigin = point.depth === 0 && isAbsoluteOrigin(point.data);
    const expandable =
      !isOrigin &&
      Boolean(point.data.ottId) &&
      tips > 1 &&
      (isTip || (point.children?.length ?? 0) < tips);
    const color = isOrigin ? '#1b4332' : resolveColor(point);

    nodes.push({
      id: point.data.nodeId,
      node: point.data,
      position,
      depth: point.depth,
      color,
      expandable,
      showLabel: shouldLabel(point, expandable),
      fontSize: isOrigin ? 15 : point.depth <= 2 ? 11 : 9,
      isOrigin,
      isTip,
      markerRadius: isOrigin
        ? markerScale * 3.4
        : expandable
          ? markerScale * 1.35
          : isTip
            ? markerScale * 1.05
            : markerScale * 0.45,
    });

    if (!point.parent) {
      return;
    }

    const parentAngle = point.parent.x + angleOffset;
    const parentRadius = point.parent.y;
    const start = polarToSvg(parentAngle, parentRadius);
    const { control1, control2 } = bezierControls(
      parentAngle,
      parentRadius,
      angle,
      radius
    );
    const parentTips = point.parent.data.numTips ?? 1;
    const strokeWidth = Math.max(
      0.7,
      Math.min(4.5, Math.log10(parentTips + 10) * 1.1 - point.depth * 0.15)
    );

    branches.push({
      id: `${point.parent.data.nodeId}->${point.data.nodeId}`,
      start,
      control1,
      control2,
      end: position,
      color,
      strokeWidth,
    });
  });

  return { nodes, branches, fanRadius };
}

export { HEIGHT_LIMIT_DEFAULT };
