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
  /** Sampled points along an organic cubic curve */
  points: Vec3[];
  color: string;
  startWidth: number;
  endWidth: number;
};

const MAX_CHILDREN = 12;
/** Wide upward fan, slightly more than a semicircle for poster density. */
const FAN_SPAN = Math.PI * 1.05;
const CURVE_SAMPLES = 24;

type Polar = { angle: number; radius: number };

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
  const points: Vec3[] = [];
  for (let i = 0; i <= samples; i += 1) {
    points.push(cubicPoint(p0, p1, p2, p3, i / samples));
  }
  return points;
}

/** Stable pseudo-noise from a string — slight hand-drawn irregularity. */
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

  const sorted = [...children].sort(
    (a, b) => (b.numTips ?? 0) - (a.numTips ?? 0)
  );
  const kept = sorted.slice(0, MAX_CHILDREN).map(pruneForDisplay);

  return { ...node, children: kept };
}

/**
 * Weight leaves by tip mass so major clades claim more angular space
 * (poster proportions — preserved as v2).
 */
function leafWeight(node: HierarchyNode<TreeNode>): number {
  const tips = node.data.numTips ?? 1;
  return Math.max(0.35, Math.sqrt(tips));
}

function assignAngles(root: HierarchyNode<TreeNode>): Map<string, Polar> {
  const polars = new Map<string, Polar>();
  const leaves = root.leaves();
  const weights = leaves.map(leafWeight);
  const total = weights.reduce((sum, w) => sum + w, 0) || 1;

  const start = -FAN_SPAN / 2;
  let cursor = start;

  leaves.forEach((leaf, index) => {
    const span = (weights[index]! / total) * FAN_SPAN;
    const angle = cursor + span / 2;
    cursor += span;
    polars.set(leaf.data.nodeId, { angle, radius: 0 });
  });

  root.eachAfter((node) => {
    if (!node.children?.length) {
      return;
    }

    let sum = 0;
    let count = 0;
    node.leaves().forEach((leaf) => {
      const p = polars.get(leaf.data.nodeId);
      if (p) {
        sum += p.angle;
        count += 1;
      }
    });

    polars.set(node.data.nodeId, {
      angle: count ? sum / count : 0,
      radius: 0,
    });
  });

  return polars;
}

function radiusForDepth(
  depth: number,
  height: number,
  maxDepth: number
): number {
  if (maxDepth <= 0) {
    return 0;
  }
  const t = depth / maxDepth;
  const eased = 1 - (1 - t) ** 1.45;
  return eased * height;
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
  const topSiblings = path[0]?.children ?? [];
  const topIndex = top
    ? topSiblings.findIndex((c) => c.data.nodeId === top.data.nodeId)
    : 0;
  const secondSiblings = top?.children ?? [];
  const secondIndex = second
    ? secondSiblings.findIndex((c) => c.data.nodeId === second.data.nodeId)
    : 0;

  return paletteColor(Math.max(0, topIndex) * 3 + Math.max(0, secondIndex));
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

  const tips = node.data.numTips ?? 0;
  if (node.depth <= 2) {
    return true;
  }
  if (tips >= 8000) {
    return true;
  }
  if (expandable && node.depth <= 5) {
    return true;
  }

  return false;
}

function organicCurve(
  parent: Polar,
  child: Polar,
  nodeId: string,
  radiusStep: number
): Vec3[] {
  const p0 = polarToCart(parent.angle, parent.radius);
  const p3 = polarToCart(child.angle, child.radius);

  const angleDelta = child.angle - parent.angle;
  const noise = (hashNoise(nodeId, 1) - 0.5) * 0.12;
  const bulge =
    Math.abs(angleDelta) * radiusStep * 0.85 +
    (child.radius - parent.radius) * 0.22 +
    hashNoise(nodeId, 2) * radiusStep * 0.15;

  const a1 = lerp(parent.angle, child.angle, 0.22 + noise);
  const r1 = lerp(parent.radius, child.radius, 0.28) + bulge * 0.35;
  const a2 = lerp(parent.angle, child.angle, 0.78 + noise * 0.5);
  const r2 = lerp(parent.radius, child.radius, 0.72) + bulge * 0.15;

  return sampleCubic(
    p0,
    polarToCart(a1, r1),
    polarToCart(a2, r2),
    p3,
    CURVE_SAMPLES
  );
}

function branchWidths(
  parentTips: number,
  childTips: number,
  depth: number
): {
  startWidth: number;
  endWidth: number;
} {
  const start = Math.max(
    0.04,
    Math.min(0.28, Math.log10(parentTips + 10) * 0.045 - depth * 0.008)
  );
  const end = Math.max(
    0.012,
    Math.min(start * 0.55, Math.log10(childTips + 10) * 0.028)
  );
  return { startWidth: start, endWidth: end };
}

export function layoutPhylogeneticFan(
  tree: TreeNode,
  height = 14
): { nodes: LayoutNode[]; links: LayoutLink[]; height: number } {
  const pruned = pruneForDisplay(tree);
  const root = hierarchy(pruned, (d) => d.children ?? undefined);
  const polars = assignAngles(root);
  const maxDepth = Math.max(root.height, 1);
  const radiusStep = height / maxDepth;

  root.each((node) => {
    const polar = polars.get(node.data.nodeId) ?? { angle: 0, radius: 0 };
    polar.radius = radiusForDepth(node.depth, height, maxDepth);
    polars.set(node.data.nodeId, polar);
  });

  const nodes: LayoutNode[] = [];
  const links: LayoutLink[] = [];

  root.each((node) => {
    const polar = polars.get(node.data.nodeId)!;
    const [x, y, z] = polarToCart(polar.angle, polar.radius);
    const color = resolveCladeColor(node);
    const tips = node.data.numTips ?? 0;
    const expandable = tips > 1 && !node.children?.length;
    const showLabel = shouldShowLabel(node, expandable);
    const isOrigin = node.depth === 0;

    nodes.push({
      node: node.data,
      x,
      y,
      z,
      depth: node.depth,
      color,
      expandable,
      showLabel,
      fontSize: isOrigin ? 0.38 : node.depth <= 2 ? 0.18 : 0.13,
      isOrigin,
    });

    if (!node.parent) {
      return;
    }

    const parentPolar = polars.get(node.parent.data.nodeId)!;
    const parentTips = node.parent.data.numTips ?? 1;
    const { startWidth, endWidth } = branchWidths(parentTips, tips, node.depth);

    links.push({
      key: `${node.parent.data.nodeId}->${node.data.nodeId}`,
      points: organicCurve(parentPolar, polar, node.data.nodeId, radiusStep),
      color,
      startWidth,
      endWidth,
    });
  });

  return { nodes, links, height };
}
