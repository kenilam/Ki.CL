/**
 * v11 layout — tip-first poster map (NOT cluster / fan)
 *
 * 1. Place deepest tips (species / terminal groups) first across a rectangle,
 *    grouped into horizontal territories by top-level clade
 * 2. Separate tips with 2D repulsion
 * 3. Walk upward: each parent = descendant-tip centroid, pulled toward origin
 * 4. Origin of life fixed at bottom center; Bezier links parent → child
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

const MAX_CHILDREN = 18;
const HEIGHT_LIMIT_DEFAULT = 3;
const REPULSION_ITERS = 72;

type Vec = { x: number; y: number };

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

/** Top-level child under root → territory lane index. */
function laneIndex(
  tip: HierarchyNode<TreeNode>,
  root: HierarchyNode<TreeNode>
): number {
  let node: HierarchyNode<TreeNode> | null = tip;
  while (node?.parent && node.parent !== root) {
    node = node.parent;
  }
  const siblings = root.children ?? [];
  const idx = siblings.findIndex((c) => c === node);
  return Math.max(0, idx);
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

function shouldLabel(
  node: HierarchyNode<TreeNode>,
  expandable: boolean
): boolean {
  if (node.depth === 0) {
    return true;
  }
  if (!labelFor(node.data)) {
    return false;
  }
  // Prefer major clades + expandable tips; skip dense tip soup.
  if (node.depth <= 2) {
    return true;
  }
  if ((node.data.numTips ?? 0) >= 8000 && node.depth <= 4) {
    return true;
  }
  return expandable && node.depth <= 3;
}

/**
 * STEP 1 — place tips first in clade territories across the upper canvas.
 * Layout space: origin (0,0) at bottom center, +Y upward.
 */
function placeTipsFirst(
  tips: HierarchyNode<TreeNode>[],
  root: HierarchyNode<TreeNode>,
  mapW: number,
  mapH: number
): Map<string, Vec> {
  const positions = new Map<string, Vec>();
  const lanes = root.children?.length || 1;
  const byLane = new Map<number, HierarchyNode<TreeNode>[]>();

  tips.forEach((tip) => {
    const lane = laneIndex(tip, root);
    const list = byLane.get(lane) ?? [];
    list.push(tip);
    byLane.set(lane, list);
  });

  const tipBandTop = mapH * 0.98;
  const tipBandBottom = mapH * 0.55;

  byLane.forEach((laneTips, lane) => {
    laneTips.sort((a, b) => a.data.nodeId.localeCompare(b.data.nodeId));
    const laneCount = Math.max(laneTips.length, 1);
    const laneLeft = -mapW / 2 + (mapW / lanes) * lane + mapW * 0.02;
    const laneRight = -mapW / 2 + (mapW / lanes) * (lane + 1) - mapW * 0.02;
    const laneWidth = Math.max(laneRight - laneLeft, 1);

    laneTips.forEach((tip, i) => {
      const t = laneCount === 1 ? 0.5 : i / (laneCount - 1);
      const jitterX =
        (hash01(tip.data.nodeId, 1) - 0.5) *
        (laneWidth / Math.max(laneCount, 4));
      const jitterY =
        (hash01(tip.data.nodeId, 2) - 0.5) *
        (tipBandTop - tipBandBottom) *
        0.35;
      // Stagger rows so deep groups aren't a single line.
      const row = hash01(tip.data.nodeId, 3);
      const y =
        tipBandBottom +
        (tipBandTop - tipBandBottom) * (0.25 + row * 0.75) +
        jitterY;
      const x = laneLeft + t * laneWidth + jitterX;
      positions.set(tip.data.nodeId, { x, y });
    });
  });

  const minDist = Math.max(
    36,
    (Math.min(mapW, mapH) / Math.sqrt(Math.max(tips.length, 4))) * 0.9
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
        let dist = Math.hypot(dx, dy) || 1e-6;
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

    // Keep tips in the upper territory rectangle.
    positions.forEach((p) => {
      p.x = Math.max(-mapW / 2, Math.min(mapW / 2, p.x));
      p.y = Math.max(tipBandBottom * 0.85, Math.min(tipBandTop, p.y));
    });
  }

  return positions;
}

/**
 * STEP 2 — parents from deep groups: centroid of descendant tips,
 * then pull toward the origin (bottom) by relative depth.
 */
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
    // Shallow nodes (near origin) pull harder toward (0,0); deep nodes stay near tips.
    const depthRatio = node.depth / maxDepth;
    const pull = 1 - (0.2 + depthRatio * 0.75);
    const x = cx * (1 - pull * 0.85);
    const y = cy * (1 - pull);
    // Keep internals between origin and tip band.
    positions.set(node.data.nodeId, {
      x,
      y: Math.max(mapH * 0.08, Math.min(mapH * 0.7, y)),
    });
  });

  return positions;
}

/** Organic branch: start at parent, sweep toward child. */
function bezierFor(parent: Vec, child: Vec): { c1: Vec; c2: Vec } {
  const dx = child.x - parent.x;
  const dy = child.y - parent.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const bend = Math.min(len * 0.22, 80) * (child.x >= parent.x ? 1 : -1);

  return {
    c1: {
      x: parent.x + dx * 0.35 + nx * bend * 0.25,
      y: parent.y + dy * 0.2,
    },
    c2: {
      x: parent.x + dx * 0.75 + nx * bend * 0.55,
      y: parent.y + dy * 0.7,
    },
  };
}

/** Layout → SVG (y flips so +Y up becomes screen-up). */
function toSvg(p: Vec): Vec2 {
  return [p.x, -p.y];
}

export function computeTipFirstLayout(
  tree: TreeNode,
  viewport: ViewportSize
): LayoutResult {
  const mapW = Math.max(viewport.width * 0.88, 640);
  const mapH = Math.max(viewport.height * 0.82, 480);

  const root = hierarchy(prune(tree), (d) => d.children ?? undefined);
  const tips = root.leaves();

  // Deep groups first…
  const tipPositions = placeTipsFirst(tips, root, mapW, mapH);
  // …then parents connect toward origin.
  const positions = placeParentsTowardOrigin(root, tipPositions, mapH);

  const markerScale = Math.max(4, Math.min(mapW, mapH) * 0.01);
  const nodes: LayoutNode[] = [];
  const branches: LayoutBranch[] = [];

  root.each((node) => {
    const pos = positions.get(node.data.nodeId);
    if (!pos) {
      return;
    }

    const tipsUnder = node.data.numTips ?? 0;
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
      showLabel: shouldLabel(node, expandable),
      fontSize: isOrigin ? 15 : node.depth <= 2 ? 12 : 10,
      isOrigin,
      isTip,
      markerRadius: isOrigin
        ? markerScale * 3.6
        : expandable
          ? markerScale * 1.4
          : isTip
            ? markerScale * 1.15
            : markerScale * 0.5,
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
    branches.push({
      id: `${node.parent.data.nodeId}->${node.data.nodeId}`,
      start: toSvg(parentPos),
      control1: toSvg(c1),
      control2: toSvg(c2),
      end: toSvg(pos),
      color,
      strokeWidth: Math.max(
        0.8,
        Math.min(5, Math.log10(parentTips + 10) * 1.25 - node.depth * 0.12)
      ),
    });
  });

  return { nodes, branches, width: mapW, height: mapH };
}

export { HEIGHT_LIMIT_DEFAULT };
