/**
 * v8 layout - spherical packing driven by canvas size
 *
 * radius = min(canvasWidth, canvasHeight) * scale
 * 1. Root at sphere center (0,0,0)
 * 2. Deepest tips placed first on/near the sphere surface (hash “random”)
 *    with 3D repulsion, then re-projected onto the sphere
 * 3. Parents = child centroid pulled inward toward the root
 * 4. Recompute whenever the viewport resizes
 */
import { hierarchy, type HierarchyNode } from 'd3-hierarchy';

import type { TreeNode } from '@/Views/Experiments/TreeOfLife/tree';
import {
  colorForName,
  labelFor,
  paletteColor,
  ROOT_OTT_ID,
} from '@/Views/Experiments/TreeOfLife/tree';

export type Vec3 = [number, number, number];

export type LayoutNode = {
  id: string;
  node: TreeNode;
  position: Vec3;
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
  start: Vec3;
  control1: Vec3;
  control2: Vec3;
  end: Vec3;
  color: string;
  lineWidth: number;
};

export type LayoutResult = {
  nodes: LayoutNode[];
  branches: LayoutBranch[];
  /** World-space sphere radius from min(canvasW, canvasH). */
  sphereRadius: number;
};

export type ViewportSize = {
  width: number;
  height: number;
};

const MAX_CHILDREN = 14;
const HEIGHT_LIMIT_DEFAULT = 3;
const REPULSION_ITERS = 48;
/** Convert CSS pixels → world units (sphere fits the smaller canvas side). */
const PIXEL_TO_WORLD = 0.01;
const SPHERE_FIT = 0.42;

type Vec = { x: number; y: number; z: number };

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

function len3(v: Vec): number {
  return Math.hypot(v.x, v.y, v.z) || 1e-8;
}

function normalize(v: Vec): Vec {
  const l = len3(v);
  return { x: v.x / l, y: v.y / l, z: v.z / l };
}

function scale(v: Vec, s: number): Vec {
  return { x: v.x * s, y: v.y * s, z: v.z * s };
}

function add(a: Vec, b: Vec): Vec {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

function sub(a: Vec, b: Vec): Vec {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function toVec3(v: Vec): Vec3 {
  return [v.x, v.y, v.z];
}

/** Fibonacci-ish direction from two hashes - even-ish sphere coverage + jitter. */
function hashedDirection(id: string): Vec {
  const u = hash01(id, 1);
  const v = hash01(id, 2);
  // Uniform-ish on sphere
  const z = u * 2 - 1;
  const a = v * Math.PI * 2;
  const r = Math.sqrt(Math.max(0, 1 - z * z));
  const jitter = (hash01(id, 3) - 0.5) * 0.08;
  return normalize({
    x: r * Math.cos(a) + jitter,
    y: r * Math.sin(a) + jitter * 0.6,
    z: z + (hash01(id, 4) - 0.5) * 0.06,
  });
}

export function sphereRadiusFromCanvas(viewport: ViewportSize): number {
  const smallest = Math.min(
    Math.max(viewport.width, 1),
    Math.max(viewport.height, 1)
  );
  return smallest * PIXEL_TO_WORLD * SPHERE_FIT;
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
  while (tip?.parent && tip.parent.depth > 0) {
    tip = tip.parent;
  }
  const siblings = tip?.parent?.children ?? [];
  const index = siblings.findIndex((c) => c.data.nodeId === tip?.data.nodeId);
  return paletteColor(Math.max(0, index));
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

/**
 * Place tips on the sphere shell, then separate with 3D repulsion
 * while staying on the surface.
 */
function placeLeavesOnSphere(
  leaves: HierarchyNode<TreeNode>[],
  sphereRadius: number
): Map<string, Vec> {
  const positions = new Map<string, Vec>();
  const n = Math.max(leaves.length, 1);
  const chord = Math.max(
    sphereRadius * 0.08,
    ((2 * Math.PI * sphereRadius) / Math.max(n, 8)) * 0.85
  );
  const minDist = chord;

  // Outer shell band (fill the sphere surface, slight inward variance).
  leaves.forEach((leaf) => {
    const dir = hashedDirection(leaf.data.nodeId);
    const shell = sphereRadius * (0.82 + hash01(leaf.data.nodeId, 5) * 0.18);
    positions.set(leaf.data.nodeId, scale(dir, shell));
  });

  for (let iter = 0; iter < REPULSION_ITERS; iter += 1) {
    for (let i = 0; i < leaves.length; i += 1) {
      for (let j = i + 1; j < leaves.length; j += 1) {
        const a = leaves[i]!;
        const b = leaves[j]!;
        const pa = positions.get(a.data.nodeId)!;
        const pb = positions.get(b.data.nodeId)!;
        const delta = sub(pb, pa);
        const dist = len3(delta);

        if (dist >= minDist) {
          continue;
        }

        const push = ((minDist - dist) / dist) * 0.5;
        const force = scale(delta, push);
        positions.set(a.data.nodeId, sub(pa, force));
        positions.set(b.data.nodeId, add(pb, force));
      }
    }

    // Re-project onto sphere shell after each pass.
    leaves.forEach((leaf) => {
      const p = positions.get(leaf.data.nodeId)!;
      const shell = sphereRadius * (0.82 + hash01(leaf.data.nodeId, 5) * 0.18);
      positions.set(leaf.data.nodeId, scale(normalize(p), shell));
    });
  }

  return positions;
}

/**
 * Parents from children: centroid → pull toward center → keep inside children.
 */
function placeParents(
  root: HierarchyNode<TreeNode>,
  positions: Map<string, Vec>,
  sphereRadius: number
): void {
  const maxDepth = root.height;

  for (let depth = maxDepth - 1; depth >= 1; depth -= 1) {
    root.each((node) => {
      if (node.depth !== depth || !node.children?.length) {
        return;
      }

      let sx = 0;
      let sy = 0;
      let sz = 0;
      let minChildR = Infinity;

      node.children.forEach((child) => {
        const p = positions.get(child.data.nodeId);
        if (!p) {
          return;
        }
        sx += p.x;
        sy += p.y;
        sz += p.z;
        minChildR = Math.min(minChildR, len3(p));
      });

      const count = node.children.length || 1;
      let pos: Vec = { x: sx / count, y: sy / count, z: sz / count };

      // Pull toward root at origin.
      const pull = 0.35;
      pos = scale(pos, 1 - pull);

      // Stay inside the children’s shell.
      const targetR = Math.min(
        len3(pos),
        minChildR * (0.55 + (depth / Math.max(maxDepth, 1)) * 0.25)
      );
      const minR = sphereRadius * (0.08 + depth * 0.04);
      const r = Math.max(minR, targetR);

      if (len3(pos) < 1e-6) {
        // Degenerate centroid - offset along a hashed direction.
        pos = scale(hashedDirection(node.data.nodeId), r);
      } else {
        pos = scale(normalize(pos), r);
      }

      positions.set(node.data.nodeId, pos);
    });
  }

  positions.set(root.data.nodeId, { x: 0, y: 0, z: 0 });
}

function bezierToParent(
  child: Vec,
  parent: Vec,
  id: string
): Pick<LayoutBranch, 'start' | 'control1' | 'control2' | 'end'> {
  const mid = scale(add(child, parent), 0.5);
  const radial = normalize(mid);
  const wobble = (hash01(id, 9) - 0.5) * len3(sub(child, parent)) * 0.25;
  // Bend the curve slightly off the chord for organic veins in 3D.
  const side = normalize({
    x: radial.y - radial.z,
    y: radial.z - radial.x,
    z: radial.x - radial.y,
  });

  const control1 = add(
    add(child, scale(sub(parent, child), 0.28)),
    scale(side, wobble)
  );
  const control2 = add(
    add(child, scale(sub(parent, child), 0.72)),
    scale(side, -wobble * 0.5)
  );

  return {
    start: toVec3(child),
    control1: toVec3(control1),
    control2: toVec3(control2),
    end: toVec3(parent),
  };
}

export function computeBottomUpLayout(
  data: TreeNode,
  viewport: ViewportSize
): LayoutResult {
  const sphereRadius = sphereRadiusFromCanvas(viewport);
  const pruned = prune(data);
  const root = hierarchy(pruned, (d) => d.children ?? undefined);
  const leaves = root.leaves();

  const positions = placeLeavesOnSphere(leaves, sphereRadius);
  placeParents(root, positions, sphereRadius);

  const nodes: LayoutNode[] = [];
  const branches: LayoutBranch[] = [];
  const markerScale = Math.max(0.06, sphereRadius * 0.018);

  root.each((node) => {
    const p = positions.get(node.data.nodeId) ?? { x: 0, y: 0, z: 0 };
    const tips = node.data.numTips ?? 0;
    const isTip = !node.children?.length;
    const expandable = isTip && tips > 1;
    const isOrigin = node.depth === 0 && isAbsoluteOrigin(node.data);
    const color = resolveColor(node);

    nodes.push({
      id: node.data.nodeId,
      node: node.data,
      position: toVec3(p),
      depth: node.depth,
      color,
      expandable,
      showLabel: shouldLabel(node, expandable),
      fontSize: isOrigin
        ? markerScale * 3.2
        : node.depth <= 2
          ? markerScale * 1.5
          : markerScale,
      isOrigin,
      isTip,
      radius: isOrigin
        ? markerScale * 3.4
        : expandable
          ? markerScale
          : markerScale * 0.35,
    });

    if (!node.parent) {
      return;
    }

    const parentPos = positions.get(node.parent.data.nodeId) ?? {
      x: 0,
      y: 0,
      z: 0,
    };
    const lineWidth = Math.max(0.7, Math.min(1.8, 1.7 - node.depth * 0.2));

    branches.push({
      id: `${node.parent.data.nodeId}->${node.data.nodeId}`,
      ...bezierToParent(p, parentPos, node.data.nodeId),
      color,
      lineWidth,
    });
  });

  return {
    nodes,
    branches,
    sphereRadius,
  };
}

export { HEIGHT_LIMIT_DEFAULT };
