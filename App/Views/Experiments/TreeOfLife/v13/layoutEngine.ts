/**
 * v13 layout — tip-first poster with fine hairline branches (no PhyloPic)
 *
 * Deep tips placed first in clade territories; parents toward origin;
 * thin colored strokes (not fat ribbons).
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
  path: string;
  color: string;
  strokeWidth: number;
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

const MAX_CHILDREN = 12;
const MAX_TIPS = 80;
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
  if (isSilvaNoise(node.name)) {
    score -= 40;
  }
  return score;
}

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
  const ranked = [...root.leaves()].sort(
    (a, b) => tipScore(b.data) - tipScore(a.data)
  );
  const keep = new Set<string>();
  for (const leaf of ranked) {
    if (keep.size >= MAX_TIPS) {
      break;
    }
    if (isSilvaNoise(leaf.data.name) && keep.size > MAX_TIPS * 0.55) {
      continue;
    }
    keep.add(leaf.data.nodeId);
  }
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

function shouldLabel(node: HierarchyNode<TreeNode>): boolean {
  if (node.depth === 0) {
    return false; // origin label drawn specially, tiny
  }
  const text = labelFor(node.data);
  if (!text || isSilvaNoise(text)) {
    return false;
  }
  // Only major clade names — keep text sparse and small like the poster.
  return node.depth <= 2;
}

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
  const pad = mapW * 0.012;
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

  const tipBandTop = mapH * 0.97;
  const tipBandBottom = mapH * 0.38;

  ranges.forEach(({ node, left, right }) => {
    const laneTips = (byLane.get(node.data.nodeId) ?? []).sort(
      (a, b) => tipScore(b.data) - tipScore(a.data)
    );
    const n = Math.max(laneTips.length, 1);
    const width = Math.max(right - left, 1);

    laneTips.forEach((tip, i) => {
      const cols = Math.ceil(Math.sqrt(n * 1.5));
      const col = i % cols;
      const row = Math.floor(i / cols);
      const rows = Math.ceil(n / cols);
      const u = cols === 1 ? 0.5 : (col + 0.5) / cols;
      const v = rows === 1 ? 0.6 : 0.12 + (row / Math.max(rows - 1, 1)) * 0.88;
      const jx = (hash01(tip.data.nodeId, 1) - 0.5) * (width / cols) * 0.5;
      const jy =
        (hash01(tip.data.nodeId, 2) - 0.5) * (tipBandTop - tipBandBottom) * 0.1;
      positions.set(tip.data.nodeId, {
        x: left + u * width + jx,
        y: tipBandBottom + v * (tipBandTop - tipBandBottom) + jy,
      });
    });
  });

  const minDist = Math.max(
    22,
    (Math.min(mapW, mapH) / Math.sqrt(Math.max(tips.length, 4))) * 0.75
  );

  for (let iter = 0; iter < REPULSION_ITERS; iter += 1) {
    const strength = 1 - iter / REPULSION_ITERS;
    const ids = [...positions.keys()];
    for (let i = 0; i < ids.length; i += 1) {
      for (let j = i + 1; j < ids.length; j += 1) {
        const a = positions.get(ids[i])!;
        const b = positions.get(ids[j])!;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy) || 1e-6;
        if (dist >= minDist) {
          continue;
        }
        const push = ((minDist - dist) / minDist) * 0.5 * strength;
        const ux = (dx / dist) * push * minDist * 0.45;
        const uy = (dy / dist) * push * minDist * 0.45;
        a.x += ux;
        a.y += uy;
        b.x -= ux;
        b.y -= uy;
      }
    }
    positions.forEach((p) => {
      p.x = Math.max((-mapW / 2) * 0.98, Math.min((mapW / 2) * 0.98, p.x));
      p.y = Math.max(tipBandBottom * 0.88, Math.min(tipBandTop, p.y));
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
    const pull = 0.7 - depthRatio * 0.52;
    positions.set(node.data.nodeId, {
      x: cx * (1 - pull * 0.78),
      y: Math.max(mapH * 0.06, cy * (1 - pull)),
    });
  });

  return positions;
}

function bezierFor(parent: Vec, child: Vec): { c1: Vec; c2: Vec } {
  const dx = child.x - parent.x;
  const dy = child.y - parent.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;

  const bend = Math.min(len * 0.32, 140) * (child.x >= parent.x ? 1 : -1);

  return {
    c1: {
      x: parent.x + dx * 0.28 + nx * bend * 0.18,
      y: parent.y + dy * 0.12,
    },
    c2: {
      x: parent.x + dx * 0.7 + nx * bend * 0.55,
      y: parent.y + dy * 0.62,
    },
  };
}

function toSvg(p: Vec): Vec2 {
  return [p.x, -p.y];
}

function strokeWidthFor(
  parentTips: number,
  depth: number,
  isRootEdge: boolean
): number {
  if (isRootEdge) {
    return Math.max(1.1, Math.min(2.4, Math.log10(parentTips + 10) * 0.55));
  }
  return Math.max(
    0.45,
    Math.min(1.6, Math.log10(parentTips + 10) * 0.35 - depth * 0.05)
  );
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
    const color = isOrigin ? '#2d6a4f' : resolveColor(node);

    nodes.push({
      id: node.data.nodeId,
      node: node.data,
      position: toSvg(pos),
      depth: node.depth,
      color,
      expandable,
      showLabel: shouldLabel(node),
      fontSize: node.depth <= 1 ? 9 : 7.5,
      isOrigin,
      isTip,
      // Subtle origin — small oval, not a drilled cell target.
      markerRadius: isOrigin ? 5 : isTip ? 2.2 : expandable ? 2.8 : 1.4,
    });

    if (!node.parent) {
      return;
    }
    const parentPos = positions.get(node.parent.data.nodeId);
    if (!parentPos) {
      return;
    }

    const { c1, c2 } = bezierFor(parentPos, pos);
    const [x0, y0] = toSvg(parentPos);
    const [x1, y1] = toSvg(c1);
    const [x2, y2] = toSvg(c2);
    const [x3, y3] = toSvg(pos);
    const parentTips = node.parent.data.numTips ?? 1;

    branches.push({
      id: `${node.parent.data.nodeId}->${node.data.nodeId}`,
      path: `M ${x0} ${y0} C ${x1} ${y1}, ${x2} ${y2}, ${x3} ${y3}`,
      color,
      strokeWidth: strokeWidthFor(
        parentTips,
        node.depth,
        node.parent.depth === 0
      ),
    });
  });

  branches.sort((a, b) => b.strokeWidth - a.strokeWidth);

  return { nodes, branches, width: mapW, height: mapH };
}

export { HEIGHT_LIMIT_DEFAULT };
