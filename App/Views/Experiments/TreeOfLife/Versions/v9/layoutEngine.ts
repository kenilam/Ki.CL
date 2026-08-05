/**
 * v9 layout — flat 2D species map
 *
 * 1. Origin (life) at map center
 * 2. Tip / species nodes seeded across a disc, then separated with 2D repulsion
 * 3. Internal nodes = child centroids pulled toward the origin by depth
 * 4. Bezier links parent → child
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
  radius: number;
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
  /** Half-size of the square map in layout units. */
  mapRadius: number;
};

export type ViewportSize = {
  width: number;
  height: number;
};

const MAX_CHILDREN = 16;
const HEIGHT_LIMIT_DEFAULT = 3;
const REPULSION_ITERS = 64;
const PADDING = 48;

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
  if (node.depth <= 2) {
    return true;
  }
  return expandable && node.depth <= 3;
}

function cladeColor(node: HierarchyNode<TreeNode>): string {
  const named = colorForName(node.data.name);
  if (named) {
    return named;
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

/**
 * Seed tips on a disc (golden-angle spiral), then separate with 2D repulsion
 * while keeping them inside the map radius.
 */
function placeTipsOnMap(
  tips: HierarchyNode<TreeNode>[],
  mapRadius: number
): Map<string, Vec> {
  const positions = new Map<string, Vec>();
  const n = Math.max(tips.length, 1);
  const golden = Math.PI * (3 - Math.sqrt(5));

  tips.forEach((tip, i) => {
    const t = (i + 0.5) / n;
    const r = mapRadius * Math.sqrt(t) * 0.92;
    const angle = i * golden + hash01(tip.data.nodeId) * 0.35;
    positions.set(tip.data.nodeId, {
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r,
    });
  });

  const minDist = Math.max(
    28,
    ((2 * mapRadius) / Math.sqrt(Math.max(n, 4))) * 0.85
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
        const push = ((minDist - dist) / minDist) * 0.55 * strength;
        dx = (dx / dist) * push * (minDist * 0.5);
        dy = (dy / dist) * push * (minDist * 0.5);
        a.x += dx;
        a.y += dy;
        b.x -= dx;
        b.y -= dy;
      }
    }

    // Soft clamp back into the disc so the map stays readable.
    positions.forEach((p) => {
      const len = Math.hypot(p.x, p.y) || 1e-6;
      if (len > mapRadius) {
        const s = mapRadius / len;
        p.x *= s;
        p.y *= s;
      }
    });
  }

  return positions;
}

function placeAncestors(
  root: HierarchyNode<TreeNode>,
  tipPositions: Map<string, Vec>,
  mapRadius: number
): Map<string, Vec> {
  const positions = new Map<string, Vec>(tipPositions);
  positions.set(root.data.nodeId, { x: 0, y: 0 });

  const maxDepth = root.height;

  root.eachAfter((node) => {
    if (!node.children?.length) {
      return;
    }
    if (node.depth === 0) {
      positions.set(node.data.nodeId, { x: 0, y: 0 });
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
    // Pull inward by relative depth so internals sit between tips and origin.
    const depthRatio = maxDepth > 0 ? node.depth / maxDepth : 0;
    const pull = 0.35 + depthRatio * 0.45;
    let x = cx * pull;
    let y = cy * pull;
    const len = Math.hypot(x, y);
    const maxR = mapRadius * (0.15 + depthRatio * 0.75);
    if (len > maxR && len > 0) {
      const s = maxR / len;
      x *= s;
      y *= s;
    }
    positions.set(node.data.nodeId, { x, y });
  });

  return positions;
}

function bezierFor(parent: Vec, child: Vec): { c1: Vec; c2: Vec } {
  const mx = (parent.x + child.x) / 2;
  const my = (parent.y + child.y) / 2;
  // Bend slightly perpendicular so fan branches don't stack.
  const dx = child.x - parent.x;
  const dy = child.y - parent.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const bend = len * 0.12;
  return {
    c1: {
      x: parent.x * 0.65 + mx * 0.35 + nx * bend * 0.4,
      y: parent.y * 0.65 + my * 0.35 + ny * bend * 0.4,
    },
    c2: {
      x: child.x * 0.65 + mx * 0.35 + nx * bend,
      y: child.y * 0.65 + my * 0.35 + ny * bend,
    },
  };
}

export function computeSpeciesMapLayout(
  tree: TreeNode,
  viewport: ViewportSize
): LayoutResult {
  const mapRadius = Math.max(
    180,
    Math.min(viewport.width, viewport.height) * 0.5 - PADDING
  );

  const root = hierarchy(prune(tree), (d) => d.children ?? undefined);
  const tips = root.leaves();
  const tipPositions = placeTipsOnMap(tips, mapRadius);
  const positions = placeAncestors(root, tipPositions, mapRadius);

  const nodes: LayoutNode[] = [];
  const branches: LayoutBranch[] = [];
  const markerScale = Math.max(4, mapRadius * 0.018);

  root.each((node) => {
    const pos = positions.get(node.data.nodeId);
    if (!pos) {
      return;
    }

    const expandable = Boolean(
      node.data.ottId &&
      (node.data.numTips ?? 0) > 1 &&
      (!node.children?.length ||
        node.children.length < (node.data.numTips ?? 0))
    );
    const isOrigin = node.depth === 0 && isAbsoluteOrigin(node.data);
    const isTip = !node.children?.length;
    const color = isOrigin ? '#1b4332' : cladeColor(node);

    nodes.push({
      id: node.data.nodeId,
      node: node.data,
      position: [pos.x, pos.y],
      depth: node.depth,
      color,
      expandable: expandable && !isOrigin,
      showLabel: shouldLabel(node, expandable),
      fontSize: isOrigin ? 14 : node.depth <= 2 ? 11 : 9,
      isOrigin,
      isTip,
      radius: isOrigin
        ? markerScale * 3.2
        : expandable
          ? markerScale * 1.4
          : isTip
            ? markerScale * 1.1
            : markerScale * 0.55,
    });

    if (node.parent) {
      const parentPos = positions.get(node.parent.data.nodeId);
      if (!parentPos) {
        return;
      }
      const { c1, c2 } = bezierFor(parentPos, pos);
      const tipsUnder = node.data.numTips ?? 1;
      branches.push({
        id: `${node.parent.data.nodeId}->${node.data.nodeId}`,
        start: [parentPos.x, parentPos.y],
        control1: [c1.x, c1.y],
        control2: [c2.x, c2.y],
        end: [pos.x, pos.y],
        color,
        strokeWidth: Math.max(
          0.6,
          Math.min(3.2, Math.log2(tipsUnder + 1) * 0.55)
        ),
      });
    }
  });

  return { nodes, branches, mapRadius };
}

export { HEIGHT_LIMIT_DEFAULT };
