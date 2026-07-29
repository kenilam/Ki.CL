/**
 * v12 layout — curated poster canopy (tip-first)
 *
 * 1. Curate ~40–60 named tips (prefer ottId + numTips; drop SILVA soup)
 * 2. Place tips first in uneven clade territories (full upper rectangle)
 * 3. Parents = tip centroids pulled toward origin at bottom
 * 4. Branches as tapered ribbons (startWidth → endWidth)
 */
import { hierarchy, type HierarchyNode } from 'd3-hierarchy';

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
  startWidth: number;
  endWidth: number;
  /** Filled tapered ribbon path in SVG coords. */
  ribbonPath: string;
};

export type LayoutResult = {
  nodes: LayoutNode[];
  branches: LayoutBranch[];
  width: number;
  height: number;
};

export type ViewportSize = {
  width: number;
  height: number;
};

const MAX_CHILDREN = 10;
const MAX_TIPS = 52;
const HEIGHT_LIMIT_DEFAULT = 3;
const REPULSION_ITERS = 80;

type Vec = { x: number; y: number };

function hash01(id: string, salt = 0): number {
  let h = salt * 374761393 + 1;
  for (let i = 0; i < id.length; i += 1) {
    h = Math.imul(h ^ id.charCodeAt(i), 1103515245);
  }
  return ((h >>> 0) % 10000) / 10000;
}

function isAbsoluteOrigin(node: TreeNode): boolean {
  return node.ottId === ROOT_OTT_ID || node.nodeId === `ott${ROOT_OTT_ID}`;
}

function isSilvaNoise(name: string | null | undefined): boolean {
  if (!name) {
    return true;
  }
  return /silva|uncultured|sp\.\s|candidatus|environmental|metagenome/i.test(
    name
  );
}

function tipScore(node: TreeNode): number {
  let score = Math.log10((node.numTips ?? 1) + 10) * 10;
  if (node.ottId) {
    score += 20;
  }
  if (labelFor(node)) {
    score += 15;
  }
  if (node.rank && !/no.?rank|species/i.test(node.rank)) {
    score += 8;
  }
  if (isSilvaNoise(node.name)) {
    score -= 40;
  }
  return score;
}

/** Breadth prune + keep highest-scoring tips only. */
function pruneForPoster(node: TreeNode): TreeNode {
  if (!node.children?.length) {
    return { ...node, children: null };
  }
  const sorted = [...node.children]
    .sort(
      (a, b) => tipScore(b) - tipScore(a) || (b.numTips ?? 0) - (a.numTips ?? 0)
    )
    .slice(0, MAX_CHILDREN)
    .map(pruneForPoster);
  return { ...node, children: sorted };
}

function capTips(root: HierarchyNode<TreeNode>): Set<string> {
  const leaves = root.leaves();
  const ranked = [...leaves].sort(
    (a, b) => tipScore(b.data) - tipScore(a.data)
  );
  const keep = new Set<string>();
  for (const leaf of ranked) {
    if (keep.size >= MAX_TIPS) {
      break;
    }
    if (isSilvaNoise(leaf.data.name) && keep.size > MAX_TIPS * 0.6) {
      continue;
    }
    keep.add(leaf.data.nodeId);
  }
  // Always keep at least one tip per root child when possible.
  (root.children ?? []).forEach((child) => {
    const best = child
      .leaves()
      .sort((a, b) => tipScore(b.data) - tipScore(a.data))[0];
    if (best) {
      keep.add(best.data.nodeId);
    }
  });
  return keep;
}

/** Collapse tree so only kept tips remain as leaves (drop pruned tips). */
function filterToKeptTips(
  node: HierarchyNode<TreeNode>,
  keep: Set<string>
): TreeNode | null {
  if (!node.children?.length) {
    return keep.has(node.data.nodeId) ? { ...node.data, children: null } : null;
  }
  const children = node.children
    .map((c) => filterToKeptTips(c, keep))
    .filter((c): c is TreeNode => c != null);
  if (!children.length) {
    return keep.has(node.data.nodeId) ? { ...node.data, children: null } : null;
  }
  if (children.length === 1 && node.depth > 0) {
    // Optional: keep intermediate named clades.
    const only = children[0];
    if (!labelFor(node.data) || isSilvaNoise(node.data.name)) {
      return only;
    }
  }
  return { ...node.data, children };
}

function laneOf(
  tip: HierarchyNode<TreeNode>,
  root: HierarchyNode<TreeNode>
): HierarchyNode<TreeNode> {
  let node: HierarchyNode<TreeNode> = tip;
  while (node.parent && node.parent !== root) {
    node = node.parent;
  }
  return node;
}

function resolveColor(node: HierarchyNode<TreeNode>): string {
  let current: HierarchyNode<TreeNode> | null = node;
  while (current) {
    const named = colorForName(current.data.name);
    if (named) {
      return named;
    }
    current = current.parent;
  }
  let tip: HierarchyNode<TreeNode> | null = node;
  while (tip.children?.length) {
    tip = tip.children[0] ?? null;
    if (!tip) {
      break;
    }
  }
  while (tip?.parent && tip.parent.depth > 0) {
    tip = tip.parent;
  }
  const siblings = tip?.parent?.children ?? [];
  const index = siblings.findIndex((c) => c.data.nodeId === tip?.data.nodeId);
  return paletteColor(Math.max(0, index));
}

function shouldLabel(node: HierarchyNode<TreeNode>, isTip: boolean): boolean {
  if (node.depth === 0) {
    return true;
  }
  const text = labelFor(node.data);
  if (!text || isSilvaNoise(text)) {
    return false;
  }
  if (node.depth <= 2) {
    return true;
  }
  // Tips labeled in the render layer only when they have a silhouette.
  return false;
}

/**
 * Uneven territory widths by clade tip mass (poster animals/plants get room).
 */
function laneRanges(
  root: HierarchyNode<TreeNode>,
  mapW: number
): { node: HierarchyNode<TreeNode>; left: number; right: number }[] {
  const children = root.children ?? [];
  if (!children.length) {
    return [];
  }
  const weights = children.map((c) =>
    Math.max(1, Math.sqrt(c.data.numTips ?? c.leaves().length))
  );
  const total = weights.reduce((a, b) => a + b, 0);
  let cursor = -mapW / 2;
  const pad = mapW * 0.015;
  return children.map((node, i) => {
    const span = (weights[i] / total) * mapW;
    const left = cursor + pad;
    const right = cursor + span - pad;
    cursor += span;
    return { node, left, right };
  });
}

function placeTipsFirst(
  tips: HierarchyNode<TreeNode>[],
  root: HierarchyNode<TreeNode>,
  mapW: number,
  mapH: number
): Map<string, Vec> {
  const positions = new Map<string, Vec>();
  const ranges = laneRanges(root, mapW);
  const byLane = new Map<string, HierarchyNode<TreeNode>[]>();

  tips.forEach((tip) => {
    const lane = laneOf(tip, root);
    const list = byLane.get(lane.data.nodeId) ?? [];
    list.push(tip);
    byLane.set(lane.data.nodeId, list);
  });

  const tipBandTop = mapH * 0.96;
  const tipBandBottom = mapH * 0.42;

  ranges.forEach(({ node, left, right }) => {
    const laneTips = (byLane.get(node.data.nodeId) ?? []).sort(
      (a, b) => tipScore(b.data) - tipScore(a.data)
    );
    const n = Math.max(laneTips.length, 1);
    const width = Math.max(right - left, 1);

    laneTips.forEach((tip, i) => {
      const cols = Math.ceil(Math.sqrt(n * 1.4));
      const col = i % cols;
      const row = Math.floor(i / cols);
      const rows = Math.ceil(n / cols);
      const u = cols === 1 ? 0.5 : (col + 0.5) / cols;
      const v = rows === 1 ? 0.55 : 0.15 + (row / Math.max(rows - 1, 1)) * 0.85;
      const jx = (hash01(tip.data.nodeId, 1) - 0.5) * (width / cols) * 0.55;
      const jy =
        (hash01(tip.data.nodeId, 2) - 0.5) *
        (tipBandTop - tipBandBottom) *
        0.12;
      positions.set(tip.data.nodeId, {
        x: left + u * width + jx,
        y: tipBandBottom + v * (tipBandTop - tipBandBottom) + jy,
      });
    });
  });

  const minDist = Math.max(
    56,
    (Math.min(mapW, mapH) / Math.sqrt(Math.max(tips.length, 4))) * 1.15
  );

  for (let iter = 0; iter < REPULSION_ITERS; iter += 1) {
    const strength = 1 - iter / REPULSION_ITERS;
    const ids = [...positions.keys()];
    for (let i = 0; i < ids.length; i += 1) {
      for (let j = i + 1; j < ids.length; j += 1) {
        const a = positions.get(ids[i])!;
        const b = positions.get(ids[j])!;
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        const dist = Math.hypot(dx, dy) || 1e-6;
        if (dist >= minDist) {
          continue;
        }
        const push = ((minDist - dist) / minDist) * 0.55 * strength;
        const ux = (dx / dist) * push * minDist * 0.5;
        const uy = (dy / dist) * push * minDist * 0.5;
        a.x += ux;
        a.y += uy;
        b.x -= ux;
        b.y -= uy;
      }
    }
    positions.forEach((p) => {
      p.x = Math.max((-mapW / 2) * 0.98, Math.min((mapW / 2) * 0.98, p.x));
      p.y = Math.max(tipBandBottom * 0.9, Math.min(tipBandTop, p.y));
    });
  }

  return positions;
}

function placeParentsTowardOrigin(
  root: HierarchyNode<TreeNode>,
  tipPositions: Map<string, Vec>,
  mapH: number
): Map<string, Vec> {
  const positions = new Map<string, Vec>(tipPositions);
  positions.set(root.data.nodeId, { x: 0, y: 0 });
  const maxDepth = Math.max(root.height, 1);

  root.eachAfter((node) => {
    if (node.depth === 0) {
      positions.set(node.data.nodeId, { x: 0, y: 0 });
      return;
    }
    if (!node.children?.length) {
      return;
    }

    let sx = 0;
    let sy = 0;
    let count = 0;
    node.leaves().forEach((leaf) => {
      const p = tipPositions.get(leaf.data.nodeId);
      if (!p) {
        return;
      }
      sx += p.x;
      sy += p.y;
      count += 1;
    });
    if (!count) {
      return;
    }

    const cx = sx / count;
    const cy = sy / count;
    const depthRatio = node.depth / maxDepth;
    // Near-root trunks drop lower; deep forks stay near the canopy.
    const pull = 0.72 - depthRatio * 0.55;
    positions.set(node.data.nodeId, {
      x: cx * (1 - pull * 0.75),
      y: Math.max(mapH * 0.1, cy * (1 - pull)),
    });
  });

  return positions;
}

function bezierFor(parent: Vec, child: Vec): { c1: Vec; c2: Vec } {
  const dx = child.x - parent.x;
  const dy = child.y - parent.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const bend = Math.min(len * 0.28, 120) * (child.x >= parent.x ? 1 : -1);

  return {
    c1: {
      x: parent.x + dx * 0.3 + nx * bend * 0.2,
      y: parent.y + dy * 0.15,
    },
    c2: {
      x: parent.x + dx * 0.72 + nx * bend * 0.65,
      y: parent.y + dy * 0.65,
    },
  };
}

function toSvg(p: Vec): Vec2 {
  return [p.x, -p.y];
}

function cubicPoint(t: number, p0: Vec, p1: Vec, p2: Vec, p3: Vec): Vec {
  const u = 1 - t;
  return {
    x:
      u * u * u * p0.x +
      3 * u * u * t * p1.x +
      3 * u * t * t * p2.x +
      t * t * t * p3.x,
    y:
      u * u * u * p0.y +
      3 * u * u * t * p1.y +
      3 * u * t * t * p2.y +
      t * t * t * p3.y,
  };
}

function cubicTangent(t: number, p0: Vec, p1: Vec, p2: Vec, p3: Vec): Vec {
  const u = 1 - t;
  return {
    x:
      3 * u * u * (p1.x - p0.x) +
      6 * u * t * (p2.x - p1.x) +
      3 * t * t * (p3.x - p2.x),
    y:
      3 * u * u * (p1.y - p0.y) +
      6 * u * t * (p2.y - p1.y) +
      3 * t * t * (p3.y - p2.y),
  };
}

/** Build a filled tapered ribbon along a cubic bezier (layout space → SVG path). */
function ribbonPath(
  p0: Vec,
  p1: Vec,
  p2: Vec,
  p3: Vec,
  startWidth: number,
  endWidth: number,
  samples = 18
): string {
  const left: Vec2[] = [];
  const right: Vec2[] = [];

  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const pt = cubicPoint(t, p0, p1, p2, p3);
    const tan = cubicTangent(t, p0, p1, p2, p3);
    const len = Math.hypot(tan.x, tan.y) || 1;
    const nx = -tan.y / len;
    const ny = tan.x / len;
    const w = (startWidth * (1 - t) + endWidth * t) * 0.5;
    const L = toSvg({ x: pt.x + nx * w, y: pt.y + ny * w });
    const R = toSvg({ x: pt.x - nx * w, y: pt.y - ny * w });
    left.push(L);
    right.push(R);
  }

  const parts = [`M ${left[0][0]} ${left[0][1]}`];
  for (let i = 1; i < left.length; i += 1) {
    parts.push(`L ${left[i][0]} ${left[i][1]}`);
  }
  for (let i = right.length - 1; i >= 0; i -= 1) {
    parts.push(`L ${right[i][0]} ${right[i][1]}`);
  }
  parts.push('Z');
  return parts.join(' ');
}

function branchWidths(
  parentTips: number,
  childTips: number,
  depth: number,
  isRootEdge: boolean
): { startWidth: number; endWidth: number } {
  const start = Math.max(
    isRootEdge ? 10 : 3.5,
    Math.min(
      isRootEdge ? 28 : 16,
      Math.log10(parentTips + 10) * (isRootEdge ? 7 : 3.8) - depth * 0.4
    )
  );
  const end = Math.max(
    1.2,
    Math.min(start * 0.45, Math.log10(childTips + 10) * 2.2)
  );
  return { startWidth: start, endWidth: end };
}

export function computePosterLayout(
  tree: TreeNode,
  viewport: ViewportSize
): LayoutResult {
  const mapW = Math.max(viewport.width * 0.9, 720);
  const mapH = Math.max(viewport.height * 0.84, 520);

  const raw = hierarchy(pruneForPoster(tree), (d) => d.children ?? undefined);
  const keep = capTips(raw);
  const filtered = filterToKeptTips(raw, keep);
  if (!filtered) {
    return { nodes: [], branches: [], width: mapW, height: mapH };
  }

  const root = hierarchy(filtered, (d) => d.children ?? undefined);
  const tips = root.leaves();

  const tipPositions = placeTipsFirst(tips, root, mapW, mapH);
  const positions = placeParentsTowardOrigin(root, tipPositions, mapH);

  const markerScale = Math.max(5, Math.min(mapW, mapH) * 0.012);
  const nodes: LayoutNode[] = [];
  const branches: LayoutBranch[] = [];

  root.each((node) => {
    const pos = positions.get(node.data.nodeId);
    if (!pos) {
      return;
    }

    const tipsUnder = node.data.numTips ?? node.leaves().length;
    const isTip = !node.children?.length;
    const isOrigin = node.depth === 0 && isAbsoluteOrigin(node.data);
    const expandable =
      !isOrigin &&
      Boolean(node.data.ottId) &&
      tipsUnder > 1 &&
      (isTip || (node.children?.length ?? 0) < tipsUnder);
    const color = isOrigin ? '#1b4332' : resolveColor(node);

    nodes.push({
      id: node.data.nodeId,
      node: node.data,
      position: toSvg(pos),
      depth: node.depth,
      color,
      expandable,
      showLabel: shouldLabel(node, isTip),
      fontSize: isOrigin ? 16 : node.depth <= 2 ? 13 : 11,
      isOrigin,
      isTip,
      markerRadius: isOrigin
        ? markerScale * 3.8
        : isTip
          ? markerScale * 2.2
          : expandable
            ? markerScale * 1.5
            : markerScale * 0.55,
    });

    if (!node.parent) {
      return;
    }
    const parentPos = positions.get(node.parent.data.nodeId);
    if (!parentPos) {
      return;
    }

    const { c1, c2 } = bezierFor(parentPos, pos);
    const parentTips = node.parent.data.numTips ?? 1;
    const isRootEdge = node.parent.depth === 0;
    const { startWidth, endWidth } = branchWidths(
      parentTips,
      tipsUnder,
      node.depth,
      isRootEdge
    );

    branches.push({
      id: `${node.parent.data.nodeId}->${node.data.nodeId}`,
      start: toSvg(parentPos),
      control1: toSvg(c1),
      control2: toSvg(c2),
      end: toSvg(pos),
      color,
      startWidth,
      endWidth,
      ribbonPath: ribbonPath(parentPos, c1, c2, pos, startWidth, endWidth),
    });
  });

  // Draw thick trunks under fine twigs (sort by width descending for paint order hint).
  branches.sort((a, b) => b.startWidth - a.startWidth);

  return { nodes, branches, width: mapW, height: mapH };
}

export { HEIGHT_LIMIT_DEFAULT };
