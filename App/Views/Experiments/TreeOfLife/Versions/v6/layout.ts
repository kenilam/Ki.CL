import { hierarchy, type HierarchyNode } from 'd3-hierarchy';

import type { TreeNode } from '@/Views/Experiments/TreeOfLife/tree';
import {
  colorForName,
  labelFor,
  paletteColor,
} from '@/Views/Experiments/TreeOfLife/tree';

export type Vec3 = [number, number, number];

export type LayoutNode = {
  node: TreeNode;
  x: number;
  y: number;
  z: number;
  depth: number;
  color: string;
  expandable: boolean;
  showLabel: boolean;
  fontSize: number;
  isOrigin: boolean;
};

export type LayoutLink = {
  key: string;
  points: Vec3[];
  color: string;
  startWidth: number;
  endWidth: number;
};

type Polar = { angle: number; radius: number };
type Wedge = { start: number; end: number };

const MAX_CHILDREN = 16;
/** Dense upward canopy — closer to the poster silhouette. */
const FAN_SPAN = Math.PI * 1.15;
const CURVE_SAMPLES = 28;
const TREE_HEIGHT = 16;

function polarToCart(angle: number, radius: number): Vec3 {
  return [Math.sin(angle) * radius, Math.cos(angle) * radius, 0];
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function cubicPoint(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number): Vec3 {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;
  return [
    uuu * p0[0] + 3 * uu * t * p1[0] + 3 * u * tt * p2[0] + ttt * p3[0],
    uuu * p0[1] + 3 * uu * t * p1[1] + 3 * u * tt * p2[1] + ttt * p3[1],
    uuu * p0[2] + 3 * uu * t * p1[2] + 3 * u * tt * p2[2] + ttt * p3[2],
  ];
}

function sampleCubic(
  p0: Vec3,
  p1: Vec3,
  p2: Vec3,
  p3: Vec3,
  samples: number
): Vec3[] {
  const out: Vec3[] = [];
  for (let i = 0; i <= samples; i += 1) {
    out.push(cubicPoint(p0, p1, p2, p3, i / samples));
  }
  return out;
}

function hashNoise(id: string, salt = 0): number {
  let h = salt * 374761393;
  for (let i = 0; i < id.length; i += 1) {
    h = Math.imul(h ^ id.charCodeAt(i), 1103515245);
  }
  return ((h >>> 0) % 1000) / 1000;
}

function pruneForDisplay(node: TreeNode): TreeNode {
  const children = node.children;
  if (!children?.length) {
    return { ...node, children: null };
  }

  // Keep diversity: prefer a mix of large + medium clades, not only top tips.
  const sorted = [...children].sort(
    (a, b) => (b.numTips ?? 0) - (a.numTips ?? 0)
  );
  const kept = sorted.slice(0, MAX_CHILDREN).map(pruneForDisplay);
  return { ...node, children: kept };
}

function leafMass(node: HierarchyNode<TreeNode>): number {
  // Soft tip-weighting: major clades get more space, but not extreme clumps.
  return Math.max(1, Math.pow(node.data.numTips ?? 1, 0.42));
}

/**
 * Assign each subtree a contiguous angular wedge (poster-style sectors),
 * then place the node at the wedge midpoint.
 */
function assignWedges(root: HierarchyNode<TreeNode>): {
  angles: Map<string, number>;
  wedges: Map<string, Wedge>;
} {
  const angles = new Map<string, number>();
  const wedges = new Map<string, Wedge>();
  const fanStart = -FAN_SPAN / 2;

  function walk(
    node: HierarchyNode<TreeNode>,
    start: number,
    end: number
  ): void {
    wedges.set(node.data.nodeId, { start, end });
    angles.set(node.data.nodeId, (start + end) / 2);

    const kids = node.children;
    if (!kids?.length) {
      return;
    }

    const masses = kids.map(leafMass);
    const total = masses.reduce((s, m) => s + m, 0) || 1;
    // Small gutters between sibling wedges so branches don't fuse.
    const gutter = Math.min(
      0.012,
      ((end - start) * 0.04) / Math.max(kids.length, 1)
    );
    const usable = Math.max(end - start - gutter * (kids.length - 1), 1e-4);
    let cursor = start;

    kids.forEach((child, i) => {
      const span = (masses[i]! / total) * usable;
      walk(child, cursor, cursor + span);
      cursor += span + gutter;
    });
  }

  walk(root, fanStart, fanStart + FAN_SPAN);
  angles.set(root.data.nodeId, 0);
  return { angles, wedges };
}

function radiusForDepth(depth: number, maxDepth: number): number {
  if (depth === 0) {
    return 0;
  }
  const t = depth / Math.max(maxDepth, 1);
  // Compact canopy: more length in outer rings (poster density at tips).
  const eased = t ** 0.85;
  return eased * TREE_HEIGHT;
}

function resolveCladeColor(node: HierarchyNode<TreeNode>): string {
  let current: HierarchyNode<TreeNode> | null = node;
  while (current) {
    const named = colorForName(current.data.name);
    if (named) {
      return named;
    }
    current = current.parent;
  }

  const path: HierarchyNode<TreeNode>[] = [];
  let walk: HierarchyNode<TreeNode> | null = node;
  while (walk) {
    path.push(walk);
    walk = walk.parent;
  }
  path.reverse();

  const top = path[1];
  const second = path[2];
  const third = path[3];
  const topIndex =
    top && path[0]?.children
      ? path[0].children.findIndex((c) => c.data.nodeId === top.data.nodeId)
      : 0;
  const secondIndex =
    second && top?.children
      ? top.children.findIndex((c) => c.data.nodeId === second.data.nodeId)
      : 0;
  const thirdIndex =
    third && second?.children
      ? second.children.findIndex((c) => c.data.nodeId === third.data.nodeId)
      : 0;

  return paletteColor(
    Math.max(0, topIndex) * 4 +
      Math.max(0, secondIndex) +
      Math.max(0, thirdIndex)
  );
}

function shouldShowLabel(
  node: HierarchyNode<TreeNode>,
  expandable: boolean
): boolean {
  if (node.depth === 0) {
    return true;
  }
  const name = labelFor(node.data);
  if (!name) {
    return false;
  }
  if (node.depth <= 2) {
    return true;
  }
  const tips = node.data.numTips ?? 0;
  if (tips >= 20000 && node.depth <= 4) {
    return true;
  }
  // Sparse tip labels — avoid the fuzzy perimeter.
  if (expandable && node.depth <= 3) {
    return true;
  }
  return false;
}

/**
 * Poster-like organic branch: sweep through the child's angular sector
 * with a strong lateral bulge (coral / vein feel), not a radial spoke.
 */
function organicCurve(
  parent: Polar,
  child: Polar,
  childWedge: Wedge,
  nodeId: string
): Vec3[] {
  const p0 = polarToCart(parent.angle, parent.radius);
  const p3 = polarToCart(child.angle, child.radius);

  const noise = (hashNoise(nodeId, 1) - 0.5) * 0.08;
  const wedgeMid = (childWedge.start + childWedge.end) / 2;
  const wedgeBias = lerp(child.angle, wedgeMid, 0.35) + noise;

  // Arc along an intermediate radius toward the child's sector, then out.
  const rArc = lerp(parent.radius, child.radius, 0.22);
  const rLift = lerp(parent.radius, child.radius, 0.62);

  const bulge =
    Math.abs(child.angle - parent.angle) * 2.8 +
    (child.radius - parent.radius) * 0.35 +
    hashNoise(nodeId, 2) * 0.6;

  const a1 = lerp(parent.angle, wedgeBias, 0.45);
  const a2 = lerp(wedgeBias, child.angle, 0.55);
  const p1 = polarToCart(a1, rArc + bulge * 0.25);
  const p2 = polarToCart(a2, rLift + bulge * 0.12);

  return sampleCubic(p0, p1, p2, p3, CURVE_SAMPLES);
}

function branchWidths(
  parentTips: number,
  childTips: number,
  depth: number
): {
  startWidth: number;
  endWidth: number;
} {
  // Dramatic trunk → twig taper like the reference illustration.
  const start = Math.max(
    0.05,
    Math.min(0.42, Math.log10(parentTips + 10) * 0.07 - depth * 0.012)
  );
  const end = Math.max(
    0.014,
    Math.min(start * 0.45, Math.log10(childTips + 10) * 0.032)
  );
  return { startWidth: start, endWidth: end };
}

export function layoutPhylogeneticFan(tree: TreeNode): {
  nodes: LayoutNode[];
  links: LayoutLink[];
  height: number;
} {
  const pruned = pruneForDisplay(tree);
  const root = hierarchy(pruned, (d) => d.children ?? undefined);
  const maxDepth = Math.max(root.height, 1);
  const { angles, wedges } = assignWedges(root);

  const nodes: LayoutNode[] = [];
  const links: LayoutLink[] = [];

  root.each((node) => {
    const angle = angles.get(node.data.nodeId) ?? 0;
    const radius = radiusForDepth(node.depth, maxDepth);
    const polar: Polar = { angle, radius };
    const [x, y, z] = polarToCart(angle, radius);
    const color = resolveCladeColor(node);
    const tips = node.data.numTips ?? 0;
    const expandable = tips > 1 && !node.children?.length;
    const isOrigin = node.depth === 0;

    nodes.push({
      node: node.data,
      x,
      y,
      z,
      depth: node.depth,
      color,
      expandable,
      showLabel: shouldShowLabel(node, expandable),
      fontSize: isOrigin ? 0.34 : node.depth <= 2 ? 0.16 : 0.11,
      isOrigin,
    });

    if (!node.parent) {
      return;
    }

    const parentPolar: Polar = {
      angle: angles.get(node.parent.data.nodeId) ?? 0,
      radius: radiusForDepth(node.parent.depth, maxDepth),
    };
    const childWedge = wedges.get(node.data.nodeId) ?? {
      start: angle,
      end: angle,
    };
    const parentTips = node.parent.data.numTips ?? 1;
    const { startWidth, endWidth } = branchWidths(parentTips, tips, node.depth);

    links.push({
      key: `${node.parent.data.nodeId}->${node.data.nodeId}`,
      points: organicCurve(parentPolar, polar, childWedge, node.data.nodeId),
      color,
      startWidth,
      endWidth,
    });
  });

  return { nodes, links, height: TREE_HEIGHT };
}
