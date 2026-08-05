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

const MAX_CHILDREN = 10;
/** Upward fan opening (radians). */
const FAN_SPAN = Math.PI * 1.05;
const CURVE_SAMPLES = 24;
/** Minimum chord distance between adjacent leaves at the outer ring. */
const MIN_LEAF_SEPARATION = 1.35;
/** Minimum chord distance between any two nodes on the same depth ring. */
const MIN_RING_SEPARATION = 0.95;
const SEPARATION_ITERS = 48;

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
 * Even leaf spacing — every leaf gets the same angular slot so
 * nearest neighbors sit at a uniform gap (no tip-mass clumping).
 */
function assignEvenLeafAngles(
  root: HierarchyNode<TreeNode>
): Map<string, number> {
  const angles = new Map<string, number>();
  const leaves = root.leaves();
  const n = leaves.length;
  const start = -FAN_SPAN / 2;

  if (n === 1) {
    angles.set(leaves[0]!.data.nodeId, 0);
  } else {
    const step = FAN_SPAN / (n - 1);
    leaves.forEach((leaf, index) => {
      angles.set(leaf.data.nodeId, start + index * step);
    });
  }

  return angles;
}

function recomputeInternalAngles(
  root: HierarchyNode<TreeNode>,
  angles: Map<string, number>
): void {
  root.eachAfter((node) => {
    if (!node.children?.length) {
      return;
    }

    let sum = 0;
    let count = 0;
    node.leaves().forEach((leaf) => {
      const a = angles.get(leaf.data.nodeId);
      if (a != null) {
        sum += a;
        count += 1;
      }
    });

    angles.set(node.data.nodeId, count ? sum / count : 0);
  });

  angles.set(root.data.nodeId, 0);
}

/**
 * Push same-depth neighbors apart in angle-space until chord gaps
 * meet MIN_RING_SEPARATION. Leaves stay ordered; internals re-averaged after.
 */
function separateByDepth(
  root: HierarchyNode<TreeNode>,
  angles: Map<string, number>,
  radiusFor: (depth: number) => number
): void {
  const byDepth = new Map<number, HierarchyNode<TreeNode>[]>();

  root.each((node) => {
    if (node.depth === 0) {
      return;
    }
    const list = byDepth.get(node.depth) ?? [];
    list.push(node);
    byDepth.set(node.depth, list);
  });

  for (let iter = 0; iter < SEPARATION_ITERS; iter += 1) {
    byDepth.forEach((nodes, depth) => {
      const radius = Math.max(radiusFor(depth), 0.001);
      const minAngle = MIN_RING_SEPARATION / radius;
      const sorted = [...nodes].sort(
        (a, b) =>
          (angles.get(a.data.nodeId) ?? 0) - (angles.get(b.data.nodeId) ?? 0)
      );

      for (let i = 0; i < sorted.length - 1; i += 1) {
        const left = sorted[i]!;
        const right = sorted[i + 1]!;
        const a0 = angles.get(left.data.nodeId) ?? 0;
        const a1 = angles.get(right.data.nodeId) ?? 0;
        const gap = a1 - a0;

        if (gap >= minAngle) {
          continue;
        }

        const push = (minAngle - gap) / 2;
        angles.set(left.data.nodeId, a0 - push);
        angles.set(right.data.nodeId, a1 + push);
      }
    });

    // Keep the fan roughly centered and within span after pushes.
    const leafAngles = root
      .leaves()
      .map((leaf) => angles.get(leaf.data.nodeId) ?? 0);
    if (leafAngles.length >= 2) {
      const minA = Math.min(...leafAngles);
      const maxA = Math.max(...leafAngles);
      const span = Math.max(maxA - minA, 1e-6);
      const scale = FAN_SPAN / span;
      const mid = (minA + maxA) / 2;

      root.leaves().forEach((leaf) => {
        const a = angles.get(leaf.data.nodeId) ?? 0;
        angles.set(leaf.data.nodeId, (a - mid) * Math.min(scale, 1.15));
      });
    }

    recomputeInternalAngles(root, angles);
  }
}

function radiusForDepth(
  depth: number,
  height: number,
  maxDepth: number
): number {
  if (maxDepth <= 0 || depth === 0) {
    return 0;
  }
  const t = depth / maxDepth;
  // Slight ease so early forks aren't crushed into the origin.
  const eased = 1 - (1 - t) ** 1.25;
  return eased * height;
}

/**
 * Grow the tree so outer-ring chord length between adjacent leaves
 * stays ≥ MIN_LEAF_SEPARATION — prevents the crowded green wedges.
 */
function heightForLeafCount(leafCount: number): number {
  const gaps = Math.max(leafCount - 1, 1);
  const needed = (MIN_LEAF_SEPARATION * gaps) / FAN_SPAN;
  return Math.max(12, needed);
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

function candidateLabel(
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
  if (expandable) {
    return true;
  }

  return false;
}

/**
 * Drop labels that would collide with an already-accepted neighbor
 * (same depth ring, angular proximity).
 */
function cullOverlappingLabels(
  root: HierarchyNode<TreeNode>,
  angles: Map<string, number>,
  radiusFor: (depth: number) => number,
  wantsLabel: Map<string, boolean>
): void {
  const byDepth = new Map<number, HierarchyNode<TreeNode>[]>();

  root.each((node) => {
    if (!wantsLabel.get(node.data.nodeId)) {
      return;
    }
    const list = byDepth.get(node.depth) ?? [];
    list.push(node);
    byDepth.set(node.depth, list);
  });

  byDepth.forEach((nodes, depth) => {
    const radius = Math.max(radiusFor(depth), 0.001);
    // Labels need more clearance than nodes.
    const minAngle = (MIN_RING_SEPARATION * 1.6) / radius;
    const sorted = [...nodes].sort(
      (a, b) =>
        (angles.get(a.data.nodeId) ?? 0) - (angles.get(b.data.nodeId) ?? 0)
    );

    let lastAccepted: number | null = null;
    sorted.forEach((node) => {
      // Always keep origin / depth-1 major forks.
      if (node.depth <= 1) {
        lastAccepted = angles.get(node.data.nodeId) ?? 0;
        return;
      }

      const angle = angles.get(node.data.nodeId) ?? 0;
      if (lastAccepted != null && angle - lastAccepted < minAngle) {
        wantsLabel.set(node.data.nodeId, false);
        return;
      }

      lastAccepted = angle;
    });
  });
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
  const noise = (hashNoise(nodeId, 1) - 0.5) * 0.1;
  const bulge =
    Math.abs(angleDelta) * radiusStep * 0.7 +
    (child.radius - parent.radius) * 0.18 +
    hashNoise(nodeId, 2) * radiusStep * 0.1;

  const a1 = lerp(parent.angle, child.angle, 0.25 + noise);
  const r1 = lerp(parent.radius, child.radius, 0.3) + bulge * 0.3;
  const a2 = lerp(parent.angle, child.angle, 0.75 + noise * 0.4);
  const r2 = lerp(parent.radius, child.radius, 0.7) + bulge * 0.12;

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
    0.025,
    Math.min(0.16, Math.log10(parentTips + 10) * 0.028 - depth * 0.006)
  );
  const end = Math.max(
    0.01,
    Math.min(start * 0.5, Math.log10(childTips + 10) * 0.018)
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
  const leafCount = root.leaves().length;
  const height = heightForLeafCount(leafCount);
  const maxDepth = Math.max(root.height, 1);
  const radiusStep = height / maxDepth;

  const radiusOf = (depth: number) => radiusForDepth(depth, height, maxDepth);

  const angles = assignEvenLeafAngles(root);
  recomputeInternalAngles(root, angles);
  separateByDepth(root, angles, radiusOf);

  const wantsLabel = new Map<string, boolean>();
  root.each((node) => {
    const tips = node.data.numTips ?? 0;
    const expandable = tips > 1 && !node.children?.length;
    wantsLabel.set(node.data.nodeId, candidateLabel(node, expandable));
  });
  cullOverlappingLabels(root, angles, radiusOf, wantsLabel);

  const nodes: LayoutNode[] = [];
  const links: LayoutLink[] = [];

  root.each((node) => {
    const angle = angles.get(node.data.nodeId) ?? 0;
    const radius = radiusOf(node.depth);
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
      showLabel: wantsLabel.get(node.data.nodeId) === true,
      fontSize: isOrigin ? 0.36 : node.depth <= 2 ? 0.17 : 0.12,
      isOrigin,
    });

    if (!node.parent) {
      return;
    }

    const parentPolar: Polar = {
      angle: angles.get(node.parent.data.nodeId) ?? 0,
      radius: radiusOf(node.parent.depth),
    };
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
